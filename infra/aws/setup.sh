#!/bin/bash
# Run this ONCE to set up AWS resources before using the CI/CD workflows.
# Requires AWS CLI configured with admin credentials.
#
# Usage: bash infra/aws/setup.sh

set -e

REGION="us-west-1"          # change if needed
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "Setting up ECR repos for account $ACCOUNT_ID in $REGION..."

# ── Create ECR repositories ──────────────────────────────────────
for REPO in explainalgo/api-gateway explainalgo/frontend; do
  aws ecr create-repository \
    --repository-name "$REPO" \
    --region "$REGION" \
    --image-scanning-configuration scanOnPush=true \
    --encryption-configuration encryptionType=AES256 \
    2>/dev/null && echo "Created: $REPO" || echo "Already exists: $REPO"
done

# ── Create IAM user for GitHub Actions ──────────────────────────
IAM_USER="explainalgo-github-actions-prod"

aws iam create-user --user-name "$IAM_USER" 2>/dev/null || echo "IAM user already exists"

# Inline policy: least-privilege ECR + EKS access
aws iam put-user-policy \
  --user-name "$IAM_USER" \
  --policy-name "ExplainAlgoGitHubActions" \
  --policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
      {
        \"Effect\": \"Allow\",
        \"Action\": [
          \"ecr:GetAuthorizationToken\",
          \"ecr:BatchCheckLayerAvailability\",
          \"ecr:GetDownloadUrlForLayer\",
          \"ecr:BatchGetImage\",
          \"ecr:PutImage\",
          \"ecr:InitiateLayerUpload\",
          \"ecr:UploadLayerPart\",
          \"ecr:CompleteLayerUpload\",
          \"ecr:DescribeImages\",
          \"ecr:BatchDeleteImage\"
        ],
        \"Resource\": \"arn:aws:ecr:${REGION}:${ACCOUNT_ID}:repository/explainalgo/*\"
      },
      {
        \"Effect\": \"Allow\",
        \"Action\": \"ecr:GetAuthorizationToken\",
        \"Resource\": \"*\"
      },
      {
        \"Effect\": \"Allow\",
        \"Action\": [
          \"eks:DescribeCluster\"
        ],
        \"Resource\": \"arn:aws:eks:${REGION}:${ACCOUNT_ID}:cluster/*\"
      },
      {
        "Effect": "Allow",
        "Action": ["ses:SendEmail", "ses:SendRawEmail"],
        "Resource": "*"
      }
    ]
  }"

# Create access keys for GitHub Actions secrets
echo ""
echo "Creating access keys (save these — shown only once):"
aws iam create-access-key --user-name "$IAM_USER"

echo ""
echo "Done. Add the following secrets to your GitHub repo:"
echo "  AWS_ACCOUNT_ID     = $ACCOUNT_ID"
echo "  AWS_ACCESS_KEY_ID  = (from above)"
echo "  AWS_SECRET_ACCESS_KEY = (from above)"
echo "  EKS_CLUSTER_NAME   = your-cluster-name"
echo "  STAGING_URL        = https://staging.yourdomain.com"
echo "  PROD_URL           = https://yourdomain.com"

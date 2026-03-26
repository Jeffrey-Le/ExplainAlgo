#!/bin/bash
# Creates the EKS cluster and installs required addons.
# Run this once after setup.sh.
#
# Prerequisites:
#   - eksctl installed (brew install eksctl or https://eksctl.io)
#   - kubectl installed
#   - AWS CLI configured with admin credentials
#
# Usage: bash infra/eksctl/create-cluster.sh

set -e

CLUSTER_NAME="explainalgo"
REGION="us-west-1"

echo "Creating EKS cluster: $CLUSTER_NAME in $REGION..."
echo "This takes ~15 minutes."

# ── Create cluster from config ───────────────────────────────────
eksctl create cluster -f infra/eksctl/cluster.yaml

# ── Update kubeconfig ────────────────────────────────────────────
aws eks update-kubeconfig --region $REGION --name $CLUSTER_NAME
echo "kubeconfig updated — kubectl is now pointed at $CLUSTER_NAME"

# ── Install AWS Load Balancer Controller ─────────────────────────
# Required for the ALB ingress in k8s/base/ingress/ingress.yaml

# Create IAM policy for the controller
curl -o /tmp/alb-iam-policy.json \
  https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/main/docs/install/iam_policy.json

aws iam create-policy \
  --policy-name AWSLoadBalancerControllerIAMPolicy \
  --policy-document file:///tmp/alb-iam-policy.json \
  2>/dev/null || echo "ALB IAM policy already exists"

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Create service account
eksctl create iamserviceaccount \
  --cluster=$CLUSTER_NAME \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --attach-policy-arn=arn:aws:iam::${ACCOUNT_ID}:policy/AWSLoadBalancerControllerIAMPolicy \
  --override-existing-serviceaccounts \
  --approve

# Install controller via helm
helm repo add eks https://aws.github.io/eks-charts
helm repo update
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=$CLUSTER_NAME \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller

# ── Create namespaces ────────────────────────────────────────────
kubectl apply -f k8s/namespaces/staging.yaml
kubectl apply -f k8s/namespaces/production.yaml

echo ""
echo "Done. Cluster is ready."
echo "Add this to your GitHub secrets:"
echo "  EKS_CLUSTER_NAME = $CLUSTER_NAME"
echo ""
echo "Verify with: kubectl get nodes"

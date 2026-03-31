#!/bin/bash
# Set up AWS SES for ExplainAlgo email verification.
# Run this once before deploying email verification.
#
# Usage: bash infra/aws/setup-ses.sh your-email@gmail.com

set -e

REGION="us-west-1"
SENDER_EMAIL=$1

if [ -z "$SENDER_EMAIL" ]; then
  echo "Usage: bash infra/aws/setup-ses.sh your-email@example.com"
  exit 1
fi

echo "Setting up AWS SES in $REGION..."

# Verify sender email identity
aws ses verify-email-identity \
  --email-address "$SENDER_EMAIL" \
  --region "$REGION"

echo ""
echo "Verification email sent to $SENDER_EMAIL"
echo "Click the link in that email to verify it with AWS SES."
echo ""
echo "Once verified, add these to your GitHub environment secrets:"
echo "  SES_SENDER_EMAIL = $SENDER_EMAIL"
echo "  BASE_URL = http://your-alb-address.us-west-1.elb.amazonaws.com"
echo ""
echo "Also add to your k8s sealed secrets (re-run kubeseal):"
echo "  ses-sender-email: $SENDER_EMAIL"
echo "  base-url: http://your-alb-address"
echo ""
echo "Note: SES is in sandbox mode by default — it can only send to"
echo "verified email addresses. To send to anyone, request production"
echo "access in the AWS SES console."
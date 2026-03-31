import boto3
import os
import logging
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

def send_verification_email(to_email: str, verification_link: str) -> bool:
    """
    Send a verification email via AWS SES.
    Returns True on success, False on failure.
    """
    ses_client = boto3.client(
        'ses',
        region_name=os.getenv('AWS_REGION', 'us-west-1')
    )

    sender = os.getenv('SES_SENDER_EMAIL')
    if not sender:
        logger.error('SES_SENDER_EMAIL environment variable not set')
        return False

    subject = 'Verify your ExplainAlgo account'

    body_html = f"""
    <html>
    <body>
        <h2>Welcome to ExplainAlgo!</h2>
        <p>Thanks for registering. Please verify your email address by clicking the link below:</p>
        <a href="{verification_link}" style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
        ">Verify Email</a>
        <p>Or copy this link into your browser:</p>
        <p>{verification_link}</p>
        <p>This link expires in 24 hours.</p>
        <p>If you didn't register for ExplainAlgo, you can safely ignore this email.</p>
    </body>
    </html>
    """

    body_text = f"""
    Welcome to ExplainAlgo!

    Please verify your email by visiting this link:
    {verification_link}

    This link expires in 24 hours.
    If you didn't register, you can safely ignore this email.
    """

    try:
        ses_client.send_email(
            Source=sender,
            Destination={'ToAddresses': [to_email]},
            Message={
                'Subject': {'Data': subject, 'Charset': 'UTF-8'},
                'Body': {
                    'Text': {'Data': body_text, 'Charset': 'UTF-8'},
                    'Html': {'Data': body_html, 'Charset': 'UTF-8'},
                }
            }
        )
        logger.info(f'Verification email sent to {to_email}')
        return True
    except ClientError as e:
        logger.error(f'Failed to send verification email to {to_email}: {e}')
        return False
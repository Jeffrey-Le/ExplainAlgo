from email.mime.text import MIMEText
import smtplib
import re

def send_verification_email(user_email, verification_link):
    msg = MIMEText(f"Please verify your email by clicking the following link: {verification_link}")
    msg['Subject'] = 'Email Verification'
    msg['From'] = 'your_email@example.com' # Verfication Email or Company Email
    msg['To'] = user_email

    with smtplib.SMTP('smtp.example.com') as server:
        server.login('your_email@example.com', 'your_password')
        server.sendmail(msg['From'], [msg['To']], msg.as_string())

def validate_password(password):
    if len(password) < 8:
        return 'Password must be at least 8 characters long'
    if not re.search(r'[A-Z]', password):
        return 'Password must contain at least one uppercase letter'
    if not re.search(r'[a-z]', password):
        return 'Password must contain at least one lowercase letter'
    if not re.search(r'[0-9]', password):
        return 'Password must contain at least one digit'
    if not re.search(r'[!@#$%^&*]', password):
        return 'Password must contain at least one special character'
    return None

def validate_email(email):
    if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
        return 'Invalid email format'
    return None
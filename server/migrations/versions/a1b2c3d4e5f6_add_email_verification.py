"""add email verification fields to user

Revision ID: a1b2c3d4e5f6
Revises: 564cb7ea92d5
Create Date: 2026-03-30

"""
from alembic import op
import sqlalchemy as sa

revision = 'a1b2c3d4e5f6'
down_revision = '564cb7ea92d5'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('user', sa.Column('is_verified', sa.Boolean(), nullable=False, server_default='false'))
    op.add_column('user', sa.Column('verification_token', sa.String(256), nullable=True))


def downgrade():
    op.drop_column('user', 'is_verified')
    op.drop_column('user', 'verification_token')
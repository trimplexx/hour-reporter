"""Refactor user model

Revision ID: 4c5ae072b695
Revises: 098843573b3e
Create Date: 2024-10-29 11:43:45.466741

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '4c5ae072b695'
down_revision = '098843573b3e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=50), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=50), nullable=False))
        batch_op.add_column(sa.Column('email', sa.String(length=150), nullable=False))
        batch_op.drop_index('username')
        batch_op.create_unique_constraint(None, ['email'])
        batch_op.drop_column('username')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', mysql.VARCHAR(length=150), nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_index('username', ['username'], unique=False)
        batch_op.drop_column('email')
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    # ### end Alembic commands ###

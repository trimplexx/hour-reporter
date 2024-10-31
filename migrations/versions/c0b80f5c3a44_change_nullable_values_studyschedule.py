"""Change nullable values StudySchedule

Revision ID: c0b80f5c3a44
Revises: 4ae7c7410d5c
Create Date: 2024-10-30 13:33:32.386820

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'c0b80f5c3a44'
down_revision = '4ae7c7410d5c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('study_schedule', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               nullable=True)
        batch_op.alter_column('day_of_week',
               existing_type=mysql.VARCHAR(length=10),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('study_schedule', schema=None) as batch_op:
        batch_op.alter_column('day_of_week',
               existing_type=mysql.VARCHAR(length=10),
               nullable=False)
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               nullable=False)

    # ### end Alembic commands ###
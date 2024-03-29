# Generated by Django 4.0.2 on 2022-05-21 21:38

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_alter_project_flag_alter_subtask_flag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subtask',
            name='subtask_id',
            field=models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='task_id',
            field=models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True),
        ),
    ]

# Generated by Django 4.0.2 on 2022-05-02 14:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sequence', models.DecimalField(decimal_places=0, max_digits=10)),
                ('description', models.CharField(max_length=100)),
                ('project_status', models.BooleanField(default=True)),
                ('flag', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='project', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['sequence'],
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_id', models.DecimalField(decimal_places=0, max_digits=10)),
                ('sequence', models.DecimalField(decimal_places=0, max_digits=10)),
                ('description', models.CharField(max_length=100)),
                ('flag', models.CharField(max_length=100)),
                ('task_status', models.BooleanField(default=True)),
                ('task_priority', models.DecimalField(decimal_places=0, max_digits=10)),
                ('task_tag', models.TextField(blank=True, null=True)),
                ('task_deadline', models.DateTimeField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='task', to=settings.AUTH_USER_MODEL)),
                ('project_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project', to='project.project')),
                ('task_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='task_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['sequence'],
            },
        ),
        migrations.CreateModel(
            name='Subtask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subtask_id', models.DecimalField(decimal_places=0, max_digits=10)),
                ('sequence', models.DecimalField(decimal_places=0, max_digits=10)),
                ('description', models.CharField(max_length=100)),
                ('flag', models.CharField(max_length=100)),
                ('subtask_status', models.BooleanField(default=True)),
                ('subtask_priority', models.DecimalField(decimal_places=0, max_digits=10)),
                ('subtask_tag', models.TextField(blank=True, null=True)),
                ('subtask_deadline', models.DateTimeField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='subtask', to=settings.AUTH_USER_MODEL)),
                ('subtask_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='subtask_user', to=settings.AUTH_USER_MODEL)),
                ('task_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subtask', to='project.task')),
            ],
            options={
                'ordering': ['sequence'],
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='comment', to=settings.AUTH_USER_MODEL)),
                ('task_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='project.task')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]

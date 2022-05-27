from django.db import models
import uuid

# Create your models here.
class Project(models.Model):
    sequence = models.DecimalField(max_digits=10, decimal_places=0)
    description = models.CharField(max_length=100)
    project_status = models.BooleanField(default=True)
    flag = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('auth.User', related_name='created_by_project', on_delete=models.DO_NOTHING)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta():
        ordering = ['sequence']

class Task(models.Model):
    project_id = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)
    task_id = models.UUIDField(default=uuid.uuid4, unique=True, db_index=True, editable=False)
    sequence = models.DecimalField(max_digits=10, decimal_places=0)
    description = models.CharField(max_length=100)
    flag = models.BooleanField(default=False)
    task_user = models.ForeignKey('auth.User', related_name='task_user',blank=True, null=True, on_delete=models.DO_NOTHING)
    task_status = models.BooleanField(default=True)
    task_priority = models.DecimalField(max_digits=10, decimal_places=0)
    task_tag = models.TextField(blank=True, null=True)
    task_deadline = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('auth.User', related_name='created_by_task', on_delete=models.DO_NOTHING)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta():
        ordering = ['sequence']

class Subtask(models.Model):
    task_id = models.ForeignKey(Task, related_name='subtasks', on_delete=models.CASCADE)
    subtask_id = models.UUIDField(default=uuid.uuid4, unique=True, db_index=True, editable=False)
    sequence = models.DecimalField(max_digits=10, decimal_places=0)
    description = models.CharField(max_length=100)
    flag = models.BooleanField(default=False)
    subtask_user = models.ForeignKey('auth.User', related_name='subtask_user',blank=True, null=True, on_delete=models.DO_NOTHING)
    subtask_status = models.BooleanField(default=True)
    subtask_priority = models.DecimalField(max_digits=10, decimal_places=0)
    subtask_tag = models.TextField(blank=True, null=True)
    subtask_deadline = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('auth.User', related_name='created_by_subtask', on_delete=models.DO_NOTHING)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta():
        ordering = ['sequence']

class Comment(models.Model):
    task_id = models.ForeignKey(Task, related_name='comment', on_delete=models.CASCADE)
    comment = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('auth.User', related_name='created_by_comment', on_delete=models.DO_NOTHING)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta():
        ordering = ['created_at']

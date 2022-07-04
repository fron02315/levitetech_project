from rest_framework import serializers
from .models import Project, Task, Subtask, Comment


class FilterActivetaskListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(task_status=True)
        return super(FilterActivetaskListSerializer, self).to_representation(data)

class FilterActiveSubtaskListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(subtask_status=True)
        return super(FilterActiveSubtaskListSerializer, self).to_representation(data)

class FilterActiveCommentListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(comment_status=True)
        return super(FilterActiveCommentListSerializer, self).to_representation(data)

class FilterActiveProjectListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(project_status=True)
        return super(FilterActiveProjectListSerializer, self).to_representation(data)


class ProjectSerializer(serializers.ModelSerializer):
    #created_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Project
        list_serializer_class = FilterActiveProjectListSerializer
        fields = ["id", "sequence", "description", "flag", "created_by", "created_at"]
        extra_kwargs = {'created_by': {'default': serializers.CurrentUserDefault()}}

class SubTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subtask
        list_serializer_class = FilterActiveSubtaskListSerializer
        fields = ["id","task_id", "subtask_id", "sequence", "description", "flag", "subtask_user", "subtask_priority", "subtask_tag", "subtask_deadline","created_by", "created_at"]

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        list_serializer_class = FilterActiveCommentListSerializer
        fields = ["id", "task_id","comment","comment_status","created_by", "created_at"]

class TaskSerializer(serializers.ModelSerializer):
    subtasks = SubTaskSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Task
        list_serializer_class = FilterActivetaskListSerializer
        fields = ["id", "task_id", "sequence", "description", "flag", "task_user", "task_priority", "task_tag", "task_deadline","created_by", "created_at", "subtasks", "comments"]


class ProjectListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        list_serializer_class = FilterActiveProjectListSerializer
        fields = ["id", "sequence", "description", "flag", "created_by", "created_at", "tasks"]
        extra_kwargs = {'created_by': {'default': serializers.CurrentUserDefault()}}

class TaskDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "project_id", "task_id", "sequence", "description", "flag", "task_user", "task_priority", "task_tag", "task_deadline", "task_status","created_by", "created_at"]
        extra_kwargs = {'created_by': {'default': serializers.CurrentUserDefault()}}

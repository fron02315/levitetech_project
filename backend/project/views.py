from django.shortcuts import render
from rest_framework.response import Response
from project.models import Project, Task, Subtask
from rest_framework import viewsets, generics, permissions,status
from project.serializers import (
    ProjectSerializer,
    ProjectListSerializer,
    TaskDetailSerializer,
    TaskSerializer
)

class ProjectList(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    def get_queryset(self):
        return Project.objects.all()

class ProjectAdmin(generics.ListCreateAPIView):
    serializer_class = ProjectListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        proj_pk = self.kwargs["proj"]
        return Project.objects.filter(pk= proj_pk)

class TaskList(viewsets.ModelViewSet):
    serializer_class = TaskDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Task.objects.all()
    
class taskDetails(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

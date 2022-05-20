"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
# from django.urls import path
from django.urls import path, include
from django.conf.urls import include
from todo import views as todo_views
from project import views as project_views
from project.views import ProjectList
from rest_framework import routers


# todo_router = routers.DefaultRouter()
# todo_router.register(r'tasks', todo_views.TodoView, 'task')

project_list = ProjectList.as_view({
    'get': 'list',
    'post': 'create'
})
project_detail = ProjectList.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include(todo_router.urls)),
    path('authentication/', include('backend.authentication.urls')),
    path('user/', include('backend.authentication.urls')),
    path('project/', project_list, name="project-list"),
    path('project/<int:pk>', project_detail, name="project-details"),
    path('project/<int:proj>/todo', project_views.ProjectAdmin.as_view(), name="project-admin"),
]

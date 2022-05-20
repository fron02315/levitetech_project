# djsr/authentication/urls.py
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import (UserCreate, LogoutAndBlacklistRefreshTokenForUserView, CustomTokenObtainPairView, GetUserList )

urlpatterns = [
    # path('token/login/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('user/list/', GetUserList.as_view(), name='get_user_list'), 
    path('token/obtain/', CustomTokenObtainPairView.as_view(), name='token_retrieve'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('account/register/', UserCreate.as_view()),
    path('token/blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist')
]
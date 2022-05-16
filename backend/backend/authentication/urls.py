# djsr/authentication/urls.py
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import UserCreate
from .views import LogoutAndBlacklistRefreshTokenForUserView
from .views import CustomTokenObtainPairView

urlpatterns = [
    # path('token/login/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/obtain/', CustomTokenObtainPairView.as_view(), name='token_retrieve'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('account/register/', UserCreate.as_view()),
    path('token/blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist')
]
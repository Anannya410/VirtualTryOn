from django.urls import path
from .views import TestView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('test', TestView.as_view()),
]

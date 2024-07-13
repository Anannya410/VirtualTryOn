from django.urls import path
from .views import save_avatar, get_latest_avatar

urlpatterns = [
    path('save-avatar/', save_avatar, name='save_avatar'),
    path('get-latest-avatar/', get_latest_avatar, name='get_latest_avatar'),
]

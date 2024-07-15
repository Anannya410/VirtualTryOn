from django.urls import path
from .views import save_clothed_avatar, get_saved_clothed_avatars

urlpatterns = [
    path('save-clothed-avatar/', save_clothed_avatar, name='save_clothed_avatar'),
    path('saved-clothed-avatars/', get_saved_clothed_avatars, name='get_saved_clothed_avatars'),
]

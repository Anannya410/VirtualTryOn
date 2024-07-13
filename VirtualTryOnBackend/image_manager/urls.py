from django.urls import path
from .views import list_images

urlpatterns = [
    path('list-images/', list_images, name='list_images'),
]

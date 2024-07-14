# face_swap/urls.py

from django.urls import path
from .views import swap_faces_view

urlpatterns = [
    path('swap/', swap_faces_view, name='swap_faces'),
]

from django.urls import path
from .views import ImageUploadView, ImageListView

urlpatterns = [
    path('upload/', ImageUploadView.as_view(), name='image-upload'),
    path('outfits/', ImageListView.as_view(), name='image-list'),
]

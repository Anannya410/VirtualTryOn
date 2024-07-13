from django.urls import path
from .views import resize_body_parts

urlpatterns = [
    #path('resize/', resize_body_parts, name='resize_body_parts'),
    path('resize-body-parts/<str:image_filename>/', resize_body_parts, name='resize_body_parts'),
]
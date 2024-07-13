from django.urls import path, include
from .views import token_obtain_pair

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/token/', token_obtain_pair, name='token_obtain_pair'),
]

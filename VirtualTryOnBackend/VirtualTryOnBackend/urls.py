from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1.0/user/', include('userAPI.urls')),
    path('api/body_resizer/', include('body_resizer.urls')),
    path('api/image_manager/', include('image_manager.urls')),
    path('api/avatar_manager/', include('avatar_manager.urls')),
    path('api/outfit_manager/', include('outfit_manager.urls')),
    path('api/face_swap/', include('face_swap.urls')),
    path('api/wardrobe_manager/', include('wardrobe_manager.urls')),
    # path('api/userAuthentication/', include('userAuthentication.urls')),
]

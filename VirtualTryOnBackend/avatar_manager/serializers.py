from rest_framework import serializers
from .models import Avatar

class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = ['id', 'image_name', 'image_data', 'created_at']



















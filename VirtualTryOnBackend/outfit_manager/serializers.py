from rest_framework import serializers
from .models import ClothedAvatar

class ClothedAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothedAvatar
        fields = ['id', 'image', 'created_at']

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ClothedAvatar
from .serializers import ClothedAvatarSerializer

@api_view(['POST'])
def save_clothed_avatar(request):
    serializer = ClothedAvatarSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_saved_clothed_avatars(request):
    avatars = ClothedAvatar.objects.all().order_by('-created_at')
    serializer = ClothedAvatarSerializer(avatars, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

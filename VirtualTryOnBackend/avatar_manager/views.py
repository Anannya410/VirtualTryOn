# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Avatar
# from .serializers import AvatarSerializer

# @api_view(['POST'])
# def save_avatar(request):
#     serializer = AvatarSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def get_latest_avatar(request):
#     try:
#         avatar = Avatar.objects.latest('created_at')
#         serializer = AvatarSerializer(avatar)
#         return Response(serializer.data)
#     except Avatar.DoesNotExist:
#         return Response({'error': 'No avatars found'}, status=status.HTTP_404_NOT_FOUND)


from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Avatar
from .serializers import AvatarSerializer

@api_view(['POST'])
def save_avatar(request):
    try:
        avatar = Avatar.objects.latest('created_at')
        serializer = AvatarSerializer(avatar, data=request.data)
    except Avatar.DoesNotExist:
        serializer = AvatarSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_latest_avatar(request):
    try:
        avatar = Avatar.objects.latest('created_at')
        serializer = AvatarSerializer(avatar)
        return Response(serializer.data)
    except Avatar.DoesNotExist:
        return Response({'error': 'No avatars found'}, status=status.HTTP_404_NOT_FOUND)

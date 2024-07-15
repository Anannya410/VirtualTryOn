from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UploadedImage
from .serializers import UploadedImageSerializer

class ImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            image_name = data.get('image_name')
            image_data = data.get('image_data')

            if image_data:
                uploaded_image = UploadedImage.objects.create(
                    image_name=image_name,
                    image_data=image_data
                )

                serializer = UploadedImageSerializer(uploaded_image)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ImageListView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            images = UploadedImage.objects.all().order_by('-created_at')  
            serializer = UploadedImageSerializer(images, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

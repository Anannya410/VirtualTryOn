import os
import base64
from django.conf import settings
from django.core.files import File
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

@csrf_exempt
@api_view(['GET'])
def list_images(request):
    image_dir = os.path.join(settings.STATIC_ROOT, 'assets') 
    try:
        images = []
        for filename in os.listdir(image_dir):
            filepath = os.path.join(image_dir, filename)
            if os.path.isfile(filepath):
                with open(filepath, 'rb') as img_file:
                    encoded_image = base64.b64encode(img_file.read()).decode('utf-8')
                    image_data = {
                        'image_name': filename,
                        'image_url': f"{settings.STATIC_URL}assets/{filename}",
                        'image_base64': encoded_image
                    }
                    images.append(image_data)
        
        return JsonResponse({'images': images})
    
    except OSError as e:
        return JsonResponse({'error': str(e)}, status=500)

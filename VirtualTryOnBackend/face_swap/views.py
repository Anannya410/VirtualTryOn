from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import cv2
from .utils import swap_faces
import base64
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def swap_faces_view(request):
    if request.method == 'POST':
        try:
            file1 = request.FILES['image1']
            file2 = request.FILES['image2']

            img1_path = default_storage.save('tmp/' + file1.name, ContentFile(file1.read()))
            img2_path = default_storage.save('tmp/' + file2.name, ContentFile(file2.read()))

            predictor_path = os.path.join('face_swap', 'shape_predictor_68_face_landmarks.dat')

            logger.info(f"Processing images: {img1_path}, {img2_path}")

            result_image = swap_faces(img1_path, img2_path, predictor_path)

            if result_image is None:
                logger.warning("No faces detected in one or both images.")
                return JsonResponse({'error': 'No faces detected in one or both images'}, status=400)

            # Encode the result image to Base64
            _, buffer = cv2.imencode('.png', result_image)
            result_image_base64 = base64.b64encode(buffer).decode('utf-8')

            logger.info("Face swap successful.")

            os.remove(img1_path)
            os.remove(img2_path)

            return JsonResponse({'result_image': result_image_base64})

        except Exception as e:
            logger.error(f"Error during face swap: {e}")
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)





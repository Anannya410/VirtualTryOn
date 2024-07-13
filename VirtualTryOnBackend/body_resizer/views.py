# import cv2
# import numpy as np
# import base64
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser
# from rest_framework.decorators import api_view

# # Load the constant image with transparency
# image_path = 'body_resizer/assets/girlBodBgRemoved.png'
# original_image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)

# @csrf_exempt
# @api_view(['POST'])
# def resize_body_parts(request):
#     data = JSONParser().parse(request)
#     scale_leg = data.get('scale_leg', 1.0)
#     scale_hand = data.get('scale_hand', 1.0)
#     scale_neck = data.get('scale_neck', 1.0)
#     scale_shoulder = data.get('scale_shoulder', 1.0)
    
#     image = original_image.copy()
#     height, width = image.shape[:2]

#     # Ensure image has 4 channels (including alpha)
#     if image.shape[2] == 3:
#         image = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)

#     # Resizing legs (bottom part of the image)
#     leg_height = int(height * 0.25)
#     leg_part = image[height - leg_height:, :]
#     leg_part_resized = cv2.resize(leg_part, (width, int(leg_height * scale_leg)), interpolation=cv2.INTER_AREA)
#     new_leg_height = leg_part_resized.shape[0]

#     # Resizing hands (middle part of the image)
#     hand_height = int(height * 0.3)
#     hand_part = image[hand_height:int(height * 0.75), :]
#     hand_part_resized = cv2.resize(hand_part, (width, int(hand_height * scale_hand)), interpolation=cv2.INTER_AREA)
#     new_hand_height = hand_part_resized.shape[0]

#     # Resizing neck (top middle part of the image)
#     neck_height = int(height * 0.1)
#     neck_part = image[int(height * 0.2):int(height * 0.3), :]
#     neck_part_resized = cv2.resize(neck_part, (width, int(neck_height * scale_neck)), interpolation=cv2.INTER_AREA)
#     new_neck_height = neck_part_resized.shape[0]

#     # Resizing shoulders (top part of the image)
#     shoulder_height = int(height * 0.2)
#     shoulder_part = image[0:int(height * 0.2), :]
#     shoulder_part_resized = cv2.resize(shoulder_part, (width, int(shoulder_height * scale_shoulder)), interpolation=cv2.INTER_AREA)
#     new_shoulder_height = shoulder_part_resized.shape[0]

#     # Create a new blank image with transparency
#     new_image_height = new_shoulder_height + new_neck_height + new_hand_height + new_leg_height + int(height * 0.1)
#     new_image = np.zeros((new_image_height, width, 4), dtype=np.uint8)

#     # Place the resized parts in the new image
#     current_y = 0

#     # Place shoulders
#     new_image[current_y:current_y + new_shoulder_height, :] = shoulder_part_resized
#     current_y += new_shoulder_height

#     # Place neck
#     new_image[current_y:current_y + new_neck_height, :] = neck_part_resized
#     current_y += new_neck_height

#     # Place hands
#     new_image[current_y:current_y + new_hand_height, :] = hand_part_resized
#     current_y += new_hand_height

#     # Place legs
#     new_image[current_y:current_y + new_leg_height, :] = leg_part_resized

#     # Convert the image to a format that can be sent as a response
#     _, buffer = cv2.imencode('.png', new_image)
#     response_data = base64.b64encode(buffer).decode('utf-8')

#     return JsonResponse({'image': response_data})



import cv2
import numpy as np
import base64
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from django.conf import settings

@csrf_exempt
@api_view(['POST'])
def resize_body_parts(request, image_filename):
    try:
        # Construct the full path to the selected image
        image_path = os.path.join(settings.STATIC_ROOT, 'assets', image_filename)
        
        # Load the selected image
        original_image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
        
        if original_image is None:
            return JsonResponse({'error': f'Failed to load image {image_filename}'}, status=400)
        
        data = JSONParser().parse(request)
        scale_leg = data.get('scale_leg', 1.0)
        scale_hand = data.get('scale_hand', 1.0)
        scale_neck = data.get('scale_neck', 1.0)
        scale_shoulder = data.get('scale_shoulder', 1.0)
        
        image = original_image.copy()
        height, width = image.shape[:2]
    
        # Ensure image has 4 channels (including alpha)
        if image.shape[2] == 3:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
    
        # Resizing legs (bottom part of the image)
        leg_height = int(height * 0.25)
        leg_part = image[height - leg_height:, :]
        leg_part_resized = cv2.resize(leg_part, (width, int(leg_height * scale_leg)), interpolation=cv2.INTER_AREA)
        new_leg_height = leg_part_resized.shape[0]
    
        # Resizing hands (middle part of the image)
        hand_height = int(height * 0.3)
        hand_part = image[hand_height:int(height * 0.75), :]
        hand_part_resized = cv2.resize(hand_part, (width, int(hand_height * scale_hand)), interpolation=cv2.INTER_AREA)
        new_hand_height = hand_part_resized.shape[0]
    
        # Resizing neck (top middle part of the image)
        neck_height = int(height * 0.1)
        neck_part = image[int(height * 0.2):int(height * 0.3), :]
        neck_part_resized = cv2.resize(neck_part, (width, int(neck_height * scale_neck)), interpolation=cv2.INTER_AREA)
        new_neck_height = neck_part_resized.shape[0]
    
        # Resizing shoulders (top part of the image)
        shoulder_height = int(height * 0.2)
        shoulder_part = image[0:int(height * 0.2), :]
        shoulder_part_resized = cv2.resize(shoulder_part, (width, int(shoulder_height * scale_shoulder)), interpolation=cv2.INTER_AREA)
        new_shoulder_height = shoulder_part_resized.shape[0]
    
        # Create a new blank image with transparency
        new_image_height = new_shoulder_height + new_neck_height + new_hand_height + new_leg_height + int(height * 0.1)
        new_image = np.zeros((new_image_height, width, 4), dtype=np.uint8)
    
        # Place the resized parts in the new image
        current_y = 0
    
        # Place shoulders
        new_image[current_y:current_y + new_shoulder_height, :] = shoulder_part_resized
        current_y += new_shoulder_height
    
        # Place neck
        new_image[current_y:current_y + new_neck_height, :] = neck_part_resized
        current_y += new_neck_height
    
        # Place hands
        new_image[current_y:current_y + new_hand_height, :] = hand_part_resized
        current_y += new_hand_height
    
        # Place legs
        new_image[current_y:current_y + new_leg_height, :] = leg_part_resized
    
        # Convert the image to a format that can be sent as a response
        _, buffer = cv2.imencode('.png', new_image)
        response_data = base64.b64encode(buffer).decode('utf-8')
    
        return JsonResponse({'image': response_data})
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

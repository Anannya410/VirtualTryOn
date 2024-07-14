import os
import cv2
import dlib
import numpy as np
from PIL import Image

# Path to the shape predictor file
predictor_path = os.path.join(os.path.dirname(__file__), 'shape_predictor_68_face_landmarks.dat')

# Initialize dlib's face detector and shape predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(predictor_path)

def get_face_landmarks(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)
    if len(faces) == 0:
        return None
    landmarks = []
    for face in faces:
        shape = predictor(gray, face)
        coords = np.zeros((68, 2), dtype=int)
        for i in range(68):
            coords[i] = (shape.part(i).x, shape.part(i).y)
        landmarks.append(coords)
    return landmarks

def face_swap(source_img, target_img):
    source_landmarks = get_face_landmarks(source_img)
    target_landmarks = get_face_landmarks(target_img)

    if source_landmarks is None or target_landmarks is None:
        raise ValueError('Face not detected in one of the images.')

    source_landmarks = source_landmarks[0]
    target_landmarks = target_landmarks[0]

    # Compute Delaunay triangulation for the target face
    rect = cv2.boundingRect(np.array([target_landmarks]))
    subdiv = cv2.Subdiv2D(rect)
    subdiv.insert([tuple(p) for p in target_landmarks])
    triangles = subdiv.getTriangleList()

    # Create a mask for the target face
    target_face_mask = np.zeros_like(target_img)
    cv2.fillConvexPoly(target_face_mask, np.array([target_landmarks]), (255, 255, 255))

    # Warp and blend each triangle
    output = target_img.copy()
    for triangle in triangles:
        pts1 = []
        pts2 = []
        for i in range(3):
            pts1.append(target_landmarks[np.where((target_landmarks == triangle[2*i:2*i+2]).all(axis=1))[0][0]])
            pts2.append(source_landmarks[np.where((source_landmarks == triangle[2*i:2*i+2]).all(axis=1))[0][0]])
        pts1 = np.array(pts1)
        pts2 = np.array(pts2)

        M = cv2.getAffineTransform(np.float32(pts2), np.float32(pts1))
        warped_triangle = cv2.warpAffine(source_img, M, (target_img.shape[1], target_img.shape[0]))
        output = cv2.addWeighted(output, 1, warped_triangle, 0.5, 0)

    # Blend the face into the target image
    output = cv2.add(target_img * (1 - target_face_mask // 255), output * (target_face_mask // 255))

    return output

# Save result as image
def save_image(image_array, path):
    image = Image.fromarray(cv2.cvtColor(image_array, cv2.COLOR_BGR2RGB))
    image.save(path)

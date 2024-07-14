import cv2
import numpy as np
import dlib

def extract_index_nparray(nparray):
    index = None
    for num in nparray[0]:
        index = num
        break
    return index

def apply_affine_transform(src, src_tri, dst_tri, size):
    warp_mat = cv2.getAffineTransform(np.float32(src_tri), np.float32(dst_tri))
    dst = cv2.warpAffine(src, warp_mat, (size[0], size[1]), None, flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)
    return dst

# def warp_triangle(img1, img2, t1, t2):
#     r1 = cv2.boundingRect(np.float32([t1]))
#     r2 = cv2.boundingRect(np.float32([t2]))
    
#     t1_rect = []
#     t2_rect = []
#     t2_rect_int = []
    
#     for i in range(3):
#         t1_rect.append(((t1[i][0] - r1[0]),(t1[i][1] - r1[1])))
#         t2_rect.append(((t2[i][0] - r2[0]),(t2[i][1] - r2[1])))
#         t2_rect_int.append(((t2[i][0] - r2[0]),(t2[i][1] - r2[1])))

#     img1_rect = img1[r1[1]:r1[1] + r1[3], r1[0]:r1[0] + r1[2]]
#     size = (r2[2], r2[3])
    
#     img2_rect = apply_affine_transform(img1_rect, t1_rect, t2_rect, size)
#     mask = np.zeros((r2[3], r2[2], 3), dtype=np.float32)
    
#     cv2.fillConvexPoly(mask, np.int32(t2_rect_int), (1.0, 1.0, 1.0), 16, 0)
    
#     img2_rect = img2_rect * mask
#     img2[r2[1]:r2[1] + r2[3], r2[0]:r2[0] + r2[2]] = img2[r2[1]:r2[1] + r2[3], r2[0]:r2[0] + r2[2]] * ((1.0, 1.0, 1.0) - mask)
#     img2[r2[1]:r2[1] + r2[3], r2[0]:r2[0] + r2[2]] = img2[r2[1]:r2[1] + r2[3], r2[0]:r2[0] + r2[2]] + img2_rect

def warp_triangle(img1, img2, t1, t2):
    r1 = cv2.boundingRect(np.float32([t1]))
    r2 = cv2.boundingRect(np.float32([t2]))
    
    # Expand the bounding rectangles to cover more area if needed
    expanded_r1 = (max(r1[0] - 10, 0), max(r1[1] - 10, 0), min(r1[2] + 20, img1.shape[1] - r1[0]), min(r1[3] + 20, img1.shape[0] - r1[1]))
    expanded_r2 = (max(r2[0] - 10, 0), max(r2[1] - 10, 0), min(r2[2] + 20, img2.shape[1] - r2[0]), min(r2[3] + 20, img2.shape[0] - r2[1]))
    
    t1_rect = []
    t2_rect = []
    t2_rect_int = []
    
    for i in range(3):
        t1_rect.append(((t1[i][0] - expanded_r1[0]), (t1[i][1] - expanded_r1[1])))
        t2_rect.append(((t2[i][0] - expanded_r2[0]), (t2[i][1] - expanded_r2[1])))
        t2_rect_int.append(((t2[i][0] - expanded_r2[0]), (t2[i][1] - expanded_r2[1])))

    img1_rect = img1[expanded_r1[1]:expanded_r1[1] + expanded_r1[3], expanded_r1[0]:expanded_r1[0] + expanded_r1[2]]
    size = (expanded_r2[2], expanded_r2[3])
    
    img2_rect = apply_affine_transform(img1_rect, t1_rect, t2_rect, size)
    mask = np.zeros((expanded_r2[3], expanded_r2[2], 3), dtype=np.float32)
    
    cv2.fillConvexPoly(mask, np.int32(t2_rect_int), (1.0, 1.0, 1.0), 16, 0)
    
    img2_rect = img2_rect * mask
    img2[expanded_r2[1]:expanded_r2[1] + expanded_r2[3], expanded_r2[0]:expanded_r2[0] + expanded_r2[2]] = img2[expanded_r2[1]:expanded_r2[1] + expanded_r2[3], expanded_r2[0]:expanded_r2[0] + expanded_r2[2]] * ((1.0, 1.0, 1.0) - mask)
    img2[expanded_r2[1]:expanded_r2[1] + expanded_r2[3], expanded_r2[0]:expanded_r2[0] + expanded_r2[2]] = img2[expanded_r2[1]:expanded_r2[1] + expanded_r2[3], expanded_r2[0]:expanded_r2[0] + expanded_r2[2]] + img2_rect


def swap_faces(img1_path, img2_path, predictor_path):
    img1 = cv2.imread(img1_path)
    img2 = cv2.imread(img2_path)

    img1_gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2_gray = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor(predictor_path)

    faces1 = detector(img1_gray)
    faces2 = detector(img2_gray)

    if len(faces1) == 0 or len(faces2) == 0:
        return None

    landmarks_points1 = []
    landmarks_points2 = []

    for face in faces1:
        landmarks = predictor(img1_gray, face)
        for n in range(0, 68):
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            landmarks_points1.append((x, y))

    for face in faces2:
        landmarks = predictor(img2_gray, face)
        for n in range(0, 68):
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            landmarks_points2.append((x, y))

    points1 = np.array(landmarks_points1, np.int32)
    points2 = np.array(landmarks_points2, np.int32)

    rect = cv2.boundingRect(points1)
    subdiv = cv2.Subdiv2D(rect)
    subdiv.insert(landmarks_points1)
    triangles = subdiv.getTriangleList()
    triangles = np.array(triangles, dtype=np.int32)

    indexes_triangles = []
    for t in triangles:
        pt1 = (t[0], t[1])
        pt2 = (t[2], t[3])
        pt3 = (t[4], t[5])
        
        index_pt1 = np.where((points1 == pt1).all(axis=1))
        index_pt1 = extract_index_nparray(index_pt1)
        index_pt2 = np.where((points1 == pt2).all(axis=1))
        index_pt2 = extract_index_nparray(index_pt2)
        index_pt3 = np.where((points1 == pt3).all(axis=1))
        index_pt3 = extract_index_nparray(index_pt3)
        
        if index_pt1 is not None and index_pt2 is not None and index_pt3 is not None:
            triangle = [index_pt1, index_pt2, index_pt3]
            indexes_triangles.append(triangle)

    img2_new_face = np.zeros_like(img2)
    for triangle_index in indexes_triangles:
        tr1_pt1 = landmarks_points1[triangle_index[0]]
        tr1_pt2 = landmarks_points1[triangle_index[1]]
        tr1_pt3 = landmarks_points1[triangle_index[2]]
        
        tr2_pt1 = landmarks_points2[triangle_index[0]]
        tr2_pt2 = landmarks_points2[triangle_index[1]]
        tr2_pt3 = landmarks_points2[triangle_index[2]]
        
        triangle1 = [tr1_pt1, tr1_pt2, tr1_pt3]
        triangle2 = [tr2_pt1, tr2_pt2, tr2_pt3]
        
        warp_triangle(img1, img2_new_face, triangle1, triangle2)

    convexhull2 = cv2.convexHull(points2)
    img2_face_mask = np.zeros_like(img2_gray)
    img2_head_mask = cv2.fillConvexPoly(img2_face_mask, convexhull2, 255)
    img2_face_mask = cv2.bitwise_not(img2_head_mask)
    img2_head_noface = cv2.bitwise_and(img2, img2, mask=img2_face_mask)
    result = cv2.add(img2_head_noface, img2_new_face)

    (x, y, w, h) = cv2.boundingRect(convexhull2)
    center_face2 = (int((x + x + w) / 2), int((y + y + h) / 2))
    seamlessclone = cv2.seamlessClone(result, img2, img2_head_mask, center_face2, cv2.MIXED_CLONE)

    return seamlessclone


import axios from 'axios';

export const swapFaces = async (bodyImageUri, faceImageUri) => {
  const formData = new FormData();
  
  formData.append('image1', {
    uri: bodyImageUri,
    name: 'body.jpg',
    type: 'image/jpeg',
  });
  
  formData.append('image2', {
    uri: faceImageUri,
    name: 'face.jpg',
    type: 'image/jpeg',
  });

  try {
    const response = await axios.post('http://10.0.2.2:8000/api/face_swap/swap/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.result_image_base64;
  } catch (error) {
    console.error('Error swapping faces:', error);
    throw error;
  }
};

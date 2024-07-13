// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://10.0.2.2:8000', 
//   timeout: 5000,
// });

// export const resizeImage = async ({ scale_leg, scale_hand, scale_neck, scale_shoulder }) => {
//   try {
//     const response = await instance.post('/api/body_resizer/resize/', {
//       scale_leg,
//       scale_hand,
//       scale_neck,
//       scale_shoulder,
//     });
//     return response.data.image;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


export const resizeImage = async ({ imageName, scale_leg, scale_hand, scale_neck, scale_shoulder }) => {
  try {
    const response = await fetch(`http://10.0.2.2:8000/api/body_resizer/resize-body-parts/${imageName}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scale_leg,
        scale_hand,
        scale_neck,
        scale_shoulder,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData.image;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


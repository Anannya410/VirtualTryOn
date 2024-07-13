// export const resizeImage = async ({ imageName, scale_leg, scale_hand, scale_neck, scale_shoulder }) => {
//   try {
//     const response = await fetch(`http://10.0.2.2:8000/api/body_resizer/resize-body-parts/${imageName}/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         scale_leg,
//         scale_hand,
//         scale_neck,
//         scale_shoulder,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const responseData = await response.json();
//     return responseData.image;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.0.2.2:8000",
  timeout: 5000,
});

export const resizeImage = async ({
  imageName,
  scale_leg,
  scale_hand,
  scale_neck,
  scale_shoulder,
}) => {
  try {
    const response = await instance.post(
      `/api/body_resizer/resize-body-parts/${imageName}/`,
      {
        scale_leg,
        scale_hand,
        scale_neck,
        scale_shoulder,
      }
    );
    return response.data.image;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const saveAvatar = async ({ image_name, image_data }) => {
  try {
    await instance.post("/api/avatar_manager/save-avatar/", {
      image_name,
      image_data,
    });
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getLatestAvatar = async () => {
  try {
    const response = await instance.get(
      "/api/avatar_manager/get-latest-avatar/"
    );
    return {
      avatar: response.data.image_data,
      name: response.data.image_name, // Adjust according to your API response
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

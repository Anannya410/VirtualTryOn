

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


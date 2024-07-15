const convertToBase64 = async (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result.split(',')[1]); 
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('Error converting image to base64'));
      };
      xhr.open('GET', uri);
      xhr.responseType = 'blob';
      xhr.send();
    });
  };
  
  const postImage = async (imageUri, imageName) => {
    try {
      // Convert image to base64
      const base64Image = await convertToBase64(imageUri);
  
      const response = await fetch('http://10.0.2.2:8000/api/wardrobe_manager/upload/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_name: imageName, image_data: base64Image }), 
      });
  
      const responseText = await response.text();
  
      if (response.ok) {
        return { success: true, message: 'Image posted successfully!' };
      } else {
        try {
          const errorData = JSON.parse(responseText);
          console.log(errorData);
          return { success: false, message: JSON.stringify(errorData) };
        } catch (e) {
          console.error('Failed to parse JSON response:', responseText);
          return { success: false, message: responseText };
        }
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };
  
  export { postImage };
  
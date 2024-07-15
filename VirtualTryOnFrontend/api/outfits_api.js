import axios from "axios";

const BASE_URL = "http://10.0.2.2:8000/api/outfit_manager";

export const saveClothedAvatar = async (avatar) => {
  const response = await axios.post(`${BASE_URL}save-clothed-avatar/`, {
    image: avatar,
  });
  return response.data;
};

export const getSavedClothedAvatars = async () => {
  const response = await axios.get(`${BASE_URL}saved-clothed-avatars/`);
  return response.data;
};

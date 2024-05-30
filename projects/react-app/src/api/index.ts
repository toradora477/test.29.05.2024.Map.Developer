import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const createMarker = async (data: { lat: number; lng: number; comment: string }) => {
  const response = await axios.post(`${API_BASE_URL}/markers`, data);
  return response.data;
};

export const getMarkers = async () => {
  const response = await axios.get(`${API_BASE_URL}/markers`);
  return response.data;
};

export const deleteMarker = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/markers/${id}`);
  return response.data;
};

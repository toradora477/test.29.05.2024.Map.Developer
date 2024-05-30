import { Dispatch } from 'redux';
import axios from 'axios';
import {
  Marker,
  MarkerActionTypes,
  FETCH_MARKERS_REQUEST,
  FETCH_MARKERS_SUCCESS,
  FETCH_MARKERS_FAILURE,
  ADD_MARKER_SUCCESS,
  ADD_MARKER_FAILURE,
  REMOVE_MARKER_SUCCESS,
  REMOVE_MARKER_FAILURE,
} from './types';

const API_BASE_URL = 'http://localhost:3005';

const createMarker = async (data: { lat: number; lng: number; comment: string }) => {
  const response = await axios.post(`${API_BASE_URL}/markers`, data);
  return response.data;
};

const getMarkers = async () => {
  const response = await axios.get(`${API_BASE_URL}/markers`);
  return response.data;
};

const deleteMarker = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/markers/${id}`);
  return response.data;
};

export const fetchMarkers = () => async (dispatch: Dispatch<MarkerActionTypes>) => {
  dispatch({ type: FETCH_MARKERS_REQUEST });
  try {
    const response = await getMarkers();
    dispatch({ type: FETCH_MARKERS_SUCCESS, payload: response.result });
  } catch (err) {
    const error = err as Error;
    dispatch({ type: FETCH_MARKERS_FAILURE, error: error.message });
  }
};

export const addMarker = (marker: Omit<Marker, 'id'>) => async (dispatch: Dispatch<MarkerActionTypes>) => {
  try {
    const response = await createMarker(marker);
    dispatch({ type: ADD_MARKER_SUCCESS, payload: response });
  } catch (err) {
    const error = err as Error;
    dispatch({ type: ADD_MARKER_FAILURE, error: error.message });
  }
};

export const removeMarker = (id: number) => async (dispatch: Dispatch<MarkerActionTypes>) => {
  try {
    await deleteMarker(id);
    dispatch({ type: REMOVE_MARKER_SUCCESS, payload: id });
  } catch (err) {
    const error = err as Error;
    dispatch({ type: REMOVE_MARKER_FAILURE, error: error.message });
  }
};

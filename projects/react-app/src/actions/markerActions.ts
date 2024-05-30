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

export const fetchMarkers = () => async (dispatch: Dispatch<MarkerActionTypes>) => {
  dispatch({ type: FETCH_MARKERS_REQUEST });
  try {
    const response = await axios.get('/api/markers');
    dispatch({ type: FETCH_MARKERS_SUCCESS, payload: response.data });
  } catch (err) {
    const error = err as Error;
    dispatch({ type: FETCH_MARKERS_FAILURE, error: error.message });
  }
};

export const addMarker = (marker: Omit<Marker, 'id'>) => async (dispatch: Dispatch<MarkerActionTypes>) => {
  try {
    const response = await axios.post('/api/markers', marker);
    dispatch({ type: ADD_MARKER_SUCCESS, payload: response.data });
  } catch (err) {
    const error = err as Error;
    dispatch({ type: ADD_MARKER_FAILURE, error: error.message });
  }
};

export const removeMarker = (id: number) => async (dispatch: Dispatch<MarkerActionTypes>) => {
  try {
    await axios.delete(`/api/markers/${id}`);
    dispatch({ type: REMOVE_MARKER_SUCCESS, payload: id });
  } catch (err) {
    const error = err as Error;
    dispatch({ type: REMOVE_MARKER_FAILURE, error: error.message });
  }
};

import { createMarker, getMarkers, deleteMarker } from '../api';
import { Dispatch } from 'redux';

export const FETCH_MARKERS_REQUEST = 'FETCH_MARKERS_REQUEST';
export const FETCH_MARKERS_SUCCESS = 'FETCH_MARKERS_SUCCESS';
export const FETCH_MARKERS_FAILURE = 'FETCH_MARKERS_FAILURE';
export const ADD_MARKER_SUCCESS = 'ADD_MARKER_SUCCESS';
export const DELETE_MARKER_SUCCESS = 'DELETE_MARKER_SUCCESS';

export const fetchMarkers = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_MARKERS_REQUEST });
  try {
    const data = await getMarkers();
    dispatch({ type: FETCH_MARKERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_MARKERS_FAILURE, error });
  }
};

export const addMarker = (marker: { lat: number; lng: number; comment: string }) => async (dispatch: Dispatch) => {
  const data = await createMarker(marker);
  dispatch({ type: ADD_MARKER_SUCCESS, payload: data });
};

export const removeMarker = (id: number) => async (dispatch: Dispatch) => {
  await deleteMarker(id);
  dispatch({ type: DELETE_MARKER_SUCCESS, payload: id });
};

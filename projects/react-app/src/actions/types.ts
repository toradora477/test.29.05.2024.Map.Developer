export interface Marker {
  id: number;
  lat: number;
  lng: number;
  comment: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface MarkerState {
  markers: Marker[];
  loading: boolean;
  error: string | null;
}

export const FETCH_MARKERS_REQUEST = 'FETCH_MARKERS_REQUEST';
export const FETCH_MARKERS_SUCCESS = 'FETCH_MARKERS_SUCCESS';
export const FETCH_MARKERS_FAILURE = 'FETCH_MARKERS_FAILURE';
export const ADD_MARKER_SUCCESS = 'ADD_MARKER_SUCCESS';
export const ADD_MARKER_FAILURE = 'ADD_MARKER_FAILURE';
export const REMOVE_MARKER_SUCCESS = 'REMOVE_MARKER_SUCCESS';
export const REMOVE_MARKER_FAILURE = 'REMOVE_MARKER_FAILURE';

interface FetchMarkersRequestAction {
  type: typeof FETCH_MARKERS_REQUEST;
}

interface FetchMarkersSuccessAction {
  type: typeof FETCH_MARKERS_SUCCESS;
  payload: Marker[];
}

interface FetchMarkersFailureAction {
  type: typeof FETCH_MARKERS_FAILURE;
  error: string;
}

interface AddMarkerSuccessAction {
  type: typeof ADD_MARKER_SUCCESS;
  payload: Marker;
}

interface AddMarkerFailureAction {
  type: typeof ADD_MARKER_FAILURE;
  error: string;
}

interface RemoveMarkerSuccessAction {
  type: typeof REMOVE_MARKER_SUCCESS;
  payload: number;
}

interface RemoveMarkerFailureAction {
  type: typeof REMOVE_MARKER_FAILURE;
  error: string;
}

export type MarkerActionTypes =
  | FetchMarkersRequestAction
  | FetchMarkersSuccessAction
  | FetchMarkersFailureAction
  | AddMarkerSuccessAction
  | AddMarkerFailureAction
  | RemoveMarkerSuccessAction
  | RemoveMarkerFailureAction;

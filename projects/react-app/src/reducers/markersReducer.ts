import {
  MarkerState,
  MarkerActionTypes,
  FETCH_MARKERS_REQUEST,
  FETCH_MARKERS_SUCCESS,
  FETCH_MARKERS_FAILURE,
  ADD_MARKER_SUCCESS,
  ADD_MARKER_FAILURE,
  REMOVE_MARKER_SUCCESS,
  REMOVE_MARKER_FAILURE,
} from '../actions/types';

const initialState: MarkerState = {
  markers: [],
  loading: false,
  error: null,
};

const markersReducer = (state = initialState, action: MarkerActionTypes): MarkerState => {
  switch (action.type) {
    case FETCH_MARKERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MARKERS_SUCCESS:
      return { ...state, loading: false, markers: action.payload };
    case FETCH_MARKERS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ADD_MARKER_SUCCESS:
      return { ...state, markers: [...state.markers, action.payload] };
    case ADD_MARKER_FAILURE:
      return { ...state, error: action.error };
    case REMOVE_MARKER_SUCCESS:
      return { ...state, markers: state.markers.filter((marker) => marker.id !== action.payload) };
    case REMOVE_MARKER_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default markersReducer;

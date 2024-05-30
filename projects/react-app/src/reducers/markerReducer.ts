import {
  FETCH_MARKERS_REQUEST,
  FETCH_MARKERS_SUCCESS,
  FETCH_MARKERS_FAILURE,
  ADD_MARKER_SUCCESS,
  DELETE_MARKER_SUCCESS,
} from '../actions/markerActions';

interface MarkerState {
  markers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MarkerState = {
  markers: [],
  loading: false,
  error: null,
};

const markerReducer = (state = initialState, action: any): MarkerState => {
  switch (action.type) {
    case FETCH_MARKERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MARKERS_SUCCESS:
      return { ...state, loading: false, markers: action.payload };
    case FETCH_MARKERS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ADD_MARKER_SUCCESS:
      return { ...state, markers: [...state.markers, action.payload] };
    case DELETE_MARKER_SUCCESS:
      return { ...state, markers: state.markers.filter((marker) => marker.id !== action.payload) };
    default:
      return state;
  }
};

export default markerReducer;

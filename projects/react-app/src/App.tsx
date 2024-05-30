import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarkers, addMarker, removeMarker } from './actions/markerActions';
import { RootState, AppDispatch } from './reducers/store';
import { Map, MarkerForm, MarkerList } from './components';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const markers = useSelector((state: RootState) => state.markers.markers);
  const loading = useSelector((state: RootState) => state.markers.loading);
  const error = useSelector((state: RootState) => state.markers.error);

  useEffect(() => {
    dispatch(fetchMarkers());
  }, [dispatch]);

  const handleAddMarker = (marker: { lat: number; lng: number; comment: string }) => {
    dispatch(addMarker(marker));
  };

  const handleDeleteMarker = (id: number) => {
    dispatch(removeMarker(id));
  };

  return (
    <div>
      <h1>Map with Markers</h1>
      <Map markers={markers} />
      <MarkerForm onSubmit={handleAddMarker} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <MarkerList markers={markers} onDelete={handleDeleteMarker} />
    </div>
  );
};

export default App;

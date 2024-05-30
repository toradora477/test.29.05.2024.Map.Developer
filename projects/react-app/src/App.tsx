import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarkers, addMarker, removeMarker } from './actions/markerActions';
import { RootState, AppDispatch } from './reducers/store';
import { Map, MarkerForm, MarkerList } from './components';
import { Marker } from './actions/types';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const markers = useSelector((state: RootState) => state.markers.markers);
  const loading = useSelector((state: RootState) => state.markers.loading);
  const error = useSelector((state: RootState) => state.markers.error);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchMarkers());
  }, [dispatch]);

  const handleAddMarker = (marker: { lat: number; lng: number; comment: string }) => {
    const newMarker: Omit<Marker, 'id'> = {
      ...marker,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addMarker(newMarker));
  };

  const handleDeleteMarker = (id: number) => {
    dispatch(removeMarker(id));
  };

  const filteredMarkers = markers.filter((marker) => marker.comment.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="App">
      <div className="group-top">
        <div className="info-panel">
          <input
            type="text"
            placeholder="Пошук"
            className="search-marker-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MarkerList markers={filteredMarkers} onDelete={handleDeleteMarker} />
        </div>
        <div className="map-container">
          <Map markers={filteredMarkers} />
        </div>
      </div>
      <div className="group-bottom">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <MarkerForm onSubmit={handleAddMarker} />
      </div>
    </div>
  );
};

export default App;

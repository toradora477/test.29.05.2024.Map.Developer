import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarkers, addMarker, removeMarker, updateMarker } from './actions/markerActions';
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
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

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

  const onEdit = (id: number) => {
    const markerToEdit = markers.find((marker) => marker.id === id);
    if (markerToEdit) {
      setSelectedMarker(markerToEdit);
    }
  };

  const handleEditMarker = (marker: Marker) => {
    const updatedMarker: Marker = {
      ...marker,
      updatedAt: new Date().toISOString(),
    };

    if (selectedMarker) {
      dispatch(updateMarker(selectedMarker.id, updatedMarker));
    }
  };

  const filteredMarkers = markers.filter((marker) => marker.comment?.toLowerCase()?.includes(searchQuery?.toLowerCase()));

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
          <MarkerList onEdit={onEdit} markers={filteredMarkers} onDelete={handleDeleteMarker} />
        </div>
        <div className="map-container">
          <Map markers={filteredMarkers} />
        </div>
      </div>
      <div className="group-bottom">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <MarkerForm onSubmit={handleAddMarker} editMarker={selectedMarker} onEdit={handleEditMarker} />
      </div>
    </div>
  );
};

export default App;

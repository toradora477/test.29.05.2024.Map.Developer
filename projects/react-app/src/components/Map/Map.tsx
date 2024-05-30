import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

interface MarkerType {
  id: number;
  lat: number;
  lng: number;
  comment: string;
}

interface MapProps {
  markers: MarkerType[];
}

const Map: React.FC<MapProps> = ({ markers }) => {
  const position: LatLngExpression = [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
          <Popup>{marker.comment}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

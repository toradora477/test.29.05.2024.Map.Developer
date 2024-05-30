import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { Marker as MarkerType } from '../../actions/types';
import './Map.scss';
import L from 'leaflet';
import { map_point } from '../../images';

interface MapProps {
  markers: MarkerType[];
}

const customMarkerIcon = new L.Icon({
  iconUrl: map_point,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Map: React.FC<MapProps> = ({ markers }) => {
  const position: LatLngExpression = [51.505, -0.09];

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={customMarkerIcon}>
            <Popup>{marker.comment}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

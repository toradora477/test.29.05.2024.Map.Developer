import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { Marker as MarkerType } from '../../actions/types';
import './Map.scss';
import L from 'leaflet';
import { map_point_red } from '../../images';

interface MapProps {
  markers: MarkerType[];
}

const customMarkerIcon = new L.Icon({
  iconUrl: map_point_red,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Map: React.FC<MapProps> = ({ markers }) => {
  let position: LatLngExpression = [49.0246, 31.2859]; // Координати для центрування на Україні

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={6} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={customMarkerIcon}>
            <Popup>
              <p className="comment">{marker.comment ?? ''}</p>
              {marker.createdAt && <p className="date">Додано: {new Date(marker.createdAt).toLocaleString()}</p>}
              {marker.updatedAt && <p className="date">Змінено: {new Date(marker.updatedAt).toLocaleString()}</p>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

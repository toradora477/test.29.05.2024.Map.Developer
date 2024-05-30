import React from 'react';
import './MarkerList.scss';
import { map_point_white } from '../../images';

interface MarkerType {
  id: number;
  lat: number;
  lng: number;
  comment: string;
}

interface MarkerListProps {
  markers: MarkerType[];
  onDelete: (id: number) => void;
}

const MarkerList: React.FC<MarkerListProps> = ({ markers, onDelete }) => {
  return (
    <ul className="marker-list">
      {markers.map((marker) => (
        <li key={marker.id} className="marker-list-item">
          <img src={map_point_white} alt="icon" style={{ height: 32, width: 32 }} />
          <span className="marker-comment">{marker.comment}</span>
          <button className="delete-button" onClick={() => onDelete(marker.id)}>
            Видалити
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MarkerList;

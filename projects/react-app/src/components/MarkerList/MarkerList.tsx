import React from 'react';
import './MarkerList.scss';

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
          <span className="marker-comment">{marker.comment}</span>
          <button className="delete-button" onClick={() => onDelete(marker.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MarkerList;

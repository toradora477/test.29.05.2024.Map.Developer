import React from 'react';

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
    <ul>
      {markers.map((marker) => (
        <li key={marker.id}>
          <span>{marker.comment}</span>
          <button onClick={() => onDelete(marker.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default MarkerList;

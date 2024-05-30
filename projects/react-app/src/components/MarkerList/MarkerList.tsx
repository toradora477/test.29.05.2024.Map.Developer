import React from 'react';
import './MarkerList.scss';
import { map_point_white } from '../../images';
import { Marker } from '../../actions/types';

interface MarkerListProps {
  markers: Marker[];
  onEdit: (mid: number) => void;
  onDelete: (id: number) => void;
}

const MarkerList: React.FC<MarkerListProps> = ({ markers, onEdit, onDelete }) => {
  return (
    <ul className="marker-list">
      {markers.map((marker) => (
        <li key={marker.id} className="marker-list-item">
          <img src={map_point_white} alt="icon" style={{ height: 32, width: 32 }} />
          <span className="marker-comment">{marker.comment}</span>
          <button className="edit-button" onClick={() => onEdit(marker.id)}>
            Редагувати
          </button>
          &nbsp;
          <button className="delete-button" onClick={() => onDelete(marker.id)}>
            Видалити
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MarkerList;

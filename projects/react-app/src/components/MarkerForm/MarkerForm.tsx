import React, { useState, FormEvent, useEffect } from 'react';
import './MarkerForm.scss';
import { Marker } from '../../actions/types';

interface MarkerFormProps {
  onSubmit: (marker: Marker) => void;
  editMarker: Marker | null;
}

const MarkerForm: React.FC<MarkerFormProps> = ({ onSubmit, editMarker }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editMarker) {
      setLat(editMarker.lat.toString());
      setLng(editMarker.lng.toString());
      setComment(editMarker.comment);
    }
  }, [editMarker]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      setError('Latitude must be a number between -90 and 90.');
      return;
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      setError('Longitude must be a number between -180 and 180.');
      return;
    }

    setError('');
    const newMarker: Marker = {
      id: editMarker ? editMarker.id : Date.now(), // Use current timestamp as ID if it's a new marker
      lat: latitude,
      lng: longitude,
      comment: comment,
      createdAt: editMarker ? editMarker.createdAt : new Date().toISOString(), // Use current time for new marker
      updatedAt: new Date().toISOString(),
    };
    onSubmit(newMarker);
    setLat('');
    setLng('');
    setComment('');
  };

  return (
    <form className="marker-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <input
        className="input-field"
        type="number"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Широта"
        min="-90"
        max="90"
        step="0.000001"
        required
      />
      <input
        className="input-field"
        type="number"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        placeholder="Довгота"
        min="-180"
        max="180"
        step="0.000001"
        required
      />
      <input className="input-field" type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Коментар" required />
      <button className="submit-button" type="submit">
        {editMarker ? 'Редагувати маркер' : 'Додати маркер'}
      </button>
    </form>
  );
};

export default MarkerForm;

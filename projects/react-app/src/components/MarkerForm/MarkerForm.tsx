import React, { useState, FormEvent } from 'react';
import './MarkerForm.scss';

interface MarkerFormProps {
  onSubmit: (marker: { lat: number; lng: number; comment: string }) => void;
}

const MarkerForm: React.FC<MarkerFormProps> = ({ onSubmit }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

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
    onSubmit({ lat: latitude, lng: longitude, comment });
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
        placeholder="Latitude"
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
        placeholder="Longitude"
        min="-180"
        max="180"
        step="0.000001"
        required
      />
      <input className="input-field" type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" required />
      <button className="submit-button" type="submit">
        Add Marker
      </button>
    </form>
  );
};

export default MarkerForm;

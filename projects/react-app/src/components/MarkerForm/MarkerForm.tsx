import React, { useState, FormEvent } from 'react';

interface MarkerFormProps {
  onSubmit: (marker: { lat: number; lng: number; comment: string }) => void;
}

const MarkerForm: React.FC<MarkerFormProps> = ({ onSubmit }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ lat: parseFloat(lat), lng: parseFloat(lng), comment });
    setLat('');
    setLng('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" />
      <input type="text" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" />
      <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" />
      <button type="submit">Add Marker</button>
    </form>
  );
};

export default MarkerForm;

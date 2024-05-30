// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">

//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarkers, addMarker, removeMarker } from './actions/markerActions';
import { RootState } from './reducers';
import Map from './components/Map';
import MarkerForm from './components/MarkerForm';
import MarkerList from './components/MarkerList';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state: RootState) => state.markers.markers);
  const loading = useSelector((state: RootState) => state.markers.loading);
  const error = useSelector((state: RootState) => state.markers.error);

  useEffect(() => {
    dispatch(fetchMarkers());
  }, [dispatch]);

  const handleAddMarker = (marker: { lat: number; lng: number; comment: string }) => {
    dispatch(addMarker(marker));
  };

  const handleDeleteMarker = (id: number) => {
    dispatch(removeMarker(id));
  };

  return (
    <div>
      <h1>Map with Markers</h1>
      <Map markers={markers} />
      <MarkerForm onSubmit={handleAddMarker} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <MarkerList markers={markers} onDelete={handleDeleteMarker} />
    </div>
  );
};

export default App;

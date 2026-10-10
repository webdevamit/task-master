import { useState } from 'react';
import Header from './components/header';

const App = () => {
  const [selectedPlaneId, setSelectedPlaneId] = useState<string | null>(null);

  const handlePlaneClick = (planeId: string) => {
    setSelectedPlaneId(planeId);
  };

  const handleClosePopup = () => {
    setSelectedPlaneId(null);
  };

  return (
    <main className="App">
      <Header />
      <div className="app__content">
        <div className="app__map">
          {/* Render your map component here */}
          <p>Map goes here</p>
          <button onClick={() => handlePlaneClick('plane-123')}>Select Plane</button>
        </div>
        {selectedPlaneId && (
          <div className="app__popup">
            <button onClick={handleClosePopup}>Close</button>
            <p>Selected Plane ID: {selectedPlaneId}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;

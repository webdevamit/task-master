import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Header from './components/header';
import Plane from './components/plane';
import ModalBox from './components/modal-box';

const App = () => {
  const [selectedPlaneId, setSelectedPlaneId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedPlaneId) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPlaneId(null);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedPlaneId]);

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
          <button onClick={() => handlePlaneClick('plane-1')}>Select Plane</button>
        </div>

        {selectedPlaneId &&
          createPortal(
            <ModalBox onClose={handleClosePopup}>
              <Plane planeId={selectedPlaneId} onClose={handleClosePopup} />
            </ModalBox>,
            document.body,
          )}
      </div>
    </main>
  );
};

export default App;

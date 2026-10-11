import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Header from './components/header';
import Plane from './components/plane/plane';
import ModalBox from './components/ui/modal';
import MapView from './components/map';

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
    <main className="app">
      <Header />
      <MapView onSelectPlane={handlePlaneClick} />

      {selectedPlaneId &&
        createPortal(
          <ModalBox onClose={handleClosePopup}>
            <Plane planeId={selectedPlaneId} onClose={handleClosePopup} />
          </ModalBox>,
          document.body,
        )}
    </main>
  );
};

export default App;

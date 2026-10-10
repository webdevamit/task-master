import { LABELS } from '../constants/labels';
import { usePlane } from '../hooks/usePlane';

const Plane = (planeId: string, onClose: () => void) => {
  const { status, data } = usePlane(planeId);
  return (
    <header className="flex bg-gray-800 text-white p-4 app__header">
      <h1 className="text-xl font-bold">Flight Header</h1>
      <span className="text-sm bg-green-500 font-bold text-white p-2 rounded ml-auto">
        {LABELS[status](data.length)}
      </span>
    </header>
  );
};

export default Plane;

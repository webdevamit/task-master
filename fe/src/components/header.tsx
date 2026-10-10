import { LABELS } from '../constants/labels';
import usePlanes from '../hooks/usePlanes';

const Header = () => {
  const { status, data } = usePlanes();
  return (
    <header className="flex bg-gray-800 text-white p-4 app__header">
      <h1 className="text-xl font-bold">Flight Header</h1>
      <span className="text-sm bg-green-500 font-bold text-white p-2 rounded ml-auto">
        {LABELS[status](data.length)}
      </span>
    </header>
  );
};

export default Header;

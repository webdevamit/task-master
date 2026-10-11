import { background, LABELS } from '../constants/labels';
import usePlanes from '../hooks/usePlanes';

const Header = () => {
  const { status, data } = usePlanes();
  const bgColor = background[status] || 'bg-red-500';
  return (
    <header className="flex bg-gray-800 text-white p-4 app__header">
      <h1 className="text-xl font-bold">Flight Header</h1>
      <span className={`text-sm ${bgColor} font-bold text-white p-2 rounded ml-auto`}>
        {LABELS[status]((data?.length ?? 0) as unknown as string)}
      </span>
    </header>
  );
};

export default Header;

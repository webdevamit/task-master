import type { ReactNode } from 'react';

type ModalBoxProps = {
  onClose: () => void;
  children: ReactNode;
};

const ModalBox = ({ onClose, children }: ModalBoxProps) => (
  <div
    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
    onClick={onClose}
    role="presentation"
  >
    <div
      className="min-w-[250px] max-w-[600px] rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  </div>
);

export default ModalBox;

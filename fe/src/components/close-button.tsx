const CloseButton = ({ onClose }: { onClose: () => void }) => (
  <button
    type="button"
    onClick={onClose}
    aria-label="Close flight details"
    className="rounded p-1 text-[10px] text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
  >
    ✕
  </button>
);

export default CloseButton;

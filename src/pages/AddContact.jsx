const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // If modal is not open, don't render anything

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Modal Title</h2>
        <p>This is the modal content.</p>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
};

export default Modal;

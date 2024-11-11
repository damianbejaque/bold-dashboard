import { useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = forwardRef(function Modal(
  { children, isOpen, onClose }: ModalProps,
  ref
) {
  const modalRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => handleOpen(),
    close: () => handleClose(),
  }));

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [isOpen]);

  const handleOpen = () => {
    if (modalRef.current) {
      modalRef.current.style.display = "flex";
      setTimeout(() => {
        modalRef.current?.classList.add("modal-show");
      }, 10);
    }
  };

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove("modal-show");
      setTimeout(() => {
        if (modalRef.current) modalRef.current.style.display = "none";
        onClose();
      }, 300);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };

  return createPortal(
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="modal fixed inset-0 flex  justify-end bg-stone-900/90 p-4"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
});

export default Modal;

import { XCircleIcon } from "@heroicons/react/24/outline";
import { useSelectedItem } from "../context/SelectedItemContex";
import { useCallback } from "react";
function Modal({ title, children, onOpen, open, type = "normal" }) {
  const { selectCharacter } = useSelectedItem();
  const handleClose = useCallback(() => {
    if (type === "custom") {
      selectCharacter(null);
    }

    onOpen(false);
  }, [selectCharacter, onOpen]);

  if (!open) return null;
  return (
    <div className="backdrop">
      <div className={`${type === "normal" ? "modal" : "custom-modal"}`}>
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={handleClose}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;

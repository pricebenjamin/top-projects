import { useRef, useEffect } from "react";
import "./ConfirmationModal.css";

interface ConfirmationModalProps {
  show: boolean;
  heading: string;
  message: string;
  onAccept: () => void;
  onReject: () => void;
}

export function ConfirmationModal({
  show,
  heading,
  message,
  onAccept,
  onReject,
}: ConfirmationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (show) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [show]);

  return (
    <dialog ref={dialogRef} className="confirmation-modal">
      <div className="contents">
        <h1 className="heading">{heading}</h1>
        <p className="message">{message}</p>
        <form method="dialog" className="buttons">
          <button onClick={onReject}>No</button>
          <button onClick={onAccept}>Yes</button>
        </form>
      </div>
    </dialog>
  );
}

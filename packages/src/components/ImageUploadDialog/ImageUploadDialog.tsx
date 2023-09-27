import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./ImageUploadDialog.css";
import { MainButton } from "../Buttons";
import useDebounce from "../../hook/useDebounce";

interface ImageUploadDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ImageUploadDialog(props: ImageUploadDialogProps) {
  const { isOpen, setIsOpen } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [url, setUrl] = useState("");
  const debounced = useDebounce<string>(url, 250);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function handleSubmit() {
    onClose();
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <dialog ref={dialogRef} autoFocus onClose={onClose} className="dialog">
      <form method="dialog" onSubmit={handleSubmit} className="form-column">
        <button onClick={onClose} className="close-btn">
          <img src="/icons/x.svg" width="20" height="20" alt="close" />
        </button>
        <h2>Upload Image URL</h2>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />
        {debounced && (
          <img
            src={debounced}
            alt="preview"
            draggable="false"
            width="300"
            height="300"
            className="preview-image"
          />
        )}
        {/* @ts-ignore */}
        <MainButton type="submit" style={{ width: "30rem" }}>
          Upload!
        </MainButton>
      </form>
    </dialog>
  );
}

export default ImageUploadDialog;

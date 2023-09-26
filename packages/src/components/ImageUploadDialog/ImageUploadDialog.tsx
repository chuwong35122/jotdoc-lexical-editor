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
      <form method="dialog" onSubmit={handleSubmit}>
        <h2>Upload Image URL</h2>
        <div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
          />
          {debounced && (
            <div className="preview-image-container">
              <img
                src={debounced}
                alt="preview"
                draggable="false"
                width="400"
                height="400"
                className="preview-image"
              />
            </div>
          )}
          {/* @ts-ignore */}
          <MainButton type="submit" style={{ width: "100%" }}>
            Upload!
          </MainButton>
        </div>
      </form>
    </dialog>
  );
}

export default ImageUploadDialog;

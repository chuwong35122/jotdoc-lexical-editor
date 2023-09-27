import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
// import "./ImageUploadDialog.css";
import { MainButton } from "../Buttons";
import useDebounce from "../../hook/useDebounce";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_IMAGE_COMMAND } from "../../plugins/ImagePlugin";
import { ImageUploadedPayload } from "../../nodes/ImageNode";

interface ImageUploadDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ImageUploadDialog(props: ImageUploadDialogProps) {
  const { isOpen, setIsOpen } = props;
  const [editor] = useLexicalComposerContext()
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [url, setUrl] = useState("");
  const [altText, setAltText] = useState("")

  const debounced = useDebounce<string>(url, 250);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function handleSubmit() {
    const payload: ImageUploadedPayload = {
      altText: altText,
      maxWidth: 800,
      width: 800,
      height: undefined,
      key: undefined,
      src: debounced,
    };

    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
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
          placeholder="Enter Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />
        <input
          type="text"
          placeholder="Enter Image Alt Text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
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

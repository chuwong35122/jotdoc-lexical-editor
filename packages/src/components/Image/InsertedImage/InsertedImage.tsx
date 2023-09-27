import type {
  GridSelection,
  LexicalEditor,
  NodeKey,
  NodeSelection,
  RangeSelection,
} from "lexical";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DRAGSTART_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $isImageNode } from "../../../nodes/ImageNode";
import ImageResizer from "../ImageResizer/ImageResizer";
import "./InsertedImage.css";

interface Props {
  altText: string;
  height: "inherit" | number;
  maxWidth: number;
  nodeKey: NodeKey;
  src: string;
  width: "inherit" | number;
}

export default function InsertedImage({
  src,
  altText,
  nodeKey,
  width,
  height,
  maxWidth,
}: Props): JSX.Element {
  const imageRef = useRef<null | HTMLImageElement>(null);
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<
    RangeSelection | NodeSelection | GridSelection | null
  >(null);
  const activeEditorRef = useRef<LexicalEditor | null>(null);

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) {
          node.remove();
        }
      }
      return false;
    },
    [isSelected, nodeKey]
  );

  useEffect(() => {
    let isMounted = true;
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor;
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;

          if (isResizing) {
            return true;
          }
          if (event.target === imageRef.current) {
            if (event.shiftKey) {
              setSelected(!isSelected);
            } else {
              clearSelection();
              setSelected(true);
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            event.preventDefault();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
    return () => {
      isMounted = false;
      unregister();
    };
  }, [
    clearSelection,
    editor,
    isResizing,
    isSelected,
    nodeKey,
    onDelete,
    setSelected,
  ]);

  const onResizeEnd = (
    nextWidth: "inherit" | number,
    nextHeight: "inherit" | number
  ) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight);
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const draggable = isSelected && $isNodeSelection(selection) && !isResizing;
  return (
    <div style={{ position: "relative", width: "max-content", margin: "auto" }}>
      <Suspense fallback={null}>
        <ImageResizer
          editor={editor}
          imageRef={imageRef}
          maxWidth={maxWidth}
          onResizeStart={onResizeStart}
          onResizeEnd={onResizeEnd}
        >
          <div draggable={draggable}>
            <img
              src={src}
              alt={altText}
              ref={imageRef}
              width={width}
              height={height}
              draggable="false"
              style={{ maxWidth: maxWidth, margin: "auto" }}
            />
          </div>
        </ImageResizer>
      </Suspense>
    </div>
  );
}

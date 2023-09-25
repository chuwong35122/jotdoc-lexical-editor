import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  RangeSelection,
} from "lexical";
import { $isListNode, ListNode } from "@lexical/list";
import { $isLinkNode } from "@lexical/link";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { DEFAULT_TEXT } from "../constants/themes";
import { $getSelectionStyleValueForProperty } from "@lexical/selection";
import { BlockType, TextAlignType } from "../types/block.interface";
import { getSelectedNode } from "../utils/selection";

interface EditorToolbarContextStruct {
  blockType: BlockType;
  setBlockType: Dispatch<SetStateAction<BlockType>>;
  selectedElementKey: any;
  canUndo: boolean;
  canRedo: boolean;
  fontSize: string;
  setFontSize: Dispatch<SetStateAction<string>>;
  isBold: boolean;
  setIsBold: Dispatch<SetStateAction<boolean>>;
  isItalic: boolean;
  setIsItalic: Dispatch<SetStateAction<boolean>>;
  isUnderline: boolean;
  setIsUnderline: Dispatch<SetStateAction<boolean>>;
  isStrikethrough: boolean;
  setIsStrikethrough: Dispatch<SetStateAction<boolean>>;
  isCode: boolean;
  setIsCode: Dispatch<SetStateAction<boolean>>;
  isLink: boolean;
  setIsLink: Dispatch<SetStateAction<boolean>>;
  fontColor: string;
  setFontColor: Dispatch<SetStateAction<string>>;
  fontFamily: string;
  setFontFamily: Dispatch<SetStateAction<string>>;
  highlightedColor: string;
  setHighlightedColor: Dispatch<SetStateAction<string>>;
  textAlign: string | TextAlignType
  activeComponent: number | null;
  setActiveComponent: Dispatch<SetStateAction<number | null>>;
}

export const EditorToolbarContext = createContext(
  {} as EditorToolbarContextStruct
);

const EditorToolbarContextProvider = ({ ...props }) => {
  const [blockType, setBlockType] = useState<BlockType>("Text");
  const [editor] = useLexicalComposerContext();
  const [selectedElementKey, setSelectedElementKey] = useState<any>();

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const [fontSize, setFontSize] = useState<string>(DEFAULT_TEXT.fontSize);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);

  const [textAlign, setTextAlign] = useState<TextAlignType | string>("left");

  const [fontColor, setFontColor] = useState<string>(DEFAULT_TEXT.color);
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [highlightedColor, setHighlightedColor] = useState<string>(
    DEFAULT_TEXT.highlight
  );

  const [activeComponent, setActiveComponent] = useState<number | null>(null);

  // Update toolbar when selection changes
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    const node = getSelectedNode(selection as RangeSelection);
    const parent = node.getParent();

    // Get selected nodes
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM) {
        setSelectedElementKey(elementKey);

        // Check for list node
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type as BlockType);
        } else {
          const type = element.getType();
          if (type === "heading") {
          // TODO: use matching type as 'BlockTypes' object
            const tag = element.getTag(); // check for heading node
            setBlockType(tag);
          } else if (type === "paragraph") {
            setBlockType(type as BlockType);
          }
        }
      }

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setFontSize(
        $getSelectionStyleValueForProperty(
          selection,
          "font-size",
          DEFAULT_TEXT.fontSize
        )
      );
      setFontColor(
        $getSelectionStyleValueForProperty(
          selection,
          "color",
          DEFAULT_TEXT.color
        )
      );

      setHighlightedColor(
        $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          DEFAULT_TEXT.highlight
        )
      );

      setFontFamily(
        $getSelectionStyleValueForProperty(selection, "font-family", "Arial")
      );

      // $isElementNode(node)
      setTextAlign(
        ($isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType()) || "left"
      );

      setIsCode(selection.hasFormat("code"));
      // Update links
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),

      editor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [editor, updateToolbar]);

  const values: EditorToolbarContextStruct = {
    blockType,
    setBlockType,
    selectedElementKey,
    canUndo,
    canRedo,
    fontSize,
    setFontSize,
    isBold,
    setIsBold,
    isItalic,
    setIsItalic,
    isUnderline,
    setIsUnderline,
    isStrikethrough,
    setIsStrikethrough,
    isLink,
    setIsLink,
    isCode,
    setIsCode,
    fontColor,
    setFontColor,
    fontFamily,
    setFontFamily,
    highlightedColor,
    setHighlightedColor,
    textAlign,
    activeComponent,
    setActiveComponent,
  };

  return <EditorToolbarContext.Provider value={values} {...props} />;
};

export default EditorToolbarContextProvider;

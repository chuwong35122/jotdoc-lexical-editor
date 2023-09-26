import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SelectIconOption } from "../../types/select.interface";
import { SELECT_ICON_OPTIONS } from "../../constants/selector";
import "./BlockTypeSelector.css";
import { Theme } from "../../types/theme.interface";
import { THEME_COLORS } from "../../constants/themes";
import {
  transformBulletListNode,
  transformCheckListNode,
  transformCodeNode,
  transformH1Node,
  transformH2Node,
  transformH3Node,
  transformOrderedListNode,
  transformParagraphNode,
  transformQuoteNode,
} from "../../utils/block";
import { EditorToolbarContext } from "../../contexts/EditorToolbarContext";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import BlockTypeSelectorItem from "./BlockTypeSelectorItem";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import ImageUploadDialog from "../ImageUploadDialog/ImageUploadDialog";

interface BlockTypeSelectorProps {
  options: SelectIconOption[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  color?: Theme;
}

function BlockTypeSelector(props: BlockTypeSelectorProps) {
  const { options, activeIndex, setActiveIndex } = props;
  const { blockType, setBlockType } = useContext(EditorToolbarContext);
  const [editor] = useLexicalComposerContext();

  const selector = useRef<HTMLDivElement>(null);

  const [imageUploadOpen, setImageUploadOpen] = useState(!false);

  function handleClickOutside(event: MouseEvent) {
    if (!selector.current?.contains(event.target as Node)) {
      props.setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const index = options.findIndex((option) => option.value === blockType);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [blockType]);

  function toggleOpen() {
    props.setIsOpen((prev) => !prev);
  }

  function getActiveItemBgColor(color?: Theme) {
    return THEME_COLORS[color ?? "primary"].option;
  }

  return (
    <div ref={selector} className="select-container">
      <ImageUploadDialog isOpen={imageUploadOpen} setIsOpen={setImageUploadOpen} />
      {options[activeIndex] && (
        <button onClick={toggleOpen} className="select-button-container">
          <img
            src={options[activeIndex].icon}
            width={24}
            height={24}
            alt={options[activeIndex].label}
          />
          <p>{options[activeIndex].label}</p>
          <img
            src={
              props.isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"
            }
            width={24}
            height={24}
            alt={options[activeIndex].label}
            className="chevron"
          />
        </button>
      )}
      {props.isOpen && (
        <div className="select-option-wrapper">
          <BlockTypeSelectorItem
            index={0}
            option={SELECT_ICON_OPTIONS[0]}
            onClick={() => {
              transformParagraphNode(editor, blockType);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={1}
            option={SELECT_ICON_OPTIONS[1]}
            onClick={() => {
              transformH1Node(editor, blockType);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={2}
            option={SELECT_ICON_OPTIONS[2]}
            onClick={() => {
              transformH2Node(editor, blockType);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={3}
            option={SELECT_ICON_OPTIONS[3]}
            onClick={() => {
              transformH3Node(editor, blockType);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={4}
            option={SELECT_ICON_OPTIONS[4]}
            onClick={() => {
              transformOrderedListNode(editor, blockType);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={5}
            option={SELECT_ICON_OPTIONS[5]}
            onClick={() => {
              transformBulletListNode(editor, blockType);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={6}
            option={SELECT_ICON_OPTIONS[6]}
            onClick={() => {
              transformCheckListNode(editor, blockType);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={7}
            option={SELECT_ICON_OPTIONS[7]}
            onClick={() => {
              transformQuoteNode(editor, blockType);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={8}
            option={SELECT_ICON_OPTIONS[8]}
            onClick={() => {
              transformCodeNode(editor, blockType);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={9}
            option={SELECT_ICON_OPTIONS[9]}
            onClick={() => {
              editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={10}
            option={SELECT_ICON_OPTIONS[10]}
            onClick={() => {
              setImageUploadOpen(true);
              props.setIsOpen(false);
            }}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={11}
            option={SELECT_ICON_OPTIONS[11]}
          // onClick={() => }
            length={SELECT_ICON_OPTIONS.length}
          />
        </div>
      )}
    </div>
  );
}

export default BlockTypeSelector;

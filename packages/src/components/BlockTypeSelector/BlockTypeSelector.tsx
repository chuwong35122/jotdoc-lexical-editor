import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
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

interface BlockTypeSelectorProps {
  options: SelectIconOption[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  color?: Theme;
}

function BlockTypeSelector(props: BlockTypeSelectorProps) {
  const { options, activeIndex } = props;
  const { blockType, setBlockType } = useContext(EditorToolbarContext);
  const [editor] = useLexicalComposerContext();

  const selector = useRef<HTMLDivElement>(null);

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

  function toggleOpen() {
    props.setIsOpen((prev) => !prev);
  }

  function getActiveItemBgColor(color?: Theme) {
    return THEME_COLORS[color ?? "primary"].option;
  }

  return (
    <div ref={selector} className="select-container">
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
            onClick={() => transformParagraphNode(editor, blockType)}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={1}
            option={SELECT_ICON_OPTIONS[1]}
            onClick={() => transformH1Node(editor, blockType)}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={2}
            option={SELECT_ICON_OPTIONS[2]}
            onClick={() => transformH2Node(editor, blockType)}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={3}
            option={SELECT_ICON_OPTIONS[3]}
            onClick={() => transformH3Node(editor, blockType)}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={4}
            option={SELECT_ICON_OPTIONS[4]}
            onClick={() => transformOrderedListNode(editor, blockType)}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={5}
            option={SELECT_ICON_OPTIONS[5]}
            onClick={() => transformBulletListNode(editor, blockType)}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={6}
            option={SELECT_ICON_OPTIONS[6]}
            onClick={() => transformCheckListNode(editor, blockType)}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={7}
            option={SELECT_ICON_OPTIONS[7]}
            onClick={() => transformQuoteNode(editor, blockType)}
            length={SELECT_ICON_OPTIONS.length}
          />
          <BlockTypeSelectorItem
            index={8}
            option={SELECT_ICON_OPTIONS[8]}
            onClick={() => transformCodeNode(editor, blockType)}
            length={SELECT_ICON_OPTIONS.length}
          />
        </div>
      )}
    </div>
  );
}

export default BlockTypeSelector;

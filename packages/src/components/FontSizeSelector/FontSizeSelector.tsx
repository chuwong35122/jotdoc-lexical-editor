import React, { Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef } from "react";
import { SELECT_ICON_OPTIONS } from "../../constants/selector";
import "./FontSizeSelector.css";
import { Theme } from "../../types/theme.interface";
import { THEME_COLORS } from "../../constants/themes";
import { EditorToolbarContext } from "../../contexts/EditorToolbarContext";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $patchStyleText } from '@lexical/selection';

interface FontSizeSelectorProps {
  options: string[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  color?: Theme;
}

function FontSizeSelector(props: FontSizeSelectorProps) {
  const { options, isOpen, setIsOpen, color } = props;
  const { fontSize, setFontSize } = useContext(EditorToolbarContext);

  const [editor] = useLexicalComposerContext()
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

  function onClickItem(option: string) {
    props.setIsOpen(false);
    handleSelectFontSize(option)
  }

  const handleSelectFontSize = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            ['font-size']: option,
          });
        }
      });
    },
    [editor],
  );


  return (
    <div ref={selector} className="font-size-selector-container">
      <button onClick={toggleOpen} className="font-size-select-button-container">
        <p>{fontSize}</p>
        <img
          src={
            props.isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"
          }
          width={24}
          height={24}
          alt='Chevron'
          className="chevron"
        />
      </button>
      {props.isOpen && (
        <div className="select-option-wrapper">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onClickItem(option)}
              className={["font-size-select-option"].join(" ")}
              style={{
                borderBottom:
                  index === options.length - 1
                    ? "none"
                    : "1px solid #e0e0e0",
                borderRadius:
                  index === options.length - 1
                    ? "0 0 0.5rem 0.5rem"
                    : "none",
              }}
            >
              <p>{option}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FontSizeSelector;

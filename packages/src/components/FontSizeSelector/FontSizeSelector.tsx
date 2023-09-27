import React, { Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef } from "react";
import "./FontSizeSelector.css";
import { Theme } from "../../types/theme.interface";
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
  const { options, isOpen, setIsOpen } = props;
  const { fontSize } = useContext(EditorToolbarContext);

  const [editor] = useLexicalComposerContext()
  const selector = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (!selector.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }

  function onClickItem(option: string) {
    setIsOpen(false);
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
            isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"
          }
          width={24}
          height={24}
          alt='Chevron'
          className="chevron"
        />
      </button>
      {isOpen && (
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

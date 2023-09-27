import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import "./FontFamilySelector.css";
import { Theme } from "../../types/theme.interface";
import { EditorToolbarContext } from "../../contexts/EditorToolbarContext";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $patchStyleText } from "@lexical/selection";

interface FontFamilySelectorProps {
  options: string[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  color?: Theme;
}

function FontFamilySelector(props: FontFamilySelectorProps) {
  const { options, isOpen, setIsOpen } = props;
  const { fontFamily } = useContext(EditorToolbarContext);

  const [editor] = useLexicalComposerContext();
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
    handleSelectFontSize(option);
  }

  const handleSelectFontSize = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            ["font-family"]: option,
          });
        }
      });
    },
    [editor]
  );

  return (
    <div ref={selector} className="font-family-selector-container">
      <button
        onClick={toggleOpen}
        className="font-family-select-button-container"
      >
        <p>{fontFamily}</p>
        <img
          src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
          width={24}
          height={24}
          alt="Chevron"
          className="chevron"
        />
      </button>
      {isOpen && (
        <div className="select-option-wrapper">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onClickItem(option)}
              className={["font-family-select-option"].join(" ")}
              style={{
                borderBottom:
                  index === options.length - 1 ? "none" : "1px solid #e0e0e0",
                borderRadius:
                  index === options.length - 1 ? "0 0 0.5rem 0.5rem" : "none",
                fontFamily: option
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

export default FontFamilySelector;

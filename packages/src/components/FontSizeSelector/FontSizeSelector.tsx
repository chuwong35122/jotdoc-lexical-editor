import React, { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { SELECT_ICON_OPTIONS } from "../../constants/selector";
import "./FontSizeSelector.css";
import { Theme } from "../../types/theme.interface";
import { THEME_COLORS } from "../../constants/themes";
import { EditorToolbarContext } from "../../contexts/EditorToolbarContext";

interface FontSizeSelectorProps {
  options: string[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  color?: Theme;
}

function FontSizeSelector(props: FontSizeSelectorProps) {
  const { options, isOpen, setIsOpen, color } = props;
  const { fontSize, setFontSize } = useContext(EditorToolbarContext);

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
    setFontSize(option)
  }

  function getActiveItemBgColor(color?: Theme) {
    return THEME_COLORS[color ?? "primary"].option;
  }

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
                    : "1px solid rgba(0,0,0,0.1)",
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

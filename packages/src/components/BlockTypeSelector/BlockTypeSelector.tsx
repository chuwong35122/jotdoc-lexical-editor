import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SelectIconOption } from "../../types/select.interface";
import { SELECT_ICON_OPTIONS } from "../../constants/selector";
import "./BlockTypeSelector.css";
import { Theme } from "../../types/theme.interface";
import { THEME_COLORS } from "../../constants/themes";

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
    }
  }, []);

  function toggleOpen() {
    props.setIsOpen((prev) => !prev);
  }

  function onClickItem(target: number) {
    if (target === activeIndex) return

    props.setActiveIndex(target)
    props.setIsOpen(false);
  }

  function getActiveItemBgColor(color?: Theme) {
    return THEME_COLORS[color ?? 'primary'].option
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
          {SELECT_ICON_OPTIONS.map((option, index) => (
            <button
              key={index}
              onClick={() => onClickItem(index)}
              className={["select-option"].join(" ")}
              style={{
                borderBottom:
                  index === SELECT_ICON_OPTIONS.length - 1
                    ? "none"
                    : "1px solid #e0e0e0",
                borderRadius:
                  index === SELECT_ICON_OPTIONS.length - 1
                    ? "0 0 0.5rem 0.5rem"
                    : "none"
              }}
            >
              <img
                src={option.icon}
                width={24}
                height={24}
                alt={option.label}
                className="option-icon"
              />
              <p>{option.label}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlockTypeSelector;

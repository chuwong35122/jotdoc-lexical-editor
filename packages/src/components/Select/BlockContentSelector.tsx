import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SelectIconOption } from "../../types/select.interface";
import { SELECT_ICON_OPTIONS } from "../../constants/selector";
import "./BlockContentSelector.css";

interface BlockContentSelectorProps {
  options: SelectIconOption[];
  activeIndex: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function BlockContentSelector(props: BlockContentSelectorProps) {
  const { options, activeIndex } = props;
  const selector = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (!selector.current?.contains(event.target as Node)) {
      props.setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleOpen() {
    props.setIsOpen((prev) => !prev);
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
      {props.isOpen &&
        SELECT_ICON_OPTIONS.map((option, index) => (
          <div key={index} className={["select-option"].join(' ')}>
            <img src={option.icon} width={24} height={24} alt={option.label} />
            <p>{option.label}</p>
          </div>
        ))}
    </div>
  );
}

export default BlockContentSelector;

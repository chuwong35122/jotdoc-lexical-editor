import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SelectIconOption } from "../../types/select.interface";
import { SELECT_ICON_OPTIONS } from "../../constants/selector";

interface ClickableSelectorProps {
  options: SelectIconOption[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ClickableSelector(props: ClickableSelectorProps) {
  const { options } = props;
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
    props.setIsOpen(false);
  }

  return (
    <div ref={selector} className="dropdown-container">
      <button onClick={toggleOpen} className="select-button-container">
        <img
          src='/icons/puzzle.svg'
          width={24}
          height={24}
          alt="Component"
        />
        <p>Insert component</p>
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
              onClick={() => onClickItem(index)}
              className={["select-option"].join(" ")}
              style={{
                borderBottom:
                  index === SELECT_ICON_OPTIONS.length - 1
                    ? "none"
                    : "1px solid rgba(0,0,0,0.1)",
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

export default ClickableSelector;

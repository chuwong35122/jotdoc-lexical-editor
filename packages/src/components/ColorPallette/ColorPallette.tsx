import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { GithubPicker, RGBColor } from "react-color";
import "./ColorPallette.css";

interface ColorPalletteProps {
  iconSrc: string;
  name: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeColor: string;
  onSelect?: (color: RGBColor) => void;
}

function ColorPallette(props: ColorPalletteProps) {
  const { iconSrc, activeColor, name, isOpen, setIsOpen, onSelect } = props;
  const selector = useRef<HTMLDivElement>(null);

  function handleClickButton() {
    setIsOpen(!isOpen);
  }

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

  return (
    <div ref={selector}>
      <button onClick={handleClickButton} className="toggle-container">
        <img src={iconSrc} width={24} height={24} alt={name} />
      </button>
      <div className="picker-dropdown">
        {isOpen && (
          <GithubPicker
            colors={[
              "rgba(255,0,0,1)",
              "rgba(232,20,76,1)",
              "rgba(233,30,99,1)",
              "rgba(252,185,0,1)",
              "rgba(139,195,74,1)",
              "rgba(0,139,2,1)",
              "rgba(0,107,118,1)",
              "rgba(18,115,222,1)",
              "rgba(0,77,207,1)",
              "rgba(83,0,235,1)",
              "rgba(103,57,183,1)",
              "rgba(219,62,0,1)",
              "rgba(121,85,72,1)",
              "rgba(255,255,255,1)",
              "rgba(171,184,195,1)",
              "rgba(0,0,0,1)",
            ]}
            color={activeColor}
            onChange={(c, _) => onSelect?.(c.rgb)}
          />
        )}
      </div>
    </div>
  );
}

export default ColorPallette;

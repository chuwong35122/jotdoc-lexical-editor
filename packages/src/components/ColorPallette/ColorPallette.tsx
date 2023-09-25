import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { GithubPicker, RGBColor } from "react-color";
import { ReactSVG } from "react-svg";
import "./ColorPallette.css";

interface ColorPalletteProps {
  iconSrc: string;
  name: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  activeColor: string
  onSelect?: (color: RGBColor) => void;
}

function ColorPallette(props: ColorPalletteProps) {
  const { iconSrc, activeColor, isOpen, setIsOpen, onSelect } = props;
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
      <button className="toggle-container" onClick={handleClickButton}>
        <ReactSVG src={iconSrc} color={activeColor} />
      </button>
      <div className="picker-dropdown">
        {isOpen && (
          <GithubPicker
            color={activeColor}
            onChange={(c, _) => onSelect?.(c.rgb)}
          />
        )}
      </div>
    </div>
  );
}

export default ColorPallette;

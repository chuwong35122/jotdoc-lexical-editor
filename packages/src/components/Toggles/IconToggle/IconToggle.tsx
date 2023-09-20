import React, { memo } from "react";
import "./IconToggle.css";
import { Theme } from "../../../types/theme.interface";

interface IconToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  iconSrc: string;
  name: string;
  state: boolean;
  onClick?: () => void;
  color?: Theme;
}

function IconToggle(props: IconToggleProps) {
  function getActiveColor(color?: Theme) {
    if (color === "blue") {
      return "toggle-container active--blue";
    } else if (color === "green") {
      return "toggle-container active--green";
    }

    return "toggle-container active--primary";
  }

  return (
    <button
      className={[
        props.state ? getActiveColor(props.color) : "toggle-container",
      ].join(" ")}
      {...props}
    >
      <img
        src={props.iconSrc}
        width="24"
        height="24"
        alt={props.name}
        style={{ filter: props.state ? "invert(100%)" : "invert(0%)" }}
      />
    </button>
  );
}

export default memo(IconToggle)

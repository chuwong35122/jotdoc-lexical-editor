import React, { HTMLAttributes } from "react";
import "./ClickableButton.css";
import { Theme } from "../../../types/theme.interface";

export interface ClickableButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  iconSrc: string;
  name: string;
  state: boolean;
  onClick?: () => void;
  color?: Theme;
}

function ClickableButton(props: ClickableButtonProps) {
  function getActiveColor(color?: Theme) {
    if (color === "blue") {
      return "clickable-button-container active--blue";
    } else if (color === "green") {
      return "clickable-button-container active--green";
    }

    return "clickable-button-container active--primary";
  }

  return (
    <button
      type="button"
      className={[
        props.state
          ? getActiveColor(props.color)
          : "clickable-button-container",
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

export default ClickableButton;

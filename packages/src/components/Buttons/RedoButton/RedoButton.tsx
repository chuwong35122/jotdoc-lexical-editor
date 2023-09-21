import React, { HTMLAttributes } from "react";
import "./RedoButton.css";
import { Theme } from "../../../types/theme.interface";

export interface RedoButtonProps extends HTMLAttributes<HTMLButtonElement> {
  iconSrc: string;
  name: string;
  state: boolean;
  onClick?: () => void;
  color?: Theme;
}

function RedoButton(props: RedoButtonProps) {
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
      type="button"
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

export default RedoButton;
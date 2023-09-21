import React, { HTMLAttributes } from "react";
import "./UndoButton.css";
import { Theme } from "../../../types/theme.interface";

export interface UndoButtonProps extends HTMLAttributes<HTMLButtonElement> {
  iconSrc: string;
  name: string;
  state: boolean;
  onClick?: () => void;
  color?: Theme;
}

function UndoButton(props: UndoButtonProps) {
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

export default UndoButton;

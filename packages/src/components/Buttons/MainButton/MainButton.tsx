import React, { HTMLAttributes } from "react";
import "./MainButton.css";
import { Theme } from "../../../types/theme.interface";

export interface MainButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: Theme;
}

function MainButton(props: MainButtonProps) {
  function getButtonColor(color?: Theme) {
    if (color === "blue") {
      return "main-button--blue";
    } else if (color === "green") {
      return "main-button--green";
    }

    return "main-button--primary";
  }

  return (
    <button className={[getButtonColor(props.color ?? 'primary'), "main-button-container"].join(' ')} {...props}>
      {props.children}
    </button>
  );
}

export default MainButton;

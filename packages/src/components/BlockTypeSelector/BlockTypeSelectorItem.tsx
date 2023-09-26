import React, { HTMLAttributes } from "react";
import { SelectIconOption } from "../../types/select.interface";

interface BlockTypeSelectorItemProps extends HTMLAttributes<HTMLButtonElement> {
  index: number;
  option: SelectIconOption
  length: number
}

function BlockTypeSelectorItem(props: BlockTypeSelectorItemProps) {
  const { index, option, length } = props

  return (
    <button
      onClick={props.onClick}
      className={["select-option"].join(" ")}
      style={{
        borderBottom:
          index === length - 1
            ? "none"
            : "1px solid #e0e0e0",
        borderRadius:
          index === length - 1
            ? "0 0 0.5rem 0.5rem"
            : "none",
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
  );
}

export default BlockTypeSelectorItem;

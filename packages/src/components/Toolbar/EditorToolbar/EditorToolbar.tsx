import React, { useContext, useState } from "react";
import "./EditorToolbar.css";
import IconToggle from "../../Toggles/IconToggle/IconToggle";
import { EditorToolbarContext } from "../../../contexts/EditorToolbarContext";
import DropdownSelector from "../../Select/DropdownSelector";
import { SELECT_ICON_OPTIONS } from "../../../constants/selector";

interface EditorToolbarProps { }

function EditorToolbar(props: EditorToolbarProps) {
  const context = useContext(EditorToolbarContext);
  const [blockSelectorOpen, setBlockSelectorOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="toolbar-container">
      <IconToggle
        iconSrc={"/icons/undo-2.svg"}
        state={false}
        name="undo"
      // TODO: Add onClick & Disabled indicator
      />
      <IconToggle
        iconSrc={"/icons/redo-2.svg"}
        state={false}
        name="redo"
      // TODO: Add onClick & Disabled indicator
      />
      <div className="divider" />
      <IconToggle
        iconSrc={"/icons/bold.svg"}
        state={context.isBold}
        name="bold"
      />
      <IconToggle
        iconSrc={"/icons/italic.svg"}
        state={context.isItalic}
        name="italic"
      />
      <IconToggle
        iconSrc={"/icons/underline.svg"}
        state={context.isUnderline}
        name="underline"
      />
      <IconToggle
        iconSrc={"/icons/strikethrough.svg"}
        state={context.isStrikethrough}
        name="strikethrough"
      />
      <div className="divider" />
      <DropdownSelector
        options={SELECT_ICON_OPTIONS}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        isOpen={blockSelectorOpen}
        setIsOpen={setBlockSelectorOpen}
        color={"primary"}
      />
    </div>
  );
}

export default EditorToolbar;

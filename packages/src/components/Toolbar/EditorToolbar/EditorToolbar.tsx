import React, { useContext, useState } from "react";
import "./EditorToolbar.css";
import IconToggle from "../../Toggles/IconToggle/IconToggle";
import { EditorToolbarContext } from "../../../contexts/EditorToolbarContext";
import DropdownSelector from "../../Select/DropdownSelector";
import {
  SELECT_COMPONENT_OPTIONS,
  SELECT_ICON_OPTIONS,
} from "../../../constants/selector";
import ClickableSelector from "../../ComponentSelector/ComponentSelector";
import ClickableButton from "../../Buttons/ClickableButton/ClickableButton";
import FontSizeSelector from "../../FontSizeSelector/FontSizeSelector";
import { FONT_SIZE_OPTIONS } from "../../../constants/themes";
import ColorPallette from "../../ColorPallette/ColorPallette";
import { RGBColor } from "react-color";

interface EditorToolbarProps { }

function EditorToolbar(props: EditorToolbarProps) {
  const context = useContext(EditorToolbarContext);
  const [blockSelectorOpen, setBlockSelectorOpen] = useState(false);
  const [componentSelectorOpen, setComponentSelectorOpen] = useState(false);
  const [fontSizeSelectorOpen, setFontSizeSelectorOpen] = useState(false);
  const [highlighterOpen, setHighlighterOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  function handleSetHighlighterColor(color: RGBColor) {
    color.a = 0.5;
    const _color = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    context.setHighlightedColor(_color);
  }

  function setFontColor(color: RGBColor) {
    const _color = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    context.setFontColor(_color);
  }

  return (
    <div className="toolbar-container">
      <ClickableButton
        name="undo"
        state={false}
        iconSrc="/icons/undo-2.svg"
        onClick={() => console.log("Undo!")}
      />
      <ClickableButton
        name="redo"
        state={false}
        iconSrc="/icons/redo-2.svg"
        onClick={() => console.log("Redo!")}
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
      <div className="divider" />
      <FontSizeSelector
        options={FONT_SIZE_OPTIONS}
        isOpen={fontSizeSelectorOpen}
        setIsOpen={setFontSizeSelectorOpen}
      />
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
      <ColorPallette
        iconSrc="/icons/baseline.svg"
        name="Color"
        activeColor={context.fontColor}
        isOpen={colorOpen}
        setIsOpen={setColorOpen}
        onSelect={setFontColor}
      />
      <ColorPallette
        iconSrc="/icons/highlighter.svg"
        name="Highlighter"
        activeColor={context.highlightedColor}
        isOpen={highlighterOpen}
        setIsOpen={setHighlighterOpen}
        onSelect={handleSetHighlighterColor}
      />
      <div className="divider" />
      <ClickableSelector
        options={SELECT_COMPONENT_OPTIONS}
        isOpen={componentSelectorOpen}
        setIsOpen={setComponentSelectorOpen}
      />
    </div>
  );
}

export default EditorToolbar;

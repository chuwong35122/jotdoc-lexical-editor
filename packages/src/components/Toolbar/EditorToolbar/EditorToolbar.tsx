import React, { useContext, useState } from "react";
import "./EditorToolbar.css";
import IconToggle from "../../Toggles/IconToggle/IconToggle";
import { EditorToolbarContext } from "../../../contexts/EditorToolbarContext";
import BlockTypeSelector from "../../BlockTypeSelector/BlockTypeSelector";
import { SELECT_ICON_OPTIONS } from "../../../constants/selector";
import ClickableButton from "../../Buttons/ClickableButton/ClickableButton";
import FontSizeSelector from "../../FontSizeSelector/FontSizeSelector";
import { FONT_SIZE_OPTIONS } from "../../../constants/themes";
import ColorPallette from "../../ColorPallette/ColorPallette";
import { RGBColor } from "react-color";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { $patchStyleText } from '@lexical/selection';

interface EditorToolbarProps { }

function EditorToolbar(props: EditorToolbarProps) {
  const context = useContext(EditorToolbarContext);
  const [editor] = useLexicalComposerContext();

  const [blockSelectorOpen, setBlockSelectorOpen] = useState(false);
  const [fontSizeSelectorOpen, setFontSizeSelectorOpen] = useState(false);
  const [highlighterOpen, setHighlighterOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  function handleSetHighlighterColor(color: RGBColor) {
    color.a = 0.5;
    const _color = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    selectHighlighterColor(_color)
    context.setHighlightedColor(_color);
  }

  function setFontColor(color: RGBColor) {
    const _color = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    selectColor(_color);
    context.setFontColor(_color);
  }


  function selectColor(target: string) {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { color: target });
      }
    });
  }


  function selectHighlighterColor(target: string) {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { 'background-color': target });
      }
    });
  }

  return (
    <div className="toolbar-container">
      <ClickableButton
        disabled={!context.canUndo}
        name="undo"
        state={false}
        iconSrc="/icons/undo-2.svg"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      />
      <ClickableButton
        disabled={!context.canRedo}
        name="redo"
        state={false}
        iconSrc="/icons/redo-2.svg"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      />
      <div className="v-divider" />
      <BlockTypeSelector
        options={SELECT_ICON_OPTIONS}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        isOpen={blockSelectorOpen}
        setIsOpen={setBlockSelectorOpen}
        color={"primary"}
      />
      <div className="v-divider" />
      <FontSizeSelector
        options={FONT_SIZE_OPTIONS}
        isOpen={fontSizeSelectorOpen}
        setIsOpen={setFontSizeSelectorOpen}
      />
      <IconToggle
        iconSrc={"/icons/bold.svg"}
        state={context.isBold}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        name="bold"
      />
      <IconToggle
        iconSrc={"/icons/italic.svg"}
        state={context.isItalic}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        name="italic"
      />
      <IconToggle
        iconSrc={"/icons/underline.svg"}
        state={context.isUnderline}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        name="underline"
      />
      <IconToggle
        iconSrc={"/icons/strikethrough.svg"}
        state={context.isStrikethrough}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
        name="strikethrough"
      />
      <ColorPallette
        iconSrc="/icons/baseline.svg"
        name="color"
        activeColor={context.fontColor}
        isOpen={colorOpen}
        setIsOpen={setColorOpen}
        onSelect={setFontColor}
      />
      <ColorPallette
        iconSrc="/icons/highlighter.svg"
        name="background-color"
        activeColor={context.highlightedColor}
        isOpen={highlighterOpen}
        setIsOpen={setHighlighterOpen}
        onSelect={handleSetHighlighterColor}
      />
      <div className="v-divider" />
      <ClickableButton
        name="align-left"
        state={false}
        iconSrc="/icons/align-left.svg"
        onClick={() => console.log("Left!")}
      />
      <ClickableButton
        name="align-center"
        state={false}
        iconSrc="/icons/align-center.svg"
        onClick={() => console.log("Center!")}
      />
      <ClickableButton
        name="align-left"
        state={false}
        iconSrc="/icons/align-right.svg"
        onClick={() => console.log("Right!")}
      />
      <ClickableButton
        name="align-left"
        state={false}
        iconSrc="/icons/align-justify.svg"
        onClick={() => console.log("Justify!")}
      />
    </div>
  );
}

export default EditorToolbar;

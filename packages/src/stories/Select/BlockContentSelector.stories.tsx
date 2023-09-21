import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import BlockContentSelector from "../../components/Select/DropdownSelector";
import { SELECT_ICON_OPTIONS } from "../../constants/selector";

const meta: Meta<typeof BlockContentSelector> = {
  title: "jotdoc-lexical-editor/BlockContentSelector",
  component: BlockContentSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlockContentSelector>;

export const BlockContentSelectorComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <BlockContentSelector
      options={SELECT_ICON_OPTIONS}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  )
}
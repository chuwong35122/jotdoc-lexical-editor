import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import BlockContentSelector from "../../components/Select/BlockContentSelector";
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

  return (
    <BlockContentSelector
      options={SELECT_ICON_OPTIONS}
      activeIndex={0}
      isOpen={isOpen}
      setIsOpen={setIsOpen}

    />
  )
}
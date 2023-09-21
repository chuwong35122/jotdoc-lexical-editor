import React, { useState, Dispatch, SetStateAction } from "react";
import { Meta, StoryObj } from "@storybook/react";
import DropdownSelector from "../../components/Select/DropdownSelector";
import { useArgs } from "@storybook/client-api";
import { SELECT_ICON_OPTIONS } from "../../constants/selector";

const meta: Meta<typeof DropdownSelector> = {
  title: "jotdoc-lexical-editor/DropdownSelector",
  component: DropdownSelector,
  tags: ["autodocs"],
  args: {
    color: 'blue',

  }
};

export default meta;
type Story = StoryObj<typeof DropdownSelector>;

const BlockTypeSelectorComponent = (props: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownSelector
      options={SELECT_ICON_OPTIONS}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      color={props.color}
    />
  );
};

export const BlockTypeSelector: Story = {
  tags: ["autodocs"],
  render: BlockTypeSelectorComponent,
};

import React from 'react'
import { Meta, StoryObj } from "@storybook/react";
import DropdownSelector from "../../components/BlockTypeSelector/BlockTypeSelector";
import { SELECT_ICON_OPTIONS } from "../../constants/selector";

const meta: Meta<typeof DropdownSelector> = {
  title: "jotdoc-lexical-editor/DropdownSelector",
  component: DropdownSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownSelector>;

export const ClosedSelectorComponent: Story = {
  args: {
    options: SELECT_ICON_OPTIONS,
    color: "primary",
    activeIndex: 0,
    isOpen: false
  },
};


export const BlockTypePrimarySelector: Story = {
  args: {
    options: SELECT_ICON_OPTIONS,
    color: "primary",
    activeIndex: 0,
    isOpen: true
  },
};

export const BlockTypeBlueSelector: Story = {
  args: {
    options: SELECT_ICON_OPTIONS,
    color: "blue",
    activeIndex: 1,
    isOpen: true
  },
};

export const BlockTypeGreenSelector: Story = {
  args: {
    options: SELECT_ICON_OPTIONS,
    color: "green",
    activeIndex: 2,
    isOpen: true
  },
};

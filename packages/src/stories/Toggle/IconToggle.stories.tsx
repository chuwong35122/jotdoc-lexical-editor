import React from 'react'
import { Meta, StoryObj } from "@storybook/react";
import IconToggle from "../../components/Toggles/IconToggle/IconToggle"

const meta: Meta<typeof IconToggle> = {
  title: "jotdoc-lexical-editor/IconToggle",
  component: IconToggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconToggle>;

export const BoldIconToggle: Story = {
  args: {
    name: "bold",
    iconSrc: '/icons/bold.svg',
    state: false,
    onClick: () => alert("Bold!")
  }
};

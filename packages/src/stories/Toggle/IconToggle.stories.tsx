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

export const IconToggleComponent: Story = {
  args: {
    name: "bold",
    iconSrc: '/icons/bold.svg',
    state: false,
    onClick: () => alert("Bold!"),
    color: 'primary'
  }
};

export const PrimaryToggled: Story = {
  args: {
    name: "bold",
    iconSrc: '/icons/bold.svg',
    state: true,
    onClick: () => alert("Bold!"),
    color: 'primary'
  }
};

export const GreenToggled: Story = {
  args: {
    name: "bold",
    iconSrc: '/icons/bold.svg',
    state: true,
    onClick: () => alert("Bold!"),
    color: 'green'
  }
};

export const BlueToggled: Story = {
  args: {
    name: "bold",
    iconSrc: '/icons/bold.svg',
    state: true,
    onClick: () => alert("Bold!"),
    color: 'blue'
  }
};

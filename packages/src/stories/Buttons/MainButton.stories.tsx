import { Meta, StoryObj } from "@storybook/react";
import MainButton from "../../components/Buttons/MainButton/MainButton";

const meta: Meta<typeof MainButton> = {
  title: "jotdoc-lexical-editor/MainButton",
  component: MainButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MainButton>;

export const PrimaryMainButton: Story = {
  args: {
    onClick: () => alert("I was clicked!"),
    children: "Button",
    color: 'primary'
  }
}

export const GreenMainButton: Story = {
  args: {
    onClick: () => alert("I was clicked!"),
    children: "Button",
    color: 'green'
  }
}
export const BlueMainButton: Story = {
  args: {
    onClick: () => alert("I was clicked!"),
    children: "Button",
    color: 'blue'
  }
}
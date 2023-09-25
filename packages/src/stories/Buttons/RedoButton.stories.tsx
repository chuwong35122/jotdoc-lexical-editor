import { Meta, StoryObj } from "@storybook/react";
import ClickableButton from "../../components/Buttons/ClickableButton/ClickableButton";

const meta: Meta<typeof ClickableButton> = {
  title: "jotdoc-lexical-editor/RedoButton",
  component: ClickableButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ClickableButton>;

export const Normal: Story = {
  args: {
    name: "redo",
    iconSrc: "/icons/redo-2.svg",
    state: false,
    onClick: () => alert("Redo!"),
  },
};

export const Primary: Story = {
  args: {
    name: "redo",
    iconSrc: "/icons/redo-2.svg",
    state: true,
    onClick: () => alert("Redo!"),
    color: "primary",
  },
};

export const Green: Story = {
  args: {
    name: "redo",
    iconSrc: "/icons/redo-2.svg",
    state: true,
    onClick: () => alert("Redo!"),
    color: "green",
  },
};

export const Blue: Story = {
  args: {
    name: "redo",
    iconSrc: "/icons/redo-2.svg",
    state: true,
    onClick: () => alert("Redo!"),
    color: "blue",
  },
};

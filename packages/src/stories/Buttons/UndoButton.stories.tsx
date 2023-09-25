import { Meta, StoryObj } from "@storybook/react";
import ClickableButton from "../../components/Buttons/ClickableButton/ClickableButton";

const meta: Meta<typeof ClickableButton> = {
  title: "jotdoc-lexical-editor/UndoButton",
  component: ClickableButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ClickableButton>;

export const Normal: Story = {
  args: {
    name: "undo",
    iconSrc: "/icons/undo-2.svg",
    state: false,
    onClick: () => alert("Undo!"),
  },
};

export const Primary: Story = {
  args: {
    name: "undo",
    iconSrc: "/icons/undo-2.svg",
    state: true,
    onClick: () => alert("Undo!"),
    color: "primary",
  },
};

export const Green: Story = {
  args: {
    name: "undo",
    iconSrc: "/icons/undo-2.svg",
    state: true,
    onClick: () => alert("Undo!"),
    color: "green",
  },
};

export const Blue: Story = {
  args: {
    name: "undo",
    iconSrc: "/icons/undo-2.svg",
    state: true,
    onClick: () => alert("Undo!"),
    color: "blue",
  },
};

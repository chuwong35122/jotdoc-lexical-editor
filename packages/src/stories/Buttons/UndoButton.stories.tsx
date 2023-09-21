import { Meta, StoryObj } from "@storybook/react";
import UndoButton from "../../components/Buttons/UndoButton/UndoButton";

const meta: Meta<typeof UndoButton> = {
  title: "jotdoc-lexical-editor/UndoButton",
  component: UndoButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UndoButton>;

export const Normal: Story = {
  args: {
    name: "undo",
    iconSrc: "/icons/undo-2.svg",
    state: false,
    onClick: () => alert("Undo!"),
  },
};

export const Click: Story = {
  args: {
    name: "undo",
    iconSrc: "/icons/undo-2.svg",
    state: true,
    onClick: () => alert("Undo!"),
  },
};

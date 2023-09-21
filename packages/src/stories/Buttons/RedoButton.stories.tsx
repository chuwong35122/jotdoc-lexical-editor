import { Meta, StoryObj } from "@storybook/react";
import RedoButton from "../../components/Buttons/RedoButton/RedoButton";

const meta: Meta<typeof RedoButton> = {
  title: "jotdoc-lexical-editor/RedoButton",
  component: RedoButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RedoButton>;

export const Normal: Story = {
  args: {
    name: "redo",
    iconSrc: "/icons/redo-2.svg",
    state: false,
    onClick: () => alert("Redo!"),
  },
};

export const Click: Story = {
  args: {
    name: "redo",
    iconSrc: "/icons/redo-2.svg",
    state: true,
    onClick: () => alert("Redo!"),
  },
};

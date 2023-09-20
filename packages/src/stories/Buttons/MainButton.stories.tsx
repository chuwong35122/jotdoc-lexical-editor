import { Meta, StoryObj } from "@storybook/react";
import MainButton from "../../components/Buttons/MainButton/MainButton";

const meta: Meta<typeof MainButton> = {
  title: "jotdoc-lexical-editor/MainButton",
  component: MainButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MainButton>;

export const MainButtonComponent: Story = {
  args: {
    onClick: () => alert("I was clicked!"),
    children: "Button"
  }
}
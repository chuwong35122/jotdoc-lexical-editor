import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import MainButton from "../../components/Buttons/MainButton/MainButton";

const meta: Meta<typeof MainButton> = {
  title: "jotdoc-lexical-editor/MainButton",
  component: MainButton,
};

export default meta;
type Story = StoryObj<typeof MainButton>;

export const Primary: Story = {
  render: () => <MainButton color="primary">Primary</MainButton>,
};

export const Green: Story = {
  render: () => <MainButton color="green">Green</MainButton>,
};

export const Blue: Story = {
  render: () => <MainButton color="blue">Blue</MainButton>,
}

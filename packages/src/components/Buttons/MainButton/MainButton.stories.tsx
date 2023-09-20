import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import MainButton from "../MainButton/MainButton";

const meta: Meta<typeof MainButton> = {
  title: "jotdoc-lexical-editor/Button",
  component: MainButton,
}

export default meta
type Story = StoryObj<typeof MainButton>

export const Primary: Story = {
  render: () => <MainButton>Primary</MainButton>,
}
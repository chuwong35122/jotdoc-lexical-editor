import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import MainButton from "../../components/Buttons/MainButton/MainButton";

const meta: Meta<typeof MainButton> = {
  title: "jotdoc-lexical-editor/MainButton",
  component: MainButton,
}

export default meta
type Story = StoryObj<typeof MainButton>

export const Primary: Story = {
  render: () => <div style={{ display: 'flex', gap: 4 }}>
    <MainButton color='primary'>Primary</MainButton>
    <MainButton color='green'>Green</MainButton>
    <MainButton color='blue'>Blue</MainButton>
  </div>,
}
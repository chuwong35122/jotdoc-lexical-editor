import { Meta, StoryObj } from "@storybook/react";
import JotdocLexicalEditor from "../../components/Editors/JotdocLexicalEditor/JotdocLexicalEditor"

const meta: Meta<typeof JotdocLexicalEditor> = {
  title: "jotdoc-lexical-editor/JotdocLexicalEditor",
  component: JotdocLexicalEditor,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JotdocLexicalEditor>;

export const JotdocLexicalEditorComponent: Story = {
  args: {
  }
}
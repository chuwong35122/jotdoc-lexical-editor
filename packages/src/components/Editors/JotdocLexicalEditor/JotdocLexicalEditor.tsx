import React, { useState } from "react";
import "./JotdocLexicalEditor.css";
import MainButton from "../../Buttons/MainButton/MainButton";

import { MainEditorTheme } from "../../../constants/editor";
import { EditorState, ParagraphNode } from "lexical";
import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";

import EditorToolbar from "../../Toolbar/EditorToolbar/EditorToolbar";
import EditorToolbarContextProvider from "../../../contexts/EditorToolbarContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableNode, TableRowNode, TableCellNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HashtagNode } from "@lexical/hashtag";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import ListMaxIndentLevelPlugin from "../../../plugins/ListMaxIndentPlugin";
import CodeHighlightPlugin from "../../../plugins/CodeHighlightPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { ImageNode } from "../../../nodes/ImageNode";
import ImagesPlugin from "../../../plugins/ImagePlugin";
import LinkDetectorPlugin from "../../../plugins/LinkDetectorPlugin";
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';

interface JotdocLexicalEditorProps {
  namespace: string;
  onError?: () => string;
}

function JotdocLexicalEditor(props: JotdocLexicalEditorProps) {
  const [editorState, setEditorState] = useState<EditorState>();

  const initialConfig: InitialConfigType = {
    namespace: props.namespace,
    theme: MainEditorTheme,
    onError: (e, editorState) => {
      console.log(e);
      console.log(editorState);
    },
    editorState: editorState,
    nodes: [
      ParagraphNode,
      HeadingNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      HashtagNode,
      TableNode,
      TableRowNode,
      TableCellNode,
      HorizontalRuleNode,
      ImageNode,
    ],
  };

  function handleChange(state: EditorState) {
    setEditorState(state);
  }

  function onSave() {
    console.log(editorState?.toJSON());
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorToolbarContextProvider>
        <EditorToolbar />
        <RichTextPlugin
          contentEditable={<ContentEditable className="editable" />}
          placeholder={<div className="editable-placeholder"></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* Helper Plugins */}
        <AutoFocusPlugin />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />

        {/* List */}
        <ListPlugin />
        <TabIndentationPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />

        {/* Code */}
        <CodeHighlightPlugin />

        {/* Horizontal Rule */}
        <HorizontalRulePlugin />

        {/* Image */}
        <ImagesPlugin />

        {/* Link */}
        <LinkDetectorPlugin />
        <LexicalClickableLinkPlugin />

        <MainButton onClick={onSave}>Save</MainButton>
      </EditorToolbarContextProvider>
    </LexicalComposer>
  );
}

export default JotdocLexicalEditor;

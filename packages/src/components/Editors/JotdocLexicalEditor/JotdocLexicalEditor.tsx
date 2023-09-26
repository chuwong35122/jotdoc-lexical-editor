import React, { useState } from "react";
import { EditorState, ParagraphNode } from "lexical";
import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import "./JotdocLexicalEditor.css";
import MainButton from "../../Buttons/MainButton/MainButton";
import EditorToolbarContextProvider from "../../../contexts/EditorToolbarContext";
import EditorToolbar from "../../Toolbar/EditorToolbar/EditorToolbar";
import { MainEditorTheme } from "../../../constants/editor";
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableNode, TableRowNode, TableCellNode } from '@lexical/table';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { HashtagNode } from '@lexical/hashtag';

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
    ]
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
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
        <MainButton onClick={onSave}>Save</MainButton>
      </EditorToolbarContextProvider>
    </LexicalComposer>
  );
}

export default JotdocLexicalEditor;

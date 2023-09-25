import React, { useState } from "react";
import { EditorState } from "lexical";
import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import "./JotdocLexicalEditor.css";
import MainButton from "../../Buttons/MainButton/MainButton";

interface JotdocLexicalEditorProps {
  namespace: string;
  onError?: () => string;
}

function JotdocLexicalEditor(props: JotdocLexicalEditorProps) {
  const [editorState, setEditorState] = useState<EditorState>();

  const initialConfig: InitialConfigType = {
    namespace: props.namespace,
    onError: (e, editorState) => {
      console.log(e);
      console.log(editorState);
    },
    editorState: editorState,
  };

  function handleChange(state: EditorState) {
    setEditorState(state)
  }

  function onSave() {
    console.log(editorState?.toJSON())
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editable" />}
        placeholder={<div className="editable-placeholder">Edit me 😇</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={handleChange} />
      <MainButton onClick={onSave}>Save</MainButton>
    </LexicalComposer>
  );
}

export default JotdocLexicalEditor;

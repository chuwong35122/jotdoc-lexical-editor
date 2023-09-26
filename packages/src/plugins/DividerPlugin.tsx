import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot, mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from 'lexical';
import { useEffect } from 'react';
import { $createDividerNode, DividerNode } from '../nodes/DividerNode/DividerNode';

export const INSERT_DIVIDER: LexicalCommand<undefined> = createCommand();

function DividerPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([DividerNode]))
      throw new Error(
        'PageBreakPlugin: PageBreakNode is not registered on editor',
      );

    return mergeRegister(
      editor.registerCommand(
        INSERT_DIVIDER,
        () => {
          const selection = $getSelection();

          if (!$isRangeSelection(selection)) return false;

          const focusNode = selection.focus.getNode();
          if (focusNode !== null) {
            const pgBreak = $createDividerNode();
            $insertNodeToNearestRoot(pgBreak);
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, [editor]);

  return null;
}

export default DividerPlugin;

import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$isGridSelection,
  LexicalEditor,
} from "lexical";
import {
  REMOVE_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $createCodeNode } from "@lexical/code";
import { BlockType } from "../types/block.interface";

export function transformParagraphNode(editor: LexicalEditor, type: BlockType) {
  if (type === "paragraph") return;
  editor.update(() => {
    const selection = $getSelection();

    if (
      $isRangeSelection(selection) ||
      DEPRECATED_$isGridSelection(selection)
    ) {
      $setBlocksType(selection, () => $createParagraphNode());
    }
  });
}

export function transformH1Node(editor: LexicalEditor, type: BlockType) {
  if (type === "h1") {
    transformParagraphNode(editor, type);
    return;
  }
  editor.update(() => {
    const selection = $getSelection();

    if (
      $isRangeSelection(selection) ||
      DEPRECATED_$isGridSelection(selection)
    ) {
      $setBlocksType(selection, () => $createHeadingNode("h1"));
    }
  });
}
export function transformH2Node(editor: LexicalEditor, type: BlockType) {
  if (type === "h2") {
    transformParagraphNode(editor, type);
    return;
  }
  editor.update(() => {
    const selection = $getSelection();

    if (
      $isRangeSelection(selection) ||
      DEPRECATED_$isGridSelection(selection)
    ) {
      $setBlocksType(selection, () => $createHeadingNode("h2"));
    }
  });
}
export function transformH3Node(editor: LexicalEditor, type: BlockType) {
  if (type === "h3") {
    transformParagraphNode(editor, type);
    return;
  }
  editor.update(() => {
    const selection = $getSelection();

    if (
      $isRangeSelection(selection) ||
      DEPRECATED_$isGridSelection(selection)
    ) {
      $setBlocksType(selection, () => $createHeadingNode("h3"));
    }
  });
}

export function transformBulletListNode(
  editor: LexicalEditor,
  type: BlockType
) {
  if (type !== "ul") {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  } else {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  }
}

export function transformOrderedListNode(
  editor: LexicalEditor,
  type: BlockType
) {
  if (type !== "ol") {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  } else {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  }
}

export function transformCheckListNode(editor: LexicalEditor, type: BlockType) {
  if (type !== "cl") {
    editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
  } else {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  }
}

export function transformQuoteNode(editor: LexicalEditor, type: BlockType) {
  if (type !== "quote") {
    editor.update(() => {
      const selection = $getSelection();
      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  }
}

export function transformCodeNode(editor: LexicalEditor, type: BlockType) {
  if (type !== "code") {
    editor.update(() => {
      let selection = $getSelection();

      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        if (selection.isCollapsed()) {
          $setBlocksType(selection, () => $createCodeNode());
        } else {
          const textContent = selection.getTextContent();
          const codeNode = $createCodeNode();
          selection.insertNodes([codeNode]);
          selection = $getSelection();
          if ($isRangeSelection(selection))
            selection.insertRawText(textContent);
        }
      }
    });
  }
}

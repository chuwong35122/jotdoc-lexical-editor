import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  DOMConversionMap,
  DOMConversionOutput,
  DecoratorNode,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
} from 'lexical';
import React, { KeyboardEvent, useCallback, useEffect } from 'react';
import { mergeRegister } from '@lexical/utils';
import './DividerNode.css'

interface Props {
  nodeKey: NodeKey;
}

export type SerialDividerNode = SerializedLexicalNode;

function DividerNodeComponent({ nodeKey }: Props) {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  const onDelete = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (isSelected && $isNodeSelection($getSelection())) {
        const node = $getNodeByKey(nodeKey);
        if ($isDividerNode(node)) {
          node.remove();
          return true;
        }

        return false;
      }
    },
    [isSelected, nodeKey],
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (event: MouseEvent) => {
          const element = editor.getElementByKey(nodeKey);

          if (event.target === element) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete as any,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete as any,
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);

  return null;
}

export class DividerNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return 'divider';
  }

  static clone(node: DividerNode): DividerNode {
    return new DividerNode(node.__key);
  }

  createDOM(): HTMLElement {
    const element = document.createElement('figure');
    element.style.pageBreakAfter = 'always';
    element.setAttribute('type', this.getType());
    return element;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      figure: (domNode: HTMLElement) => {
        const type = domNode.getAttribute('type');
        if (type !== this.getType()) return null;

        return {
          conversion: convertDividerElement,
          priority: COMMAND_PRIORITY_HIGH,
        };
      },
    };
  }

  updateDOM() {
    return false;
  }

  static importJSON(serializeNode: SerialDividerNode): DividerNode {
    return $createDividerNode();
  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: this.getType(),
      version: 1,
    };
  }

  getTextContent(): string {
    return '\n';
  }

  isInLine() {
    return false;
  }

  decorate(): JSX.Element {
    return <DividerNodeComponent nodeKey={this.__key} />;
  }
}

function convertDividerElement(): DOMConversionOutput {
  return { node: $createDividerNode() };
}

export function $createDividerNode(): DividerNode {
  return new DividerNode();
}

export function $isDividerNode(
  node: LexicalNode | null | undefined,
): node is DividerNode {
  return node instanceof DividerNode;
}

export default DividerNodeComponent;

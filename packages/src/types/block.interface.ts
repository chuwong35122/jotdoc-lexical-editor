import { BlockTypes } from "../constants/block";

export enum BlockTypeEnum {
  paragraph = "text",
  h1 = "heading1",
  h2 = "heading2",
  h3 = "heading3",
  ul = "ul", // unordered list
  ol = "ol", // ordered list
  cl = "cl", // checklist
  quote = "quote",
  code = "code",
}

export type BlockType = keyof typeof BlockTypes;
export type BlockTypeValue = (typeof BlockTypes)[BlockType];

export type TextAlignType = "left" | "center" | "right" | "justify";
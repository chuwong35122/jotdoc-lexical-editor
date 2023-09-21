import { BlockTypes } from "../constants/block";

export enum BlockTypeEnum {
  Text = "text",
  Heading1 = "heading1",
  Heading2 = "heading2",
  Heading3 = "heading3",
  UL = "ul", // unordered list
  OL = "ol", // ordered list
  CL = "cl", // checklist
  Quote = "quote",
  Code = "code",
}

export type BlockType = keyof typeof BlockTypes;
export type BlockTypeValue = (typeof BlockTypes)[BlockType];

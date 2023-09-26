import { SelectIconOption } from "../types/select.interface";
import { BlockTypes, ComponentTypes } from "./block";

export const SELECT_ICON_OPTIONS: SelectIconOption[] = [
  {
    icon: "/icons/text-cursor.svg",
    value: BlockTypes.paragraph,
    label: "Text",
  },
  {
    icon: "/icons/heading-1.svg",
    value: BlockTypes.h1,
    label: "Heading 1",
  },
  {
    icon: "/icons/heading-2.svg",
    value: BlockTypes.h2,
    label: "Heading 2",
  },
  {
    icon: "/icons/heading-3.svg",
    value: BlockTypes.h3,
    label: "Heading 3",
  },
  {
    icon: "/icons/list-ordered.svg",
    value: BlockTypes.ol,
    label: "Ordered List",
  },
  {
    icon: "/icons/list.svg",
    value: BlockTypes.ul,
    label: "Unordered List",
  },
  {
    icon: "/icons/list-todo.svg",
    value: BlockTypes.cl,
    label: "Check List",
  },
  {
    icon: "/icons/text-quote.svg",
    value: BlockTypes.quote,
    label: "Quote",
  },
  {
    icon: "/icons/code.svg",
    value: BlockTypes.code,
    label: "Code",
  },
  {
    icon: "/icons/separator-horizontal.svg",
    value: ComponentTypes.Divider,
    label: "Divider",
  },
  {
    icon: "/icons/image.svg",
    value: ComponentTypes.Image,
    label: "Image",
  },
  {
    icon: "/icons/table.svg",
    value: ComponentTypes.Table,
    label: "Table",
  },
];
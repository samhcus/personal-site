export type WorkItemType = "tool" | "guide" | "video" | "art";

export type WorkItem = {
  type: WorkItemType;
  title: string;
  description: string;
  href: string;
  wide?: boolean;
};

export const workItems: WorkItem[] = [
  {
    type: "tool",
    title: "Something useful",
    description: "A tool is being built. It'll be here soon.",
    href: "#",
    wide: true,
  },
  {
    type: "guide",
    title: "Something worth reading",
    description: "A guide is in progress.",
    href: "#",
  },
  {
    type: "video",
    title: "Something worth watching",
    description: "Coming.",
    href: "#",
  },
];

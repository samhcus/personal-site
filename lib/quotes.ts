export type Quote = {
  name: string;
  handle: string;
  text: string;
  avatar: string | null;
};

export const quotes: Quote[] = [
  {
    name: "Naval Ravikant",
    handle: "@naval",
    text: "Escape competition through authenticity. No one can compete with you on being you.",
    avatar: null,
  },
  {
    name: "Naval Ravikant",
    handle: "@naval",
    text: "If you can learn to build and learn to sell, you will be unstoppable.",
    avatar: null,
  },
  {
    name: "Paul Graham",
    handle: "@paulg",
    text: "Make something people want.",
    avatar: null,
  },
];

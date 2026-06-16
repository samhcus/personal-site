export type Book = {
  title: string;
  author: string;
  cover: string;
  status: "reading" | "finished";
};

export const reading: Book[] = [
  {
    title: "World War Z",
    author: "Max Brooks",
    cover: "/reading/worldwarz-cover.jpg",
    status: "reading",
  },
  {
    title: "AI Snake Oil",
    author: "Arvind Narayanan & Sayash Kapoor",
    cover: "/reading/aisnakeoil.png",
    status: "reading",
  },
];

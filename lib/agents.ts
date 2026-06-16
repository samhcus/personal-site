export type Agent = {
  name: string;
  gif: string;
  /** Roster color, from the github.com/samhcus profile README badges. */
  color: string;
  /** Readable text color on top of `color`. */
  fg: string;
};

export const agents: Agent[] = [
  { name: "Hank", gif: "/agents/hank.gif", color: "#FFD700", fg: "#111111" },
  { name: "Nqita", gif: "/agents/nqita.gif", color: "#FF69B4", fg: "#111111" },
  { name: "Cypork", gif: "/agents/cypork.gif", color: "#FFC0CB", fg: "#111111" },
  { name: "Dublo", gif: "/agents/dublo.gif", color: "#808080", fg: "#FFFFFF" },
  { name: "Knut", gif: "/agents/knut.gif", color: "#5B8DB8", fg: "#FFFFFF" },
  { name: "Justin", gif: "/agents/justin.gif", color: "#E63946", fg: "#FFFFFF" },
  { name: "Yahm", gif: "/agents/yahm.gif", color: "#2D2D2D", fg: "#FFFFFF" },
];

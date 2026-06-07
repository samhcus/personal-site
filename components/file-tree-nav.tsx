"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  File,
  CaretRight,
  GitBranch,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Ext = "tsx" | "ts" | "css" | "md" | "json";

type FileNode = {
  name: string;
  type: "file" | "folder";
  ext?: Ext;
  href?: string;
  children?: FileNode[];
  defaultOpen?: boolean;
};

const TREE: FileNode[] = [
  {
    name: "mad-house",
    type: "folder",
    defaultOpen: true,
    children: [
      {
        name: "src",
        type: "folder",
        defaultOpen: true,
        children: [
          {
            name: "app",
            type: "folder",
            defaultOpen: false,
            children: [
              { name: "page.tsx", type: "file", ext: "tsx", href: "#" },
              { name: "layout.tsx", type: "file", ext: "tsx" },
              { name: "globals.css", type: "file", ext: "css" },
            ],
          },
          {
            name: "sections",
            type: "folder",
            defaultOpen: true,
            children: [
              { name: "hero.tsx", type: "file", ext: "tsx", href: "#" },
              {
                name: "ideas",
                type: "folder",
                defaultOpen: true,
                children: [
                  { name: "content-feed.tsx", type: "file", ext: "tsx", href: "#ideas" },
                  { name: "guides.tsx", type: "file", ext: "tsx", href: "#guides" },
                ],
              },
              { name: "products.tsx", type: "file", ext: "tsx", href: "#products" },
              { name: "incoming.tsx", type: "file", ext: "tsx", href: "#incoming" },
              { name: "newsletter.tsx", type: "file", ext: "tsx", href: "#newsletter" },
            ],
          },
          {
            name: "components",
            type: "folder",
            defaultOpen: false,
            children: [
              { name: "nav.tsx", type: "file", ext: "tsx" },
              { name: "bento.tsx", type: "file", ext: "tsx" },
              { name: "footer.tsx", type: "file", ext: "tsx", href: "#footer" },
            ],
          },
        ],
      },
      { name: "README.md", type: "file", ext: "md", href: "#about" },
      { name: "package.json", type: "file", ext: "json" },
    ],
  },
];

function collectDefaultOpen(nodes: FileNode[], prefix = ""): Set<string> {
  const open = new Set<string>();
  for (const node of nodes) {
    const path = `${prefix}/${node.name}`;
    if (node.type === "folder" && node.defaultOpen) open.add(path);
    if (node.children) {
      collectDefaultOpen(node.children, path).forEach((p) => open.add(p));
    }
  }
  return open;
}

const EXT_ICON: Record<Ext, { icon: React.ElementType; color: string }> = {
  tsx:  { icon: FileCode, color: "text-[#4ec9b0]" },
  ts:   { icon: FileCode, color: "text-[#4175ba]" },
  css:  { icon: FileCode, color: "text-[#539bd6]" },
  md:   { icon: FileText, color: "text-zinc-400"  },
  json: { icon: File,     color: "text-[#b5a257]" },
};

function FileIcon({ ext }: { ext?: Ext }) {
  const cfg = ext ? EXT_ICON[ext] : { icon: File, color: "text-zinc-400" };
  const Icon = cfg.icon;
  return <Icon size={12} className={cfg.color} />;
}

type TreeItemProps = {
  node: FileNode;
  depth: number;
  path: string;
  openFolders: Set<string>;
  onToggle: (path: string) => void;
  activeHref: string;
  onNavigate: (href: string) => void;
};

function TreeItem({ node, depth, path, openFolders, onToggle, activeHref, onNavigate }: TreeItemProps) {
  const reduce = useReducedMotion();
  const isOpen = openFolders.has(path);
  const isActive = node.href !== undefined && node.href === activeHref;
  const isClickable = node.href !== undefined;

  if (node.type === "folder") {
    return (
      <li>
        <button
          onClick={() => onToggle(path)}
          className="flex w-full items-center gap-1 rounded-sm py-px pr-1 text-left text-[11px] font-mono text-foreground/60 hover:text-foreground transition-colors duration-100"
          style={{ paddingLeft: `${depth * 8 + 4}px` }}
        >
          <CaretRight
            size={8}
            className={cn(
              "flex-shrink-0 text-muted-foreground/60 transition-transform duration-150",
              isOpen && "rotate-90",
            )}
          />
          {isOpen
            ? <FolderOpen size={12} className="flex-shrink-0 text-[#e8ab52]" />
            : <Folder size={12} className="flex-shrink-0 text-[#c49a2a]" />
          }
          <span className="truncate">{node.name}</span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && node.children && (
            <motion.ul
              {...(!reduce && { initial: { height: 0, opacity: 0 }, exit: { height: 0, opacity: 0 } })}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              {node.children.map((child) => (
                <TreeItem
                  key={child.name}
                  node={child}
                  depth={depth + 1}
                  path={`${path}/${child.name}`}
                  openFolders={openFolders}
                  onToggle={onToggle}
                  activeHref={activeHref}
                  onNavigate={onNavigate}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={isClickable ? () => onNavigate(node.href!) : undefined}
        disabled={!isClickable}
        className={cn(
          "relative flex w-full items-center gap-1 rounded-sm py-px pr-1 text-left text-[11px] font-mono transition-colors duration-100",
          isClickable ? "cursor-pointer" : "cursor-default opacity-40",
          isActive
            ? "text-primary font-medium"
            : "text-foreground/60 hover:text-foreground",
        )}
        style={{ paddingLeft: `${depth * 8 + 4 + 8 + 4}px` }}
      >
        {isActive && (
          <span className="absolute left-0 top-[3px] bottom-[3px] w-[2px] rounded-r-full bg-primary" />
        )}
        <FileIcon ext={node.ext} />
        <span className="truncate">{node.name}</span>
      </button>
    </li>
  );
}

const SECTION_IDS = ["ideas", "guides", "products", "incoming", "newsletter"];

export function FileTreeNav() {
  const [openFolders, setOpenFolders] = useState<Set<string>>(() => collectDefaultOpen(TREE));
  const [activeHref, setActiveHref] = useState<string>("#");

  const handleToggle = useCallback((path: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const handleNavigate = useCallback((href: string) => {
    setActiveHref(href);
    requestAnimationFrame(() => {
      if (!href || href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveHref(`#${(top.target as HTMLElement).id}`);
        }
      },
      { threshold: 0.35 },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.14 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "fixed left-4 top-1/2 -translate-y-1/2 z-40",
        "hidden lg:flex flex-col",
        "w-[210px]",
        "rounded-xl overflow-hidden",
        "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md",
        "border border-black/8 dark:border-white/8",
        "shadow-[0_2px_16px_rgba(0,0,0,0.06)]",
      )}
    >
      {/* Tree */}
      <div className="py-0.5 px-0.5 overflow-y-auto max-h-[60vh]">
        <ul>
          {TREE.map((node) => (
            <TreeItem
              key={node.name}
              node={node}
              depth={0}
              path={`/${node.name}`}
              openFolders={openFolders}
              onToggle={handleToggle}
              activeHref={activeHref}
              onNavigate={handleNavigate}
            />
          ))}
        </ul>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-1 border-t border-black/6 dark:border-white/6 px-2 py-1 bg-black/[0.03] dark:bg-white/[0.03]">
        <GitBranch size={9} className="text-muted-foreground/50" />
        <span className="text-[9.5px] font-mono text-muted-foreground/50">main</span>
        <span className="ml-auto text-[9px] font-mono text-muted-foreground/35 truncate">
          {activeHref === "#" ? "page.tsx" : `${activeHref.slice(1)}.tsx`}
        </span>
      </div>
    </motion.aside>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";

interface ActionMenuButtonProps {
  onSelect: (action: "add" | "remove") => void;
}

export function ActionMenuButton({ onSelect }: ActionMenuButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-[var(--text)] px-2 py-1 rounded hover:bg-[var(--bg3)] cursor-pointer"
      >
        &#x22EE;
      </button>
      {open && (
        <div className="absolute right-0 top-6 bg-[var(--bg2)] shadow-md rounded p-2 z-50">
          <button
            onClick={() => {
              onSelect("add");
              setOpen(false);
            }}
            className="block w-full text-left px-2 py-1 text-[var(--text)] hover:bg-[var(--bg3)] cursor-pointer"
          >
            Adicionar
          </button>
          <button
            onClick={() => {
              onSelect("remove");
              setOpen(false);
            }}
            className="block w-full text-left px-2 py-1 text-[var(--text)] hover:bg-[var(--bg3)] cursor-pointer"
          >
            Remover
          </button>
        </div>
      )}
    </div>
  );
}

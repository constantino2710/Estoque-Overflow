import { LucideArrowLeftToLine, LucideArrowRightFromLine } from "lucide-react";

interface SidebarToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

export function SidebarToggle({ isOpen, toggle }: SidebarToggleProps) {
  return (
    <button onClick={toggle} className="p-2 ml-auto mr-2 cursor-pointer">
      {isOpen ? (
        <LucideArrowLeftToLine size={24} />
      ) : (
        <LucideArrowRightFromLine size={24} />
      )}
    </button>
  );
}

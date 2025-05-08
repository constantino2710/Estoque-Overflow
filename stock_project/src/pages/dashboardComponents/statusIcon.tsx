import React from "react";
import clsx from "clsx";

interface StatusIconProps {
  alert?: boolean;
  danger?: boolean;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ alert, danger }) => {
  if (!alert && !danger) {
    // Estado default: ícone de check
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-check-icon text-[var(--text)]"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  // Estados de alerta ou perigo: ícone de alerta
  const colorClass = clsx({
    "text-red-600": danger,
    "text-yellow-500": alert,
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx("lucide lucide-circle-alert-icon", colorClass)}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
};

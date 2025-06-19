import React from "react";

interface CardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  variant?: "default" | "alert" | "danger";
  tooltip?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  content,
  icon,
  children,
  variant = "default",
}) => {
  const borderClasses =
    variant === "danger"
      ? "border-2 border-red-500"
      : variant === "alert"
      ? "border-2 border-yellow-500"
      : "border border-[var(--border)]";

  return (
    <div
      className={`rounded-2xl shadow-md p-4 h-full bg-[var(--bg2)] w-full transition-all duration-300 ${borderClasses}`}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-[1rem] font-bold text-[var(--text)]">{title}</h2>
        <div>{icon}</div>
      </div>
      <div className="flex justify-center mt-2 sm:mt-4 lg:mt-6">
        <p className="text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] font-bold break-words text-center leading-tight">
          {content}
        </p>
      </div>
      {children}
    </div>
  );
};

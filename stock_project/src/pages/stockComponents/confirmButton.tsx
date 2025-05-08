"use client";

interface ConfirmButtonProps {
  onConfirm: () => void;
  disabled?: boolean;
}

export function ConfirmButton({ onConfirm, disabled }: ConfirmButtonProps) {
  return (
    <button
      onClick={onConfirm}
      disabled={disabled}
      className={`mt-2 px-4 py-1 rounded bg-[var(--primary)] text-[var(--text)] text-sm font-semibold 
        hover:bg-[var(--secondary)] transition disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      Confirmar
    </button>
  );
}

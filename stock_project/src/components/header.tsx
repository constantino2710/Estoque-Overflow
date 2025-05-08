import {ThemeToggleButton} from "./themeToggleButton";

interface HeaderProps {
	  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
	  return (
	<div className="flex w-full bg-[var(--bg1)] border-b-2 border-[var(--border)] shadow-md h-[4rem] !m-0 transition-all duration-300">
	  <h1 className="text-[2rem] font-bold text-[var(--text)] p-4">{title}</h1>
	  <div className="ml-auto flex items-center">
	    <ThemeToggleButton />
		</div>
	</div>
  );
}
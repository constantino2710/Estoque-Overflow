interface HeaderProps {
	  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
	  return (
	<div className="flex w-full bg-[var(--gray-900)] border-b border-[var(--gray-200)] shadow-md h-[4rem] !m-0">
	  <h1 className="text-[2rem] font-bold text-white p-4">{title}</h1>
	</div>
  );
}
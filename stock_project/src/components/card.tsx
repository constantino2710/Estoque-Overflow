interface CardProps {
	title: string;
	content: string;
	icon: React.ReactNode;
	children?: React.ReactNode;
	variant?: 'default' | 'alert';
  }
  
  export const Card: React.FC<CardProps> = ({
	title,
	content,
	icon,
	children,
	variant = 'default',
  }) => {
	const borderClasses =
	  variant === 'alert'
		? 'border-2 border-red-500'
		: 'border border-[var(--gray-700)]';
  
	return (
	  <div className={`rounded-2xl shadow-md p-4 bg-[var(--gray-800)] h-[10rem] w-full ${borderClasses}`}>
		<div className="flex justify-between items-start">
		  <h2 className="text-xl font-bold text-white">{title}</h2>
		  <div>{icon}</div>
		</div>
  
		<p className="text-sm text-gray-300 mt-2">{content}</p>
		{children}
	  </div>
	);
  };
  
interface CardProps {
	title: string;
	content: string;
	icon: React.ReactNode;
	children?: React.ReactNode;
	variant?: 'default' | 'alert'| 'danger';
  }
  
  export const Card: React.FC<CardProps> = ({
	title,
	content,
	icon,
	children,
	variant = 'default',
  }) => {
	const borderClasses =
	variant === 'danger'
	  ? 'border-2 border-red-500'
	  : variant === 'alert'
	  ? 'border-2 border-yellow-500'
	  : 'border border-[var(--gray-200)]';
  
  
	return (
	  <div className={`rounded-2xl shadow-md p-4 bg-[var(--gray-800)] h-[10rem] w-full ${borderClasses}`}>
		<div className="flex justify-between items-start">
		  <h2 className="text-[1rem] font-bold text-white">{title}</h2>
		  <div>{icon}</div>
		</div>
		<div className='flex justify-center h-full mt-6'>
		<p className="text-[3rem]">{content}</p>
		</div>
		{children}
	  </div>
	);
  };
  
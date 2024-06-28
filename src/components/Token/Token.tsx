import { Link } from 'react-router-dom';

interface TokenProps {
	children: React.ReactNode;
	to: string;
}

const Token = ({ to, children }: TokenProps) => {
	return (
		<Link
			className='rounded-full px-2 shadow bg-white hover:bg-slate-100 hover:cursor-pointer w-fit text-xs transition-colors whitespace-nowrap'
			to={to}
		>
			{children}
		</Link>
	);
};

export default Token;

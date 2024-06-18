interface TokenProps {
	children: React.ReactNode;
	handleClick?: () => void;
}

const Token = ({ handleClick, children }: TokenProps) => {
	return (
		<div
			className='rounded-full px-2 shadow bg-white hover:bg-slate-100 hover:cursor-pointer w-fit text-xs transition-colors whitespace-nowrap'
			onClick={handleClick}
		>
			{children}
		</div>
	);
};

export default Token;

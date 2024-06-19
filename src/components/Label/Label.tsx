interface LabelProps {
	children: React.ReactNode;
	iconSrc?: string;
}

const Label = ({ children, iconSrc }: LabelProps) => {
	return (
		<div className='flex flex-row gap-0 text-white'>
			<span className='label-l' />
			<div className='container-row gap-x-2.5 label-m pl-2 pr-2.5 text-base relative uppercase'>
				{iconSrc && <img className='h-4 w-4' src={iconSrc} />}
				<h2>{children}</h2>
			</div>
			<span className='label-r' />
		</div>
	);
};

export default Label;

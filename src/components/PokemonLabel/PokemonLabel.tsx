interface PokemonLabelProps {
	children: React.ReactNode;
	iconSrc?: string;
}

const PokemonLabel = ({ children, iconSrc }: PokemonLabelProps) => {
	return (
		<button className='flex flex-row gap-0 text-white w-full'>
			<span className='label-l' />
			<div className='container-row gap-x-2.5 label-m pl-2 pr-3 text-sm relative uppercase w-full'>
				{iconSrc && <img className='pc-sprite' src={iconSrc} />}
				<span className='w-[15px]'></span>
				<h2 className='text-ellipsis'>{children}</h2>
			</div>
			<span className='label-r' />
		</button>
	);
};

export default PokemonLabel;

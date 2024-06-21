import { Link } from 'react-router-dom';

interface PokemonLabelProps {
	children: React.ReactNode;
	id: number;
	iconSrc?: string;
}

const PokemonLabel = ({ children, iconSrc, id }: PokemonLabelProps) => {
	return (
		<Link
			className='flex flex-row gap-0 text-white w-full'
			to={`/pokemon/${id}`}
		>
			<span className='label-l' />
			<div className='container-row gap-x-2.5 label-m pl-2 pr-3 text-sm relative uppercase w-full'>
				{iconSrc && <img className='pc-sprite' src={iconSrc} />}
				<span className='w-[15px]'></span>
				<h2 className='text-ellipsis'>{children}</h2>
			</div>
			<span className='label-r' />
		</Link>
	);
};

export default PokemonLabel;

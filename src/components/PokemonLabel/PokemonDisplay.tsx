import { Link } from 'react-router-dom';

interface PokemonDisplayProps {
	children: React.ReactNode;
	id?: number;
	iconSrc?: string;
}

const PokemonDisplay = ({ children, iconSrc, id }: PokemonDisplayProps) => {
	return (
		<Link
			className='group pkm-label flex flex-row gap-0 text-white w-full'
			to={id ? `/pokemon/${id}` : ''}
		>
			<div className='pl-2 pr-2.5 py-[2px] box-border text-sm relative uppercase w-full '>
				<div className='container-row gap-x-2.5 h-full overflow-hidden relative'>
					{(iconSrc || id) && (
						<img
							className='pc-artwork-uncropped'
							src={
								iconSrc ??
								`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
							}
							onError={(ev) => ((ev.target as HTMLImageElement).src = '')}
						/>
					)}
					<h2 className='text-ellipsis overflow-hidden whitespace-nowrap relative z-10 text-stone-800 group-hover:text-stone-600'>
						{children}
					</h2>
				</div>
			</div>
		</Link>
	);
};

export default PokemonDisplay;

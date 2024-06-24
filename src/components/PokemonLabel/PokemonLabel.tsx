import { Link } from 'react-router-dom';

interface PokemonLabelProps {
	children: React.ReactNode;
	id?: number;
	iconSrc?: string;
}

const PokemonLabel = ({ children, iconSrc, id }: PokemonLabelProps) => {
	return (
		<Link
			className='pkm-label flex flex-row gap-0 text-white w-full'
			to={id ? `/pokemon/${id}` : ''}
		>
			<span className='label-l' />
			<div className='label-m pl-2 pr-2.5 py-[2px] box-border text-sm relative uppercase w-full '>
				<div className='container-row gap-x-2.5 h-full overflow-hidden relative'>
					{(iconSrc || id) && (
						<img
							className='pc-sprite'
							src={
								iconSrc ??
								`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${id}.png`
							}
							onError={(ev) => ((ev.target as HTMLImageElement).src = '')}
						/>
					)}
					<h2 className='text-ellipsis ml-8 text-xs w-14 overflow-hidden whitespace-nowrap relative z-10'>
						{children}
					</h2>
				</div>
			</div>
			<span className='label-r' />
		</Link>
	);
};

export default PokemonLabel;

import { Link } from 'react-router-dom';
import useAudio from '../../hooks/useAudio';

interface PokemonLabelProps {
	children: React.ReactNode;
	id?: number;
	iconSrc?: string;
}

const PokemonLabel = ({ children, iconSrc, id }: PokemonLabelProps) => {
	const { playAudio } = useAudio('/assets/audio/pb_tray_enter.wav');

	return (
		<Link
			className='pkm-label flex flex-row gap-0 text-white w-full'
			to={id ? `/pokemon/${id}` : ''}
			onClick={playAudio}
		>
			<span className='label-l' />
			<div className='label-m pr-2.5 py-[2px] box-border text-sm relative uppercase w-full '>
				<div className='container-row h-full overflow-hidden relative'>
					{(iconSrc || id) && (
						<img
							className='pc-artwork'
							src={
								iconSrc ??
								`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
							}
							onError={(ev) => ((ev.target as HTMLImageElement).src = '')}
						/>
					)}
					<h2 className='text-ellipsis ml-10 text-xs w-14 overflow-hidden whitespace-nowrap relative z-10'>
						{children}
					</h2>
				</div>
			</div>
			<span className='label-r' />
		</Link>
	);
};

export default PokemonLabel;

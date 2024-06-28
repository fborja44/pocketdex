import { PokemonStat } from 'pokenode-ts';
import Statbar from '../../Statbar/Statbar';
import { motion } from 'framer-motion';
import { useNavigation } from 'react-router-dom';

interface SpeciesStatbarProps {
	statData: PokemonStat;
}

const SpeciesStatbar = ({ statData }: SpeciesStatbarProps) => {
	const { state } = useNavigation();

	switch (statData.stat.name) {
		case 'hp': {
			statData.stat.name = 'health';
			break;
		}
		case 'special-attack': {
			statData.stat.name = 'sp. attack';
			break;
		}
		case 'special-defense': {
			statData.stat.name = 'sp. def';
			break;
		}
	}
	// Calculate width of stat bar display
	const width =
		Math.min(Math.floor((statData.base_stat / 255) * 150 * 1.2), 150) + 'px';

	let color = '';
	if (statData.base_stat >= 185) {
		color = 'bg-cyan-500';
	} else if (statData.base_stat >= 120) {
		color = 'bg-green-500';
	} else if (statData.base_stat >= 100) {
		color = 'bg-lime-500';
	} else if (statData.base_stat >= 80) {
		color = 'bg-yellow-500';
	} else if (statData.base_stat >= 50) {
		color = 'bg-orange-500';
	} else {
		color = 'bg-red-500';
	}

	return (
		<>
			<div className='text-sm capitalize text-stone-500'>
				{statData.stat.name}
			</div>
			<div className='text-lg justify-self-center'>{statData.base_stat}</div>
			<div className='relative'>
				<Statbar />
				<motion.span
					initial={{ width: 0 }}
					animate={{ width: width }}
					transition={{
						duration: state !== 'loading' ? 0.5 : 0,
						type: 'spring',
					}}
					className={`${color} h-[3px] absolute bottom-[4px] left-[3px]`}
				/>
				{/* 150px = 100% = 255 points */}
			</div>
		</>
	);
};

export default SpeciesStatbar;

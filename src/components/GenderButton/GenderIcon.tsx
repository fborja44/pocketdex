import { Gender } from '../../types';

interface GenderIconProps {
	gender: Gender;
}

const GenderIcon = ({ gender }: GenderIconProps) => {
	if (gender === 'genderless') return null;

	let color, text;
	switch (gender) {
		case 'male':
			color = 'text-cyan-400';
			text = '♂';
			break;
		case 'female':
			color = 'text-red-500';
			text = '♀';
			break;
		default:
			break;
	}

	return (
		<div className={`${color} shadow-button text-2xl leading-[20px]`}>
			{text}
		</div>
	);
};

export default GenderIcon;

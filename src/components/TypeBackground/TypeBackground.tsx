import { Type } from '../../types';
import { TYPE_GRADIENTS } from '../../styles/colors';

interface TypeBackgroundProps {
	type: Type | undefined;
}

const TypeBackground = ({ type }: TypeBackgroundProps) => {
	const bg = type
		? `${TYPE_GRADIENTS[type].from} ${TYPE_GRADIENTS[type].via} ${TYPE_GRADIENTS[type].to}`
		: 'bg-stone-300';

	return (
		<div
			className={`absolute container-center bg-gradient-to-br ${bg} left-1/2 -translate-x-1/2 -translate-y-32  w-[300px] h-[300px] self-center rounded-full shadow-md -z-20`}
		>
			<img
				src={`/assets/svg/types/${type}.svg`}
				alt=''
				className='opacity-40 h-36 w-36 relative top-16 left-2'
			/>
		</div>
	);
};

export default TypeBackground;

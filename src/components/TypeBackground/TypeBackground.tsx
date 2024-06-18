import { Type } from '../../types';
import { TYPE_GRADIENTS } from '../../styles/colors';

interface TypeBackgroundProps {
	type: Type;
}

const TypeBackground = ({ type }: TypeBackgroundProps) => {
	console.log(TYPE_GRADIENTS[type]);

	return (
		<div
			className={`absolute container-center bg-gradient-to-br ${TYPE_GRADIENTS[type].from} ${TYPE_GRADIENTS[type].via} ${TYPE_GRADIENTS[type].to} left-1/2 -translate-x-1/2 -translate-y-32  w-[300px] h-[300px] self-center rounded-full shadow-md -z-10`}
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

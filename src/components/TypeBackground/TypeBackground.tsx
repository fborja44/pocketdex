import { Type } from '../../types';

interface TypeBackgroundProps {
	type: Type;
}

const TypeBackground = ({ type }: TypeBackgroundProps) => {
	return (
		<div className='absolute container-center bg-gradient-to-br from-amber-400 from-40% left-1/2 -translate-x-1/2 -translate-y-32 to-yellow-300 w-[300px] h-[300px] self-center rounded-full shadow-md -z-10'>
			<img
				src={`/assets/svg/types/${type}.svg`}
				alt=''
				className='opacity-50 h-36 w-36 relative top-16 left-2'
			/>
		</div>
	);
};

export default TypeBackground;

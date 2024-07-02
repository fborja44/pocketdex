import { Link } from 'react-router-dom';
import useAudio from '../../hooks/useAudio';

interface HomeButton {
	children: React.ReactNode;
	to: string;
	imgSrc?: string;
}

const HomeButton = ({ children, to, imgSrc }: HomeButton) => {
	const { playAudio } = useAudio('/assets/audio/menu_open.wav');

	return (
		<Link
			to={to}
			className='flex flex-row items-center justify-between pl-8 pr-3 home-button text-white uppercase text-xl'
			onClick={playAudio}
		>
			<span className='shadow-menu'>{children}</span>
			<img
				src={imgSrc}
				className='h-[65px] w-[75px] object-cover object-right-top'
			/>
		</Link>
	);
};

export default HomeButton;

import { Link } from 'react-router-dom';
import useAudio from '../../hooks/useAudio';

interface MenuButtonProps {
	children: React.ReactNode;
	to: string;
}

const MenuButton = ({ children, to }: MenuButtonProps) => {
	const { playAudio } = useAudio('/assets/audio/pb_tray_ball.wav', 0.3);

	return (
		<Link
			className='group container-row gap-x-1 uppercase text-dex pb-[2px] text-lg'
			to={to}
			onClick={playAudio}
		>
			<span className='text-dex-dark'>&lt;&lt;</span>
			<span className='group-hover:brightness-125 transition-all'>
				{children}
			</span>
			<span className='text-dex-dark'>&gt;&gt;</span>
		</Link>
	);
};

export default MenuButton;

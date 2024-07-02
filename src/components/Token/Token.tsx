import { Link } from 'react-router-dom';
import useAudio from '../../hooks/useAudio';

interface TokenProps {
	children: React.ReactNode;
	to: string;
}

const Token = ({ to, children }: TokenProps) => {
	const { playAudio } = useAudio('/assets/audio/pb_tray_empty.wav');

	return (
		<Link
			className='rounded-full px-2 shadow bg-white hover:bg-slate-100 hover:cursor-pointer w-fit text-xs transition-colors whitespace-nowrap'
			to={to}
			onClick={playAudio}
		>
			{children}
		</Link>
	);
};

export default Token;

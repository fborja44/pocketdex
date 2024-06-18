import { Link } from 'react-router-dom';

interface HomeButton {
	children: React.ReactNode;
	to: string;
	imgSrc?: string;
}

const HomeButton = ({ children, to, imgSrc }: HomeButton) => {
	return (
		<Link
			to={to}
			className='flex flex-row items-center justify-between pl-8 pr-3 home-button text-white uppercase text-xl'
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

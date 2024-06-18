import { Link } from 'react-router-dom';

interface MenuButtonProps {
	children: React.ReactNode;
	to: string;
}

const MenuButton = ({ children, to }: MenuButtonProps) => {
	return (
		<Link
			to={to}
			className='group container-row gap-x-1 uppercase text-dex pb-[2px] text-lg'
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

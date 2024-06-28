import { Link } from 'react-router-dom';
import Logo from '../../assets/sprites/ui/logo.png';

interface TitlebarLinkProps {
	children: React.ReactNode;
	to: string;
	external?: boolean;
}

const TitlebarLink = ({ children, to, external }: TitlebarLinkProps) => {
	return (
		<Link
			to={to}
			target={external ? '_blank' : ''}
			className='container-row gap-x-1.5 text-stone-300 hover:text-dex-light transition-colors'
		>
			<span className='relative bottom-[1px]'>▪</span>
			<div>{children}</div>
		</Link>
	);
};

const Titlebar = () => {
	return (
		<header className='flex flex-col'>
			<div className='titlebar flex flex-row pr-2 uppercase text-white relative z-10'>
				<img src={Logo} alt='' className='h-[26px]' />
				<div className='container-row justify-between h-[28px] w-full pl-2'>
					<Link
						to='/'
						className='container-row h-full gap-x-2 text-xl hover:text-dex-light transition-colors'
					>
						Pocketdex
					</Link>
					<div className='container-row text-xs gap-x-3'>
						<TitlebarLink to='https://github.com/fborja44/pocketdex' external>
							Contact
						</TitlebarLink>
						<TitlebarLink to='https://github.com/fborja44/pocketdex' external>
							Github
						</TitlebarLink>
					</div>
				</div>
			</div>
			<span className='h-[8px] w-full bg-device-400 border-t-2 border-b-2 border-device-500 relative -z-10' />
		</header>
	);
};

export default Titlebar;

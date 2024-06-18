import MenuButton from './MenuButton';
import HomeIcon from '../../assets/sprites/ui/home.png';

const Menubar = () => {
	return (
		<nav className='menubar flex flex-row justify-between items-center px-2'>
			<MenuButton to='/pokemon'>Dex</MenuButton>
			<MenuButton to='/'>
				<img src={HomeIcon} alt='' />
			</MenuButton>
			<MenuButton to='/settings'>CFG</MenuButton>
		</nav>
	);
};

export default Menubar;

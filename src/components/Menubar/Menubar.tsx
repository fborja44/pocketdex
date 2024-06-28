import MenuButton from './MenuButton';
import HomeIcon from '../../assets/sprites/ui/home.png';

const Menubar = () => {
	return (
		<nav className='menubar flex flex-row justify-between items-center px-2 relative z-50'>
			<MenuButton to='/pokemon/1'>Dex</MenuButton>
			<MenuButton to='/'>
				<img src={HomeIcon} alt='' />
			</MenuButton>
			<MenuButton to='/settings'>Set</MenuButton>
		</nav>
	);
};

export default Menubar;

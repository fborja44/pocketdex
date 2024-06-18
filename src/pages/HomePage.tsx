import HomeButton from '../components/HomeButton/HomeButton';
import PageLayout from '../components/PageLayout/PageLayout';
import Dex from '../assets/sprites/ui/home/dex.png';
import Ability from '../assets/sprites/ui/home/ability-charm.png';
import Pouch from '../assets/sprites/ui/home/berry-pouch.png';
import Case from '../assets/sprites/ui/home/tm-case.png';
import Map from '../assets/sprites/ui/home/town-map.png';

const HomePage = () => {
	return (
		<PageLayout>
			<section className='container-col h-full justify-between py-0.5'>
				<HomeButton to='/pokemon' imgSrc={Dex}>
					Pokédex
				</HomeButton>
				<HomeButton to='/ability' imgSrc={Ability}>
					Abilities
				</HomeButton>
				<HomeButton to='/move' imgSrc={Case}>
					Moves & TMs
				</HomeButton>
				<HomeButton to='/item' imgSrc={Pouch}>
					Item
				</HomeButton>
				<HomeButton to='/location' imgSrc={Map}>
					Locations
				</HomeButton>
			</section>
		</PageLayout>
	);
};

export default HomePage;

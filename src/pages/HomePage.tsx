import HomeButton from '../components/HomeButton/HomeButton';
import PageLayout from '../components/PageLayout/PageLayout';
import Dex from '../assets/sprites/ui/home/dex.png';
import Ability from '../assets/sprites/ui/home/ability-charm.png';
import Pouch from '../assets/sprites/ui/home/berry-pouch.png';
import Case from '../assets/sprites/ui/home/tm-case.png';
import Pokeball from '../assets/sprites/ui/home/pokeball.png';

const HomePage = () => {
	return (
		<PageLayout>
			<section className='container-col h-full justify-between py-2.5'>
				<HomeButton to='/pokemon/1' imgSrc={Dex}>
					Pokédex
				</HomeButton>
				<HomeButton to='/ability/1' imgSrc={Ability}>
					Abilities
				</HomeButton>
				<HomeButton to='/move/1' imgSrc={Case}>
					Moves & TMs
				</HomeButton>
				<HomeButton to='/item/1' imgSrc={Pouch}>
					Items
				</HomeButton>
				<HomeButton to='/pc' imgSrc={Pokeball}>
					My PC
				</HomeButton>
			</section>
		</PageLayout>
	);
};

export default HomePage;

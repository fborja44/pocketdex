import PageLayout from '../components/PageLayout/PageLayout';
import { MAX_ABILITY_ID, MIN_ABILITY_ID } from '../constants';
import { PageHeaderDevice } from '../components/PageLayout/PageHeader';
import { parseAbilityEffects } from '../utils/string';
import PokeballOutline from '../assets/sprites/outlined/pokeball.png';
import TreeOutline from '../assets/sprites/outlined/tree.png';
import { Section } from '../components/Section/Section';
import LoadingPage from './LoadingPage';
import { Ability } from 'pokenode-ts';
import { useLoaderData } from 'react-router-dom';

const AbilityPage = () => {
	const ability = useLoaderData() as Ability;

	const content = ability ? (
		<AbilityPageContent ability={ability} />
	) : (
		<LoadingPage />
	);

	console.log(ability);

	return (
		<PageLayout>
			<PageHeaderDevice
				data={ability}
				minId={MIN_ABILITY_ID}
				maxId={MAX_ABILITY_ID}
				placeholder='Enter an ability...'
			/>
			{content}
		</PageLayout>
	);
};

export default AbilityPage;

interface AbilityPageContent {
	ability: Ability;
}

const AbilityPageContent = ({ ability }: AbilityPageContent) => {
	const [battle, overworld] = parseAbilityEffects(
		ability.effect_entries.find((effect) => effect.language.name === 'en')
			?.effect
	);

	return (
		<div className='p-2 container-col gap-y-5'>
			<Section iconSrc={PokeballOutline} label='Battle Effect'>
				{battle.length ? battle : 'No Battle Effect.'}
			</Section>
			<Section iconSrc={TreeOutline} label='Overworld Effect'>
				{overworld.length ? overworld : 'No Overworld Effect.'}
			</Section>
		</div>
	);
};

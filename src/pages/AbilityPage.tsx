import { useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import useAbility from '../hooks/useAbility';
import { ErrorBody } from './ErrorPage';
import { MAX_ABILITY_ID, MIN_ABILITY_ID } from '../constants';
import { PageHeaderDevice } from '../components/PageLayout/PageHeader';
import { parseAbilityEffects } from '../utils/string';
import PokeballOutline from '../assets/sprites/outlined/pokeball.png';
import TreeOutline from '../assets/sprites/outlined/tree.png';
import { Section } from '../components/Section/Section';
import LoadingPage from './LoadingPage';
import { Ability } from 'pokenode-ts';

const AbilityPage = () => {
	const [id, setId] = useState<number>(1);

	const { ability, error, loading, fetchAbility } = useAbility();

	const handleBrowse = (newId: number) => {
		setId(newId);
		fetchAbility(newId.toString().toLowerCase());
	};

	const handleSearch = async (searchTerm: string | number) => {
		const data = await fetchAbility(searchTerm.toString().toLowerCase());
		setId((prevId) => data?.id ?? prevId);
	};

	if (error && loading) {
		return null;
	}

	const content = ability ? (
		<AbilityPageContent ability={ability} />
	) : (
		<LoadingPage />
	);

	console.log(ability);

	return (
		<PageLayout>
			<PageHeaderDevice
				id={id}
				minId={MIN_ABILITY_ID}
				maxId={MAX_ABILITY_ID}
				handlePrev={() => handleBrowse(id - 1)}
				handleNext={() => handleBrowse(id + 1)}
				data={ability}
				handleSearch={handleSearch}
				placeholder='Enter an ability...'
			/>
			{!error ? content : <ErrorBody>Failed to find ability data.</ErrorBody>}
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

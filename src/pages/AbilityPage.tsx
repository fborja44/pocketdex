import { useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import useAbility from '../hooks/useAbility';
import ErrorPage, { ErrorBody } from './ErrorPage';
import { MAX_ABILITY_ID, MIN_ABILITY_ID } from '../constants';
import { PageHeaderDevice } from '../components/PageLayout/PageHeader';
import { parseAbilityEffects } from '../utils/string';
import Label from '../components/Label/Label';
import PokeballOutline from '../assets/sprites/outlined/pokeball.png';
import TreeOutline from '../assets/sprites/outlined/tree.png';

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

	if (!ability) {
		return <ErrorPage message='Fetching data...' />;
	}

	console.log(ability);

	const [battle, overworld] = parseAbilityEffects(
		ability.effect_entries.find((effect) => effect.language.name === 'en')
			?.effect
	);

	const name = ability.names.find(
		(entry) => entry.language.name === 'en'
	)?.name;

	return (
		<PageLayout>
			<PageHeaderDevice
				id={id}
				minId={MIN_ABILITY_ID}
				maxId={MAX_ABILITY_ID}
				handlePrev={() => handleBrowse(id - 1)}
				handleNext={() => handleBrowse(id + 1)}
				data={ability}
				name={name}
				handleSearch={handleSearch}
			/>
			{!error ? (
				<div className='p-2 container-col gap-y-5'>
					<Section iconSrc={PokeballOutline} label='Battle Effect'>
						{battle.length ? battle : 'No Battle Effect.'}
					</Section>
					<Section iconSrc={TreeOutline} label='Overworld Effect'>
						{overworld.length ? overworld : 'No Overworld Effect.'}
					</Section>
				</div>
			) : (
				<ErrorBody message={'Failed to find ability data.'} />
			)}
		</PageLayout>
	);
};

export default AbilityPage;

interface SectionProps {
	label: string;
	iconSrc?: string;
	children: React.ReactNode;
}

export const Section = ({ label, iconSrc, children }: SectionProps) => {
	return (
		<section className='flex flex-col gap-y-2 w-full'>
			<Label iconSrc={iconSrc}>{label}</Label>
			<p className='text-sm leading-tight text-stone-600'>{children}</p>
		</section>
	);
};

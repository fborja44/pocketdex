import { useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import useAbility from '../hooks/useAbility';
import ErrorPage, { ErrorBody } from './ErrorPage';
import Searchbar from '../components/Searchbar/Searchbar';
import { MAX_ABILITY_ID, MIN_ABILITY_ID } from '../constants';
import PageHeader from '../components/PageLayout/PageHeader';
import { parseAbilityEffects } from '../utils/string';

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
			<Searchbar
				handleSearch={handleSearch}
				placeholder='Enter an ability...'
			/>
			<PageHeader
				id={id}
				minId={MIN_ABILITY_ID}
				maxId={MAX_ABILITY_ID}
				handlePrev={() => handleBrowse(id - 1)}
				handleNext={() => handleBrowse(id + 1)}
				data={ability}
				name={name}
			/>
			{!error ? (
				<section className='container-col gap-y-4'>
					<div className='flex flex-col gap-y-2 w-full'>
						<h2 className='uppercase'>Battle Effect</h2>
						<p className='text-sm leading-tight text-stone-600'>
							{battle.length ? battle : 'No Battle Effect.'}
						</p>
					</div>
					<div className='flex flex-col gap-y-2 w-full'>
						<h2 className='uppercase'>Overworld Effect</h2>
						<p className='text-sm leading-tight text-stone-600'>
							{overworld.length ? overworld : 'No Overworld Effect.'}
						</p>
					</div>
				</section>
			) : (
				<ErrorBody message={'Failed to find ability data.'} />
			)}
		</PageLayout>
	);
};

export default AbilityPage;

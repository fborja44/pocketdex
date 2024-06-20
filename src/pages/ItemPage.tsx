import { useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import ErrorPage, { ErrorBody } from './ErrorPage';
import { MAX_ABILITY_ID, MIN_ABILITY_ID } from '../constants';
import { PageHeaderDevice } from '../components/PageLayout/PageHeader';
import BookOutline from '../assets/sprites/outlined/book.png';
import PhysicalOutline from '../assets/sprites/outlined/physical.png';
import MoneyOutline from '../assets/sprites/outlined/coin.png';
import { Section } from './AbilityPage';
import useItem from '../hooks/useItem';

const ItemPage = () => {
	const [id, setId] = useState<number>(1);

	const { item, error, loading, fetchItem } = useItem();

	const handleBrowse = (newId: number) => {
		setId(newId);
		fetchItem(newId.toString().toLowerCase());
	};

	const handleSearch = async (searchTerm: string | number) => {
		const data = await fetchItem(searchTerm.toString().toLowerCase());
		setId((prevId) => data?.id ?? prevId);
	};

	if (error && loading) {
		return null;
	}

	if (!item) {
		return <ErrorPage message='Fetching data...' />;
	}

	console.log(item);

	const name = item.names.find((entry) => entry.language.name === 'en')?.name;

	return (
		<PageLayout>
			<PageHeaderDevice
				id={id}
				minId={MIN_ABILITY_ID}
				maxId={MAX_ABILITY_ID}
				handlePrev={() => handleBrowse(id - 1)}
				handleNext={() => handleBrowse(id + 1)}
				data={item}
				name={name}
				iconSrc={item.sprites.default}
				handleSearch={handleSearch}
				placeholder={'Enter an item...'}
			/>
			{!error ? (
				<div className='p-2 container-col gap-y-5'>
					<Section iconSrc={BookOutline} label='Effect'>
						{
							item.effect_entries.find((entry) => entry.language.name === 'en')
								?.effect
						}
					</Section>
					<Section iconSrc={MoneyOutline} label='Price'>
						<div className='grid grid-cols-2 gap-y-1'>
							<span className=''>Purchase Price:</span>
							<span>{item.cost ? '$' + item.cost : 'Not purchasable.'}</span>
							<span>Sell Price:</span>
							<span>
								{item.category.name !== 'gameplay' ? '$' + item.cost / 2 : ''}
							</span>
						</div>
					</Section>
					{(item.fling_power !== null || item.fling_effect !== null) && (
						<Section iconSrc={PhysicalOutline} label='Thrown With Fling'>
							<div className='grid grid-cols-2 gap-y-1'>
								{item.fling_power !== null && (
									<>
										<span>Power: </span>
										<span>{item.fling_power}</span>
									</>
								)}
								{item.fling_effect !== null && (
									<>
										<span>Effect: </span>
										<span>{item.fling_effect.name}</span>
									</>
								)}
							</div>
						</Section>
					)}
				</div>
			) : (
				<ErrorBody message={'Failed to find item data.'} />
			)}
		</PageLayout>
	);
};

export default ItemPage;

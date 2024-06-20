import { useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import ErrorPage, { ErrorBody } from './ErrorPage';
import { MAX_ABILITY_ID, MIN_ABILITY_ID } from '../constants';
import { PageHeaderDevice } from '../components/PageLayout/PageHeader';
import BookOutline from '../assets/sprites/outlined/book.png';
import PhysicalOutline from '../assets/sprites/outlined/physical.png';
import MoneyOutline from '../assets/sprites/outlined/coin.png';
import { Section } from '../components/Section/Section';
import useItem from '../hooks/useItem';
import DataGrid, { DataGridEntry } from '../components/DataGrid/DataGrid';

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
						<DataGrid>
							<DataGridEntry label='Purchase Price:'>
								{item.cost ? '$ ' + item.cost : 'Not purchasable.'}
							</DataGridEntry>
							<DataGridEntry label='Sell Price:'>
								{item.category.name !== 'gameplay' ? '$ ' + item.cost / 2 : ''}
							</DataGridEntry>
						</DataGrid>
					</Section>
					{(item.fling_power !== null || item.fling_effect !== null) && (
						<Section iconSrc={PhysicalOutline} label='Thrown With Fling'>
							<DataGrid>
								{item.fling_power !== null && (
									<DataGridEntry label='Power:'>
										{item.fling_power}
									</DataGridEntry>
								)}
								{item.fling_effect !== null && (
									<DataGridEntry label='Effect:'>
										{item.fling_effect.name}
									</DataGridEntry>
								)}
							</DataGrid>
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

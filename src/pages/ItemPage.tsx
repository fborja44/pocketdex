import PageLayout from '../components/PageLayout/PageLayout';
import { MAX_ABILITY_ID, MIN_ABILITY_ID } from '../constants';
import { PageHeaderDevice } from '../components/PageLayout/PageHeader';
import BookOutline from '../assets/sprites/outlined/book.png';
import PhysicalOutline from '../assets/sprites/outlined/physical.png';
import MoneyOutline from '../assets/sprites/outlined/coin.png';
import { Section } from '../components/Section/Section';
import DataGrid, { DataGridEntry } from '../components/DataGrid/DataGrid';
import { Item } from 'pokenode-ts';
import LoadingPage from './LoadingPage';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers/rootReducer';

const ItemPage = () => {
	const item = useLoaderData() as Item;

	const content = item ? <ItemPageContent item={item} /> : <LoadingPage />;

	console.log(item);

	const { lang_code } = useSelector((state: AppState) => state.settingsState);

	const name =
		item?.names.find((entry) => entry.language.name === lang_code)?.name ??
		item?.names.find((entry) => entry.language.name === 'en')?.name;

	return (
		<PageLayout>
			<PageHeaderDevice
				minId={MIN_ABILITY_ID}
				maxId={MAX_ABILITY_ID}
				data={item}
				name={name}
				iconSrc={item?.sprites.default}
				placeholder={'Enter an item...'}
			/>
			{content}
		</PageLayout>
	);
};

export default ItemPage;

interface ItemPageContent {
	item: Item;
}

const ItemPageContent = ({ item }: ItemPageContent) => {
	const { lang_code } = useSelector((state: AppState) => state.settingsState);

	const effect =
		item.effect_entries.find((entry) => entry.language.name === lang_code)
			?.effect ??
		item.effect_entries.find((entry) => entry.language.name === 'en')?.effect;

	return (
		<div className='p-2 container-col gap-y-5'>
			<Section iconSrc={BookOutline} label='Effect'>
				{effect}
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
							<DataGridEntry label='Power:'>{item.fling_power}</DataGridEntry>
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
	);
};

import { useState } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import ErrorPage, { ErrorBody } from './ErrorPage';
import { MAX_ABILITY_ID, MIN_ABILITY_ID } from '../constants';
import { PageHeaderDevice } from '../components/PageLayout/PageHeader';
import PokeballOutline from '../assets/sprites/outlined/pokeball.png';
import BookOutline from '../assets/sprites/outlined/book.png';
import { Section } from '../components/Section/Section';
import useMove from '../hooks/useMove';
import DataGrid, { DataGridEntry } from '../components/DataGrid/DataGrid';
import TypeLabel from '../components/TypeLabel/TypeLabel';
import { MoveCategory, Type } from '../types';
import MoveCategoryLabel from '../components/MoveCategoryLabel/MoveCategoryLabel';

const MovePage = () => {
	const [id, setId] = useState<number>(1);

	const { move, error, loading, fetchMove } = useMove();

	const handleBrowse = (newId: number) => {
		setId(newId);
		fetchMove(newId.toString().toLowerCase());
	};

	const handleSearch = async (searchTerm: string | number) => {
		const data = await fetchMove(searchTerm.toString().toLowerCase());
		setId((prevId) => data?.id ?? prevId);
	};

	if (error && loading) {
		return null;
	}

	if (!move) {
		return <ErrorPage message='Fetching data...' />;
	}

	console.log(move);

	const name = move.names.find((entry) => entry.language.name === 'en')?.name;

	return (
		<PageLayout>
			<PageHeaderDevice
				id={id}
				minId={MIN_ABILITY_ID}
				maxId={MAX_ABILITY_ID}
				handlePrev={() => handleBrowse(id - 1)}
				handleNext={() => handleBrowse(id + 1)}
				data={move}
				name={name}
				handleSearch={handleSearch}
				placeholder={'Enter an move...'}
			/>
			{!error ? (
				<div className='p-2 container-col gap-y-5'>
					<Section iconSrc={BookOutline} label='Attribute'>
						<DataGrid gapX='6'>
							<DataGrid>
								<DataGridEntry label='Type:' justify>
									<TypeLabel type={move.type.name as Type} />
								</DataGridEntry>
								<DataGridEntry label='Power:' justify>
									{move.power ?? '-'}
								</DataGridEntry>
								<DataGridEntry label='Accuracy:' justify>
									{move.accuracy !== null ? move.accuracy + '%' : '-'}
								</DataGridEntry>
							</DataGrid>
							<DataGrid>
								<DataGridEntry label='Category:' justify>
									{move.damage_class ? (
										<MoveCategoryLabel
											category={move.damage_class?.name as MoveCategory}
										/>
									) : (
										'-'
									)}
								</DataGridEntry>
								<DataGridEntry label='PP:' justify>
									<span>{move.pp ?? '-'}</span>
									{move.pp && (
										<span className='text-xs ml-1'>{`(MAX ${
											move.pp * 1.6
										})`}</span>
									)}
								</DataGridEntry>
								<DataGridEntry label='Priority:' justify>
									{move.priority > 0 && '+'}
									{move.priority}
								</DataGridEntry>
							</DataGrid>
						</DataGrid>
					</Section>
					<Section iconSrc={PokeballOutline} label='Effect'>
						{
							move.effect_entries.find((entry) => entry.language.name === 'en')
								?.effect
						}
					</Section>
				</div>
			) : (
				<ErrorBody message={'Failed to find move data.'} />
			)}
		</PageLayout>
	);
};

export default MovePage;

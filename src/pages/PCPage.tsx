import { useSelector } from 'react-redux';
import PageLayout from '../components/PageLayout/PageLayout';
import { AppState } from '../redux/reducers/rootReducer';
import PokemonLabel from '../components/PokemonLabel/PokemonLabel';
import {
	DeviceBar,
	PageHeaderLayout,
} from '../components/PageLayout/PageHeader';

const PCPage = () => {
	const { pokemon } = useSelector((state: AppState) => state.pcState);

	return (
		<PageLayout>
			<PageHeaderLayout>
				<DeviceBar id={'PC'} name='My PC' data={null} simple />
			</PageHeaderLayout>
			<div className='p-2'>
				<div className='grid grid-cols-2 gap-y-1 gap-x-4 items-center'>
					{pokemon.map((entry) => (
						<PokemonLabel iconSrc={entry.sprite}>{entry.name}</PokemonLabel>
					))}
				</div>
			</div>
		</PageLayout>
	);
};

export default PCPage;

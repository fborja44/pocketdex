import { useSelector } from 'react-redux';
import PageLayout from '../components/PageLayout/PageLayout';
import { AppState } from '../redux/reducers/rootReducer';
import PokemonLabel from '../components/PokemonLabel/PokemonLabel';
import {
	DeviceBar,
	DeviceHeaderLayout,
} from '../components/PageLayout/PageHeader';

const PCPage = () => {
	const { pokemon } = useSelector((state: AppState) => state.pcState);

	return (
		<PageLayout>
			<DeviceHeaderLayout>
				<DeviceBar name='My PC' simple />
			</DeviceHeaderLayout>
			<div className='p-2'>
				<div className='grid grid-cols-2 gap-y-3 gap-x-4 items-center'>
					{pokemon.map((entry) => (
						<PokemonLabel
							key={`label-${entry.id}`}
							iconSrc={entry.sprite}
							id={entry.id}
						>
							{entry.name}
						</PokemonLabel>
					))}
				</div>
			</div>
		</PageLayout>
	);
};

export default PCPage;

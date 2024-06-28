import { useDispatch, useSelector } from 'react-redux';
import {
	DeviceBar,
	DeviceHeaderLayout,
} from '../components/PageLayout/PageHeader';
import PageLayout from '../components/PageLayout/PageLayout';
import { LANGUAGES } from '../constants';
import { setLanguage } from '../redux/actions/settingsActions';
import { AppState } from '../redux/reducers/rootReducer';

const SettingsPage = () => {
	const dispatch = useDispatch();

	const { lang_code } = useSelector((state: AppState) => state.settingsState);

	return (
		<PageLayout>
			<DeviceHeaderLayout>
				<DeviceBar name='App Settings' simple />
				<div className='p-2'>
					<h2>Language</h2>
					<select
						value={lang_code}
						className='w-1/2 border-b-2 border-r-2 border-twilight outline-none text-stone-600 text-sm py-0.5 px-1'
						onChange={(ev) => {
							dispatch(setLanguage(ev.target.value));
						}}
					>
						{LANGUAGES.map((lang) => (
							<option value={lang.short} key={lang.short}>
								{lang.name}
							</option>
						))}
					</select>
				</div>
			</DeviceHeaderLayout>
		</PageLayout>
	);
};

export default SettingsPage;

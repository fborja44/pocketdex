import { useDispatch, useSelector } from 'react-redux';
import {
	DeviceBar,
	DeviceHeaderLayout,
} from '../components/PageLayout/PageHeader';
import PageLayout from '../components/PageLayout/PageLayout';
import { LANGUAGES } from '../constants';
import { setLanguage, setVolume } from '../redux/actions/settingsActions';
import { AppState } from '../redux/reducers/rootReducer';
import Label from '../components/Label/Label';
import { useState } from 'react';
import useAudio from '../hooks/useAudio';

const SettingsPage = () => {
	const dispatch = useDispatch();

	const { lang_code, volume } = useSelector(
		(state: AppState) => state.settingsState
	);

	const [volumeValue, setVolumeValue] = useState(volume);

	const { playAudio: playAudioVolume } = useAudio(
		'/assets/audio/pb_tray_empty.wav'
	);
	const { playAudio: playAudioLang } = useAudio('/assets/audio/select.wav');

	return (
		<PageLayout>
			<DeviceHeaderLayout>
				<DeviceBar name='App Settings' simple />
			</DeviceHeaderLayout>
			<div className='flex flex-col gap-y-6 p-2'>
				<SettingsSection>
					<Label>Language</Label>
					<select
						value={lang_code}
						className='w-1/2 border-b-2 border-r-2 border-twilight outline-none text-stone-600 text-sm py-0.5 px-1'
						onChange={(ev) => {
							dispatch(setLanguage(ev.target.value));
							playAudioLang();
						}}
						onClick={playAudioLang}
					>
						{LANGUAGES.map((lang) => (
							<option value={lang.short} key={lang.short}>
								{lang.name}
							</option>
						))}
					</select>
				</SettingsSection>
				<SettingsSection>
					<Label>Volume</Label>
					<div className='flex flex-row gap-x-2'>
						<input
							type='range'
							min='0'
							max='10'
							value={volumeValue * 10}
							onChange={(ev) => {
								const newVolume = ev.target.valueAsNumber / 10;
								setVolumeValue(newVolume);
								dispatch(setVolume(newVolume));
								playAudioVolume();
							}}
							className='w-1/2 accent-dex-light border-none outline-none'
						/>
						<span className='text-stone-700'>{volumeValue * 100 + '%'}</span>
					</div>
				</SettingsSection>
			</div>
		</PageLayout>
	);
};

export default SettingsPage;

interface SettingsSection {
	children: React.ReactNode;
}

const SettingsSection = ({ children }: SettingsSection) => {
	return <div className='flex flex-col gap-y-2'>{children}</div>;
};

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers/rootReducer';

const useAudio = (audioSrc: string, volume: number = 0.1) => {
	// Paramter volume = instance volume for specific audio
	// Redux state volume = global app volume applied to local volume

	const [currentVolume, setVolume] = useState(volume);

	const { volume: appVolume } = useSelector(
		(state: AppState) => state.settingsState
	);

	const playAudio = () => {
		const audio = new Audio(audioSrc);
		audio.volume = currentVolume * appVolume;
		audio.play();
	};

	return { playAudio, setVolume };
};

export default useAudio;

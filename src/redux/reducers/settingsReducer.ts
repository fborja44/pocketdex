import { createReducer } from '@reduxjs/toolkit';
import { setLanguage, setVolume } from '../actions/settingsActions';

export interface SettingsState {
	lang_code: string;
	volume: number;
}

export const initialState: SettingsState = {
	lang_code: 'en',
	volume: 1,
};

const settingsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setLanguage, (state, action) => {
			state.lang_code = action.payload;
		})
		.addCase(setVolume, (state, action) => {
			state.volume = action.payload;
		});
});

export default settingsReducer;

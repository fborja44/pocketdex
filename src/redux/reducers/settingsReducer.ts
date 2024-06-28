import { createReducer } from '@reduxjs/toolkit';
import { setLanguage } from '../actions/settingsActions';

export interface SettingsState {
	lang_code: string;
}

export const initialState: SettingsState = {
	lang_code: 'en',
};

const settingsReducer = createReducer(initialState, (builder) => {
	builder.addCase(setLanguage, (state, action) => {
		state.lang_code = action.payload;
	});
});

export default settingsReducer;

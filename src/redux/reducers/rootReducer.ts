import { combineReducers } from 'redux';
import pcReducer, { PCState } from './pcReducer';
import settingsReducer, { SettingsState } from './settingsReducer';

export interface AppState {
	pcState: PCState;
	settingsState: SettingsState;
}

const rootReducer = combineReducers({
	pcState: pcReducer,
	settingsState: settingsReducer,
});

export default rootReducer;

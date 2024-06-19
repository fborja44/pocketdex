import { combineReducers } from 'redux';
import pcReducer, { PCState } from './pcReducer';

export interface AppState {
	pcState: PCState;
}

const rootReducer = combineReducers({
	pcState: pcReducer,
});

export default rootReducer;

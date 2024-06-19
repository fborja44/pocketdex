import { createReducer } from '@reduxjs/toolkit';
import { catchPokemon, releasePokemon } from '../actions/pcActions';

export interface PCState {
	pokemon: number[];
	abilities: number[];
	moves: number[];
	items: number[];
}

export const initialState: PCState = {
	pokemon: [],
	abilities: [],
	moves: [],
	items: [],
};

const pcActions = createReducer(initialState, (builder) => {
	builder
		.addCase(catchPokemon, (state, action) => {
			state.pokemon.push(action.payload.id);
		})
		.addCase(releasePokemon, (state, action) => {
			state.pokemon = state.pokemon.filter((id) => id !== action.payload.id);
		});
});

export default pcActions;

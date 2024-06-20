import { createReducer } from '@reduxjs/toolkit';
import { catchPokemon, releasePokemon } from '../actions/pcActions';
import { SavedPokemon } from '../../types';

export interface PCState {
	pokemon: SavedPokemon[];
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
			const id = action.payload.id;
			if (!state.pokemon.find((pokemon) => pokemon.id === id)) {
				state.pokemon.push(action.payload);
			}
		})
		.addCase(releasePokemon, (state, action) => {
			state.pokemon = state.pokemon.filter(
				(pokemon) => pokemon.id !== action.payload.id
			);
		});
});

export default pcActions;

import { createAction } from '@reduxjs/toolkit';

export const catchPokemon = createAction('CATCH_POKEMON', (id: number) => {
	return {
		payload: { id },
	};
});

export const releasePokemon = createAction('RELEASE_POKEMON', (id: number) => {
	return {
		payload: { id },
	};
});

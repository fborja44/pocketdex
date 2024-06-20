import { createAction } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';
import { SavedPokemon } from '../../types';

export const catchPokemon = createAction(
	'CATCH_POKEMON',
	(pokemon: Pokemon): { payload: SavedPokemon } => {
		return {
			payload: {
				id: pokemon.id,
				name: pokemon.name,
				sprite:
					pokemon.sprites?.versions['generation-viii']?.icons?.front_default ??
					undefined,
			},
		};
	}
);

export const releasePokemon = createAction('RELEASE_POKEMON', (id: number) => {
	return {
		payload: { id },
	};
});

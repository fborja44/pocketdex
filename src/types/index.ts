import { Ability, Item, Move, Pokemon } from 'pokenode-ts';

export type EntryData = Pokemon | Ability | Item | Move;

export type Type =
	| 'normal'
	| 'fire'
	| 'water'
	| 'electric'
	| 'grass'
	| 'ice'
	| 'fighting'
	| 'poison'
	| 'ground'
	| 'flying'
	| 'psychic'
	| 'bug'
	| 'rock'
	| 'ghost'
	| 'dragon'
	| 'dark'
	| 'steel'
	| 'fairy'
	| 'stellar'
	| 'unknown';

export type MoveCategory = 'physical' | 'special' | 'status';

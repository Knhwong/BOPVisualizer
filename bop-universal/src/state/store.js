import { writable } from 'svelte/store';
import { initialState } from './initial.js';

export const state = writable(initialState);

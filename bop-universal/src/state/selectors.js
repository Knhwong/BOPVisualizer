import { derived } from 'svelte/store';
import { state } from './store.js';

// Example placeholder:
export const isLoading = derived(state, s => s.ui.loading);
import { writable } from "svelte/store";

export const edit = writable(false);
export const url = writable('/');
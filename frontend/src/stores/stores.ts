import type { User } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from '../lib/firebase/firebase';

export const user = writable<User | undefined>(undefined);
export const edit = writable(false);
export const url = writable('/');

auth.onAuthStateChanged((change) => {
  user.set(change);
})

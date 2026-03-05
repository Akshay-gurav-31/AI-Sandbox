import { writable } from 'svelte/store';

// Mock authentication store
// null means unauthenticated, otherwise object with user details

/** @type {import('svelte/store').Writable<{email: string, role: string, name: string} | null>} */
export const user = writable(null);

/** @param {string} email @param {string} [role] */
export const login = (email, role = 'Student') => {
    user.set({
        email,
        role,
        name: email.split('@')[0] || 'User'
    });
};

export const logout = () => {
    user.set(null);
};

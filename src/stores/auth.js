import { writable } from 'svelte/store';

// Mock authentication store
// null means unauthenticated, otherwise object with user details
export const user = writable(null);

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

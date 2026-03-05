import { signIn } from "../../auth";

/** @type {import('./$types').Actions} */
export const actions = {
    google: (event) => signIn(event),
    github: (event) => signIn(event),
    linkedin: (event) => signIn(event),
    credentials: (event) => signIn(event)
};

import { signIn } from "../../auth";

/** @type {import('./$types').Actions} */
export const actions = {
    credentials: (event) => signIn(event)
};

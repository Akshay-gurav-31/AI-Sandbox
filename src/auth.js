import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";
import Github from "@auth/sveltekit/providers/github";
import LinkedIn from "@auth/sveltekit/providers/linkedin";
import Credentials from "@auth/sveltekit/providers/credentials";
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET,
    AUTH_SECRET
} from "$env/static/private";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }),
        ...(GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET ? [Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        })] : []),
        ...(LINKEDIN_CLIENT_ID && LINKEDIN_CLIENT_SECRET ? [LinkedIn({
            clientId: LINKEDIN_CLIENT_ID,
            clientSecret: LINKEDIN_CLIENT_SECRET
        })] : []),
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text" },
                role: { label: "Role", type: "text" }
            },
            /** @param {any} credentials */
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = String(credentials.email);
                const name = credentials.name ? String(credentials.name) : email.split('@')[0];
                const role = credentials.role ? String(credentials.role) : "Student";

                return {
                    id: "1",
                    name,
                    email,
                    role
                };
            }
        })
    ],
    secret: AUTH_SECRET,
    trustHost: true,
    basePath: "/auth",
    pages: {
        signIn: "/login",
        newUser: "/register",
        error: "/login",
    },
    callbacks: {
        /** @param {{ token: any, user: any }} params */
        jwt({ token, user }) {
            if (user) {
                // @ts-ignore
                token.role = user.role || "Student";
            }
            return token;
        },
        /** @param {{ session: any, token: any }} params */
        session({ session, token }) {
            if (session.user) {
                // @ts-ignore
                session.user.role = token.role;
            }
            return session;
        }
    }
});

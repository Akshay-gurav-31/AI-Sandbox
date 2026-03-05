<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { enhance } from "$app/forms";
    import AuthCard from "../../components/AuthCard.svelte";
    import { Eye, EyeOff, Github, Linkedin } from "lucide-svelte";

    let email = "";
    let password = "";
    let showPassword = false;
    let isSubmitting = false;
    let isSubmittingSocial = null;

    onMount(() => {
        // Redirect if already logged in via localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            goto('/playground');
        }
    });

    const handleCredentialsLogin = (e) => {
        e.preventDefault();
        isSubmitting = true;
        
        // Mock Login: Save to localStorage as requested
        const mockUser = {
            name: email.split('@')[0],
            email: email,
            role: 'Student'
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Small delay for realism
        setTimeout(() => {
            isSubmitting = false;
            goto('/playground');
        }, 800);
    };

    const handleSocialLogin = (provider) => {
        isSubmittingSocial = provider;
        // The form will automatically POST to SvelteKit Auth
    };
</script>

<AuthCard title="Welcome back" subtitle="Log in to access your Sandbox.">
    <form onsubmit={handleCredentialsLogin} class="space-y-5">
        <!-- Email Input -->
        <div
            class="relative group rounded-xl border border-slate-800 bg-slate-900/50 focus-within:border-brand-blue/50 focus-within:ring-1 focus-within:ring-brand-blue/20 transition-all"
        >
            <label
                for="email"
                class="absolute left-4 top-2 text-[10px] font-bold uppercase tracking-wider text-brand-blue opacity-70"
                >Email Address</label
            >
            <input
                name="email"
                type="email"
                id="email"
                bind:value={email}
                required
                class="block w-full px-4 pt-7 pb-2 bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 text-sm"
                placeholder="name@example.com"
            />
            <span
                class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-blue transition-colors"
                >mail</span
            >
        </div>

        <!-- Password Input -->
        <div class="space-y-2">
            <div
                class="relative group rounded-xl border border-slate-800 bg-slate-900/50 focus-within:border-brand-blue/50 focus-within:ring-1 focus-within:ring-brand-blue/20 transition-all"
            >
                <label
                    for="password"
                    class="absolute left-4 top-2 text-[10px] font-bold uppercase tracking-wider text-brand-blue opacity-70"
                    >Password</label
                >
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    bind:value={password}
                    required
                    class="block w-full px-4 pt-7 pb-2 bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 text-sm"
                    placeholder="••••••••"
                />
                <button
                    type="button"
                    onclick={() => (showPassword = !showPassword)}
                    class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                    {showPassword ? "visibility_off" : "visibility"}
                </button>
            </div>
            <div class="flex justify-end px-1">
                <button
                    type="button"
                    class="text-xs font-medium text-brand-blue/80 hover:text-brand-blue transition-colors underline decoration-brand-blue/30 underline-offset-4"
                    >Forgot password?</button
                >
            </div>
        </div>

        <!-- Login Button -->
        <button
            type="submit"
            disabled={isSubmitting || !email || !password}
            class="w-full py-3.5 bg-brand-blue text-white font-bold rounded-xl shadow-glow hover:bg-brand-blue/90 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
            <span>{isSubmitting ? "Logging in..." : "Log In"}</span>
        </button>
    </form>

    <!-- Divider -->
    <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-800"></div>
        </div>
        <div class="relative flex justify-center text-xs uppercase tracking-widest">
            <span class="px-4 bg-slate-950 text-slate-500">Or continue with</span>
        </div>
    </div>

    <!-- Social Logins -->
    <div class="grid grid-cols-2 gap-3">
        <!-- Google Login -->
        <div class="col-span-2">
            <form action="/auth/signin/google" method="POST" onsubmit={() => handleSocialLogin('google')}>
                <input type="hidden" name="callbackUrl" value="/playground" />
                <button
                    type="submit"
                    disabled={isSubmittingSocial !== null}
                    class="flex items-center justify-center gap-3 w-full py-2.5 px-6 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 hover:border-slate-700 transition-all group disabled:opacity-50"
                >
                    {#if isSubmittingSocial === 'google'}
                        <div class="w-5 h-5 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                        <span class="text-sm font-semibold text-slate-300">Connecting...</span>
                    {:else}
                        <svg
                            class="w-6 h-6"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span class="text-sm font-semibold text-slate-300 group-hover:text-white"
                            >Continue with Google</span
                        >
                    {/if}
                </button>
            </form>
        </div>

        <!-- GitHub Login -->
        <form action="/auth/signin/github" method="POST" onsubmit={() => handleSocialLogin('github')}>
            <input type="hidden" name="callbackUrl" value="/playground" />
            <button
                type="submit"
                disabled={isSubmittingSocial !== null}
                class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 hover:border-slate-700 transition-all group disabled:opacity-50"
            >
                {#if isSubmittingSocial === 'github'}
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {:else}
                    <svg
                        class="w-5 h-5 fill-white transition-transform group-hover:scale-110"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    <span class="text-xs font-semibold text-slate-300 group-hover:text-white">GitHub</span>
                {/if}
            </button>
        </form>

        <!-- LinkedIn Login -->
        <form action="/auth/signin/linkedin" method="POST" onsubmit={() => handleSocialLogin('linkedin')}>
            <input type="hidden" name="callbackUrl" value="/playground" />
            <button
                type="submit"
                disabled={isSubmittingSocial !== null}
                class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800 hover:border-slate-700 transition-all group disabled:opacity-50"
            >
                {#if isSubmittingSocial === 'linkedin'}
                    <div class="w-4 h-4 border-2 border-[#0A66C2] border-t-transparent rounded-full animate-spin"></div>
                {:else}
                    <svg
                        class="w-5 h-5 fill-white transition-transform group-hover:scale-110"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span class="text-xs font-semibold text-slate-300 group-hover:text-white">LinkedIn</span>
                {/if}
            </button>
        </form>
    </div>

    <p class="mt-6 text-center text-sm text-slate-500">
        Don't have an account?
        <a href="/register" class="text-brand-blue hover:text-brand-blue/80 font-semibold transition-colors"
            >Sign up for free</a
        >
    </p>
</AuthCard>

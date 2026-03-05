<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { enhance } from "$app/forms";
    import AuthCard from "../../components/AuthCard.svelte";
    import { Eye, EyeOff } from "lucide-svelte";

    let email = "";
    let password = "";
    let showPassword = false;
    let isSubmitting = false;
    let isSubmittingSocial = null;

    // Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = { email: "", password: "" };

    $: if (email && !emailPattern.test(email)) {
        errors.email = "Please enter a valid email address";
    } else {
        errors.email = "";
    }

    $: if (password && password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    } else {
        errors.password = "";
    }

    $: isFormValid = emailPattern.test(email) && password.length >= 6;

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
        <div class="space-y-1">
            <div
                class="relative group rounded-xl border {errors.email ? 'border-red-500/60' : 'border-slate-800'} bg-slate-900/50 focus-within:border-brand-blue/50 focus-within:ring-1 focus-within:ring-brand-blue/20 transition-all"
            >
                <label
                    for="email"
                    class="absolute left-4 top-2 text-[10px] font-bold uppercase tracking-wider {errors.email ? 'text-red-400' : 'text-brand-blue'} opacity-70"
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
                    class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 {errors.email ? 'text-red-400' : 'text-slate-600 group-focus-within:text-brand-blue'} transition-colors"
                    >mail</span
                >
            </div>
            {#if errors.email}
                <p class="text-xs text-red-400 px-1">{errors.email}</p>
            {/if}
        </div>

        <!-- Password Input -->
        <div class="space-y-1">
            <div
                class="relative group rounded-xl border {errors.password ? 'border-red-500/60' : 'border-slate-800'} bg-slate-900/50 focus-within:border-brand-blue/50 focus-within:ring-1 focus-within:ring-brand-blue/20 transition-all"
            >
                <label
                    for="password"
                    class="absolute left-4 top-2 text-[10px] font-bold uppercase tracking-wider {errors.password ? 'text-red-400' : 'text-brand-blue'} opacity-70"
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
            {#if errors.password}
                <p class="text-xs text-red-400 px-1">{errors.password}</p>
            {:else}
                <div class="flex justify-end px-1">
                    <button
                        type="button"
                        class="text-xs font-medium text-brand-blue/80 hover:text-brand-blue transition-colors underline decoration-brand-blue/30 underline-offset-4"
                        >Forgot password?</button
                    >
                </div>
            {/if}
        </div>

        <!-- Login Button -->
        <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
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
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.08 3.293 9.387 7.863 10.91.575.105.783-.25.783-.554 0-.273-.01-1.185-.015-2.147-3.199.695-3.873-1.355-3.873-1.355-.523-1.328-1.277-1.681-1.277-1.681-1.043-.715.08-.7.08-.7 1.154.08 1.761 1.185 1.761 1.185 1.025 1.758 2.691 1.25 3.346.956.104-.742.401-1.25.73-1.537-2.553-.29-5.239-1.277-5.239-5.684 0-1.256.448-2.282 1.182-3.088-.118-.291-.513-1.46.113-3.041 0 0 .966-.31 3.164 1.18a10.941 10.941 0 0 1 2.876-.387c.974.005 1.954.131 2.877.387 2.197-1.49 3.161-1.18 3.161-1.18.627 1.581.233 2.75.115 3.041.737.806 1.181 1.832 1.181 3.088 0 4.417-2.691 5.391-5.253 5.674.413.355.782 1.055.782 2.127 0 1.535-.014 2.774-.014 3.15 0 .307.204.665.788.552C20.211 21.383 23.5 17.078 23.5 12c0-6.352-5.148-11.5-11.5-11.5z"/>
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
                        class="w-5 h-5 transition-transform group-hover:scale-110"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0A66C2" />
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

<script>
    import { goto } from "$app/navigation";
    import AuthCard from "../../components/AuthCard.svelte";
    import { login as storeLogin } from "../../stores/auth";
    import { User, Eye, EyeOff } from "lucide-svelte";

    let name = "";
    let email = "";
    let password = "";
    let role = "student";
    let showPassword = false;
    let isSubmitting = false;

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[a-zA-Z\s]{3,}$/;
    
    // Detailed password checks
    const hasMinLength = (p) => p.length >= 8;
    const hasNumber = (p) => /[0-9]/.test(p);
    const hasSpecialChar = (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p);

    // Error states
    let errors = {
        name: "",
        email: "",
        password: []
    };

    // Reactive validation
    $: if (name && !namePattern.test(name)) {
        if (/[0-9]/.test(name)) errors.name = "Numbers not allowed in name";
        else if (name.length < 3) errors.name = "Enter at least 3 letters";
        else errors.name = "Invalid characters in name";
    } else {
        errors.name = "";
    }

    $: if (email && !emailPattern.test(email)) {
        errors.email = "Please enter a valid email address";
    } else {
        errors.email = "";
    }

    $: if (password) {
        let missing = [];
        if (!hasMinLength(password)) missing.push("8+ chars");
        if (!hasNumber(password)) missing.push("1 number");
        if (!hasSpecialChar(password)) missing.push("1 special char");
        errors.password = missing;
    } else {
        errors.password = [];
    }

    // Form validity
    $: isFormValid = namePattern.test(name) && 
                    emailPattern.test(email) && 
                    hasMinLength(password) && 
                    hasNumber(password) && 
                    hasSpecialChar(password) && 
                    role;

    import { enhance } from "$app/forms";
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        isSubmitting = true;

        // Mock Registration: Save to localStorage
        const mockUser = {
            name,
            email,
            role: role.charAt(0).toUpperCase() + role.slice(1)
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));

        setTimeout(() => {
            isSubmitting = false;
            goto('/playground');
        }, 800);
    };
</script>

<AuthCard title="Create an account" subtitle="Join the AI Sandbox to start learning.">
    <form onsubmit={handleSubmit} class="space-y-5">
        <input type="hidden" name="provider" value="credentials" />
        <input type="hidden" name="redirectTo" value="/playground" />
        <input type="hidden" name="role" value={role} />
        <!-- Role Selection -->
        <div class="grid grid-cols-2 gap-3 mb-4">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                onclick={() => (role = "student")}
                class="cursor-pointer border {role === 'student'
                    ? 'border-brand-blue bg-brand-blue/10'
                    : 'border-slate-800 bg-slate-900/50 hover:bg-slate-800'} rounded-xl p-3.5 flex flex-col items-center gap-2 transition-all group"
            >
                <User
                    class="w-6 h-6 {role === 'student' ? 'text-brand-blue' : 'text-slate-500'} group-hover:scale-110 transition-transform"
                />
                <span
                    class="text-xs font-bold uppercase tracking-wider {role === 'student'
                        ? 'text-brand-blue'
                        : 'text-slate-500'}">Student</span
                >
            </div>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                onclick={() => (role = "teacher")}
                class="cursor-pointer border {role === 'teacher'
                    ? 'border-brand-blue bg-brand-blue/10'
                    : 'border-slate-800 bg-slate-900/50 hover:bg-slate-800'} rounded-xl p-3.5 flex flex-col items-center gap-2 transition-all group"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-6 h-6 transition-transform group-hover:scale-110 {role === 'teacher' ? 'text-brand-blue' : 'text-slate-500'}"
                    ><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path
                        d="M6 12v5c3 3 9 3 12 0v-5"
                    /></svg
                >
                <span
                    class="text-xs font-bold uppercase tracking-wider {role === 'teacher'
                        ? 'text-brand-blue'
                        : 'text-slate-500'}">Educator</span
                >
            </div>
        </div>

        <!-- Full Name Input -->
        <div class="space-y-1">
            <div
                class="relative group rounded-xl border {errors.name ? 'border-red-500/50' : 'border-slate-800'} bg-slate-900/50 focus-within:border-brand-blue/50 focus-within:ring-1 focus-within:ring-brand-blue/20 transition-all"
            >
                <label
                    for="name"
                    class="absolute left-4 top-2 text-[10px] font-bold uppercase tracking-wider text-brand-blue opacity-70"
                    >Full Name</label
                >
                <input
                    name="name"
                    type="text"
                    id="name"
                    bind:value={name}
                    required
                    class="block w-full px-4 pt-7 pb-2 bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 text-sm"
                    placeholder="John Doe"
                />
                <span
                    class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-blue transition-colors"
                    >person</span
                >
            </div>
            {#if errors.name}
                <p class="text-[10px] text-red-400 font-bold uppercase tracking-tight ml-4">{errors.name}</p>
            {/if}
        </div>

        <!-- Email Input -->
        <div class="space-y-1">
            <div
                class="relative group rounded-xl border {errors.email ? 'border-red-500/50' : 'border-slate-800'} bg-slate-900/50 focus-within:border-brand-blue/50 focus-within:ring-1 focus-within:ring-brand-blue/20 transition-all"
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
            {#if errors.email}
                <p class="text-[10px] text-red-400 font-bold uppercase tracking-tight ml-4">{errors.email}</p>
            {/if}
        </div>

        <!-- Password Input -->
        <div class="space-y-1">
            <div
                class="relative group rounded-xl border {errors.password.length > 0 ? 'border-red-500/50' : 'border-slate-800'} bg-slate-900/50 focus-within:border-brand-blue/50 focus-within:ring-1 focus-within:ring-brand-blue/20 transition-all"
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
            {#if errors.password.length > 0}
                <p class="text-[10px] text-red-400 font-bold uppercase tracking-tight ml-4">
                    Missing: {errors.password.join(", ")}
                </p>
            {/if}
        </div>

        <!-- Create Button -->
        <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            class="w-full py-3.5 bg-brand-blue text-white font-bold rounded-xl shadow-glow hover:bg-brand-blue/90 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
            <span>{isSubmitting ? "Creating account..." : "Create Account"}</span>
        </button>

        <p class="mt-6 text-center text-sm text-slate-500">
            Already have an account?
            <a
                href="/login"
                class="text-brand-blue hover:text-brand-blue/80 font-semibold transition-colors"
                >Log in here</a
            >
        </p>
    </form>
</AuthCard>

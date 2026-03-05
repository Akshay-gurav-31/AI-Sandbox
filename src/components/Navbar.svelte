<script>
	import { onMount } from "svelte";
	import { gsap } from "gsap";
	import { BrainCircuit } from "lucide-svelte";
	import { user, logout } from "../stores/auth.js";

	let navElement;
	let isScrolled = false;

	onMount(() => {
		gsap.fromTo(
			navElement,
			{ y: -100, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: "power3.out" },
		);

		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

<nav
	bind:this={navElement}
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled
		? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4'
		: 'bg-transparent py-6'}"
>
	<div
		class="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between"
	>
		<!-- Logo -->
		<a href="/" class="flex items-center gap-3 group">
			<div
				class="bg-blue-600/20 p-2.5 rounded-xl group-hover:bg-blue-600/30 transition-colors border border-blue-500/20"
			>
				<BrainCircuit class="text-blue-500 w-6 h-6" />
			</div>
			<div class="flex flex-col">
				<span
					class="font-bold text-xl leading-tight tracking-tight text-white group-hover:text-red-100 transition-colors"
					>AI Sandbox</span
				>
				<span
					class="text-[10px] text-slate-400 font-semibold tracking-widest uppercase"
					>Learn AI Visually</span
				>
			</div>
		</a>

		<!-- Desktop Links -->
		<div class="hidden md:flex items-center gap-8">
			<a
				href="#features"
				class="text-sm font-medium text-slate-300 hover:text-white transition-colors"
				>Features</a
			>
			<a
				href="#how-it-works"
				class="text-sm font-medium text-slate-300 hover:text-white transition-colors"
				>How It Works</a
			>
			<a
				href="#teachers"
				class="text-sm font-medium text-slate-300 hover:text-white transition-colors"
				>For Teachers</a
			>
			<a
				href="#pricing"
				class="text-sm font-medium text-slate-300 hover:text-white transition-colors"
				>Pricing</a
			>
		</div>

		<!-- Auth CTAs -->
		<div class="flex items-center gap-5">
			{#if $user}
				<a
					href="/playground"
					class="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block"
					>Playground</a
				>
				<button
					onclick={logout}
					class="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
					>Logout</button
				>
				<div
					class="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400"
				>
					{$user.name.charAt(0).toUpperCase()}
				</div>
			{:else}
				<a
					href="/login"
					class="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block"
					>Login</a
				>
				<a
					href="/register"
					class="bg-white text-slate-950 hover:bg-slate-200 hover:scale-105 transition-all px-5 py-2.5 rounded-full text-sm font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)]"
				>
					Get Started
				</a>
			{/if}
		</div>
	</div>
</nav>

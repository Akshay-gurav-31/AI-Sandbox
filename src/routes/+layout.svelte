<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>AI Sandbox - Learn AI Visually</title>
</svelte:head>

<div class="app-container flex flex-col min-h-screen">
	{@render children()}
</div>

<script>
    import { onMount } from "svelte";
    import { initGSAP } from "$lib/animations";
    import Navbar from "../components/Navbar.svelte";
    import Hero from "../components/Hero.svelte";
    import ProblemSolution from "../components/ProblemSolution.svelte";
    import Features from "../components/Features.svelte";
    import Timeline from "../components/Timeline.svelte";
    import Teachers from "../components/Teachers.svelte";
    import Pricing from "../components/Pricing.svelte";
    import Footer from "../components/Footer.svelte";

    onMount(() => {
        initGSAP();
    });
</script>

<Navbar />

<main class="bg-black">
    <Hero />
    <ProblemSolution />
    <Features />
    <Timeline />
    <Teachers />
    <Pricing />
</main>

<Footer />

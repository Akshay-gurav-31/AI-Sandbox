<script>
    import { onMount } from "svelte";
    import { BrainCircuit, ArrowLeft } from "lucide-svelte";
    import { gsap } from "gsap";

    let { title, subtitle, children } = $props();
    let cardElement;

    onMount(() => {
        import("gsap").then(({ gsap }) => {
            gsap.fromTo(
                cardElement,
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.2)",
                },
            );
        });
    });
</script>

<div
    class="min-h-screen flex flex-col relative overflow-x-hidden bg-brand-dark text-slate-100 font-display"
>
    <!-- Background Elements -->
    <div class="fixed inset-0 neo-grid z-0"></div>
    <div
        class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px] z-0"
    ></div>
    <div
        class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px] z-0"
    ></div>

    <!-- Top Navigation -->
    <header
        class="relative z-20 flex items-center justify-between px-6 py-3 lg:px-12 border-b border-brand-blue/10 backdrop-blur-md bg-brand-dark/80"
    >
        <div class="flex items-center gap-4 sm:gap-6">
            <a href="/" class="flex items-center gap-2 text-slate-400 hover:text-white transition-all group">
                <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span class="text-[10px] font-bold uppercase tracking-widest hidden xs:inline">Back to Home</span>
            </a>
            
            <div class="h-4 w-[1px] bg-slate-800 hidden xs:block"></div>

            <div class="flex items-center gap-3">
                <div class="p-1.5 bg-brand-blue/20 rounded-lg border border-brand-blue/30">
                    <BrainCircuit class="w-5 h-5 text-brand-blue" />
                </div>
                <h2
                    class="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
                >
                    AI Sandbox
                </h2>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center p-4 relative z-10">
        <div bind:this={cardElement} class="w-full max-w-md">
            <div
                class="backdrop-blur-xl bg-slate-900/60 border border-slate-800/50 rounded-2xl p-6 py-7 shadow-2xl relative overflow-hidden"
            >
                <!-- Subtle Glow Overlay -->
                <div
                    class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-50"
                ></div>

                <div class="mb-6 text-center">
                    <h1 class="text-3xl font-black mb-1 tracking-tight text-white">
                        {title}
                    </h1>
                    <p class="text-slate-400 text-sm">{subtitle}</p>
                </div>

                {@render children()}
            </div>

            <!-- Footer Links -->
            <div
                class="mt-6 flex justify-center gap-6 text-[10px] uppercase tracking-widest text-slate-600 font-bold"
            >
                <a href="#!" class="hover:text-brand-blue transition-colors">Privacy Policy</a>
                <a href="#!" class="hover:text-brand-blue transition-colors">Terms of Service</a>
                <a href="#!" class="hover:text-brand-blue transition-colors">Contact Support</a>
            </div>
        </div>
    </main>

    <!-- Decorative Orbs -->
    <div
        class="fixed bottom-[10%] left-[5%] w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl mix-blend-screen opacity-30 pointer-events-none"
    ></div>
    <div
        class="fixed top-[20%] right-[10%] w-48 h-48 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen opacity-20 pointer-events-none"
    ></div>
</div>

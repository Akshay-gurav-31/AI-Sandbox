<script>
    import { onMount } from "svelte";
    import NeuralBackground from "$lib/components/NeuralBackground.svelte";
    import { Play, ArrowRight, Network, Lock } from "lucide-svelte";
    import { staggerReveal, mouseParallax } from "$lib/animations.js";

    let heroContainer;
    let mockupElement;

    onMount(() => {
        const elements = heroContainer.querySelectorAll(".hero-reveal");
        staggerReveal(elements, 0.2);

        import("gsap").then(({ gsap }) => {
            gsap.fromTo(
                mockupElement,
                { x: 100, opacity: 0, rotateY: 15 },
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: 0.6,
                },
            );
        });

        mouseParallax(mockupElement, heroContainer, 30);
    });
</script>

<section
    bind:this={heroContainer}
    class="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
>
    <!-- Background Effects -->
    <div class="absolute inset-0 z-0">
        <NeuralBackground />
        <div
            class="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
        ></div>
        <div
            class="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
        ></div>
        <div
            class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none"
        ></div>
    </div>

    <div
        class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center"
    >
        <!-- Left Content -->
        <div class="flex flex-col gap-8 max-w-2xl">
            <div
                class="hero-reveal inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold w-fit"
            >
                <span class="relative flex h-2 w-2">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                    ></span>
                    <span
                        class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"
                    ></span>
                </span>
                Platform v1.0 is Live
            </div>

            <h1
                class="hero-reveal text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            >
                Build Machine Learning Models <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                    >Visually.</span
                >
            </h1>

            <p
                class="hero-reveal text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl"
            >
                A node-based AI learning playground designed for students and
                educators. Drag, drop, train, and understand AI like never
                before.
            </p>

            <div class="hero-reveal flex flex-wrap items-center gap-4 pt-4">
                <a
                    href="/register"
                    class="group relative flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                    <span>Get Started Free</span>
                    <ArrowRight
                        class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    />
                </a>
                <button
                    class="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white bg-slate-900/50 hover:bg-slate-900 border border-slate-700 transition-all hover:border-slate-600"
                >
                    <div
                        class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 text-blue-400 group-hover:text-white transition-colors"
                    >
                        <Play class="w-4 h-4 ml-0.5 fill-current" />
                    </div>
                    <span>Watch Demo</span>
                </button>
            </div>
        </div>

        <!-- Right Content: Mockup -->
        <div
            bind:this={mockupElement}
            class="relative w-full aspect-[4/3] perspective-1000 pl-4 lg:pl-12"
        >
            <!-- Glass Panel Mockup -->
            <div
                class="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform-gpu flex flex-col"
            >
                <!-- Mockup Header -->
                <div
                    class="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-black/50"
                >
                    <div class="flex gap-2">
                        <div
                            class="w-3 h-3 rounded-full bg-slate-800 hover:bg-blue-500 transition-colors cursor-pointer"
                        ></div>
                        <div
                            class="w-3 h-3 rounded-full bg-slate-800 hover:bg-blue-500 transition-colors cursor-pointer"
                        ></div>
                        <div
                            class="w-3 h-3 rounded-full bg-slate-800 hover:bg-blue-500 transition-colors cursor-pointer"
                        ></div>
                    </div>
                    <div
                        class="mx-auto px-4 py-1.5 rounded-md bg-black/40 border border-white/5 text-[11px] text-slate-400 font-mono flex items-center gap-2"
                    >
                        <Lock class="w-3 h-3 text-blue-500" />
                        playground.aisandbox.dev
                    </div>
                </div>

                <!-- Mockup Body: Node Grid -->
                <div
                    class="flex-1 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"
                >
                    <!-- Nodes -->
                    <div
                        class="absolute top-10 left-10 bg-slate-900 border border-blue-500/30 p-3 rounded-lg shadow-lg w-36 flex flex-col gap-3"
                    >
                        <div
                            class="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5"
                        >
                            <Network class="w-3.5 h-3.5" /> Dataset
                        </div>
                        <div
                            class="h-2 w-full bg-slate-950 rounded-full overflow-hidden"
                        >
                            <div
                                class="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-full"
                            ></div>
                        </div>
                    </div>

                    <!-- Connection Path -->
                    <svg
                        class="absolute top-16 left-[11.5rem] w-24 h-24 overflow-visible"
                        style="z-index: 0"
                    >
                        <path
                            d="M 0 0 C 40 0, 40 60, 96 60"
                            fill="none"
                            stroke="rgba(59, 130, 246, 0.4)"
                            stroke-width="3"
                            stroke-dasharray="6"
                            class="animate-[dash_3s_linear_infinite]"
                        />
                    </svg>

                    <div
                        class="absolute top-24 left-[17.5rem] bg-slate-900 border border-blue-500/30 p-3 rounded-lg shadow-lg w-40 flex flex-col gap-3 z-10"
                    >
                        <div
                            class="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5"
                        >
                            <Network class="w-3.5 h-3.5" /> Neural Net
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-[10px] text-slate-400">Epochs</span
                            >
                            <span class="text-[10px] font-mono text-blue-300"
                                >100/100</span
                            >
                        </div>
                        <div
                            class="h-2 w-full bg-slate-950 rounded-full overflow-hidden relative"
                        >
                            <div
                                class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[75%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Floating Elements -->
            <div
                class="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-lg border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-4 transform -rotate-3 hover:rotate-0 transition-transform"
            >
                <div
                    class="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center"
                >
                    <span class="text-blue-400 font-bold text-lg">98%</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-bold text-white"
                        >Target Accuracy</span
                    >
                    <span class="text-xs text-slate-400"
                        >Model successfully verified</span
                    >
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* Custom GSAP dashed line animation */
    @keyframes dash {
        to {
            stroke-dashoffset: -100;
        }
    }
</style>

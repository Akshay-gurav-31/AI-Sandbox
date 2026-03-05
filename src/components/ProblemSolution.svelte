<script>
    import { onMount } from "svelte";
    import { XCircle, CheckCircle } from "lucide-svelte";
    import { scrollReveal } from "$lib/animations.js";

    let sectionElement;

    onMount(() => {
        const elements = sectionElement.querySelectorAll(".reveal-ps");
        elements.forEach((el) => scrollReveal(el));
    });
</script>

<section
    bind:this={sectionElement}
    id="problem-solution"
    class="py-24 relative"
>
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-16 items-center">
            <!-- Problem -->
            <div
                class="reveal-ps space-y-8 bg-blue-500/5 border border-blue-500/10 p-8 rounded-3xl relative overflow-hidden"
            >
                <div
                    class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full"
                ></div>
                <div
                    class="inline-flex items-center gap-2 text-blue-400 font-semibold mb-2"
                >
                    <XCircle class="w-5 h-5" /> The Problem
                </div>
                <h2
                    class="text-3xl lg:text-4xl font-bold text-white leading-tight"
                >
                    AI learning is too theoretical.
                </h2>
                <ul class="space-y-4">
                    <li class="flex items-start gap-3 text-slate-400">
                        <div
                            class="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                        ></div>
                        <span
                            >Tools are too complex for beginners and students.</span
                        >
                    </li>
                    <li class="flex items-start gap-3 text-slate-400">
                        <div
                            class="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                        ></div>
                        <span
                            >No real-time visual feedback during training.</span
                        >
                    </li>
                    <li class="flex items-start gap-3 text-slate-400">
                        <div
                            class="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                        ></div>
                        <span
                            >Heavy math focus before understanding the concepts
                            visually.</span
                        >
                    </li>
                </ul>
            </div>

            <!-- Solution -->
            <div class="reveal-ps space-y-8 relative">
                <!-- Decorative glow -->
                <div
                    class="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-3xl -z-10"
                ></div>

                <div
                    class="bg-slate-950/80 backdrop-blur-sm border border-blue-500/20 p-8 lg:p-10 rounded-3xl shadow-xl"
                >
                    <div
                        class="inline-flex items-center gap-2 text-blue-400 font-semibold mb-6"
                    >
                        <CheckCircle class="w-5 h-5" /> The Solution
                    </div>
                    <h2
                        class="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight"
                    >
                        Learn visually, build practically.
                    </h2>
                    <ul class="space-y-6">
                        <li class="flex items-start gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold border border-blue-500/30"
                            >
                                1
                            </div>
                            <div>
                                <h4 class="text-white font-semibold">
                                    Drag & Drop Nodes
                                </h4>
                                <p
                                    class="text-sm text-slate-400 mt-1 leading-relaxed"
                                >
                                    Build architectures intuitively without
                                    writing complex code first.
                                </p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold border border-blue-500/30"
                            >
                                2
                            </div>
                            <div>
                                <h4 class="text-white font-semibold">
                                    Real-time Training
                                </h4>
                                <p
                                    class="text-sm text-slate-400 mt-1 leading-relaxed"
                                >
                                    Watch the model learn step by step with live
                                    feedback.
                                </p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <div
                                class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold border border-blue-500/30"
                            >
                                3
                            </div>
                            <div>
                                <h4 class="text-white font-semibold">
                                    Visual Metrics
                                </h4>
                                <p
                                    class="text-sm text-slate-400 mt-1 leading-relaxed"
                                >
                                    Interactive sandbox with clear charts that
                                    demystify performance.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

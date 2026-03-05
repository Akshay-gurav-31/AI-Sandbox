<script>
    import { Users, LayoutDashboard, Send, BookOpen } from "lucide-svelte";
    import { onMount } from "svelte";
    import { scrollReveal } from "$lib/animations.js";

    let sectionElement;

    onMount(() => {
        scrollReveal(sectionElement.querySelector(".reveal-content"));
        scrollReveal(sectionElement.querySelector(".reveal-image"), 100);
    });
</script>

<section
    bind:this={sectionElement}
    id="teachers"
    class="py-24 relative bg-slate-950/40 border-y border-white/5"
>
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div class="reveal-content space-y-8">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold"
                >
                    <BookOpen class="w-4 h-4" /> For Educators
                </div>

                <h2
                    class="text-3xl lg:text-5xl font-bold text-white leading-[1.1]"
                >
                    Transform your <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500"
                        >classroom</span
                    >.
                </h2>

                <p class="text-lg text-slate-400 leading-relaxed">
                    Stop debugging syntax errors and start teaching concepts.
                    Our live demo mode keeps your students synced with your
                    movements.
                </p>

                <ul class="space-y-6">
                    <li class="flex items-start gap-4">
                        <div
                            class="mt-1 w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-blue-500 flex-shrink-0 shadow-lg"
                        >
                            <Send class="w-5 h-5" />
                        </div>
                        <div>
                            <h4 class="text-white font-bold text-lg">
                                Live Demo Sync
                            </h4>
                            <p
                                class="text-slate-400 text-sm leading-relaxed mt-1"
                            >
                                Your playground actions are mirrored to all
                                student screens in real-time.
                            </p>
                        </div>
                    </li>
                    <li class="flex items-start gap-4">
                        <div
                            class="mt-1 w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-blue-400 flex-shrink-0 shadow-lg"
                        >
                            <LayoutDashboard class="w-5 h-5" />
                        </div>
                        <div>
                            <h4 class="text-white font-bold text-lg">
                                Assignment Sandbox
                            </h4>
                            <p
                                class="text-slate-400 text-sm leading-relaxed mt-1"
                            >
                                Distribute starting nodes and datasets, and let
                                students complete the pipeline.
                            </p>
                        </div>
                    </li>
                    <li class="flex items-start gap-4">
                        <div
                            class="mt-1 w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-blue-300 flex-shrink-0 shadow-lg"
                        >
                            <Users class="w-5 h-5" />
                        </div>
                        <div>
                            <h4 class="text-white font-bold text-lg">
                                Progress Monitoring
                            </h4>
                            <p
                                class="text-slate-400 text-sm leading-relaxed mt-1"
                            >
                                View which students have successfully trained a
                                model above the accuracy threshold.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="reveal-image relative">
                <div
                    class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-blue-500/20 blur-[100px] -z-10 rounded-full"
                ></div>
                <div
                    class="bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 lg:p-8 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500"
                >
                    <div
                        class="flex items-center justify-between mb-6 pb-6 border-b border-white/5"
                    >
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400"
                            >
                                <Users class="w-6 h-6" />
                            </div>
                            <div>
                                <h3 class="text-white font-bold">
                                    Classroom: Intro to ML
                                </h3>
                                <div
                                    class="text-xs text-blue-400 flex items-center gap-1.5 mt-1 border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 rounded-full w-fit"
                                >
                                    <span
                                        class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"
                                    ></span> 24 Students Active
                                </div>
                            </div>
                        </div>
                        <button
                            class="bg-blue-500 hover:bg-blue-400 hover:scale-105 transition-all text-slate-950 px-4 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-500/25"
                            >Sync Screen</button
                        >
                    </div>

                    <div class="space-y-4">
                        {#each [1, 2, 3] as _, i}
                            <div
                                class="bg-slate-900/50 rounded-xl p-4 flex items-center justify-between border border-white/5 hover:bg-slate-900 transition-colors cursor-default"
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-8 h-8 rounded-full bg-slate-800 font-bold text-xs flex items-center justify-center text-white"
                                    >
                                        S{i + 1}
                                    </div>
                                    <span
                                        class="text-slate-200 text-sm font-medium"
                                        >Student {i + 1}</span
                                    >
                                </div>
                                <div class="flex items-center gap-4">
                                    <div
                                        class="text-xs text-slate-400 font-medium"
                                    >
                                        Accuracy: <span
                                            class="text-blue-400 font-mono ml-1"
                                            >{90 + i * 2}%</span
                                        >
                                    </div>
                                    <div
                                        class="w-20 lg:w-32 h-2 bg-slate-950 rounded-full overflow-hidden shadow-inner"
                                    >
                                        <div
                                            class="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                                            style="width: {90 + i * 2}%"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

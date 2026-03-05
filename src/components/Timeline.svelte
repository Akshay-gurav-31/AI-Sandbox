<script>
    import { onMount } from "svelte";
    import {
        Database,
        Scissors,
        BrainCircuit,
        Play,
        BarChart,
    } from "lucide-svelte";

    let timelineElement;

    const steps = [
        {
            id: 1,
            title: "Add Data",
            desc: "Import or generate your dataset.",
            icon: Database,
            color: "text-blue-400",
            bg: "bg-blue-500/20",
            line: "bg-blue-500",
        },
        {
            id: 2,
            title: "Label & Split",
            desc: "Define targets and train/test splits.",
            icon: Scissors,
            color: "text-blue-500",
            bg: "bg-purple-500/20",
            line: "bg-purple-500",
        },
        {
            id: 3,
            title: "Algorithm",
            desc: "Select your ML architecture.",
            icon: BrainCircuit,
            color: "text-blue-400",
            bg: "bg-blue-500/20",
            line: "bg-blue-500",
        },
        {
            id: 4,
            title: "Train",
            desc: "Watch the model learn instantly.",
            icon: Play,
            color: "text-blue-400",
            bg: "bg-blue-500/20",
            line: "bg-blue-500",
        },
        {
            id: 5,
            title: "Analyze",
            desc: "View metrics and confusion matrix.",
            icon: BarChart,
            color: "text-blue-400",
            bg: "bg-blue-500/20",
            line: "bg-blue-500",
        },
    ];

    onMount(() => {
        const items = timelineElement.querySelectorAll(".timeline-item");
        import("gsap/dist/ScrollTrigger").then(({ ScrollTrigger }) => {
            import("gsap").then(({ gsap }) => {
                gsap.fromTo(
                    items,
                    { y: 50, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: timelineElement,
                            start: "top 80%",
                        },
                    },
                );
            });
        });
    });
</script>

<section bind:this={timelineElement} class="py-24 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
                From zero to model in <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500"
                    >5 steps</span
                >
            </h2>
            <p class="text-slate-400 text-lg">
                Our straightforward pipeline removes the complexity of writing
                boilerplate code.
            </p>
        </div>

        <div class="relative max-w-5xl mx-auto mt-20">
            <!-- Connecting Line (Desktop) -->
            <div
                class="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-1 bg-slate-900 rounded-full z-0"
            >
                <div
                    class="h-full bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 w-[80%] rounded-full opacity-50 blur-sm"
                ></div>
            </div>

            <!-- Connecting Line (Mobile) -->
            <div
                class="md:hidden absolute top-0 bottom-0 left-[2.5rem] w-1 bg-slate-900 rounded-full z-0"
            ></div>

            <div class="grid md:grid-cols-5 gap-12 md:gap-4 relative z-10">
                {#each steps as step, i}
                    <div
                        class="timeline-item flex md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-4 relative group"
                    >
                        <div
                            class="absolute md:top-auto md:-bottom-8 top-10 -left-4 md:left-1/2 md:-translate-x-1/2 text-[80px] font-black text-white/[0.03] -z-10 select-none group-hover:text-white/[0.05] transition-colors"
                        >
                            {step.id}
                        </div>

                        <div
                            class="w-20 h-20 rounded-2xl {step.bg} border border-white/10 flex items-center justify-center {step.color} shadow-xl flex-shrink-0 backdrop-blur-md shadow-black/40 group-hover:scale-110 transition-transform duration-300"
                        >
                            <svelte:component
                                this={step.icon}
                                class="w-8 h-8"
                            />
                        </div>
                        <div class="flex-1 mt-2 md:mt-4">
                            <div
                                class="text-[10px] font-bold text-slate-500 mb-2 tracking-widest uppercase"
                            >
                                Phase 0{step.id}
                            </div>
                            <h4 class="text-white font-bold text-lg mb-2">
                                {step.title}
                            </h4>
                            <p class="text-slate-400 text-sm leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

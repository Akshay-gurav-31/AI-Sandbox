<script>
    import { onMount } from "svelte";
    import {
        Network,
        BarChart3,
        BrainCircuit,
        Users,
        SplitSquareHorizontal,
        PieChart,
    } from "lucide-svelte";

    let sectionElement;

    const features = [
        {
            title: "Node-Based Architecture",
            description:
                "Connect datasets, layers, and optimizers using a simple drag-and-drop interface.",
            icon: Network,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            title: "Real-time Metrics",
            description:
                "Visualize loss and accuracy dynamically as your model trains in the browser.",
            icon: BarChart3,
            color: "text-blue-500",
            bg: "bg-purple-500/10",
        },
        {
            title: "Multiple ML Algorithms",
            description:
                "From simple linear regression to complex deep neural networks.",
            icon: BrainCircuit,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            title: "Live Teacher Demo",
            description:
                "Educators can sync their workspace to all student screens in real-time.",
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            title: "Train/Test Split",
            description:
                "Visually slice datasets to understand evaluation fundamentals easily.",
            icon: SplitSquareHorizontal,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            title: "Confusion Matrix Insights",
            description:
                "Auto-generated detailed reports to analyze where your model struggles.",
            icon: PieChart,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
    ];

    onMount(() => {
        const cards = sectionElement.querySelectorAll(".feature-card");
        import("gsap/dist/ScrollTrigger").then(({ ScrollTrigger }) => {
            import("gsap").then(({ gsap }) => {
                gsap.fromTo(
                    cards,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionElement,
                            start: "top 85%",
                        },
                    },
                );
            });
        });
    });
</script>

<section
    bind:this={sectionElement}
    id="features"
    class="py-24 relative overflow-hidden text-center bg-slate-950/30"
>
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
                Everything you need to <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                    >master AI.</span
                >
            </h2>
            <p class="text-slate-400 text-lg">
                Our playground comes packed with tools to make learning
                interactive, visual, and highly effective.
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each features as feature}
                <div
                    class="feature-card group relative bg-slate-950 shadow-xl shadow-black/20 border border-white/5 p-8 rounded-2xl hover:bg-slate-900 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden text-left"
                >
                    <!-- Hover gradient border effect -->
                    <div
                        class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"
                    ></div>
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>

                    <div
                        class="w-12 h-12 rounded-xl {feature.bg} {feature.color} border border-white/5 flex items-center justify-center mb-6 relative z-10"
                    >
                        <svelte:component this={feature.icon} class="w-6 h-6" />
                    </div>
                    <h3 class="text-xl font-bold text-white mb-3 relative z-10">
                        {feature.title}
                    </h3>
                    <p
                        class="text-slate-400 text-sm leading-relaxed relative z-10"
                    >
                        {feature.description}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</section>

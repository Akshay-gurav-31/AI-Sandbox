<script>
    import { Check } from "lucide-svelte";
    import { onMount } from "svelte";

    let sectionElement;

    onMount(() => {
        const cards = sectionElement.querySelectorAll(".pricing-card");
        import("gsap/dist/ScrollTrigger").then(({ ScrollTrigger }) => {
            import("gsap").then(({ gsap }) => {
                gsap.fromTo(
                    cards,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionElement,
                            start: "top 80%",
                        },
                    },
                );
            });
        });
    });
</script>

<section
    bind:this={sectionElement}
    id="pricing"
    class="py-24 relative overflow-hidden"
>
    <!-- Background Elements -->
    <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10"
    ></div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
                Simple pricing for <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                    >everyone</span
                >
            </h2>
            <p class="text-slate-400 text-lg">
                Start for free, upgrade when you need classroom capabilities.
            </p>
        </div>

        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <!-- Free Tier -->
            <div
                class="pricing-card bg-slate-950 border border-white/10 rounded-3xl p-8 lg:p-10 hover:border-slate-600 transition-colors shadow-2xl relative z-10"
            >
                <h3 class="text-xl font-bold text-white mb-2">
                    Student & Hobbyist
                </h3>
                <div class="flex items-baseline gap-2 mb-6">
                    <span class="text-5xl font-bold text-white">$0</span>
                    <span class="text-slate-400">/forever</span>
                </div>
                <p class="text-slate-400 text-sm mb-8">
                    Perfect for learning the fundamentals of machine learning
                    visually.
                </p>

                <ul class="space-y-4 mb-10">
                    {#each ["Basic Neural Networks", "Limited datasets (CIFAR, MNIST)", "Community forum access", "Browser-based training", "Export metrics"] as feature}
                        <li class="flex items-start gap-3">
                            <Check
                                class="w-5 h-5 text-blue-400 flex-shrink-0"
                            />
                            <span class="text-slate-300 text-sm">{feature}</span
                            >
                        </li>
                    {/each}
                </ul>

                <a
                    href="/register"
                    class="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-colors border border-white/5"
                    >Get Started Free</a
                >
            </div>

            <!-- Pro Tier -->
            <div
                class="pricing-card relative bg-slate-950 border border-purple-500/40 rounded-3xl p-8 lg:p-10 shadow-2xl transform md:-translate-y-4 z-20"
            >
                <div
                    class="absolute inset-x-0 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                ></div>
                <div
                    class="absolute inset-x-0 -bottom-[1px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                ></div>
                <div
                    class="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-3xl pointer-events-none"
                ></div>

                <div class="absolute top-0 right-8 transform -translate-y-1/2">
                    <span
                        class="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] tracking-wider uppercase font-bold px-4 py-1.5 rounded-full shadow-lg border border-blue-600/30"
                        >Most Popular</span
                    >
                </div>

                <h3 class="text-xl font-bold text-white mb-2 relative z-10">
                    Educator Pro
                </h3>
                <div class="flex items-baseline gap-2 mb-6 relative z-10">
                    <span class="text-5xl font-bold text-white">$12</span>
                    <span class="text-slate-400">/mo per seat</span>
                </div>
                <p class="text-blue-300 text-sm mb-8 relative z-10">
                    Everything you need to teach AI in a modern classroom.
                </p>

                <ul class="space-y-4 mb-10 relative z-10">
                    {#each ["Everything in Free", "Custom Dataset Uploads", "Advanced Algorithms (RNN, CNN)", "Classroom Live Demo Mode", "Student Progress Dashboard", "Save & Share Projects"] as feature}
                        <li class="flex items-start gap-3">
                            <Check
                                class="w-5 h-5 text-blue-500 flex-shrink-0"
                            />
                            <span class="text-slate-300 text-sm">{feature}</span
                            >
                        </li>
                    {/each}
                </ul>

                <a
                    href="/register"
                    class="relative z-10 block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-blue-600/30"
                    >Upgrade to Pro</a
                >
            </div>
        </div>
    </div>
</section>

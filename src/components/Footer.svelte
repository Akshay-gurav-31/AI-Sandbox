<script>
    import { BrainCircuit, Twitter, Github, Linkedin } from "lucide-svelte";
</script>

<footer class="bg-black border-t border-white/5 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div class="col-span-2 lg:col-span-2">
                <a href="/" class="flex items-center gap-3 mb-6">
                    <div
                        class="bg-blue-600/20 p-2 rounded-xl border border-blue-500/20"
                    >
                        <BrainCircuit class="text-blue-500 w-5 h-5" />
                    </div>
                    <span class="font-bold text-xl text-white tracking-tight"
                        >AI Sandbox</span
                    >
                </a>
                <p class="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                    The easiest way to learn machine learning intuitively.
                    Connect nodes, train models, and visualize results in
                    real-time right from your browser.
                </p>
                <div class="flex items-center gap-4">
                    <a
                        href="#"
                        class="w-10 h-10 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-400/30 transition-all hover:scale-110"
                        ><Twitter class="w-4 h-4" /></a
                    >
                    <a
                        href="#"
                        class="w-10 h-10 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all hover:scale-110"
                        ><Github class="w-4 h-4" /></a
                    >
                    <a
                        href="#"
                        class="w-10 h-10 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/30 transition-all hover:scale-110"
                        ><Linkedin class="w-4 h-4" /></a
                    >
                </div>
            </div>

            <div>
                <h4 class="text-white font-bold mb-6">Product</h4>
                <ul class="space-y-4">
                    <li>
                        <a
                            href="#features"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >Features</a
                        >
                    </li>
                    <li>
                        <a
                            href="#how-it-works"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >How it works</a
                        >
                    </li>
                    <li>
                        <a
                            href="#teachers"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >For Educators</a
                        >
                    </li>
                    <li>
                        <a
                            href="#pricing"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >Pricing</a
                        >
                    </li>
                    <li>
                        <a
                            href="/playground"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >Sandbox Preview</a
                        >
                    </li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-bold mb-6">Resources</h4>
                <ul class="space-y-4">
                    <li>
                        <a
                            href="#"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >Documentation</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >Tutorials</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >Community Forum</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >Blog</a
                        >
                    </li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-bold mb-6">Company</h4>
                <ul class="space-y-4">
                    <li>
                        <a
                            href="#"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >About</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >Careers</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >Privacy Policy</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="text-slate-400 text-sm hover:text-white transition-colors"
                            >Terms of Service</a
                        >
                    </li>
                </ul>
            </div>
        </div>

        <div
            class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
            <p class="text-slate-500 text-sm">
                © {new Date().getFullYear()} AI Sandbox. All rights reserved.
            </p>
            <div
                class="flex items-center gap-2 bg-slate-950 border border-white/5 pl-3 pr-4 py-1.5 rounded-full"
            >
                <span
                    class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                ></span>
                <span class="text-xs font-semibold text-slate-400"
                    >All systems operational</span
                >
            </div>
        </div>
    </div>
</footer>

<script>
    // @ts-nocheck
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";

    let container;
    let requestID;

    // Scene objects
    let scene, camera, renderer;
    let particles, linesMesh;
    let particlePositions, particleVelocities;

    // Mouse tracking
    let targetMouse = new THREE.Vector2(9999, 9999);
    let isHovering = false;

    // Config
    const maxParticles = 120;
    const connectionDistance = 20;
    const mouseRadius = 30;
    const baseColor = new THREE.Color(0x3b82f6); // blue-500
    const accentColor = new THREE.Color(0x8b5cf6); // purple-500

    function init() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        camera.position.z = 50;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (container) {
            container.appendChild(renderer.domElement);
        }

        // Determine particle count based on screen width
        let particleCount = maxParticles;
        if (window.innerWidth < 768) particleCount = 35;
        else if (window.innerWidth < 1024) particleCount = 60;

        // Geometry for particles
        const geometry = new THREE.BufferGeometry();
        particlePositions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        particleVelocities = [];

        for (let i = 0; i < particleCount; i++) {
            // Random positions in a volume
            particlePositions[i * 3] = (Math.random() - 0.5) * 120;
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

            // Velocity for smooth idle movement
            particleVelocities.push({
                baseX: particlePositions[i * 3],
                baseY: particlePositions[i * 3 + 1],
                baseZ: particlePositions[i * 3 + 2],
            });

            // Randomize colors slightly (mostly base red, some accents)
            const color = Math.random() > 0.85 ? accentColor : baseColor;
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(particlePositions, 3),
        );
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        // Material for particles
        const material = new THREE.PointsMaterial({
            size: 0.25,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Lines Geometry
        const lineGeometry = new THREE.BufferGeometry();
        const maxLines = particleCount * 6; // safe limit
        const linePositions = new Float32Array(maxLines * 6);
        const lineColors = new Float32Array(maxLines * 6);

        lineGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(linePositions, 3),
        );
        lineGeometry.setAttribute(
            "color",
            new THREE.BufferAttribute(lineColors, 3),
        );

        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 1.0,
            blending: THREE.AdditiveBlending,
        });

        linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(linesMesh);

        // Events
        window.addEventListener("resize", onWindowResize);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        animate();
    }

    function onWindowResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onMouseMove(event) {
        if (!camera) return;
        isHovering = true;

        // Convert mouse to normalized device coordinates (-1 to +1)
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Map mouse NDC to roughly the z=0 plane in world coordinates
        const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        targetMouse.x = pos.x;
        targetMouse.y = pos.y;
    }

    function onMouseLeave() {
        isHovering = false;
        if (targetMouse) targetMouse.set(9999, 9999);
    }

    function animate() {
        requestID = requestAnimationFrame(animate);

        const time = Date.now() * 0.0005;

        // Subtle scene rotation
        if (scene) {
            scene.rotation.y = Math.sin(time * 0.2) * 0.1;
            scene.rotation.x = Math.cos(time * 0.2) * 0.05;
        }

        const positions = particles.geometry.attributes.position.array;
        const particleCount = positions.length / 3;

        // Animate particles
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Base floating movement
            const data = particleVelocities[i];

            // Add slight sine wave motion
            let targetX = data.baseX + Math.sin(time + i) * 2;
            let targetY = data.baseY + Math.cos(time + i) * 2;
            let targetZ = data.baseZ + Math.sin(time * 1.5 + i) * 2;

            // Mouse interaction (Magnetic pull)
            if (isHovering && targetMouse.x !== 9999) {
                const dx = targetMouse.x - positions[i3];
                const dy = targetMouse.y - positions[i3 + 1];
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouseRadius) {
                    const force = (mouseRadius - dist) / mouseRadius;
                    targetX += dx * force * 0.2; // slight pull
                    targetY += dy * force * 0.2;
                }
            }

            // Smooth interpolation
            positions[i3] += (targetX - positions[i3]) * 0.05;
            positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.05;
            positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.05;
        }

        particles.geometry.attributes.position.needsUpdate = true;

        // Update lines
        const linePositions = linesMesh.geometry.attributes.position.array;
        const lineColors = linesMesh.geometry.attributes.color.array;

        let vertexIndex = 0;
        let colorIndex = 0;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            for (let j = i + 1; j < particleCount; j++) {
                const j3 = j * 3;

                const dx = positions[i3] - positions[j3];
                const dy = positions[i3 + 1] - positions[j3 + 1];
                const dz = positions[i3 + 2] - positions[j3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < connectionDistance * connectionDistance) {
                    const dist = Math.sqrt(distSq);
                    let alpha = 1.0 - dist / connectionDistance;

                    // Glow lines near cursor
                    if (isHovering && targetMouse.x !== 9999) {
                        const mdx = targetMouse.x - positions[i3];
                        const mdy = targetMouse.y - positions[i3 + 1];
                        if (mdx * mdx + mdy * mdy < mouseRadius * mouseRadius) {
                            alpha = Math.min(alpha * 2, 1.0);
                        }
                    }

                    // Max glow capped
                    alpha *= 0.4; // Base opacity multiplier for lines

                    // Add line if buffer has space
                    if (vertexIndex < linePositions.length - 6) {
                        linePositions[vertexIndex++] = positions[i3];
                        linePositions[vertexIndex++] = positions[i3 + 1];
                        linePositions[vertexIndex++] = positions[i3 + 2];

                        linePositions[vertexIndex++] = positions[j3];
                        linePositions[vertexIndex++] = positions[j3 + 1];
                        linePositions[vertexIndex++] = positions[j3 + 2];

                        // Set color intensity based on alpha
                        const r = baseColor.r * alpha;
                        const g = baseColor.g * alpha;
                        const b = baseColor.b * alpha;

                        lineColors[colorIndex++] = r;
                        lineColors[colorIndex++] = g;
                        lineColors[colorIndex++] = b;

                        lineColors[colorIndex++] = r;
                        lineColors[colorIndex++] = g;
                        lineColors[colorIndex++] = b;
                    }
                }
            }
        }

        // Hide remaining lines
        const remainingVertices = linePositions.length - vertexIndex;
        if (remainingVertices > 0) {
            linePositions.fill(0, vertexIndex);
            lineColors.fill(0, colorIndex);
        }

        linesMesh.geometry.setDrawRange(0, vertexIndex / 3);
        linesMesh.geometry.attributes.position.needsUpdate = true;
        linesMesh.geometry.attributes.color.needsUpdate = true;

        renderer.render(scene, camera);
    }

    onMount(() => {
        if (typeof window !== "undefined") {
            init();
        }
    });

    onDestroy(() => {
        if (typeof window !== "undefined") {
            window.removeEventListener("resize", onWindowResize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);

            if (requestID) cancelAnimationFrame(requestID);

            if (particles) {
                particles.geometry.dispose();
                particles.material.dispose();
            }
            if (linesMesh) {
                linesMesh.geometry.dispose();
                linesMesh.material.dispose();
            }
            if (renderer) {
                renderer.dispose();
                if (
                    container &&
                    renderer.domElement &&
                    container.contains(renderer.domElement)
                ) {
                    container.removeChild(renderer.domElement);
                }
            }
            scene = null;
            camera = null;
        }
    });
</script>

<div
    bind:this={container}
    class="absolute inset-0 -z-10 pointer-events-none"
></div>

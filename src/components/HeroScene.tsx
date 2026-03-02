import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        scene.background = null; // transparent

        // Perspective camera pointing slightly upwards to emphasize "ascending"
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, -5, 15);
        camera.lookAt(0, 5, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        // --- Concept: The Ascending Pathway (Level Up) ---
        // A spiraling, ascending structure of energy pillars 
        // representing progress, climbing, and structure emerging from chaos.

        const pillarCount = 40;
        const pillars: THREE.Mesh[] = [];

        // Core material: glowing orange glass
        const pillarMat = new THREE.MeshPhysicalMaterial({
            color: 0xf97316,
            emissive: 0xf97316,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.8,
            roughness: 0.1,
            metalness: 0.5,
            clearcoat: 1.0,
        });

        // Secondary material: dark structural glass
        const darkMat = new THREE.MeshPhysicalMaterial({
            color: 0x1e293b,
            emissive: 0x0f172a,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.6,
            roughness: 0.3,
            metalness: 0.8,
        });

        for (let i = 0; i < pillarCount; i++) {
            // Height increases as they go up the spiral
            const h = 0.5 + (i * 0.15);
            const geo = new THREE.BoxGeometry(0.8, h, 0.8);

            // Every 4th pillar is a bright "milestone", the rest are structural
            const isMilestone = i % 4 === 0;
            const mesh = new THREE.Mesh(geo, isMilestone ? pillarMat : darkMat);

            // Arrange in an ascending spiral
            const angle = i * 0.4;
            const radius = 4 + Math.sin(i * 0.1) * 1.5;

            mesh.position.set(
                Math.cos(angle) * radius,
                (i - pillarCount / 2) * 0.4, // Ascend upwards
                Math.sin(angle) * radius
            );

            // Point pillars towards the center slightly
            mesh.lookAt(0, mesh.position.y, 0);

            group.add(mesh);
            pillars.push(mesh);
        }

        // --- Floating Energy Particles (Upward Draft) ---
        const particleCount = 150;
        const particleGeo = new THREE.BufferGeometry();
        const particlePos = new Float32Array(particleCount * 3);
        const particleSpeeds = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 8;

            particlePos[i3] = Math.cos(angle) * radius;
            particlePos[i3 + 1] = (Math.random() - 0.5) * 20; // Spread vertically
            particlePos[i3 + 2] = Math.sin(angle) * radius;

            particleSpeeds[i] = Math.random() * 0.05 + 0.02; // Upward speed
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

        // Create a glowing dot texture procedurally
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d')!;
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(249, 115, 22, 1)');
        gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
        const texture = new THREE.CanvasTexture(canvas);

        const particleMat = new THREE.PointsMaterial({
            size: 0.4,
            map: texture,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particles = new THREE.Points(particleGeo, particleMat);
        group.add(particles);

        // --- Guiding Light Beam (The Core Goal) ---
        const beamGeo = new THREE.CylinderGeometry(0.1, 1.5, 30, 16, 1, true);
        const beamMat = new THREE.MeshBasicMaterial({
            color: 0xfb923c,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        const beam = new THREE.Mesh(beamGeo, beamMat);
        group.add(beam);

        // --- Lights ---
        scene.add(new THREE.AmbientLight(0x0f1117, 2));

        // Warm light coming from the bottom (the foundation)
        const bottomLight = new THREE.PointLight(0xf97316, 4, 30);
        bottomLight.position.set(0, -10, 0);
        scene.add(bottomLight);

        // Cold light from above for contrast
        const topLight = new THREE.DirectionalLight(0x3b82f6, 1.5);
        topLight.position.set(5, 15, 5);
        scene.add(topLight);

        // --- Mouse Parallax ---
        let mouseX = 0;
        let mouseY = 0;
        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
        };
        window.addEventListener('mousemove', onMouseMove);

        // --- Animation ---
        const clock = new THREE.Clock();

        const animate = () => {
            const t = clock.getElapsedTime();

            // Slowly rotate the entire ascending structure
            group.rotation.y = t * 0.1;

            // Pulse the milestone pillars
            pillars.forEach((pillar, i) => {
                if (i % 4 === 0) {
                    const pulse = Math.sin(t * 2 + i) * 0.5 + 0.5;
                    (pillar.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.2 + pulse * 0.4;
                }
            });

            // Animate upward draft particles
            const positions = particles.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3 + 1] += particleSpeeds[i];

                // Reset to bottom if they go too high
                if (positions[i3 + 1] > 10) {
                    positions[i3 + 1] = -10;
                }
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Gentle camera parallax breathing 
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - 5 - camera.position.y) * 0.05;
            camera.lookAt(0, 5, 0);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: '100%', height: '100%' }}
        />
    );
}

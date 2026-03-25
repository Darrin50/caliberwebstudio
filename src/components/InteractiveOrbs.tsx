'use client';

import { useEffect, useRef } from 'react';

declare const THREE: any;

interface OrbConfig {
  sectionId: string;
  position: [number, number, number];
  size: number;
  type: 'globe' | 'sphere' | 'crystal';
  color: number;
}

const ORB_CONFIGS: OrbConfig[] = [
  { sectionId: 'services', position: [-8, 0, -3], size: 3.0, type: 'globe', color: 0x1e3d8f },
  { sectionId: 'services', position: [9, -1, -4], size: 2.0, type: 'sphere', color: 0x3a6fd8 },
  { sectionId: 'process', position: [10, 1, -2], size: 2.8, type: 'globe', color: 0x2a52b0 },
  { sectionId: 'process', position: [-7, -2, -5], size: 1.5, type: 'crystal', color: 0x5a8fff },
  { sectionId: 'pricing', position: [-9, 0, -3], size: 2.5, type: 'sphere', color: 0x1e3d8f },
  { sectionId: 'pricing', position: [8, 2, -4], size: 1.8, type: 'crystal', color: 0x3a6fd8 },
  { sectionId: 'work', position: [10, -1, -2], size: 3.2, type: 'globe', color: 0x1e3d8f },
  { sectionId: 'work', position: [-8, 1, -5], size: 1.6, type: 'sphere', color: 0x5a8fff },
];

export default function InteractiveOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<any[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = containerRef.current;
    if (!container) return;

    const loadThree = () => {
      return new Promise((resolve) => {
        if ((window as any).THREE) {
          resolve((window as any).THREE);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.async = true;
        script.onload = () => resolve((window as any).THREE);
        document.head.appendChild(script);
      });
    };

    loadThree().then(() => {
      const THREE = (window as any).THREE;
      const scenes: any[] = [];

      // Find all sections and create a canvas for each pair
      const sections = ['services', 'process', 'pricing', 'work'];

      sections.forEach((sectionId) => {
        const sectionEl = document.getElementById(sectionId);
        if (!sectionEl) return;

        const orbsForSection = ORB_CONFIGS.filter((o) => o.sectionId === sectionId);
        if (orbsForSection.length === 0) return;

        // Create canvas overlay for this section
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'auto';
        canvas.style.zIndex = '2';
        canvas.setAttribute('data-orbs', sectionId);

        // Make section relative if not already
        const computed = window.getComputedStyle(sectionEl);
        if (computed.position === 'static') {
          sectionEl.style.position = 'relative';
        }
        sectionEl.appendChild(canvas);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        const rect = sectionEl.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const camera = new THREE.PerspectiveCamera(50, rect.width / rect.height, 0.1, 100);
        camera.position.z = 18;

        const scene = new THREE.Scene();
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const interactables: any[] = [];
        const orbs: any[] = [];

        orbsForSection.forEach((cfg) => {
          const group = new THREE.Group();
          group.position.set(...cfg.position);

          if (cfg.type === 'globe') {
            // Wireframe globe with lat/long lines
            const gGeo = new THREE.SphereGeometry(cfg.size, 24, 18);
            const gMat = new THREE.MeshBasicMaterial({
              color: cfg.color, wireframe: true, transparent: true, opacity: 0.25,
            });
            const gMesh = new THREE.Mesh(gGeo, gMat);
            group.add(gMesh);
            interactables.push(gMesh);

            // Inner fill
            const iFillGeo = new THREE.SphereGeometry(cfg.size * 0.95, 16, 12);
            const iFillMat = new THREE.MeshBasicMaterial({
              color: cfg.color, transparent: true, opacity: 0.06,
            });
            group.add(new THREE.Mesh(iFillGeo, iFillMat));

            // Equator ring
            const eqGeo = new THREE.RingGeometry(cfg.size * 1.15, cfg.size * 1.2, 64);
            const eqMat = new THREE.MeshBasicMaterial({
              color: 0xa8b8c8, transparent: true, opacity: 0.1, side: THREE.DoubleSide,
            });
            const eqMesh = new THREE.Mesh(eqGeo, eqMat);
            eqMesh.rotation.x = Math.PI / 2;
            group.add(eqMesh);

            // Polar ring (tilted)
            const prGeo = new THREE.RingGeometry(cfg.size * 1.05, cfg.size * 1.08, 48);
            const prMat = new THREE.MeshBasicMaterial({
              color: 0x3a6fd8, transparent: true, opacity: 0.07, side: THREE.DoubleSide,
            });
            const prMesh = new THREE.Mesh(prGeo, prMat);
            prMesh.rotation.x = Math.PI * 0.35;
            prMesh.rotation.z = Math.PI * 0.25;
            group.add(prMesh);

            // Data dots
            for (let d = 0; d < 8; d++) {
              const theta = Math.random() * Math.PI * 2;
              const phi = Math.acos(2 * Math.random() - 1);
              const dx = cfg.size * 1.02 * Math.sin(phi) * Math.cos(theta);
              const dy = cfg.size * 1.02 * Math.sin(phi) * Math.sin(theta);
              const dz = cfg.size * 1.02 * Math.cos(phi);
              const dotGeo = new THREE.SphereGeometry(0.06, 6, 6);
              const dotMat = new THREE.MeshBasicMaterial({ color: 0x5a8fff, transparent: true, opacity: 0.8 });
              const dot = new THREE.Mesh(dotGeo, dotMat);
              dot.position.set(dx, dy, dz);
              group.add(dot);
            }
          } else if (cfg.type === 'sphere') {
            // Glass-like sphere
            const sGeo = new THREE.SphereGeometry(cfg.size, 22, 16);
            const sMat = new THREE.MeshBasicMaterial({
              color: cfg.color, wireframe: true, transparent: true, opacity: 0.3,
            });
            const sMesh = new THREE.Mesh(sGeo, sMat);
            group.add(sMesh);
            interactables.push(sMesh);

            // Inner sphere
            const isGeo = new THREE.SphereGeometry(cfg.size * 0.7, 14, 10);
            const isMat = new THREE.MeshBasicMaterial({
              color: cfg.color, wireframe: true, transparent: true, opacity: 0.12,
            });
            group.add(new THREE.Mesh(isGeo, isMat));

            // Glow ring
            const grGeo = new THREE.RingGeometry(cfg.size * 1.2, cfg.size * 1.28, 48);
            const grMat = new THREE.MeshBasicMaterial({
              color: 0xa8b8c8, transparent: true, opacity: 0.08, side: THREE.DoubleSide,
            });
            const grMesh = new THREE.Mesh(grGeo, grMat);
            grMesh.rotation.x = Math.PI * 0.4;
            group.add(grMesh);
          } else {
            // Crystal â icosahedron
            const cGeo = new THREE.IcosahedronGeometry(cfg.size, 0);
            const cMat = new THREE.MeshBasicMaterial({
              color: cfg.color, wireframe: true, transparent: true, opacity: 0.3,
            });
            const cMesh = new THREE.Mesh(cGeo, cMat);
            group.add(cMesh);
            interactables.push(cMesh);

            // Inner icosahedron
            const icGeo = new THREE.IcosahedronGeometry(cfg.size * 0.55, 0);
            const icMat = new THREE.MeshBasicMaterial({
              color: cfg.color, wireframe: true, transparent: true, opacity: 0.12,
            });
            group.add(new THREE.Mesh(icGeo, icMat));

            // Orbit ring
            const orGeo = new THREE.RingGeometry(cfg.size * 1.3, cfg.size * 1.35, 32);
            const orMat = new THREE.MeshBasicMaterial({
              color: 0xa8b8c8, transparent: true, opacity: 0.08, side: THREE.DoubleSide,
            });
            const orMesh = new THREE.Mesh(orGeo, orMat);
            orMesh.rotation.x = Math.PI * 0.3;
            group.add(orMesh);
          }

          scene.add(group);
          orbs.push({
            group,
            config: cfg,
            rotVelX: 0,
            rotVelY: cfg.type === 'globe' ? 0.004 : 0.006,
            hovered: false,
            basePos: new THREE.Vector3(...cfg.position),
            phase: Math.random() * Math.PI * 2,
          });
        });

        // Interaction state
        let isDragging = false;
        let dragIndex = -1;
        let prevX = 0;
        let prevY = 0;

        const onPointerDown = (e: PointerEvent) => {
          const cRect = canvas.getBoundingClientRect();
          mouse.x = ((e.clientX - cRect.left) / cRect.width) * 2 - 1;
          mouse.y = -((e.clientY - cRect.top) / cRect.height) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          const hits = raycaster.intersectObjects(interactables, false);
          if (hits.length > 0) {
            isDragging = true;
            dragIndex = interactables.indexOf(hits[0].object);
            prevX = e.clientX;
            prevY = e.clientY;
            canvas.style.cursor = 'grabbing';
            e.preventDefault();
            e.stopPropagation();
          }
        };

        const onPointerMove = (e: PointerEvent) => {
          if (isDragging && dragIndex >= 0 && dragIndex < orbs.length) {
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            const orb = orbs[dragIndex];
            if (orb.config.type === 'globe') {
              orb.rotVelY = dx * 0.004;
              orb.rotVelX = dy * 0.004;
            } else {
              orb.group.position.x += dx * 0.03;
              orb.group.position.y -= dy * 0.03;
            }
            prevX = e.clientX;
            prevY = e.clientY;
            e.preventDefault();
          } else {
            const cRect = canvas.getBoundingClientRect();
            mouse.x = ((e.clientX - cRect.left) / cRect.width) * 2 - 1;
            mouse.y = -((e.clientY - cRect.top) / cRect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const hits = raycaster.intersectObjects(interactables, false);
            orbs.forEach((o) => { o.hovered = false; });
            if (hits.length > 0) {
              canvas.style.cursor = 'grab';
              const idx = interactables.indexOf(hits[0].object);
              if (idx >= 0 && idx < orbs.length) orbs[idx].hovered = true;
            } else {
              canvas.style.cursor = '';
            }
          }
        };

        const onPointerUp = () => {
          isDragging = false;
          dragIndex = -1;
          canvas.style.cursor = '';
        };

        canvas.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        // Visibility observer â only render when section is in view
        let isVisible = false;
        const observer = new IntersectionObserver(
          (entries) => {
            isVisible = entries[0].isIntersecting;
          },
          { threshold: 0.05 }
        );
        observer.observe(sectionEl);

        // Animation
        let frame = 0;
        const animate = () => {
          const animId = requestAnimationFrame(animate);
          if (!isVisible) return;
          frame++;

          // Resize check
          const newRect = sectionEl.getBoundingClientRect();
          if (Math.abs(canvas.width - newRect.width) > 2 || Math.abs(canvas.height - newRect.height) > 2) {
            renderer.setSize(newRect.width, newRect.height);
            camera.aspect = newRect.width / newRect.height;
            camera.updateProjectionMatrix();
          }

          orbs.forEach((orb) => {
            // Rotation
            if (!isDragging || dragIndex !== orbs.indexOf(orb)) {
              orb.rotVelX *= 0.97;
              orb.rotVelY *= 0.97;
              orb.rotVelY += (0.004 - orb.rotVelY) * 0.003;
            }
            orb.group.rotation.y += orb.rotVelY;
            orb.group.rotation.x += orb.rotVelX;

            // Float
            if (!isDragging || dragIndex !== orbs.indexOf(orb)) {
              const fy = Math.sin(frame * 0.01 + orb.phase) * 0.5;
              orb.group.position.y += (orb.basePos.y + fy - orb.group.position.y) * 0.02;
            }

            // Hover glow
            const mainChild = orb.group.children[0];
            if (mainChild && mainChild.material) {
              const target = orb.hovered ? 0.55 : (orb.config.type === 'globe' ? 0.25 : 0.3);
              mainChild.material.opacity += (target - mainChild.material.opacity) * 0.06;
            }
          });

          renderer.render(scene, camera);
        };
        animate();

        scenes.push({
          renderer,
          canvas,
          sectionEl,
          observer,
          cleanupPointer: () => {
            canvas.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
          },
        });
      });

      scenesRef.current = scenes;
    });

    return () => {
      scenesRef.current.forEach((s) => {
        s.renderer.dispose();
        s.observer.disconnect();
        s.cleanupPointer();
        if (s.canvas.parentNode) s.canvas.parentNode.removeChild(s.canvas);
      });
    };
  }, []);

  return <div ref={containerRef} style={{ display: 'none' }} />;
}

'use client';

import { useEffect, useRef } from 'react';

declare const THREE: any;

export default function HeroScene() {
  const rendererRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
      const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
      if (!canvas) return;

      const THREE = (window as any).THREE;

      // ── Renderer ──
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;

      // ── Camera ──
      const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 24;

      // ── Scene ──
      const scene = new THREE.Scene();
      const sceneGroup = new THREE.Group();
      scene.add(sceneGroup);

      // ── Raycaster for hover effects ──
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const interactables: any[] = [];

      // ─────────────────────────────────────────────
      //  MAIN GLOBE — wireframe earth, left side
      // ─────────────────────────────────────────────
      const globeGroup = new THREE.Group();
      globeGroup.position.set(-10, 1, -2);
      sceneGroup.add(globeGroup);

      // Globe sphere wireframe
      const globeGeo = new THREE.SphereGeometry(5, 28, 20);
      const globeMat = new THREE.MeshBasicMaterial({
        color: 0x1e3d8f, wireframe: true, transparent: true, opacity: 0.3,
      });
      const globe = new THREE.Mesh(globeGeo, globeMat);
      globeGroup.add(globe);
      interactables.push(globe);

      // Globe inner sphere (solid subtle)
      const globeInnerGeo = new THREE.SphereGeometry(4.85, 28, 20);
      const globeInnerMat = new THREE.MeshBasicMaterial({
        color: 0x0a1a3f, transparent: true, opacity: 0.15,
      });
      const globeInner = new THREE.Mesh(globeInnerGeo, globeInnerMat);
      globeGroup.add(globeInner);

      // Latitude rings
      const latitudes = [-1.5, -0.75, 0, 0.75, 1.5];
      latitudes.forEach((lat) => {
        const radius = Math.cos(lat * 0.6) * 5.1;
        const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x3a6fd8, transparent: true, opacity: 0.12, side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.y = Math.sin(lat * 0.6) * 5.1;
        ring.rotation.x = Math.PI / 2;
        globeGroup.add(ring);
      });

      // Globe glow ring
      const glowRingGeo = new THREE.RingGeometry(5.3, 5.8, 64);
      const glowRingMat = new THREE.MeshBasicMaterial({
        color: 0x1e3d8f, transparent: true, opacity: 0.06, side: THREE.DoubleSide,
      });
      const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
      globeGroup.add(glowRing);

      // Globe data points (glowing dots on surface)
      const dataPoints: any[] = [];
      const pointPositions = [
        [0.3, 0.8, 0.5], [-0.6, 0.4, 0.7], [0.7, -0.2, 0.7],
        [-0.4, -0.6, 0.7], [0.1, 0.5, -0.9], [-0.8, 0.1, -0.6],
        [0.5, -0.8, 0.3], [-0.3, 0.9, -0.3], [0.9, 0.3, 0.3],
        [-0.2, -0.4, -0.9], [0.6, 0.6, -0.5], [-0.7, -0.5, 0.5],
      ];
      pointPositions.forEach((p) => {
        const len = Math.sqrt(p[0] * p[0] + p[1] * p[1] + p[2] * p[2]);
        const nx = (p[0] / len) * 5.05;
        const ny = (p[1] / len) * 5.05;
        const nz = (p[2] / len) * 5.05;
        const dotGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x5a8fff });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(nx, ny, nz);
        globeGroup.add(dot);
        dataPoints.push({ mesh: dot, phase: Math.random() * Math.PI * 2 });
      });

      // Connection arcs between some data points
      const arcPairs = [[0, 1], [2, 4], [3, 5], [6, 8], [7, 9], [1, 6], [10, 11]];
      arcPairs.forEach(([a, b]) => {
        const pa = dataPoints[a].mesh.position;
        const pb = dataPoints[b].mesh.position;
        const mid = new THREE.Vector3().addVectors(pa, pb).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(6.5);
        const curve = new THREE.QuadraticBezierCurve3(pa.clone(), mid, pb.clone());
        const points = curve.getPoints(20);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
        const arcMat = new THREE.LineBasicMaterial({
          color: 0x3a6fd8, transparent: true, opacity: 0.15,
        });
        const arc = new THREE.Line(arcGeo, arcMat);
        globeGroup.add(arc);
      });

      // ─────────────────────────────────────────────
      //  FLOATING SPHERES — hover glow, right side
      // ─────────────────────────────────────────────
      const spheres: {
        mesh: any;
        basePos: any;
        velocity: any;
        hovered: boolean;
        phase: number;
        rotVelX: number;
        rotVelY: number;
      }[] = [];

      const sphereConfigs = [
        { pos: [12, 4, -3], size: 2.2, color: 0x1e3d8f, opacity: 0.35 },
        { pos: [15, -2, -5], size: 1.4, color: 0x3a6fd8, opacity: 0.28 },
        { pos: [9, -4, -1], size: 1.8, color: 0x2a52b0, opacity: 0.3 },
        { pos: [17, 1, -8], size: 1.0, color: 0xa8b8c8, opacity: 0.2 },
        { pos: [7, 6, -4], size: 1.2, color: 0x5a8fff, opacity: 0.25 },
        { pos: [-6, -5, -6], size: 1.5, color: 0x3a6fd8, opacity: 0.22 },
        { pos: [4, -6, -3], size: 0.9, color: 0x1e3d8f, opacity: 0.3 },
      ];

      sphereConfigs.forEach((cfg, i) => {
        const group = new THREE.Group();

        // Main sphere
        const sGeo = new THREE.SphereGeometry(cfg.size, 20, 16);
        const sMat = new THREE.MeshBasicMaterial({
          color: cfg.color, wireframe: true, transparent: true, opacity: cfg.opacity,
        });
        const sMesh = new THREE.Mesh(sGeo, sMat);
        group.add(sMesh);

        // Inner glow sphere
        const iGeo = new THREE.SphereGeometry(cfg.size * 0.92, 16, 12);
        const iMat = new THREE.MeshBasicMaterial({
          color: cfg.color, transparent: true, opacity: cfg.opacity * 0.3,
        });
        const iMesh = new THREE.Mesh(iGeo, iMat);
        group.add(iMesh);

        // Orbit ring
        const oGeo = new THREE.RingGeometry(cfg.size * 1.3, cfg.size * 1.35, 48);
        const oMat = new THREE.MeshBasicMaterial({
          color: 0xa8b8c8, transparent: true, opacity: 0.08, side: THREE.DoubleSide,
        });
        const oMesh = new THREE.Mesh(oGeo, oMat);
        oMesh.rotation.x = Math.PI * 0.3 + i * 0.2;
        oMesh.rotation.y = i * 0.5;
        group.add(oMesh);

        group.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
        sceneGroup.add(group);
        interactables.push(sMesh);

        spheres.push({
          mesh: group,
          basePos: new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2]),
          velocity: new THREE.Vector3(0, 0, 0),
          hovered: false,
          phase: Math.random() * Math.PI * 2,
          rotVelX: 0,
          rotVelY: 0,
        });
      });

      // ─────────────────────────────────────────────
      //  PARTICLES — denser star field
      // ─────────────────────────────────────────────
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 1600;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 90;
        positions[i + 1] = (Math.random() - 0.5) * 60;
        positions[i + 2] = (Math.random() - 0.5) * 60;
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0xa8b8c8, size: 0.06, transparent: true, opacity: 0.45, sizeAttenuation: true,
      });
      particlesMaterial.blending = THREE.AdditiveBlending;
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      sceneGroup.add(particles);

      // Grid floor
      const grid = new THREE.GridHelper(80, 30, 0x1e3d8f, 0x1e3d8f);
      grid.material.transparent = true;
      grid.material.opacity = 0.06;
      grid.position.y = -10;
      sceneGroup.add(grid);

      // ─────────────────────────────────────────────
      //  DRAG-TO-SPIN HINT — fades in then out
      // ─────────────────────────────────────────────
      const hintEl = document.createElement('div');
      hintEl.style.cssText = [
        'position:absolute',
        'bottom:42%',
        'left:50%',
        'transform:translateX(-50%)',
        'z-index:5',
        'background:rgba(30,61,143,0.18)',
        'backdrop-filter:blur(8px)',
        '-webkit-backdrop-filter:blur(8px)',
        'border:1px solid rgba(90,143,255,0.28)',
        'border-radius:24px',
        'padding:9px 20px',
        'color:rgba(168,184,200,0.92)',
        "font-family:'Inter',sans-serif",
        'font-size:13px',
        'font-weight:500',
        'letter-spacing:0.05em',
        'pointer-events:none',
        'white-space:nowrap',
        'transition:opacity 0.8s ease',
        'opacity:0',
        'user-select:none',
      ].join(';');
      hintEl.textContent = '⟲  drag to spin';
      canvas.parentElement?.appendChild(hintEl);
      // Fade in after short delay, then fade out after 3 s visible
      const hintFadeIn  = setTimeout(() => { hintEl.style.opacity = '1'; }, 600);
      const hintFadeOut = setTimeout(() => { hintEl.style.opacity = '0'; }, 3600);
      const hintRemove  = setTimeout(() => { hintEl.remove(); }, 4500);

      // ─────────────────────────────────────────────
      //  INTERACTION STATE
      // ─────────────────────────────────────────────
      let isDragging     = false;
      let dragStarted    = false;  // true once pointer moved past threshold
      let touchScrolling = false;  // true when touch intent is vertical scroll
      let pointerDownX   = 0;
      let pointerDownY   = 0;
      let prevMouseX     = 0;
      let prevMouseY     = 0;
      let targetCamX     = 0;
      let targetCamY     = 0;

      // Globe's own idle rotation velocity
      let globeRotVelX = 0;
      let globeRotVelY = 0.003;

      // Scene-level drag inertia (whole sceneGroup)
      let sceneRotVelX = 0;
      let sceneRotVelY = 0;

      let hoveredObj: any = null;

      // ── Pointer down — record start, don't capture yet ──
      const onPointerDown = (e: PointerEvent) => {
        pointerDownX  = e.clientX;
        pointerDownY  = e.clientY;
        prevMouseX    = e.clientX;
        prevMouseY    = e.clientY;
        dragStarted   = false;
        isDragging    = false;
        touchScrolling = false;
      };

      // ── Pointer move — determine intent, then rotate or scroll ──
      const onPointerMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        // Camera parallax always active
        targetCamX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetCamY = (e.clientY / window.innerHeight - 0.5) * 2;

        const buttonHeld = e.buttons > 0;

        if (buttonHeld) {
          const totalDx = e.clientX - pointerDownX;
          const totalDy = e.clientY - pointerDownY;
          const totalDist = Math.sqrt(totalDx * totalDx + totalDy * totalDy);

          // Determine intent once the pointer has moved far enough
          if (!dragStarted && !touchScrolling && totalDist > 5) {
            if (e.pointerType === 'touch' && Math.abs(totalDy) > Math.abs(totalDx) * 1.4) {
              // Vertical intent on touch → let the page scroll naturally
              touchScrolling = true;
            } else {
              // Horizontal or mouse drag → take control and spin the scene
              dragStarted = true;
              isDragging  = true;
              canvas.style.cursor = 'grabbing';
              // Capture so we keep receiving events even outside the canvas
              try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
            }
          }

          // If we confirmed it's a page-scroll touch, stop processing here
          if (touchScrolling) {
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
            return;
          }

          if (isDragging) {
            const dx = e.clientX - prevMouseX;
            const dy = e.clientY - prevMouseY;

            // Update scene-level velocities and apply immediately
            sceneRotVelY = dx * 0.005;
            sceneRotVelX = dy * 0.003;

            sceneGroup.rotation.y += sceneRotVelY;
            // Clamp vertical tilt so the scene never flips
            sceneGroup.rotation.x = Math.max(
              -Math.PI / 3,
              Math.min(Math.PI / 3, sceneGroup.rotation.x + sceneRotVelX)
            );

            e.preventDefault();
          }
        } else {
          // No button held — reset drag state and do hover detection
          if (isDragging || dragStarted) {
            isDragging    = false;
            dragStarted   = false;
            touchScrolling = false;
            canvas.style.cursor = 'grab';
          }

          raycaster.setFromCamera(mouse, camera);
          const hits = raycaster.intersectObjects(interactables, false);
          if (hits.length > 0) {
            canvas.style.cursor = 'grab';
            if (hoveredObj !== hits[0].object) hoveredObj = hits[0].object;
            spheres.forEach((s) => { s.hovered = false; });
            if (hits[0].object !== globe) {
              const idx = interactables.indexOf(hits[0].object) - 1;
              if (idx >= 0 && idx < spheres.length) spheres[idx].hovered = true;
            }
          } else {
            canvas.style.cursor = 'grab';
            hoveredObj = null;
            spheres.forEach((s) => { s.hovered = false; });
          }
        }

        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };

      // ── Pointer up / cancel — release and keep inertia ──
      const onPointerUp = (e: PointerEvent) => {
        isDragging    = false;
        dragStarted   = false;
        touchScrolling = false;
        canvas.style.cursor = 'grab';
        try { canvas.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
      };

      // All pointer events on the canvas element itself
      canvas.addEventListener('pointerdown',   onPointerDown);
      canvas.addEventListener('pointermove',   onPointerMove);
      canvas.addEventListener('pointerup',     onPointerUp);
      canvas.addEventListener('pointercancel', onPointerUp);

      // Scroll parallax + rotation
      let lastScrollY = 0;
      const onScroll = () => {
        const scrollY = window.scrollY;
        const scrollProgress = scrollY / (document.documentElement.scrollHeight - window.innerHeight);

        // Camera pullback as you scroll deeper
        camera.position.z = 24 + scrollProgress * 14;
        sceneGroup.rotation.z = scrollProgress * 0.08;

        // Delta-based rotation nudge — blends naturally with drag inertia
        const delta = scrollY - lastScrollY;
        sceneRotVelY += delta * 0.00018;
        globeRotVelY += delta * 0.00012;
        lastScrollY = scrollY;

        // CSS parallax: canvas scrolls at 30% of page speed, scales down slightly
        const translateY = scrollY * 0.3;
        const scale = Math.max(0.82, 1 - scrollY * 0.00025);
        canvas.style.transform = `translateY(${translateY}px) scale(${scale})`;
        canvas.style.transformOrigin = 'center top';
      };
      window.addEventListener('scroll', onScroll);

      // Resize
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      // ─────────────────────────────────────────────
      //  ANIMATION LOOP
      // ─────────────────────────────────────────────
      let frameCount = 0;
      const animate = () => {
        requestAnimationFrame(animate);
        frameCount++;

        // ── Scene-level drag inertia ──
        // When not dragging, smoothly decay the drag velocity and keep spinning
        if (!isDragging) {
          sceneRotVelX *= 0.93;
          sceneRotVelY *= 0.93;
          sceneGroup.rotation.y += sceneRotVelY;
          sceneGroup.rotation.x = Math.max(
            -Math.PI / 3,
            Math.min(Math.PI / 3, sceneGroup.rotation.x + sceneRotVelX)
          );
        }

        // ── Globe's own idle rotation (independent of scene drag) ──
        // Friction + gentle nudge back toward idle speed — always runs,
        // so the globe resumes auto-spin from wherever the drag left it.
        globeRotVelX *= 0.98;
        globeRotVelY *= 0.98;
        globeRotVelY += (0.003 - globeRotVelY) * 0.005;
        globeGroup.rotation.y += globeRotVelY;
        globeGroup.rotation.x += globeRotVelX;

        // Globe glow ring slow spin
        glowRing.rotation.z += 0.002;

        // Data point pulse
        dataPoints.forEach((dp) => {
          const pulse = 0.7 + Math.sin(frameCount * 0.04 + dp.phase) * 0.3;
          dp.mesh.scale.setScalar(pulse);
          dp.mesh.material.opacity = 0.5 + Math.sin(frameCount * 0.03 + dp.phase) * 0.5;
        });

        // ── Floating spheres ──
        spheres.forEach((s, i) => {
          // Float position always drifts gently
          const floatY = Math.sin(frameCount * 0.012 + s.phase) * 0.8;
          const floatX = Math.cos(frameCount * 0.008 + s.phase * 1.3) * 0.3;
          s.mesh.position.x += (s.basePos.x + floatX - s.mesh.position.x) * 0.01;
          s.mesh.position.y += (s.basePos.y + floatY - s.mesh.position.y) * 0.01;

          // Rotation inertia — decay and apply to the whole group
          s.rotVelX *= 0.95;
          s.rotVelY *= 0.95;
          s.mesh.rotation.y += s.rotVelY;
          s.mesh.rotation.x += s.rotVelX;

          // Subtle auto self-spin of the wireframe mesh
          s.mesh.children[0].rotation.y += 0.005 + i * 0.001;
          s.mesh.children[0].rotation.x += 0.002;

          // Orbit ring always spins regardless
          if (s.mesh.children[2]) {
            s.mesh.children[2].rotation.z += 0.008 + i * 0.002;
          }

          // Hover glow effect
          const targetOpacity = s.hovered ? 0.6 : sphereConfigs[i].opacity;
          s.mesh.children[0].material.opacity += (targetOpacity - s.mesh.children[0].material.opacity) * 0.08;
          const innerTarget = s.hovered ? 0.25 : sphereConfigs[i].opacity * 0.3;
          s.mesh.children[1].material.opacity += (innerTarget - s.mesh.children[1].material.opacity) * 0.08;
          if (s.mesh.children[2]) {
            const ringTarget = s.hovered ? 0.2 : 0.08;
            s.mesh.children[2].material.opacity += (ringTarget - s.mesh.children[2].material.opacity) * 0.08;
          }
        });

        // ── Particles gentle drift ──
        particles.rotation.y += 0.0003;

        // ── Grid scroll ──
        grid.position.z += 0.03;

        // ── Camera smooth parallax follow ──
        camera.position.x += (targetCamX * 1.0 - camera.position.x) * 0.02;
        camera.position.y += (-targetCamY * 0.6 - camera.position.y) * 0.02;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        clearTimeout(hintFadeIn);
        clearTimeout(hintFadeOut);
        clearTimeout(hintRemove);
        hintEl.remove();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        canvas.removeEventListener('pointerdown',   onPointerDown);
        canvas.removeEventListener('pointermove',   onPointerMove);
        canvas.removeEventListener('pointerup',     onPointerUp);
        canvas.removeEventListener('pointercancel', onPointerUp);
        renderer.dispose();
      };
    });
  }, []);

  return (
    <canvas
      id="hero-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'auto',
        // pan-y lets the browser handle vertical touch scroll natively (no blocking).
        // Horizontal drags are still intercepted by our pointer event logic for spinning.
        touchAction: 'pan-y',
        cursor: 'grab',
        width: '100%',
        height: '100%',
      }}
    />
  );
}

'use client';

import { useEffect, useRef } from 'react';

declare const THREE: any;

export default function HeroScene() {
  const rendererRef = useRef<any>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const dragRef = useRef<any>(null);

  useEffect(() => {
    // Load Three.js from CDN
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

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 22;
      cameraRef.current = camera;

      // Scene setup
      const scene = new THREE.Scene();
      const sceneGroup = new THREE.Group();
      scene.add(sceneGroup);
      sceneRef.current = { scene, sceneGroup, camera, renderer };

      // Hexagon wireframe
      const hexGeometry = new THREE.CylinderGeometry(5, 5, 0.2, 6, 1, false);
      const hexMaterial = new THREE.MeshBasicMaterial({
        color: 0x1e3d8f,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const hex = new THREE.Mesh(hexGeometry, hexMaterial);
      hex.rotation.x = Math.PI / 2;
      hex.position.set(7, 0, -2);
      sceneGroup.add(hex);

      // Hex outer
      const hexOuterGeometry = new THREE.CylinderGeometry(7.5, 7.5, 0.1, 6, 1, false);
      const hexOuterMaterial = new THREE.MeshBasicMaterial({
        color: 0xa8b8c8,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      });
      const hexOuter = new THREE.Mesh(hexOuterGeometry, hexOuterMaterial);
      hexOuter.position.set(7, 0, -3);
      sceneGroup.add(hexOuter);

      // Particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 1800;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 70;
        positions[i + 1] = (Math.random() - 0.5) * 50;
        positions[i + 2] = (Math.random() - 0.5) * 40;
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0xa8b8c8,
        size: 0.08,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      });
      particlesMaterial.blending = THREE.AdditiveBlending;
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      sceneGroup.add(particles);

      // Grid
      const grid = new THREE.GridHelper(80, 30, 0x1e3d8f, 0x1e3d8f);
      grid.material.transparent = true;
      grid.material.opacity = 0.08;
      grid.position.y = -10;
      sceneGroup.add(grid);

      // Sphere wireframe
      const sphereGeometry = new THREE.SphereGeometry(3.5, 12, 8);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x1e3d8f,
        wireframe: true,
        transparent: true,
        opacity: 0.13,
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(-9, 2, -5);
      sceneGroup.add(sphere);

      // Drag interaction
      const dragState = {
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        tick: () => {
          dragState.vx *= 0.9;
          dragState.vy *= 0.9;
          return { x: dragState.x, y: dragState.y };
        },
      };

      const heroEl = document.querySelector('.hero');
      if (heroEl) {
        const onMouseDown = () => {
          dragState.active = true;
        };
        const onMouseMove = (e: MouseEvent) => {
          if (!dragState.active) return;
          dragState.vx = (e.clientX - dragState.x) * 0.01;
          dragState.vy = (e.clientY - dragState.y) * 0.01;
          dragState.x = e.clientX;
          dragState.y = e.clientY;
        };
        const onMouseUp = () => {
          dragState.active = false;
        };
        const onTouchStart = () => {
          dragState.active = true;
        };
        const onTouchMove = (e: TouchEvent) => {
          if (!dragState.active) return;
          const touch = e.touches[0];
          dragState.vx = (touch.clientX - dragState.x) * 0.01;
          dragState.vy = (touch.clientY - dragState.y) * 0.01;
          dragState.x = touch.clientX;
          dragState.y = touch.clientY;
        };
        const onTouchEnd = () => {
          dragState.active = false;
        };

        heroEl.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        heroEl.addEventListener('touchstart', onTouchStart);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onTouchEnd);

        dragRef.current = {
          cleanup: () => {
            heroEl.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            heroEl.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
          },
        };
      }

      // Scroll interaction
      const onScroll = () => {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        camera.position.z = 22 + scrollProgress * 12;
        sceneGroup.rotation.z = scrollProgress * 0.1;
      };
      window.addEventListener('scroll', onScroll);

      // Resize handler
      const onResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener('resize', onResize);

      // Expose to window
      (window as any).heroSceneData = { camera, sceneGroup };

      // Animation loop
      let mouseIdleX = 0;
      let mouseIdleY = 0;
      let frameCount = 0;

      const animate = () => {
        requestAnimationFrame(animate);

        hex.rotation.z += 0.003;
        hexOuter.rotation.z -= 0.0015;
        sphere.rotation.y += 0.005;
        particles.rotation.y += 0.0004;
        grid.position.z += 0.05;

        // Drag interaction tick
        dragState.tick();

        // Parallax on idle
        if (!dragState.active) {
          mouseIdleX = window.innerWidth / 2;
          mouseIdleY = window.innerHeight / 2;
          camera.position.x += (mouseIdleX / window.innerWidth - 0.5) * 0.08 - camera.position.x * 0.01;
          camera.position.y += (0.5 - mouseIdleY / window.innerHeight) * 0.08 - camera.position.y * 0.01;
        }

        frameCount++;
        if (frameCount % 2 === 0) {
          renderer.render(scene, camera);
        }
      };

      animate();

      // Cleanup
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        dragRef.current?.cleanup();
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
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}

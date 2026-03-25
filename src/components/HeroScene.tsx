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

      // Renderer
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;

      // Camera
      const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 22;

      // Scene
      const scene = new THREE.Scene();
      const sceneGroup = new THREE.Group();
      scene.add(sceneGroup);

      // Hexagon wireframe far right
      const hexGeometry = new THREE.CylinderGeometry(4, 4, 0.2, 6, 1, false);
      const hexMaterial = new THREE.MeshBasicMaterial({
        color: 0x1e3d8f, wireframe: true, transparent: true, opacity: 0.35,
      });
      const hex = new THREE.Mesh(hexGeometry, hexMaterial);
      hex.rotation.x = Math.PI / 2;
      hex.position.set(16, 2, -6);
      sceneGroup.add(hex);

      const hexOuterGeometry = new THREE.CylinderGeometry(6, 6, 0.1, 6, 1, false);
      const hexOuterMaterial = new THREE.MeshBasicMaterial({
        color: 0xa8b8c8, wireframe: true, transparent: true, opacity: 0.12,
      });
      const hexOuter = new THREE.Mesh(hexOuterGeometry, hexOuterMaterial);
      hexOuter.position.set(16, 2, -7);
      sceneGroup.add(hexOuter);

      // Particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 1200;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 80;
        positions[i + 1] = (Math.random() - 0.5) * 50;
        positions[i + 2] = (Math.random() - 0.5) * 50;
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0xa8b8c8, size: 0.06, transparent: true, opacity: 0.4, sizeAttenuation: true,
      });
      particlesMaterial.blending = THREE.AdditiveBlending;
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      sceneGroup.add(particles);

      const grid = new THREE.GridHelper(80, 30, 0x1e3d8f, 0x1e3d8f);
      grid.material.transparent = true;
      grid.material.opacity = 0.08;
      grid.position.y = -10;
      sceneGroup.add(grid);

      // Sphere wireframe far left
      const sphereGeometry = new THREE.SphereGeometry(3, 14, 10);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x1e3d8f, wireframe: true, transparent: true, opacity: 0.35,
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(-16, 3, -4);
      sceneGroup.add(sphere);

      const sphereRingGeometry = new THREE.RingGeometry(3.8, 4.0, 32);
      const sphereRingMaterial = new THREE.MeshBasicMaterial({
        color: 0xa8b8c8, transparent: true, opacity: 0.08, side: THREE.DoubleSide,
      });
      const sphereRing = new THREE.Mesh(sphereRingGeometry, sphereRingMaterial);
      sphereRing.position.set(-16, 3, -4);
      sceneGroup.add(sphereRing);

      // Scroll parallax
      const onScroll = () => {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        camera.position.z = 22 + scrollProgress * 12;
        sceneGroup.rotation.z = scrollProgress * 0.1;
      };
      window.addEventListener('scroll', onScroll);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      // Smooth mouse parallax
      let targetX = 0;
      let targetY = 0;
      const onMouseMove = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      // Animation loop
      let frameCount = 0;
      const animate = () => {
        requestAnimationFrame(animate);
        hex.rotation.z += 0.002;
        hexOuter.rotation.z -= 0.001;
        sphere.rotation.y += 0.004;
        sphere.rotation.x += 0.001;
        sphereRing.rotation.z += 0.003;
        sphereRing.rotation.x = Math.sin(frameCount * 0.008) * 0.3;
        particles.rotation.y += 0.0003;
        grid.position.z += 0.03;
        camera.position.x += (targetX * 0.8 - camera.position.x) * 0.02;
        camera.position.y += (-targetY * 0.5 - camera.position.y) * 0.02;
        frameCount++;
        if (frameCount % 2 === 0) {
          renderer.render(scene, camera);
        }
      };
      animate();

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
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

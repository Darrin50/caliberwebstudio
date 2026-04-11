'use client';

/**
 * ParticleHero — GPU curl-noise particle field (desktop only)
 *
 * Mobile / low-end devices get a static CSS gradient — zero WebGL.
 * WebGL is gated behind capability checks before any context is created.
 * An ErrorBoundary catches any runtime WebGL failures and falls back gracefully.
 *
 * Capability gates (ANY failure → static fallback):
 *   - window.innerWidth < 768
 *   - navigator.hardwareConcurrency < 8
 *   - navigator.deviceMemory < 6  (where available)
 *   - WebGL2 context creation fails
 *   - MAX_VERTEX_UNIFORM_VECTORS < 256
 *   - MAX_TEXTURE_SIZE < 2048
 */

import { Component, Suspense, useRef, useMemo, useEffect, useState } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ─── Static CSS fallback ─────────────────────────────────────────────────── */
function StaticHeroBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, #0a1828 0%, #060d18 45%, #040810 100%)',
        zIndex: 0,
      }}
    />
  );
}

/* ─── WebGL capability check ──────────────────────────────────────────────── */
function canUseWebGL(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    if (window.innerWidth < 768) return false;

    const nav = navigator as Navigator & {
      hardwareConcurrency?: number;
      deviceMemory?: number;
    };
    if ((nav.hardwareConcurrency ?? 8) < 8) return false;
    if ((nav.deviceMemory ?? 8) < 6) return false;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    if (!gl) return false;

    if (gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS) < 256) return false;
    if (gl.getParameter(gl.MAX_TEXTURE_SIZE) < 2048) return false;

    // Lose context immediately — we only needed the check
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext) ext.loseContext();

    return true;
  } catch {
    return false;
  }
}

/* ─── ErrorBoundary ───────────────────────────────────────────────────────── */
interface EBState { crashed: boolean }
class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { crashed: false };
  }
  static getDerivedStateFromError(): EBState { return { crashed: true }; }
  componentDidCatch(err: Error, info: ErrorInfo) {
    console.warn('[ParticleHero] WebGL error caught, falling back to static bg:', err, info);
  }
  render() {
    return this.state.crashed ? this.props.fallback : this.props.children;
  }
}

/* ─── Seeded deterministic RNG (xorshift) ────────────────────────────────── */
function seededRng(seed: number) {
  let s = (seed | 0) || 1;
  return () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5;
    return (s >>> 0) / 0x100000000;
  };
}

/* ─── Vertex Shader ───────────────────────────────────────────────────────── */
const VERT = /* glsl */`
  precision highp float;

  uniform float u_time;
  uniform vec3  u_mouse3d;
  uniform float u_repR;
  uniform float u_repF;
  uniform vec2  u_res;

  attribute float a_seed;
  attribute float a_sz;

  varying float v_vel;
  varying float v_depth;
  varying float v_alpha;

  float hash(vec3 p) {
    p  = fract(p * vec3(443.8975, 397.2973, 491.1871));
    p += dot(p, p.yzx + 19.19);
    return fract(p.x * p.y * p.z);
  }

  float vn(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i),              hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)),  hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
      f.z);
  }

  vec3 curlN(vec3 p) {
    const float e = 0.09;
    vec3 p1 = p + vec3(17.3, 0.0,  0.0);
    vec3 p2 = p + vec3(0.0, 31.7,  0.0);
    return vec3(
      (vn(p2+vec3(0,e,0)) - vn(p2-vec3(0,e,0))) - (vn(p1+vec3(0,0,e)) - vn(p1-vec3(0,0,e))),
      (vn(p +vec3(0,0,e)) - vn(p -vec3(0,0,e))) - (vn(p2+vec3(e,0,0)) - vn(p2-vec3(e,0,0))),
      (vn(p1+vec3(e,0,0)) - vn(p1-vec3(e,0,0))) - (vn(p +vec3(0,e,0)) - vn(p -vec3(0,e,0)))
    ) / (2.0 * e);
  }

  void main() {
    float ts = u_time * 0.052;
    vec3 np  = position * 0.30 + vec3(ts, ts * 0.73, ts * 0.51) + vec3(a_seed * 3.14159);

    vec3 c  = curlN(np)
            + curlN(np * 2.1 + vec3(5.7, 3.2, 8.1)) * 0.42;

    float vel  = length(c);
    vec3 world = position + c * 4.0;

    vec3 diff = world - u_mouse3d;
    float d   = length(diff);
    if (d < u_repR && d > 0.001) {
      float f = pow(1.0 - d / u_repR, 2.0) * u_repF;
      world  += normalize(diff) * f;
    }

    vec4  vpos  = modelViewMatrix * vec4(world, 1.0);
    float depth = -vpos.z;
    float pxSz  = a_sz * (u_res.y * 0.065) / max(depth, 0.1);
    gl_PointSize = clamp(pxSz, 0.4, 11.0);
    gl_Position  = projectionMatrix * vpos;

    v_vel   = clamp(vel * 1.6, 0.0, 1.0);
    v_depth = clamp(depth / 20.0, 0.0, 1.0);
    v_alpha = 1.0 - smoothstep(11.0, 20.0, depth);
  }
`;

/* ─── Fragment Shader ─────────────────────────────────────────────────────── */
const FRAG = /* glsl */`
  precision highp float;

  varying float v_vel;
  varying float v_depth;
  varying float v_alpha;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float r    = length(uv);
    if (r > 0.5) discard;
    float soft = 1.0 - smoothstep(0.22, 0.5, r);

    vec3 blue   = vec3(0.000, 0.463, 0.714);
    vec3 chrome = vec3(0.690, 0.718, 0.737);
    vec3 dark   = vec3(0.000, 0.353, 0.557);

    float t   = mix(v_vel, 1.0 - v_depth * 0.55, 0.30);
    vec3  col = mix(dark, mix(blue, chrome, v_vel), t);
    col *= mix(0.40, 1.20, 1.0 - v_depth);

    gl_FragColor = vec4(col, soft * v_alpha * 0.78);
  }
`;

/* ─── Particle Field ──────────────────────────────────────────────────────── */
function ParticleField({
  count,
  activeRef,
  isReduced,
}: {
  count: number;
  activeRef: React.MutableRefObject<boolean>;
  isReduced: boolean;
}) {
  const matRef   = useRef<THREE.ShaderMaterial>(null!);
  const mouseW   = useRef(new THREE.Vector3(0, 0, 0));
  const mouseT   = useRef(new THREE.Vector3(0, 0, 0));
  const { camera, size } = useThree();

  const { positions, seeds, sizes } = useMemo(() => {
    const rng = seededRng(0xdeadbeef);
    const pos = new Float32Array(count * 3);
    const sd  = new Float32Array(count);
    const sz  = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (rng() - 0.5) * 24;
      pos[i * 3 + 1] = (rng() - 0.5) * 16;
      pos[i * 3 + 2] = (rng() - 0.5) * 16;
      sd[i]          = rng();
      sz[i]          = 0.7 + rng() * 1.4;
    }
    return { positions: pos, seeds: sd, sizes: sz };
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx =  (e.clientX / window.innerWidth)  * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      const vec = new THREE.Vector3(nx, ny, 0.5).unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const t   = -camera.position.z / dir.z;
      mouseT.current.copy(camera.position).addScaledVector(dir, t);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [camera]);

  const uniforms = useMemo(() => ({
    u_time:    { value: 0 },
    u_mouse3d: { value: new THREE.Vector3() },
    u_repR:    { value: 3.0 },
    u_repF:    { value: 2.5 },
    u_res:     { value: new THREE.Vector2(size.width, size.height) },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  useFrame(({ clock }) => {
    if (!activeRef.current || isReduced) return;
    mouseW.current.lerp(mouseT.current, 0.07);
    const u = matRef.current.uniforms;
    u.u_time.value = clock.getElapsedTime();
    u.u_mouse3d.value.copy(mouseW.current);
    u.u_res.value.set(size.width, size.height);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-a_seed"   count={count} array={seeds}     itemSize={1} />
        <bufferAttribute attach="attributes-a_sz"     count={count} array={sizes}     itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Camera Parallax ─────────────────────────────────────────────────────── */
function CameraParallax({ isReduced }: { isReduced: boolean }) {
  const { camera } = useThree();
  const tgt  = useRef({ x: 0, y: 0 });
  const cur  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isReduced) return;
    const onMove = (e: MouseEvent) => {
      tgt.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      tgt.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isReduced]);

  useFrame(() => {
    if (isReduced) return;
    cur.current.x += (tgt.current.x - cur.current.x) * 0.032;
    cur.current.y += (tgt.current.y - cur.current.y) * 0.032;
    camera.position.set(cur.current.x * 1.4, cur.current.y * 0.85, 10);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── Post-processing ─────────────────────────────────────────────────────── */
function Effects() {
  return (
    <EffectComposer>
      <Bloom
        mipmapBlur
        luminanceThreshold={0.05}
        luminanceSmoothing={0.82}
        intensity={2.0}
        radius={0.82}
      />
      <Vignette
        offset={0.18}
        darkness={0.94}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

/* ─── Full Scene ──────────────────────────────────────────────────────────── */
function ParticleScene({
  count,
  activeRef,
  isReduced,
}: {
  count: number;
  activeRef: React.MutableRefObject<boolean>;
  isReduced: boolean;
}) {
  return (
    <>
      <color attach="background" args={['#060a10']} />
      <CameraParallax isReduced={isReduced} />
      <ParticleField count={count} activeRef={activeRef} isReduced={isReduced} />
      {!isReduced && <Effects />}
    </>
  );
}

/* ─── Canvas wrapper ──────────────────────────────────────────────────────── */
function ParticleCanvas({
  activeRef,
  isReduced,
}: {
  activeRef: React.MutableRefObject<boolean>;
  isReduced: boolean;
}) {
  const dpr = Math.min(window.devicePixelRatio, 1.5);

  return (
    <Canvas
      frameloop={isReduced ? 'demand' : 'always'}
      dpr={dpr}
      camera={{ fov: 65, near: 0.1, far: 120, position: [0, 0, 10] }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ParticleScene count={50_000} activeRef={activeRef} isReduced={isReduced} />
      </Suspense>
    </Canvas>
  );
}

/* ─── Root export ─────────────────────────────────────────────────────────── */
/*   Runs capability checks synchronously before any WebGL context is created. */
/*   Mobile / low-end / non-WebGL2 → static CSS gradient, zero GPU work.       */
export default function ParticleHero() {
  const [mounted,   setMounted]   = useState(false);
  const [useWebGL,  setUseWebGL]  = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef    = useRef(true);

  /* Capability check + deferred mount */
  useEffect(() => {
    const capable = canUseWebGL();
    if (!capable) {
      setMounted(true); // show static bg immediately
      return;
    }

    const ric = (window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback;

    if (ric) {
      ric(() => { setUseWebGL(true); setMounted(true); }, { timeout: 1500 });
    } else {
      setTimeout(() => { setUseWebGL(true); setMounted(true); }, 80);
    }
  }, []);

  /* Pause rAF when hero scrolls out of view */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { activeRef.current = e.isIntersecting; },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isReduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    >
      {mounted && !useWebGL && <StaticHeroBg />}

      {mounted && useWebGL && (
        <WebGLErrorBoundary fallback={<StaticHeroBg />}>
          <ParticleCanvas activeRef={activeRef} isReduced={isReduced} />
        </WebGLErrorBoundary>
      )}
    </div>
  );
}

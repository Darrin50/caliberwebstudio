'use client';

/**
 * ParticleHero — GPU curl-noise particle field
 * 50 K particles (12 K mobile), custom ShaderMaterial on THREE.Points,
 * divergence-free curl noise computed entirely on the GPU via vertex shader,
 * two-octave FBM, mouse-driven spherical repulsor, Bloom + Vignette post.
 *
 * Brand palette: #0076B6 (primary) / #B0B7BC (chrome) / #005a8e (dark) / #0a0a0b (bg)
 */

import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ─── Seeded deterministic RNG (xorshift) ─────────────────────────────────── */
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
  uniform float u_repR;        /* repulsor radius  */
  uniform float u_repF;        /* repulsor force   */
  uniform vec2  u_res;         /* viewport px      */

  attribute float a_seed;
  attribute float a_sz;

  varying float v_vel;
  varying float v_depth;
  varying float v_alpha;

  /* ── Hash (cheap, GPU-friendly) ──────────────────────────────────────── */
  float hash(vec3 p) {
    p  = fract(p * vec3(443.8975, 397.2973, 491.1871));
    p += dot(p, p.yzx + 19.19);
    return fract(p.x * p.y * p.z);
  }

  /* ── Smooth 3-D value noise ───────────────────────────────────────────── */
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

  /* ── True divergence-free curl noise ─────────────────────────────────── */
  /*   curl(F) where F = (F0,F1,F2) with phase-offset fields               */
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
    /* Animate the noise domain — particles flow as the field evolves */
    float ts = u_time * 0.052;
    vec3 np  = position * 0.30 + vec3(ts, ts * 0.73, ts * 0.51) + vec3(a_seed * 3.14159);

    /* Two-octave FBM curl — large sweeping flows + fine turbulence */
    vec3 c  = curlN(np)                              /* octave 1 */
            + curlN(np * 2.1 + vec3(5.7, 3.2, 8.1)) * 0.42; /* octave 2 */

    float vel  = length(c);
    vec3 world = position + c * 4.0;

    /* Mouse repulsion */
    vec3 diff = world - u_mouse3d;
    float d   = length(diff);
    if (d < u_repR && d > 0.001) {
      float f = pow(1.0 - d / u_repR, 2.0) * u_repF;
      world  += normalize(diff) * f;
    }

    /* View-space depth → point size (perspective scaling) */
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
    /* Circular soft point */
    vec2  uv   = gl_PointCoord - 0.5;
    float r    = length(uv);
    if (r > 0.5) discard;
    float soft = 1.0 - smoothstep(0.22, 0.5, r);

    /* Brand palette only */
    vec3 blue   = vec3(0.000, 0.463, 0.714);  /* #0076B6 — primary   */
    vec3 chrome = vec3(0.690, 0.718, 0.737);  /* #B0B7BC — chrome    */
    vec3 dark   = vec3(0.000, 0.353, 0.557);  /* #005a8e — deep blue */

    /* Low velocity / far = deep blue; high velocity / near = chrome */
    float t   = mix(v_vel, 1.0 - v_depth * 0.55, 0.30);
    vec3  col = mix(dark, mix(blue, chrome, v_vel), t);

    /* Depth brightness — near particles shine, far ones are dim */
    col *= mix(0.40, 1.20, 1.0 - v_depth);

    /* Additive blending: alpha drives glow intensity */
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

  /* Generate initial distribution */
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

  /* Mouse → world-space position at z=0 plane */
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

  /* Uniforms created once */
  const uniforms = useMemo(() => ({
    u_time:  { value: 0 },
    u_mouse3d: { value: new THREE.Vector3() },
    u_repR:  { value: 3.0 },
    u_repF:  { value: 2.5 },
    u_res:   { value: new THREE.Vector2(size.width, size.height) },
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
    camera.position.set(
      cur.current.x * 1.4,
      cur.current.y * 0.85,
      10,
    );
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
      {/* Deep navy-black bg — matches brand --bg (#0a0a0b) with faint blue tint */}
      <color attach="background" args={['#060a10']} />

      <CameraParallax isReduced={isReduced} />
      <ParticleField count={count} activeRef={activeRef} isReduced={isReduced} />

      {!isReduced && <Effects />}
    </>
  );
}

/* ─── Canvas wrapper ──────────────────────────────────────────────────────── */
/*   Lazy-mounts via requestIdleCallback after first paint.                    */
/*   IntersectionObserver pauses rAF loop when section is off-screen.         */
export default function ParticleHero() {
  const [mounted,  setMounted]  = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef    = useRef(true);

  /* Defer canvas mount until browser is idle after LCP */
  useEffect(() => {
    const ric = (window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback;
    if (ric) {
      ric(() => setMounted(true), { timeout: 1500 });
    } else {
      setTimeout(() => setMounted(true), 80);
    }
  }, []);

  /* Pause rAF when section scrolls out of view */
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

  const isMobile  = typeof window !== 'undefined' && window.innerWidth < 768;
  const isReduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = isMobile ? 12_000 : 50_000;
  const dpr   = Math.min(
    typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    1.5,
  );

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    >
      {mounted && (
        <Canvas
          frameloop={isReduced ? 'demand' : 'always'}
          dpr={dpr}
          camera={{ fov: 65, near: 0.1, far: 120, position: [0, 0, 10] }}
          gl={{
            antialias: !isMobile,
            powerPreference: 'high-performance',
            alpha: false,
          }}
          style={{ width: '100%', height: '100%', display: 'block' }}
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <ParticleScene count={count} activeRef={activeRef} isReduced={isReduced} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

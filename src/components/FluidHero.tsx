'use client';

/**
 * FluidHero — brand-blue fluid gradient shader, fullscreen quad, zero postprocessing.
 *
 * Architecture: raw WebGL1 (widest device support), single fullscreen quad,
 * one fragment shader pass — no FBOs, no bloom, no extra passes.
 * Same pattern as HeroShader; proven safe on mobile Chrome.
 *
 * Shader: domain-warped FBM (fbm-of-fbm) driving brand palette gradients.
 * Brand colors: #0076B6 / #005a8e / #B0B7BC / #0a0a0b — no other hues.
 * Mouse: subtle warp toward cursor position via uMouse uniform.
 * Grain: baked into the fragment shader (no extra pass).
 *
 * Mobile: same shader, DPR capped at 1.0. Desktop: DPR capped at 1.5.
 * prefers-reduced-motion: renders one frame then stops.
 * Fallback: static CSS radial gradient if WebGL context creation fails.
 */

import { Component, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/* ─── Static CSS fallback ─────────────────────────────────────────────────── */
function StaticBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 90% 70% at 40% 50%, #05111f 0%, #030b14 50%, #040810 100%)',
        zIndex: 0,
      }}
    />
  );
}

/* ─── Error boundary ──────────────────────────────────────────────────────── */
class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <StaticBg /> : this.props.children;
  }
}

/* ─── Shaders ─────────────────────────────────────────────────────────────── */
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2  uMouse;
uniform vec2  uRes;

/* Gradient noise (smooth, no banding) */
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float gnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i           ), f           ),
        dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
        dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
    u.y);
}

/* 4-octave FBM */
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * gnoise(p);
    p  = rot * p * 0.5 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv  = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p   = uv * vec2(asp, 1.0) * 1.6;
  float t  = uTime * 0.065;

  /* Domain warping: q = fbm(p), r = fbm(p + q), f = fbm(p + r)    */
  /* Creates the flowing organic look — Inigo Quilez pattern         */
  vec2 q = vec2(
    fbm(p                        + vec2(0.0, 0.0) + t),
    fbm(p + vec2(5.2, 1.3)      + t * 0.7)
  );
  vec2 r = vec2(
    fbm(p + 3.8 * q + vec2(1.7, 9.2) + t * 0.45),
    fbm(p + 3.8 * q + vec2(8.3, 2.8) + t * 0.28)
  );
  float f = fbm(p + 3.5 * r);

  /* Mouse warp — gaussian push toward cursor, barely perceptible */
  float md = length(uv - uMouse);
  f += 0.09 * exp(-md * md * 4.0);

  f = clamp(f * 0.5 + 0.52, 0.0, 1.0);

  /* Darken the center (text zone) — keeps H1 area in near-black regardless of flow */
  /* smoothstep(a,b,x) is undefined when a>b in GLSL WebGL1 — use correct order     */
  float centerBias = 1.0 - 0.30 * (1.0 - smoothstep(0.0, 0.55, length(uv - vec2(0.5, 0.42))));
  f *= centerBias;

  /* Brand palette — neutral-first, blue as faint edge accent only */
  vec3 bg    = vec3(0.024, 0.024, 0.027);  /* #0a0a0b  near-black                  */
  vec3 dkgray= vec3(0.068, 0.075, 0.082);  /* #111318  dark charcoal               */
  vec3 chrom = vec3(0.220, 0.240, 0.255);  /* #383d41  muted chrome (darkened)      */
  vec3 silver= vec3(0.690, 0.718, 0.737);  /* #B0B7BC  chrome highlight             */
  vec3 blue  = vec3(0.000, 0.463, 0.714);  /* #0076B6  accent — corners/peaks only  */

  /* Dominant: near-black → dark charcoal → muted chrome */
  vec3 col = bg;
  col = mix(col,   dkgray, smoothstep(0.18, 0.48, f));
  col = mix(col,   chrom,  smoothstep(0.44, 0.70, f) * 0.55);
  /* Silver shimmer at high-energy peaks */
  col += silver * smoothstep(0.65, 0.80, f) * 0.07;
  /* Blue: barely-there accent only at the very top of the wave — 15% weight */
  col = mix(col,   blue,   smoothstep(0.72, 0.88, f) * 0.15);

  /* Grain — baked in, no extra pass */
  float g = fract(sin(dot(gl_FragCoord.xy + uTime * 53.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.020;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

/* ─── WebGL helpers ───────────────────────────────────────────────────────── */
function makeShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s) ?? 'shader error');
  return s;
}

function makeProgram(gl: WebGLRenderingContext): WebGLProgram {
  const p = gl.createProgram()!;
  gl.attachShader(p, makeShader(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, makeShader(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(p) ?? 'link error');
  return p;
}

/* ─── Canvas component ─────────────────────────────────────────────────────── */
function FluidCanvas({ onError }: { onError: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf = 0;
    let ro: ResizeObserver | null = null;
    let gl: WebGLRenderingContext | null = null;
    let prog: WebGLProgram | null = null;
    let buf: WebGLBuffer | null = null;

    try {
      gl = (canvas.getContext('webgl') ??
            canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      if (!gl) { onError(); return; }

      prog = makeProgram(gl);
      gl.useProgram(prog);

      buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array([-1, -1,  1, -1, -1,  1,  1,  1]),
        gl.STATIC_DRAW,
      );
      const aPos = gl.getAttribLocation(prog, 'a_pos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const uTime  = gl.getUniformLocation(prog, 'uTime');
      const uMouse = gl.getUniformLocation(prog, 'uMouse');
      const uRes   = gl.getUniformLocation(prog, 'uRes');

      const isMobile = window.innerWidth < 768;
      const dpr      = Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5);
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

      const resize = () => {
        if (!gl) return;
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        canvas.width  = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();
      ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const onMove = (e: MouseEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.tx = (e.clientX - r.left) / r.width;
        mouse.ty = 1.0 - (e.clientY - r.top) / r.height;
      };
      window.addEventListener('mousemove', onMove);

      const start = performance.now();
      const tick = () => {
        if (!gl || !prog) return;
        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;
        const t = (performance.now() - start) * 0.001;
        gl.uniform1f(uTime, t);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (!isReduced) raf = requestAnimationFrame(tick);
      };
      tick();

      // Store cleanup fn on canvas for the return
      (canvas as HTMLCanvasElement & { _cleanup?: () => void })._cleanup = () => {
        window.removeEventListener('mousemove', onMove);
        ro?.disconnect();
        cancelAnimationFrame(raf);
        if (gl && prog) gl.deleteProgram(prog);
        if (gl && buf)  gl.deleteBuffer(buf);
      };
    } catch (err) {
      console.warn('[FluidHero] WebGL init failed:', err);
      onError();
    }

    return () => {
      (canvas as HTMLCanvasElement & { _cleanup?: () => void })._cleanup?.();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
      }}
    />
  );
}

/* ─── Inner — manages fallback state ─────────────────────────────────────── */
function FluidHeroInner() {
  const [failed, setFailed] = useState(false);
  if (failed) return <StaticBg />;
  return <FluidCanvas onError={() => setFailed(true)} />;
}

/* ─── Root export ─────────────────────────────────────────────────────────── */
export default function FluidHero() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    >
      <WebGLBoundary>
        <FluidHeroInner />
      </WebGLBoundary>
    </div>
  );
}

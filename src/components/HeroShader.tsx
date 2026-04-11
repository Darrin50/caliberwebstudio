'use client';

import { useEffect, useRef } from 'react';

// ─── Vertex shader — full-screen quad passthrough ────────────────────────────
const VERT = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// ─── Fragment shader — Detroit dusk sky + SDF skyline ───────────────────────
const FRAG = `
  precision highp float;

  uniform float u_time;
  uniform vec2  u_res;

  /* ── Hash / Smooth noise / FBM ────────────────────────────────────────── */
  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 74.27);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),            hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  /* ── Building box helper ───────────────────────────────────────────────── */
  float bh(float x, float l, float r, float h) {
    return (step(l, x) - step(r, x)) * h;
  }

  /* ── Detroit skyline — height(x), x in [0,1] ──────────────────────────── */
  /* uv.y = 0 at screen bottom, 1 at top.                                    */
  /* Values represent fraction of screen height.                              */
  float skyline(float x) {
    float h = 0.0;

    /* Left distant buildings */
    h = max(h, bh(x, 0.020, 0.075, 0.10));
    h = max(h, bh(x, 0.075, 0.130, 0.14));
    h = max(h, bh(x, 0.130, 0.185, 0.18));
    h = max(h, bh(x, 0.185, 0.235, 0.13));

    /* ── Guardian Building — stepped Art-Deco spire ~x 0.27‥0.36 ── */
    h = max(h, bh(x, 0.270, 0.360, 0.22)); /* broad base              */
    h = max(h, bh(x, 0.280, 0.350, 0.28)); /* first step              */
    h = max(h, bh(x, 0.290, 0.340, 0.33)); /* second step             */
    h = max(h, bh(x, 0.300, 0.328, 0.37)); /* spire base              */
    h = max(h, bh(x, 0.308, 0.320, 0.42)); /* spire shaft             */
    h = max(h, bh(x, 0.312, 0.316, 0.46)); /* needle tip              */

    /* Filler between Guardian and Ren Cen */
    h = max(h, bh(x, 0.360, 0.388, 0.19));

    /* ── Ren Cen — 5-tower complex ~x 0.39‥0.56 ── */
    h = max(h, bh(x, 0.388, 0.560, 0.17)); /* podium base             */
    h = max(h, bh(x, 0.392, 0.420, 0.29)); /* outer-left tower        */
    h = max(h, bh(x, 0.420, 0.448, 0.34)); /* inner-left tower        */
    h = max(h, bh(x, 0.448, 0.494, 0.43)); /* CENTER — tallest        */
    h = max(h, bh(x, 0.494, 0.522, 0.34)); /* inner-right tower       */
    h = max(h, bh(x, 0.522, 0.550, 0.29)); /* outer-right tower       */

    /* Filler between Ren Cen and Book Tower */
    h = max(h, bh(x, 0.550, 0.595, 0.20));

    /* ── Book Tower — Gothic-pointed spire ~x 0.60‥0.66 ── */
    h = max(h, bh(x, 0.595, 0.655, 0.24)); /* body                    */
    h = max(h, bh(x, 0.606, 0.644, 0.29)); /* upper section           */
    h = max(h, bh(x, 0.614, 0.636, 0.34)); /* spire base              */
    h = max(h, bh(x, 0.620, 0.630, 0.38)); /* spire shaft             */
    h = max(h, bh(x, 0.624, 0.626, 0.41)); /* needle                  */

    /* Right distant buildings */
    h = max(h, bh(x, 0.655, 0.710, 0.17));
    h = max(h, bh(x, 0.710, 0.760, 0.21));
    h = max(h, bh(x, 0.760, 0.810, 0.15));
    h = max(h, bh(x, 0.810, 0.865, 0.12));
    h = max(h, bh(x, 0.865, 0.930, 0.08));

    return h;
  }

  /* ── Sky gradient (t = 0 horizon, t = 1 zenith) ───────────────────────── */
  vec3 skyGrad(float t, float nb, float time) {
    float drift = sin(time * 0.055) * 0.07 + cos(time * 0.038) * 0.05;

    vec3 horizon = vec3(0.82, 0.38 + drift * 0.25,  0.07);  /* amber-orange  */
    vec3 midAtmo = vec3(0.22,  0.09,                 0.32 + drift * 0.4); /* violet */
    vec3 zenith  = vec3(0.04,  0.06,                 0.13); /* deep navy     */

    vec3 col;
    if (t < 0.38) {
      col = mix(
        horizon  + vec3( nb * 0.12, nb * 0.05, 0.0),
        midAtmo  + vec3(-nb * 0.05, 0.0,       nb * 0.08),
        t / 0.38
      );
    } else {
      col = mix(
        midAtmo,
        zenith + vec3(-nb * 0.03, 0.0, nb * 0.06),
        (t - 0.38) / 0.62
      );
    }
    return clamp(col, 0.0, 1.0);
  }

  /* ── Stars ─────────────────────────────────────────────────────────────── */
  float stars(vec2 uv, float time) {
    vec2 gv = fract(uv * 88.0) - 0.5;
    vec2 id = floor(uv * 88.0);
    float h  = hash(id);
    if (h > 0.980) {
      float twinkle = 0.55 + 0.45 * sin(time * 2.2 + h * 28.0);
      return smoothstep(0.09, 0.0, length(gv)) * twinkle;
    }
    return 0.0;
  }

  /* ── Window lights inside silhouette ───────────────────────────────────── */
  float windows(vec2 uv, float time) {
    vec2 cell = vec2(88.0, 44.0);
    vec2 gv   = fract(uv * cell);
    vec2 id   = floor(uv * cell);
    float h   = hash(id);
    if (h > 0.58) {
      float flicker = step(0.12, sin(h * 91.7 + time * (0.15 + h * 0.9)));
      float wx = step(0.14, gv.x) * step(gv.x, 0.78);
      float wy = step(0.10, gv.y) * step(gv.y, 0.84);
      return wx * wy * flicker;
    }
    return 0.0;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res; /* 0,0 = bottom-left */

    float t   = u_time;
    float sh  = skyline(uv.x);

    vec3 col;

    if (uv.y < sh) {
      /* ── Building silhouette ────────────────────────────────────────── */
      col = vec3(0.024, 0.028, 0.048);

      /* Sky glow bleeding over roofline */
      float glowFade = smoothstep(sh - 0.12, sh, uv.y);
      col += vec3(0.16, 0.07, 0.015) * glowFade * 0.55;

      /* Window lights */
      col += vec3(0.96, 0.83, 0.44) * windows(uv, t) * 0.22;

      /* Ground-level faint blue glow (street lights / river reflection) */
      col += vec3(0.03, 0.04, 0.12) * smoothstep(0.06, 0.0, uv.y) * 0.8;

    } else {
      /* ── Sky ────────────────────────────────────────────────────────── */
      float skyT = (uv.y - sh) / max(1.0 - sh, 0.001);

      /* Animated atmosphere noise */
      vec2 nc = uv * vec2(1.4, 2.2) + vec2(t * 0.028, t * 0.014);
      float nb = fbm(nc);

      col = skyGrad(skyT, nb, t);

      /* Stars appear in the upper 70% of sky */
      float starMask = smoothstep(0.20, 0.50, skyT);
      col += stars(uv + vec2(t * 0.0008, 0.0), t) * starMask * vec3(0.85, 0.90, 1.0);

      /* Warm haze just above roofline */
      float haze = exp(-skyT * 7.5) * 0.55;
      col = mix(col, vec3(0.88, 0.42, 0.10), haze);
    }

    /* ── Roofline warm bleed (city light scatter) ───────────────────── */
    float edge = smoothstep(0.038, 0.0, abs(uv.y - sh));
    col += vec3(0.70, 0.30, 0.06) * edge * 0.35;

    /* ── Vignette ───────────────────────────────────────────────────── */
    vec2 vig  = uv * 2.0 - 1.0;
    float vgn = pow(
      clamp(1.0 - dot(vig * vec2(0.42, 0.60), vig * vec2(0.42, 0.60)), 0.0, 1.0),
      0.45
    );
    col *= mix(0.22, 1.0, vgn);

    /* ── Tone map + gamma ───────────────────────────────────────────── */
    col  = col / (col + 0.55);
    col  = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ─── WebGL helpers ───────────────────────────────────────────────────────────
function makeShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('[HeroShader] compile:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function makeProgram(
  gl: WebGLRenderingContext,
  vert: WebGLShader,
  frag: WebGLShader,
): WebGLProgram | null {
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, vert);
  gl.attachShader(p, frag);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('[HeroShader] link:', gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Reduced-motion → render one static frame, no rAF ──────────────────
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // ── Mobile → same static treatment ────────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const staticMode = prefersReduced || isMobile;

    let rafId = 0;
    let visible = true;
    let gl: WebGLRenderingContext | null = null;
    let prog: WebGLProgram | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uRes: WebGLUniformLocation | null = null;
    const startTime = performance.now();

    // ── IntersectionObserver — pause rAF when off-screen ──────────────────
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { rootMargin: '200px' }
    );
    io.observe(canvas);

    // ── DPR-aware resize ──────────────────────────────────────────────────
    function resize() {
      if (!gl || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = Math.round(canvas.clientWidth  * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      if (uRes) gl.uniform2f(uRes, w, h);
    }

    // ── Render one frame ──────────────────────────────────────────────────
    function draw(t: number) {
      if (!gl || !prog) return;
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (uTime) gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    // ── rAF loop ──────────────────────────────────────────────────────────
    function loop() {
      if (visible) draw((performance.now() - startTime) * 0.001);
      rafId = requestAnimationFrame(loop);
    }

    // ── WebGL initialisation ──────────────────────────────────────────────
    function initGL() {
      if (!canvas) return;
      gl = (canvas.getContext('webgl') ??
            canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      if (!gl) return; // silently degrade — CSS bg fallback handles it

      const vs = makeShader(gl, gl.VERTEX_SHADER,   VERT);
      const fs = makeShader(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return;

      prog = makeProgram(gl, vs, fs);
      if (!prog) return;

      gl.useProgram(prog);

      // Fullscreen quad (two triangles)
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1,  1, -1,  -1,  1,
                          -1,  1,  1, -1,   1,  1]),
        gl.STATIC_DRAW,
      );
      const loc = gl.getAttribLocation(prog, 'a_pos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      uTime = gl.getUniformLocation(prog, 'u_time');
      uRes  = gl.getUniformLocation(prog, 'u_res');

      window.addEventListener('resize', resize);
      resize();

      if (staticMode) {
        // Single frame — no loop
        draw(0);
      } else {
        rafId = requestAnimationFrame(loop);
      }
    }

    // ── Defer init until browser is idle (after first paint) ──────────────
    const ric = (window as typeof window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) {
      ric(initGL, { timeout: 1500 });
    } else {
      setTimeout(initGL, 100);
    }

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('resize', resize);
      if (gl && prog) {
        gl.deleteProgram(prog);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width:  '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

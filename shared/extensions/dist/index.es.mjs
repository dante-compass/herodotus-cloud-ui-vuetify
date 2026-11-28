import { computed as e, createElementBlock as t, createElementVNode as n, createVNode as r, defineComponent as i, normalizeClass as a, normalizeStyle as o, onBeforeMount as s, onBeforeUnmount as c, onMounted as l, onUnmounted as u, openBlock as d, ref as f, renderSlot as p, shallowRef as m, useTemplateRef as h, watch as g } from "vue";
import { Mesh as _, Program as v, Renderer as y, Texture as b, Triangle as x } from "ogl";
import { tsParticles as S } from "@tsparticles/engine";
import { loadTrianglesPreset as C } from "@tsparticles/preset-triangles";
// src/HAnimate/HBitsGalaxy.vue?vue&type=script&setup=true&lang.ts
var w = 8, T = 4, E = 2.2, D = "#version 300 es\nin vec2 aPosition;\nvoid main() {\n  gl_Position = vec4(aPosition, 0.0, 1.0);\n}", O = /* @__PURE__ */ i({
	name: "HBitsGalaxy",
	__name: "HBitsGalaxy",
	props: {
		focal: { default: () => [.5, .5] },
		rotation: { default: () => [1, 0] },
		starSpeed: { default: .5 },
		density: { default: 1 },
		hueShift: { default: 140 },
		disableAnimation: {
			type: Boolean,
			default: !1
		},
		speed: { default: 1 },
		mouseInteraction: {
			type: Boolean,
			default: !0
		},
		glowIntensity: { default: .3 },
		saturation: { default: 0 },
		mouseRepulsion: {
			type: Boolean,
			default: !0
		},
		repulsionStrength: { default: 2 },
		twinkleIntensity: { default: .3 },
		rotationSpeed: { default: .1 },
		autoCenterRepulsion: { default: 0 },
		transparent: {
			type: Boolean,
			default: !0
		},
		lightMode: {
			type: Boolean,
			default: !1
		},
		starColors: { default: void 0 },
		starSize: { default: 1 },
		flareIntensity: { default: 1 },
		layers: { default: 4 },
		direction: { default: "forward" },
		clickWarp: {
			type: Boolean,
			default: !0
		},
		intro: {
			type: Boolean,
			default: !0
		},
		backgroundColor: { default: void 0 },
		opacity: { default: 1 },
		dpr: { default: void 0 },
		className: { default: "" },
		style: { default: void 0 }
	},
	setup(r) {
		let i = `#version 300 es
precision highp float;
precision highp int;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uGloss;
uniform float uDepth;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uStarGlow;
uniform float uFlareGain;
uniform float uSquash;
uniform float uSaturation;
uniform float uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationAngle;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform int uLayers;
uniform vec3 uColors[${T}];
uniform int uColorCount;
uniform float uWarp;
uniform float uReveal;
uniform float uMode;
uniform vec3 uBackground;
uniform float uOpacity;
out vec4 outColor;

#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare, vec2 radial, float invReach) {
#ifdef WARP
  float along = dot(uv, radial);
  float d = sqrt(max(dot(uv, uv) - uSquash * along * along, 0.0));
#else
  float d = length(uv);
#endif
  float m = uStarGlow / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uFlareGain;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uFlareGain;
  m *= smoothstep(1.0, 0.2, d * invReach);
#ifdef WARP
  m *= mix(1.0, smoothstep(1.0, 0.55, length(uv) * invReach), min(uWarp * 4.0, 1.0));
#endif
  return m;
}

vec3 StarLayer(vec2 uv, vec2 radial, vec2 repelAt, float pushCells, float spread) {
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + offset;
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uGloss / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

#ifdef PALETTE
      float pick = Hash21(si + 7.0) * float(uColorCount);
      vec3 base = uColors[int(min(floor(pick), float(uColorCount - 1)))];
#else
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));
#endif

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
      vec2 shift = vec2(0.0);
      float invReach = 1.0;
#ifdef REPEL
      vec2 away = si + 0.5 + pad - repelAt;
      float dist = length(away);
      float q = dist * spread;
      float cells = pushCells * exp(-q * q);
      float moved = cells * inversesqrt(1.0 + cells * cells * 2.78);
      shift = away * (moved / max(dist, 0.0001));
      invReach = 1.0 / (1.0 - moved);
#endif
      float star = Star(gv - offset - pad - shift, flareSize, radial, invReach);
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      col += star * twinkle * size * base;
    }
  }
  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution;
  vec2 uv = (gl_FragCoord.xy - focalPx) / uResolution.y;
  vec2 mouseNorm = uMouse - vec2(0.5);

  vec2 repelAt = vec2(0.0);
  float strength = 0.0;
  float push = 0.0;
  if (uAutoCenterRepulsion > 0.0) {
    strength = uAutoCenterRepulsion;
    push = strength * 0.05;
  } else if (uMouseRepulsion > 0.5) {
    repelAt = (uMouse * uResolution - focalPx) / uResolution.y;
    strength = max(uRepulsionStrength, 0.0);
    push = strength * 0.05 * uMouseActiveFactor;
  } else {
    uv += mouseNorm * 0.1 * uMouseActiveFactor;
  }
  float radius = 0.16 + 0.04 * strength;

  vec2 radial = length(uv) > 0.0001 ? normalize(uv) : vec2(1.0, 0.0);
  float angle = uRotationAngle;
  uv = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
  radial = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * radial;
  radial = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * radial;
  repelAt = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * repelAt;
  repelAt = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * repelAt;

  vec3 col = vec3(0.0);
  float layers = float(uLayers);
  for (int k = 0; k < ${w}; k++) {
    if (k >= uLayers) break;
    float i = float(k) / layers;
    float depth = fract(i + uDepth);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    vec2 offset = vec2(i * 453.32);
    col += StarLayer(uv * scale + offset, radial, repelAt * scale + offset, push * scale, 1.0 / (scale * radius)) * fade;
  }
  col *= uReveal;

  if (uMode > 1.5) {
    vec3 lit = col * smoothstep(0.0, 0.3, length(col));
    float energy = max(max(lit.r, lit.g), lit.b);
    vec3 tint = lit / max(energy, 0.0001);
    vec3 ink = tint * (0.16 / max(dot(tint, vec3(0.2126, 0.7152, 0.0722)), 0.16));
    float coverage = pow(min(energy * 1.3, 1.0), 1.3) * 0.92 * uOpacity;
    outColor = uMode > 2.5 ? vec4(ink * coverage, coverage) : vec4(mix(uBackground, ink, coverage), 1.0);
  } else if (uMode > 0.5) {
    float alpha = min(smoothstep(0.0, 0.3, length(col)), 1.0) * uOpacity;
    outColor = vec4(col * alpha, alpha);
  } else {
    outColor = vec4(mix(uBackground, col, uOpacity), 1.0);
  }
}`, s = (e, t, n) => Math.min(n, Math.max(t, e)), c = (e, t, n) => (e ? 4 : 0) + (t ? 2 : 0) + +!!n, p = (e, t, n, r) => {
			let a = `${t ? "#define PALETTE\n" : ""}${n ? "#define REPEL\n" : ""}${r ? "#define WARP\n" : ""}`, o = e.createProgram(), s = e.createShader(e.VERTEX_SHADER), c = e.createShader(e.FRAGMENT_SHADER);
			return !o || !s || !c ? null : (e.shaderSource(s, D), e.shaderSource(c, i.replace("\n", `\n${a}`)), e.compileShader(s), e.compileShader(c), e.attachShader(o, s), e.attachShader(o, c), e.bindAttribLocation(o, 0, "aPosition"), e.linkProgram(o), e.deleteShader(s), e.deleteShader(c), o);
		}, m = (e, t) => {
			if (!e.getProgramParameter(t, e.LINK_STATUS)) return null;
			let n = {}, r = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
			for (let i = 0; i < r; i++) {
				let r = e.getActiveUniform(t, i);
				r && (n[r.name.replace("[0]", "")] = e.getUniformLocation(t, r.name));
			}
			return {
				program: t,
				uniforms: n
			};
		}, h = r, _ = f(null), v = f(null), y = null, b = null, x = e(() => {
			let e = Array.isArray(h.starColors) ? h.starColors.filter(Boolean).slice(0, T) : [];
			return {
				focal: Array.isArray(h.focal) ? h.focal : [.5, .5],
				rotation: Array.isArray(h.rotation) ? h.rotation : [1, 0],
				starSpeed: h.starSpeed,
				density: Math.max(.01, h.density),
				hueShift: h.hueShift,
				disableAnimation: h.disableAnimation,
				speed: h.speed,
				mouseInteraction: h.mouseInteraction,
				glowIntensity: Math.max(0, h.glowIntensity),
				saturation: Math.max(0, h.saturation),
				mouseRepulsion: h.mouseRepulsion,
				repulsionStrength: h.repulsionStrength,
				twinkleIntensity: s(h.twinkleIntensity, 0, 1),
				rotationSpeed: h.rotationSpeed,
				autoCenterRepulsion: Math.max(0, h.autoCenterRepulsion),
				transparent: h.transparent,
				lightMode: h.lightMode,
				palette: e,
				starSize: Math.max(0, h.starSize),
				flareIntensity: Math.max(0, h.flareIntensity),
				layers: s(Math.round(h.layers), 2, w),
				reverse: h.direction === "backward",
				clickWarp: h.clickWarp,
				intro: h.intro,
				backgroundColor: h.backgroundColor,
				opacity: s(h.opacity, 0, 1),
				dpr: h.dpr
			};
		});
		return g(x, () => {
			y?.();
		}), l(() => {
			let e = _.value, t = v.value, n = t?.getContext("webgl2", {
				alpha: !0,
				premultipliedAlpha: !0,
				antialias: !1,
				depth: !1,
				stencil: !1
			});
			if (!e || !t || !n) return;
			let r = n.getExtension("KHR_parallel_shader_compile"), i = /* @__PURE__ */ new Map(), a = (e, t, r) => {
				let a = c(e, t, r), o = i.get(a);
				return o || (o = {
					program: p(n, e, t, r),
					linked: null,
					done: !1
				}, i.set(a, o)), o;
			}, o = (e, t, i, o) => {
				let s = a(e, t, i);
				if (!s.done && s.program) {
					if (!o && r && !n.getProgramParameter(s.program, r.COMPLETION_STATUS_KHR)) return null;
					s.linked = m(n, s.program), s.done = !0;
				}
				return s.linked;
			}, l = x.value;
			if (!o(l.palette.length > 0, !1, !1, !0)) {
				i.forEach((e) => e.program && n.deleteProgram(e.program));
				return;
			}
			let u = n.createBuffer(), d = n.createVertexArray();
			n.bindVertexArray(d), n.bindBuffer(n.ARRAY_BUFFER, u), n.bufferData(n.ARRAY_BUFFER, new Float32Array([
				-1,
				-1,
				3,
				-1,
				-1,
				3
			]), n.STATIC_DRAW), n.enableVertexAttribArray(0), n.vertexAttribPointer(0, 2, n.FLOAT, !1, 0, 0);
			let f = document.createElement("canvas").getContext("2d", { willReadFrequently: !0 }), h = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, g = /* @__PURE__ */ new Map(), S = (e, t) => {
				if (!e) return t;
				let n = String(e), r = g.get(n);
				if (r) return r;
				let i = t;
				if (f) {
					f.clearRect(0, 0, 1, 1), f.fillStyle = "#000000", f.fillStyle = n, f.fillRect(0, 0, 1, 1);
					let [e, t, r] = f.getImageData(0, 0, 1, 1).data;
					i = [
						e / 255,
						t / 255,
						r / 255
					];
				}
				return g.set(n, i), i;
			}, C = /* @__PURE__ */ new Float32Array(12), w = {
				x: .5,
				y: .5,
				inside: !1
			}, T = {
				time: 0,
				gloss: 0,
				depth: 0,
				angle: 0,
				mx: .5,
				my: .5,
				active: 0,
				boost: 0,
				reveal: x.value.intro && !h ? 0 : 1
			}, D = 0, O = 0, k = !0, A = () => {
				let e = x.value;
				e.palette.forEach((e, t) => C.set(S(e, [
					1,
					1,
					1
				]), t * 3));
				let r = e.lightMode ? e.transparent ? 3 : 2 : +!!e.transparent, i = S(e.backgroundColor, e.lightMode ? [
					1,
					1,
					1
				] : [
					0,
					0,
					0
				]), a = T.reveal, s = e.palette.length > 0, c = e.autoCenterRepulsion > 0 || e.mouseRepulsion && e.repulsionStrength > 0 && T.active > 0, l = T.boost > 0, u = o(s, !1, !1, !0);
				if (!u) return;
				let f = (c || l ? o(s, c, l, !1) : null) ?? u, p = f.uniforms;
				n.viewport(0, 0, t.width, t.height), n.useProgram(f.program), n.bindVertexArray(d), n.uniform1f(p.uTime, T.time), n.uniform2f(p.uResolution, t.width, t.height), n.uniform2f(p.uFocal, e.focal[0], e.focal[1]), n.uniform2f(p.uRotation, e.rotation[0], e.rotation[1]), n.uniform1f(p.uGloss, T.gloss), n.uniform1f(p.uDepth, T.depth), n.uniform1f(p.uDensity, e.density), n.uniform1f(p.uHueShift, e.hueShift), n.uniform1f(p.uSpeed, e.speed), n.uniform2f(p.uMouse, T.mx, T.my);
				let m = 1 + T.boost * 5;
				n.uniform1f(p.uStarGlow, .05 * e.glowIntensity * e.starSize / m ** .6), n.uniform1f(p.uFlareGain, e.glowIntensity * e.flareIntensity), n.uniform1f(p.uSquash, 1 - 1 / (m * m)), n.uniform1f(p.uSaturation, e.saturation), n.uniform1f(p.uMouseRepulsion, +!!e.mouseRepulsion), n.uniform1f(p.uTwinkleIntensity, e.twinkleIntensity), n.uniform1f(p.uRotationAngle, T.angle), n.uniform1f(p.uRepulsionStrength, e.repulsionStrength), n.uniform1f(p.uMouseActiveFactor, T.active), n.uniform1f(p.uAutoCenterRepulsion, e.autoCenterRepulsion), n.uniform1i(p.uLayers, e.layers), n.uniform3fv(p.uColors, C), n.uniform1i(p.uColorCount, e.palette.length), n.uniform1f(p.uWarp, T.boost);
				let h = Math.min(1, a / .35);
				n.uniform1f(p.uReveal, h * h * (3 - 2 * h)), n.uniform1f(p.uMode, r), n.uniform3fv(p.uBackground, i), n.uniform1f(p.uOpacity, e.opacity), n.drawArrays(n.TRIANGLES, 0, 3);
			}, j = (e) => {
				if (D = 0, !k || document.hidden) return;
				let t = x.value, n = O ? s((e - O) / 1e3, 5e-4, .05) : 1 / 60;
				O = e;
				let r = t.disableAnimation || h ? 0 : 1;
				t.intro && !h && T.reveal < 1 ? (T.reveal = Math.min(1, T.reveal + n / E), T.boost = Math.max(T.boost, (1 - T.reveal) ** 2 * 1.4)) : (!t.intro || h) && (T.reveal = 1);
				let i = t.starSpeed / 10 * (t.reverse ? -1 : 1);
				T.time += n * r, T.gloss += n * i * r, T.depth += n * i * t.speed * r * (1 + T.boost * 14), T.angle += n * t.rotationSpeed * r, T.boost *= Math.exp(-n * 1.3), T.boost < .001 && (T.boost = 0);
				let a = 1 - Math.exp(-n / .325), o = t.mouseInteraction && w.inside && !h;
				o && (T.mx += (w.x - T.mx) * a, T.my += (w.y - T.my) * a);
				let c = +!!o;
				T.active += (c - T.active) * a, Math.abs(c - T.active) < .001 && (T.active = c), A(), r > 0 || T.boost > 0 || T.active !== c || T.reveal < 1 ? D = requestAnimationFrame(j) : O = 0;
			}, M = () => {
				!D && k && !document.hidden && (D = requestAnimationFrame(j));
			}, N = () => {
				let n = x.value, r = Math.max(1, e.clientWidth), i = Math.max(1, e.clientHeight), a = Math.min(n.dpr || window.devicePixelRatio || 1, 2);
				t.width = Math.max(1, Math.round(r * a)), t.height = Math.max(1, Math.round(i * a)), A(), M();
			}, P = (t) => {
				let n = e.getBoundingClientRect(), r = t.clientX - n.left, i = t.clientY - n.top;
				w.inside = r >= 0 && i >= 0 && r <= n.width && i <= n.height, w.x = r / Math.max(1, n.width), w.y = 1 - i / Math.max(1, n.height);
			}, F = (e) => {
				P(e), M();
			}, I = (e) => {
				let t = x.value;
				P(e), w.inside && t.clickWarp && !h && (T.boost = Math.min(1.6, T.boost + 1), M());
			}, L = (e) => {
				e.pointerType !== "mouse" && (w.inside = !1);
			}, R = () => {
				w.inside = !1;
			}, z = () => {
				O = 0, M();
			}, ee = new ResizeObserver(N);
			ee.observe(e);
			let B = new IntersectionObserver((e) => {
				k = e.some((e) => e.isIntersecting), k && (O = 0, M());
			});
			B.observe(e), window.addEventListener("pointermove", F, { passive: !0 }), window.addEventListener("pointerdown", I, { passive: !0 }), window.addEventListener("pointerup", L, { passive: !0 }), window.addEventListener("pointercancel", L, { passive: !0 }), document.documentElement.addEventListener("pointerleave", R), document.addEventListener("visibilitychange", z), N();
			let te = l.autoCenterRepulsion > 0 || l.mouseInteraction && l.mouseRepulsion, V = l.palette.length > 0;
			(l.clickWarp || l.intro) && a(V, !1, !0), te && a(V, !0, !1), te && l.clickWarp && a(V, !0, !0);
			let H = x.value.dpr;
			y = () => {
				let e = x.value;
				e.dpr === H ? (D || A(), M()) : (H = e.dpr, N());
			}, b = () => {
				cancelAnimationFrame(D), y = null, ee.disconnect(), B.disconnect(), window.removeEventListener("pointermove", F), window.removeEventListener("pointerdown", I), window.removeEventListener("pointerup", L), window.removeEventListener("pointercancel", L), document.documentElement.removeEventListener("pointerleave", R), document.removeEventListener("visibilitychange", z), i.forEach((e) => e.program && n.deleteProgram(e.program)), n.deleteBuffer(u), n.deleteVertexArray(d), t.isConnected || n.getExtension("WEBGL_lose_context")?.loseContext();
			};
		}), u(() => {
			b?.(), b = null;
		}), (e, i) => (d(), t("div", {
			ref_key: "containerRef",
			ref: _,
			class: a(["galaxy-container", r.className].filter(Boolean).join(" ")),
			style: o(r.style)
		}, [n("canvas", {
			ref_key: "canvasRef",
			ref: v,
			class: "galaxy-canvas",
			"aria-hidden": "true"
		}, null, 512)], 6));
	}
}), k = 2400, A = 5, j = 2.6, M = 7.5, N = .56, P = 24, F = "#version 300 es\nprecision highp float;\n", I = /* @__PURE__ */ i({
	name: "HBitsGhostFibers",
	__name: "HBitsGhostFibers",
	props: {
		glowColor: { default: "#42b883" },
		lineColor: { default: void 0 },
		secondaryColor: { default: void 0 },
		gradient: { default: "depth" },
		speed: { default: .5 },
		scale: { default: 1 },
		rotation: { default: 18 },
		rollSpeed: { default: .15 },
		layers: { default: 3 },
		waves: { default: 1 },
		twist: { default: 1.2 },
		threads: { default: 72 },
		volume: { default: .7 },
		spread: { default: 1 },
		density: { default: 1 },
		thickness: { default: 1 },
		flow: { default: .4 },
		fiberStyle: { default: "dots" },
		tips: { default: 0 },
		foldGlow: { default: 1 },
		perspective: { default: .65 },
		depthOfField: { default: .85 },
		focusDepth: { default: 0 },
		particles: { default: .5 },
		sparkle: { default: .5 },
		glow: { default: .8 },
		brightness: { default: 1 },
		vignette: { default: .3 },
		grain: { default: .06 },
		mouseInteraction: {
			type: Boolean,
			default: !0
		},
		hoverEffect: { default: "focus" },
		mouseStrength: { default: 1 },
		pulseOnClick: {
			type: Boolean,
			default: !0
		},
		intro: {
			type: Boolean,
			default: !0
		},
		lightMode: {
			type: Boolean,
			default: !1
		},
		paused: {
			type: Boolean,
			default: !1
		},
		dpr: { default: void 0 },
		className: { default: "" }
	},
	setup(r) {
		let i = {
			focus: 0,
			part: 1,
			none: 2
		}, o = {
			dots: 0,
			dashes: .45,
			lines: 1
		}, s = {
			depth: 0,
			along: 1,
			across: 2
		}, u = [
			0,
			.75,
			.35
		], p = [
			[
				0,
				0,
				0,
				0
			],
			[
				1.9,
				-4.6,
				-.08,
				2.4
			],
			[
				-1.05,
				2,
				.12,
				4.1
			]
		], m = [
			1,
			.5,
			.55
		], h = Math.PI / 180, _ = 1 / (2 * Math.tan(N / 2)), v = `${F}

uniform float uTime;
uniform float uTwist;
uniform float uRoll;
uniform float uWaves;
uniform float uWidth;
uniform float uRibbon;
uniform mat3 uOrient;
uniform float uScale;
uniform vec4 uPlace;
uniform float uVolume;

float hash11(float n) {
  return fract(sin(n * 91.3458) * 47453.5453);
}

vec3 centerLocal(float s) {
  float t = uTime;
  float ph = uPlace.w;
  float x = s * ${P.toFixed(1)};
  float y = uWaves * (0.52 * sin(x * 0.43 + t * 0.31 + ph) + 0.26 * sin(x * 0.79 - t * 0.23 + 1.3 + ph * 0.7)) + uPlace.x + x * uPlace.z;
  float z = uWaves * 0.65 * sin(x * 0.33 + t * 0.19 + 0.7 + ph * 1.3) + uPlace.y;
  return vec3(x, y, z);
}

float twistAt(float s, float layer) {
  float x = s * ${P.toFixed(1)};
  return uTwist * 0.483 * x + uRoll + uPlace.w * 0.6 + layer * uVolume * 0.42 + 0.5 * sin(x * 0.26 + uTime * 0.27 + uPlace.w);
}

vec3 ribbonPoint(float s, float v, float n, float layer, out vec3 normal) {
  vec3 c0 = centerLocal(s);
  vec3 c1 = centerLocal(s + 0.004);
  vec3 tangent = normalize(c1 - c0);
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 n0 = normalize(up - tangent * dot(up, tangent));
  vec3 b0 = cross(tangent, n0);
  float th = twistAt(s, layer);
  vec3 across = cos(th) * n0 + sin(th) * b0;
  vec3 sheet = -sin(th) * n0 + cos(th) * b0;
  float halfWidth = uWidth * (0.78 + 0.22 * cos(s * 3.14159));
  vec3 local = c0 + across * v * halfWidth + sheet * (n + layer * uVolume * 0.16) * halfWidth;
  normal = uOrient * sheet;
  return uOrient * (local * uScale);
}

uniform mat4 uViewProj;
uniform vec3 uEye;
uniform vec2 uViewport;
uniform float uDpr;
uniform float uFibers;
uniform float uDots;
uniform float uFlow;
uniform float uSize;
uniform float uFocus;
uniform float uDof;
uniform float uMaxCoc;
uniform float uFocal;
uniform float uIntro;
uniform vec4 uPulse;
uniform vec4 uHover;
uniform float uPart;
uniform float uDotLength;
uniform float uSparkle;
uniform float uDepthSpread;
uniform float uGain;
uniform float uTips;
uniform float uTint;
uniform float uGradient;
uniform float uFold;

out vec2 vLocal;
out float vRadius;
out float vSegment;
out vec3 vLight;
out float vTint;

vec3 project(vec3 world, out float depth) {
  vec4 clip = uViewProj * vec4(world, 1.0);
  depth = clip.w;
  vec2 ndc = clip.xy / clip.w;
  return vec3((ndc * 0.5 + 0.5) * uViewport, clip.w);
}

vec2 part(vec2 px) {
  if (uPart <= 0.0 || uHover.w <= 0.0) return px;
  vec2 away = px - uHover.xy;
  float dist = length(away);
  float radius = uHover.z;
  float push = uPart * uHover.w * radius * 0.55 * exp(-dist * dist / (radius * radius));
  return px + away / max(dist, 1e-3) * push * smoothstep(0.0, radius * 0.25, dist);
}

void main() {
  int perFiber = int(uDots);
  int fiber = gl_InstanceID / perFiber;
  int bead = gl_InstanceID - fiber * perFiber;
  float fi = float(fiber);
  float fk = float(bead);

  float seed = hash11(fi * 1.731 + uRibbon * 17.0);
  float s = fract((fk + uFlow + seed * uDots) / uDots) - 0.5;
  float sNext = s + 1.0 / uDots;
  float layer = mod(fi, 3.0) - 1.0;
  float slot = floor(fi / 3.0);
  float perLayer = max(floor(uFibers / 3.0), 1.0);
  float v = ((slot + 0.5) / perLayer) * 2.0 - 1.0 + (hash11(fi * 3.113 + 4.0) - 0.5) * (1.6 / perLayer) + layer * 0.12 / perLayer;
  float depthOffset = (hash11(fi * 7.919 + 2.0) - 0.5) * uDepthSpread * (0.35 + 6.0 * s * s);

  vec3 normal;
  vec3 world = ribbonPoint(s, v, depthOffset, layer, normal);
  vec3 nextNormal;
  vec3 nextWorld = ribbonPoint(sNext, v, depthOffset, layer, nextNormal);

  float depth;
  vec3 p0 = project(world, depth);
  float nextDepth;
  vec3 p1 = project(nextWorld, nextDepth);
  vec2 px = part(p0.xy);
  vec2 pxNext = part(p1.xy);

  float baseRadius = max(0.5 * uSize * uDpr * uFocal / max(depth, 0.1), 0.45);
  float coc = min(uDof * abs(1.0 - uFocus / max(depth, 0.1)) * uViewport.y * 0.035, uMaxCoc * uDpr);
  float radius = baseRadius + coc;
  float spill = max(10.0 * uDpr, baseRadius);
  float energy = pow(baseRadius / min(radius, spill), 1.25) * pow(min(1.0, spill / radius), 2.0);

  vec3 toEye = normalize(uEye - world);
  float facing = abs(dot(normalize(normal), toEye));
  float focalPx = uViewport.y * ${_.toFixed(5)} / max(depth, 0.1);
  float widthPx = 2.0 * uWidth * uScale * focalPx;
  float stack = (widthPx * facing + 2.0 * baseRadius) / (widthPx + 2.0 * baseRadius);
  float spacingFace = length(nextWorld - world) * focalPx;
  float trail = (length(p1.xy - p0.xy) + 2.0 * baseRadius) / (spacingFace + 2.0 * baseRadius);
  float crowd = sqrt(clamp(stack * trail, 0.002, 1.0));
  float fold = pow(1.0 - facing, 6.0) * uFold;
  float endFade = smoothstep(0.5, 0.4, abs(s)) * smoothstep(1.6, 4.2, depth);
  float tipEnd = mix(0.6, 0.06 + 0.26 * hash11(fi * 9.137 + uPlace.w * 3.0), uTips);
  float tip = exp(-pow((s - tipEnd) / 0.0065, 2.0)) * uTips;
  endFade *= smoothstep(tipEnd + 0.003, tipEnd - 0.001, s);
  float appear = smoothstep(0.0, 0.12, uIntro * 1.3 - (s + 0.5) - seed * 0.12);
  float twinklePhase = hash11(fi * 13.7 + fk * 0.917 + uRibbon * 3.0);
  float twinkle = pow(max(sin(uTime * (1.2 + 2.6 * twinklePhase) * 3.0 + twinklePhase * 61.0), 0.0), 36.0) * uSparkle * (1.0 - 0.85 * uDotLength);
  float pulseGap = abs(s - uPulse.x) - uPulse.y * 0.42;
  float pulse = uPulse.z * exp(-pulseGap * pulseGap / 0.0018) * (abs(uPulse.w - uRibbon) < 0.5 ? 1.0 : 0.35);
  float strength = mix(0.45, 1.0, hash11(fi * 5.37 + 1.0)) * mix(1.0, 0.72, abs(layer) * uVolume);
  float intensity = energy * crowd * strength * endFade * appear * 0.8 * uGain * (1.0 + fold * 7.0 + twinkle * 5.0 + pulse * 4.0 + tip * 7.0);
  float highlight = clamp(fold * 0.55 + twinkle + pulse + tip, 0.0, 1.0);

  vec2 segment = (pxNext - px) * uDotLength;
  float segmentLength = length(segment);
  intensity *= mix(1.0, (2.0 * radius) / (segmentLength + 2.0 * radius) * 1.6, uDotLength);
  vec2 axis = segmentLength > 1e-3 ? segment / segmentLength : vec2(1.0, 0.0);
  vec2 perp = vec2(-axis.y, axis.x);
  vec2 corner = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1.0 : 0.0, gl_VertexID >= 2 ? 1.0 : 0.0);
  float along = mix(-radius, segmentLength + radius, corner.x);
  float across = mix(-radius, radius, corner.y);
  vec2 position = px + axis * along + perp * across;

  vLocal = vec2(along, across);
  vRadius = radius;
  vSegment = segmentLength;
  vLight = vec3(intensity, highlight, coc / max(radius, 1e-3));
  float depthTint = clamp(uTint + smoothstep(uFocus, uFocus + 5.0, depth) * 0.5, 0.0, 1.0);
  vTint = uGradient < 0.5 ? depthTint : uGradient < 1.5 ? smoothstep(-0.42, 0.42, s) : clamp(v * 0.5 + 0.5, 0.0, 1.0);
  if (intensity < 0.0005) position = vec2(-1e4);
  gl_Position = vec4(position / uViewport * 2.0 - 1.0, 0.0, 1.0);
}`, y = `${F}
uniform mat4 uViewProj;
uniform vec2 uViewport;
uniform float uDpr;
uniform float uTime;
uniform float uSize;
uniform float uFocus;
uniform float uDof;
uniform float uMaxCoc;
uniform float uFocal;
uniform float uIntro;
uniform float uSparkle;
uniform float uScale;
uniform float uGradient;
uniform float uGain;

out vec2 vLocal;
out float vRadius;
out float vSegment;
out vec3 vLight;
out float vTint;

float hash11(float n) {
  return fract(sin(n * 91.3458) * 47453.5453);
}

void main() {
  float id = float(gl_InstanceID);
  vec3 seed = vec3(hash11(id * 1.37 + 0.3), hash11(id * 2.91 + 1.7), hash11(id * 4.17 + 2.9));
  vec3 box = vec3(9.0, 5.4, 6.0);
  vec3 p = (seed - 0.5) * box;
  p.z -= 0.6;
  p += 0.18 * vec3(sin(uTime * 0.21 + seed.x * 40.0), sin(uTime * 0.17 + seed.y * 40.0), sin(uTime * 0.13 + seed.z * 40.0));
  p *= mix(1.0, uScale, 0.5);
  vec4 clip = uViewProj * vec4(p, 1.0);
  float depth = clip.w;
  vec2 px = (clip.xy / clip.w * 0.5 + 0.5) * uViewport;
  float size = uSize * mix(0.5, 1.4, hash11(id * 7.7));
  float baseRadius = max(0.5 * size * uDpr * uFocal / max(depth, 0.1), 0.45);
  float coc = min(uDof * abs(1.0 - uFocus / max(depth, 0.1)) * uViewport.y * 0.035, uMaxCoc * uDpr * 1.6);
  float radius = baseRadius + coc;
  float spill = max(10.0 * uDpr, baseRadius);
  float energy = pow(baseRadius / min(radius, spill), 0.9) * pow(min(1.0, spill / radius), 2.0);
  float twinkle = pow(max(sin(uTime * (0.8 + 1.6 * seed.y) * 2.0 + seed.z * 50.0), 0.0), 8.0);
  float intensity = energy * (0.35 + 0.65 * twinkle) * mix(0.4, 1.0, seed.x) * smoothstep(0.3, 1.0, uIntro) * (depth > 0.2 ? 1.0 : 0.0);
  vec2 corner = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1.0 : 0.0, gl_VertexID >= 2 ? 1.0 : 0.0) * 2.0 - 1.0;
  vec2 position = px + corner * radius;
  vLocal = corner * radius;
  vRadius = radius;
  vSegment = 0.0;
  vLight = vec3(intensity * 0.8 * uGain, 0.3 + 0.6 * twinkle * uSparkle, coc / max(radius, 1e-3));
  vTint = uGradient < 0.5 ? 0.45 + 0.55 * seed.y : seed.y;
  gl_Position = vec4(position / uViewport * 2.0 - 1.0, 0.0, 1.0);
}`, b = `${F}
uniform vec3 uGlowColor;
uniform vec3 uLineColor;
uniform vec3 uSecondaryColor;
in vec2 vLocal;
in float vRadius;
in float vSegment;
in vec3 vLight;
in float vTint;
out vec4 outColor;
void main() {
  float along = clamp(vLocal.x, 0.0, vSegment);
  float d = length(vec2(vLocal.x - along, vLocal.y));
  float rho = d / max(vRadius, 1e-3);
  if (rho > 1.0) discard;
  float soft = clamp(2.6 / max(vRadius, 1e-3), 0.14, 1.0);
  float disk = 1.0 - smoothstep(1.0 - soft, 1.0, rho);
  float bokeh = disk * (0.94 + 0.08 * smoothstep(0.55, 0.95, rho));
  float core = exp(-rho * rho * 3.2);
  float shape = mix(core, bokeh, smoothstep(0.25, 0.7, vLight.z));
  vec3 color = mix(mix(uGlowColor, uSecondaryColor, vTint), uLineColor, vLight.y);
  outColor = vec4(color * shape * vLight.x, shape * vLight.x);
}`, x = `${F}
out vec2 vUv;
void main() {
  vec2 p = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`, S = `${F}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
vec3 pick(vec2 uv) {
  vec3 c = texture(uSource, uv).rgb;
  float peak = max(max(c.r, c.g), c.b);
  return c * smoothstep(0.35, 1.2, peak);
}
void main() {
  vec2 o = uTexel;
  vec3 c = pick(vUv + vec2(-o.x, -o.y)) + pick(vUv + vec2(o.x, -o.y)) + pick(vUv + vec2(-o.x, o.y)) + pick(vUv + vec2(o.x, o.y));
  outColor = vec4(c * 0.25, 1.0);
}`, C = `${F}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec2 o = uTexel;
  vec3 c = texture(uSource, vUv).rgb * 4.0;
  c += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb;
  c += texture(uSource, vUv + vec2(o.x, -o.y)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, o.y)).rgb;
  c += texture(uSource, vUv + vec2(o.x, o.y)).rgb;
  outColor = vec4(c / 8.0, 1.0);
}`, w = `${F}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec2 o = uTexel;
  vec3 c = texture(uSource, vUv + vec2(-o.x * 2.0, 0.0)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(0.0, o.y * 2.0)).rgb;
  c += texture(uSource, vUv + vec2(o.x, o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(o.x * 2.0, 0.0)).rgb;
  c += texture(uSource, vUv + vec2(o.x, -o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(0.0, -o.y * 2.0)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb * 2.0;
  outColor = vec4(c / 12.0, 1.0);
}`, T = `${F}
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uGlow;
uniform float uBrightness;
uniform float uLightMode;
uniform float uGrain;
uniform float uVignette;
uniform float uFrame;
uniform vec2 uView;
uniform float uDpr;
in vec2 vUv;
out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float smoother(float x) {
  x = clamp(x, 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

void main() {
  vec4 scene = texture(uScene, vUv);
  vec3 bloom = texture(uBloom, vUv).rgb;
  vec3 light = (scene.rgb + bloom * uGlow) * uBrightness;
  float reach = max(uVignette * 0.3, 1e-4);
  float mask = uVignette > 0.0 ? smoother(vUv.x / reach) * smoother((1.0 - vUv.x) / reach) * smoother(vUv.y / reach) * smoother((1.0 - vUv.y) / reach) : 1.0;
  vec2 cell = floor(vUv * uView / max(uDpr, 1.0));
  float grain = hash(cell + uFrame * 17.31) + hash(cell * 1.31 + uFrame * 3.7 + 9.1) - 1.0;
  if (uLightMode > 0.5) {
    float amount = scene.a * uBrightness;
    float ink = (1.0 - exp(-amount * 1.5)) * mask;
    ink = clamp(ink * (1.0 + grain * uGrain * 2.0), 0.0, 1.0);
    vec3 hue = clamp(scene.rgb / max(scene.a, 1e-4), 0.0, 1.0);
    vec3 tone = hue * mix(1.0, 0.72, clamp(amount * 0.35, 0.0, 1.0));
    outColor = vec4(tone * ink, ink);
    return;
  }
  vec3 color = (1.0 - exp(-light * 1.25)) * mask;
  float peak = max(color.r, max(color.g, color.b));
  color = max(color + grain * uGrain * (0.25 + 0.75 * sqrt(peak)), 0.0);
  outColor = vec4(color, max(color.r, max(color.g, color.b)));
}`, E = /* @__PURE__ */ "uTime.uTwist.uRoll.uWaves.uWidth.uRibbon.uOrient.uScale.uPlace.uVolume.uViewProj.uEye.uViewport.uDpr.uFibers.uDots.uFlow.uSize.uFocus.uDof.uMaxCoc.uFocal.uIntro.uPulse.uHover.uPart.uDotLength.uSparkle.uDepthSpread.uGain.uTips.uTint.uGradient.uFold.uGlowColor.uLineColor.uSecondaryColor".split("."), D = [
			"uViewProj",
			"uViewport",
			"uDpr",
			"uTime",
			"uSize",
			"uFocus",
			"uDof",
			"uMaxCoc",
			"uFocal",
			"uIntro",
			"uSparkle",
			"uScale",
			"uGradient",
			"uGain",
			"uGlowColor",
			"uLineColor",
			"uSecondaryColor"
		], O = ["uSource", "uTexel"], I = [
			"uScene",
			"uBloom",
			"uGlow",
			"uBrightness",
			"uLightMode",
			"uGrain",
			"uVignette",
			"uFrame",
			"uView",
			"uDpr"
		], L = (e, t, n) => Math.min(n, Math.max(t, e)), R = (e, t, n) => {
			let r = e.createShader(t);
			return r ? (e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (e.deleteShader(r), null)) : null;
		}, z = (e, t, n, r) => {
			let i = R(e, e.VERTEX_SHADER, t), a = R(e, e.FRAGMENT_SHADER, n), o = e.createProgram();
			if (!i || !a || !o) return null;
			if (e.attachShader(o, i), e.attachShader(o, a), e.linkProgram(o), e.deleteShader(i), e.deleteShader(a), !e.getProgramParameter(o, e.LINK_STATUS)) return e.deleteProgram(o), null;
			let s = {};
			for (let t of r) s[t] = e.getUniformLocation(o, t);
			return {
				program: o,
				uniforms: s
			};
		}, ee = (e, t, n, r) => {
			let i = 1 / Math.tan(e / 2), a = 1 / (n - r);
			return [
				i / t,
				0,
				0,
				0,
				0,
				i,
				0,
				0,
				0,
				0,
				(r + n) * a,
				-1,
				0,
				0,
				2 * r * n * a,
				0
			];
		}, B = (e, t) => {
			let n = Array(16);
			for (let r = 0; r < 4; r += 1) for (let i = 0; i < 4; i += 1) n[r * 4 + i] = e[i] * t[r * 4] + e[4 + i] * t[r * 4 + 1] + e[8 + i] * t[r * 4 + 2] + e[12 + i] * t[r * 4 + 3];
			return n;
		}, te = (e, t, n) => {
			let r = Math.cos(e), i = Math.sin(e), a = Math.cos(t), o = Math.sin(t), s = Math.cos(n), c = Math.sin(n), l = [
				r,
				0,
				-i,
				0,
				1,
				0,
				i,
				0,
				r
			], u = [
				1,
				0,
				0,
				0,
				a,
				o,
				0,
				-o,
				a
			], d = [
				s,
				c,
				0,
				-c,
				s,
				0,
				0,
				0,
				1
			], f = (e, t) => {
				let n = Array(9);
				for (let r = 0; r < 3; r += 1) for (let i = 0; i < 3; i += 1) n[r * 3 + i] = e[i] * t[r * 3] + e[3 + i] * t[r * 3 + 1] + e[6 + i] * t[r * 3 + 2];
				return n;
			};
			return f(d, f(u, l));
		}, V = (e, t) => [
			e[0] * t[0] + e[3] * t[1] + e[6] * t[2],
			e[1] * t[0] + e[4] * t[1] + e[7] * t[2],
			e[2] * t[0] + e[5] * t[1] + e[8] * t[2]
		], H = r, U = f(null), W = f(null), G = null, K, q = e(() => ({
			glowColor: String(H.glowColor),
			lineColor: H.lineColor ? String(H.lineColor) : "",
			secondaryColor: H.secondaryColor ? String(H.secondaryColor) : "",
			gradient: s[H.gradient] ?? 0,
			speed: Math.max(0, H.speed),
			scale: L(H.scale, .3, 3),
			rotation: H.rotation * h,
			rollSpeed: H.rollSpeed,
			layers: L(Math.round(H.layers), 1, 3),
			waves: Math.max(0, H.waves),
			twist: Math.max(0, H.twist),
			threads: L(Math.round(H.threads), 6, 180),
			volume: L(H.volume, 0, 2),
			spread: L(H.spread, .2, 3),
			density: L(H.density, .2, 3),
			thickness: L(H.thickness, .2, 4),
			flow: H.flow,
			dotLength: o[H.fiberStyle] ?? 0,
			tips: L(H.tips, 0, 1),
			foldGlow: L(H.foldGlow, 0, 3),
			perspective: L(H.perspective, 0, 1),
			depthOfField: L(H.depthOfField, 0, 2),
			focusDepth: L(H.focusDepth, -1, 1),
			particles: L(H.particles, 0, 2),
			sparkle: L(H.sparkle, 0, 2),
			glow: Math.max(0, H.glow),
			brightness: Math.max(0, H.brightness),
			vignette: L(H.vignette, 0, 1),
			grain: Math.max(0, H.grain),
			mouseInteraction: H.mouseInteraction,
			hover: i[H.hoverEffect] ?? 0,
			mouseStrength: Math.max(0, H.mouseStrength),
			pulseOnClick: H.pulseOnClick,
			intro: H.intro,
			lightMode: H.lightMode,
			paused: H.paused,
			dpr: H.dpr
		})), J = () => {
			let e = U.value, t = W.value, n = t?.getContext("webgl2", {
				alpha: !0,
				premultipliedAlpha: !0,
				antialias: !1,
				depth: !1,
				stencil: !1
			});
			if (!e || !t || !n) return;
			let r = !!n.getExtension("EXT_color_buffer_float"), i = z(n, v, b, E), a = z(n, y, b, D), o = z(n, x, S, O), s = z(n, x, C, O), c = z(n, x, w, O), l = z(n, x, T, I);
			if (!i || !a || !o || !s || !c || !l) return;
			let d = r ? n.RGBA16F : n.RGBA8, f = () => ({
				texture: null,
				framebuffer: n.createFramebuffer(),
				width: 0,
				height: 0
			}), h = (e, t, r) => {
				if (e.texture && e.width === t && e.height === r) return;
				e.texture && n.deleteTexture(e.texture);
				let i = n.createTexture();
				n.bindTexture(n.TEXTURE_2D, i), n.texStorage2D(n.TEXTURE_2D, 1, d, t, r), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.bindFramebuffer(n.FRAMEBUFFER, e.framebuffer), n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, i, 0), e.texture = i, e.width = t, e.height = r;
			}, g = f(), _ = Array.from({ length: A }, f), F = n.createVertexArray(), R = document.createElement("canvas");
			R.width = 1, R.height = 1;
			let H = R.getContext("2d", { willReadFrequently: !0 }), K = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, J = {
				time: 0,
				roll: 0,
				flow: 0,
				frame: 0,
				intro: q.value.intro && !K ? 0 : j,
				width: 1,
				height: 1,
				fit: 1,
				colorKey: "",
				glow: [
					.26,
					.72,
					.51
				],
				line: [
					.79,
					.92,
					.86
				],
				secondary: [
					.21,
					.58,
					.41
				],
				pointer: {
					x: 0,
					y: 0,
					inside: !1
				},
				hover: {
					x: 0,
					y: 0,
					presence: 0,
					placed: !1
				},
				look: {
					x: 0,
					y: 0,
					vx: 0,
					vy: 0
				},
				focus: M + q.value.focusDepth * 3,
				pulse: {
					s: 0,
					age: 9,
					strength: 0,
					ribbon: 0
				},
				camera: null
			}, Y = 0, X = 0, Z = !0, ne = !0, re = (e, t) => {
				if (!H || !e) return t;
				let n = /^[0-9a-f]{3,8}$/i.test(e) ? `#${e}` : e;
				H.clearRect(0, 0, 1, 1), H.fillStyle = "#000000", H.fillStyle = n, H.fillRect(0, 0, 1, 1);
				let [r, i, a] = H.getImageData(0, 0, 1, 1).data;
				return [
					r / 255,
					i / 255,
					a / 255
				];
			}, ie = (e) => {
				let t = `${e.glowColor}|${e.lineColor}|${e.secondaryColor}|${e.lightMode}`;
				t !== J.colorKey && (J.colorKey = t, J.glow = re(e.glowColor, [
					.26,
					.72,
					.51
				]), J.secondary = e.secondaryColor ? re(e.secondaryColor, J.glow) : J.glow.map((e) => e * .8), e.lineColor ? J.line = re(e.lineColor, J.glow) : J.line = e.lightMode ? J.glow : J.glow.map((e) => e + (1 - e) * .72));
			}, ae = (e, t, n, r) => {
				let i = p[n], a = i[3], o = e * P;
				return [
					o,
					r * (.52 * Math.sin(o * .43 + t * .31 + a) + .26 * Math.sin(o * .79 - t * .23 + 1.3 + a * .7)) + i[0] + o * i[2],
					r * .65 * Math.sin(o * .33 + t * .19 + .7 + a * 1.3) + i[1]
				];
			}, oe = (e) => {
				let t = J.width / Math.max(J.height, 1), n = [
					0,
					0,
					M
				], r = ee(N, t, .1, 60), i = [
					1,
					0,
					0,
					0,
					0,
					1,
					0,
					0,
					0,
					0,
					1,
					0,
					-n[0],
					-n[1],
					-n[2],
					1
				], a = te(e.perspective * .85 + J.look.x * .22, .12 - J.look.y * .14, e.rotation);
				return {
					eye: n,
					viewProj: B(r, i),
					orient: a
				};
			}, se = (e, t) => {
				let n = e.viewProj, r = n[0] * t[0] + n[4] * t[1] + n[8] * t[2] + n[12], i = n[1] * t[0] + n[5] * t[1] + n[9] * t[2] + n[13], a = n[3] * t[0] + n[7] * t[1] + n[11] * t[2] + n[15];
				return {
					x: (r / a * .5 + .5) * J.width,
					y: (.5 - i / a * .5) * J.height,
					depth: a
				};
			}, ce = (e, t, n) => {
				let r = J.camera;
				if (!r) return null;
				let i = null;
				for (let a = 0; a < e.layers; a += 1) for (let o = 0; o <= 96; o += 1) {
					let s = o / 96 - .5, c = ae(s, J.time, a, e.waves).map((t) => t * e.scale * J.fit), l = V(r.orient, c), u = se(r, l), d = Math.hypot(u.x - t, u.y - n);
					(!i || d < i.gap) && (i = {
						gap: d,
						s,
						ribbon: a,
						depth: u.depth
					});
				}
				return i;
			}, Q = () => {
				let n = q.value, r = Math.max(1, e.clientWidth), i = Math.max(1, e.clientHeight), a = Math.min(n.dpr || window.devicePixelRatio || 1, 2), o = Math.max(r, i) * a, s = o > k ? a * k / o : a, c = Math.max(1, Math.round(r * s)), l = Math.max(1, Math.round(i * s));
				(t.width !== c || t.height !== l) && (t.width = c, t.height = l), J.width = r, J.height = i, J.fit = L(r / i / 1.5, .6, 1), ue();
			}, le = (e, t, r, i) => {
				n.bindFramebuffer(n.FRAMEBUFFER, t.framebuffer), n.viewport(0, 0, t.width, t.height), n.useProgram(e.program), n.activeTexture(n.TEXTURE0), n.bindTexture(n.TEXTURE_2D, r.texture), n.uniform1i(e.uniforms.uSource, 0), n.uniform2f(e.uniforms.uTexel, i[0], i[1]), n.drawArrays(n.TRIANGLES, 0, 3);
			}, ue = () => {
				let e = q.value;
				ie(e);
				let r = oe(e);
				J.camera = r;
				let d = t.height / Math.max(J.height, 1), f = e.paused || K ? 1 : L(J.intro / j, 0, 1), v = 1 - (1 - f) * (1 - f) * (1 - f);
				h(g, t.width, t.height), n.bindVertexArray(F), n.bindFramebuffer(n.FRAMEBUFFER, g.framebuffer), n.viewport(0, 0, t.width, t.height), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.enable(n.BLEND), n.blendFunc(n.ONE, n.ONE);
				let y = Math.round(260 * e.density), b = 22 * L(Math.sqrt(56e3 / (e.threads * y * e.layers)), .45, 1), x = Math.max(.8 * e.thickness, .45) ** 2 / .64, S = (e.threads / 72 * e.density * x) ** -.75;
				n.useProgram(i.program);
				let C = i.uniforms;
				n.uniform1f(C.uTime, J.time), n.uniform1f(C.uTwist, e.twist), n.uniform1f(C.uRoll, J.roll), n.uniform1f(C.uWaves, e.waves), n.uniform1f(C.uWidth, .62 * e.spread), n.uniformMatrix3fv(C.uOrient, !1, r.orient), n.uniform1f(C.uScale, e.scale * J.fit), n.uniformMatrix4fv(C.uViewProj, !1, r.viewProj), n.uniform3f(C.uEye, r.eye[0], r.eye[1], r.eye[2]), n.uniform2f(C.uViewport, t.width, t.height), n.uniform1f(C.uDpr, d), n.uniform1f(C.uFibers, e.threads), n.uniform1f(C.uDots, y), n.uniform1f(C.uFlow, J.flow), n.uniform1f(C.uSize, 1.6 * e.thickness), n.uniform1f(C.uFocus, J.focus), n.uniform1f(C.uDof, e.depthOfField), n.uniform1f(C.uMaxCoc, b), n.uniform1f(C.uFocal, M), n.uniform1f(C.uIntro, v), n.uniform4f(C.uPulse, J.pulse.s, J.pulse.age, J.pulse.strength, J.pulse.ribbon), n.uniform4f(C.uHover, J.hover.x * d, (J.height - J.hover.y) * d, 140 * d, J.hover.presence * e.mouseStrength), n.uniform1f(C.uPart, +(e.hover === 1)), n.uniform1f(C.uDotLength, e.dotLength), n.uniform1f(C.uSparkle, e.sparkle), n.uniform1f(C.uDepthSpread, .12), n.uniform1f(C.uVolume, e.volume), n.uniform3f(C.uGlowColor, J.glow[0], J.glow[1], J.glow[2]), n.uniform3f(C.uLineColor, J.line[0], J.line[1], J.line[2]), n.uniform3f(C.uSecondaryColor, J.secondary[0], J.secondary[1], J.secondary[2]), n.uniform1f(C.uTips, e.tips), n.uniform1f(C.uGradient, e.gradient), n.uniform1f(C.uFold, e.foldGlow);
				for (let t = 0; t < e.layers; t += 1) {
					let r = p[t];
					n.uniform1f(C.uRibbon, t), n.uniform4f(C.uPlace, r[0], r[1], r[2], r[3]), n.uniform1f(C.uGain, m[t] * S), n.uniform1f(C.uTint, u[t]), n.drawArraysInstanced(n.TRIANGLE_STRIP, 0, 4, e.threads * y);
				}
				let w = Math.round(420 * e.particles);
				if (w > 0) {
					n.useProgram(a.program);
					let i = a.uniforms;
					n.uniformMatrix4fv(i.uViewProj, !1, r.viewProj), n.uniform2f(i.uViewport, t.width, t.height), n.uniform1f(i.uDpr, d), n.uniform1f(i.uTime, J.time), n.uniform1f(i.uSize, 2.2 * e.thickness), n.uniform1f(i.uFocus, J.focus), n.uniform1f(i.uDof, e.depthOfField), n.uniform1f(i.uMaxCoc, 22), n.uniform1f(i.uFocal, M), n.uniform1f(i.uIntro, v), n.uniform1f(i.uSparkle, e.sparkle), n.uniform1f(i.uScale, e.scale * J.fit), n.uniform1f(i.uGradient, e.gradient), n.uniform1f(i.uGain, 1 / e.thickness), n.uniform3f(i.uGlowColor, J.glow[0], J.glow[1], J.glow[2]), n.uniform3f(i.uLineColor, J.line[0], J.line[1], J.line[2]), n.uniform3f(i.uSecondaryColor, J.secondary[0], J.secondary[1], J.secondary[2]), n.drawArraysInstanced(n.TRIANGLE_STRIP, 0, 4, w);
				}
				n.disable(n.BLEND);
				let T = e.glow > .001 && !e.lightMode;
				if (n.bindVertexArray(F), T) {
					_.forEach((e, n) => {
						h(e, Math.max(1, Math.round(t.width / 2 ** (n + 1))), Math.max(1, Math.round(t.height / 2 ** (n + 1))));
					}), le(o, _[0], g, [.5 / g.width, .5 / g.height]);
					for (let e = 1; e < A; e += 1) le(s, _[e], _[e - 1], [1 / _[e - 1].width, 1 / _[e - 1].height]);
					n.enable(n.BLEND), n.blendFunc(n.ONE, n.ONE);
					for (let e = 4; e > 0; --e) le(c, _[e - 1], _[e], [.5 / _[e].width, .5 / _[e].height]);
					n.disable(n.BLEND);
				}
				n.bindFramebuffer(n.FRAMEBUFFER, null), n.viewport(0, 0, t.width, t.height), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.useProgram(l.program);
				let E = l.uniforms;
				n.activeTexture(n.TEXTURE0), n.bindTexture(n.TEXTURE_2D, g.texture), n.activeTexture(n.TEXTURE1), n.bindTexture(n.TEXTURE_2D, T ? _[0].texture : g.texture), n.uniform1i(E.uScene, 0), n.uniform1i(E.uBloom, 1), n.uniform1f(E.uGlow, T ? e.glow : 0), n.uniform1f(E.uBrightness, e.brightness), n.uniform1f(E.uLightMode, +!!e.lightMode), n.uniform1f(E.uGrain, e.grain), n.uniform1f(E.uVignette, e.vignette), n.uniform1f(E.uFrame, J.frame % 977), n.uniform2f(E.uView, t.width, t.height), n.uniform1f(E.uDpr, d), n.drawArrays(n.TRIANGLES, 0, 3), n.activeTexture(n.TEXTURE1), n.bindTexture(n.TEXTURE_2D, null), n.activeTexture(n.TEXTURE0), n.bindTexture(n.TEXTURE_2D, null), n.bindVertexArray(null);
			}, de = (e) => {
				if (Y = 0, !ne || !Z || document.hidden) return;
				let t = q.value, n = X ? (e - X) / 1e3 : 1 / 60, r = Math.min(.05, n);
				X = e;
				let i = !t.paused && !K;
				i ? (J.frame += 1, J.time += r * t.speed, J.roll += r * t.speed * t.rollSpeed, J.flow += r * t.flow * 12, J.intro += Math.min(n, 1)) : J.intro < j && (J.intro = j), J.pulse.age += r, J.pulse.strength = Math.max(0, 1 - J.pulse.age / 1.8) ** 2;
				let { pointer: a, hover: o, look: s } = J, c = t.mouseInteraction && a.inside && !K;
				c && !o.placed && (o.x = a.x, o.y = a.y, o.placed = !0), o.x += (a.x - o.x) * (1 - Math.exp(-r / .08)), o.y += (a.y - o.y) * (1 - Math.exp(-r / .08));
				let l = +!!c;
				o.presence += (l - o.presence) * (1 - Math.exp(-r / (l > o.presence ? .3 : .6))), !c && o.presence < .001 && (o.placed = !1);
				let u = c ? (a.x / J.width - .5) * .5 : 0, d = c ? (.5 - a.y / J.height) * .5 : 0;
				s.vx += (30 * (u - s.x) - 11 * s.vx) * r, s.vy += (30 * (d - s.y) - 11 * s.vy) * r, s.x += s.vx * r, s.y += s.vy * r;
				let f = M + t.focusDepth * 3, p = f;
				if (c && t.hover === 0) {
					let e = ce(t, o.x, o.y);
					e && (p = f + (e.depth - f) * o.presence * Math.min(1, t.mouseStrength));
				}
				J.focus += (p - J.focus) * (1 - Math.exp(-r / .35)), ue();
				let m = Math.abs(l - o.presence) > .002 || Math.abs(u - s.x) > 2e-4 || Math.abs(d - s.y) > 2e-4 || Math.abs(p - J.focus) > .001 || J.pulse.strength > .001;
				i || m ? Y = requestAnimationFrame(de) : X = 0;
			}, $ = () => {
				!Y && ne && Z && !document.hidden && (Y = requestAnimationFrame(de));
			}, fe = (t) => {
				let n = e.getBoundingClientRect(), r = t.clientX - n.left, i = t.clientY - n.top;
				J.pointer.x = r, J.pointer.y = i, J.pointer.inside = r >= 0 && i >= 0 && r <= n.width && i <= n.height, $();
			}, pe = (t) => {
				let n = q.value;
				if (!n.mouseInteraction || !n.pulseOnClick || t.button !== 0 || K || t.target instanceof Element && t.target.closest("a, button, input, textarea, select, label, [role=\"button\"]")) return;
				let r = e.getBoundingClientRect(), i = t.clientX - r.left, a = t.clientY - r.top;
				if (i < 0 || a < 0 || i > r.width || a > r.height) return;
				let o = ce(n, i, a);
				o && (J.pulse = {
					s: o.s,
					age: 0,
					strength: 1,
					ribbon: o.ribbon
				}), $();
			}, me = () => {
				J.pointer.inside = !1, $();
			}, he = () => {
				X = 0, $();
			}, ge = new ResizeObserver(Q);
			ge.observe(e);
			let _e = new IntersectionObserver((e) => {
				Z = e.some((e) => e.isIntersecting), Z && (X = 0, $());
			});
			return _e.observe(e), window.addEventListener("pointermove", fe, { passive: !0 }), window.addEventListener("pointerdown", pe), document.documentElement.addEventListener("pointerleave", me), document.addEventListener("visibilitychange", he), Q(), $(), G = () => {
				Y || ue(), $();
			}, () => {
				ne = !1, cancelAnimationFrame(Y), G = null, ge.disconnect(), _e.disconnect(), window.removeEventListener("pointermove", fe), window.removeEventListener("pointerdown", pe), document.documentElement.removeEventListener("pointerleave", me), document.removeEventListener("visibilitychange", he), n.deleteVertexArray(F), [g, ..._].forEach((e) => {
					e.texture && n.deleteTexture(e.texture), n.deleteFramebuffer(e.framebuffer);
				}), [
					i,
					a,
					o,
					s,
					c,
					l
				].forEach((e) => n.deleteProgram(e.program));
			};
		};
		return l(() => {
			K = J();
		}), c(() => {
			K?.(), K = void 0;
		}), g(q, () => {
			G?.();
		}), (e, i) => (d(), t("div", {
			ref_key: "containerRef",
			ref: U,
			class: a(["ghost-fibers-container", r.className])
		}, [n("canvas", {
			ref_key: "canvasRef",
			ref: W,
			class: "ghost-fibers-canvas",
			"aria-hidden": "true"
		}, null, 512)], 2));
	}
}), L = "#version 300 es\nin vec2 position;\nin vec2 uv;\nout vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = vec4(position, 0.0, 1.0);\n}\n", R = "#version 300 es\nprecision highp float;\nprecision highp int;\n\nout vec4 fragColor;\n\nuniform vec2  uResolution;\nuniform float uTime;\n\nuniform float uIntensity;\nuniform float uSpeed;\nuniform int   uAnimType;\nuniform vec2  uMouse;\nuniform int   uColorCount;\nuniform float uDistort;\nuniform vec2  uOffset;\nuniform sampler2D uGradient;\nuniform float uNoiseAmount;\nuniform int   uRayCount;\n\nfloat hash21(vec2 p){\n    p = floor(p);\n    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));\n    return fract(f);\n}\n\nmat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }\n\nfloat layeredNoise(vec2 fragPx){\n    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);\n    vec2 q = rot30() * p;\n    float n = 0.0;\n    n += 0.40 * hash21(q);\n    n += 0.25 * hash21(q * 2.0 + 17.0);\n    n += 0.20 * hash21(q * 4.0 + 47.0);\n    n += 0.10 * hash21(q * 8.0 + 113.0);\n    n += 0.05 * hash21(q * 16.0 + 191.0);\n    return n;\n}\n\nvec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){\n    float focal = res.y * max(dist, 1e-3);\n    return normalize(vec3(2.0 * (frag - offset) - res, focal));\n}\n\nfloat edgeFade(vec2 frag, vec2 res, vec2 offset){\n    vec2 toC = frag - 0.5 * res - offset;\n    float r = length(toC) / (0.5 * min(res.x, res.y));\n    float x = clamp(r, 0.0, 1.0);\n    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);\n    float s = q * 0.5;\n    s = pow(s, 1.5);\n    float tail = 1.0 - pow(1.0 - s, 2.0);\n    s = mix(s, tail, 0.2);\n    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;\n    return clamp(s + dn, 0.0, 1.0);\n}\n\nmat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }\nmat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }\nmat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }\n\nvec3 sampleGradient(float t){\n    t = clamp(t, 0.0, 1.0);\n    return texture(uGradient, vec2(t, 0.5)).rgb;\n}\n\nvec2 rot2(vec2 v, float a){\n    float s = sin(a), c = cos(a);\n    return mat2(c, -s, s, c) * v;\n}\n\nfloat bendAngle(vec3 q, float t){\n    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)\n            + 0.7 * sin(q.y * 0.50 - t * 0.5)\n            + 0.6 * sin(q.z * 0.60 + t * 0.7);\n    return a;\n}\n\nvoid main(){\n    vec2 frag = gl_FragCoord.xy;\n    float t = uTime * uSpeed;\n    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);\n    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);\n    float marchT = 0.0;\n    vec3 col = vec3(0.0);\n    float n = layeredNoise(frag);\n    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));\n    mat2 M2 = mat2(c.x, c.y, c.z, c.w);\n    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;\n\n    mat3 rot3dMat = mat3(1.0);\n    if(uAnimType == 1){\n      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);\n      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);\n    }\n    mat3 hoverMat = mat3(1.0);\n    if(uAnimType == 2){\n      vec2 m = uMouse * 2.0 - 1.0;\n      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);\n      hoverMat = rotY(ang.y) * rotX(ang.x);\n    }\n\n    for (int i = 0; i < 44; ++i) {\n        vec3 P = marchT * dir;\n        P.z -= 2.0;\n        float rad = length(P);\n        vec3 Pl = P * (10.0 / max(rad, 1e-6));\n\n        if(uAnimType == 0){\n            Pl.xz *= M2;\n        } else if(uAnimType == 1){\n      Pl = rot3dMat * Pl;\n        } else {\n      Pl = hoverMat * Pl;\n        }\n\n        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;\n\n        float grow = smoothstep(0.35, 3.0, marchT);\n        float a1 = amp * grow * bendAngle(Pl * 0.6, t);\n        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);\n        vec3 Pb = Pl;\n        Pb.xz = rot2(Pb.xz, a1);\n        Pb.xy = rot2(Pb.xy, a2);\n\n        float rayPattern = smoothstep(\n            0.5, 0.7,\n            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *\n            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))\n        );\n\n        if (uRayCount > 0) {\n            float ang = atan(Pb.y, Pb.x);\n            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);\n            comb = pow(comb, 3.0);\n            rayPattern *= smoothstep(0.15, 0.95, comb);\n        }\n\n        vec3 spectralDefault = 1.0 + vec3(\n            cos(marchT * 3.0 + 0.0),\n            cos(marchT * 3.0 + 1.0),\n            cos(marchT * 3.0 + 2.0)\n        );\n\n        float saw = fract(marchT * 0.25);\n        float tRay = saw * saw * (3.0 - 2.0 * saw);\n        vec3 userGradient = 2.0 * sampleGradient(tRay);\n        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;\n        vec3 base = (0.05 / (0.4 + stepLen))\n                  * smoothstep(5.0, 0.0, rad)\n                  * spectral;\n\n        col += base * rayPattern;\n        marchT += stepLen;\n    }\n\n    col *= edgeFade(frag, uResolution, uOffset);\n    col *= uIntensity;\n\n    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\n}", z = /* @__PURE__ */ i({
	name: "HBitsPrismaticBurst",
	__name: "HBitsPrismaticBurst",
	props: {
		intensity: { default: 2 },
		speed: { default: .5 },
		animationType: { default: "rotate3d" },
		colors: {},
		distort: { default: 0 },
		paused: {
			type: Boolean,
			default: !1
		},
		offset: { default: () => ({
			x: 0,
			y: 0
		}) },
		hoverDampness: { default: 0 },
		rayCount: {},
		mixBlendMode: { default: "lighten" }
	},
	setup(e) {
		let n = (e) => {
			let t = e.trim();
			if (t.startsWith("#") && (t = t.slice(1)), t.length === 3) {
				let e = t[0], n = t[1], r = t[2];
				t = e + e + n + n + r + r;
			}
			let n = parseInt(t, 16);
			return isNaN(n) || t.length !== 6 && t.length !== 8 ? [
				1,
				1,
				1
			] : [
				(n >> 16 & 255) / 255,
				(n >> 8 & 255) / 255,
				(n & 255) / 255
			];
		}, r = (e) => {
			if (e == null) return 0;
			if (typeof e == "number") return e;
			let t = String(e).trim(), n = parseFloat(t.replace("px", ""));
			return isNaN(n) ? 0 : n;
		}, i = e, a = h("containerRef"), o = f(null), s = f(null), c = f([.5, .5]), p = f([.5, .5]), m = f(i.paused), S = f(null), C = f(i.hoverDampness), w = f(!0), T = f(null), E = f(null);
		return l(() => {
			let e = a.value;
			if (!e) return;
			let t = Math.min(window.devicePixelRatio || 1, 2), n = new y({
				dpr: t,
				alpha: !1,
				antialias: !1
			});
			s.value = n;
			let r = n.gl;
			r.canvas.style.position = "absolute", r.canvas.style.inset = "0", r.canvas.style.width = "100%", r.canvas.style.height = "100%", r.canvas.style.mixBlendMode = i.mixBlendMode && i.mixBlendMode !== "none" ? i.mixBlendMode : "", e.appendChild(r.canvas);
			let l = new Uint8Array([
				255,
				255,
				255,
				255
			]), d = new b(r, {
				image: l,
				width: 1,
				height: 1,
				generateMipmaps: !1,
				flipY: !1
			});
			d.minFilter = r.LINEAR, d.magFilter = r.LINEAR, d.wrapS = r.CLAMP_TO_EDGE, d.wrapT = r.CLAMP_TO_EDGE, S.value = d;
			let f = new v(r, {
				vertex: L,
				fragment: R,
				uniforms: {
					uResolution: { value: [1, 1] },
					uTime: { value: 0 },
					uIntensity: { value: 1 },
					uSpeed: { value: 1 },
					uAnimType: { value: 0 },
					uMouse: { value: [.5, .5] },
					uColorCount: { value: 0 },
					uDistort: { value: 0 },
					uOffset: { value: [0, 0] },
					uGradient: { value: d },
					uNoiseAmount: { value: .8 },
					uRayCount: { value: 0 }
				}
			});
			o.value = f;
			let h = new x(r), g = new _(r, {
				geometry: h,
				program: f
			});
			E.value = h, T.value = g;
			let D = () => {
				let t = e.clientWidth || 1, i = e.clientHeight || 1;
				n.setSize(t, i), f.uniforms.uResolution.value = [r.drawingBufferWidth, r.drawingBufferHeight];
			}, O = null;
			"ResizeObserver" in window ? (O = new ResizeObserver(D), O.observe(e)) : window.addEventListener("resize", D), D();
			let k = (t) => {
				let n = e.getBoundingClientRect(), r = (t.clientX - n.left) / Math.max(n.width, 1), i = (t.clientY - n.top) / Math.max(n.height, 1);
				c.value = [Math.min(Math.max(r, 0), 1), Math.min(Math.max(i, 0), 1)];
			};
			e.addEventListener("pointermove", k, { passive: !0 });
			let A = null;
			"IntersectionObserver" in window && (A = new IntersectionObserver((e) => {
				e[0] && (w.value = e[0].isIntersecting);
			}, {
				root: null,
				threshold: .01
			}), A.observe(e));
			let j = () => {};
			document.addEventListener("visibilitychange", j);
			let M = 0, N = performance.now(), P = 0, F = (e) => {
				let t = Math.max(0, e - N) * .001;
				N = e;
				let r = w.value && !document.hidden;
				if (m.value || (P += t), !r) {
					M = requestAnimationFrame(F);
					return;
				}
				let i = .02 + Math.max(0, Math.min(1, C.value)) * .5, a = 1 - Math.exp(-t / i), o = c.value, s = p.value;
				s[0] += (o[0] - s[0]) * a, s[1] += (o[1] - s[1]) * a, f.uniforms.uMouse.value = s, f.uniforms.uTime.value = P, n.render({ scene: T.value }), M = requestAnimationFrame(F);
			};
			M = requestAnimationFrame(F), u(() => {
				cancelAnimationFrame(M), e.removeEventListener("pointermove", k), O?.disconnect(), O || window.removeEventListener("resize", D), A?.disconnect(), document.removeEventListener("visibilitychange", j);
				try {
					e.removeChild(r.canvas);
				} catch {}
				T.value = null, E.value = null, o.value = null;
				try {
					let e = s.value?.gl;
					e && S.value?.texture && e.deleteTexture(S.value.texture);
				} catch {}
				s.value = null, S.value = null;
			});
		}), g(() => i.paused, (e) => m.value = e), g(() => i.hoverDampness, (e) => C.value = e), g(() => i.mixBlendMode, (e) => {
			let t = s.value?.gl?.canvas;
			t && (t.style.mixBlendMode = e && e !== "none" ? e : "");
		}), g(() => [
			i.intensity,
			i.speed,
			i.animationType,
			i.colors,
			i.distort,
			i.offset,
			i.rayCount
		], () => {
			let e = o.value, t = s.value, a = S.value;
			if (!e || !t || !a) return;
			e.uniforms.uIntensity.value = i.intensity ?? 1, e.uniforms.uSpeed.value = i.speed ?? 1;
			let c = {
				rotate: 0,
				rotate3d: 1,
				hover: 2
			};
			e.uniforms.uAnimType.value = c[i.animationType ?? "rotate"], e.uniforms.uDistort.value = typeof i.distort == "number" ? i.distort : 0;
			let l = r(i.offset?.x), u = r(i.offset?.y);
			e.uniforms.uOffset.value = [l, u], e.uniforms.uRayCount.value = Math.max(0, Math.floor(i.rayCount ?? 0));
			let d = 0;
			if (Array.isArray(i.colors) && i.colors.length > 0) {
				let e = t.gl, r = i.colors.slice(0, 64);
				d = r.length;
				let o = new Uint8Array(d * 4);
				for (let e = 0; e < d; e++) {
					let [t, i, a] = n(r[e]);
					o[e * 4 + 0] = Math.round(t * 255), o[e * 4 + 1] = Math.round(i * 255), o[e * 4 + 2] = Math.round(a * 255), o[e * 4 + 3] = 255;
				}
				a.image = o, a.width = d, a.height = 1, a.minFilter = e.LINEAR, a.magFilter = e.LINEAR, a.wrapS = e.CLAMP_TO_EDGE, a.wrapT = e.CLAMP_TO_EDGE, a.flipY = !1, a.generateMipmaps = !1, a.format = e.RGBA, a.type = e.UNSIGNED_BYTE, a.needsUpdate = !0;
			} else d = 0;
			e.uniforms.uColorCount.value = d;
		}, { immediate: !0 }), (e, n) => (d(), t("div", {
			style: {
				width: "100%",
				height: "100%",
				position: "fixed",
				"z-index": "0"
			},
			ref_key: "containerRef",
			ref: a
		}, null, 512));
	}
}), ee = "#version 300 es\nprecision highp float;\nin vec2 aPoint;\nuniform float uTime;\nuniform vec2 uResolution;\nuniform vec2 uFrame;\nuniform float uAmplitude;\nuniform float uDistance;\nuniform vec2 uMouse;\nuniform float uCount;\nuniform float uThickness;\nuniform float uSoftness;\nuniform float uWaves;\nuniform float uSplit;\nuniform float uFray;\nuniform float uSeed;\nuniform vec2 uTurn;\nuniform vec4 uPart;\nuniform float uTaper;\nout float vEdge;\nout float vBand;\nout float vDraw;\nout float vAlpha;\nout float vIndex;\n\nfloat Perlin2D(vec2 P) {\n  vec2 Pi = floor(P);\n  vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);\n  vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);\n  Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;\n  Pt += vec2(26.0, 161.0).xyxy;\n  Pt *= Pt;\n  Pt = Pt.xzxz * Pt.yyww;\n  vec4 hash_x = fract(Pt * (1.0 / 951.135664));\n  vec4 hash_y = fract(Pt * (1.0 / 642.949883));\n  vec4 grad_x = hash_x - 0.49999;\n  vec4 grad_y = hash_y - 0.49999;\n  vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y) * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);\n  grad_results *= 1.4142135623730950;\n  vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);\n  vec4 blend2 = vec4(blend, vec2(1.0 - blend));\n  return dot(grad_results, blend2.zxzx * blend2.wwyy);\n}\n\nvoid main() {\n  float perc = float(gl_InstanceID) / uCount;\n  float x = aPoint.x;\n  float pixel = 1.0 / max(uResolution.x, uResolution.y);\n  float splitPoint = uSplit + perc * uFray;\n  float amplitudeNormal = smoothstep(splitPoint, max(0.7, splitPoint + 0.2), x);\n  float finalAmplitude = amplitudeNormal * 0.5 * uAmplitude * (1.0 + (uMouse.y - 0.5) * 0.2);\n  float timeScaled = uTime / 10.0 + (uMouse.x - 0.5);\n  float blur = smoothstep(splitPoint, splitPoint + 0.05, x) * perc;\n  float xnoise = mix(\n    Perlin2D(vec2(timeScaled * 2.5 + uSeed, (x * uWaves + perc) * 2.5)),\n    Perlin2D(vec2(timeScaled * 3.5 + uSeed, (x * uWaves + timeScaled) * 3.5)) / 1.5,\n    x * 0.3\n  );\n  float y = 0.5 + (perc - 0.5) * uDistance + xnoise / 2.0 * finalAmplitude;\n  vec2 local = vec2((x - 0.5) * uFrame.x, (y - 0.5) * uFrame.y);\n  if (uPart.z > 0.0) {\n    vec2 delta = local - uPart.xy;\n    float reach = uPart.w;\n    float pull = exp(-dot(delta, delta) / (reach * reach));\n    local.y += delta.y * pull * uPart.z;\n  }\n  float width = 7.0 * uThickness * pixel * (1.0 - perc);\n  float band = (width / 2.0 + 10.0 * uSoftness * pixel * blur) * uFrame.y;\n  float draw = max(band, 1.0);\n  local.y += aPoint.y * draw;\n  vec2 turned = vec2(local.x * uTurn.x - local.y * uTurn.y, local.x * uTurn.y + local.y * uTurn.x);\n  gl_Position = vec4(turned / (uResolution * 0.5), 0.0, 1.0);\n  vEdge = aPoint.y * draw;\n  vBand = band;\n  vDraw = draw;\n  vAlpha = 1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3)) * uTaper;\n  vIndex = perc;\n}", B = "#version 300 es\nprecision highp float;\nin float vEdge;\nin float vBand;\nin float vDraw;\nin float vAlpha;\nin float vIndex;\nuniform vec3 uColor;\nuniform vec3 uAccent;\nout vec4 outColor;\nvoid main() {\n  float coverage = (1.0 - smoothstep(0.0, vDraw, abs(vEdge))) * (vBand / vDraw) * vAlpha;\n  outColor = vec4(mix(uColor, uAccent, vIndex) * coverage, coverage);\n}", te = "#version 300 es\nin vec2 aPosition;\nout vec2 vUv;\nvoid main() {\n  vUv = aPosition * 0.5 + 0.5;\n  gl_Position = vec4(aPosition, 0.0, 1.0);\n}", V = "#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uLines;\nuniform vec2 uResolution;\nuniform float uFade;\nuniform float uOpacity;\nuniform float uCurve;\nout vec4 outColor;\n\nfloat smootherstep(float edge, float x) {\n  float t = clamp(x / edge, 0.0, 1.0);\n  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n\nvoid main() {\n  vec4 lines = texture(uLines, vUv);\n  float alpha = lines.a;\n  vec3 color = alpha > 0.0001 ? lines.rgb / alpha : vec3(0.0);\n  float mask = uOpacity;\n  if (uFade > 0.0) {\n    vec2 px = vUv * uResolution;\n    float edge = uFade * min(uResolution.x, uResolution.y) * 0.5;\n    mask *= smootherstep(edge, px.x) * smootherstep(edge, uResolution.x - px.x);\n    mask *= smootherstep(edge, px.y) * smootherstep(edge, uResolution.y - px.y);\n  }\n  outColor = vec4(color * pow(alpha, uCurve), alpha) * mask;\n}", H = 1920, U = /* @__PURE__ */ i({
	name: "HBitsThreads",
	__name: "HBitsThreads",
	props: {
		color: { default: () => [
			1,
			1,
			1
		] },
		accentColor: { default: void 0 },
		amplitude: { default: 1.7 },
		distance: { default: .4 },
		enableMouseInteraction: {
			type: Boolean,
			default: !1
		},
		lineCount: { default: 90 },
		thickness: { default: .6 },
		softness: { default: 1.3 },
		speed: { default: .6 },
		waves: { default: 1.05 },
		split: { default: .04 },
		fray: { default: .5 },
		angle: { default: 25 },
		seed: { default: 0 },
		parting: { default: 0 },
		taper: { default: .85 },
		brightness: { default: 1.4 },
		fade: { default: 0 },
		opacity: { default: 1 },
		paused: {
			type: Boolean,
			default: !1
		},
		className: { default: "" }
	},
	setup(r) {
		let i = (e, t, n) => Math.min(n, Math.max(t, e)), o = (e, t, n) => {
			let r = e.createShader(t);
			return r ? (e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (e.deleteShader(r), null)) : null;
		}, s = (e, t, n) => {
			let r = o(e, e.VERTEX_SHADER, t), i = o(e, e.FRAGMENT_SHADER, n), a = e.createProgram();
			return !r || !i || !a ? null : (e.attachShader(a, r), e.attachShader(a, i), e.linkProgram(a), e.deleteShader(r), e.deleteShader(i), e.getProgramParameter(a, e.LINK_STATUS) ? a : (e.deleteProgram(a), null));
		}, c = (e, t, n) => {
			let r = {};
			for (let i of n) r[i] = e.getUniformLocation(t, i);
			return r;
		}, p = r, m = f(null), h = f(null), _ = null, v = null, y = e(() => {
			let { color: e, accentColor: t } = p;
			return {
				color: e,
				accentColor: t,
				colorKey: `${Array.isArray(e) ? e.join(",") : String(e)}|${Array.isArray(t) ? t.join(",") : String(t ?? "")}`,
				amplitude: p.amplitude,
				distance: p.distance,
				enableMouseInteraction: p.enableMouseInteraction,
				lineCount: i(Math.round(p.lineCount), 1, 400),
				thickness: Math.max(0, p.thickness),
				softness: Math.max(0, p.softness),
				speed: p.speed,
				waves: Math.max(0, p.waves),
				split: i(p.split, 0, 1),
				fray: i(p.fray, 0, 1),
				angle: p.angle,
				seed: p.seed,
				parting: i(p.parting, 0, 1),
				taper: i(p.taper, 0, 1),
				brightness: i(p.brightness, .25, 2),
				fade: i(p.fade, 0, 1),
				opacity: i(p.opacity, 0, 1),
				paused: p.paused
			};
		});
		return g(y, () => {
			_?.();
		}), l(() => {
			let e = m.value, t = h.value, n = t?.getContext("webgl2", {
				alpha: !0,
				premultipliedAlpha: !0,
				antialias: !1,
				depth: !1,
				stencil: !1
			});
			if (!e || !t || !n) return;
			let r = s(n, ee, B), a = s(n, te, V);
			if (!r || !a) return;
			let o = c(n, r, [
				"uTime",
				"uResolution",
				"uFrame",
				"uAmplitude",
				"uDistance",
				"uMouse",
				"uCount",
				"uThickness",
				"uSoftness",
				"uWaves",
				"uSplit",
				"uFray",
				"uSeed",
				"uTurn",
				"uPart",
				"uTaper",
				"uColor",
				"uAccent"
			]), l = c(n, a, [
				"uLines",
				"uResolution",
				"uFade",
				"uOpacity",
				"uCurve"
			]), u = n.createVertexArray(), d = n.createBuffer();
			n.bindVertexArray(u), n.bindBuffer(n.ARRAY_BUFFER, d);
			let f = n.getAttribLocation(r, "aPoint");
			n.enableVertexAttribArray(f), n.vertexAttribPointer(f, 2, n.FLOAT, !1, 0, 0);
			let p = n.createVertexArray(), g = n.createBuffer();
			n.bindVertexArray(p), n.bindBuffer(n.ARRAY_BUFFER, g), n.bufferData(n.ARRAY_BUFFER, new Float32Array([
				-1,
				-1,
				3,
				-1,
				-1,
				3
			]), n.STATIC_DRAW);
			let b = n.getAttribLocation(a, "aPosition");
			n.enableVertexAttribArray(b), n.vertexAttribPointer(b, 2, n.FLOAT, !1, 0, 0), n.bindVertexArray(null);
			let x = n.createTexture(), S = n.createFramebuffer();
			n.bindTexture(n.TEXTURE_2D, x), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE);
			let C = document.createElement("canvas");
			C.width = 1, C.height = 1;
			let w = C.getContext("2d", { willReadFrequently: !0 }), T = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, E = {
				time: 0,
				width: 1,
				height: 1,
				segments: 0,
				colorKey: "",
				color: [
					1,
					1,
					1
				],
				accent: [
					1,
					1,
					1
				],
				mouse: [.5, .5],
				targetMouse: [.5, .5],
				pointer: [0, 0],
				targetPointer: [0, 0],
				presence: 0,
				inside: !1
			}, D = 0, O = 0, k = !0, A = !0, j = (e) => {
				if (Array.isArray(e)) return [
					0,
					1,
					2
				].map((t) => i(Number(e[t] ?? 1), 0, 1));
				if (!w) return [
					1,
					1,
					1
				];
				w.clearRect(0, 0, 1, 1), w.fillStyle = "#ffffff", w.fillStyle = String(e), w.fillRect(0, 0, 1, 1);
				let [t, n, r] = w.getImageData(0, 0, 1, 1).data;
				return [
					t / 255,
					n / 255,
					r / 255
				];
			}, M = (e) => {
				e.colorKey !== E.colorKey && (E.colorKey = e.colorKey, E.color = j(e.color), E.accent = e.accentColor === void 0 || e.accentColor === null ? E.color : j(e.accentColor));
			}, N = (e) => {
				if (e === E.segments) return;
				E.segments = e;
				let t = new Float32Array((e + 1) * 4);
				for (let n = 0; n <= e; n++) {
					let r = n / e;
					t.set([
						r,
						-1,
						r,
						1
					], n * 4);
				}
				n.bindBuffer(n.ARRAY_BUFFER, d), n.bufferData(n.ARRAY_BUFFER, t, n.STATIC_DRAW);
			}, P = () => {
				let r = Math.max(1, e.clientWidth), a = Math.max(1, e.clientHeight), o = Math.min(window.devicePixelRatio || 1, 2), s = Math.max(r, a) * o, c = s > H ? o * H / s : o;
				t.width = Math.max(1, Math.round(r * c)), t.height = Math.max(1, Math.round(a * c)), E.width = r, E.height = a, n.bindTexture(n.TEXTURE_2D, x), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, t.width, t.height, 0, n.RGBA, n.UNSIGNED_BYTE, null), n.bindFramebuffer(n.FRAMEBUFFER, S), n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, x, 0), n.bindFramebuffer(n.FRAMEBUFFER, null), N(i(Math.round(r / 3), 96, 640)), F();
			}, F = () => {
				let e = y.value;
				M(e);
				let i = t.width, s = t.height, c = e.angle * Math.PI / 180, d = Math.cos(c), f = Math.sin(c), m = Math.abs(i * d) + Math.abs(s * f), h = Math.abs(i * f) + Math.abs(s * d), g = i / E.width, _ = e.enableMouseInteraction ? E.mouse : [.5, .5], v = e.parting * E.presence * 2, b = E.pointer[0] * g, C = E.pointer[1] * g, w = [b * d + C * f, -b * f + C * d];
				n.bindFramebuffer(n.FRAMEBUFFER, S), n.viewport(0, 0, i, s), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.enable(n.BLEND), n.blendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA), n.useProgram(r), n.uniform1f(o.uTime, E.time), n.uniform2f(o.uResolution, i, s), n.uniform2f(o.uFrame, m, h), n.uniform1f(o.uAmplitude, e.amplitude), n.uniform1f(o.uDistance, e.distance), n.uniform2f(o.uMouse, _[0], _[1]), n.uniform1f(o.uCount, e.lineCount), n.uniform1f(o.uThickness, e.thickness), n.uniform1f(o.uSoftness, e.softness), n.uniform1f(o.uWaves, e.waves), n.uniform1f(o.uSplit, e.split), n.uniform1f(o.uFray, e.fray), n.uniform1f(o.uSeed, e.seed * 13.37), n.uniform2f(o.uTurn, d, f), n.uniform4f(o.uPart, w[0], w[1], v, Math.min(i, s) * .16), n.uniform1f(o.uTaper, e.taper), n.uniform3f(o.uColor, E.color[0], E.color[1], E.color[2]), n.uniform3f(o.uAccent, E.accent[0], E.accent[1], E.accent[2]), n.bindVertexArray(u), n.drawArraysInstanced(n.TRIANGLE_STRIP, 0, (E.segments + 1) * 2, e.lineCount), n.bindFramebuffer(n.FRAMEBUFFER, null), n.viewport(0, 0, i, s), n.disable(n.BLEND), n.clear(n.COLOR_BUFFER_BIT), n.useProgram(a), n.activeTexture(n.TEXTURE0), n.bindTexture(n.TEXTURE_2D, x), n.uniform1i(l.uLines, 0), n.uniform2f(l.uResolution, i, s), n.uniform1f(l.uFade, e.fade), n.uniform1f(l.uOpacity, e.opacity), n.uniform1f(l.uCurve, 2 / e.brightness), n.bindVertexArray(p), n.drawArrays(n.TRIANGLES, 0, 3), n.bindVertexArray(null);
			}, I = (e) => {
				if (D = 0, !A || !k || document.hidden) return;
				let t = y.value, n = O ? Math.min(.05, (e - O) / 1e3) : 1 / 60;
				O = e;
				let r = !t.paused && !T;
				r && (E.time += n * t.speed);
				let i = 1 - Math.exp(-n * 3);
				E.mouse[0] += (E.targetMouse[0] - E.mouse[0]) * i, E.mouse[1] += (E.targetMouse[1] - E.mouse[1]) * i;
				let a = 1 - Math.exp(-n * 10);
				E.pointer[0] += (E.targetPointer[0] - E.pointer[0]) * a, E.pointer[1] += (E.targetPointer[1] - E.pointer[1]) * a, E.presence += ((E.inside && t.parting > 0 ? 1 : 0) - E.presence) * (1 - Math.exp(-n * 4)), F();
				let o = Math.abs(E.targetMouse[0] - E.mouse[0]) > 5e-4 || Math.abs(E.targetMouse[1] - E.mouse[1]) > 5e-4 || Math.abs(E.targetPointer[0] - E.pointer[0]) > .05 || Math.abs(E.targetPointer[1] - E.pointer[1]) > .05 || Math.abs((E.inside && t.parting > 0 ? 1 : 0) - E.presence) > .002;
				r || o ? D = requestAnimationFrame(I) : O = 0;
			}, L = () => {
				!D && A && k && !document.hidden && (D = requestAnimationFrame(I));
			}, R = (t) => {
				let n = e.getBoundingClientRect(), r = (t.clientX - n.left) / Math.max(1, n.width), i = (t.clientY - n.top) / Math.max(1, n.height), a = r >= 0 && r <= 1 && i >= 0 && i <= 1;
				a ? (E.targetMouse = [r, 1 - i], E.targetPointer = [t.clientX - n.left - n.width / 2, n.height / 2 - (t.clientY - n.top)], !E.inside && E.presence < .01 && (E.pointer = [...E.targetPointer])) : E.inside && (E.targetMouse = [.5, .5]), E.inside = a, L();
			}, z = () => {
				E.inside = !1, E.targetMouse = [.5, .5], L();
			}, U = () => {
				O = 0, L();
			}, W = new ResizeObserver(P);
			W.observe(e);
			let G = new IntersectionObserver((e) => {
				k = e.some((e) => e.isIntersecting), k && (O = 0, L());
			});
			G.observe(e), window.addEventListener("pointermove", R, { passive: !0 }), document.documentElement.addEventListener("pointerleave", z), document.addEventListener("visibilitychange", U), P(), _ = () => {
				D || F(), L();
			}, v = () => {
				A = !1, cancelAnimationFrame(D), _ = null, W.disconnect(), G.disconnect(), window.removeEventListener("pointermove", R), document.documentElement.removeEventListener("pointerleave", z), document.removeEventListener("visibilitychange", U), n.deleteFramebuffer(S), n.deleteTexture(x), n.deleteBuffer(d), n.deleteBuffer(g), n.deleteVertexArray(u), n.deleteVertexArray(p), n.deleteProgram(r), n.deleteProgram(a);
			};
		}), u(() => {
			v?.(), v = null;
		}), (e, i) => (d(), t("div", {
			ref_key: "containerRef",
			ref: m,
			class: a(["threads-container", r.className].filter(Boolean).join(" "))
		}, [n("canvas", {
			ref_key: "canvasRef",
			ref: h,
			class: "threads-canvas",
			"aria-hidden": "true"
		}, null, 512)], 2));
	}
}), W = { particles: {
	number: {
		density: {
			enable: !0,
			width: 1920,
			height: 1080
		},
		value: 100
	},
	links: {
		distance: 125,
		enable: !0,
		triangles: {
			enable: !0,
			opacity: .1
		}
	},
	move: {
		enable: !0,
		speed: 5
	},
	size: { value: 1 },
	shape: { type: "circle" }
} }, G = ["id"], K = /* @__PURE__ */ i({
	name: "HParticles",
	__name: "HParticles",
	setup(e) {
		let n = m("HParticles"), r, i = () => S.pluginManager.presets.has("triangles"), a = async () => {
			i() || await C(S);
		}, o = async () => {
			r?.destroy(), r = await S.load({
				id: n.value,
				options: W
			});
		}, c = async () => {
			r?.destroy();
		};
		return s(() => {
			a();
		}), l(() => {
			o();
		}), u(() => {
			c();
		}), (e, r) => (d(), t("div", { id: n.value }, [p(e.$slots, "default")], 8, G));
	}
});
O.install = (e) => {
	e.component(O.name, O);
}, I.install = (e) => {
	e.component(I.name, I);
}, z.install = (e) => {
	e.component(z.name, z);
}, U.install = (e) => {
	e.component(U.name, U);
}, K.install = (e) => {
	e.component(K.name, K);
};
// src/HSignIn/HSignInCornerBottom.vue?vue&type=script&setup=true&lang.ts
var q = {
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	height: "896",
	width: "967.8852157128662"
}, J = {
	id: "linearGradient-3",
	x1: "0.5",
	y1: "0",
	x2: "0.5",
	y2: "1"
}, Y = ["stop-color"], X = ["stop-color"], Z = /* @__PURE__ */ i({
	name: "HSignInCornerBottom",
	__name: "HSignInCornerBottom",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (r, i) => (d(), t("svg", q, [n("defs", null, [i[0] ||= n("path", {
			id: "path-2",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896\n			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806\n			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
		}, null, -1), n("linearGradient", J, [n("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, Y), n("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, X)])]), i[1] ||= n("g", { opacity: "1" }, [n("use", {
			"xlink:href": "#path-2",
			fill: "url(#linearGradient-3)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), ne = {
	height: "1337",
	width: "1337"
}, re = {
	id: "linearGradient-2",
	x1: "0.79",
	y1: "0.62",
	x2: "0.21",
	y2: "0.86"
}, ie = ["stop-color"], ae = ["stop-color"], oe = /* @__PURE__ */ i({
	name: "HSignInCornerTop",
	__name: "HSignInCornerTop",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (r, i) => (d(), t("svg", ne, [n("defs", null, [i[0] ||= n("path", {
			id: "path-1",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
		}, null, -1), n("linearGradient", re, [n("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, ie), n("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, ae)])]), i[1] ||= n("g", { opacity: "1" }, [n("use", {
			"xlink:href": "#path-1",
			fill: "url(#linearGradient-2)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), se = { class: "corner-top" }, ce = { class: "corner-bottom" }, Q = /*#__PURE__*/ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ i({
	name: "HSignInBackground",
	components: {
		HSignInCornerBottom: Z,
		HSignInCornerTop: oe
	},
	__name: "HSignInBackground",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (i, a) => (d(), t("div", null, [n("div", se, [r(oe, {
			"start-color": e.startColor,
			"end-color": e.endColor
		}, null, 8, ["start-color", "end-color"])]), n("div", ce, [r(Z, {
			"start-color": e.endColor,
			"end-color": e.startColor
		}, null, 8, ["start-color", "end-color"])])]));
	}
}), [["__scopeId", "data-v-7774e47e"]]);
// src/HSignIn/index.ts
Q.install = (e) => {
	e.component(Q.name, Q);
};
// src/index.ts
var le = [
	O,
	I,
	z,
	U,
	K,
	Q
], ue = { install: (e) => {
	le.map((t) => t.install(e));
} };
export { O as HBitsGalaxy, I as HBitsGhostFibers, z as HBitsPrismaticBurst, U as HBitsThreads, K as HParticles, Q as HSignInBackground, ue as default };

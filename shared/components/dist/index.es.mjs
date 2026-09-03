import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createSlots as o, createTextVNode as s, createVNode as c, defineComponent as l, mergeModels as u, mergeProps as d, normalizeClass as f, normalizeProps as p, onBeforeMount as m, onMounted as h, onUnmounted as g, openBlock as _, ref as v, renderSlot as y, shallowRef as b, toDisplayString as x, unref as S, useModel as C, useTemplateRef as w, watch as T, withCtx as E } from "vue";
import { Color as D, Mesh as ee, Program as te, Renderer as ne, Texture as re, Triangle as ie } from "ogl";
import { tsParticles as ae } from "@tsparticles/engine";
import { loadTrianglesPreset as oe } from "@tsparticles/preset-triangles";
import { VAutocomplete as O, VBtn as se, VCard as ce, VCardActions as le, VCardText as ue, VCol as k, VContainer as A, VDatePicker as de, VDialog as fe, VDivider as pe, VExpandXTransition as me, VIcon as j, VIconBtn as he, VLabel as ge, VListItem as _e, VMenu as M, VMessages as ve, VNumberInput as ye, VProgressLinear as be, VRow as xe, VSelect as Se, VSnackbar as Ce, VTextField as N, VTimePicker as we, VTooltip as P, VTreeview as Te } from "vuetify/components";
import { useDate as Ee } from "vuetify";
import { moment as F } from "@herodotus/core";
import { debounce as De, find as Oe, isArray as ke, isEmpty as I, kebabCase as Ae } from "lodash-es";
import { defineStore as je } from "pinia";
import * as Me from "@mdi/js";
//#region src/HAnimate/HBitsGalaxy.vue?vue&type=script&setup=true&lang.ts
var Ne = "\nattribute vec2 uv;\nattribute vec2 position;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 0, 1);\n}\n", Pe = "\nprecision highp float;\n\nuniform float uTime;\nuniform vec3 uResolution;\nuniform vec2 uFocal;\nuniform vec2 uRotation;\nuniform float uStarSpeed;\nuniform float uDensity;\nuniform float uHueShift;\nuniform float uSpeed;\nuniform vec2 uMouse;\nuniform float uGlowIntensity;\nuniform float uSaturation;\nuniform bool uMouseRepulsion;\nuniform float uTwinkleIntensity;\nuniform float uRotationSpeed;\nuniform float uRepulsionStrength;\nuniform float uMouseActiveFactor;\nuniform float uAutoCenterRepulsion;\nuniform bool uTransparent;\n\nvarying vec2 vUv;\n\n#define NUM_LAYER 4.0\n#define STAR_COLOR_CUTOFF 0.2\n#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)\n#define PERIOD 3.0\n\nfloat Hash21(vec2 p) {\n  p = fract(p * vec2(123.34, 456.21));\n  p += dot(p, p + 45.32);\n  return fract(p.x * p.y);\n}\n\nfloat tri(float x) {\n  return abs(fract(x) * 2.0 - 1.0);\n}\n\nfloat tris(float x) {\n  float t = fract(x);\n  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));\n}\n\nfloat trisn(float x) {\n  float t = fract(x);\n  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;\n}\n\nvec3 hsv2rgb(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\nfloat Star(vec2 uv, float flare) {\n  float d = length(uv);\n  float m = (0.05 * uGlowIntensity) / d;\n  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\n  m += rays * flare * uGlowIntensity;\n  uv *= MAT45;\n  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\n  m += rays * 0.3 * flare * uGlowIntensity;\n  m *= smoothstep(1.0, 0.2, d);\n  return m;\n}\n\nvec3 StarLayer(vec2 uv) {\n  vec3 col = vec3(0.0);\n\n  vec2 gv = fract(uv) - 0.5;\n  vec2 id = floor(uv);\n\n  for (int y = -1; y <= 1; y++) {\n    for (int x = -1; x <= 1; x++) {\n      vec2 offset = vec2(float(x), float(y));\n      vec2 si = id + vec2(float(x), float(y));\n      float seed = Hash21(si);\n      float size = fract(seed * 345.32);\n      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));\n      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;\n\n      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;\n      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;\n      float grn = min(red, blu) * seed;\n      vec3 base = vec3(red, grn, blu);\n\n      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;\n      hue = fract(hue + uHueShift / 360.0);\n      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;\n      float val = max(max(base.r, base.g), base.b);\n      base = hsv2rgb(vec3(hue, sat, val));\n\n      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;\n\n      float star = Star(gv - offset - pad, flareSize);\n      vec3 color = base;\n\n      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;\n      twinkle = mix(1.0, twinkle, uTwinkleIntensity);\n      star *= twinkle;\n\n      col += star * size * color;\n    }\n  }\n\n  return col;\n}\n\nvoid main() {\n  vec2 focalPx = uFocal * uResolution.xy;\n  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;\n\n  vec2 mouseNorm = uMouse - vec2(0.5);\n\n  if (uAutoCenterRepulsion > 0.0) {\n    vec2 centerUV = vec2(0.0, 0.0); // Center in UV space\n    float centerDist = length(uv - centerUV);\n    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));\n    uv += repulsion * 0.05;\n  } else if (uMouseRepulsion) {\n    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;\n    float mouseDist = length(uv - mousePosUV);\n    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));\n    uv += repulsion * 0.05 * uMouseActiveFactor;\n  } else {\n    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;\n    uv += mouseOffset;\n  }\n\n  float autoRotAngle = uTime * uRotationSpeed;\n  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));\n  uv = autoRot * uv;\n\n  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;\n\n  vec3 col = vec3(0.0);\n\n  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {\n    float depth = fract(i + uStarSpeed * uSpeed);\n    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);\n    float fade = depth * smoothstep(1.0, 0.9, depth);\n    col += StarLayer(uv * scale + i * 453.32) * fade;\n  }\n\n  if (uTransparent) {\n    float alpha = length(col);\n    alpha = smoothstep(0.0, 0.3, alpha); // Enhance contrast\n    alpha = min(alpha, 1.0); // Clamp to maximum 1.0\n    gl_FragColor = vec4(col, alpha);\n  } else {\n    gl_FragColor = vec4(col, 1.0);\n  }\n}\n", L = /* @__PURE__ */ l({
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
		twinkleIntensity: { default: .3 },
		rotationSpeed: { default: .1 },
		repulsionStrength: { default: 2 },
		autoCenterRepulsion: { default: 0 },
		transparent: {
			type: Boolean,
			default: !0
		}
	},
	setup(e) {
		let t = e, n = w("ctnDom"), r = v({
			x: .5,
			y: .5
		}), a = v({
			x: .5,
			y: .5
		}), o = v(0), s = v(0), c = null, l = () => {
			if (!n.value) return;
			let e = n.value, i = new ne({
				alpha: t.transparent,
				premultipliedAlpha: !1
			}), l = i.gl;
			t.transparent ? (l.enable(l.BLEND), l.blendFunc(l.SRC_ALPHA, l.ONE_MINUS_SRC_ALPHA), l.clearColor(0, 0, 0, 0)) : l.clearColor(0, 0, 0, 1);
			let u;
			function d() {
				i.setSize(e.offsetWidth * 1, e.offsetHeight * 1), u && (u.uniforms.uResolution.value = new D(l.canvas.width, l.canvas.height, l.canvas.width / l.canvas.height));
			}
			window.addEventListener("resize", d, !1), d();
			let f = new ie(l);
			u = new te(l, {
				vertex: Ne,
				fragment: Pe,
				uniforms: {
					uTime: { value: 0 },
					uResolution: { value: new D(l.canvas.width, l.canvas.height, l.canvas.width / l.canvas.height) },
					uFocal: { value: new Float32Array(t.focal) },
					uRotation: { value: new Float32Array(t.rotation) },
					uStarSpeed: { value: t.starSpeed },
					uDensity: { value: t.density },
					uHueShift: { value: t.hueShift },
					uSpeed: { value: t.speed },
					uMouse: { value: new Float32Array([a.value.x, a.value.y]) },
					uGlowIntensity: { value: t.glowIntensity },
					uSaturation: { value: t.saturation },
					uMouseRepulsion: { value: t.mouseRepulsion },
					uTwinkleIntensity: { value: t.twinkleIntensity },
					uRotationSpeed: { value: t.rotationSpeed },
					uRepulsionStrength: { value: t.repulsionStrength },
					uMouseActiveFactor: { value: 0 },
					uAutoCenterRepulsion: { value: t.autoCenterRepulsion },
					uTransparent: { value: t.transparent }
				}
			});
			let p = new ee(l, {
				geometry: f,
				program: u
			}), m;
			function h(e) {
				m = requestAnimationFrame(h), t.disableAnimation || (u.uniforms.uTime.value = e * .001, u.uniforms.uStarSpeed.value = e * .001 * t.starSpeed / 10);
				let n = .05;
				a.value.x += (r.value.x - a.value.x) * n, a.value.y += (r.value.y - a.value.y) * n, s.value += (o.value - s.value) * n, u.uniforms.uMouse.value[0] = a.value.x, u.uniforms.uMouse.value[1] = a.value.y, u.uniforms.uMouseActiveFactor.value = s.value, i.render({ scene: p });
			}
			m = requestAnimationFrame(h), e.appendChild(l.canvas);
			function g(t) {
				let n = e.getBoundingClientRect(), i = (t.clientX - n.left) / n.width, a = 1 - (t.clientY - n.top) / n.height;
				r.value = {
					x: i,
					y: a
				}, o.value = 1;
			}
			function _() {
				o.value = 0;
			}
			t.mouseInteraction && (e.addEventListener("mousemove", g), e.addEventListener("mouseleave", _)), c = () => {
				cancelAnimationFrame(m), window.removeEventListener("resize", d), t.mouseInteraction && (e.removeEventListener("mousemove", g), e.removeEventListener("mouseleave", _)), e.removeChild(l.canvas), l.getExtension("WEBGL_lose_context")?.loseContext();
			};
		};
		return h(() => {
			c?.(), l();
		}), g(() => {
			c?.();
		}), T(() => t, () => {
			c?.(), l();
		}, { deep: !0 }), (e, t) => (_(), i("div", d({
			ref_key: "ctnDom",
			ref: n,
			style: {
				width: "100%",
				height: "100%",
				position: "fixed",
				"z-index": "0"
			}
		}, e.$attrs), null, 16));
	}
}), Fe = "#version 300 es\nin vec2 position;\nin vec2 uv;\nout vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = vec4(position, 0.0, 1.0);\n}\n", Ie = "#version 300 es\nprecision highp float;\nprecision highp int;\n\nout vec4 fragColor;\n\nuniform vec2  uResolution;\nuniform float uTime;\n\nuniform float uIntensity;\nuniform float uSpeed;\nuniform int   uAnimType;\nuniform vec2  uMouse;\nuniform int   uColorCount;\nuniform float uDistort;\nuniform vec2  uOffset;\nuniform sampler2D uGradient;\nuniform float uNoiseAmount;\nuniform int   uRayCount;\n\nfloat hash21(vec2 p){\n    p = floor(p);\n    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));\n    return fract(f);\n}\n\nmat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }\n\nfloat layeredNoise(vec2 fragPx){\n    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);\n    vec2 q = rot30() * p;\n    float n = 0.0;\n    n += 0.40 * hash21(q);\n    n += 0.25 * hash21(q * 2.0 + 17.0);\n    n += 0.20 * hash21(q * 4.0 + 47.0);\n    n += 0.10 * hash21(q * 8.0 + 113.0);\n    n += 0.05 * hash21(q * 16.0 + 191.0);\n    return n;\n}\n\nvec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){\n    float focal = res.y * max(dist, 1e-3);\n    return normalize(vec3(2.0 * (frag - offset) - res, focal));\n}\n\nfloat edgeFade(vec2 frag, vec2 res, vec2 offset){\n    vec2 toC = frag - 0.5 * res - offset;\n    float r = length(toC) / (0.5 * min(res.x, res.y));\n    float x = clamp(r, 0.0, 1.0);\n    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);\n    float s = q * 0.5;\n    s = pow(s, 1.5);\n    float tail = 1.0 - pow(1.0 - s, 2.0);\n    s = mix(s, tail, 0.2);\n    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;\n    return clamp(s + dn, 0.0, 1.0);\n}\n\nmat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }\nmat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }\nmat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }\n\nvec3 sampleGradient(float t){\n    t = clamp(t, 0.0, 1.0);\n    return texture(uGradient, vec2(t, 0.5)).rgb;\n}\n\nvec2 rot2(vec2 v, float a){\n    float s = sin(a), c = cos(a);\n    return mat2(c, -s, s, c) * v;\n}\n\nfloat bendAngle(vec3 q, float t){\n    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)\n            + 0.7 * sin(q.y * 0.50 - t * 0.5)\n            + 0.6 * sin(q.z * 0.60 + t * 0.7);\n    return a;\n}\n\nvoid main(){\n    vec2 frag = gl_FragCoord.xy;\n    float t = uTime * uSpeed;\n    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);\n    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);\n    float marchT = 0.0;\n    vec3 col = vec3(0.0);\n    float n = layeredNoise(frag);\n    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));\n    mat2 M2 = mat2(c.x, c.y, c.z, c.w);\n    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;\n\n    mat3 rot3dMat = mat3(1.0);\n    if(uAnimType == 1){\n      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);\n      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);\n    }\n    mat3 hoverMat = mat3(1.0);\n    if(uAnimType == 2){\n      vec2 m = uMouse * 2.0 - 1.0;\n      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);\n      hoverMat = rotY(ang.y) * rotX(ang.x);\n    }\n\n    for (int i = 0; i < 44; ++i) {\n        vec3 P = marchT * dir;\n        P.z -= 2.0;\n        float rad = length(P);\n        vec3 Pl = P * (10.0 / max(rad, 1e-6));\n\n        if(uAnimType == 0){\n            Pl.xz *= M2;\n        } else if(uAnimType == 1){\n      Pl = rot3dMat * Pl;\n        } else {\n      Pl = hoverMat * Pl;\n        }\n\n        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;\n\n        float grow = smoothstep(0.35, 3.0, marchT);\n        float a1 = amp * grow * bendAngle(Pl * 0.6, t);\n        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);\n        vec3 Pb = Pl;\n        Pb.xz = rot2(Pb.xz, a1);\n        Pb.xy = rot2(Pb.xy, a2);\n\n        float rayPattern = smoothstep(\n            0.5, 0.7,\n            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *\n            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))\n        );\n\n        if (uRayCount > 0) {\n            float ang = atan(Pb.y, Pb.x);\n            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);\n            comb = pow(comb, 3.0);\n            rayPattern *= smoothstep(0.15, 0.95, comb);\n        }\n\n        vec3 spectralDefault = 1.0 + vec3(\n            cos(marchT * 3.0 + 0.0),\n            cos(marchT * 3.0 + 1.0),\n            cos(marchT * 3.0 + 2.0)\n        );\n\n        float saw = fract(marchT * 0.25);\n        float tRay = saw * saw * (3.0 - 2.0 * saw);\n        vec3 userGradient = 2.0 * sampleGradient(tRay);\n        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;\n        vec3 base = (0.05 / (0.4 + stepLen))\n                  * smoothstep(5.0, 0.0, rad)\n                  * spectral;\n\n        col += base * rayPattern;\n        marchT += stepLen;\n    }\n\n    col *= edgeFade(frag, uResolution, uOffset);\n    col *= uIntensity;\n\n    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\n}", R = /* @__PURE__ */ l({
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
		let t = (e) => {
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
		}, n = (e) => {
			if (e == null) return 0;
			if (typeof e == "number") return e;
			let t = String(e).trim(), n = parseFloat(t.replace("px", ""));
			return isNaN(n) ? 0 : n;
		}, r = e, a = w("containerRef"), o = v(null), s = v(null), c = v([.5, .5]), l = v([.5, .5]), u = v(r.paused), d = v(null), f = v(r.hoverDampness), p = v(!0), m = v(null), y = v(null);
		return h(() => {
			let e = a.value;
			if (!e) return;
			let t = Math.min(window.devicePixelRatio || 1, 2), n = new ne({
				dpr: t,
				alpha: !1,
				antialias: !1
			});
			s.value = n;
			let i = n.gl;
			i.canvas.style.position = "absolute", i.canvas.style.inset = "0", i.canvas.style.width = "100%", i.canvas.style.height = "100%", i.canvas.style.mixBlendMode = r.mixBlendMode && r.mixBlendMode !== "none" ? r.mixBlendMode : "", e.appendChild(i.canvas);
			let h = new Uint8Array([
				255,
				255,
				255,
				255
			]), _ = new re(i, {
				image: h,
				width: 1,
				height: 1,
				generateMipmaps: !1,
				flipY: !1
			});
			_.minFilter = i.LINEAR, _.magFilter = i.LINEAR, _.wrapS = i.CLAMP_TO_EDGE, _.wrapT = i.CLAMP_TO_EDGE, d.value = _;
			let v = new te(i, {
				vertex: Fe,
				fragment: Ie,
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
					uGradient: { value: _ },
					uNoiseAmount: { value: .8 },
					uRayCount: { value: 0 }
				}
			});
			o.value = v;
			let b = new ie(i), x = new ee(i, {
				geometry: b,
				program: v
			});
			y.value = b, m.value = x;
			let S = () => {
				let t = e.clientWidth || 1, r = e.clientHeight || 1;
				n.setSize(t, r), v.uniforms.uResolution.value = [i.drawingBufferWidth, i.drawingBufferHeight];
			}, C = null;
			"ResizeObserver" in window ? (C = new ResizeObserver(S), C.observe(e)) : window.addEventListener("resize", S), S();
			let w = (t) => {
				let n = e.getBoundingClientRect(), r = (t.clientX - n.left) / Math.max(n.width, 1), i = (t.clientY - n.top) / Math.max(n.height, 1);
				c.value = [Math.min(Math.max(r, 0), 1), Math.min(Math.max(i, 0), 1)];
			};
			e.addEventListener("pointermove", w, { passive: !0 });
			let T = null;
			"IntersectionObserver" in window && (T = new IntersectionObserver((e) => {
				e[0] && (p.value = e[0].isIntersecting);
			}, {
				root: null,
				threshold: .01
			}), T.observe(e));
			let E = () => {};
			document.addEventListener("visibilitychange", E);
			let D = 0, ae = performance.now(), oe = 0, O = (e) => {
				let t = Math.max(0, e - ae) * .001;
				ae = e;
				let r = p.value && !document.hidden;
				if (u.value || (oe += t), !r) {
					D = requestAnimationFrame(O);
					return;
				}
				let i = .02 + Math.max(0, Math.min(1, f.value)) * .5, a = 1 - Math.exp(-t / i), o = c.value, s = l.value;
				s[0] += (o[0] - s[0]) * a, s[1] += (o[1] - s[1]) * a, v.uniforms.uMouse.value = s, v.uniforms.uTime.value = oe, n.render({ scene: m.value }), D = requestAnimationFrame(O);
			};
			D = requestAnimationFrame(O), g(() => {
				cancelAnimationFrame(D), e.removeEventListener("pointermove", w), C?.disconnect(), C || window.removeEventListener("resize", S), T?.disconnect(), document.removeEventListener("visibilitychange", E);
				try {
					e.removeChild(i.canvas);
				} catch {}
				m.value = null, y.value = null, o.value = null;
				try {
					let e = s.value?.gl;
					e && d.value?.texture && e.deleteTexture(d.value.texture);
				} catch {}
				s.value = null, d.value = null;
			});
		}), T(() => r.paused, (e) => u.value = e), T(() => r.hoverDampness, (e) => f.value = e), T(() => r.mixBlendMode, (e) => {
			let t = s.value?.gl?.canvas;
			t && (t.style.mixBlendMode = e && e !== "none" ? e : "");
		}), T(() => [
			r.intensity,
			r.speed,
			r.animationType,
			r.colors,
			r.distort,
			r.offset,
			r.rayCount
		], () => {
			let e = o.value, i = s.value, a = d.value;
			if (!e || !i || !a) return;
			e.uniforms.uIntensity.value = r.intensity ?? 1, e.uniforms.uSpeed.value = r.speed ?? 1;
			let c = {
				rotate: 0,
				rotate3d: 1,
				hover: 2
			};
			e.uniforms.uAnimType.value = c[r.animationType ?? "rotate"], e.uniforms.uDistort.value = typeof r.distort == "number" ? r.distort : 0;
			let l = n(r.offset?.x), u = n(r.offset?.y);
			e.uniforms.uOffset.value = [l, u], e.uniforms.uRayCount.value = Math.max(0, Math.floor(r.rayCount ?? 0));
			let f = 0;
			if (Array.isArray(r.colors) && r.colors.length > 0) {
				let e = i.gl, n = r.colors.slice(0, 64);
				f = n.length;
				let o = new Uint8Array(f * 4);
				for (let e = 0; e < f; e++) {
					let [r, i, a] = t(n[e]);
					o[e * 4 + 0] = Math.round(r * 255), o[e * 4 + 1] = Math.round(i * 255), o[e * 4 + 2] = Math.round(a * 255), o[e * 4 + 3] = 255;
				}
				a.image = o, a.width = f, a.height = 1, a.minFilter = e.LINEAR, a.magFilter = e.LINEAR, a.wrapS = e.CLAMP_TO_EDGE, a.wrapT = e.CLAMP_TO_EDGE, a.flipY = !1, a.generateMipmaps = !1, a.format = e.RGBA, a.type = e.UNSIGNED_BYTE, a.needsUpdate = !0;
			} else f = 0;
			e.uniforms.uColorCount.value = f;
		}, { immediate: !0 }), (e, t) => (_(), i("div", {
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
}), Le = "\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 0.0, 1.0);\n}\n", Re = "\nprecision highp float;\n\nuniform float iTime;\nuniform vec3 iResolution;\nuniform vec3 uColor;\nuniform float uAmplitude;\nuniform float uDistance;\nuniform vec2 uMouse;\n\n#define PI 3.1415926538\n\nconst int u_line_count = 40;\nconst float u_line_width = 7.0;\nconst float u_line_blur = 10.0;\n\nfloat Perlin2D(vec2 P) {\n    vec2 Pi = floor(P);\n    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);\n    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);\n    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;\n    Pt += vec2(26.0, 161.0).xyxy;\n    Pt *= Pt;\n    Pt = Pt.xzxz * Pt.yyww;\n    vec4 hash_x = fract(Pt * (1.0 / 951.135664));\n    vec4 hash_y = fract(Pt * (1.0 / 642.949883));\n    vec4 grad_x = hash_x - 0.49999;\n    vec4 grad_y = hash_y - 0.49999;\n    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)\n        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);\n    grad_results *= 1.4142135623730950;\n    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy\n               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);\n    vec4 blend2 = vec4(blend, vec2(1.0 - blend));\n    return dot(grad_results, blend2.zxzx * blend2.wwyy);\n}\n\nfloat pixel(float count, vec2 resolution) {\n    return (1.0 / max(resolution.x, resolution.y)) * count;\n}\n\nfloat lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {\n    float split_offset = (perc * 0.4);\n    float split_point = 0.1 + split_offset;\n\n    float amplitude_normal = smoothstep(split_point, 0.7, st.x);\n    float amplitude_strength = 0.5;\n    float finalAmplitude = amplitude_normal * amplitude_strength\n                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);\n\n    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;\n    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;\n\n    float xnoise = mix(\n        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),\n        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,\n        st.x * 0.3\n    );\n\n    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;\n\n    float line_start = smoothstep(\n        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),\n        y,\n        st.y\n    );\n\n    float line_end = smoothstep(\n        y,\n        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),\n        st.y\n    );\n\n    return clamp(\n        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),\n        0.0,\n        1.0\n    );\n}\n\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = fragCoord / iResolution.xy;\n\n    float line_strength = 1.0;\n    for (int i = 0; i < u_line_count; i++) {\n        float p = float(i) / float(u_line_count);\n        line_strength *= (1.0 - lineFn(\n            uv,\n            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),\n            p,\n            (PI * 1.0) * p,\n            uMouse,\n            iTime,\n            uAmplitude,\n            uDistance\n        ));\n    }\n\n    float colorVal = 1.0 - line_strength;\n    fragColor = vec4(uColor * colorVal, colorVal);\n}\n\nvoid main() {\n    mainImage(gl_FragColor, gl_FragCoord.xy);\n}\n", z = /* @__PURE__ */ l({
	name: "HBitsThreads",
	__name: "HBitsThreads",
	props: {
		color: { default: () => [
			1,
			1,
			1
		] },
		amplitude: { default: 1 },
		distance: { default: 0 },
		enableMouseInteraction: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = w("containerRef"), r = null, a = null, o = null, s = null, c = null, l = [.5, .5], u = [.5, .5], d = () => {
			if (!n.value || !r || !o) return;
			let { clientWidth: e, clientHeight: t } = n.value;
			r.setSize(e, t), o.uniforms.iResolution.value.r = e, o.uniforms.iResolution.value.g = t, o.uniforms.iResolution.value.b = e / t;
		}, f = (e) => {
			if (!n.value) return;
			let t = n.value.getBoundingClientRect();
			u = [(e.clientX - t.left) / t.width, 1 - (e.clientY - t.top) / t.height];
		}, p = () => {
			u = [.5, .5];
		}, m = (e) => {
			if (o && r && s) {
				if (t.enableMouseInteraction) {
					let e = .05;
					l[0] += e * (u[0] - l[0]), l[1] += e * (u[1] - l[1]), o.uniforms.uMouse.value[0] = l[0], o.uniforms.uMouse.value[1] = l[1];
				} else o.uniforms.uMouse.value[0] = .5, o.uniforms.uMouse.value[1] = .5;
				o.uniforms.iTime.value = e * .001, r.render({ scene: s }), c = requestAnimationFrame(m);
			}
		}, v = () => {
			if (!n.value) return;
			y();
			let e = n.value;
			r = new ne({ alpha: !0 }), a = r.gl, a.clearColor(0, 0, 0, 0), a.enable(a.BLEND), a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA);
			let i = new ie(a);
			o = new te(a, {
				vertex: Le,
				fragment: Re,
				uniforms: {
					iTime: { value: 0 },
					iResolution: { value: new D(a.canvas.width, a.canvas.height, a.canvas.width / a.canvas.height) },
					uColor: { value: new D(...t.color) },
					uAmplitude: { value: t.amplitude },
					uDistance: { value: t.distance },
					uMouse: { value: new Float32Array([.5, .5]) }
				}
			}), s = new ee(a, {
				geometry: i,
				program: o
			});
			let l = a.canvas;
			l.style.width = "100%", l.style.height = "100%", l.style.display = "block", e.appendChild(l), window.addEventListener("resize", d), t.enableMouseInteraction && (e.addEventListener("mousemove", f), e.addEventListener("mouseleave", p)), d(), c = requestAnimationFrame(m);
		}, y = () => {
			if (c &&= (cancelAnimationFrame(c), null), window.removeEventListener("resize", d), n.value) {
				n.value.removeEventListener("mousemove", f), n.value.removeEventListener("mouseleave", p);
				let e = n.value.querySelector("canvas");
				e && n.value.removeChild(e);
			}
			a && a.getExtension("WEBGL_lose_context")?.loseContext(), r = null, a = null, o = null, s = null, l = [.5, .5], u = [.5, .5];
		};
		return h(() => {
			v();
		}), g(() => {
			y();
		}), T([
			() => t.color,
			() => t.amplitude,
			() => t.distance,
			() => t.enableMouseInteraction
		], () => {
			v();
		}, { deep: !0 }), (e, t) => (_(), i("div", {
			ref_key: "containerRef",
			ref: n,
			style: {
				width: "100%",
				height: "100%",
				position: "fixed",
				"z-index": "0"
			}
		}, null, 512));
	}
}), ze = { particles: {
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
} }, Be = ["id"], B = /* @__PURE__ */ l({
	name: "HParticles",
	__name: "HParticles",
	setup(e) {
		let t = b("HParticles"), n, r = async () => {
			await oe(ae);
		}, a = async () => {
			n?.destroy(), n = await ae.load({
				id: t.value,
				options: ze
			});
		}, o = async () => {
			n?.destroy();
		};
		return m(() => {
			r();
		}), h(() => {
			a();
		}), g(() => {
			o();
		}), (e, n) => (_(), i("div", { id: t.value }, [y(e.$slots, "default")], 8, Be));
	}
});
L.install = (e) => {
	e.component(L.name, L);
}, R.install = (e) => {
	e.component(R.name, R);
}, z.install = (e) => {
	e.component(z.name, z);
}, B.install = (e) => {
	e.component(B.name, B);
};
//#endregion
//#region src/HButton/HIconButton.vue
var V = /* @__PURE__ */ l({
	name: "HIconButton",
	components: {
		VTooltip: P,
		VIconBtn: he
	},
	__name: "HIconButton",
	props: {
		color: {},
		tooltip: {},
		location: { default: "bottom" }
	},
	setup(e) {
		return (t, r) => e.tooltip ? (_(), n(S(P), {
			key: 0,
			interactive: "",
			location: e.location
		}, {
			activator: E(({ props: n }) => [c(S(he), d({ color: e.color }, d(n, t.$attrs)), null, 16, ["color"])]),
			default: E(() => [a("span", null, x(e.tooltip), 1)]),
			_: 1
		}, 8, ["location"])) : (_(), n(S(he), p(d({ key: 1 }, t.$attrs)), null, 16));
	}
});
//#endregion
//#region src/HButton/index.ts
V.install = (e) => {
	e.component(V.name, V);
};
//#endregion
//#region src/HDateTime/HDatePicker.vue
var Ve = /* @__PURE__ */ l({
	name: "HDatePicker",
	components: {
		VMenu: M,
		VTooltip: P,
		VIcon: j,
		VDatePicker: de
	},
	__name: "HDatePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let r = C(e, "modelValue"), i = Ee(), o = t({
			get: () => r.value ? i.parseISO(r.value) : "",
			set: (e) => {
				e ? r.value = F(e).format("YYYY-MM-DD") : r.value = e;
			}
		});
		return (e, t) => (_(), n(S(M), d({
			"close-on-content-click": !1,
			activator: "parent"
		}, e.$attrs), {
			activator: E(({ props: e }) => [c(S(P), { location: "bottom" }, {
				activator: E(({ props: t }) => [c(S(j), d({ icon: "mdi-calendar" }, d(e, t)), null, 16)]),
				default: E(() => [t[1] ||= a("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: E(() => [c(S(de), {
				modelValue: o.value,
				"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
				"show-week": "",
				"show-adjacent-months": "",
				"first-day-of-week": "1",
				"weeks-in-month": "dynamic"
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16));
	}
}), H = /* @__PURE__ */ l({
	name: "HDate",
	components: {
		VTextField: N,
		HDatePicker: Ve
	},
	__name: "HDate",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = C(e, "modelValue");
		return (e, r) => (_(), n(S(N), d({
			modelValue: t.value,
			"onUpdate:modelValue": r[1] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": E(() => [c(Ve, {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), He = /* @__PURE__ */ l({
	name: "HTimePicker",
	components: {
		VMenu: M,
		VTooltip: P,
		VIcon: j,
		VTimePicker: we
	},
	__name: "HTimePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = C(e, "modelValue");
		return (e, r) => (_(), n(S(M), d({
			"close-on-content-click": !1,
			activator: "parent",
			"min-width": "0"
		}, e.$attrs), {
			activator: E(({ props: e }) => [c(S(P), { location: "bottom" }, {
				activator: E(({ props: t }) => [c(S(j), d({ icon: "mdi-clock-time-four-outline" }, d(e, t)), null, 16)]),
				default: E(() => [r[1] ||= a("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: E(() => [c(S(we), {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e,
				"use-seconds": "",
				format: "24hr"
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16));
	}
}), U = /* @__PURE__ */ l({
	name: "HDateTime",
	components: {
		VTextField: N,
		HDatePicker: Ve,
		HTimePicker: He
	},
	__name: "HDateTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = C(e, "modelValue"), r = b(""), i = b(""), a = (e, t) => {
			let n = e && e.trim() !== "" ? e : "1970-01-01", r = t && t.trim() !== "" ? t : "00:00:00";
			return F(`${n} ${r}`).format("YYYY-MM-DD HH:mm:ss");
		};
		return T(t, (e) => {
			if (e) {
				let t = F(e);
				i.value = t.format("YYYY-MM-DD"), r.value = t.format("HH:mm:ss");
			}
		}), T([i, r], ([e, n]) => {
			t.value = a(e, n);
		}), (e, a) => (_(), n(S(N), d({
			modelValue: t.value,
			"onUpdate:modelValue": a[2] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": E(() => [c(Ve, {
				modelValue: i.value,
				"onUpdate:modelValue": a[0] ||= (e) => i.value = e
			}, null, 8, ["modelValue"])]),
			"append-inner": E(() => [c(He, {
				modelValue: r.value,
				"onUpdate:modelValue": a[1] ||= (e) => r.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), Ue = [
	{
		title: "天",
		value: "days"
	},
	{
		title: "小时",
		value: "hours"
	},
	{
		title: "分",
		value: "minutes"
	},
	{
		title: "秒",
		value: "seconds"
	}
], W = /* @__PURE__ */ l({
	name: "HDuration",
	components: {
		VContainer: A,
		VRow: xe,
		VCol: k,
		VNumberInput: ye,
		VSelect: Se
	},
	__name: "HDuration",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = C(e, "modelValue"), r = b(0), i = b(), a = b(Ue), o = (e) => {
			if (e) {
				let t = F.duration(e, "second");
				if (t) {
					let e = t._data;
					for (let t in e) {
						let n = t, a = e[n];
						a && (r.value = a, i.value = n);
					}
				}
			}
		}, s = (e, n) => {
			if (e && n) {
				let r = n, i = F.duration(e, r).toISOString();
				t.value = i;
			}
		};
		return T(() => t.value, (e) => {
			e && o(e);
		}, { immediate: !0 }), T(i, (e) => {
			e && s(r.value, e);
		}), T(r, (e) => {
			e && s(e, i.value);
		}), (e, t) => (_(), n(S(A), { class: "pa-0" }, {
			default: E(() => [c(S(xe), null, {
				default: E(() => [c(S(k), null, {
					default: E(() => [c(S(ye), {
						modelValue: r.value,
						"onUpdate:modelValue": t[0] ||= (e) => r.value = e,
						label: "数值",
						placeholder: "请输入数值",
						"control-variant": "split",
						inset: ""
					}, null, 8, ["modelValue"])]),
					_: 1
				}), c(S(k), null, {
					default: E(() => [c(S(Se), {
						modelValue: i.value,
						"onUpdate:modelValue": t[1] ||= (e) => i.value = e,
						items: a.value,
						label: "单位",
						clearable: ""
					}, null, 8, ["modelValue", "items"])]),
					_: 1
				})]),
				_: 1
			})]),
			_: 1
		}));
	}
}), G = /* @__PURE__ */ l({
	name: "HTime",
	components: {
		VTextField: N,
		HTimePicker: He
	},
	__name: "HTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = C(e, "modelValue");
		return (e, r) => (_(), n(S(N), d({
			modelValue: t.value,
			"onUpdate:modelValue": r[1] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": E(() => [c(He, {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
});
H.install = (e) => {
	e.component(H.name, H);
}, U.install = (e) => {
	e.component(U.name, U);
}, W.install = (e) => {
	e.component(W.name, W);
}, G.install = (e) => {
	e.component(G.name, G);
};
//#endregion
//#region src/HDialog/HDialog.vue
var K = /* @__PURE__ */ l({
	name: "HDialog",
	components: {
		VDialog: fe,
		HIconButton: V
	},
	__name: "HDialog",
	props: /*@__PURE__*/ u({
		loading: {
			type: Boolean,
			default: !1
		},
		closed: {
			type: Boolean,
			default: !1
		},
		hideActions: {
			type: Boolean,
			default: !1
		},
		maxWidth: { default: 500 },
		confirmLabel: { default: "确认" }
	}, {
		modelValue: {
			type: Boolean,
			default: !1,
			required: !0
		},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ u([
		"close",
		"cancel",
		"confirm"
	], ["update:modelValue"]),
	setup(e, { emit: t }) {
		let i = t, a = C(e, "modelValue"), s = () => {
			a.value = !1, i("close");
		}, l = () => {
			a.value = !1, i("cancel");
		}, u = () => {
			i("confirm");
		};
		return (t, i) => (_(), n(S(fe), {
			modelValue: a.value,
			"onUpdate:modelValue": i[0] ||= (e) => a.value = e,
			"max-width": e.maxWidth,
			persistent: "",
			"z-index": 1900
		}, {
			default: E(() => [c(S(ce), d({
				disabled: e.loading,
				loading: e.loading
			}, t.$attrs), o({
				loader: E(({ isActive: e }) => [c(S(be), {
					active: e,
					height: "4",
					indeterminate: ""
				}, null, 8, ["active"])]),
				default: E(() => [
					c(S(pe)),
					c(S(ue), { class: "pb-2" }, {
						default: E(() => [y(t.$slots, "default")]),
						_: 3
					}),
					e.hideActions ? r("", !0) : (_(), n(S(le), { key: 0 }, {
						default: E(() => [c(S(se), {
							text: "取消",
							color: "red",
							onClick: l
						}), c(S(se), {
							text: e.confirmLabel,
							onClick: u
						}, null, 8, ["text"])]),
						_: 1
					}))
				]),
				_: 2
			}, [e.closed ? {
				name: "append",
				fn: E(() => [c(S(V), {
					icon: "mdi-close",
					tooltip: "关闭",
					onClick: s,
					variant: "text",
					color: "medium-emphasis"
				})]),
				key: "0"
			} : void 0]), 1040, ["disabled", "loading"])]),
			_: 3
		}, 8, ["modelValue", "max-width"]));
	}
});
//#endregion
//#region src/HDialog/index.ts
K.install = (e) => {
	e.component(K.name, K);
};
//#endregion
//#region src/HDivider/HDivider.vue?vue&type=script&setup=true&lang.ts
var We = { class: "d-flex flex-column gr-4 py-4" }, q = /* @__PURE__ */ l({
	name: "HDivider",
	components: { VDivider: pe },
	__name: "HDivider",
	props: { label: {} },
	setup(t) {
		return (n, r) => (_(), i("div", We, [c(S(pe), d({ opacity: ".7" }, n.$attrs), {
			default: E(() => [t.label ? (_(), i(e, { key: 0 }, [s(x(t.label), 1)], 64)) : y(n.$slots, "default", {}, void 0, void 0, 1)]),
			_: 3
		}, 16)]));
	}
});
//#endregion
//#region src/HDivider/index.ts
q.install = (e) => {
	e.component(q.name, q);
};
//#endregion
//#region src/HProgress/HDownloadProgress.vue
var J = /* @__PURE__ */ l({
	name: "HDownloadProgress",
	components: {
		VSnackbar: Ce,
		VContainer: A,
		VRow: xe,
		VCol: k,
		VProgressLinear: be
	},
	__name: "HDownloadProgress",
	props: /*@__PURE__*/ u({ progress: {} }, {
		modelValue: {
			type: Boolean,
			required: !0
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = C(e, "modelValue");
		return (r, i) => (_(), n(S(Ce), d({
			modelValue: t.value,
			"onUpdate:modelValue": i[0] ||= (e) => t.value = e,
			timeout: 2e3,
			location: "center center",
			color: "primary"
		}, r.$attrs), {
			default: E(() => [c(S(A), null, {
				default: E(() => [c(S(xe), {
					"align-content": "center",
					justify: "center"
				}, {
					default: E(() => [c(S(k), {
						class: "text-subtitle-1 text-center",
						cols: "12"
					}, {
						default: E(() => [s("文件下载 " + x(`${e.progress}%`), 1)]),
						_: 1
					}), c(S(k), { cols: "6" }, {
						default: E(() => [c(S(be), {
							"model-value": e.progress,
							"chunk-width": "4",
							color: "purple",
							height: "15",
							rounded: "lg"
						}, null, 8, ["model-value"])]),
						_: 1
					})]),
					_: 1
				})]),
				_: 1
			})]),
			_: 1
		}, 16, ["modelValue"]));
	}
});
//#endregion
//#region src/HProgress/index.ts
J.install = (e) => {
	e.component(J.name, J);
};
//#endregion
//#region src/HLabel/HLabel.vue?vue&type=script&setup=true&lang.ts
var Ge = { class: "flex-1-1-0" }, Ke = { class: "d-flex" }, qe = {
	key: 0,
	class: "d-flex align-self-center mr-1"
}, Je = {
	key: 1,
	class: "d-flex align-self-center"
}, Y = /* @__PURE__ */ l({
	name: "HLabel",
	components: {
		VIcon: j,
		VBtn: se,
		VTooltip: P,
		VLabel: ge,
		VMessages: ve
	},
	__name: "HLabel",
	props: {
		required: {
			type: Boolean,
			default: !1
		},
		text: {},
		message: {},
		tooltip: {},
		hideDetails: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let o = e, s = t(() => !!o.message);
		return (t, o) => (_(), i("div", { class: f(["d-flex w-100", { "mb-3": !e.hideDetails }]) }, [a("div", Ge, [a("div", Ke, [
			e.required ? (_(), i("div", qe, [c(S(j), {
				size: "x-small",
				icon: "mdi-star",
				color: "red"
			})])) : r("", !0),
			c(S(ge), {
				text: e.text,
				class: "font-weight-medium"
			}, {
				default: E(() => [y(t.$slots, "text")]),
				_: 3
			}, 8, ["text"]),
			e.tooltip ? (_(), i("div", Je, [c(S(P), { location: "bottom" }, {
				activator: E(({ props: e }) => [c(S(j), d({
					size: "x-small",
					icon: "mdi-progress-question",
					color: "grey"
				}, e), null, 16)]),
				default: E(() => [o[0] ||= a("span", null, "点击设置日期", -1)]),
				_: 1
			})])) : r("", !0)
		]), s.value ? (_(), n(S(ve), {
			key: 0,
			messages: e.message,
			active: s.value
		}, null, 8, ["messages", "active"])) : r("", !0)])], 2));
	}
});
//#endregion
//#region src/HLabel/index.ts
Y.install = (e) => {
	e.component(Y.name, Y);
};
//#endregion
//#region src/lib/stores/mdiicon.ts
var Ye = je("MdiIcon", {
	state: () => ({ icons: [] }),
	getters: { getAllIcons: (e) => e.icons },
	actions: {
		initialize() {
			if (I(this.icons)) {
				let e = Object.keys(Me).map((e) => Ae(e));
				this.icons = e;
			}
		},
		search(e) {
			if (I(e.trim())) return this.icons;
			let t = e.toLowerCase();
			return this.getAllIcons.filter((e) => e.toLowerCase().match(t));
		}
	}
}), X = /* @__PURE__ */ l({
	name: "HMdiIconSelect",
	components: {
		VAutocomplete: O,
		VExpandXTransition: me,
		VListItem: _e,
		VIcon: j
	},
	__name: "HMdiIconSelect",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = C(e, "modelValue"), i = b([]), a = b(!1), o = b(""), s = Ye(), l = De((e, t) => {
			a.value = !0, t(s.search(e)), a.value = !1;
		}, 500);
		return h(() => {
			a.value = !0, s.initialize(), i.value = s.getAllIcons, a.value = !1;
		}), T(o, (e) => {
			I(e) ? i.value = s.getAllIcons : l(e, (e) => {
				i.value = e;
			});
		}), (e, s) => (_(), n(S(O), d({
			modelValue: t.value,
			"onUpdate:modelValue": s[0] ||= (e) => t.value = e,
			search: o.value,
			"onUpdate:search": s[1] ||= (e) => o.value = e,
			items: i.value,
			loading: a.value,
			clearable: "",
			"single-line": ""
		}, e.$attrs), {
			"prepend-inner": E(() => [c(S(me), null, {
				default: E(() => [t.value ? (_(), n(S(j), {
					key: 0,
					icon: t.value,
					start: ""
				}, null, 8, ["icon"])) : r("", !0)]),
				_: 1
			})]),
			item: E(({ props: e, internalItem: t }) => [c(S(_e), d(e, {
				"prepend-icon": t.value,
				title: t.value
			}), null, 16, ["prepend-icon", "title"])]),
			_: 1
		}, 16, [
			"modelValue",
			"search",
			"items",
			"loading"
		]));
	}
}), Z = /* @__PURE__ */ l({
	name: "HTreeSelect",
	components: {
		VMenu: M,
		VIcon: j,
		VTreeview: Te,
		VTextField: N
	},
	__name: "HTreeSelect",
	props: /*@__PURE__*/ u({ items: {} }, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let r = e, i = C(e, "modelValue"), a = v(), o = b(!1), s = b(!1), l = v([]), u = b(""), f = () => {
			o.value = !0;
		}, p = (e) => {
			o.value = !o.value;
		}, m = () => {
			s.value && a.value?.focus();
		}, h = () => {}, g = (e) => {
			let t = [];
			for (let n of e) {
				let { children: e, ...r } = n;
				e && e.length && (t = t.concat(g(e))), t.push(r);
			}
			return t;
		}, y = (e) => {
			let t = Oe(l.value, (t) => t.id == e);
			t && (u.value = t.name);
		}, x = (e) => {
			!I(e) && I(l.value) && (l.value = g(e), !u.value && i.value && y(i.value));
		}, w = t({
			get: () => i.value ? [i.value] : [],
			set: (e) => {
				e && ke(e) && e.length > 0 ? i.value = e[0] : i.value = "";
			}
		});
		return T(() => r.items, (e) => {
			I(e) || x(e);
		}, { immediate: !0 }), T(i, (e, t) => {
			e && (y(e), o.value &&= !1);
		}, { immediate: !0 }), T(s, (e, t) => {
			e || e === t || (o.value = !1);
		}), (t, r) => (_(), n(S(N), d({
			ref_key: "vTextFieldRef",
			ref: a,
			modelValue: u.value,
			"onUpdate:modelValue": r[3] ||= (e) => u.value = e,
			focused: s.value,
			"onUpdate:focused": r[4] ||= (e) => s.value = e,
			class: ["v-combobox", { "v-combobox--active-menu": o.value }],
			"onMousedown:control": f,
			onAfterLeave: m
		}, t.$attrs), {
			"append-inner": E(() => [c(S(j), {
				icon: "mdi-menu-down",
				onMousedown: p,
				onClick: h,
				class: "v-combobox__menu-icon",
				tabindex: "-1"
			})]),
			default: E(() => [c(S(M), {
				modelValue: o.value,
				"onUpdate:modelValue": r[2] ||= (e) => o.value = e,
				activator: "parent",
				"content-class": "v-combobox__content",
				"open-on-click": !1,
				"close-on-content-click": !1,
				"max-height": "310"
			}, {
				default: E(() => [c(S(Te), {
					activated: w.value,
					"onUpdate:activated": r[0] ||= (e) => w.value = e,
					items: e.items,
					"item-value": "id",
					"item-title": "name",
					activatable: "",
					"indent-lines": "default",
					"separate-roots": "",
					onMousedown: r[1] ||= (e) => e.preventDefault()
				}, null, 8, ["activated", "items"])]),
				_: 1
			}, 8, ["modelValue"])]),
			_: 1
		}, 16, [
			"modelValue",
			"focused",
			"class"
		]));
	}
});
X.install = (e) => {
	e.component(X.name, X);
}, Z.install = (e) => {
	e.component(Z.name, Z);
};
//#endregion
//#region src/HSignIn/HSignInCornerBottom.vue?vue&type=script&setup=true&lang.ts
var Xe = {
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	height: "896",
	width: "967.8852157128662"
}, Ze = {
	id: "linearGradient-3",
	x1: "0.5",
	y1: "0",
	x2: "0.5",
	y2: "1"
}, Qe = ["stop-color"], $e = ["stop-color"], et = /* @__PURE__ */ l({
	name: "HSignInCornerBottom",
	__name: "HSignInCornerBottom",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (t, n) => (_(), i("svg", Xe, [a("defs", null, [n[0] ||= a("path", {
			id: "path-2",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896\n			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806\n			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
		}, null, -1), a("linearGradient", Ze, [a("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, Qe), a("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, $e)])]), n[1] ||= a("g", { opacity: "1" }, [a("use", {
			"xlink:href": "#path-2",
			fill: "url(#linearGradient-3)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), tt = {
	height: "1337",
	width: "1337"
}, nt = {
	id: "linearGradient-2",
	x1: "0.79",
	y1: "0.62",
	x2: "0.21",
	y2: "0.86"
}, rt = ["stop-color"], it = ["stop-color"], at = /* @__PURE__ */ l({
	name: "HSignInCornerTop",
	__name: "HSignInCornerTop",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (t, n) => (_(), i("svg", tt, [a("defs", null, [n[0] ||= a("path", {
			id: "path-1",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
		}, null, -1), a("linearGradient", nt, [a("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, rt), a("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, it)])]), n[1] ||= a("g", { opacity: "1" }, [a("use", {
			"xlink:href": "#path-1",
			fill: "url(#linearGradient-2)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), ot = { class: "corner-top" }, st = { class: "corner-bottom" }, Q = /*#__PURE__*/ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ l({
	name: "HSignInBackground",
	components: {
		HSignInCornerBottom: et,
		HSignInCornerTop: at
	},
	__name: "HSignInBackground",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (_(), i("div", null, [a("div", ot, [c(at, {
			"start-color": e.startColor,
			"end-color": e.endColor
		}, null, 8, ["start-color", "end-color"])]), a("div", st, [c(et, {
			"start-color": e.endColor,
			"end-color": e.startColor
		}, null, 8, ["start-color", "end-color"])])]));
	}
}), [["__scopeId", "data-v-7774e47e"]]);
//#endregion
//#region src/HSignIn/index.ts
Q.install = (e) => {
	e.component(Q.name, Q);
};
//#endregion
//#region src/HItem/HLabelItem.vue?vue&type=script&setup=true&lang.ts
var ct = { class: "w-20" }, lt = { class: "w-50" }, $ = /* @__PURE__ */ l({
	name: "HLabelItem",
	components: { HLabel: Y },
	__name: "HLabelItem",
	props: {
		label: {},
		required: {
			type: Boolean,
			default: !1
		},
		justify: { default: "center" },
		align: { default: "center" },
		right: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let n = e, r = t(() => {
			let e = [];
			return n.justify && e.push(`justify-${n.justify}`), n.align && e.push(`align-${n.align}`), e;
		});
		return (t, n) => (_(), i("div", { class: f([
			"d-flex",
			...r.value,
			"ga-4"
		]) }, [
			a("div", ct, [c(S(Y), {
				text: e.label,
				required: e.required,
				"hide-details": "",
				class: f([{ "justify-end": e.right }])
			}, null, 8, [
				"text",
				"required",
				"class"
			])]),
			a("div", lt, [y(t.$slots, "default")]),
			a("div", null, [y(t.$slots, "append")])
		], 2));
	}
});
//#endregion
//#region src/HItem/index.ts
$.install = (e) => {
	e.component($.name, $);
};
//#endregion
//#region src/index.ts
var ut = [
	L,
	R,
	z,
	H,
	U,
	K,
	q,
	J,
	W,
	X,
	V,
	Y,
	$,
	B,
	Q,
	G,
	Z
], dt = { install: (e) => {
	ut.map((t) => t.install(e));
} };
//#endregion
export { L as HBitsGalaxy, R as HBitsPrismaticBurst, z as HBitsThreads, H as HDate, U as HDateTime, K as HDialog, q as HDivider, J as HDownloadProgress, W as HDuration, V as HIconButton, Y as HLabel, $ as HLabelItem, X as HMdiIconSelect, B as HParticles, Q as HSignInBackground, G as HTime, Z as HTreeSelect, dt as default };

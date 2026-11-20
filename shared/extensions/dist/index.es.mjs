import { createElementBlock as e, createElementVNode as t, createVNode as n, defineComponent as r, mergeProps as i, onBeforeMount as a, onMounted as o, onUnmounted as s, openBlock as c, ref as l, renderSlot as u, shallowRef as d, useTemplateRef as f, watch as p } from "vue";
import { Color as m, Mesh as h, Program as g, Renderer as _, Texture as v, Triangle as y } from "ogl";
import { tsParticles as b } from "@tsparticles/engine";
import { loadTrianglesPreset as x } from "@tsparticles/preset-triangles";
// src/HAnimate/HBitsGalaxy.vue?vue&type=script&setup=true&lang.ts
var S = "\nattribute vec2 uv;\nattribute vec2 position;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 0, 1);\n}\n", C = "\nprecision highp float;\n\nuniform float uTime;\nuniform vec3 uResolution;\nuniform vec2 uFocal;\nuniform vec2 uRotation;\nuniform float uStarSpeed;\nuniform float uDensity;\nuniform float uHueShift;\nuniform float uSpeed;\nuniform vec2 uMouse;\nuniform float uGlowIntensity;\nuniform float uSaturation;\nuniform bool uMouseRepulsion;\nuniform float uTwinkleIntensity;\nuniform float uRotationSpeed;\nuniform float uRepulsionStrength;\nuniform float uMouseActiveFactor;\nuniform float uAutoCenterRepulsion;\nuniform bool uTransparent;\n\nvarying vec2 vUv;\n\n#define NUM_LAYER 4.0\n#define STAR_COLOR_CUTOFF 0.2\n#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)\n#define PERIOD 3.0\n\nfloat Hash21(vec2 p) {\n  p = fract(p * vec2(123.34, 456.21));\n  p += dot(p, p + 45.32);\n  return fract(p.x * p.y);\n}\n\nfloat tri(float x) {\n  return abs(fract(x) * 2.0 - 1.0);\n}\n\nfloat tris(float x) {\n  float t = fract(x);\n  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));\n}\n\nfloat trisn(float x) {\n  float t = fract(x);\n  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;\n}\n\nvec3 hsv2rgb(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\nfloat Star(vec2 uv, float flare) {\n  float d = length(uv);\n  float m = (0.05 * uGlowIntensity) / d;\n  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\n  m += rays * flare * uGlowIntensity;\n  uv *= MAT45;\n  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));\n  m += rays * 0.3 * flare * uGlowIntensity;\n  m *= smoothstep(1.0, 0.2, d);\n  return m;\n}\n\nvec3 StarLayer(vec2 uv) {\n  vec3 col = vec3(0.0);\n\n  vec2 gv = fract(uv) - 0.5;\n  vec2 id = floor(uv);\n\n  for (int y = -1; y <= 1; y++) {\n    for (int x = -1; x <= 1; x++) {\n      vec2 offset = vec2(float(x), float(y));\n      vec2 si = id + vec2(float(x), float(y));\n      float seed = Hash21(si);\n      float size = fract(seed * 345.32);\n      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));\n      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;\n\n      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;\n      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;\n      float grn = min(red, blu) * seed;\n      vec3 base = vec3(red, grn, blu);\n\n      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;\n      hue = fract(hue + uHueShift / 360.0);\n      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;\n      float val = max(max(base.r, base.g), base.b);\n      base = hsv2rgb(vec3(hue, sat, val));\n\n      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;\n\n      float star = Star(gv - offset - pad, flareSize);\n      vec3 color = base;\n\n      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;\n      twinkle = mix(1.0, twinkle, uTwinkleIntensity);\n      star *= twinkle;\n\n      col += star * size * color;\n    }\n  }\n\n  return col;\n}\n\nvoid main() {\n  vec2 focalPx = uFocal * uResolution.xy;\n  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;\n\n  vec2 mouseNorm = uMouse - vec2(0.5);\n\n  if (uAutoCenterRepulsion > 0.0) {\n    vec2 centerUV = vec2(0.0, 0.0); // Center in UV space\n    float centerDist = length(uv - centerUV);\n    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));\n    uv += repulsion * 0.05;\n  } else if (uMouseRepulsion) {\n    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;\n    float mouseDist = length(uv - mousePosUV);\n    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));\n    uv += repulsion * 0.05 * uMouseActiveFactor;\n  } else {\n    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;\n    uv += mouseOffset;\n  }\n\n  float autoRotAngle = uTime * uRotationSpeed;\n  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));\n  uv = autoRot * uv;\n\n  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;\n\n  vec3 col = vec3(0.0);\n\n  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {\n    float depth = fract(i + uStarSpeed * uSpeed);\n    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);\n    float fade = depth * smoothstep(1.0, 0.9, depth);\n    col += StarLayer(uv * scale + i * 453.32) * fade;\n  }\n\n  if (uTransparent) {\n    float alpha = length(col);\n    alpha = smoothstep(0.0, 0.3, alpha); // Enhance contrast\n    alpha = min(alpha, 1.0); // Clamp to maximum 1.0\n    gl_FragColor = vec4(col, alpha);\n  } else {\n    gl_FragColor = vec4(col, 1.0);\n  }\n}\n", w = /* @__PURE__ */ r({
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
	setup(t) {
		let n = t, r = f("ctnDom"), a = l({
			x: .5,
			y: .5
		}), u = l({
			x: .5,
			y: .5
		}), d = l(0), v = l(0), b = null, x = () => {
			if (!r.value) return;
			let e = r.value, t = new _({
				alpha: n.transparent,
				premultipliedAlpha: !1
			}), i = t.gl;
			n.transparent ? (i.enable(i.BLEND), i.blendFunc(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA), i.clearColor(0, 0, 0, 0)) : i.clearColor(0, 0, 0, 1);
			let o;
			function s() {
				t.setSize(e.offsetWidth * 1, e.offsetHeight * 1), o && (o.uniforms.uResolution.value = new m(i.canvas.width, i.canvas.height, i.canvas.width / i.canvas.height));
			}
			window.addEventListener("resize", s, !1), s();
			let c = new y(i);
			o = new g(i, {
				vertex: S,
				fragment: C,
				uniforms: {
					uTime: { value: 0 },
					uResolution: { value: new m(i.canvas.width, i.canvas.height, i.canvas.width / i.canvas.height) },
					uFocal: { value: new Float32Array(n.focal) },
					uRotation: { value: new Float32Array(n.rotation) },
					uStarSpeed: { value: n.starSpeed },
					uDensity: { value: n.density },
					uHueShift: { value: n.hueShift },
					uSpeed: { value: n.speed },
					uMouse: { value: new Float32Array([u.value.x, u.value.y]) },
					uGlowIntensity: { value: n.glowIntensity },
					uSaturation: { value: n.saturation },
					uMouseRepulsion: { value: n.mouseRepulsion },
					uTwinkleIntensity: { value: n.twinkleIntensity },
					uRotationSpeed: { value: n.rotationSpeed },
					uRepulsionStrength: { value: n.repulsionStrength },
					uMouseActiveFactor: { value: 0 },
					uAutoCenterRepulsion: { value: n.autoCenterRepulsion },
					uTransparent: { value: n.transparent }
				}
			});
			let l = new h(i, {
				geometry: c,
				program: o
			}), f;
			function p(e) {
				f = requestAnimationFrame(p), n.disableAnimation || (o.uniforms.uTime.value = e * .001, o.uniforms.uStarSpeed.value = e * .001 * n.starSpeed / 10);
				let r = .05;
				u.value.x += (a.value.x - u.value.x) * r, u.value.y += (a.value.y - u.value.y) * r, v.value += (d.value - v.value) * r, o.uniforms.uMouse.value[0] = u.value.x, o.uniforms.uMouse.value[1] = u.value.y, o.uniforms.uMouseActiveFactor.value = v.value, t.render({ scene: l });
			}
			f = requestAnimationFrame(p), e.appendChild(i.canvas);
			function x(t) {
				let n = e.getBoundingClientRect(), r = (t.clientX - n.left) / n.width, i = 1 - (t.clientY - n.top) / n.height;
				a.value = {
					x: r,
					y: i
				}, d.value = 1;
			}
			function w() {
				d.value = 0;
			}
			n.mouseInteraction && (e.addEventListener("mousemove", x), e.addEventListener("mouseleave", w)), b = () => {
				cancelAnimationFrame(f), window.removeEventListener("resize", s), n.mouseInteraction && (e.removeEventListener("mousemove", x), e.removeEventListener("mouseleave", w)), e.removeChild(i.canvas), i.getExtension("WEBGL_lose_context")?.loseContext();
			};
		};
		return o(() => {
			b?.(), x();
		}), s(() => {
			b?.();
		}), p(() => n, () => {
			b?.(), x();
		}, { deep: !0 }), (t, n) => (c(), e("div", i({
			ref_key: "ctnDom",
			ref: r,
			style: {
				width: "100%",
				height: "100%",
				position: "fixed",
				"z-index": "0"
			}
		}, t.$attrs), null, 16));
	}
}), T = "#version 300 es\nin vec2 position;\nin vec2 uv;\nout vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = vec4(position, 0.0, 1.0);\n}\n", E = "#version 300 es\nprecision highp float;\nprecision highp int;\n\nout vec4 fragColor;\n\nuniform vec2  uResolution;\nuniform float uTime;\n\nuniform float uIntensity;\nuniform float uSpeed;\nuniform int   uAnimType;\nuniform vec2  uMouse;\nuniform int   uColorCount;\nuniform float uDistort;\nuniform vec2  uOffset;\nuniform sampler2D uGradient;\nuniform float uNoiseAmount;\nuniform int   uRayCount;\n\nfloat hash21(vec2 p){\n    p = floor(p);\n    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));\n    return fract(f);\n}\n\nmat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }\n\nfloat layeredNoise(vec2 fragPx){\n    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);\n    vec2 q = rot30() * p;\n    float n = 0.0;\n    n += 0.40 * hash21(q);\n    n += 0.25 * hash21(q * 2.0 + 17.0);\n    n += 0.20 * hash21(q * 4.0 + 47.0);\n    n += 0.10 * hash21(q * 8.0 + 113.0);\n    n += 0.05 * hash21(q * 16.0 + 191.0);\n    return n;\n}\n\nvec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){\n    float focal = res.y * max(dist, 1e-3);\n    return normalize(vec3(2.0 * (frag - offset) - res, focal));\n}\n\nfloat edgeFade(vec2 frag, vec2 res, vec2 offset){\n    vec2 toC = frag - 0.5 * res - offset;\n    float r = length(toC) / (0.5 * min(res.x, res.y));\n    float x = clamp(r, 0.0, 1.0);\n    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);\n    float s = q * 0.5;\n    s = pow(s, 1.5);\n    float tail = 1.0 - pow(1.0 - s, 2.0);\n    s = mix(s, tail, 0.2);\n    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;\n    return clamp(s + dn, 0.0, 1.0);\n}\n\nmat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }\nmat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }\nmat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }\n\nvec3 sampleGradient(float t){\n    t = clamp(t, 0.0, 1.0);\n    return texture(uGradient, vec2(t, 0.5)).rgb;\n}\n\nvec2 rot2(vec2 v, float a){\n    float s = sin(a), c = cos(a);\n    return mat2(c, -s, s, c) * v;\n}\n\nfloat bendAngle(vec3 q, float t){\n    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)\n            + 0.7 * sin(q.y * 0.50 - t * 0.5)\n            + 0.6 * sin(q.z * 0.60 + t * 0.7);\n    return a;\n}\n\nvoid main(){\n    vec2 frag = gl_FragCoord.xy;\n    float t = uTime * uSpeed;\n    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);\n    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);\n    float marchT = 0.0;\n    vec3 col = vec3(0.0);\n    float n = layeredNoise(frag);\n    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));\n    mat2 M2 = mat2(c.x, c.y, c.z, c.w);\n    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;\n\n    mat3 rot3dMat = mat3(1.0);\n    if(uAnimType == 1){\n      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);\n      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);\n    }\n    mat3 hoverMat = mat3(1.0);\n    if(uAnimType == 2){\n      vec2 m = uMouse * 2.0 - 1.0;\n      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);\n      hoverMat = rotY(ang.y) * rotX(ang.x);\n    }\n\n    for (int i = 0; i < 44; ++i) {\n        vec3 P = marchT * dir;\n        P.z -= 2.0;\n        float rad = length(P);\n        vec3 Pl = P * (10.0 / max(rad, 1e-6));\n\n        if(uAnimType == 0){\n            Pl.xz *= M2;\n        } else if(uAnimType == 1){\n      Pl = rot3dMat * Pl;\n        } else {\n      Pl = hoverMat * Pl;\n        }\n\n        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;\n\n        float grow = smoothstep(0.35, 3.0, marchT);\n        float a1 = amp * grow * bendAngle(Pl * 0.6, t);\n        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);\n        vec3 Pb = Pl;\n        Pb.xz = rot2(Pb.xz, a1);\n        Pb.xy = rot2(Pb.xy, a2);\n\n        float rayPattern = smoothstep(\n            0.5, 0.7,\n            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *\n            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))\n        );\n\n        if (uRayCount > 0) {\n            float ang = atan(Pb.y, Pb.x);\n            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);\n            comb = pow(comb, 3.0);\n            rayPattern *= smoothstep(0.15, 0.95, comb);\n        }\n\n        vec3 spectralDefault = 1.0 + vec3(\n            cos(marchT * 3.0 + 0.0),\n            cos(marchT * 3.0 + 1.0),\n            cos(marchT * 3.0 + 2.0)\n        );\n\n        float saw = fract(marchT * 0.25);\n        float tRay = saw * saw * (3.0 - 2.0 * saw);\n        vec3 userGradient = 2.0 * sampleGradient(tRay);\n        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;\n        vec3 base = (0.05 / (0.4 + stepLen))\n                  * smoothstep(5.0, 0.0, rad)\n                  * spectral;\n\n        col += base * rayPattern;\n        marchT += stepLen;\n    }\n\n    col *= edgeFade(frag, uResolution, uOffset);\n    col *= uIntensity;\n\n    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\n}", D = /* @__PURE__ */ r({
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
	setup(t) {
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
		}, i = t, a = f("containerRef"), u = l(null), d = l(null), m = l([.5, .5]), b = l([.5, .5]), x = l(i.paused), S = l(null), C = l(i.hoverDampness), w = l(!0), D = l(null), O = l(null);
		return o(() => {
			let e = a.value;
			if (!e) return;
			let t = Math.min(window.devicePixelRatio || 1, 2), n = new _({
				dpr: t,
				alpha: !1,
				antialias: !1
			});
			d.value = n;
			let r = n.gl;
			r.canvas.style.position = "absolute", r.canvas.style.inset = "0", r.canvas.style.width = "100%", r.canvas.style.height = "100%", r.canvas.style.mixBlendMode = i.mixBlendMode && i.mixBlendMode !== "none" ? i.mixBlendMode : "", e.appendChild(r.canvas);
			let o = new Uint8Array([
				255,
				255,
				255,
				255
			]), c = new v(r, {
				image: o,
				width: 1,
				height: 1,
				generateMipmaps: !1,
				flipY: !1
			});
			c.minFilter = r.LINEAR, c.magFilter = r.LINEAR, c.wrapS = r.CLAMP_TO_EDGE, c.wrapT = r.CLAMP_TO_EDGE, S.value = c;
			let l = new g(r, {
				vertex: T,
				fragment: E,
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
					uGradient: { value: c },
					uNoiseAmount: { value: .8 },
					uRayCount: { value: 0 }
				}
			});
			u.value = l;
			let f = new y(r), p = new h(r, {
				geometry: f,
				program: l
			});
			O.value = f, D.value = p;
			let k = () => {
				let t = e.clientWidth || 1, i = e.clientHeight || 1;
				n.setSize(t, i), l.uniforms.uResolution.value = [r.drawingBufferWidth, r.drawingBufferHeight];
			}, A = null;
			"ResizeObserver" in window ? (A = new ResizeObserver(k), A.observe(e)) : window.addEventListener("resize", k), k();
			let j = (t) => {
				let n = e.getBoundingClientRect(), r = (t.clientX - n.left) / Math.max(n.width, 1), i = (t.clientY - n.top) / Math.max(n.height, 1);
				m.value = [Math.min(Math.max(r, 0), 1), Math.min(Math.max(i, 0), 1)];
			};
			e.addEventListener("pointermove", j, { passive: !0 });
			let M = null;
			"IntersectionObserver" in window && (M = new IntersectionObserver((e) => {
				e[0] && (w.value = e[0].isIntersecting);
			}, {
				root: null,
				threshold: .01
			}), M.observe(e));
			let N = () => {};
			document.addEventListener("visibilitychange", N);
			let P = 0, F = performance.now(), I = 0, L = (e) => {
				let t = Math.max(0, e - F) * .001;
				F = e;
				let r = w.value && !document.hidden;
				if (x.value || (I += t), !r) {
					P = requestAnimationFrame(L);
					return;
				}
				let i = .02 + Math.max(0, Math.min(1, C.value)) * .5, a = 1 - Math.exp(-t / i), o = m.value, s = b.value;
				s[0] += (o[0] - s[0]) * a, s[1] += (o[1] - s[1]) * a, l.uniforms.uMouse.value = s, l.uniforms.uTime.value = I, n.render({ scene: D.value }), P = requestAnimationFrame(L);
			};
			P = requestAnimationFrame(L), s(() => {
				cancelAnimationFrame(P), e.removeEventListener("pointermove", j), A?.disconnect(), A || window.removeEventListener("resize", k), M?.disconnect(), document.removeEventListener("visibilitychange", N);
				try {
					e.removeChild(r.canvas);
				} catch {}
				D.value = null, O.value = null, u.value = null;
				try {
					let e = d.value?.gl;
					e && S.value?.texture && e.deleteTexture(S.value.texture);
				} catch {}
				d.value = null, S.value = null;
			});
		}), p(() => i.paused, (e) => x.value = e), p(() => i.hoverDampness, (e) => C.value = e), p(() => i.mixBlendMode, (e) => {
			let t = d.value?.gl?.canvas;
			t && (t.style.mixBlendMode = e && e !== "none" ? e : "");
		}), p(() => [
			i.intensity,
			i.speed,
			i.animationType,
			i.colors,
			i.distort,
			i.offset,
			i.rayCount
		], () => {
			let e = u.value, t = d.value, a = S.value;
			if (!e || !t || !a) return;
			e.uniforms.uIntensity.value = i.intensity ?? 1, e.uniforms.uSpeed.value = i.speed ?? 1;
			let o = {
				rotate: 0,
				rotate3d: 1,
				hover: 2
			};
			e.uniforms.uAnimType.value = o[i.animationType ?? "rotate"], e.uniforms.uDistort.value = typeof i.distort == "number" ? i.distort : 0;
			let s = r(i.offset?.x), c = r(i.offset?.y);
			e.uniforms.uOffset.value = [s, c], e.uniforms.uRayCount.value = Math.max(0, Math.floor(i.rayCount ?? 0));
			let l = 0;
			if (Array.isArray(i.colors) && i.colors.length > 0) {
				let e = t.gl, r = i.colors.slice(0, 64);
				l = r.length;
				let o = new Uint8Array(l * 4);
				for (let e = 0; e < l; e++) {
					let [t, i, a] = n(r[e]);
					o[e * 4 + 0] = Math.round(t * 255), o[e * 4 + 1] = Math.round(i * 255), o[e * 4 + 2] = Math.round(a * 255), o[e * 4 + 3] = 255;
				}
				a.image = o, a.width = l, a.height = 1, a.minFilter = e.LINEAR, a.magFilter = e.LINEAR, a.wrapS = e.CLAMP_TO_EDGE, a.wrapT = e.CLAMP_TO_EDGE, a.flipY = !1, a.generateMipmaps = !1, a.format = e.RGBA, a.type = e.UNSIGNED_BYTE, a.needsUpdate = !0;
			} else l = 0;
			e.uniforms.uColorCount.value = l;
		}, { immediate: !0 }), (t, n) => (c(), e("div", {
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
}), O = "\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 0.0, 1.0);\n}\n", k = "\nprecision highp float;\n\nuniform float iTime;\nuniform vec3 iResolution;\nuniform vec3 uColor;\nuniform float uAmplitude;\nuniform float uDistance;\nuniform vec2 uMouse;\n\n#define PI 3.1415926538\n\nconst int u_line_count = 40;\nconst float u_line_width = 7.0;\nconst float u_line_blur = 10.0;\n\nfloat Perlin2D(vec2 P) {\n    vec2 Pi = floor(P);\n    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);\n    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);\n    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;\n    Pt += vec2(26.0, 161.0).xyxy;\n    Pt *= Pt;\n    Pt = Pt.xzxz * Pt.yyww;\n    vec4 hash_x = fract(Pt * (1.0 / 951.135664));\n    vec4 hash_y = fract(Pt * (1.0 / 642.949883));\n    vec4 grad_x = hash_x - 0.49999;\n    vec4 grad_y = hash_y - 0.49999;\n    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)\n        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);\n    grad_results *= 1.4142135623730950;\n    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy\n               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);\n    vec4 blend2 = vec4(blend, vec2(1.0 - blend));\n    return dot(grad_results, blend2.zxzx * blend2.wwyy);\n}\n\nfloat pixel(float count, vec2 resolution) {\n    return (1.0 / max(resolution.x, resolution.y)) * count;\n}\n\nfloat lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {\n    float split_offset = (perc * 0.4);\n    float split_point = 0.1 + split_offset;\n\n    float amplitude_normal = smoothstep(split_point, 0.7, st.x);\n    float amplitude_strength = 0.5;\n    float finalAmplitude = amplitude_normal * amplitude_strength\n                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);\n\n    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;\n    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;\n\n    float xnoise = mix(\n        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),\n        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,\n        st.x * 0.3\n    );\n\n    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;\n\n    float line_start = smoothstep(\n        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),\n        y,\n        st.y\n    );\n\n    float line_end = smoothstep(\n        y,\n        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),\n        st.y\n    );\n\n    return clamp(\n        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),\n        0.0,\n        1.0\n    );\n}\n\nvoid mainImage(out vec4 fragColor, in vec2 fragCoord) {\n    vec2 uv = fragCoord / iResolution.xy;\n\n    float line_strength = 1.0;\n    for (int i = 0; i < u_line_count; i++) {\n        float p = float(i) / float(u_line_count);\n        line_strength *= (1.0 - lineFn(\n            uv,\n            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),\n            p,\n            (PI * 1.0) * p,\n            uMouse,\n            iTime,\n            uAmplitude,\n            uDistance\n        ));\n    }\n\n    float colorVal = 1.0 - line_strength;\n    fragColor = vec4(uColor * colorVal, colorVal);\n}\n\nvoid main() {\n    mainImage(gl_FragColor, gl_FragCoord.xy);\n}\n", A = /* @__PURE__ */ r({
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
	setup(t) {
		let n = t, r = f("containerRef"), i = null, a = null, l = null, u = null, d = null, v = [.5, .5], b = [.5, .5], x = () => {
			if (!r.value || !i || !l) return;
			let { clientWidth: e, clientHeight: t } = r.value;
			i.setSize(e, t), l.uniforms.iResolution.value.r = e, l.uniforms.iResolution.value.g = t, l.uniforms.iResolution.value.b = e / t;
		}, S = (e) => {
			if (!r.value) return;
			let t = r.value.getBoundingClientRect();
			b = [(e.clientX - t.left) / t.width, 1 - (e.clientY - t.top) / t.height];
		}, C = () => {
			b = [.5, .5];
		}, w = (e) => {
			if (l && i && u) {
				if (n.enableMouseInteraction) {
					let e = .05;
					v[0] += e * (b[0] - v[0]), v[1] += e * (b[1] - v[1]), l.uniforms.uMouse.value[0] = v[0], l.uniforms.uMouse.value[1] = v[1];
				} else l.uniforms.uMouse.value[0] = .5, l.uniforms.uMouse.value[1] = .5;
				l.uniforms.iTime.value = e * .001, i.render({ scene: u }), d = requestAnimationFrame(w);
			}
		}, T = () => {
			if (!r.value) return;
			E();
			let e = r.value;
			i = new _({ alpha: !0 }), a = i.gl, a.clearColor(0, 0, 0, 0), a.enable(a.BLEND), a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA);
			let t = new y(a);
			l = new g(a, {
				vertex: O,
				fragment: k,
				uniforms: {
					iTime: { value: 0 },
					iResolution: { value: new m(a.canvas.width, a.canvas.height, a.canvas.width / a.canvas.height) },
					uColor: { value: new m(...n.color) },
					uAmplitude: { value: n.amplitude },
					uDistance: { value: n.distance },
					uMouse: { value: new Float32Array([.5, .5]) }
				}
			}), u = new h(a, {
				geometry: t,
				program: l
			});
			let o = a.canvas;
			o.style.width = "100%", o.style.height = "100%", o.style.display = "block", e.appendChild(o), window.addEventListener("resize", x), n.enableMouseInteraction && (e.addEventListener("mousemove", S), e.addEventListener("mouseleave", C)), x(), d = requestAnimationFrame(w);
		}, E = () => {
			if (d &&= (cancelAnimationFrame(d), null), window.removeEventListener("resize", x), r.value) {
				r.value.removeEventListener("mousemove", S), r.value.removeEventListener("mouseleave", C);
				let e = r.value.querySelector("canvas");
				e && r.value.removeChild(e);
			}
			a && a.getExtension("WEBGL_lose_context")?.loseContext(), i = null, a = null, l = null, u = null, v = [.5, .5], b = [.5, .5];
		};
		return o(() => {
			T();
		}), s(() => {
			E();
		}), p([
			() => n.color,
			() => n.amplitude,
			() => n.distance,
			() => n.enableMouseInteraction
		], () => {
			T();
		}, { deep: !0 }), (t, n) => (c(), e("div", {
			ref_key: "containerRef",
			ref: r,
			style: {
				width: "100%",
				height: "100%",
				position: "fixed",
				"z-index": "0"
			}
		}, null, 512));
	}
}), j = { particles: {
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
} }, M = ["id"], N = /* @__PURE__ */ r({
	name: "HParticles",
	__name: "HParticles",
	setup(t) {
		let n = d("HParticles"), r, i = () => b.pluginManager.presets.has("triangles"), l = async () => {
			i() || await x(b);
		}, f = async () => {
			r?.destroy(), r = await b.load({
				id: n.value,
				options: j
			});
		}, p = async () => {
			r?.destroy();
		};
		return a(() => {
			l();
		}), o(() => {
			f();
		}), s(() => {
			p();
		}), (t, r) => (c(), e("div", { id: n.value }, [u(t.$slots, "default")], 8, M));
	}
});
w.install = (e) => {
	e.component(w.name, w);
}, D.install = (e) => {
	e.component(D.name, D);
}, A.install = (e) => {
	e.component(A.name, A);
}, N.install = (e) => {
	e.component(N.name, N);
};
// src/HSignIn/HSignInCornerBottom.vue?vue&type=script&setup=true&lang.ts
var P = {
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	height: "896",
	width: "967.8852157128662"
}, F = {
	id: "linearGradient-3",
	x1: "0.5",
	y1: "0",
	x2: "0.5",
	y2: "1"
}, I = ["stop-color"], L = ["stop-color"], R = /* @__PURE__ */ r({
	name: "HSignInCornerBottom",
	__name: "HSignInCornerBottom",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(n) {
		return (r, i) => (c(), e("svg", P, [t("defs", null, [i[0] ||= t("path", {
			id: "path-2",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896\n			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806\n			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
		}, null, -1), t("linearGradient", F, [t("stop", {
			offset: "0",
			"stop-color": n.startColor,
			"stop-opacity": "1"
		}, null, 8, I), t("stop", {
			offset: "1",
			"stop-color": n.endColor,
			"stop-opacity": "1"
		}, null, 8, L)])]), i[1] ||= t("g", { opacity: "1" }, [t("use", {
			"xlink:href": "#path-2",
			fill: "url(#linearGradient-3)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), z = {
	height: "1337",
	width: "1337"
}, B = {
	id: "linearGradient-2",
	x1: "0.79",
	y1: "0.62",
	x2: "0.21",
	y2: "0.86"
}, V = ["stop-color"], H = ["stop-color"], U = /* @__PURE__ */ r({
	name: "HSignInCornerTop",
	__name: "HSignInCornerTop",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(n) {
		return (r, i) => (c(), e("svg", z, [t("defs", null, [i[0] ||= t("path", {
			id: "path-1",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
		}, null, -1), t("linearGradient", B, [t("stop", {
			offset: "0",
			"stop-color": n.startColor,
			"stop-opacity": "1"
		}, null, 8, V), t("stop", {
			offset: "1",
			"stop-color": n.endColor,
			"stop-opacity": "1"
		}, null, 8, H)])]), i[1] ||= t("g", { opacity: "1" }, [t("use", {
			"xlink:href": "#path-1",
			fill: "url(#linearGradient-2)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), W = { class: "corner-top" }, G = { class: "corner-bottom" }, K = /*#__PURE__*/ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ r({
	name: "HSignInBackground",
	components: {
		HSignInCornerBottom: R,
		HSignInCornerTop: U
	},
	__name: "HSignInBackground",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(r) {
		return (i, a) => (c(), e("div", null, [t("div", W, [n(U, {
			"start-color": r.startColor,
			"end-color": r.endColor
		}, null, 8, ["start-color", "end-color"])]), t("div", G, [n(R, {
			"start-color": r.endColor,
			"end-color": r.startColor
		}, null, 8, ["start-color", "end-color"])])]));
	}
}), [["__scopeId", "data-v-7774e47e"]]);
// src/HSignIn/index.ts
K.install = (e) => {
	e.component(K.name, K);
};
// src/index.ts
var q = [
	w,
	D,
	A,
	N,
	K
], J = { install: (e) => {
	q.map((t) => t.install(e));
} };
export { w as HBitsGalaxy, D as HBitsPrismaticBurst, A as HBitsThreads, N as HParticles, K as HSignInBackground, J as default };

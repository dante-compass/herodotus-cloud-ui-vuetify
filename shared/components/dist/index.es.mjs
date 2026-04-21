import { computed as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createSlots as a, createTextVNode as o, createVNode as s, defineComponent as c, mergeModels as l, mergeProps as u, nextTick as d, onMounted as f, onUnmounted as p, openBlock as m, ref as ee, renderSlot as h, shallowRef as g, toDisplayString as _, unref as v, useModel as y, useSlots as b, watch as x, withCtx as S } from "vue";
import { VAutocomplete as C, VBtn as w, VCard as T, VCardActions as te, VCardText as ne, VCol as E, VContainer as D, VDatePicker as O, VDialog as k, VDivider as re, VExpandXTransition as ie, VIcon as A, VLabel as ae, VListItem as oe, VMenu as j, VMessages as se, VNumberInput as ce, VProgressLinear as le, VRow as M, VSelect as N, VTextField as P, VTimePicker as F, VTooltip as I, VTreeview as L } from "vuetify/components";
import { debounce as ue, find as de, isArray as fe, isEmpty as R, kebabCase as pe } from "lodash-es";
import { useDate as me } from "vuetify";
import { moment as z } from "@herodotus/core";
import { tsParticles as B } from "@tsparticles/engine";
import { loadBasic as he } from "@tsparticles/basic";
import { loadParticlesLinksInteraction as ge } from "@tsparticles/interaction-particles-links";
import { defineStore as _e } from "pinia";
import * as ve from "@mdi/js";
//#endregion
//#region src/HButton/HButton.vue
var V = /* @__PURE__ */ c({
	name: "HButton",
	components: {
		VBtn: w,
		VIcon: A
	},
	__name: "HButton",
	props: {
		icon: {},
		color: {},
		tooltip: {},
		location: { default: "bottom" }
	},
	setup(r) {
		let i = r, a = b(), s = e(() => !R(i.icon)), c = e(() => R(a.default) ? void 0 : i.color);
		return (e, i) => (m(), t(v(w), u({
			icon: s.value,
			color: c.value
		}, e.$attrs), {
			append: S(() => [h(e.$slots, "append")]),
			prepend: S(() => [h(e.$slots, "prepend")]),
			loader: S(() => [h(e.$slots, "loader")]),
			default: S(() => [!e.$slots.default && s.value ? (m(), t(v(A), {
				key: 0,
				icon: r.icon,
				color: r.color
			}, null, 8, ["icon", "color"])) : h(e.$slots, "default", { key: 1 }), r.tooltip ? (m(), t(v(I), {
				key: 2,
				location: r.location,
				activator: "parent"
			}, {
				default: S(() => [o(_(r.tooltip), 1)]),
				_: 1
			}, 8, ["location"])) : n("", !0)]),
			_: 3
		}, 16, ["icon", "color"]));
	}
});
//#endregion
//#region src/HButton/index.ts
V.install = (e) => {
	e.component(V.name, V);
};
//#endregion
//#region src/HDateTime/HDatePicker.vue
var H = /* @__PURE__ */ c({
	name: "HDatePicker",
	components: {
		VMenu: j,
		VTooltip: I,
		VIcon: A,
		VDatePicker: O
	},
	__name: "HDatePicker",
	props: {
		modelValue: { type: String },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(n) {
		let r = y(n, "modelValue"), a = me(), o = e({
			get: () => r.value ? a.parseISO(r.value) : "",
			set: (e) => {
				e ? r.value = z(e).format("YYYY-MM-DD") : r.value = e;
			}
		});
		return (e, n) => (m(), t(v(j), u({
			"close-on-content-click": !1,
			activator: "parent"
		}, e.$attrs), {
			activator: S(({ props: e }) => [s(v(I), { location: "bottom" }, {
				activator: S(({ props: t }) => [s(v(A), u({ icon: "mdi-calendar" }, u(e, t)), null, 16)]),
				default: S(() => [n[1] ||= i("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: S(() => [s(v(O), {
				modelValue: o.value,
				"onUpdate:modelValue": n[0] ||= (e) => o.value = e,
				"show-week": "",
				"show-adjacent-months": "",
				"first-day-of-week": "1",
				"weeks-in-month": "dynamic"
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16));
	}
}), U = /* @__PURE__ */ c({
	name: "HDate",
	components: {
		VTextField: P,
		HDatePicker: H
	},
	__name: "HDate",
	props: {
		modelValue: { type: String },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = y(e, "modelValue");
		return (e, r) => (m(), t(v(P), u({
			modelValue: n.value,
			"onUpdate:modelValue": r[1] ||= (e) => n.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": S(() => [s(H, {
				modelValue: n.value,
				"onUpdate:modelValue": r[0] ||= (e) => n.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), W = /* @__PURE__ */ c({
	name: "HTimePicker",
	components: {
		VMenu: j,
		VTooltip: I,
		VIcon: A,
		VTimePicker: F
	},
	__name: "HTimePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = y(e, "modelValue");
		return (e, r) => (m(), t(v(j), u({
			"close-on-content-click": !1,
			activator: "parent",
			"min-width": "0"
		}, e.$attrs), {
			activator: S(({ props: e }) => [s(v(I), { location: "bottom" }, {
				activator: S(({ props: t }) => [s(v(A), u({ icon: "mdi-clock-time-four-outline" }, u(e, t)), null, 16)]),
				default: S(() => [r[1] ||= i("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: S(() => [s(v(F), {
				modelValue: n.value,
				"onUpdate:modelValue": r[0] ||= (e) => n.value = e,
				"use-seconds": "",
				format: "24hr"
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16));
	}
}), G = /* @__PURE__ */ c({
	name: "HDateTime",
	components: {
		VTextField: P,
		HDatePicker: H,
		HTimePicker: W
	},
	__name: "HDateTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = y(e, "modelValue"), r = g(""), i = g(""), a = (e, t) => z(`${e && e.trim() !== "" ? e : "1970-01-01"} ${t && t.trim() !== "" ? t : "00:00:00"}`).format("YYYY-MM-DD HH:mm:ss");
		return x(n, (e) => {
			if (e) {
				let t = z(e);
				i.value = t.format("YYYY-MM-DD"), r.value = t.format("HH:mm:ss");
			}
		}), x([i, r], ([e, t]) => {
			n.value = a(e, t);
		}), (e, a) => (m(), t(v(P), u({
			modelValue: n.value,
			"onUpdate:modelValue": a[2] ||= (e) => n.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": S(() => [s(H, {
				modelValue: i.value,
				"onUpdate:modelValue": a[0] ||= (e) => i.value = e
			}, null, 8, ["modelValue"])]),
			"append-inner": S(() => [s(W, {
				modelValue: r.value,
				"onUpdate:modelValue": a[1] ||= (e) => r.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), ye = [
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
], K = /* @__PURE__ */ c({
	name: "HDuration",
	components: {
		VContainer: D,
		VRow: M,
		VCol: E,
		VNumberInput: ce,
		VSelect: N
	},
	__name: "HDuration",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = y(e, "modelValue"), r = g(0), i = g(), a = g(ye), o = (e) => {
			if (e) {
				let t = z.duration(e, "second");
				if (t) {
					let e = t._data;
					for (let t in e) {
						let n = t, a = e[n];
						a && (r.value = a, i.value = n);
					}
				}
			}
		}, c = (e, t) => {
			if (e && t) {
				let r = t;
				n.value = z.duration(e, r).toISOString();
			}
		};
		return x(() => n.value, (e) => {
			e && o(e);
		}, { immediate: !0 }), x(i, (e) => {
			e && c(r.value, e);
		}), x(r, (e) => {
			e && c(e, i.value);
		}), (e, n) => (m(), t(v(D), {
			fluid: "",
			class: "pa-0"
		}, {
			default: S(() => [s(v(M), null, {
				default: S(() => [s(v(E), null, {
					default: S(() => [s(v(ce), {
						modelValue: r.value,
						"onUpdate:modelValue": n[0] ||= (e) => r.value = e,
						label: "数值",
						placeholder: "请输入数值",
						"control-variant": "split",
						inset: ""
					}, null, 8, ["modelValue"])]),
					_: 1
				}), s(v(E), null, {
					default: S(() => [s(v(N), {
						modelValue: i.value,
						"onUpdate:modelValue": n[1] ||= (e) => i.value = e,
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
}), q = /* @__PURE__ */ c({
	name: "HTime",
	components: {
		VTextField: P,
		HTimePicker: W
	},
	__name: "HTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = y(e, "modelValue");
		return (e, r) => (m(), t(v(P), u({
			modelValue: n.value,
			"onUpdate:modelValue": r[1] ||= (e) => n.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": S(() => [s(W, {
				modelValue: n.value,
				"onUpdate:modelValue": r[0] ||= (e) => n.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
});
U.install = (e) => {
	e.component(U.name, U);
}, G.install = (e) => {
	e.component(G.name, G);
}, K.install = (e) => {
	e.component(K.name, K);
}, q.install = (e) => {
	e.component(q.name, q);
};
//#endregion
//#region src/HDialog/HDialog.vue
var J = /* @__PURE__ */ c({
	name: "HDialog",
	components: {
		VDialog: k,
		HButton: V
	},
	__name: "HDialog",
	props: /* @__PURE__ */ l({
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
	emits: /* @__PURE__ */ l([
		"close",
		"cancel",
		"confirm"
	], ["update:modelValue"]),
	setup(e, { emit: r }) {
		let i = r, o = y(e, "modelValue"), c = () => {
			o.value = !1, i("close");
		}, l = () => {
			o.value = !1, i("cancel");
		}, d = () => {
			i("confirm");
		};
		return (r, i) => (m(), t(v(k), {
			modelValue: o.value,
			"onUpdate:modelValue": i[0] ||= (e) => o.value = e,
			"max-width": e.maxWidth,
			persistent: ""
		}, {
			default: S(() => [s(v(T), u({
				disabled: e.loading,
				loading: e.loading
			}, r.$attrs), a({
				loader: S(({ isActive: e }) => [s(v(le), {
					active: e,
					height: "4",
					indeterminate: ""
				}, null, 8, ["active"])]),
				default: S(() => [
					s(v(re)),
					s(v(ne), { class: "pb-2" }, {
						default: S(() => [h(r.$slots, "default")]),
						_: 3
					}),
					e.hideActions ? n("", !0) : (m(), t(v(te), { key: 0 }, {
						default: S(() => [s(v(w), {
							text: "取消",
							color: "red",
							onClick: l
						}), s(v(w), {
							text: e.confirmLabel,
							onClick: d
						}, null, 8, ["text"])]),
						_: 1
					}))
				]),
				_: 2
			}, [e.closed ? {
				name: "append",
				fn: S(() => [s(v(V), {
					icon: "mdi-close",
					tooltip: "关闭",
					onClick: c,
					size: "x-small",
					variant: "text"
				})]),
				key: "0"
			} : void 0]), 1040, ["disabled", "loading"])]),
			_: 3
		}, 8, ["modelValue", "max-width"]));
	}
});
//#endregion
//#region src/HDialog/index.ts
J.install = (e) => {
	e.component(J.name, J);
};
//#endregion
//#region src/HParticles/particles.ts
var be = { particles: {
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
} }, xe = ["id"], Y = /* @__PURE__ */ c({
	name: "HParticles",
	__name: "HParticles",
	setup(e) {
		let t = g("HParticles"), n, i = async (e, t = !0) => {
			await he(e, !1), await ge(e, !1), await e.addPreset("triangles", be, t);
		};
		return f(() => {
			d(async () => {
				B.init(), await i(B), n = await B.load({
					id: t.value,
					options: {
						fullScreen: { zIndex: 1 },
						preset: "triangles"
					}
				});
			});
		}), p(() => {
			n &&= (n.destroy(), void 0);
		}), (e, n) => (m(), r("div", { id: t.value }, [h(e.$slots, "default")], 8, xe));
	}
});
//#endregion
//#region src/HParticles/index.ts
Y.install = (e) => {
	e.component(Y.name, Y);
};
//#endregion
//#region src/HLabel/HLabel.vue?vue&type=script&setup=true&lang.ts
var Se = { class: "d-flex mb-3 w-100" }, Ce = { class: "flex-1-1-0" }, X = /* @__PURE__ */ c({
	name: "HLabel",
	components: {
		VLabel: ae,
		VMessages: se
	},
	__name: "HLabel",
	props: {
		title: {},
		text: {}
	},
	setup(a) {
		let o = a, c = e(() => !!o.text);
		return (e, o) => (m(), r("div", Se, [i("div", Ce, [s(v(ae), {
			text: a.title,
			class: "my-1 font-weight-medium"
		}, {
			default: S(() => [h(e.$slots, "title")]),
			_: 3
		}, 8, ["text"]), c.value ? (m(), t(v(se), {
			key: 0,
			messages: a.text,
			active: c.value
		}, null, 8, ["messages", "active"])) : n("", !0)]), h(e.$slots, "default")]));
	}
});
//#endregion
//#region src/HLabel/index.ts
X.install = (e) => {
	e.component(X.name, X);
};
//#endregion
//#region src/lib/stores/mdiicon.ts
var we = _e("MdiIcon", {
	state: () => ({ icons: [] }),
	getters: { getAllIcons: (e) => e.icons },
	actions: {
		initialize() {
			if (R(this.icons)) {
				let e = Object.keys(ve).map((e) => pe(e));
				this.icons = e;
			}
		},
		search(e) {
			if (R(e.trim())) return this.icons;
			let t = e.toLowerCase();
			return this.getAllIcons.filter((e) => e.toLowerCase().match(t));
		}
	}
}), Z = /* @__PURE__ */ c({
	name: "HMdiIconSelect",
	components: {
		VAutocomplete: C,
		VExpandXTransition: ie,
		VListItem: oe,
		VIcon: A
	},
	__name: "HMdiIconSelect",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let r = y(e, "modelValue"), i = g([]), a = g(!1), o = g(""), c = we(), l = ue((e, t) => {
			a.value = !0, t(c.search(e)), a.value = !1;
		}, 500);
		return f(() => {
			a.value = !0, c.initialize(), i.value = c.getAllIcons, a.value = !1;
		}), x(o, (e) => {
			R(e) ? i.value = c.getAllIcons : l(e, (e) => {
				i.value = e;
			});
		}), (e, c) => (m(), t(v(C), u({
			modelValue: r.value,
			"onUpdate:modelValue": c[0] ||= (e) => r.value = e,
			search: o.value,
			"onUpdate:search": c[1] ||= (e) => o.value = e,
			items: i.value,
			loading: a.value,
			clearable: "",
			"single-line": ""
		}, e.$attrs), {
			"prepend-inner": S(() => [s(v(ie), null, {
				default: S(() => [r.value ? (m(), t(v(A), {
					key: 0,
					icon: r.value,
					start: ""
				}, null, 8, ["icon"])) : n("", !0)]),
				_: 1
			})]),
			item: S(({ props: e, internalItem: t }) => [s(v(oe), u(e, {
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
}), Q = /* @__PURE__ */ c({
	name: "HTreeSelect",
	components: {
		VMenu: j,
		VIcon: A,
		VTreeview: L,
		VTextField: P
	},
	__name: "HTreeSelect",
	props: /* @__PURE__ */ l({ items: {} }, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(n) {
		let r = n, i = y(n, "modelValue"), a = ee(), o = g(!1), c = g(!1), l = ee([]), d = g(""), f = () => {
			o.value = !0;
		}, p = (e) => {
			o.value = !o.value;
		}, h = () => {
			c.value && a.value?.focus();
		}, _ = () => {}, b = (e) => {
			let t = [];
			for (let n of e) {
				let { children: e, ...r } = n;
				e && e.length && (t = t.concat(b(e))), t.push(r);
			}
			return t;
		}, C = (e) => {
			let t = de(l.value, (t) => t.id == e);
			t && (d.value = t.name);
		}, w = (e) => {
			!R(e) && R(l.value) && (l.value = b(e), !d.value && i.value && C(i.value));
		}, T = e({
			get: () => i.value ? [i.value] : [],
			set: (e) => {
				e && fe(e) && e.length > 0 ? i.value = e[0] : i.value = "";
			}
		});
		return x(() => r.items, (e) => {
			R(e) || w(e);
		}, { immediate: !0 }), x(i, (e, t) => {
			e && (C(e), o.value &&= !1);
		}, { immediate: !0 }), x(c, (e, t) => {
			e || e === t || (o.value = !1);
		}), (e, r) => (m(), t(v(P), u({
			ref_key: "vTextFieldRef",
			ref: a,
			modelValue: d.value,
			"onUpdate:modelValue": r[3] ||= (e) => d.value = e,
			focused: c.value,
			"onUpdate:focused": r[4] ||= (e) => c.value = e,
			class: ["v-combobox", { "v-combobox--active-menu": o.value }],
			"onMousedown:control": f,
			onAfterLeave: h
		}, e.$attrs), {
			"append-inner": S(() => [s(v(A), {
				icon: "mdi-menu-down",
				onMousedown: p,
				onClick: _,
				class: "v-combobox__menu-icon",
				tabindex: "-1"
			})]),
			default: S(() => [s(v(j), {
				modelValue: o.value,
				"onUpdate:modelValue": r[2] ||= (e) => o.value = e,
				activator: "parent",
				"content-class": "v-combobox__content",
				"open-on-click": !1,
				"close-on-content-click": !1,
				"max-height": "310"
			}, {
				default: S(() => [s(v(L), {
					activated: T.value,
					"onUpdate:activated": r[0] ||= (e) => T.value = e,
					items: n.items,
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
Z.install = (e) => {
	e.component(Z.name, Z);
}, Q.install = (e) => {
	e.component(Q.name, Q);
};
//#endregion
//#region src/HSignIn/HSignInCornerBottom.vue?vue&type=script&setup=true&lang.ts
var Te = {
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	height: "896",
	width: "967.8852157128662"
}, Ee = {
	id: "linearGradient-3",
	x1: "0.5",
	y1: "0",
	x2: "0.5",
	y2: "1"
}, De = ["stop-color"], Oe = ["stop-color"], ke = /* @__PURE__ */ c({
	name: "HSignInCornerBottom",
	__name: "HSignInCornerBottom",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (m(), r("svg", Te, [i("defs", null, [n[0] ||= i("path", {
			id: "path-2",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896\n			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806\n			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
		}, null, -1), i("linearGradient", Ee, [i("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, De), i("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, Oe)])]), n[1] ||= i("g", { opacity: "1" }, [i("use", {
			"xlink:href": "#path-2",
			fill: "url(#linearGradient-3)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), Ae = {
	height: "1337",
	width: "1337"
}, je = {
	id: "linearGradient-2",
	x1: "0.79",
	y1: "0.62",
	x2: "0.21",
	y2: "0.86"
}, Me = ["stop-color"], Ne = ["stop-color"], Pe = /* @__PURE__ */ c({
	name: "HSignInCornerTop",
	__name: "HSignInCornerTop",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (m(), r("svg", Ae, [i("defs", null, [n[0] ||= i("path", {
			id: "path-1",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
		}, null, -1), i("linearGradient", je, [i("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, Me), i("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, Ne)])]), n[1] ||= i("g", { opacity: "1" }, [i("use", {
			"xlink:href": "#path-1",
			fill: "url(#linearGradient-2)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), Fe = { class: "corner-top" }, Ie = { class: "corner-bottom" }, $ = /* @__PURE__ */ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ c({
	name: "HSignInBackground",
	components: {
		HSignInCornerBottom: ke,
		HSignInCornerTop: Pe
	},
	__name: "HSignInBackground",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (t, n) => (m(), r("div", null, [i("div", Fe, [s(Pe, {
			"start-color": e.startColor,
			"end-color": e.endColor
		}, null, 8, ["start-color", "end-color"])]), i("div", Ie, [s(ke, {
			"start-color": e.endColor,
			"end-color": e.startColor
		}, null, 8, ["start-color", "end-color"])])]));
	}
}), [["__scopeId", "data-v-377dfbe6"]]);
//#endregion
//#region src/HSignIn/index.ts
$.install = (e) => {
	e.component($.name, $);
};
//#endregion
//#region src/index.ts
var Le = [
	V,
	U,
	G,
	J,
	K,
	q,
	Z,
	Y,
	X,
	$,
	Q
], Re = { install: (e) => {
	Le.map((t) => t.install(e));
} };
//#endregion
export { V as HButton, U as HDate, G as HDateTime, J as HDialog, K as HDuration, X as HLabel, Z as HMdiIconSelect, Y as HParticles, $ as HSignInBackground, q as HTime, Q as HTreeSelect, Re as default };

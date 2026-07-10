import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createSlots as o, createTextVNode as s, createVNode as c, defineComponent as l, guardReactiveProps as u, mergeModels as d, mergeProps as f, normalizeClass as ee, normalizeProps as p, onBeforeMount as te, onMounted as m, onUnmounted as h, openBlock as g, ref as ne, renderSlot as _, shallowRef as v, toDisplayString as y, unref as b, useModel as x, useSlots as re, watch as S, withCtx as C } from "vue";
import { VAutocomplete as ie, VBtn as w, VCard as ae, VCardActions as oe, VCardText as se, VCol as T, VContainer as E, VDatePicker as ce, VDialog as le, VDivider as D, VExpandXTransition as ue, VIcon as O, VIconBtn as k, VLabel as de, VListItem as fe, VMenu as A, VMessages as pe, VNumberInput as me, VProgressLinear as j, VRow as M, VSelect as N, VSnackbar as he, VTextField as P, VTimePicker as ge, VTooltip as F, VTreeview as _e } from "vuetify/components";
import { debounce as ve, find as ye, isArray as be, isEmpty as I, kebabCase as xe } from "lodash-es";
import { useDate as Se } from "vuetify";
import { moment as L } from "@herodotus/core";
import { tsParticles as Ce } from "@tsparticles/engine";
import { loadTrianglesPreset as we } from "@tsparticles/preset-triangles";
import { defineStore as Te } from "pinia";
import * as Ee from "@mdi/js";
//#endregion
//#region src/HButton/HButton.vue
var R = /* @__PURE__ */ l({
	name: "HButton",
	components: {
		VBtn: w,
		VIcon: O
	},
	__name: "HButton",
	props: {
		icon: {},
		color: {},
		text: { type: [
			String,
			Number,
			Boolean
		] },
		tooltip: {},
		location: { default: "bottom" }
	},
	setup(a) {
		let o = a, c = re(), l = t(() => !I(o.icon)), u = t(() => I(c.default) ? void 0 : o.color);
		return (t, o) => (g(), n(b(w), f({
			icon: l.value,
			color: u.value,
			text: a.text
		}, t.$attrs), {
			append: C(() => [_(t.$slots, "append")]),
			prepend: C(() => [_(t.$slots, "prepend")]),
			loader: C(() => [_(t.$slots, "loader")]),
			default: C(() => [!t.$slots.default && l.value ? (g(), n(b(O), {
				key: 0,
				icon: a.icon,
				color: a.color
			}, null, 8, ["icon", "color"])) : (g(), i(e, { key: 1 }, [a.text ? (g(), i(e, { key: 0 }, [s(y(a.text), 1)], 64)) : _(t.$slots, "default", { key: 1 })], 64)), a.tooltip ? (g(), n(b(F), {
				key: 2,
				location: a.location,
				activator: "parent"
			}, {
				default: C(() => [s(y(a.tooltip), 1)]),
				_: 1
			}, 8, ["location"])) : r("", !0)]),
			_: 3
		}, 16, [
			"icon",
			"color",
			"text"
		]));
	}
}), z = /* @__PURE__ */ l({
	name: "HIconButton",
	components: {
		VTooltip: F,
		VIconBtn: k
	},
	__name: "HIconButton",
	props: {
		tooltip: {},
		location: { default: "bottom" }
	},
	setup(e) {
		return (t, r) => e.tooltip ? (g(), n(b(F), {
			key: 0,
			interactive: "",
			location: e.location
		}, {
			activator: C(({ props: e }) => [c(b(k), p(u(f(t.$attrs, e))), null, 16)]),
			default: C(() => [a("span", null, y(e.tooltip), 1)]),
			_: 1
		}, 8, ["location"])) : (g(), n(b(k), p(f({ key: 1 }, t.$attrs)), null, 16));
	}
});
R.install = (e) => {
	e.component(R.name, R);
}, z.install = (e) => {
	e.component(R.name, R);
};
//#endregion
//#region src/HDateTime/HDatePicker.vue
var B = /* @__PURE__ */ l({
	name: "HDatePicker",
	components: {
		VMenu: A,
		VTooltip: F,
		VIcon: O,
		VDatePicker: ce
	},
	__name: "HDatePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let r = x(e, "modelValue"), i = Se(), o = t({
			get: () => r.value ? i.parseISO(r.value) : "",
			set: (e) => {
				e ? r.value = L(e).format("YYYY-MM-DD") : r.value = e;
			}
		});
		return (e, t) => (g(), n(b(A), f({
			"close-on-content-click": !1,
			activator: "parent"
		}, e.$attrs), {
			activator: C(({ props: e }) => [c(b(F), { location: "bottom" }, {
				activator: C(({ props: t }) => [c(b(O), f({ icon: "mdi-calendar" }, f(e, t)), null, 16)]),
				default: C(() => [t[1] ||= a("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: C(() => [c(b(ce), {
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
}), V = /* @__PURE__ */ l({
	name: "HDate",
	components: {
		VTextField: P,
		HDatePicker: B
	},
	__name: "HDate",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = x(e, "modelValue");
		return (e, r) => (g(), n(b(P), f({
			modelValue: t.value,
			"onUpdate:modelValue": r[1] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": C(() => [c(B, {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), H = /* @__PURE__ */ l({
	name: "HTimePicker",
	components: {
		VMenu: A,
		VTooltip: F,
		VIcon: O,
		VTimePicker: ge
	},
	__name: "HTimePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = x(e, "modelValue");
		return (e, r) => (g(), n(b(A), f({
			"close-on-content-click": !1,
			activator: "parent",
			"min-width": "0"
		}, e.$attrs), {
			activator: C(({ props: e }) => [c(b(F), { location: "bottom" }, {
				activator: C(({ props: t }) => [c(b(O), f({ icon: "mdi-clock-time-four-outline" }, f(e, t)), null, 16)]),
				default: C(() => [r[1] ||= a("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: C(() => [c(b(ge), {
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
		VTextField: P,
		HDatePicker: B,
		HTimePicker: H
	},
	__name: "HDateTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = x(e, "modelValue"), r = v(""), i = v(""), a = (e, t) => L(`${e && e.trim() !== "" ? e : "1970-01-01"} ${t && t.trim() !== "" ? t : "00:00:00"}`).format("YYYY-MM-DD HH:mm:ss");
		return S(t, (e) => {
			if (e) {
				let t = L(e);
				i.value = t.format("YYYY-MM-DD"), r.value = t.format("HH:mm:ss");
			}
		}), S([i, r], ([e, n]) => {
			t.value = a(e, n);
		}), (e, a) => (g(), n(b(P), f({
			modelValue: t.value,
			"onUpdate:modelValue": a[2] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": C(() => [c(B, {
				modelValue: i.value,
				"onUpdate:modelValue": a[0] ||= (e) => i.value = e
			}, null, 8, ["modelValue"])]),
			"append-inner": C(() => [c(H, {
				modelValue: r.value,
				"onUpdate:modelValue": a[1] ||= (e) => r.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), De = [
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
		VContainer: E,
		VRow: M,
		VCol: T,
		VNumberInput: me,
		VSelect: N
	},
	__name: "HDuration",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = x(e, "modelValue"), r = v(0), i = v(), a = v(De), o = (e) => {
			if (e) {
				let t = L.duration(e, "second");
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
				let r = n, i = L.duration(e, r).toISOString();
				t.value = i;
			}
		};
		return S(() => t.value, (e) => {
			e && o(e);
		}, { immediate: !0 }), S(i, (e) => {
			e && s(r.value, e);
		}), S(r, (e) => {
			e && s(e, i.value);
		}), (e, t) => (g(), n(b(E), { class: "pa-0" }, {
			default: C(() => [c(b(M), null, {
				default: C(() => [c(b(T), null, {
					default: C(() => [c(b(me), {
						modelValue: r.value,
						"onUpdate:modelValue": t[0] ||= (e) => r.value = e,
						label: "数值",
						placeholder: "请输入数值",
						"control-variant": "split",
						inset: ""
					}, null, 8, ["modelValue"])]),
					_: 1
				}), c(b(T), null, {
					default: C(() => [c(b(N), {
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
		VTextField: P,
		HTimePicker: H
	},
	__name: "HTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = x(e, "modelValue");
		return (e, r) => (g(), n(b(P), f({
			modelValue: t.value,
			"onUpdate:modelValue": r[1] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": C(() => [c(H, {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
});
V.install = (e) => {
	e.component(V.name, V);
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
		VDialog: le,
		HButton: R
	},
	__name: "HDialog",
	props: /*@__PURE__*/ d({
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
	emits: /*@__PURE__*/ d([
		"close",
		"cancel",
		"confirm"
	], ["update:modelValue"]),
	setup(e, { emit: t }) {
		let i = t, a = x(e, "modelValue"), s = () => {
			a.value = !1, i("close");
		}, l = () => {
			a.value = !1, i("cancel");
		}, u = () => {
			i("confirm");
		};
		return (t, i) => (g(), n(b(le), {
			modelValue: a.value,
			"onUpdate:modelValue": i[0] ||= (e) => a.value = e,
			"max-width": e.maxWidth,
			persistent: ""
		}, {
			default: C(() => [c(b(ae), f({
				disabled: e.loading,
				loading: e.loading
			}, t.$attrs), o({
				loader: C(({ isActive: e }) => [c(b(j), {
					active: e,
					height: "4",
					indeterminate: ""
				}, null, 8, ["active"])]),
				default: C(() => [
					c(b(D)),
					c(b(se), { class: "pb-2" }, {
						default: C(() => [_(t.$slots, "default")]),
						_: 3
					}),
					e.hideActions ? r("", !0) : (g(), n(b(oe), { key: 0 }, {
						default: C(() => [c(b(w), {
							text: "取消",
							color: "red",
							onClick: l
						}), c(b(w), {
							text: e.confirmLabel,
							onClick: u
						}, null, 8, ["text"])]),
						_: 1
					}))
				]),
				_: 2
			}, [e.closed ? {
				name: "append",
				fn: C(() => [c(b(R), {
					icon: "mdi-close",
					tooltip: "关闭",
					onClick: s,
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
K.install = (e) => {
	e.component(K.name, K);
};
//#endregion
//#region src/HDivider/HTextDivider.vue
var q = /* @__PURE__ */ l({
	name: "HTextDivider",
	components: {
		VContainer: E,
		VRow: M,
		VCol: T,
		VDivider: D
	},
	__name: "HTextDivider",
	props: { label: {} },
	setup(e) {
		return (t, r) => (g(), n(b(E), { class: "px-0" }, {
			default: C(() => [c(b(M), {
				align: "center",
				justify: "center"
			}, {
				default: C(() => [
					c(b(T), { cols: "5" }, {
						default: C(() => [c(b(D))]),
						_: 1
					}),
					c(b(T), {
						cols: "2",
						"align-self": "center",
						class: "text-center"
					}, {
						default: C(() => [s(y(e.label), 1)]),
						_: 1
					}),
					c(b(T), { cols: "5" }, {
						default: C(() => [c(b(D))]),
						_: 1
					})
				]),
				_: 1
			})]),
			_: 1
		}));
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
		VSnackbar: he,
		VContainer: E,
		VRow: M,
		VCol: T,
		VProgressLinear: j
	},
	__name: "HDownloadProgress",
	props: /*@__PURE__*/ d({ progress: {} }, {
		modelValue: {
			type: Boolean,
			required: !0
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = x(e, "modelValue");
		return (r, i) => (g(), n(b(he), f({
			modelValue: t.value,
			"onUpdate:modelValue": i[0] ||= (e) => t.value = e,
			timeout: 2e3,
			location: "center center",
			color: "primary"
		}, r.$attrs), {
			default: C(() => [c(b(E), null, {
				default: C(() => [c(b(M), {
					"align-content": "center",
					justify: "center"
				}, {
					default: C(() => [c(b(T), {
						class: "text-subtitle-1 text-center",
						cols: "12"
					}, {
						default: C(() => [s("文件下载 " + y(`${e.progress}%`), 1)]),
						_: 1
					}), c(b(T), { cols: "6" }, {
						default: C(() => [c(b(j), {
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
var Oe = { class: "flex-1-1-0" }, ke = { class: "d-flex" }, Ae = {
	key: 0,
	class: "d-flex align-self-center mr-1"
}, je = {
	key: 1,
	class: "d-flex align-self-center"
}, Y = /* @__PURE__ */ l({
	name: "HLabel",
	components: {
		VIcon: O,
		VBtn: w,
		VTooltip: F,
		VLabel: de,
		VMessages: pe
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
		return (t, o) => (g(), i("div", { class: ee(["d-flex w-100", { "mb-3": !e.hideDetails }]) }, [a("div", Oe, [a("div", ke, [
			e.required ? (g(), i("div", Ae, [c(b(O), {
				size: "x-small",
				icon: "mdi-star",
				color: "red"
			})])) : r("", !0),
			c(b(de), {
				text: e.text,
				class: "font-weight-medium"
			}, {
				default: C(() => [_(t.$slots, "text")]),
				_: 3
			}, 8, ["text"]),
			e.tooltip ? (g(), i("div", je, [c(b(F), { location: "bottom" }, {
				activator: C(({ props: e }) => [c(b(O), f({
					size: "x-small",
					icon: "mdi-progress-question",
					color: "grey"
				}, e), null, 16)]),
				default: C(() => [o[0] ||= a("span", null, "点击设置日期", -1)]),
				_: 1
			})])) : r("", !0)
		]), s.value ? (g(), n(b(pe), {
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
//#region src/HParticles/particles.ts
var Me = { particles: {
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
} }, Ne = ["id"], X = /* @__PURE__ */ l({
	name: "HParticles",
	__name: "HParticles",
	setup(e) {
		let t = v("HParticles"), n, r = async () => {
			await we(Ce);
		}, a = async () => {
			n?.destroy(), n = await Ce.load({
				id: t.value,
				options: Me
			});
		}, o = async () => {
			n?.destroy();
		};
		return te(() => {
			r();
		}), m(() => {
			a();
		}), h(() => {
			o();
		}), (e, n) => (g(), i("div", { id: t.value }, [_(e.$slots, "default")], 8, Ne));
	}
});
//#endregion
//#region src/HParticles/index.ts
X.install = (e) => {
	e.component(X.name, X);
};
//#endregion
//#region src/lib/stores/mdiicon.ts
var Pe = Te("MdiIcon", {
	state: () => ({ icons: [] }),
	getters: { getAllIcons: (e) => e.icons },
	actions: {
		initialize() {
			if (I(this.icons)) {
				let e = Object.keys(Ee).map((e) => xe(e));
				this.icons = e;
			}
		},
		search(e) {
			if (I(e.trim())) return this.icons;
			let t = e.toLowerCase();
			return this.getAllIcons.filter((e) => e.toLowerCase().match(t));
		}
	}
}), Z = /* @__PURE__ */ l({
	name: "HMdiIconSelect",
	components: {
		VAutocomplete: ie,
		VExpandXTransition: ue,
		VListItem: fe,
		VIcon: O
	},
	__name: "HMdiIconSelect",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = x(e, "modelValue"), i = v([]), a = v(!1), o = v(""), s = Pe(), l = ve((e, t) => {
			a.value = !0, t(s.search(e)), a.value = !1;
		}, 500);
		return m(() => {
			a.value = !0, s.initialize(), i.value = s.getAllIcons, a.value = !1;
		}), S(o, (e) => {
			I(e) ? i.value = s.getAllIcons : l(e, (e) => {
				i.value = e;
			});
		}), (e, s) => (g(), n(b(ie), f({
			modelValue: t.value,
			"onUpdate:modelValue": s[0] ||= (e) => t.value = e,
			search: o.value,
			"onUpdate:search": s[1] ||= (e) => o.value = e,
			items: i.value,
			loading: a.value,
			clearable: "",
			"single-line": ""
		}, e.$attrs), {
			"prepend-inner": C(() => [c(b(ue), null, {
				default: C(() => [t.value ? (g(), n(b(O), {
					key: 0,
					icon: t.value,
					start: ""
				}, null, 8, ["icon"])) : r("", !0)]),
				_: 1
			})]),
			item: C(({ props: e, internalItem: t }) => [c(b(fe), f(e, {
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
}), Q = /* @__PURE__ */ l({
	name: "HTreeSelect",
	components: {
		VMenu: A,
		VIcon: O,
		VTreeview: _e,
		VTextField: P
	},
	__name: "HTreeSelect",
	props: /*@__PURE__*/ d({ items: {} }, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let r = e, i = x(e, "modelValue"), a = ne(), o = v(!1), s = v(!1), l = ne([]), u = v(""), d = () => {
			o.value = !0;
		}, ee = (e) => {
			o.value = !o.value;
		}, p = () => {
			s.value && a.value?.focus();
		}, te = () => {}, m = (e) => {
			let t = [];
			for (let n of e) {
				let { children: e, ...r } = n;
				e && e.length && (t = t.concat(m(e))), t.push(r);
			}
			return t;
		}, h = (e) => {
			let t = ye(l.value, (t) => t.id == e);
			t && (u.value = t.name);
		}, _ = (e) => {
			!I(e) && I(l.value) && (l.value = m(e), !u.value && i.value && h(i.value));
		}, y = t({
			get: () => i.value ? [i.value] : [],
			set: (e) => {
				e && be(e) && e.length > 0 ? i.value = e[0] : i.value = "";
			}
		});
		return S(() => r.items, (e) => {
			I(e) || _(e);
		}, { immediate: !0 }), S(i, (e, t) => {
			e && (h(e), o.value &&= !1);
		}, { immediate: !0 }), S(s, (e, t) => {
			e || e === t || (o.value = !1);
		}), (t, r) => (g(), n(b(P), f({
			ref_key: "vTextFieldRef",
			ref: a,
			modelValue: u.value,
			"onUpdate:modelValue": r[3] ||= (e) => u.value = e,
			focused: s.value,
			"onUpdate:focused": r[4] ||= (e) => s.value = e,
			class: ["v-combobox", { "v-combobox--active-menu": o.value }],
			"onMousedown:control": d,
			onAfterLeave: p
		}, t.$attrs), {
			"append-inner": C(() => [c(b(O), {
				icon: "mdi-menu-down",
				onMousedown: ee,
				onClick: te,
				class: "v-combobox__menu-icon",
				tabindex: "-1"
			})]),
			default: C(() => [c(b(A), {
				modelValue: o.value,
				"onUpdate:modelValue": r[2] ||= (e) => o.value = e,
				activator: "parent",
				"content-class": "v-combobox__content",
				"open-on-click": !1,
				"close-on-content-click": !1,
				"max-height": "310"
			}, {
				default: C(() => [c(b(_e), {
					activated: y.value,
					"onUpdate:activated": r[0] ||= (e) => y.value = e,
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
Z.install = (e) => {
	e.component(Z.name, Z);
}, Q.install = (e) => {
	e.component(Q.name, Q);
};
//#endregion
//#region src/HSignIn/HSignInCornerBottom.vue?vue&type=script&setup=true&lang.ts
var Fe = {
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	height: "896",
	width: "967.8852157128662"
}, Ie = {
	id: "linearGradient-3",
	x1: "0.5",
	y1: "0",
	x2: "0.5",
	y2: "1"
}, Le = ["stop-color"], Re = ["stop-color"], ze = /* @__PURE__ */ l({
	name: "HSignInCornerBottom",
	__name: "HSignInCornerBottom",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (g(), i("svg", Fe, [a("defs", null, [n[0] ||= a("path", {
			id: "path-2",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896\n			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806\n			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
		}, null, -1), a("linearGradient", Ie, [a("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, Le), a("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, Re)])]), n[1] ||= a("g", { opacity: "1" }, [a("use", {
			"xlink:href": "#path-2",
			fill: "url(#linearGradient-3)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), Be = {
	height: "1337",
	width: "1337"
}, Ve = {
	id: "linearGradient-2",
	x1: "0.79",
	y1: "0.62",
	x2: "0.21",
	y2: "0.86"
}, He = ["stop-color"], Ue = ["stop-color"], We = /* @__PURE__ */ l({
	name: "HSignInCornerTop",
	__name: "HSignInCornerTop",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (g(), i("svg", Be, [a("defs", null, [n[0] ||= a("path", {
			id: "path-1",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
		}, null, -1), a("linearGradient", Ve, [a("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, He), a("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, Ue)])]), n[1] ||= a("g", { opacity: "1" }, [a("use", {
			"xlink:href": "#path-1",
			fill: "url(#linearGradient-2)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), Ge = { class: "corner-top" }, Ke = { class: "corner-bottom" }, $ = /*#__PURE__*/ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ l({
	name: "HSignInBackground",
	components: {
		HSignInCornerBottom: ze,
		HSignInCornerTop: We
	},
	__name: "HSignInBackground",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (t, n) => (g(), i("div", null, [a("div", Ge, [c(We, {
			"start-color": e.startColor,
			"end-color": e.endColor
		}, null, 8, ["start-color", "end-color"])]), a("div", Ke, [c(ze, {
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
var qe = [
	R,
	V,
	U,
	K,
	J,
	W,
	Z,
	z,
	Y,
	X,
	$,
	q,
	G,
	Q
], Je = { install: (e) => {
	qe.map((t) => t.install(e));
} };
//#endregion
export { R as HButton, V as HDate, U as HDateTime, K as HDialog, J as HDownloadProgress, W as HDuration, z as HIconButton, Y as HLabel, Z as HMdiIconSelect, X as HParticles, $ as HSignInBackground, q as HTextDivider, G as HTime, Q as HTreeSelect, Je as default };

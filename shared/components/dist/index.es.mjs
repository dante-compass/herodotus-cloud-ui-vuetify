import { computed as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createSlots as a, createTextVNode as o, createVNode as s, defineComponent as c, mergeModels as l, mergeProps as u, nextTick as d, onMounted as f, onUnmounted as ee, openBlock as p, ref as te, renderSlot as m, shallowRef as h, toDisplayString as g, unref as _, useModel as v, useSlots as y, watch as b, withCtx as x } from "vue";
import { VAutocomplete as S, VBtn as C, VCard as w, VCardActions as ne, VCardText as re, VCol as T, VContainer as E, VDatePicker as ie, VDialog as ae, VDivider as oe, VExpandXTransition as D, VIcon as O, VLabel as k, VListItem as A, VMenu as j, VMessages as se, VNumberInput as ce, VProgressLinear as M, VRow as N, VSelect as le, VSnackbar as P, VTextField as F, VTimePicker as ue, VTooltip as I, VTreeview as de } from "vuetify/components";
import { debounce as fe, find as pe, isArray as me, isEmpty as L, kebabCase as he } from "lodash-es";
import { useDate as ge } from "vuetify";
import { moment as R } from "@herodotus/core";
import { tsParticles as z } from "@tsparticles/engine";
import { loadBasic as _e } from "@tsparticles/basic";
import { loadParticlesLinksInteraction as ve } from "@tsparticles/interaction-particles-links";
import { defineStore as ye } from "pinia";
import * as be from "@mdi/js";
//#endregion
//#region src/HButton/HButton.vue
var B = /* @__PURE__ */ c({
	name: "HButton",
	components: {
		VBtn: C,
		VIcon: O
	},
	__name: "HButton",
	props: {
		icon: {},
		color: {},
		tooltip: {},
		location: { default: "bottom" }
	},
	setup(r) {
		let i = r, a = y(), s = e(() => !L(i.icon)), c = e(() => L(a.default) ? void 0 : i.color);
		return (e, i) => (p(), t(_(C), u({
			icon: s.value,
			color: c.value
		}, e.$attrs), {
			append: x(() => [m(e.$slots, "append")]),
			prepend: x(() => [m(e.$slots, "prepend")]),
			loader: x(() => [m(e.$slots, "loader")]),
			default: x(() => [!e.$slots.default && s.value ? (p(), t(_(O), {
				key: 0,
				icon: r.icon,
				color: r.color
			}, null, 8, ["icon", "color"])) : m(e.$slots, "default", { key: 1 }), r.tooltip ? (p(), t(_(I), {
				key: 2,
				location: r.location,
				activator: "parent"
			}, {
				default: x(() => [o(g(r.tooltip), 1)]),
				_: 1
			}, 8, ["location"])) : n("", !0)]),
			_: 3
		}, 16, ["icon", "color"]));
	}
});
//#endregion
//#region src/HButton/index.ts
B.install = (e) => {
	e.component(B.name, B);
};
//#endregion
//#region src/HDateTime/HDatePicker.vue
var V = /* @__PURE__ */ c({
	name: "HDatePicker",
	components: {
		VMenu: j,
		VTooltip: I,
		VIcon: O,
		VDatePicker: ie
	},
	__name: "HDatePicker",
	props: {
		modelValue: { type: String },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(n) {
		let r = v(n, "modelValue"), a = ge(), o = e({
			get: () => r.value ? a.parseISO(r.value) : "",
			set: (e) => {
				e ? r.value = R(e).format("YYYY-MM-DD") : r.value = e;
			}
		});
		return (e, n) => (p(), t(_(j), u({
			"close-on-content-click": !1,
			activator: "parent"
		}, e.$attrs), {
			activator: x(({ props: e }) => [s(_(I), { location: "bottom" }, {
				activator: x(({ props: t }) => [s(_(O), u({ icon: "mdi-calendar" }, u(e, t)), null, 16)]),
				default: x(() => [n[1] ||= i("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: x(() => [s(_(ie), {
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
}), H = /* @__PURE__ */ c({
	name: "HDate",
	components: {
		VTextField: F,
		HDatePicker: V
	},
	__name: "HDate",
	props: {
		modelValue: { type: String },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = v(e, "modelValue");
		return (e, r) => (p(), t(_(F), u({
			modelValue: n.value,
			"onUpdate:modelValue": r[1] ||= (e) => n.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": x(() => [s(V, {
				modelValue: n.value,
				"onUpdate:modelValue": r[0] ||= (e) => n.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), U = /* @__PURE__ */ c({
	name: "HTimePicker",
	components: {
		VMenu: j,
		VTooltip: I,
		VIcon: O,
		VTimePicker: ue
	},
	__name: "HTimePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = v(e, "modelValue");
		return (e, r) => (p(), t(_(j), u({
			"close-on-content-click": !1,
			activator: "parent",
			"min-width": "0"
		}, e.$attrs), {
			activator: x(({ props: e }) => [s(_(I), { location: "bottom" }, {
				activator: x(({ props: t }) => [s(_(O), u({ icon: "mdi-clock-time-four-outline" }, u(e, t)), null, 16)]),
				default: x(() => [r[1] ||= i("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: x(() => [s(_(ue), {
				modelValue: n.value,
				"onUpdate:modelValue": r[0] ||= (e) => n.value = e,
				"use-seconds": "",
				format: "24hr"
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16));
	}
}), W = /* @__PURE__ */ c({
	name: "HDateTime",
	components: {
		VTextField: F,
		HDatePicker: V,
		HTimePicker: U
	},
	__name: "HDateTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = v(e, "modelValue"), r = h(""), i = h(""), a = (e, t) => R(`${e && e.trim() !== "" ? e : "1970-01-01"} ${t && t.trim() !== "" ? t : "00:00:00"}`).format("YYYY-MM-DD HH:mm:ss");
		return b(n, (e) => {
			if (e) {
				let t = R(e);
				i.value = t.format("YYYY-MM-DD"), r.value = t.format("HH:mm:ss");
			}
		}), b([i, r], ([e, t]) => {
			n.value = a(e, t);
		}), (e, a) => (p(), t(_(F), u({
			modelValue: n.value,
			"onUpdate:modelValue": a[2] ||= (e) => n.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": x(() => [s(V, {
				modelValue: i.value,
				"onUpdate:modelValue": a[0] ||= (e) => i.value = e
			}, null, 8, ["modelValue"])]),
			"append-inner": x(() => [s(U, {
				modelValue: r.value,
				"onUpdate:modelValue": a[1] ||= (e) => r.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), xe = [
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
], G = /* @__PURE__ */ c({
	name: "HDuration",
	components: {
		VContainer: E,
		VRow: N,
		VCol: T,
		VNumberInput: ce,
		VSelect: le
	},
	__name: "HDuration",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = v(e, "modelValue"), r = h(0), i = h(), a = h(xe), o = (e) => {
			if (e) {
				let t = R.duration(e, "second");
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
				n.value = R.duration(e, r).toISOString();
			}
		};
		return b(() => n.value, (e) => {
			e && o(e);
		}, { immediate: !0 }), b(i, (e) => {
			e && c(r.value, e);
		}), b(r, (e) => {
			e && c(e, i.value);
		}), (e, n) => (p(), t(_(E), {
			fluid: "",
			class: "pa-0"
		}, {
			default: x(() => [s(_(N), null, {
				default: x(() => [s(_(T), null, {
					default: x(() => [s(_(ce), {
						modelValue: r.value,
						"onUpdate:modelValue": n[0] ||= (e) => r.value = e,
						label: "数值",
						placeholder: "请输入数值",
						"control-variant": "split",
						inset: ""
					}, null, 8, ["modelValue"])]),
					_: 1
				}), s(_(T), null, {
					default: x(() => [s(_(le), {
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
}), K = /* @__PURE__ */ c({
	name: "HTime",
	components: {
		VTextField: F,
		HTimePicker: U
	},
	__name: "HTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = v(e, "modelValue");
		return (e, r) => (p(), t(_(F), u({
			modelValue: n.value,
			"onUpdate:modelValue": r[1] ||= (e) => n.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": x(() => [s(U, {
				modelValue: n.value,
				"onUpdate:modelValue": r[0] ||= (e) => n.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
});
H.install = (e) => {
	e.component(H.name, H);
}, W.install = (e) => {
	e.component(W.name, W);
}, G.install = (e) => {
	e.component(G.name, G);
}, K.install = (e) => {
	e.component(K.name, K);
};
//#endregion
//#region src/HDialog/HDialog.vue
var q = /* @__PURE__ */ c({
	name: "HDialog",
	components: {
		VDialog: ae,
		HButton: B
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
		let i = r, o = v(e, "modelValue"), c = () => {
			o.value = !1, i("close");
		}, l = () => {
			o.value = !1, i("cancel");
		}, d = () => {
			i("confirm");
		};
		return (r, i) => (p(), t(_(ae), {
			modelValue: o.value,
			"onUpdate:modelValue": i[0] ||= (e) => o.value = e,
			"max-width": e.maxWidth,
			persistent: ""
		}, {
			default: x(() => [s(_(w), u({
				disabled: e.loading,
				loading: e.loading
			}, r.$attrs), a({
				loader: x(({ isActive: e }) => [s(_(M), {
					active: e,
					height: "4",
					indeterminate: ""
				}, null, 8, ["active"])]),
				default: x(() => [
					s(_(oe)),
					s(_(re), { class: "pb-2" }, {
						default: x(() => [m(r.$slots, "default")]),
						_: 3
					}),
					e.hideActions ? n("", !0) : (p(), t(_(ne), { key: 0 }, {
						default: x(() => [s(_(C), {
							text: "取消",
							color: "red",
							onClick: l
						}), s(_(C), {
							text: e.confirmLabel,
							onClick: d
						}, null, 8, ["text"])]),
						_: 1
					}))
				]),
				_: 2
			}, [e.closed ? {
				name: "append",
				fn: x(() => [s(_(B), {
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
q.install = (e) => {
	e.component(q.name, q);
};
//#endregion
//#region src/HProgress/HDownloadProgress.vue
var J = /* @__PURE__ */ c({
	name: "HDownloadProgress",
	components: {
		VSnackbar: P,
		VContainer: E,
		VRow: N,
		VCol: T,
		VProgressLinear: M
	},
	__name: "HDownloadProgress",
	props: /* @__PURE__ */ l({ progress: {} }, {
		modelValue: {
			type: Boolean,
			required: !0
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let n = v(e, "modelValue");
		return (r, i) => (p(), t(_(P), u({
			modelValue: n.value,
			"onUpdate:modelValue": i[0] ||= (e) => n.value = e,
			timeout: 2e3,
			location: "center center",
			color: "primary"
		}, r.$attrs), {
			default: x(() => [s(_(E), null, {
				default: x(() => [s(_(N), {
					"align-content": "center",
					justify: "center"
				}, {
					default: x(() => [s(_(T), {
						class: "text-subtitle-1 text-center",
						cols: "12"
					}, {
						default: x(() => [o("文件下载 " + g(`${e.progress}%`), 1)]),
						_: 1
					}), s(_(T), { cols: "6" }, {
						default: x(() => [s(_(M), {
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
//#region src/HParticles/particles.ts
var Se = { particles: {
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
} }, Ce = ["id"], Y = /* @__PURE__ */ c({
	name: "HParticles",
	__name: "HParticles",
	setup(e) {
		let t = h("HParticles"), n, i = async (e, t = !0) => {
			await _e(e, !1), await ve(e, !1), await e.addPreset("triangles", Se, t);
		};
		return f(() => {
			d(async () => {
				z.init(), await i(z), n = await z.load({
					id: t.value,
					options: {
						fullScreen: { zIndex: 1 },
						preset: "triangles"
					}
				});
			});
		}), ee(() => {
			n &&= (n.destroy(), void 0);
		}), (e, n) => (p(), r("div", { id: t.value }, [m(e.$slots, "default")], 8, Ce));
	}
});
//#endregion
//#region src/HParticles/index.ts
Y.install = (e) => {
	e.component(Y.name, Y);
};
//#endregion
//#region src/HLabel/HLabel.vue?vue&type=script&setup=true&lang.ts
var we = { class: "d-flex mb-3 w-100" }, Te = { class: "flex-1-1-0" }, X = /* @__PURE__ */ c({
	name: "HLabel",
	components: {
		VLabel: k,
		VMessages: se
	},
	__name: "HLabel",
	props: {
		title: {},
		text: {}
	},
	setup(a) {
		let o = a, c = e(() => !!o.text);
		return (e, o) => (p(), r("div", we, [i("div", Te, [s(_(k), {
			text: a.title,
			class: "my-1 font-weight-medium"
		}, {
			default: x(() => [m(e.$slots, "title")]),
			_: 3
		}, 8, ["text"]), c.value ? (p(), t(_(se), {
			key: 0,
			messages: a.text,
			active: c.value
		}, null, 8, ["messages", "active"])) : n("", !0)]), m(e.$slots, "default")]));
	}
});
//#endregion
//#region src/HLabel/index.ts
X.install = (e) => {
	e.component(X.name, X);
};
//#endregion
//#region src/lib/stores/mdiicon.ts
var Ee = ye("MdiIcon", {
	state: () => ({ icons: [] }),
	getters: { getAllIcons: (e) => e.icons },
	actions: {
		initialize() {
			if (L(this.icons)) {
				let e = Object.keys(be).map((e) => he(e));
				this.icons = e;
			}
		},
		search(e) {
			if (L(e.trim())) return this.icons;
			let t = e.toLowerCase();
			return this.getAllIcons.filter((e) => e.toLowerCase().match(t));
		}
	}
}), Z = /* @__PURE__ */ c({
	name: "HMdiIconSelect",
	components: {
		VAutocomplete: S,
		VExpandXTransition: D,
		VListItem: A,
		VIcon: O
	},
	__name: "HMdiIconSelect",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let r = v(e, "modelValue"), i = h([]), a = h(!1), o = h(""), c = Ee(), l = fe((e, t) => {
			a.value = !0, t(c.search(e)), a.value = !1;
		}, 500);
		return f(() => {
			a.value = !0, c.initialize(), i.value = c.getAllIcons, a.value = !1;
		}), b(o, (e) => {
			L(e) ? i.value = c.getAllIcons : l(e, (e) => {
				i.value = e;
			});
		}), (e, c) => (p(), t(_(S), u({
			modelValue: r.value,
			"onUpdate:modelValue": c[0] ||= (e) => r.value = e,
			search: o.value,
			"onUpdate:search": c[1] ||= (e) => o.value = e,
			items: i.value,
			loading: a.value,
			clearable: "",
			"single-line": ""
		}, e.$attrs), {
			"prepend-inner": x(() => [s(_(D), null, {
				default: x(() => [r.value ? (p(), t(_(O), {
					key: 0,
					icon: r.value,
					start: ""
				}, null, 8, ["icon"])) : n("", !0)]),
				_: 1
			})]),
			item: x(({ props: e, internalItem: t }) => [s(_(A), u(e, {
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
		VIcon: O,
		VTreeview: de,
		VTextField: F
	},
	__name: "HTreeSelect",
	props: /* @__PURE__ */ l({ items: {} }, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(n) {
		let r = n, i = v(n, "modelValue"), a = te(), o = h(!1), c = h(!1), l = te([]), d = h(""), f = () => {
			o.value = !0;
		}, ee = (e) => {
			o.value = !o.value;
		}, m = () => {
			c.value && a.value?.focus();
		}, g = () => {}, y = (e) => {
			let t = [];
			for (let n of e) {
				let { children: e, ...r } = n;
				e && e.length && (t = t.concat(y(e))), t.push(r);
			}
			return t;
		}, S = (e) => {
			let t = pe(l.value, (t) => t.id == e);
			t && (d.value = t.name);
		}, C = (e) => {
			!L(e) && L(l.value) && (l.value = y(e), !d.value && i.value && S(i.value));
		}, w = e({
			get: () => i.value ? [i.value] : [],
			set: (e) => {
				e && me(e) && e.length > 0 ? i.value = e[0] : i.value = "";
			}
		});
		return b(() => r.items, (e) => {
			L(e) || C(e);
		}, { immediate: !0 }), b(i, (e, t) => {
			e && (S(e), o.value &&= !1);
		}, { immediate: !0 }), b(c, (e, t) => {
			e || e === t || (o.value = !1);
		}), (e, r) => (p(), t(_(F), u({
			ref_key: "vTextFieldRef",
			ref: a,
			modelValue: d.value,
			"onUpdate:modelValue": r[3] ||= (e) => d.value = e,
			focused: c.value,
			"onUpdate:focused": r[4] ||= (e) => c.value = e,
			class: ["v-combobox", { "v-combobox--active-menu": o.value }],
			"onMousedown:control": f,
			onAfterLeave: m
		}, e.$attrs), {
			"append-inner": x(() => [s(_(O), {
				icon: "mdi-menu-down",
				onMousedown: ee,
				onClick: g,
				class: "v-combobox__menu-icon",
				tabindex: "-1"
			})]),
			default: x(() => [s(_(j), {
				modelValue: o.value,
				"onUpdate:modelValue": r[2] ||= (e) => o.value = e,
				activator: "parent",
				"content-class": "v-combobox__content",
				"open-on-click": !1,
				"close-on-content-click": !1,
				"max-height": "310"
			}, {
				default: x(() => [s(_(de), {
					activated: w.value,
					"onUpdate:activated": r[0] ||= (e) => w.value = e,
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
var De = {
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	height: "896",
	width: "967.8852157128662"
}, Oe = {
	id: "linearGradient-3",
	x1: "0.5",
	y1: "0",
	x2: "0.5",
	y2: "1"
}, ke = ["stop-color"], Ae = ["stop-color"], je = /* @__PURE__ */ c({
	name: "HSignInCornerBottom",
	__name: "HSignInCornerBottom",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (p(), r("svg", De, [i("defs", null, [n[0] ||= i("path", {
			id: "path-2",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896\n			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806\n			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
		}, null, -1), i("linearGradient", Oe, [i("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, ke), i("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, Ae)])]), n[1] ||= i("g", { opacity: "1" }, [i("use", {
			"xlink:href": "#path-2",
			fill: "url(#linearGradient-3)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), Me = {
	height: "1337",
	width: "1337"
}, Ne = {
	id: "linearGradient-2",
	x1: "0.79",
	y1: "0.62",
	x2: "0.21",
	y2: "0.86"
}, Pe = ["stop-color"], Fe = ["stop-color"], Ie = /* @__PURE__ */ c({
	name: "HSignInCornerTop",
	__name: "HSignInCornerTop",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (p(), r("svg", Me, [i("defs", null, [n[0] ||= i("path", {
			id: "path-1",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
		}, null, -1), i("linearGradient", Ne, [i("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, Pe), i("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, Fe)])]), n[1] ||= i("g", { opacity: "1" }, [i("use", {
			"xlink:href": "#path-1",
			fill: "url(#linearGradient-2)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), Le = { class: "corner-top" }, Re = { class: "corner-bottom" }, $ = /* @__PURE__ */ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ c({
	name: "HSignInBackground",
	components: {
		HSignInCornerBottom: je,
		HSignInCornerTop: Ie
	},
	__name: "HSignInBackground",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (t, n) => (p(), r("div", null, [i("div", Le, [s(Ie, {
			"start-color": e.startColor,
			"end-color": e.endColor
		}, null, 8, ["start-color", "end-color"])]), i("div", Re, [s(je, {
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
var ze = [
	B,
	H,
	W,
	q,
	J,
	G,
	K,
	Z,
	Y,
	X,
	$,
	Q
], Be = { install: (e) => {
	ze.map((t) => t.install(e));
} };
//#endregion
export { B as HButton, H as HDate, W as HDateTime, q as HDialog, J as HDownloadProgress, G as HDuration, X as HLabel, Z as HMdiIconSelect, Y as HParticles, $ as HSignInBackground, K as HTime, Q as HTreeSelect, Be as default };

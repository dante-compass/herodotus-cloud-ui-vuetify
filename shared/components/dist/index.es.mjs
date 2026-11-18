import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createSlots as o, createTextVNode as s, createVNode as c, defineComponent as l, mergeModels as u, mergeProps as d, normalizeClass as f, normalizeProps as p, onMounted as ee, openBlock as m, ref as te, renderSlot as h, shallowRef as g, toDisplayString as _, unref as v, useModel as y, watch as b, withCtx as x } from "vue";
import { VAutocomplete as S, VBtn as C, VCard as w, VCardActions as ne, VCardText as re, VCol as T, VContainer as E, VDatePicker as ie, VDialog as ae, VDivider as D, VExpandXTransition as oe, VIcon as O, VIconBtn as k, VLabel as se, VListItem as ce, VMenu as A, VMessages as le, VNumberInput as j, VProgressLinear as M, VRow as N, VSelect as P, VSnackbar as F, VTextField as I, VTimePicker as ue, VTooltip as L, VTreeview as de } from "vuetify/components";
import { useDate as fe } from "vuetify";
import { moment as R } from "@herodotus/core";
import { debounce as pe, find as me, isArray as he, isEmpty as z, kebabCase as ge } from "lodash-es";
import { defineStore as _e } from "pinia";
import * as ve from "@mdi/js";
// src/HButton/HIconButton.vue
var B = /* @__PURE__ */ l({
	name: "HIconButton",
	components: {
		VTooltip: L,
		VIconBtn: k
	},
	__name: "HIconButton",
	props: {
		color: {},
		tooltip: {},
		location: { default: "bottom" }
	},
	setup(e) {
		return (t, r) => e.tooltip ? (m(), n(v(L), {
			key: 0,
			interactive: "",
			location: e.location
		}, {
			activator: x(({ props: n }) => [c(v(k), d({ color: e.color }, d(n, t.$attrs)), null, 16, ["color"])]),
			default: x(() => [a("span", null, _(e.tooltip), 1)]),
			_: 1
		}, 8, ["location"])) : (m(), n(v(k), p(d({ key: 1 }, t.$attrs)), null, 16));
	}
});
// src/HButton/index.ts
B.install = (e) => {
	e.component(B.name, B);
};
// src/HDateTime/HDatePicker.vue
var V = /* @__PURE__ */ l({
	name: "HDatePicker",
	components: {
		VMenu: A,
		VTooltip: L,
		VIcon: O,
		VDatePicker: ie
	},
	__name: "HDatePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let r = y(e, "modelValue"), i = fe(), o = t({
			get: () => r.value ? i.parseISO(r.value) : "",
			set: (e) => {
				e ? r.value = R(e).format("YYYY-MM-DD") : r.value = e;
			}
		});
		return (e, t) => (m(), n(v(A), d({
			"close-on-content-click": !1,
			activator: "parent"
		}, e.$attrs), {
			activator: x(({ props: e }) => [c(v(L), { location: "bottom" }, {
				activator: x(({ props: t }) => [c(v(O), d({ icon: "mdi-calendar" }, d(e, t)), null, 16)]),
				default: x(() => [t[1] ||= a("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: x(() => [c(v(ie), {
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
		VTextField: I,
		HDatePicker: V
	},
	__name: "HDate",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = y(e, "modelValue");
		return (e, r) => (m(), n(v(I), d({
			modelValue: t.value,
			"onUpdate:modelValue": r[1] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": x(() => [c(V, {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), U = /* @__PURE__ */ l({
	name: "HTimePicker",
	components: {
		VMenu: A,
		VTooltip: L,
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
		let t = y(e, "modelValue");
		return (e, r) => (m(), n(v(A), d({
			"close-on-content-click": !1,
			activator: "parent",
			"min-width": "0"
		}, e.$attrs), {
			activator: x(({ props: e }) => [c(v(L), { location: "bottom" }, {
				activator: x(({ props: t }) => [c(v(O), d({ icon: "mdi-clock-time-four-outline" }, d(e, t)), null, 16)]),
				default: x(() => [r[1] ||= a("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: x(() => [c(v(ue), {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e,
				"use-seconds": "",
				format: "24hr"
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16));
	}
}), W = /* @__PURE__ */ l({
	name: "HDateTime",
	components: {
		VTextField: I,
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
		let t = y(e, "modelValue"), r = g(""), i = g(""), a = (e, t) => {
			let n = e && e.trim() !== "" ? e : "1970-01-01", r = t && t.trim() !== "" ? t : "00:00:00";
			return R(`${n} ${r}`).format("YYYY-MM-DD HH:mm:ss");
		};
		return b(t, (e) => {
			if (e) {
				let t = R(e);
				i.value = t.format("YYYY-MM-DD"), r.value = t.format("HH:mm:ss");
			}
		}), b([i, r], ([e, n]) => {
			t.value = a(e, n);
		}), (e, a) => (m(), n(v(I), d({
			modelValue: t.value,
			"onUpdate:modelValue": a[2] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": x(() => [c(V, {
				modelValue: i.value,
				"onUpdate:modelValue": a[0] ||= (e) => i.value = e
			}, null, 8, ["modelValue"])]),
			"append-inner": x(() => [c(U, {
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
], G = /* @__PURE__ */ l({
	name: "HDuration",
	components: {
		VContainer: E,
		VRow: N,
		VCol: T,
		VNumberInput: j,
		VSelect: P
	},
	__name: "HDuration",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = y(e, "modelValue"), r = g(0), i = g(), a = g(ye), o = (e) => {
			if (e) {
				let t = R.duration(e, "seconds");
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
				let r = n, i = R.duration(e, r).toISOString();
				t.value = i;
			}
		};
		return b(() => t.value, (e) => {
			e && o(e);
		}, { immediate: !0 }), b(i, (e) => {
			e && s(r.value, e);
		}), b(r, (e) => {
			e && s(e, i.value);
		}), (e, t) => (m(), n(v(E), { class: "pa-0" }, {
			default: x(() => [c(v(N), null, {
				default: x(() => [c(v(T), null, {
					default: x(() => [c(v(j), {
						modelValue: r.value,
						"onUpdate:modelValue": t[0] ||= (e) => r.value = e,
						label: "数值",
						placeholder: "请输入数值",
						"control-variant": "split",
						inset: ""
					}, null, 8, ["modelValue"])]),
					_: 1
				}), c(v(T), null, {
					default: x(() => [c(v(P), {
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
}), K = /* @__PURE__ */ l({
	name: "HTime",
	components: {
		VTextField: I,
		HTimePicker: U
	},
	__name: "HTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = y(e, "modelValue");
		return (e, r) => (m(), n(v(I), d({
			modelValue: t.value,
			"onUpdate:modelValue": r[1] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": x(() => [c(U, {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e
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
// src/HDialog/HDialog.vue
var q = /* @__PURE__ */ l({
	name: "HDialog",
	components: {
		VDialog: ae,
		HIconButton: B
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
		let i = t, a = y(e, "modelValue"), s = () => {
			a.value = !1, i("close");
		}, l = () => {
			a.value = !1, i("cancel");
		}, u = () => {
			i("confirm");
		};
		return (t, i) => (m(), n(v(ae), {
			modelValue: a.value,
			"onUpdate:modelValue": i[0] ||= (e) => a.value = e,
			"max-width": e.maxWidth,
			persistent: "",
			"z-index": 1900
		}, {
			default: x(() => [c(v(w), d({
				disabled: e.loading,
				loading: e.loading
			}, t.$attrs), o({
				loader: x(({ isActive: e }) => [c(v(M), {
					active: e,
					height: "4",
					indeterminate: ""
				}, null, 8, ["active"])]),
				default: x(() => [
					c(v(D)),
					c(v(re), { class: "pb-2" }, {
						default: x(() => [h(t.$slots, "default")]),
						_: 3
					}),
					e.hideActions ? r("", !0) : (m(), n(v(ne), { key: 0 }, {
						default: x(() => [c(v(C), {
							text: "取消",
							color: "red",
							onClick: l
						}), c(v(C), {
							text: e.confirmLabel,
							onClick: u
						}, null, 8, ["text"])]),
						_: 1
					}))
				]),
				_: 2
			}, [e.closed ? {
				name: "append",
				fn: x(() => [c(v(B), {
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
// src/HDialog/index.ts
q.install = (e) => {
	e.component(q.name, q);
};
// src/HDivider/HDivider.vue?vue&type=script&setup=true&lang.ts
var be = { class: "d-flex flex-column gr-4 py-4" }, J = /* @__PURE__ */ l({
	name: "HDivider",
	components: { VDivider: D },
	__name: "HDivider",
	props: { label: {} },
	setup(t) {
		return (n, r) => (m(), i("div", be, [c(v(D), d({ opacity: ".7" }, n.$attrs), {
			default: x(() => [t.label ? (m(), i(e, { key: 0 }, [s(_(t.label), 1)], 64)) : h(n.$slots, "default", {}, void 0, void 0, 1)]),
			_: 3
		}, 16)]));
	}
});
// src/HDivider/index.ts
J.install = (e) => {
	e.component(J.name, J);
};
// src/HProgress/HDownloadProgress.vue
var Y = /* @__PURE__ */ l({
	name: "HDownloadProgress",
	components: {
		VSnackbar: F,
		VContainer: E,
		VRow: N,
		VCol: T,
		VProgressLinear: M
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
		let t = y(e, "modelValue");
		return (r, i) => (m(), n(v(F), d({
			modelValue: t.value,
			"onUpdate:modelValue": i[0] ||= (e) => t.value = e,
			timeout: 2e3,
			location: "center center",
			color: "primary"
		}, r.$attrs), {
			default: x(() => [c(v(E), null, {
				default: x(() => [c(v(N), {
					"align-content": "center",
					justify: "center"
				}, {
					default: x(() => [c(v(T), {
						class: "text-subtitle-1 text-center",
						cols: "12"
					}, {
						default: x(() => [s("文件下载 " + _(`${e.progress}%`), 1)]),
						_: 1
					}), c(v(T), { cols: "6" }, {
						default: x(() => [c(v(M), {
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
// src/HProgress/index.ts
Y.install = (e) => {
	e.component(Y.name, Y);
};
// src/HLabel/HLabel.vue?vue&type=script&setup=true&lang.ts
var xe = { class: "flex-1-1-0" }, Se = { class: "d-flex" }, Ce = {
	key: 0,
	class: "d-flex align-self-center mr-1"
}, we = {
	key: 1,
	class: "d-flex align-self-center"
}, X = /* @__PURE__ */ l({
	name: "HLabel",
	components: {
		VIcon: O,
		VBtn: C,
		VTooltip: L,
		VLabel: se,
		VMessages: le
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
		return (t, o) => (m(), i("div", { class: f(["d-flex w-100", { "mb-3": !e.hideDetails }]) }, [a("div", xe, [a("div", Se, [
			e.required ? (m(), i("div", Ce, [c(v(O), {
				size: "x-small",
				icon: "mdi-star",
				color: "red"
			})])) : r("", !0),
			c(v(se), {
				text: e.text,
				class: "font-weight-medium"
			}, {
				default: x(() => [h(t.$slots, "text")]),
				_: 3
			}, 8, ["text"]),
			e.tooltip ? (m(), i("div", we, [c(v(L), { location: "bottom" }, {
				activator: x(({ props: e }) => [c(v(O), d({
					size: "x-small",
					icon: "mdi-progress-question",
					color: "grey"
				}, e), null, 16)]),
				default: x(() => [o[0] ||= a("span", null, "点击设置日期", -1)]),
				_: 1
			})])) : r("", !0)
		]), s.value ? (m(), n(v(le), {
			key: 0,
			messages: e.message,
			active: s.value
		}, null, 8, ["messages", "active"])) : r("", !0)])], 2));
	}
});
// src/HLabel/index.ts
X.install = (e) => {
	e.component(X.name, X);
};
// src/lib/stores/mdiicon.ts
var Te = _e("MdiIcon", {
	state: () => ({ icons: [] }),
	getters: { getAllIcons: (e) => e.icons },
	actions: {
		initialize() {
			if (z(this.icons)) {
				let e = Object.keys(ve).map((e) => ge(e));
				this.icons = e;
			}
		},
		search(e) {
			if (z(e.trim())) return this.icons;
			let t = e.toLowerCase();
			return this.getAllIcons.filter((e) => e.toLowerCase().match(t));
		}
	}
}), Z = /* @__PURE__ */ l({
	name: "HMdiIconSelect",
	components: {
		VAutocomplete: S,
		VExpandXTransition: oe,
		VListItem: ce,
		VIcon: O
	},
	__name: "HMdiIconSelect",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = y(e, "modelValue"), i = g([]), a = g(!1), o = g(""), s = Te(), l = pe((e, t) => {
			a.value = !0, t(s.search(e)), a.value = !1;
		}, 500);
		return ee(() => {
			a.value = !0, s.initialize(), i.value = s.getAllIcons, a.value = !1;
		}), b(o, (e) => {
			z(e) ? i.value = s.getAllIcons : l(e, (e) => {
				i.value = e;
			});
		}), (e, s) => (m(), n(v(S), d({
			modelValue: t.value,
			"onUpdate:modelValue": s[0] ||= (e) => t.value = e,
			search: o.value,
			"onUpdate:search": s[1] ||= (e) => o.value = e,
			items: i.value,
			loading: a.value,
			clearable: "",
			"single-line": ""
		}, e.$attrs), {
			"prepend-inner": x(() => [c(v(oe), null, {
				default: x(() => [t.value ? (m(), n(v(O), {
					key: 0,
					icon: t.value,
					start: ""
				}, null, 8, ["icon"])) : r("", !0)]),
				_: 1
			})]),
			item: x(({ props: e, internalItem: t }) => [c(v(ce), d(e, {
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
		VTreeview: de,
		VTextField: I
	},
	__name: "HTreeSelect",
	props: /*@__PURE__*/ u({ items: {} }, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let r = e, i = y(e, "modelValue"), a = te(), o = g(!1), s = g(!1), l = te([]), u = g(""), f = () => {
			o.value = !0;
		}, p = (e) => {
			o.value = !o.value;
		}, ee = () => {
			s.value && a.value?.focus();
		}, h = () => {}, _ = (e) => {
			let t = [];
			for (let n of e) {
				let { children: e, ...r } = n;
				e && e.length && (t = t.concat(_(e))), t.push(r);
			}
			return t;
		}, S = (e) => {
			let t = me(l.value, (t) => t.id == e);
			t && (u.value = t.name);
		}, C = (e) => {
			!z(e) && z(l.value) && (l.value = _(e), !u.value && i.value && S(i.value));
		}, w = t({
			get: () => i.value ? [i.value] : [],
			set: (e) => {
				e && he(e) && e.length > 0 ? i.value = e[0] : i.value = "";
			}
		});
		return b(() => r.items, (e) => {
			z(e) || C(e);
		}, { immediate: !0 }), b(i, (e, t) => {
			e && (S(e), o.value &&= !1);
		}, { immediate: !0 }), b(s, (e, t) => {
			e || e === t || (o.value = !1);
		}), (t, r) => (m(), n(v(I), d({
			ref_key: "vTextFieldRef",
			ref: a,
			modelValue: u.value,
			"onUpdate:modelValue": r[3] ||= (e) => u.value = e,
			focused: s.value,
			"onUpdate:focused": r[4] ||= (e) => s.value = e,
			class: ["v-combobox", { "v-combobox--active-menu": o.value }],
			"onMousedown:control": f,
			onAfterLeave: ee
		}, t.$attrs), {
			"append-inner": x(() => [c(v(O), {
				icon: "mdi-menu-down",
				onMousedown: p,
				onClick: h,
				class: "v-combobox__menu-icon",
				tabindex: "-1"
			})]),
			default: x(() => [c(v(A), {
				modelValue: o.value,
				"onUpdate:modelValue": r[2] ||= (e) => o.value = e,
				activator: "parent",
				"content-class": "v-combobox__content",
				"open-on-click": !1,
				"close-on-content-click": !1,
				"max-height": "310"
			}, {
				default: x(() => [c(v(de), {
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
Z.install = (e) => {
	e.component(Z.name, Z);
}, Q.install = (e) => {
	e.component(Q.name, Q);
};
// src/HItem/HLabelItem.vue?vue&type=script&setup=true&lang.ts
var Ee = { class: "w-20" }, De = { class: "w-50" }, $ = /* @__PURE__ */ l({
	name: "HLabelItem",
	components: { HLabel: X },
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
		return (t, n) => (m(), i("div", { class: f([
			"d-flex",
			...r.value,
			"ga-4"
		]) }, [
			a("div", Ee, [c(v(X), {
				text: e.label,
				required: e.required,
				"hide-details": "",
				class: f([{ "justify-end": e.right }])
			}, null, 8, [
				"text",
				"required",
				"class"
			])]),
			a("div", De, [h(t.$slots, "default")]),
			a("div", null, [h(t.$slots, "append")])
		], 2));
	}
});
// src/HItem/index.ts
$.install = (e) => {
	e.component($.name, $);
};
// src/index.ts
var Oe = [
	H,
	W,
	q,
	J,
	Y,
	G,
	Z,
	B,
	X,
	$,
	K,
	Q
], ke = { install: (e) => {
	Oe.map((t) => t.install(e));
} };
export { H as HDate, W as HDateTime, q as HDialog, J as HDivider, Y as HDownloadProgress, G as HDuration, B as HIconButton, X as HLabel, $ as HLabelItem, Z as HMdiIconSelect, K as HTime, Q as HTreeSelect, ke as default };

import { computed as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createSlots as a, createTextVNode as o, createVNode as s, defineComponent as c, mergeModels as l, mergeProps as u, onMounted as d, openBlock as f, ref as ee, renderSlot as p, shallowRef as m, toDisplayString as h, unref as g, useModel as _, useSlots as te, watch as v, withCtx as y } from "vue";
import { VAutocomplete as b, VBtn as x, VCard as S, VCardActions as C, VCardText as w, VCol as T, VContainer as E, VDatePicker as D, VDialog as O, VDivider as k, VExpandXTransition as ne, VIcon as A, VLabel as j, VListItem as M, VMenu as N, VMessages as re, VNumberInput as ie, VProgressLinear as P, VRow as F, VSelect as ae, VSnackbar as oe, VTextField as I, VTimePicker as se, VTooltip as L, VTreeview as ce } from "vuetify/components";
import { debounce as le, find as ue, isArray as de, isEmpty as R, kebabCase as fe } from "lodash-es";
import { useDate as pe } from "vuetify";
import { moment as z } from "@herodotus/core";
import { defineStore as me } from "pinia";
import * as he from "@mdi/js";
//#endregion
//#region src/HButton/HButton.vue
var B = /* @__PURE__ */ c({
	name: "HButton",
	components: {
		VBtn: x,
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
		let i = r, a = te(), s = e(() => !R(i.icon)), c = e(() => R(a.default) ? void 0 : i.color);
		return (e, i) => (f(), t(g(x), u({
			icon: s.value,
			color: c.value
		}, e.$attrs), {
			append: y(() => [p(e.$slots, "append")]),
			prepend: y(() => [p(e.$slots, "prepend")]),
			loader: y(() => [p(e.$slots, "loader")]),
			default: y(() => [!e.$slots.default && s.value ? (f(), t(g(A), {
				key: 0,
				icon: r.icon,
				color: r.color
			}, null, 8, ["icon", "color"])) : p(e.$slots, "default", { key: 1 }), r.tooltip ? (f(), t(g(L), {
				key: 2,
				location: r.location,
				activator: "parent"
			}, {
				default: y(() => [o(h(r.tooltip), 1)]),
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
		VMenu: N,
		VTooltip: L,
		VIcon: A,
		VDatePicker: D
	},
	__name: "HDatePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(n) {
		let r = _(n, "modelValue"), a = pe(), o = e({
			get: () => r.value ? a.parseISO(r.value) : "",
			set: (e) => {
				e ? r.value = z(e).format("YYYY-MM-DD") : r.value = e;
			}
		});
		return (e, n) => (f(), t(g(N), u({
			"close-on-content-click": !1,
			activator: "parent"
		}, e.$attrs), {
			activator: y(({ props: e }) => [s(g(L), { location: "bottom" }, {
				activator: y(({ props: t }) => [s(g(A), u({ icon: "mdi-calendar" }, u(e, t)), null, 16)]),
				default: y(() => [n[1] ||= i("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: y(() => [s(g(D), {
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
		let n = _(e, "modelValue");
		return (e, r) => (f(), t(g(I), u({
			modelValue: n.value,
			"onUpdate:modelValue": r[1] ||= (e) => n.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": y(() => [s(V, {
				modelValue: n.value,
				"onUpdate:modelValue": r[0] ||= (e) => n.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), U = /* @__PURE__ */ c({
	name: "HTimePicker",
	components: {
		VMenu: N,
		VTooltip: L,
		VIcon: A,
		VTimePicker: se
	},
	__name: "HTimePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = _(e, "modelValue");
		return (e, r) => (f(), t(g(N), u({
			"close-on-content-click": !1,
			activator: "parent",
			"min-width": "0"
		}, e.$attrs), {
			activator: y(({ props: e }) => [s(g(L), { location: "bottom" }, {
				activator: y(({ props: t }) => [s(g(A), u({ icon: "mdi-clock-time-four-outline" }, u(e, t)), null, 16)]),
				default: y(() => [r[1] ||= i("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: y(() => [s(g(se), {
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
		let n = _(e, "modelValue"), r = m(""), i = m(""), a = (e, t) => z(`${e && e.trim() !== "" ? e : "1970-01-01"} ${t && t.trim() !== "" ? t : "00:00:00"}`).format("YYYY-MM-DD HH:mm:ss");
		return v(n, (e) => {
			if (e) {
				let t = z(e);
				i.value = t.format("YYYY-MM-DD"), r.value = t.format("HH:mm:ss");
			}
		}), v([i, r], ([e, t]) => {
			n.value = a(e, t);
		}), (e, a) => (f(), t(g(I), u({
			modelValue: n.value,
			"onUpdate:modelValue": a[2] ||= (e) => n.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": y(() => [s(V, {
				modelValue: i.value,
				"onUpdate:modelValue": a[0] ||= (e) => i.value = e
			}, null, 8, ["modelValue"])]),
			"append-inner": y(() => [s(U, {
				modelValue: r.value,
				"onUpdate:modelValue": a[1] ||= (e) => r.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), ge = [
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
		VRow: F,
		VCol: T,
		VNumberInput: ie,
		VSelect: ae
	},
	__name: "HDuration",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let n = _(e, "modelValue"), r = m(0), i = m(), a = m(ge), o = (e) => {
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
		return v(() => n.value, (e) => {
			e && o(e);
		}, { immediate: !0 }), v(i, (e) => {
			e && c(r.value, e);
		}), v(r, (e) => {
			e && c(e, i.value);
		}), (e, n) => (f(), t(g(E), {
			fluid: "",
			class: "pa-0"
		}, {
			default: y(() => [s(g(F), null, {
				default: y(() => [s(g(T), null, {
					default: y(() => [s(g(ie), {
						modelValue: r.value,
						"onUpdate:modelValue": n[0] ||= (e) => r.value = e,
						label: "数值",
						placeholder: "请输入数值",
						"control-variant": "split",
						inset: ""
					}, null, 8, ["modelValue"])]),
					_: 1
				}), s(g(T), null, {
					default: y(() => [s(g(ae), {
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
		let n = _(e, "modelValue");
		return (e, r) => (f(), t(g(I), u({
			modelValue: n.value,
			"onUpdate:modelValue": r[1] ||= (e) => n.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": y(() => [s(U, {
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
		VDialog: O,
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
		let i = r, o = _(e, "modelValue"), c = () => {
			o.value = !1, i("close");
		}, l = () => {
			o.value = !1, i("cancel");
		}, d = () => {
			i("confirm");
		};
		return (r, i) => (f(), t(g(O), {
			modelValue: o.value,
			"onUpdate:modelValue": i[0] ||= (e) => o.value = e,
			"max-width": e.maxWidth,
			persistent: ""
		}, {
			default: y(() => [s(g(S), u({
				disabled: e.loading,
				loading: e.loading
			}, r.$attrs), a({
				loader: y(({ isActive: e }) => [s(g(P), {
					active: e,
					height: "4",
					indeterminate: ""
				}, null, 8, ["active"])]),
				default: y(() => [
					s(g(k)),
					s(g(w), { class: "pb-2" }, {
						default: y(() => [p(r.$slots, "default")]),
						_: 3
					}),
					e.hideActions ? n("", !0) : (f(), t(g(C), { key: 0 }, {
						default: y(() => [s(g(x), {
							text: "取消",
							color: "red",
							onClick: l
						}), s(g(x), {
							text: e.confirmLabel,
							onClick: d
						}, null, 8, ["text"])]),
						_: 1
					}))
				]),
				_: 2
			}, [e.closed ? {
				name: "append",
				fn: y(() => [s(g(B), {
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
//#region src/HDivider/HTextDivider.vue
var J = /* @__PURE__ */ c({
	name: "HTextDivider",
	components: {
		VContainer: E,
		VRow: F,
		VCol: T,
		VDivider: k
	},
	__name: "HTextDivider",
	props: { label: {} },
	setup(e) {
		return (n, r) => (f(), t(g(E), { class: "px-0" }, {
			default: y(() => [s(g(F), {
				align: "center",
				justify: "center"
			}, {
				default: y(() => [
					s(g(T), { cols: "5" }, {
						default: y(() => [s(g(k))]),
						_: 1
					}),
					s(g(T), {
						cols: "2",
						"align-self": "center",
						class: "text-center"
					}, {
						default: y(() => [o(h(e.label), 1)]),
						_: 1
					}),
					s(g(T), { cols: "5" }, {
						default: y(() => [s(g(k))]),
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
J.install = (e) => {
	e.component(J.name, J);
};
//#endregion
//#region src/HProgress/HDownloadProgress.vue
var Y = /* @__PURE__ */ c({
	name: "HDownloadProgress",
	components: {
		VSnackbar: oe,
		VContainer: E,
		VRow: F,
		VCol: T,
		VProgressLinear: P
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
		let n = _(e, "modelValue");
		return (r, i) => (f(), t(g(oe), u({
			modelValue: n.value,
			"onUpdate:modelValue": i[0] ||= (e) => n.value = e,
			timeout: 2e3,
			location: "center center",
			color: "primary"
		}, r.$attrs), {
			default: y(() => [s(g(E), null, {
				default: y(() => [s(g(F), {
					"align-content": "center",
					justify: "center"
				}, {
					default: y(() => [s(g(T), {
						class: "text-subtitle-1 text-center",
						cols: "12"
					}, {
						default: y(() => [o("文件下载 " + h(`${e.progress}%`), 1)]),
						_: 1
					}), s(g(T), { cols: "6" }, {
						default: y(() => [s(g(P), {
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
Y.install = (e) => {
	e.component(Y.name, Y);
};
//#endregion
//#region src/HLabel/HLabel.vue?vue&type=script&setup=true&lang.ts
var _e = { class: "d-flex mb-3 w-100" }, ve = { class: "flex-1-1-0" }, ye = { class: "d-flex" }, be = {
	key: 0,
	class: "d-flex align-self-center mr-1"
}, xe = {
	key: 1,
	class: "d-flex align-self-center"
}, X = /* @__PURE__ */ c({
	name: "HLabel",
	components: {
		VIcon: A,
		VBtn: x,
		VTooltip: L,
		VLabel: j,
		VMessages: re
	},
	__name: "HLabel",
	props: {
		required: {
			type: Boolean,
			default: !1
		},
		text: {},
		message: {},
		tooltip: {}
	},
	setup(a) {
		let o = a, c = e(() => !!o.message);
		return (e, o) => (f(), r("div", _e, [i("div", ve, [i("div", ye, [
			a.required ? (f(), r("div", be, [s(g(A), {
				size: "x-small",
				icon: "mdi-star",
				color: "red"
			})])) : n("", !0),
			s(g(j), {
				text: a.text,
				class: "font-weight-medium"
			}, {
				default: y(() => [p(e.$slots, "text")]),
				_: 3
			}, 8, ["text"]),
			a.tooltip ? (f(), r("div", xe, [s(g(L), { location: "bottom" }, {
				activator: y(({ props: e }) => [s(g(A), u({
					size: "x-small",
					icon: "mdi-progress-question",
					color: "grey"
				}, e), null, 16)]),
				default: y(() => [o[0] ||= i("span", null, "点击设置日期", -1)]),
				_: 1
			})])) : n("", !0)
		]), c.value ? (f(), t(g(re), {
			key: 0,
			messages: a.message,
			active: c.value
		}, null, 8, ["messages", "active"])) : n("", !0)]), p(e.$slots, "default")]));
	}
});
//#endregion
//#region src/HLabel/index.ts
X.install = (e) => {
	e.component(X.name, X);
};
//#endregion
//#region src/lib/stores/mdiicon.ts
var Se = me("MdiIcon", {
	state: () => ({ icons: [] }),
	getters: { getAllIcons: (e) => e.icons },
	actions: {
		initialize() {
			if (R(this.icons)) {
				let e = Object.keys(he).map((e) => fe(e));
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
		VAutocomplete: b,
		VExpandXTransition: ne,
		VListItem: M,
		VIcon: A
	},
	__name: "HMdiIconSelect",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let r = _(e, "modelValue"), i = m([]), a = m(!1), o = m(""), c = Se(), l = le((e, t) => {
			a.value = !0, t(c.search(e)), a.value = !1;
		}, 500);
		return d(() => {
			a.value = !0, c.initialize(), i.value = c.getAllIcons, a.value = !1;
		}), v(o, (e) => {
			R(e) ? i.value = c.getAllIcons : l(e, (e) => {
				i.value = e;
			});
		}), (e, c) => (f(), t(g(b), u({
			modelValue: r.value,
			"onUpdate:modelValue": c[0] ||= (e) => r.value = e,
			search: o.value,
			"onUpdate:search": c[1] ||= (e) => o.value = e,
			items: i.value,
			loading: a.value,
			clearable: "",
			"single-line": ""
		}, e.$attrs), {
			"prepend-inner": y(() => [s(g(ne), null, {
				default: y(() => [r.value ? (f(), t(g(A), {
					key: 0,
					icon: r.value,
					start: ""
				}, null, 8, ["icon"])) : n("", !0)]),
				_: 1
			})]),
			item: y(({ props: e, internalItem: t }) => [s(g(M), u(e, {
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
		VMenu: N,
		VIcon: A,
		VTreeview: ce,
		VTextField: I
	},
	__name: "HTreeSelect",
	props: /* @__PURE__ */ l({ items: {} }, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(n) {
		let r = n, i = _(n, "modelValue"), a = ee(), o = m(!1), c = m(!1), l = ee([]), d = m(""), p = () => {
			o.value = !0;
		}, h = (e) => {
			o.value = !o.value;
		}, te = () => {
			c.value && a.value?.focus();
		}, b = () => {}, x = (e) => {
			let t = [];
			for (let n of e) {
				let { children: e, ...r } = n;
				e && e.length && (t = t.concat(x(e))), t.push(r);
			}
			return t;
		}, S = (e) => {
			let t = ue(l.value, (t) => t.id == e);
			t && (d.value = t.name);
		}, C = (e) => {
			!R(e) && R(l.value) && (l.value = x(e), !d.value && i.value && S(i.value));
		}, w = e({
			get: () => i.value ? [i.value] : [],
			set: (e) => {
				e && de(e) && e.length > 0 ? i.value = e[0] : i.value = "";
			}
		});
		return v(() => r.items, (e) => {
			R(e) || C(e);
		}, { immediate: !0 }), v(i, (e, t) => {
			e && (S(e), o.value &&= !1);
		}, { immediate: !0 }), v(c, (e, t) => {
			e || e === t || (o.value = !1);
		}), (e, r) => (f(), t(g(I), u({
			ref_key: "vTextFieldRef",
			ref: a,
			modelValue: d.value,
			"onUpdate:modelValue": r[3] ||= (e) => d.value = e,
			focused: c.value,
			"onUpdate:focused": r[4] ||= (e) => c.value = e,
			class: ["v-combobox", { "v-combobox--active-menu": o.value }],
			"onMousedown:control": p,
			onAfterLeave: te
		}, e.$attrs), {
			"append-inner": y(() => [s(g(A), {
				icon: "mdi-menu-down",
				onMousedown: h,
				onClick: b,
				class: "v-combobox__menu-icon",
				tabindex: "-1"
			})]),
			default: y(() => [s(g(N), {
				modelValue: o.value,
				"onUpdate:modelValue": r[2] ||= (e) => o.value = e,
				activator: "parent",
				"content-class": "v-combobox__content",
				"open-on-click": !1,
				"close-on-content-click": !1,
				"max-height": "310"
			}, {
				default: y(() => [s(g(ce), {
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
var Ce = {
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	height: "896",
	width: "967.8852157128662"
}, we = {
	id: "linearGradient-3",
	x1: "0.5",
	y1: "0",
	x2: "0.5",
	y2: "1"
}, Te = ["stop-color"], Ee = ["stop-color"], De = /* @__PURE__ */ c({
	name: "HSignInCornerBottom",
	__name: "HSignInCornerBottom",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (f(), r("svg", Ce, [i("defs", null, [n[0] ||= i("path", {
			id: "path-2",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896\n			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806\n			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
		}, null, -1), i("linearGradient", we, [i("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, Te), i("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, Ee)])]), n[1] ||= i("g", { opacity: "1" }, [i("use", {
			"xlink:href": "#path-2",
			fill: "url(#linearGradient-3)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), Oe = {
	height: "1337",
	width: "1337"
}, ke = {
	id: "linearGradient-2",
	x1: "0.79",
	y1: "0.62",
	x2: "0.21",
	y2: "0.86"
}, Ae = ["stop-color"], je = ["stop-color"], Me = /* @__PURE__ */ c({
	name: "HSignInCornerTop",
	__name: "HSignInCornerTop",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (f(), r("svg", Oe, [i("defs", null, [n[0] ||= i("path", {
			id: "path-1",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
		}, null, -1), i("linearGradient", ke, [i("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, Ae), i("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, je)])]), n[1] ||= i("g", { opacity: "1" }, [i("use", {
			"xlink:href": "#path-1",
			fill: "url(#linearGradient-2)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), Ne = { class: "corner-top" }, Pe = { class: "corner-bottom" }, $ = /* @__PURE__ */ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ c({
	name: "HSignInBackground",
	components: {
		HSignInCornerBottom: De,
		HSignInCornerTop: Me
	},
	__name: "HSignInBackground",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (t, n) => (f(), r("div", null, [i("div", Ne, [s(Me, {
			"start-color": e.startColor,
			"end-color": e.endColor
		}, null, 8, ["start-color", "end-color"])]), i("div", Pe, [s(De, {
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
var Fe = [
	B,
	H,
	W,
	q,
	Y,
	G,
	Z,
	X,
	$,
	J,
	K,
	Q
], Ie = { install: (e) => {
	Fe.map((t) => t.install(e));
} };
//#endregion
export { B as HButton, H as HDate, W as HDateTime, q as HDialog, Y as HDownloadProgress, G as HDuration, X as HLabel, Z as HMdiIconSelect, $ as HSignInBackground, J as HTextDivider, K as HTime, Q as HTreeSelect, Ie as default };

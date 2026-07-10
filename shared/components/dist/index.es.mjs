import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createSlots as o, createTextVNode as s, createVNode as c, defineComponent as l, mergeModels as u, mergeProps as d, normalizeClass as ee, normalizeProps as te, onBeforeMount as ne, onMounted as f, onUnmounted as p, openBlock as m, ref as re, renderSlot as h, shallowRef as g, toDisplayString as _, unref as v, useModel as y, watch as b, withCtx as x } from "vue";
import { VAutocomplete as S, VBtn as C, VCard as ie, VCardActions as ae, VCardText as oe, VCol as w, VContainer as T, VDatePicker as E, VDialog as se, VDivider as D, VExpandXTransition as ce, VIcon as O, VIconBtn as k, VLabel as le, VListItem as ue, VMenu as A, VMessages as j, VNumberInput as de, VProgressLinear as M, VRow as N, VSelect as fe, VSnackbar as pe, VTextField as P, VTimePicker as me, VTooltip as F, VTreeview as I } from "vuetify/components";
import { useDate as he } from "vuetify";
import { moment as L } from "@herodotus/core";
import { tsParticles as ge } from "@tsparticles/engine";
import { loadTrianglesPreset as _e } from "@tsparticles/preset-triangles";
import { debounce as ve, find as ye, isArray as be, isEmpty as R, kebabCase as xe } from "lodash-es";
import { defineStore as Se } from "pinia";
import * as Ce from "@mdi/js";
//#endregion
//#region src/HButton/HIconButton.vue
var z = /* @__PURE__ */ l({
	name: "HIconButton",
	components: {
		VTooltip: F,
		VIconBtn: k
	},
	__name: "HIconButton",
	props: {
		color: {},
		tooltip: {},
		location: { default: "bottom" }
	},
	setup(e) {
		return (t, r) => e.tooltip ? (m(), n(v(F), {
			key: 0,
			interactive: "",
			location: e.location
		}, {
			activator: x(({ props: n }) => [c(v(k), d({ color: e.color }, d(n, t.$attrs)), null, 16, ["color"])]),
			default: x(() => [a("span", null, _(e.tooltip), 1)]),
			_: 1
		}, 8, ["location"])) : (m(), n(v(k), te(d({ key: 1 }, t.$attrs)), null, 16));
	}
});
//#endregion
//#region src/HButton/index.ts
z.install = (e) => {
	e.component(z.name, z);
};
//#endregion
//#region src/HDateTime/HDatePicker.vue
var B = /* @__PURE__ */ l({
	name: "HDatePicker",
	components: {
		VMenu: A,
		VTooltip: F,
		VIcon: O,
		VDatePicker: E
	},
	__name: "HDatePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let r = y(e, "modelValue"), i = he(), o = t({
			get: () => r.value ? i.parseISO(r.value) : "",
			set: (e) => {
				e ? r.value = L(e).format("YYYY-MM-DD") : r.value = e;
			}
		});
		return (e, t) => (m(), n(v(A), d({
			"close-on-content-click": !1,
			activator: "parent"
		}, e.$attrs), {
			activator: x(({ props: e }) => [c(v(F), { location: "bottom" }, {
				activator: x(({ props: t }) => [c(v(O), d({ icon: "mdi-calendar" }, d(e, t)), null, 16)]),
				default: x(() => [t[1] ||= a("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: x(() => [c(v(E), {
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
		let t = y(e, "modelValue");
		return (e, r) => (m(), n(v(P), d({
			modelValue: t.value,
			"onUpdate:modelValue": r[1] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": x(() => [c(B, {
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
		VTimePicker: me
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
			activator: x(({ props: e }) => [c(v(F), { location: "bottom" }, {
				activator: x(({ props: t }) => [c(v(O), d({ icon: "mdi-clock-time-four-outline" }, d(e, t)), null, 16)]),
				default: x(() => [r[1] ||= a("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: x(() => [c(v(me), {
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
		let t = y(e, "modelValue"), r = g(""), i = g(""), a = (e, t) => L(`${e && e.trim() !== "" ? e : "1970-01-01"} ${t && t.trim() !== "" ? t : "00:00:00"}`).format("YYYY-MM-DD HH:mm:ss");
		return b(t, (e) => {
			if (e) {
				let t = L(e);
				i.value = t.format("YYYY-MM-DD"), r.value = t.format("HH:mm:ss");
			}
		}), b([i, r], ([e, n]) => {
			t.value = a(e, n);
		}), (e, a) => (m(), n(v(P), d({
			modelValue: t.value,
			"onUpdate:modelValue": a[2] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": x(() => [c(B, {
				modelValue: i.value,
				"onUpdate:modelValue": a[0] ||= (e) => i.value = e
			}, null, 8, ["modelValue"])]),
			"append-inner": x(() => [c(H, {
				modelValue: r.value,
				"onUpdate:modelValue": a[1] ||= (e) => r.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), we = [
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
		VContainer: T,
		VRow: N,
		VCol: w,
		VNumberInput: de,
		VSelect: fe
	},
	__name: "HDuration",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = y(e, "modelValue"), r = g(0), i = g(), a = g(we), o = (e) => {
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
		return b(() => t.value, (e) => {
			e && o(e);
		}, { immediate: !0 }), b(i, (e) => {
			e && s(r.value, e);
		}), b(r, (e) => {
			e && s(e, i.value);
		}), (e, t) => (m(), n(v(T), { class: "pa-0" }, {
			default: x(() => [c(v(N), null, {
				default: x(() => [c(v(w), null, {
					default: x(() => [c(v(de), {
						modelValue: r.value,
						"onUpdate:modelValue": t[0] ||= (e) => r.value = e,
						label: "数值",
						placeholder: "请输入数值",
						"control-variant": "split",
						inset: ""
					}, null, 8, ["modelValue"])]),
					_: 1
				}), c(v(w), null, {
					default: x(() => [c(v(fe), {
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
		let t = y(e, "modelValue");
		return (e, r) => (m(), n(v(P), d({
			modelValue: t.value,
			"onUpdate:modelValue": r[1] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": x(() => [c(H, {
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
		VDialog: se,
		HIconButton: z
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
		return (t, i) => (m(), n(v(se), {
			modelValue: a.value,
			"onUpdate:modelValue": i[0] ||= (e) => a.value = e,
			"max-width": e.maxWidth,
			persistent: ""
		}, {
			default: x(() => [c(v(ie), d({
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
					c(v(oe), { class: "pb-2" }, {
						default: x(() => [h(t.$slots, "default")]),
						_: 3
					}),
					e.hideActions ? r("", !0) : (m(), n(v(ae), { key: 0 }, {
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
				fn: x(() => [c(v(z), {
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
var Te = { class: "d-flex flex-column gr-4 py-4" }, q = /* @__PURE__ */ l({
	name: "HDivider",
	components: { VDivider: D },
	__name: "HDivider",
	props: { label: {} },
	setup(t) {
		return (n, r) => (m(), i("div", Te, [c(v(D), d({ opacity: ".7" }, n.$attrs), {
			default: x(() => [t.label ? (m(), i(e, { key: 0 }, [s(_(t.label), 1)], 64)) : h(n.$slots, "default", { key: 1 })]),
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
		VSnackbar: pe,
		VContainer: T,
		VRow: N,
		VCol: w,
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
		return (r, i) => (m(), n(v(pe), d({
			modelValue: t.value,
			"onUpdate:modelValue": i[0] ||= (e) => t.value = e,
			timeout: 2e3,
			location: "center center",
			color: "primary"
		}, r.$attrs), {
			default: x(() => [c(v(T), null, {
				default: x(() => [c(v(N), {
					"align-content": "center",
					justify: "center"
				}, {
					default: x(() => [c(v(w), {
						class: "text-subtitle-1 text-center",
						cols: "12"
					}, {
						default: x(() => [s("文件下载 " + _(`${e.progress}%`), 1)]),
						_: 1
					}), c(v(w), { cols: "6" }, {
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
//#endregion
//#region src/HProgress/index.ts
J.install = (e) => {
	e.component(J.name, J);
};
//#endregion
//#region src/HLabel/HLabel.vue?vue&type=script&setup=true&lang.ts
var Ee = { class: "flex-1-1-0" }, De = { class: "d-flex" }, Oe = {
	key: 0,
	class: "d-flex align-self-center mr-1"
}, ke = {
	key: 1,
	class: "d-flex align-self-center"
}, Y = /* @__PURE__ */ l({
	name: "HLabel",
	components: {
		VIcon: O,
		VBtn: C,
		VTooltip: F,
		VLabel: le,
		VMessages: j
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
		return (t, o) => (m(), i("div", { class: ee(["d-flex w-100", { "mb-3": !e.hideDetails }]) }, [a("div", Ee, [a("div", De, [
			e.required ? (m(), i("div", Oe, [c(v(O), {
				size: "x-small",
				icon: "mdi-star",
				color: "red"
			})])) : r("", !0),
			c(v(le), {
				text: e.text,
				class: "font-weight-medium"
			}, {
				default: x(() => [h(t.$slots, "text")]),
				_: 3
			}, 8, ["text"]),
			e.tooltip ? (m(), i("div", ke, [c(v(F), { location: "bottom" }, {
				activator: x(({ props: e }) => [c(v(O), d({
					size: "x-small",
					icon: "mdi-progress-question",
					color: "grey"
				}, e), null, 16)]),
				default: x(() => [o[0] ||= a("span", null, "点击设置日期", -1)]),
				_: 1
			})])) : r("", !0)
		]), s.value ? (m(), n(v(j), {
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
var Ae = { particles: {
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
} }, je = ["id"], X = /* @__PURE__ */ l({
	name: "HParticles",
	__name: "HParticles",
	setup(e) {
		let t = g("HParticles"), n, r = async () => {
			await _e(ge);
		}, a = async () => {
			n?.destroy(), n = await ge.load({
				id: t.value,
				options: Ae
			});
		}, o = async () => {
			n?.destroy();
		};
		return ne(() => {
			r();
		}), f(() => {
			a();
		}), p(() => {
			o();
		}), (e, n) => (m(), i("div", { id: t.value }, [h(e.$slots, "default")], 8, je));
	}
});
//#endregion
//#region src/HParticles/index.ts
X.install = (e) => {
	e.component(X.name, X);
};
//#endregion
//#region src/lib/stores/mdiicon.ts
var Me = Se("MdiIcon", {
	state: () => ({ icons: [] }),
	getters: { getAllIcons: (e) => e.icons },
	actions: {
		initialize() {
			if (R(this.icons)) {
				let e = Object.keys(Ce).map((e) => xe(e));
				this.icons = e;
			}
		},
		search(e) {
			if (R(e.trim())) return this.icons;
			let t = e.toLowerCase();
			return this.getAllIcons.filter((e) => e.toLowerCase().match(t));
		}
	}
}), Z = /* @__PURE__ */ l({
	name: "HMdiIconSelect",
	components: {
		VAutocomplete: S,
		VExpandXTransition: ce,
		VListItem: ue,
		VIcon: O
	},
	__name: "HMdiIconSelect",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = y(e, "modelValue"), i = g([]), a = g(!1), o = g(""), s = Me(), l = ve((e, t) => {
			a.value = !0, t(s.search(e)), a.value = !1;
		}, 500);
		return f(() => {
			a.value = !0, s.initialize(), i.value = s.getAllIcons, a.value = !1;
		}), b(o, (e) => {
			R(e) ? i.value = s.getAllIcons : l(e, (e) => {
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
			"prepend-inner": x(() => [c(v(ce), null, {
				default: x(() => [t.value ? (m(), n(v(O), {
					key: 0,
					icon: t.value,
					start: ""
				}, null, 8, ["icon"])) : r("", !0)]),
				_: 1
			})]),
			item: x(({ props: e, internalItem: t }) => [c(v(ue), d(e, {
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
		VTreeview: I,
		VTextField: P
	},
	__name: "HTreeSelect",
	props: /*@__PURE__*/ u({ items: {} }, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let r = e, i = y(e, "modelValue"), a = re(), o = g(!1), s = g(!1), l = re([]), u = g(""), ee = () => {
			o.value = !0;
		}, te = (e) => {
			o.value = !o.value;
		}, ne = () => {
			s.value && a.value?.focus();
		}, f = () => {}, p = (e) => {
			let t = [];
			for (let n of e) {
				let { children: e, ...r } = n;
				e && e.length && (t = t.concat(p(e))), t.push(r);
			}
			return t;
		}, h = (e) => {
			let t = ye(l.value, (t) => t.id == e);
			t && (u.value = t.name);
		}, _ = (e) => {
			!R(e) && R(l.value) && (l.value = p(e), !u.value && i.value && h(i.value));
		}, S = t({
			get: () => i.value ? [i.value] : [],
			set: (e) => {
				e && be(e) && e.length > 0 ? i.value = e[0] : i.value = "";
			}
		});
		return b(() => r.items, (e) => {
			R(e) || _(e);
		}, { immediate: !0 }), b(i, (e, t) => {
			e && (h(e), o.value &&= !1);
		}, { immediate: !0 }), b(s, (e, t) => {
			e || e === t || (o.value = !1);
		}), (t, r) => (m(), n(v(P), d({
			ref_key: "vTextFieldRef",
			ref: a,
			modelValue: u.value,
			"onUpdate:modelValue": r[3] ||= (e) => u.value = e,
			focused: s.value,
			"onUpdate:focused": r[4] ||= (e) => s.value = e,
			class: ["v-combobox", { "v-combobox--active-menu": o.value }],
			"onMousedown:control": ee,
			onAfterLeave: ne
		}, t.$attrs), {
			"append-inner": x(() => [c(v(O), {
				icon: "mdi-menu-down",
				onMousedown: te,
				onClick: f,
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
				default: x(() => [c(v(I), {
					activated: S.value,
					"onUpdate:activated": r[0] ||= (e) => S.value = e,
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
var Ne = {
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	"xmlns:xlink": "http://www.w3.org/1999/xlink",
	height: "896",
	width: "967.8852157128662"
}, Pe = {
	id: "linearGradient-3",
	x1: "0.5",
	y1: "0",
	x2: "0.5",
	y2: "1"
}, Fe = ["stop-color"], Ie = ["stop-color"], Le = /* @__PURE__ */ l({
	name: "HSignInCornerBottom",
	__name: "HSignInCornerBottom",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (m(), i("svg", Ne, [a("defs", null, [n[0] ||= a("path", {
			id: "path-2",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896\n			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806\n			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
		}, null, -1), a("linearGradient", Pe, [a("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, Fe), a("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, Ie)])]), n[1] ||= a("g", { opacity: "1" }, [a("use", {
			"xlink:href": "#path-2",
			fill: "url(#linearGradient-3)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), Re = {
	height: "1337",
	width: "1337"
}, ze = {
	id: "linearGradient-2",
	x1: "0.79",
	y1: "0.62",
	x2: "0.21",
	y2: "0.86"
}, Be = ["stop-color"], Ve = ["stop-color"], He = /* @__PURE__ */ l({
	name: "HSignInCornerTop",
	__name: "HSignInCornerTop",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (m(), i("svg", Re, [a("defs", null, [n[0] ||= a("path", {
			id: "path-1",
			opacity: "1",
			"fill-rule": "evenodd",
			d: "M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
		}, null, -1), a("linearGradient", ze, [a("stop", {
			offset: "0",
			"stop-color": e.startColor,
			"stop-opacity": "1"
		}, null, 8, Be), a("stop", {
			offset: "1",
			"stop-color": e.endColor,
			"stop-opacity": "1"
		}, null, 8, Ve)])]), n[1] ||= a("g", { opacity: "1" }, [a("use", {
			"xlink:href": "#path-1",
			fill: "url(#linearGradient-2)",
			"fill-opacity": "1"
		})], -1)]));
	}
}), Ue = { class: "corner-top" }, We = { class: "corner-bottom" }, $ = /*#__PURE__*/ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ l({
	name: "HSignInBackground",
	components: {
		HSignInCornerBottom: Le,
		HSignInCornerTop: He
	},
	__name: "HSignInBackground",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (t, n) => (m(), i("div", null, [a("div", Ue, [c(He, {
			"start-color": e.startColor,
			"end-color": e.endColor
		}, null, 8, ["start-color", "end-color"])]), a("div", We, [c(Le, {
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
var Ge = [
	V,
	U,
	K,
	q,
	J,
	W,
	Z,
	z,
	Y,
	X,
	$,
	G,
	Q
], Ke = { install: (e) => {
	Ge.map((t) => t.install(e));
} };
//#endregion
export { V as HDate, U as HDateTime, K as HDialog, q as HDivider, J as HDownloadProgress, W as HDuration, z as HIconButton, Y as HLabel, Z as HMdiIconSelect, X as HParticles, $ as HSignInBackground, G as HTime, Q as HTreeSelect, Ke as default };

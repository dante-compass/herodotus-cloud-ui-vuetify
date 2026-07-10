import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createSlots as o, createTextVNode as s, createVNode as c, defineComponent as l, mergeModels as u, mergeProps as d, normalizeClass as f, normalizeProps as ee, onBeforeMount as te, onMounted as p, onUnmounted as m, openBlock as h, ref as ne, renderSlot as g, shallowRef as _, toDisplayString as v, unref as y, useModel as b, watch as x, withCtx as S } from "vue";
import { VAutocomplete as C, VBtn as w, VCard as re, VCardActions as ie, VCardText as ae, VCol as T, VContainer as E, VDatePicker as oe, VDialog as se, VDivider as D, VExpandXTransition as ce, VIcon as O, VIconBtn as k, VLabel as le, VListItem as ue, VMenu as A, VMessages as de, VNumberInput as fe, VProgressLinear as j, VRow as M, VSelect as pe, VSnackbar as me, VTextField as N, VTimePicker as he, VTooltip as P, VTreeview as ge } from "vuetify/components";
import { useDate as _e } from "vuetify";
import { moment as F } from "@herodotus/core";
import { tsParticles as ve } from "@tsparticles/engine";
import { loadTrianglesPreset as ye } from "@tsparticles/preset-triangles";
import { debounce as be, find as xe, isArray as Se, isEmpty as I, kebabCase as Ce } from "lodash-es";
import { defineStore as we } from "pinia";
import * as Te from "@mdi/js";
//#endregion
//#region src/HButton/HIconButton.vue
var L = /* @__PURE__ */ l({
	name: "HIconButton",
	components: {
		VTooltip: P,
		VIconBtn: k
	},
	__name: "HIconButton",
	props: {
		color: {},
		tooltip: {},
		location: { default: "bottom" }
	},
	setup(e) {
		return (t, r) => e.tooltip ? (h(), n(y(P), {
			key: 0,
			interactive: "",
			location: e.location
		}, {
			activator: S(({ props: n }) => [c(y(k), d({ color: e.color }, d(n, t.$attrs)), null, 16, ["color"])]),
			default: S(() => [a("span", null, v(e.tooltip), 1)]),
			_: 1
		}, 8, ["location"])) : (h(), n(y(k), ee(d({ key: 1 }, t.$attrs)), null, 16));
	}
});
//#endregion
//#region src/HButton/index.ts
L.install = (e) => {
	e.component(L.name, L);
};
//#endregion
//#region src/HDateTime/HDatePicker.vue
var R = /* @__PURE__ */ l({
	name: "HDatePicker",
	components: {
		VMenu: A,
		VTooltip: P,
		VIcon: O,
		VDatePicker: oe
	},
	__name: "HDatePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let r = b(e, "modelValue"), i = _e(), o = t({
			get: () => r.value ? i.parseISO(r.value) : "",
			set: (e) => {
				e ? r.value = F(e).format("YYYY-MM-DD") : r.value = e;
			}
		});
		return (e, t) => (h(), n(y(A), d({
			"close-on-content-click": !1,
			activator: "parent"
		}, e.$attrs), {
			activator: S(({ props: e }) => [c(y(P), { location: "bottom" }, {
				activator: S(({ props: t }) => [c(y(O), d({ icon: "mdi-calendar" }, d(e, t)), null, 16)]),
				default: S(() => [t[1] ||= a("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: S(() => [c(y(oe), {
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
}), z = /* @__PURE__ */ l({
	name: "HDate",
	components: {
		VTextField: N,
		HDatePicker: R
	},
	__name: "HDate",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = b(e, "modelValue");
		return (e, r) => (h(), n(y(N), d({
			modelValue: t.value,
			"onUpdate:modelValue": r[1] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": S(() => [c(R, {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), B = /* @__PURE__ */ l({
	name: "HTimePicker",
	components: {
		VMenu: A,
		VTooltip: P,
		VIcon: O,
		VTimePicker: he
	},
	__name: "HTimePicker",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = b(e, "modelValue");
		return (e, r) => (h(), n(y(A), d({
			"close-on-content-click": !1,
			activator: "parent",
			"min-width": "0"
		}, e.$attrs), {
			activator: S(({ props: e }) => [c(y(P), { location: "bottom" }, {
				activator: S(({ props: t }) => [c(y(O), d({ icon: "mdi-clock-time-four-outline" }, d(e, t)), null, 16)]),
				default: S(() => [r[1] ||= a("span", null, "点击设置日期", -1)]),
				_: 2
			}, 1024)]),
			default: S(() => [c(y(he), {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e,
				"use-seconds": "",
				format: "24hr"
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16));
	}
}), V = /* @__PURE__ */ l({
	name: "HDateTime",
	components: {
		VTextField: N,
		HDatePicker: R,
		HTimePicker: B
	},
	__name: "HDateTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = b(e, "modelValue"), r = _(""), i = _(""), a = (e, t) => F(`${e && e.trim() !== "" ? e : "1970-01-01"} ${t && t.trim() !== "" ? t : "00:00:00"}`).format("YYYY-MM-DD HH:mm:ss");
		return x(t, (e) => {
			if (e) {
				let t = F(e);
				i.value = t.format("YYYY-MM-DD"), r.value = t.format("HH:mm:ss");
			}
		}), x([i, r], ([e, n]) => {
			t.value = a(e, n);
		}), (e, a) => (h(), n(y(N), d({
			modelValue: t.value,
			"onUpdate:modelValue": a[2] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": S(() => [c(R, {
				modelValue: i.value,
				"onUpdate:modelValue": a[0] ||= (e) => i.value = e
			}, null, 8, ["modelValue"])]),
			"append-inner": S(() => [c(B, {
				modelValue: r.value,
				"onUpdate:modelValue": a[1] ||= (e) => r.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
}), Ee = [
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
], H = /* @__PURE__ */ l({
	name: "HDuration",
	components: {
		VContainer: E,
		VRow: M,
		VCol: T,
		VNumberInput: fe,
		VSelect: pe
	},
	__name: "HDuration",
	props: {
		modelValue: { required: !0 },
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = b(e, "modelValue"), r = _(0), i = _(), a = _(Ee), o = (e) => {
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
		return x(() => t.value, (e) => {
			e && o(e);
		}, { immediate: !0 }), x(i, (e) => {
			e && s(r.value, e);
		}), x(r, (e) => {
			e && s(e, i.value);
		}), (e, t) => (h(), n(y(E), { class: "pa-0" }, {
			default: S(() => [c(y(M), null, {
				default: S(() => [c(y(T), null, {
					default: S(() => [c(y(fe), {
						modelValue: r.value,
						"onUpdate:modelValue": t[0] ||= (e) => r.value = e,
						label: "数值",
						placeholder: "请输入数值",
						"control-variant": "split",
						inset: ""
					}, null, 8, ["modelValue"])]),
					_: 1
				}), c(y(T), null, {
					default: S(() => [c(y(pe), {
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
}), U = /* @__PURE__ */ l({
	name: "HTime",
	components: {
		VTextField: N,
		HTimePicker: B
	},
	__name: "HTime",
	props: {
		modelValue: {},
		modelModifiers: {}
	},
	emits: ["update:modelValue"],
	setup(e) {
		let t = b(e, "modelValue");
		return (e, r) => (h(), n(y(N), d({
			modelValue: t.value,
			"onUpdate:modelValue": r[1] ||= (e) => t.value = e,
			glow: ""
		}, e.$attrs), {
			"prepend-inner": S(() => [c(B, {
				modelValue: t.value,
				"onUpdate:modelValue": r[0] ||= (e) => t.value = e
			}, null, 8, ["modelValue"])]),
			_: 1
		}, 16, ["modelValue"]));
	}
});
z.install = (e) => {
	e.component(z.name, z);
}, V.install = (e) => {
	e.component(V.name, V);
}, H.install = (e) => {
	e.component(H.name, H);
}, U.install = (e) => {
	e.component(U.name, U);
};
//#endregion
//#region src/HDialog/HDialog.vue
var W = /* @__PURE__ */ l({
	name: "HDialog",
	components: {
		VDialog: se,
		HIconButton: L
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
		let i = t, a = b(e, "modelValue"), s = () => {
			a.value = !1, i("close");
		}, l = () => {
			a.value = !1, i("cancel");
		}, u = () => {
			i("confirm");
		};
		return (t, i) => (h(), n(y(se), {
			modelValue: a.value,
			"onUpdate:modelValue": i[0] ||= (e) => a.value = e,
			"max-width": e.maxWidth,
			persistent: ""
		}, {
			default: S(() => [c(y(re), d({
				disabled: e.loading,
				loading: e.loading
			}, t.$attrs), o({
				loader: S(({ isActive: e }) => [c(y(j), {
					active: e,
					height: "4",
					indeterminate: ""
				}, null, 8, ["active"])]),
				default: S(() => [
					c(y(D)),
					c(y(ae), { class: "pb-2" }, {
						default: S(() => [g(t.$slots, "default")]),
						_: 3
					}),
					e.hideActions ? r("", !0) : (h(), n(y(ie), { key: 0 }, {
						default: S(() => [c(y(w), {
							text: "取消",
							color: "red",
							onClick: l
						}), c(y(w), {
							text: e.confirmLabel,
							onClick: u
						}, null, 8, ["text"])]),
						_: 1
					}))
				]),
				_: 2
			}, [e.closed ? {
				name: "append",
				fn: S(() => [c(y(L), {
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
W.install = (e) => {
	e.component(W.name, W);
};
//#endregion
//#region src/HDivider/HDivider.vue?vue&type=script&setup=true&lang.ts
var De = { class: "d-flex flex-column gr-4 py-4" }, G = /* @__PURE__ */ l({
	name: "HDivider",
	components: { VDivider: D },
	__name: "HDivider",
	props: { label: {} },
	setup(t) {
		return (n, r) => (h(), i("div", De, [c(y(D), d({ opacity: ".7" }, n.$attrs), {
			default: S(() => [t.label ? (h(), i(e, { key: 0 }, [s(v(t.label), 1)], 64)) : g(n.$slots, "default", { key: 1 })]),
			_: 3
		}, 16)]));
	}
});
//#endregion
//#region src/HDivider/index.ts
G.install = (e) => {
	e.component(G.name, G);
};
//#endregion
//#region src/HProgress/HDownloadProgress.vue
var K = /* @__PURE__ */ l({
	name: "HDownloadProgress",
	components: {
		VSnackbar: me,
		VContainer: E,
		VRow: M,
		VCol: T,
		VProgressLinear: j
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
		let t = b(e, "modelValue");
		return (r, i) => (h(), n(y(me), d({
			modelValue: t.value,
			"onUpdate:modelValue": i[0] ||= (e) => t.value = e,
			timeout: 2e3,
			location: "center center",
			color: "primary"
		}, r.$attrs), {
			default: S(() => [c(y(E), null, {
				default: S(() => [c(y(M), {
					"align-content": "center",
					justify: "center"
				}, {
					default: S(() => [c(y(T), {
						class: "text-subtitle-1 text-center",
						cols: "12"
					}, {
						default: S(() => [s("文件下载 " + v(`${e.progress}%`), 1)]),
						_: 1
					}), c(y(T), { cols: "6" }, {
						default: S(() => [c(y(j), {
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
K.install = (e) => {
	e.component(K.name, K);
};
//#endregion
//#region src/HLabel/HLabel.vue?vue&type=script&setup=true&lang.ts
var Oe = { class: "flex-1-1-0" }, ke = { class: "d-flex" }, Ae = {
	key: 0,
	class: "d-flex align-self-center mr-1"
}, je = {
	key: 1,
	class: "d-flex align-self-center"
}, q = /* @__PURE__ */ l({
	name: "HLabel",
	components: {
		VIcon: O,
		VBtn: w,
		VTooltip: P,
		VLabel: le,
		VMessages: de
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
		return (t, o) => (h(), i("div", { class: f(["d-flex w-100", { "mb-3": !e.hideDetails }]) }, [a("div", Oe, [a("div", ke, [
			e.required ? (h(), i("div", Ae, [c(y(O), {
				size: "x-small",
				icon: "mdi-star",
				color: "red"
			})])) : r("", !0),
			c(y(le), {
				text: e.text,
				class: "font-weight-medium"
			}, {
				default: S(() => [g(t.$slots, "text")]),
				_: 3
			}, 8, ["text"]),
			e.tooltip ? (h(), i("div", je, [c(y(P), { location: "bottom" }, {
				activator: S(({ props: e }) => [c(y(O), d({
					size: "x-small",
					icon: "mdi-progress-question",
					color: "grey"
				}, e), null, 16)]),
				default: S(() => [o[0] ||= a("span", null, "点击设置日期", -1)]),
				_: 1
			})])) : r("", !0)
		]), s.value ? (h(), n(y(de), {
			key: 0,
			messages: e.message,
			active: s.value
		}, null, 8, ["messages", "active"])) : r("", !0)])], 2));
	}
});
//#endregion
//#region src/HLabel/index.ts
q.install = (e) => {
	e.component(q.name, q);
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
} }, Ne = ["id"], J = /* @__PURE__ */ l({
	name: "HParticles",
	__name: "HParticles",
	setup(e) {
		let t = _("HParticles"), n, r = async () => {
			await ye(ve);
		}, a = async () => {
			n?.destroy(), n = await ve.load({
				id: t.value,
				options: Me
			});
		}, o = async () => {
			n?.destroy();
		};
		return te(() => {
			r();
		}), p(() => {
			a();
		}), m(() => {
			o();
		}), (e, n) => (h(), i("div", { id: t.value }, [g(e.$slots, "default")], 8, Ne));
	}
});
//#endregion
//#region src/HParticles/index.ts
J.install = (e) => {
	e.component(J.name, J);
};
//#endregion
//#region src/lib/stores/mdiicon.ts
var Pe = we("MdiIcon", {
	state: () => ({ icons: [] }),
	getters: { getAllIcons: (e) => e.icons },
	actions: {
		initialize() {
			if (I(this.icons)) {
				let e = Object.keys(Te).map((e) => Ce(e));
				this.icons = e;
			}
		},
		search(e) {
			if (I(e.trim())) return this.icons;
			let t = e.toLowerCase();
			return this.getAllIcons.filter((e) => e.toLowerCase().match(t));
		}
	}
}), Y = /* @__PURE__ */ l({
	name: "HMdiIconSelect",
	components: {
		VAutocomplete: C,
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
		let t = b(e, "modelValue"), i = _([]), a = _(!1), o = _(""), s = Pe(), l = be((e, t) => {
			a.value = !0, t(s.search(e)), a.value = !1;
		}, 500);
		return p(() => {
			a.value = !0, s.initialize(), i.value = s.getAllIcons, a.value = !1;
		}), x(o, (e) => {
			I(e) ? i.value = s.getAllIcons : l(e, (e) => {
				i.value = e;
			});
		}), (e, s) => (h(), n(y(C), d({
			modelValue: t.value,
			"onUpdate:modelValue": s[0] ||= (e) => t.value = e,
			search: o.value,
			"onUpdate:search": s[1] ||= (e) => o.value = e,
			items: i.value,
			loading: a.value,
			clearable: "",
			"single-line": ""
		}, e.$attrs), {
			"prepend-inner": S(() => [c(y(ce), null, {
				default: S(() => [t.value ? (h(), n(y(O), {
					key: 0,
					icon: t.value,
					start: ""
				}, null, 8, ["icon"])) : r("", !0)]),
				_: 1
			})]),
			item: S(({ props: e, internalItem: t }) => [c(y(ue), d(e, {
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
}), X = /* @__PURE__ */ l({
	name: "HTreeSelect",
	components: {
		VMenu: A,
		VIcon: O,
		VTreeview: ge,
		VTextField: N
	},
	__name: "HTreeSelect",
	props: /*@__PURE__*/ u({ items: {} }, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let r = e, i = b(e, "modelValue"), a = ne(), o = _(!1), s = _(!1), l = ne([]), u = _(""), f = () => {
			o.value = !0;
		}, ee = (e) => {
			o.value = !o.value;
		}, te = () => {
			s.value && a.value?.focus();
		}, p = () => {}, m = (e) => {
			let t = [];
			for (let n of e) {
				let { children: e, ...r } = n;
				e && e.length && (t = t.concat(m(e))), t.push(r);
			}
			return t;
		}, g = (e) => {
			let t = xe(l.value, (t) => t.id == e);
			t && (u.value = t.name);
		}, v = (e) => {
			!I(e) && I(l.value) && (l.value = m(e), !u.value && i.value && g(i.value));
		}, C = t({
			get: () => i.value ? [i.value] : [],
			set: (e) => {
				e && Se(e) && e.length > 0 ? i.value = e[0] : i.value = "";
			}
		});
		return x(() => r.items, (e) => {
			I(e) || v(e);
		}, { immediate: !0 }), x(i, (e, t) => {
			e && (g(e), o.value &&= !1);
		}, { immediate: !0 }), x(s, (e, t) => {
			e || e === t || (o.value = !1);
		}), (t, r) => (h(), n(y(N), d({
			ref_key: "vTextFieldRef",
			ref: a,
			modelValue: u.value,
			"onUpdate:modelValue": r[3] ||= (e) => u.value = e,
			focused: s.value,
			"onUpdate:focused": r[4] ||= (e) => s.value = e,
			class: ["v-combobox", { "v-combobox--active-menu": o.value }],
			"onMousedown:control": f,
			onAfterLeave: te
		}, t.$attrs), {
			"append-inner": S(() => [c(y(O), {
				icon: "mdi-menu-down",
				onMousedown: ee,
				onClick: p,
				class: "v-combobox__menu-icon",
				tabindex: "-1"
			})]),
			default: S(() => [c(y(A), {
				modelValue: o.value,
				"onUpdate:modelValue": r[2] ||= (e) => o.value = e,
				activator: "parent",
				"content-class": "v-combobox__content",
				"open-on-click": !1,
				"close-on-content-click": !1,
				"max-height": "310"
			}, {
				default: S(() => [c(y(ge), {
					activated: C.value,
					"onUpdate:activated": r[0] ||= (e) => C.value = e,
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
Y.install = (e) => {
	e.component(Y.name, Y);
}, X.install = (e) => {
	e.component(X.name, X);
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
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (t, n) => (h(), i("svg", Fe, [a("defs", null, [n[0] ||= a("path", {
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
}, He = ["stop-color"], Ue = ["stop-color"], Z = /* @__PURE__ */ l({
	name: "HSignInCornerTop",
	__name: "HSignInCornerTop",
	props: {
		startColor: {},
		endColor: {}
	},
	setup(e) {
		return (t, n) => (h(), i("svg", Be, [a("defs", null, [n[0] ||= a("path", {
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
}), We = { class: "corner-top" }, Ge = { class: "corner-bottom" }, Q = /*#__PURE__*/ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ l({
	name: "HSignInBackground",
	components: {
		HSignInCornerBottom: ze,
		HSignInCornerTop: Z
	},
	__name: "HSignInBackground",
	props: {
		startColor: { default: "#28aff0" },
		endColor: { default: "#120fc4" }
	},
	setup(e) {
		return (t, n) => (h(), i("div", null, [a("div", We, [c(Z, {
			"start-color": e.startColor,
			"end-color": e.endColor
		}, null, 8, ["start-color", "end-color"])]), a("div", Ge, [c(ze, {
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
var Ke = { class: "d-flex justify-center align-center ga-4" }, qe = { class: "w-33" }, $ = /* @__PURE__ */ l({
	name: "HLabelItem",
	components: { HLabel: q },
	__name: "HLabelItem",
	props: {
		label: {},
		required: {
			type: Boolean,
			default: !1
		},
		justify: { default: "default" }
	},
	setup(e) {
		let t = e, n = () => t.justify === "end";
		return (t, r) => (h(), i("div", Ke, [
			c(y(q), {
				text: e.label,
				required: e.required,
				"hide-details": "",
				class: f(["d-flex", { "justify-end": n }]),
				style: { width: "100px" }
			}, null, 8, [
				"text",
				"required",
				"class"
			]),
			a("div", qe, [g(t.$slots, "default")]),
			a("div", null, [g(t.$slots, "append")])
		]));
	}
});
//#endregion
//#region src/HItem/index.ts
$.install = (e) => {
	e.component($.name, $);
};
//#endregion
//#region src/index.ts
var Je = [
	z,
	V,
	W,
	G,
	K,
	H,
	Y,
	L,
	q,
	$,
	J,
	Q,
	U,
	X
], Ye = { install: (e) => {
	Je.map((t) => t.install(e));
} };
//#endregion
export { z as HDate, V as HDateTime, W as HDialog, G as HDivider, K as HDownloadProgress, H as HDuration, L as HIconButton, q as HLabel, $ as HLabelItem, Y as HMdiIconSelect, J as HParticles, Q as HSignInBackground, U as HTime, X as HTreeSelect, Ye as default };

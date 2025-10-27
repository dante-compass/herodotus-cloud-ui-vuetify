import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withCtx, createElementBlock, createCommentVNode, Fragment, createTextVNode, toDisplayString, createElementVNode, renderSlot, createVNode } from "vue";
import { VIcon, VBtn, VTooltip, VMessages, VLabel } from "vuetify/components";
import { isEmpty } from "lodash-es";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{ name: "HButton", components: { VBtn, VIcon } },
  __name: "HButton",
  props: {
    label: {},
    icon: {},
    tooltip: {},
    color: {},
    location: { default: "bottom" }
  },
  setup(__props) {
    const props = __props;
    const isIcon = computed(() => {
      return !isEmpty(props.icon);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VBtn), mergeProps({ icon: isIcon.value }, _ctx.$attrs), {
        default: withCtx(() => [
          !__props.icon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(toDisplayString(__props.label), 1)
          ], 64)) : (openBlock(), createBlock(unref(VIcon), {
            key: 1,
            color: __props.color ? __props.color : void 0,
            icon: __props.icon
          }, null, 8, ["color", "icon"])),
          __props.tooltip ? (openBlock(), createBlock(unref(VTooltip), {
            key: 2,
            location: __props.location,
            activator: "parent"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(__props.tooltip), 1)
            ]),
            _: 1
          }, 8, ["location"])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 16, ["icon"]);
    };
  }
});
_sfc_main$4.install = (app) => {
  app.component(_sfc_main$4.name, _sfc_main$4);
};
const _hoisted_1$3 = { class: "d-flex mb-3 w-100" };
const _hoisted_2$3 = { class: "flex-1-1-0" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{ name: "HSettingLabel", components: { VLabel, VMessages } },
  __name: "HSettingLabel",
  props: {
    title: {},
    text: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createElementVNode("div", _hoisted_2$3, [
          createVNode(unref(VLabel), {
            text: __props.title,
            class: "mb-1 font-weight-medium"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "title")
            ]),
            _: 3
          }, 8, ["text"]),
          createVNode(unref(VMessages), {
            messages: __props.text,
            active: ""
          }, null, 8, ["messages"])
        ]),
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
_sfc_main$3.install = (app) => {
  app.component(_sfc_main$3.name, _sfc_main$3);
};
const _hoisted_1$2 = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  height: "896",
  width: "967.8852157128662"
};
const _hoisted_2$2 = {
  id: "linearGradient-3",
  x1: "0.5",
  y1: "0",
  x2: "0.5",
  y2: "1"
};
const _hoisted_3$1 = ["stop-color"];
const _hoisted_4$1 = ["stop-color"];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{ name: "HSignInCornerBottom" },
  __name: "HSignInCornerBottom",
  props: {
    startColor: { default: "#28aff0" },
    endColor: { default: "#120fc4" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", _hoisted_1$2, [
        createElementVNode("defs", null, [
          _cache[0] || (_cache[0] = createElementVNode("path", {
            id: "path-2",
            opacity: "1",
            "fill-rule": "evenodd",
            d: "M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896\n			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806\n			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
          }, null, -1)),
          createElementVNode("linearGradient", _hoisted_2$2, [
            createElementVNode("stop", {
              offset: "0",
              "stop-color": __props.startColor,
              "stop-opacity": "1"
            }, null, 8, _hoisted_3$1),
            createElementVNode("stop", {
              offset: "1",
              "stop-color": __props.endColor,
              "stop-opacity": "1"
            }, null, 8, _hoisted_4$1)
          ])
        ]),
        _cache[1] || (_cache[1] = createElementVNode("g", { opacity: "1" }, [
          createElementVNode("use", {
            "xlink:href": "#path-2",
            fill: "url(#linearGradient-3)",
            "fill-opacity": "1"
          })
        ], -1))
      ]);
    };
  }
});
const _hoisted_1$1 = {
  height: "1337",
  width: "1337"
};
const _hoisted_2$1 = {
  id: "linearGradient-2",
  x1: "0.79",
  y1: "0.62",
  x2: "0.21",
  y2: "0.86"
};
const _hoisted_3 = ["stop-color"];
const _hoisted_4 = ["stop-color"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{ name: "HSignInCornerTop" },
  __name: "HSignInCornerTop",
  props: {
    startColor: { default: "#28aff0" },
    endColor: { default: "#120fc4" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", _hoisted_1$1, [
        createElementVNode("defs", null, [
          _cache[0] || (_cache[0] = createElementVNode("path", {
            id: "path-1",
            opacity: "1",
            "fill-rule": "evenodd",
            d: "M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z"
          }, null, -1)),
          createElementVNode("linearGradient", _hoisted_2$1, [
            createElementVNode("stop", {
              offset: "0",
              "stop-color": __props.startColor,
              "stop-opacity": "1"
            }, null, 8, _hoisted_3),
            createElementVNode("stop", {
              offset: "1",
              "stop-color": __props.endColor,
              "stop-opacity": "1"
            }, null, 8, _hoisted_4)
          ])
        ]),
        _cache[1] || (_cache[1] = createElementVNode("g", { opacity: "1" }, [
          createElementVNode("use", {
            "xlink:href": "#path-1",
            fill: "url(#linearGradient-2)",
            "fill-opacity": "1"
          })
        ], -1))
      ]);
    };
  }
});
const _hoisted_1 = { class: "corner-top" };
const _hoisted_2 = { class: "corner-bottom" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "HSignInCornerBottom",
    components: {
      HSignInCornerBottom: _sfc_main$2,
      HSignInCornerTop: _sfc_main$1
    }
  },
  __name: "HSignInBackground",
  props: {
    startColor: {},
    endColor: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createElementVNode("div", _hoisted_1, [
          createVNode(_sfc_main$1, {
            "start-color": __props.startColor,
            "end-color": __props.endColor
          }, null, 8, ["start-color", "end-color"])
        ]),
        createElementVNode("div", _hoisted_2, [
          createVNode(_sfc_main$2, {
            "start-color": __props.endColor,
            "end-color": __props.startColor
          }, null, 8, ["start-color", "end-color"])
        ])
      ]);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const HSignInBackground = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8c294390"]]);
HSignInBackground.install = (app) => {
  app.component(HSignInBackground.name, HSignInBackground);
};
const components = [_sfc_main$4, _sfc_main$3, HSignInBackground];
const install = (app) => {
  components.map((component) => component.install(app));
};
const index = {
  install
};
export {
  _sfc_main$4 as HButton,
  _sfc_main$3 as HSettingLabel,
  HSignInBackground,
  index as default
};

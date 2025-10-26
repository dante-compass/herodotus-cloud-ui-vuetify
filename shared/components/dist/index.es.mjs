import { defineComponent, computed, createBlock, openBlock, unref, mergeProps, withCtx, createElementBlock, createCommentVNode, Fragment, createTextVNode, toDisplayString } from "vue";
import { VIcon, VBtn, VTooltip } from "vuetify/components";
import { isEmpty } from "lodash-es";
const _sfc_main = /* @__PURE__ */ defineComponent({
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
_sfc_main.install = (app) => {
  app.component(_sfc_main.name, _sfc_main);
};
const components = [_sfc_main];
const install = (app) => {
  components.map((component) => component.install(app));
};
const index = {
  install
};
export {
  _sfc_main as HButton,
  index as default
};

function HerodotusResolver() {
  return {
    type: "component",
    resolve: (name) => {
      if (name.startsWith("H")) {
        const componentName = name;
        const from = `@herodotus/components`;
        const sideEffects = ["@herodotus/components/style.css"];
        return {
          name: componentName,
          from,
          sideEffects: sideEffects.length > 0 ? sideEffects : void 0
        };
      }
    }
  };
}
export {
  HerodotusResolver,
  HerodotusResolver as default
};

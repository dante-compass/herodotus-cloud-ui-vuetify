//#region src/resolver.ts
var e = [
	"HDate",
	"HDateTime",
	"HDialog",
	"HDivider",
	"HDownloadProgress",
	"HDuration",
	"HMdiIconSelect",
	"HIconButton",
	"HLabel",
	"HParticles",
	"HSignInBackground",
	"HTime",
	"HTreeSelect"
];
function t(t) {
	return e.includes(t);
}
function n() {
	return {
		type: "component",
		resolve: (e) => {
			if (e.startsWith("H") && t(e)) {
				let t = e, n = ["@herodotus/components/style.css"];
				return {
					name: t,
					from: "@herodotus/components",
					sideEffects: n.length > 0 ? n : void 0
				};
			}
		}
	};
}
//#endregion
export { n as HerodotusResolver, n as default };

//#region src/resolver.ts
var e = [
	"HButton",
	"HDate",
	"HDateTime",
	"HDialog",
	"HDownloadProgress",
	"HDuration",
	"HMdiIconSelect",
	"HParticles",
	"HLabel",
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

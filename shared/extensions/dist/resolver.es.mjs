// src/resolver.ts
var e = [
	"HBitsGalaxy",
	"HBitsPrismaticBurst",
	"HBitsThreads",
	"HParticles",
	"HSignInBackground"
];
function t(t) {
	return e.includes(t);
}
function n() {
	return {
		type: "component",
		resolve: (e) => {
			if (e.startsWith("H") && t(e)) {
				let t = e, n = ["@herodotus/extensions/style.css"];
				return {
					name: t,
					from: "@herodotus/extensions",
					sideEffects: n.length > 0 ? n : void 0
				};
			}
		}
	};
}
export { n as HerodotusExtensionResolver, n as default };

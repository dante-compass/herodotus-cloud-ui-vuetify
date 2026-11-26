Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:`Module`}});let e=require("vue"),t=require("ogl"),n=require("@tsparticles/engine"),r=require("@tsparticles/preset-triangles");var i=8,a=4,o=2.2,s=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,c=(0,e.defineComponent)({name:`HBitsGalaxy`,__name:`HBitsGalaxy`,props:{focal:{default:()=>[.5,.5]},rotation:{default:()=>[1,0]},starSpeed:{default:.5},density:{default:1},hueShift:{default:140},disableAnimation:{type:Boolean,default:!1},speed:{default:1},mouseInteraction:{type:Boolean,default:!0},glowIntensity:{default:.3},saturation:{default:0},mouseRepulsion:{type:Boolean,default:!0},repulsionStrength:{default:2},twinkleIntensity:{default:.3},rotationSpeed:{default:.1},autoCenterRepulsion:{default:0},transparent:{type:Boolean,default:!0},lightMode:{type:Boolean,default:!1},starColors:{default:void 0},starSize:{default:1},flareIntensity:{default:1},layers:{default:4},direction:{default:`forward`},clickWarp:{type:Boolean,default:!0},intro:{type:Boolean,default:!0},backgroundColor:{default:void 0},opacity:{default:1},dpr:{default:void 0},className:{default:``},style:{default:void 0}},setup(t){let n=`#version 300 es
precision highp float;
precision highp int;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uGloss;
uniform float uDepth;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uStarGlow;
uniform float uFlareGain;
uniform float uSquash;
uniform float uSaturation;
uniform float uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationAngle;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform int uLayers;
uniform vec3 uColors[${a}];
uniform int uColorCount;
uniform float uWarp;
uniform float uReveal;
uniform float uMode;
uniform vec3 uBackground;
uniform float uOpacity;
out vec4 outColor;

#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare, vec2 radial, float invReach) {
#ifdef WARP
  float along = dot(uv, radial);
  float d = sqrt(max(dot(uv, uv) - uSquash * along * along, 0.0));
#else
  float d = length(uv);
#endif
  float m = uStarGlow / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uFlareGain;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uFlareGain;
  m *= smoothstep(1.0, 0.2, d * invReach);
#ifdef WARP
  m *= mix(1.0, smoothstep(1.0, 0.55, length(uv) * invReach), min(uWarp * 4.0, 1.0));
#endif
  return m;
}

vec3 StarLayer(vec2 uv, vec2 radial, vec2 repelAt, float pushCells, float spread) {
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + offset;
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uGloss / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

#ifdef PALETTE
      float pick = Hash21(si + 7.0) * float(uColorCount);
      vec3 base = uColors[int(min(floor(pick), float(uColorCount - 1)))];
#else
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));
#endif

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
      vec2 shift = vec2(0.0);
      float invReach = 1.0;
#ifdef REPEL
      vec2 away = si + 0.5 + pad - repelAt;
      float dist = length(away);
      float q = dist * spread;
      float cells = pushCells * exp(-q * q);
      float moved = cells * inversesqrt(1.0 + cells * cells * 2.78);
      shift = away * (moved / max(dist, 0.0001));
      invReach = 1.0 / (1.0 - moved);
#endif
      float star = Star(gv - offset - pad - shift, flareSize, radial, invReach);
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      col += star * twinkle * size * base;
    }
  }
  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution;
  vec2 uv = (gl_FragCoord.xy - focalPx) / uResolution.y;
  vec2 mouseNorm = uMouse - vec2(0.5);

  vec2 repelAt = vec2(0.0);
  float strength = 0.0;
  float push = 0.0;
  if (uAutoCenterRepulsion > 0.0) {
    strength = uAutoCenterRepulsion;
    push = strength * 0.05;
  } else if (uMouseRepulsion > 0.5) {
    repelAt = (uMouse * uResolution - focalPx) / uResolution.y;
    strength = max(uRepulsionStrength, 0.0);
    push = strength * 0.05 * uMouseActiveFactor;
  } else {
    uv += mouseNorm * 0.1 * uMouseActiveFactor;
  }
  float radius = 0.16 + 0.04 * strength;

  vec2 radial = length(uv) > 0.0001 ? normalize(uv) : vec2(1.0, 0.0);
  float angle = uRotationAngle;
  uv = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
  radial = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * radial;
  radial = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * radial;
  repelAt = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * repelAt;
  repelAt = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * repelAt;

  vec3 col = vec3(0.0);
  float layers = float(uLayers);
  for (int k = 0; k < ${i}; k++) {
    if (k >= uLayers) break;
    float i = float(k) / layers;
    float depth = fract(i + uDepth);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    vec2 offset = vec2(i * 453.32);
    col += StarLayer(uv * scale + offset, radial, repelAt * scale + offset, push * scale, 1.0 / (scale * radius)) * fade;
  }
  col *= uReveal;

  if (uMode > 1.5) {
    vec3 lit = col * smoothstep(0.0, 0.3, length(col));
    float energy = max(max(lit.r, lit.g), lit.b);
    vec3 tint = lit / max(energy, 0.0001);
    vec3 ink = tint * (0.16 / max(dot(tint, vec3(0.2126, 0.7152, 0.0722)), 0.16));
    float coverage = pow(min(energy * 1.3, 1.0), 1.3) * 0.92 * uOpacity;
    outColor = uMode > 2.5 ? vec4(ink * coverage, coverage) : vec4(mix(uBackground, ink, coverage), 1.0);
  } else if (uMode > 0.5) {
    float alpha = min(smoothstep(0.0, 0.3, length(col)), 1.0) * uOpacity;
    outColor = vec4(col * alpha, alpha);
  } else {
    outColor = vec4(mix(uBackground, col, uOpacity), 1.0);
  }
}`,r=(e,t,n)=>Math.min(n,Math.max(t,e)),c=(e,t,n)=>(e?4:0)+(t?2:0)+ +!!n,l=(e,t,r,i)=>{let a=`${t?`#define PALETTE
`:``}${r?`#define REPEL
`:``}${i?`#define WARP
`:``}`,o=e.createProgram(),c=e.createShader(e.VERTEX_SHADER),l=e.createShader(e.FRAGMENT_SHADER);return!o||!c||!l?null:(e.shaderSource(c,s),e.shaderSource(l,n.replace(`
`,`\n${a}`)),e.compileShader(c),e.compileShader(l),e.attachShader(o,c),e.attachShader(o,l),e.bindAttribLocation(o,0,`aPosition`),e.linkProgram(o),e.deleteShader(c),e.deleteShader(l),o)},u=(e,t)=>{if(!e.getProgramParameter(t,e.LINK_STATUS))return null;let n={},r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<r;i++){let r=e.getActiveUniform(t,i);r&&(n[r.name.replace(`[0]`,``)]=e.getUniformLocation(t,r.name))}return{program:t,uniforms:n}},d=t,f=(0,e.ref)(null),p=(0,e.ref)(null),m=null,h=null,g=(0,e.computed)(()=>{let e=Array.isArray(d.starColors)?d.starColors.filter(Boolean).slice(0,a):[];return{focal:Array.isArray(d.focal)?d.focal:[.5,.5],rotation:Array.isArray(d.rotation)?d.rotation:[1,0],starSpeed:d.starSpeed,density:Math.max(.01,d.density),hueShift:d.hueShift,disableAnimation:d.disableAnimation,speed:d.speed,mouseInteraction:d.mouseInteraction,glowIntensity:Math.max(0,d.glowIntensity),saturation:Math.max(0,d.saturation),mouseRepulsion:d.mouseRepulsion,repulsionStrength:d.repulsionStrength,twinkleIntensity:r(d.twinkleIntensity,0,1),rotationSpeed:d.rotationSpeed,autoCenterRepulsion:Math.max(0,d.autoCenterRepulsion),transparent:d.transparent,lightMode:d.lightMode,palette:e,starSize:Math.max(0,d.starSize),flareIntensity:Math.max(0,d.flareIntensity),layers:r(Math.round(d.layers),2,i),reverse:d.direction===`backward`,clickWarp:d.clickWarp,intro:d.intro,backgroundColor:d.backgroundColor,opacity:r(d.opacity,0,1),dpr:d.dpr}});return(0,e.watch)(g,()=>{m?.()}),(0,e.onMounted)(()=>{let e=f.value,t=p.value,n=t?.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!e||!t||!n)return;let i=n.getExtension(`KHR_parallel_shader_compile`),a=new Map,s=(e,t,r)=>{let i=c(e,t,r),o=a.get(i);return o||(o={program:l(n,e,t,r),linked:null,done:!1},a.set(i,o)),o},d=(e,t,r,a)=>{let o=s(e,t,r);if(!o.done&&o.program){if(!a&&i&&!n.getProgramParameter(o.program,i.COMPLETION_STATUS_KHR))return null;o.linked=u(n,o.program),o.done=!0}return o.linked},_=g.value;if(!d(_.palette.length>0,!1,!1,!0)){a.forEach(e=>e.program&&n.deleteProgram(e.program));return}let v=n.createBuffer(),y=n.createVertexArray();n.bindVertexArray(y),n.bindBuffer(n.ARRAY_BUFFER,v),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW),n.enableVertexAttribArray(0),n.vertexAttribPointer(0,2,n.FLOAT,!1,0,0);let b=document.createElement(`canvas`).getContext(`2d`,{willReadFrequently:!0}),x=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1,S=new Map,C=(e,t)=>{if(!e)return t;let n=String(e),r=S.get(n);if(r)return r;let i=t;if(b){b.clearRect(0,0,1,1),b.fillStyle=`#000000`,b.fillStyle=n,b.fillRect(0,0,1,1);let[e,t,r]=b.getImageData(0,0,1,1).data;i=[e/255,t/255,r/255]}return S.set(n,i),i},w=new Float32Array(12),T={x:.5,y:.5,inside:!1},E={time:0,gloss:0,depth:0,angle:0,mx:.5,my:.5,active:0,boost:0,reveal:g.value.intro&&!x?0:1},D=0,O=0,k=!0,A=()=>{let e=g.value;e.palette.forEach((e,t)=>w.set(C(e,[1,1,1]),t*3));let r=e.lightMode?e.transparent?3:2:+!!e.transparent,i=C(e.backgroundColor,e.lightMode?[1,1,1]:[0,0,0]),a=E.reveal,o=e.palette.length>0,s=e.autoCenterRepulsion>0||e.mouseRepulsion&&e.repulsionStrength>0&&E.active>0,c=E.boost>0,l=d(o,!1,!1,!0);if(!l)return;let u=(s||c?d(o,s,c,!1):null)??l,f=u.uniforms;n.viewport(0,0,t.width,t.height),n.useProgram(u.program),n.bindVertexArray(y),n.uniform1f(f.uTime,E.time),n.uniform2f(f.uResolution,t.width,t.height),n.uniform2f(f.uFocal,e.focal[0],e.focal[1]),n.uniform2f(f.uRotation,e.rotation[0],e.rotation[1]),n.uniform1f(f.uGloss,E.gloss),n.uniform1f(f.uDepth,E.depth),n.uniform1f(f.uDensity,e.density),n.uniform1f(f.uHueShift,e.hueShift),n.uniform1f(f.uSpeed,e.speed),n.uniform2f(f.uMouse,E.mx,E.my);let p=1+E.boost*5;n.uniform1f(f.uStarGlow,.05*e.glowIntensity*e.starSize/p**.6),n.uniform1f(f.uFlareGain,e.glowIntensity*e.flareIntensity),n.uniform1f(f.uSquash,1-1/(p*p)),n.uniform1f(f.uSaturation,e.saturation),n.uniform1f(f.uMouseRepulsion,+!!e.mouseRepulsion),n.uniform1f(f.uTwinkleIntensity,e.twinkleIntensity),n.uniform1f(f.uRotationAngle,E.angle),n.uniform1f(f.uRepulsionStrength,e.repulsionStrength),n.uniform1f(f.uMouseActiveFactor,E.active),n.uniform1f(f.uAutoCenterRepulsion,e.autoCenterRepulsion),n.uniform1i(f.uLayers,e.layers),n.uniform3fv(f.uColors,w),n.uniform1i(f.uColorCount,e.palette.length),n.uniform1f(f.uWarp,E.boost);let m=Math.min(1,a/.35);n.uniform1f(f.uReveal,m*m*(3-2*m)),n.uniform1f(f.uMode,r),n.uniform3fv(f.uBackground,i),n.uniform1f(f.uOpacity,e.opacity),n.drawArrays(n.TRIANGLES,0,3)},j=e=>{if(D=0,!k||document.hidden)return;let t=g.value,n=O?r((e-O)/1e3,5e-4,.05):1/60;O=e;let i=t.disableAnimation||x?0:1;t.intro&&!x&&E.reveal<1?(E.reveal=Math.min(1,E.reveal+n/o),E.boost=Math.max(E.boost,(1-E.reveal)**2*1.4)):(!t.intro||x)&&(E.reveal=1);let a=t.starSpeed/10*(t.reverse?-1:1);E.time+=n*i,E.gloss+=n*a*i,E.depth+=n*a*t.speed*i*(1+E.boost*14),E.angle+=n*t.rotationSpeed*i,E.boost*=Math.exp(-n*1.3),E.boost<.001&&(E.boost=0);let s=1-Math.exp(-n/.325),c=t.mouseInteraction&&T.inside&&!x;c&&(E.mx+=(T.x-E.mx)*s,E.my+=(T.y-E.my)*s);let l=+!!c;E.active+=(l-E.active)*s,Math.abs(l-E.active)<.001&&(E.active=l),A(),i>0||E.boost>0||E.active!==l||E.reveal<1?D=requestAnimationFrame(j):O=0},M=()=>{!D&&k&&!document.hidden&&(D=requestAnimationFrame(j))},N=()=>{let n=g.value,r=Math.max(1,e.clientWidth),i=Math.max(1,e.clientHeight),a=Math.min(n.dpr||window.devicePixelRatio||1,2);t.width=Math.max(1,Math.round(r*a)),t.height=Math.max(1,Math.round(i*a)),A(),M()},P=t=>{let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top;T.inside=r>=0&&i>=0&&r<=n.width&&i<=n.height,T.x=r/Math.max(1,n.width),T.y=1-i/Math.max(1,n.height)},F=e=>{P(e),M()},I=e=>{let t=g.value;P(e),T.inside&&t.clickWarp&&!x&&(E.boost=Math.min(1.6,E.boost+1),M())},L=e=>{e.pointerType!==`mouse`&&(T.inside=!1)},R=()=>{T.inside=!1},z=()=>{O=0,M()},B=new ResizeObserver(N);B.observe(e);let V=new IntersectionObserver(e=>{k=e.some(e=>e.isIntersecting),k&&(O=0,M())});V.observe(e),window.addEventListener(`pointermove`,F,{passive:!0}),window.addEventListener(`pointerdown`,I,{passive:!0}),window.addEventListener(`pointerup`,L,{passive:!0}),window.addEventListener(`pointercancel`,L,{passive:!0}),document.documentElement.addEventListener(`pointerleave`,R),document.addEventListener(`visibilitychange`,z),N();let H=_.autoCenterRepulsion>0||_.mouseInteraction&&_.mouseRepulsion,U=_.palette.length>0;(_.clickWarp||_.intro)&&s(U,!1,!0),H&&s(U,!0,!1),H&&_.clickWarp&&s(U,!0,!0);let W=g.value.dpr;m=()=>{let e=g.value;e.dpr===W?(D||A(),M()):(W=e.dpr,N())},h=()=>{cancelAnimationFrame(D),m=null,B.disconnect(),V.disconnect(),window.removeEventListener(`pointermove`,F),window.removeEventListener(`pointerdown`,I),window.removeEventListener(`pointerup`,L),window.removeEventListener(`pointercancel`,L),document.documentElement.removeEventListener(`pointerleave`,R),document.removeEventListener(`visibilitychange`,z),a.forEach(e=>e.program&&n.deleteProgram(e.program)),n.deleteBuffer(v),n.deleteVertexArray(y),t.isConnected||n.getExtension(`WEBGL_lose_context`)?.loseContext()}}),(0,e.onUnmounted)(()=>{h?.(),h=null}),(n,r)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,{ref_key:`containerRef`,ref:f,class:(0,e.normalizeClass)([`galaxy-container`,t.className].filter(Boolean).join(` `)),style:(0,e.normalizeStyle)(t.style)},[(0,e.createElementVNode)(`canvas`,{ref_key:`canvasRef`,ref:p,class:`galaxy-canvas`,"aria-hidden":`true`},null,512)],6))}}),l=2400,u=5,d=2.6,f=7.5,p=.56,m=24,h=`#version 300 es
precision highp float;
`,g=(0,e.defineComponent)({name:`HBitsGhostFibers`,__name:`HBitsGhostFibers`,props:{glowColor:{default:`#42b883`},lineColor:{default:void 0},secondaryColor:{default:void 0},gradient:{default:`depth`},speed:{default:.5},scale:{default:1},rotation:{default:18},rollSpeed:{default:.15},layers:{default:3},waves:{default:1},twist:{default:1.2},threads:{default:72},volume:{default:.7},spread:{default:1},density:{default:1},thickness:{default:1},flow:{default:.4},fiberStyle:{default:`dots`},tips:{default:0},foldGlow:{default:1},perspective:{default:.65},depthOfField:{default:.85},focusDepth:{default:0},particles:{default:.5},sparkle:{default:.5},glow:{default:.8},brightness:{default:1},vignette:{default:.3},grain:{default:.06},mouseInteraction:{type:Boolean,default:!0},hoverEffect:{default:`focus`},mouseStrength:{default:1},pulseOnClick:{type:Boolean,default:!0},intro:{type:Boolean,default:!0},lightMode:{type:Boolean,default:!1},paused:{type:Boolean,default:!1},dpr:{default:void 0},className:{default:``}},setup(t){let n={focus:0,part:1,none:2},r={dots:0,dashes:.45,lines:1},i={depth:0,along:1,across:2},a=[0,.75,.35],o=[[0,0,0,0],[1.9,-4.6,-.08,2.4],[-1.05,2,.12,4.1]],s=[1,.5,.55],c=Math.PI/180,g=1/(2*Math.tan(p/2)),_=`${h}
${`
uniform float uTime;
uniform float uTwist;
uniform float uRoll;
uniform float uWaves;
uniform float uWidth;
uniform float uRibbon;
uniform mat3 uOrient;
uniform float uScale;
uniform vec4 uPlace;
uniform float uVolume;

float hash11(float n) {
  return fract(sin(n * 91.3458) * 47453.5453);
}

vec3 centerLocal(float s) {
  float t = uTime;
  float ph = uPlace.w;
  float x = s * ${m.toFixed(1)};
  float y = uWaves * (0.52 * sin(x * 0.43 + t * 0.31 + ph) + 0.26 * sin(x * 0.79 - t * 0.23 + 1.3 + ph * 0.7)) + uPlace.x + x * uPlace.z;
  float z = uWaves * 0.65 * sin(x * 0.33 + t * 0.19 + 0.7 + ph * 1.3) + uPlace.y;
  return vec3(x, y, z);
}

float twistAt(float s, float layer) {
  float x = s * ${m.toFixed(1)};
  return uTwist * 0.483 * x + uRoll + uPlace.w * 0.6 + layer * uVolume * 0.42 + 0.5 * sin(x * 0.26 + uTime * 0.27 + uPlace.w);
}

vec3 ribbonPoint(float s, float v, float n, float layer, out vec3 normal) {
  vec3 c0 = centerLocal(s);
  vec3 c1 = centerLocal(s + 0.004);
  vec3 tangent = normalize(c1 - c0);
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 n0 = normalize(up - tangent * dot(up, tangent));
  vec3 b0 = cross(tangent, n0);
  float th = twistAt(s, layer);
  vec3 across = cos(th) * n0 + sin(th) * b0;
  vec3 sheet = -sin(th) * n0 + cos(th) * b0;
  float halfWidth = uWidth * (0.78 + 0.22 * cos(s * 3.14159));
  vec3 local = c0 + across * v * halfWidth + sheet * (n + layer * uVolume * 0.16) * halfWidth;
  normal = uOrient * sheet;
  return uOrient * (local * uScale);
}
`}
uniform mat4 uViewProj;
uniform vec3 uEye;
uniform vec2 uViewport;
uniform float uDpr;
uniform float uFibers;
uniform float uDots;
uniform float uFlow;
uniform float uSize;
uniform float uFocus;
uniform float uDof;
uniform float uMaxCoc;
uniform float uFocal;
uniform float uIntro;
uniform vec4 uPulse;
uniform vec4 uHover;
uniform float uPart;
uniform float uDotLength;
uniform float uSparkle;
uniform float uDepthSpread;
uniform float uGain;
uniform float uTips;
uniform float uTint;
uniform float uGradient;
uniform float uFold;

out vec2 vLocal;
out float vRadius;
out float vSegment;
out vec3 vLight;
out float vTint;

vec3 project(vec3 world, out float depth) {
  vec4 clip = uViewProj * vec4(world, 1.0);
  depth = clip.w;
  vec2 ndc = clip.xy / clip.w;
  return vec3((ndc * 0.5 + 0.5) * uViewport, clip.w);
}

vec2 part(vec2 px) {
  if (uPart <= 0.0 || uHover.w <= 0.0) return px;
  vec2 away = px - uHover.xy;
  float dist = length(away);
  float radius = uHover.z;
  float push = uPart * uHover.w * radius * 0.55 * exp(-dist * dist / (radius * radius));
  return px + away / max(dist, 1e-3) * push * smoothstep(0.0, radius * 0.25, dist);
}

void main() {
  int perFiber = int(uDots);
  int fiber = gl_InstanceID / perFiber;
  int bead = gl_InstanceID - fiber * perFiber;
  float fi = float(fiber);
  float fk = float(bead);

  float seed = hash11(fi * 1.731 + uRibbon * 17.0);
  float s = fract((fk + uFlow + seed * uDots) / uDots) - 0.5;
  float sNext = s + 1.0 / uDots;
  float layer = mod(fi, 3.0) - 1.0;
  float slot = floor(fi / 3.0);
  float perLayer = max(floor(uFibers / 3.0), 1.0);
  float v = ((slot + 0.5) / perLayer) * 2.0 - 1.0 + (hash11(fi * 3.113 + 4.0) - 0.5) * (1.6 / perLayer) + layer * 0.12 / perLayer;
  float depthOffset = (hash11(fi * 7.919 + 2.0) - 0.5) * uDepthSpread * (0.35 + 6.0 * s * s);

  vec3 normal;
  vec3 world = ribbonPoint(s, v, depthOffset, layer, normal);
  vec3 nextNormal;
  vec3 nextWorld = ribbonPoint(sNext, v, depthOffset, layer, nextNormal);

  float depth;
  vec3 p0 = project(world, depth);
  float nextDepth;
  vec3 p1 = project(nextWorld, nextDepth);
  vec2 px = part(p0.xy);
  vec2 pxNext = part(p1.xy);

  float baseRadius = max(0.5 * uSize * uDpr * uFocal / max(depth, 0.1), 0.45);
  float coc = min(uDof * abs(1.0 - uFocus / max(depth, 0.1)) * uViewport.y * 0.035, uMaxCoc * uDpr);
  float radius = baseRadius + coc;
  float spill = max(10.0 * uDpr, baseRadius);
  float energy = pow(baseRadius / min(radius, spill), 1.25) * pow(min(1.0, spill / radius), 2.0);

  vec3 toEye = normalize(uEye - world);
  float facing = abs(dot(normalize(normal), toEye));
  float focalPx = uViewport.y * ${g.toFixed(5)} / max(depth, 0.1);
  float widthPx = 2.0 * uWidth * uScale * focalPx;
  float stack = (widthPx * facing + 2.0 * baseRadius) / (widthPx + 2.0 * baseRadius);
  float spacingFace = length(nextWorld - world) * focalPx;
  float trail = (length(p1.xy - p0.xy) + 2.0 * baseRadius) / (spacingFace + 2.0 * baseRadius);
  float crowd = sqrt(clamp(stack * trail, 0.002, 1.0));
  float fold = pow(1.0 - facing, 6.0) * uFold;
  float endFade = smoothstep(0.5, 0.4, abs(s)) * smoothstep(1.6, 4.2, depth);
  float tipEnd = mix(0.6, 0.06 + 0.26 * hash11(fi * 9.137 + uPlace.w * 3.0), uTips);
  float tip = exp(-pow((s - tipEnd) / 0.0065, 2.0)) * uTips;
  endFade *= smoothstep(tipEnd + 0.003, tipEnd - 0.001, s);
  float appear = smoothstep(0.0, 0.12, uIntro * 1.3 - (s + 0.5) - seed * 0.12);
  float twinklePhase = hash11(fi * 13.7 + fk * 0.917 + uRibbon * 3.0);
  float twinkle = pow(max(sin(uTime * (1.2 + 2.6 * twinklePhase) * 3.0 + twinklePhase * 61.0), 0.0), 36.0) * uSparkle * (1.0 - 0.85 * uDotLength);
  float pulseGap = abs(s - uPulse.x) - uPulse.y * 0.42;
  float pulse = uPulse.z * exp(-pulseGap * pulseGap / 0.0018) * (abs(uPulse.w - uRibbon) < 0.5 ? 1.0 : 0.35);
  float strength = mix(0.45, 1.0, hash11(fi * 5.37 + 1.0)) * mix(1.0, 0.72, abs(layer) * uVolume);
  float intensity = energy * crowd * strength * endFade * appear * 0.8 * uGain * (1.0 + fold * 7.0 + twinkle * 5.0 + pulse * 4.0 + tip * 7.0);
  float highlight = clamp(fold * 0.55 + twinkle + pulse + tip, 0.0, 1.0);

  vec2 segment = (pxNext - px) * uDotLength;
  float segmentLength = length(segment);
  intensity *= mix(1.0, (2.0 * radius) / (segmentLength + 2.0 * radius) * 1.6, uDotLength);
  vec2 axis = segmentLength > 1e-3 ? segment / segmentLength : vec2(1.0, 0.0);
  vec2 perp = vec2(-axis.y, axis.x);
  vec2 corner = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1.0 : 0.0, gl_VertexID >= 2 ? 1.0 : 0.0);
  float along = mix(-radius, segmentLength + radius, corner.x);
  float across = mix(-radius, radius, corner.y);
  vec2 position = px + axis * along + perp * across;

  vLocal = vec2(along, across);
  vRadius = radius;
  vSegment = segmentLength;
  vLight = vec3(intensity, highlight, coc / max(radius, 1e-3));
  float depthTint = clamp(uTint + smoothstep(uFocus, uFocus + 5.0, depth) * 0.5, 0.0, 1.0);
  vTint = uGradient < 0.5 ? depthTint : uGradient < 1.5 ? smoothstep(-0.42, 0.42, s) : clamp(v * 0.5 + 0.5, 0.0, 1.0);
  if (intensity < 0.0005) position = vec2(-1e4);
  gl_Position = vec4(position / uViewport * 2.0 - 1.0, 0.0, 1.0);
}`,v=`${h}
uniform mat4 uViewProj;
uniform vec2 uViewport;
uniform float uDpr;
uniform float uTime;
uniform float uSize;
uniform float uFocus;
uniform float uDof;
uniform float uMaxCoc;
uniform float uFocal;
uniform float uIntro;
uniform float uSparkle;
uniform float uScale;
uniform float uGradient;
uniform float uGain;

out vec2 vLocal;
out float vRadius;
out float vSegment;
out vec3 vLight;
out float vTint;

float hash11(float n) {
  return fract(sin(n * 91.3458) * 47453.5453);
}

void main() {
  float id = float(gl_InstanceID);
  vec3 seed = vec3(hash11(id * 1.37 + 0.3), hash11(id * 2.91 + 1.7), hash11(id * 4.17 + 2.9));
  vec3 box = vec3(9.0, 5.4, 6.0);
  vec3 p = (seed - 0.5) * box;
  p.z -= 0.6;
  p += 0.18 * vec3(sin(uTime * 0.21 + seed.x * 40.0), sin(uTime * 0.17 + seed.y * 40.0), sin(uTime * 0.13 + seed.z * 40.0));
  p *= mix(1.0, uScale, 0.5);
  vec4 clip = uViewProj * vec4(p, 1.0);
  float depth = clip.w;
  vec2 px = (clip.xy / clip.w * 0.5 + 0.5) * uViewport;
  float size = uSize * mix(0.5, 1.4, hash11(id * 7.7));
  float baseRadius = max(0.5 * size * uDpr * uFocal / max(depth, 0.1), 0.45);
  float coc = min(uDof * abs(1.0 - uFocus / max(depth, 0.1)) * uViewport.y * 0.035, uMaxCoc * uDpr * 1.6);
  float radius = baseRadius + coc;
  float spill = max(10.0 * uDpr, baseRadius);
  float energy = pow(baseRadius / min(radius, spill), 0.9) * pow(min(1.0, spill / radius), 2.0);
  float twinkle = pow(max(sin(uTime * (0.8 + 1.6 * seed.y) * 2.0 + seed.z * 50.0), 0.0), 8.0);
  float intensity = energy * (0.35 + 0.65 * twinkle) * mix(0.4, 1.0, seed.x) * smoothstep(0.3, 1.0, uIntro) * (depth > 0.2 ? 1.0 : 0.0);
  vec2 corner = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1.0 : 0.0, gl_VertexID >= 2 ? 1.0 : 0.0) * 2.0 - 1.0;
  vec2 position = px + corner * radius;
  vLocal = corner * radius;
  vRadius = radius;
  vSegment = 0.0;
  vLight = vec3(intensity * 0.8 * uGain, 0.3 + 0.6 * twinkle * uSparkle, coc / max(radius, 1e-3));
  vTint = uGradient < 0.5 ? 0.45 + 0.55 * seed.y : seed.y;
  gl_Position = vec4(position / uViewport * 2.0 - 1.0, 0.0, 1.0);
}`,y=`${h}
uniform vec3 uGlowColor;
uniform vec3 uLineColor;
uniform vec3 uSecondaryColor;
in vec2 vLocal;
in float vRadius;
in float vSegment;
in vec3 vLight;
in float vTint;
out vec4 outColor;
void main() {
  float along = clamp(vLocal.x, 0.0, vSegment);
  float d = length(vec2(vLocal.x - along, vLocal.y));
  float rho = d / max(vRadius, 1e-3);
  if (rho > 1.0) discard;
  float soft = clamp(2.6 / max(vRadius, 1e-3), 0.14, 1.0);
  float disk = 1.0 - smoothstep(1.0 - soft, 1.0, rho);
  float bokeh = disk * (0.94 + 0.08 * smoothstep(0.55, 0.95, rho));
  float core = exp(-rho * rho * 3.2);
  float shape = mix(core, bokeh, smoothstep(0.25, 0.7, vLight.z));
  vec3 color = mix(mix(uGlowColor, uSecondaryColor, vTint), uLineColor, vLight.y);
  outColor = vec4(color * shape * vLight.x, shape * vLight.x);
}`,b=`${h}
out vec2 vUv;
void main() {
  vec2 p = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`,x=`${h}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
vec3 pick(vec2 uv) {
  vec3 c = texture(uSource, uv).rgb;
  float peak = max(max(c.r, c.g), c.b);
  return c * smoothstep(0.35, 1.2, peak);
}
void main() {
  vec2 o = uTexel;
  vec3 c = pick(vUv + vec2(-o.x, -o.y)) + pick(vUv + vec2(o.x, -o.y)) + pick(vUv + vec2(-o.x, o.y)) + pick(vUv + vec2(o.x, o.y));
  outColor = vec4(c * 0.25, 1.0);
}`,S=`${h}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec2 o = uTexel;
  vec3 c = texture(uSource, vUv).rgb * 4.0;
  c += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb;
  c += texture(uSource, vUv + vec2(o.x, -o.y)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, o.y)).rgb;
  c += texture(uSource, vUv + vec2(o.x, o.y)).rgb;
  outColor = vec4(c / 8.0, 1.0);
}`,C=`${h}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec2 o = uTexel;
  vec3 c = texture(uSource, vUv + vec2(-o.x * 2.0, 0.0)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(0.0, o.y * 2.0)).rgb;
  c += texture(uSource, vUv + vec2(o.x, o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(o.x * 2.0, 0.0)).rgb;
  c += texture(uSource, vUv + vec2(o.x, -o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(0.0, -o.y * 2.0)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb * 2.0;
  outColor = vec4(c / 12.0, 1.0);
}`,w=`${h}
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uGlow;
uniform float uBrightness;
uniform float uLightMode;
uniform float uGrain;
uniform float uVignette;
uniform float uFrame;
uniform vec2 uView;
uniform float uDpr;
in vec2 vUv;
out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float smoother(float x) {
  x = clamp(x, 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

void main() {
  vec4 scene = texture(uScene, vUv);
  vec3 bloom = texture(uBloom, vUv).rgb;
  vec3 light = (scene.rgb + bloom * uGlow) * uBrightness;
  float reach = max(uVignette * 0.3, 1e-4);
  float mask = uVignette > 0.0 ? smoother(vUv.x / reach) * smoother((1.0 - vUv.x) / reach) * smoother(vUv.y / reach) * smoother((1.0 - vUv.y) / reach) : 1.0;
  vec2 cell = floor(vUv * uView / max(uDpr, 1.0));
  float grain = hash(cell + uFrame * 17.31) + hash(cell * 1.31 + uFrame * 3.7 + 9.1) - 1.0;
  if (uLightMode > 0.5) {
    float amount = scene.a * uBrightness;
    float ink = (1.0 - exp(-amount * 1.5)) * mask;
    ink = clamp(ink * (1.0 + grain * uGrain * 2.0), 0.0, 1.0);
    vec3 hue = clamp(scene.rgb / max(scene.a, 1e-4), 0.0, 1.0);
    vec3 tone = hue * mix(1.0, 0.72, clamp(amount * 0.35, 0.0, 1.0));
    outColor = vec4(tone * ink, ink);
    return;
  }
  vec3 color = (1.0 - exp(-light * 1.25)) * mask;
  float peak = max(color.r, max(color.g, color.b));
  color = max(color + grain * uGrain * (0.25 + 0.75 * sqrt(peak)), 0.0);
  outColor = vec4(color, max(color.r, max(color.g, color.b)));
}`,T=`uTime.uTwist.uRoll.uWaves.uWidth.uRibbon.uOrient.uScale.uPlace.uVolume.uViewProj.uEye.uViewport.uDpr.uFibers.uDots.uFlow.uSize.uFocus.uDof.uMaxCoc.uFocal.uIntro.uPulse.uHover.uPart.uDotLength.uSparkle.uDepthSpread.uGain.uTips.uTint.uGradient.uFold.uGlowColor.uLineColor.uSecondaryColor`.split(`.`),E=[`uViewProj`,`uViewport`,`uDpr`,`uTime`,`uSize`,`uFocus`,`uDof`,`uMaxCoc`,`uFocal`,`uIntro`,`uSparkle`,`uScale`,`uGradient`,`uGain`,`uGlowColor`,`uLineColor`,`uSecondaryColor`],D=[`uSource`,`uTexel`],O=[`uScene`,`uBloom`,`uGlow`,`uBrightness`,`uLightMode`,`uGrain`,`uVignette`,`uFrame`,`uView`,`uDpr`],k=(e,t,n)=>Math.min(n,Math.max(t,e)),A=(e,t,n)=>{let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null},j=(e,t,n,r)=>{let i=A(e,e.VERTEX_SHADER,t),a=A(e,e.FRAGMENT_SHADER,n),o=e.createProgram();if(!i||!a||!o)return null;if(e.attachShader(o,i),e.attachShader(o,a),e.linkProgram(o),e.deleteShader(i),e.deleteShader(a),!e.getProgramParameter(o,e.LINK_STATUS))return e.deleteProgram(o),null;let s={};for(let t of r)s[t]=e.getUniformLocation(o,t);return{program:o,uniforms:s}},M=(e,t,n,r)=>{let i=1/Math.tan(e/2),a=1/(n-r);return[i/t,0,0,0,0,i,0,0,0,0,(r+n)*a,-1,0,0,2*r*n*a,0]},N=(e,t)=>{let n=Array(16);for(let r=0;r<4;r+=1)for(let i=0;i<4;i+=1)n[r*4+i]=e[i]*t[r*4]+e[4+i]*t[r*4+1]+e[8+i]*t[r*4+2]+e[12+i]*t[r*4+3];return n},P=(e,t,n)=>{let r=Math.cos(e),i=Math.sin(e),a=Math.cos(t),o=Math.sin(t),s=Math.cos(n),c=Math.sin(n),l=[r,0,-i,0,1,0,i,0,r],u=[1,0,0,0,a,o,0,-o,a],d=[s,c,0,-c,s,0,0,0,1],f=(e,t)=>{let n=Array(9);for(let r=0;r<3;r+=1)for(let i=0;i<3;i+=1)n[r*3+i]=e[i]*t[r*3]+e[3+i]*t[r*3+1]+e[6+i]*t[r*3+2];return n};return f(d,f(u,l))},F=(e,t)=>[e[0]*t[0]+e[3]*t[1]+e[6]*t[2],e[1]*t[0]+e[4]*t[1]+e[7]*t[2],e[2]*t[0]+e[5]*t[1]+e[8]*t[2]],I=t,L=(0,e.ref)(null),R=(0,e.ref)(null),z=null,B,V=(0,e.computed)(()=>({glowColor:String(I.glowColor),lineColor:I.lineColor?String(I.lineColor):``,secondaryColor:I.secondaryColor?String(I.secondaryColor):``,gradient:i[I.gradient]??0,speed:Math.max(0,I.speed),scale:k(I.scale,.3,3),rotation:I.rotation*c,rollSpeed:I.rollSpeed,layers:k(Math.round(I.layers),1,3),waves:Math.max(0,I.waves),twist:Math.max(0,I.twist),threads:k(Math.round(I.threads),6,180),volume:k(I.volume,0,2),spread:k(I.spread,.2,3),density:k(I.density,.2,3),thickness:k(I.thickness,.2,4),flow:I.flow,dotLength:r[I.fiberStyle]??0,tips:k(I.tips,0,1),foldGlow:k(I.foldGlow,0,3),perspective:k(I.perspective,0,1),depthOfField:k(I.depthOfField,0,2),focusDepth:k(I.focusDepth,-1,1),particles:k(I.particles,0,2),sparkle:k(I.sparkle,0,2),glow:Math.max(0,I.glow),brightness:Math.max(0,I.brightness),vignette:k(I.vignette,0,1),grain:Math.max(0,I.grain),mouseInteraction:I.mouseInteraction,hover:n[I.hoverEffect]??0,mouseStrength:Math.max(0,I.mouseStrength),pulseOnClick:I.pulseOnClick,intro:I.intro,lightMode:I.lightMode,paused:I.paused,dpr:I.dpr})),H=()=>{let e=L.value,t=R.value,n=t?.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!e||!t||!n)return;let r=!!n.getExtension(`EXT_color_buffer_float`),i=j(n,_,y,T),c=j(n,v,y,E),h=j(n,b,x,D),g=j(n,b,S,D),A=j(n,b,C,D),I=j(n,b,w,O);if(!i||!c||!h||!g||!A||!I)return;let B=r?n.RGBA16F:n.RGBA8,H=()=>({texture:null,framebuffer:n.createFramebuffer(),width:0,height:0}),U=(e,t,r)=>{if(e.texture&&e.width===t&&e.height===r)return;e.texture&&n.deleteTexture(e.texture);let i=n.createTexture();n.bindTexture(n.TEXTURE_2D,i),n.texStorage2D(n.TEXTURE_2D,1,B,t,r),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.bindFramebuffer(n.FRAMEBUFFER,e.framebuffer),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,i,0),e.texture=i,e.width=t,e.height=r},W=H(),G=Array.from({length:u},H),K=n.createVertexArray(),q=document.createElement(`canvas`);q.width=1,q.height=1;let J=q.getContext(`2d`,{willReadFrequently:!0}),Y=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1,X={time:0,roll:0,flow:0,frame:0,intro:V.value.intro&&!Y?0:d,width:1,height:1,fit:1,colorKey:``,glow:[.26,.72,.51],line:[.79,.92,.86],secondary:[.21,.58,.41],pointer:{x:0,y:0,inside:!1},hover:{x:0,y:0,presence:0,placed:!1},look:{x:0,y:0,vx:0,vy:0},focus:f+V.value.focusDepth*3,pulse:{s:0,age:9,strength:0,ribbon:0},camera:null},Z=0,Q=0,ee=!0,te=!0,ne=(e,t)=>{if(!J||!e)return t;let n=/^[0-9a-f]{3,8}$/i.test(e)?`#${e}`:e;J.clearRect(0,0,1,1),J.fillStyle=`#000000`,J.fillStyle=n,J.fillRect(0,0,1,1);let[r,i,a]=J.getImageData(0,0,1,1).data;return[r/255,i/255,a/255]},re=e=>{let t=`${e.glowColor}|${e.lineColor}|${e.secondaryColor}|${e.lightMode}`;t!==X.colorKey&&(X.colorKey=t,X.glow=ne(e.glowColor,[.26,.72,.51]),X.secondary=e.secondaryColor?ne(e.secondaryColor,X.glow):X.glow.map(e=>e*.8),e.lineColor?X.line=ne(e.lineColor,X.glow):X.line=e.lightMode?X.glow:X.glow.map(e=>e+(1-e)*.72))},ie=(e,t,n,r)=>{let i=o[n],a=i[3],s=e*m;return[s,r*(.52*Math.sin(s*.43+t*.31+a)+.26*Math.sin(s*.79-t*.23+1.3+a*.7))+i[0]+s*i[2],r*.65*Math.sin(s*.33+t*.19+.7+a*1.3)+i[1]]},ae=e=>{let t=X.width/Math.max(X.height,1),n=[0,0,f],r=M(p,t,.1,60),i=[1,0,0,0,0,1,0,0,0,0,1,0,-n[0],-n[1],-n[2],1],a=P(e.perspective*.85+X.look.x*.22,.12-X.look.y*.14,e.rotation);return{eye:n,viewProj:N(r,i),orient:a}},oe=(e,t)=>{let n=e.viewProj,r=n[0]*t[0]+n[4]*t[1]+n[8]*t[2]+n[12],i=n[1]*t[0]+n[5]*t[1]+n[9]*t[2]+n[13],a=n[3]*t[0]+n[7]*t[1]+n[11]*t[2]+n[15];return{x:(r/a*.5+.5)*X.width,y:(.5-i/a*.5)*X.height,depth:a}},se=(e,t,n)=>{let r=X.camera;if(!r)return null;let i=null;for(let a=0;a<e.layers;a+=1)for(let o=0;o<=96;o+=1){let s=o/96-.5,c=ie(s,X.time,a,e.waves).map(t=>t*e.scale*X.fit),l=F(r.orient,c),u=oe(r,l),d=Math.hypot(u.x-t,u.y-n);(!i||d<i.gap)&&(i={gap:d,s,ribbon:a,depth:u.depth})}return i},ce=()=>{let n=V.value,r=Math.max(1,e.clientWidth),i=Math.max(1,e.clientHeight),a=Math.min(n.dpr||window.devicePixelRatio||1,2),o=Math.max(r,i)*a,s=o>l?a*l/o:a,c=Math.max(1,Math.round(r*s)),u=Math.max(1,Math.round(i*s));(t.width!==c||t.height!==u)&&(t.width=c,t.height=u),X.width=r,X.height=i,X.fit=k(r/i/1.5,.6,1),ue()},le=(e,t,r,i)=>{n.bindFramebuffer(n.FRAMEBUFFER,t.framebuffer),n.viewport(0,0,t.width,t.height),n.useProgram(e.program),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,r.texture),n.uniform1i(e.uniforms.uSource,0),n.uniform2f(e.uniforms.uTexel,i[0],i[1]),n.drawArrays(n.TRIANGLES,0,3)},ue=()=>{let e=V.value;re(e);let r=ae(e);X.camera=r;let l=t.height/Math.max(X.height,1),p=e.paused||Y?1:k(X.intro/d,0,1),m=1-(1-p)*(1-p)*(1-p);U(W,t.width,t.height),n.bindVertexArray(K),n.bindFramebuffer(n.FRAMEBUFFER,W.framebuffer),n.viewport(0,0,t.width,t.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.enable(n.BLEND),n.blendFunc(n.ONE,n.ONE);let _=Math.round(260*e.density),v=22*k(Math.sqrt(56e3/(e.threads*_*e.layers)),.45,1),y=Math.max(.8*e.thickness,.45)**2/.64,b=(e.threads/72*e.density*y)**-.75;n.useProgram(i.program);let x=i.uniforms;n.uniform1f(x.uTime,X.time),n.uniform1f(x.uTwist,e.twist),n.uniform1f(x.uRoll,X.roll),n.uniform1f(x.uWaves,e.waves),n.uniform1f(x.uWidth,.62*e.spread),n.uniformMatrix3fv(x.uOrient,!1,r.orient),n.uniform1f(x.uScale,e.scale*X.fit),n.uniformMatrix4fv(x.uViewProj,!1,r.viewProj),n.uniform3f(x.uEye,r.eye[0],r.eye[1],r.eye[2]),n.uniform2f(x.uViewport,t.width,t.height),n.uniform1f(x.uDpr,l),n.uniform1f(x.uFibers,e.threads),n.uniform1f(x.uDots,_),n.uniform1f(x.uFlow,X.flow),n.uniform1f(x.uSize,1.6*e.thickness),n.uniform1f(x.uFocus,X.focus),n.uniform1f(x.uDof,e.depthOfField),n.uniform1f(x.uMaxCoc,v),n.uniform1f(x.uFocal,f),n.uniform1f(x.uIntro,m),n.uniform4f(x.uPulse,X.pulse.s,X.pulse.age,X.pulse.strength,X.pulse.ribbon),n.uniform4f(x.uHover,X.hover.x*l,(X.height-X.hover.y)*l,140*l,X.hover.presence*e.mouseStrength),n.uniform1f(x.uPart,+(e.hover===1)),n.uniform1f(x.uDotLength,e.dotLength),n.uniform1f(x.uSparkle,e.sparkle),n.uniform1f(x.uDepthSpread,.12),n.uniform1f(x.uVolume,e.volume),n.uniform3f(x.uGlowColor,X.glow[0],X.glow[1],X.glow[2]),n.uniform3f(x.uLineColor,X.line[0],X.line[1],X.line[2]),n.uniform3f(x.uSecondaryColor,X.secondary[0],X.secondary[1],X.secondary[2]),n.uniform1f(x.uTips,e.tips),n.uniform1f(x.uGradient,e.gradient),n.uniform1f(x.uFold,e.foldGlow);for(let t=0;t<e.layers;t+=1){let r=o[t];n.uniform1f(x.uRibbon,t),n.uniform4f(x.uPlace,r[0],r[1],r[2],r[3]),n.uniform1f(x.uGain,s[t]*b),n.uniform1f(x.uTint,a[t]),n.drawArraysInstanced(n.TRIANGLE_STRIP,0,4,e.threads*_)}let S=Math.round(420*e.particles);if(S>0){n.useProgram(c.program);let i=c.uniforms;n.uniformMatrix4fv(i.uViewProj,!1,r.viewProj),n.uniform2f(i.uViewport,t.width,t.height),n.uniform1f(i.uDpr,l),n.uniform1f(i.uTime,X.time),n.uniform1f(i.uSize,2.2*e.thickness),n.uniform1f(i.uFocus,X.focus),n.uniform1f(i.uDof,e.depthOfField),n.uniform1f(i.uMaxCoc,22),n.uniform1f(i.uFocal,f),n.uniform1f(i.uIntro,m),n.uniform1f(i.uSparkle,e.sparkle),n.uniform1f(i.uScale,e.scale*X.fit),n.uniform1f(i.uGradient,e.gradient),n.uniform1f(i.uGain,1/e.thickness),n.uniform3f(i.uGlowColor,X.glow[0],X.glow[1],X.glow[2]),n.uniform3f(i.uLineColor,X.line[0],X.line[1],X.line[2]),n.uniform3f(i.uSecondaryColor,X.secondary[0],X.secondary[1],X.secondary[2]),n.drawArraysInstanced(n.TRIANGLE_STRIP,0,4,S)}n.disable(n.BLEND);let C=e.glow>.001&&!e.lightMode;if(n.bindVertexArray(K),C){G.forEach((e,n)=>{U(e,Math.max(1,Math.round(t.width/2**(n+1))),Math.max(1,Math.round(t.height/2**(n+1))))}),le(h,G[0],W,[.5/W.width,.5/W.height]);for(let e=1;e<u;e+=1)le(g,G[e],G[e-1],[1/G[e-1].width,1/G[e-1].height]);n.enable(n.BLEND),n.blendFunc(n.ONE,n.ONE);for(let e=4;e>0;--e)le(A,G[e-1],G[e],[.5/G[e].width,.5/G[e].height]);n.disable(n.BLEND)}n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,t.width,t.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(I.program);let w=I.uniforms;n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,W.texture),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,C?G[0].texture:W.texture),n.uniform1i(w.uScene,0),n.uniform1i(w.uBloom,1),n.uniform1f(w.uGlow,C?e.glow:0),n.uniform1f(w.uBrightness,e.brightness),n.uniform1f(w.uLightMode,+!!e.lightMode),n.uniform1f(w.uGrain,e.grain),n.uniform1f(w.uVignette,e.vignette),n.uniform1f(w.uFrame,X.frame%977),n.uniform2f(w.uView,t.width,t.height),n.uniform1f(w.uDpr,l),n.drawArrays(n.TRIANGLES,0,3),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,null),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,null),n.bindVertexArray(null)},de=e=>{if(Z=0,!te||!ee||document.hidden)return;let t=V.value,n=Q?(e-Q)/1e3:1/60,r=Math.min(.05,n);Q=e;let i=!t.paused&&!Y;i?(X.frame+=1,X.time+=r*t.speed,X.roll+=r*t.speed*t.rollSpeed,X.flow+=r*t.flow*12,X.intro+=Math.min(n,1)):X.intro<d&&(X.intro=d),X.pulse.age+=r,X.pulse.strength=Math.max(0,1-X.pulse.age/1.8)**2;let{pointer:a,hover:o,look:s}=X,c=t.mouseInteraction&&a.inside&&!Y;c&&!o.placed&&(o.x=a.x,o.y=a.y,o.placed=!0),o.x+=(a.x-o.x)*(1-Math.exp(-r/.08)),o.y+=(a.y-o.y)*(1-Math.exp(-r/.08));let l=+!!c;o.presence+=(l-o.presence)*(1-Math.exp(-r/(l>o.presence?.3:.6))),!c&&o.presence<.001&&(o.placed=!1);let u=c?(a.x/X.width-.5)*.5:0,p=c?(.5-a.y/X.height)*.5:0;s.vx+=(30*(u-s.x)-11*s.vx)*r,s.vy+=(30*(p-s.y)-11*s.vy)*r,s.x+=s.vx*r,s.y+=s.vy*r;let m=f+t.focusDepth*3,h=m;if(c&&t.hover===0){let e=se(t,o.x,o.y);e&&(h=m+(e.depth-m)*o.presence*Math.min(1,t.mouseStrength))}X.focus+=(h-X.focus)*(1-Math.exp(-r/.35)),ue();let g=Math.abs(l-o.presence)>.002||Math.abs(u-s.x)>2e-4||Math.abs(p-s.y)>2e-4||Math.abs(h-X.focus)>.001||X.pulse.strength>.001;i||g?Z=requestAnimationFrame(de):Q=0},$=()=>{!Z&&te&&ee&&!document.hidden&&(Z=requestAnimationFrame(de))},fe=t=>{let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top;X.pointer.x=r,X.pointer.y=i,X.pointer.inside=r>=0&&i>=0&&r<=n.width&&i<=n.height,$()},pe=t=>{let n=V.value;if(!n.mouseInteraction||!n.pulseOnClick||t.button!==0||Y||t.target instanceof Element&&t.target.closest(`a, button, input, textarea, select, label, [role="button"]`))return;let r=e.getBoundingClientRect(),i=t.clientX-r.left,a=t.clientY-r.top;if(i<0||a<0||i>r.width||a>r.height)return;let o=se(n,i,a);o&&(X.pulse={s:o.s,age:0,strength:1,ribbon:o.ribbon}),$()},me=()=>{X.pointer.inside=!1,$()},he=()=>{Q=0,$()},ge=new ResizeObserver(ce);ge.observe(e);let _e=new IntersectionObserver(e=>{ee=e.some(e=>e.isIntersecting),ee&&(Q=0,$())});return _e.observe(e),window.addEventListener(`pointermove`,fe,{passive:!0}),window.addEventListener(`pointerdown`,pe),document.documentElement.addEventListener(`pointerleave`,me),document.addEventListener(`visibilitychange`,he),ce(),$(),z=()=>{Z||ue(),$()},()=>{te=!1,cancelAnimationFrame(Z),z=null,ge.disconnect(),_e.disconnect(),window.removeEventListener(`pointermove`,fe),window.removeEventListener(`pointerdown`,pe),document.documentElement.removeEventListener(`pointerleave`,me),document.removeEventListener(`visibilitychange`,he),n.deleteVertexArray(K),[W,...G].forEach(e=>{e.texture&&n.deleteTexture(e.texture),n.deleteFramebuffer(e.framebuffer)}),[i,c,h,g,A,I].forEach(e=>n.deleteProgram(e.program))}};return(0,e.onMounted)(()=>{B=H()}),(0,e.onBeforeUnmount)(()=>{B?.(),B=void 0}),(0,e.watch)(V,()=>{z?.()}),(n,r)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,{ref_key:`containerRef`,ref:L,class:(0,e.normalizeClass)([`ghost-fibers-container`,t.className])},[(0,e.createElementVNode)(`canvas`,{ref_key:`canvasRef`,ref:R,class:`ghost-fibers-canvas`,"aria-hidden":`true`},null,512)],2))}}),_=`#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`,v=`#version 300 es
precision highp float;
precision highp int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;

uniform float uIntensity;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.40 * hash21(q);
    n += 0.25 * hash21(q * 2.0 + 17.0);
    n += 0.20 * hash21(q * 4.0 + 47.0);
    n += 0.10 * hash21(q * 8.0 + 113.0);
    n += 0.05 * hash21(q * 16.0 + 191.0);
    return n;
}

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

float edgeFade(vec2 frag, vec2 res, vec2 offset){
    vec2 toC = frag - 0.5 * res - offset;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    float s = q * 0.5;
    s = pow(s, 1.5);
    float tail = 1.0 - pow(1.0 - s, 2.0);
    s = mix(s, tail, 0.2);
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;
    return clamp(s + dn, 0.0, 1.0);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)
            + 0.7 * sin(q.y * 0.50 - t * 0.5)
            + 0.6 * sin(q.z * 0.60 + t * 0.7);
    return a;
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;

    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
    }
    mat3 hoverMat = mat3(1.0);
    if(uAnimType == 2){
      vec2 m = uMouse * 2.0 - 1.0;
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);
      hoverMat = rotY(ang.y) * rotX(ang.x);
    }

    for (int i = 0; i < 44; ++i) {
        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        vec3 Pl = P * (10.0 / max(rad, 1e-6));

        if(uAnimType == 0){
            Pl.xz *= M2;
        } else if(uAnimType == 1){
      Pl = rot3dMat * Pl;
        } else {
      Pl = hoverMat * Pl;
        }

        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;

        float grow = smoothstep(0.35, 3.0, marchT);
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
        vec3 Pb = Pl;
        Pb.xz = rot2(Pb.xz, a1);
        Pb.xy = rot2(Pb.xy, a2);

        float rayPattern = smoothstep(
            0.5, 0.7,
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))
        );

        if (uRayCount > 0) {
            float ang = atan(Pb.y, Pb.x);
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);
            comb = pow(comb, 3.0);
            rayPattern *= smoothstep(0.15, 0.95, comb);
        }

        vec3 spectralDefault = 1.0 + vec3(
            cos(marchT * 3.0 + 0.0),
            cos(marchT * 3.0 + 1.0),
            cos(marchT * 3.0 + 2.0)
        );

        float saw = fract(marchT * 0.25);
        float tRay = saw * saw * (3.0 - 2.0 * saw);
        vec3 userGradient = 2.0 * sampleGradient(tRay);
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;
        vec3 base = (0.05 / (0.4 + stepLen))
                  * smoothstep(5.0, 0.0, rad)
                  * spectral;

        col += base * rayPattern;
        marchT += stepLen;
    }

    col *= edgeFade(frag, uResolution, uOffset);
    col *= uIntensity;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`,y=(0,e.defineComponent)({name:`HBitsPrismaticBurst`,__name:`HBitsPrismaticBurst`,props:{intensity:{default:2},speed:{default:.5},animationType:{default:`rotate3d`},colors:{},distort:{default:0},paused:{type:Boolean,default:!1},offset:{default:()=>({x:0,y:0})},hoverDampness:{default:0},rayCount:{},mixBlendMode:{default:`lighten`}},setup(n){let r=e=>{let t=e.trim();if(t.startsWith(`#`)&&(t=t.slice(1)),t.length===3){let e=t[0],n=t[1],r=t[2];t=e+e+n+n+r+r}let n=parseInt(t,16);return isNaN(n)||t.length!==6&&t.length!==8?[1,1,1]:[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]},i=e=>{if(e==null)return 0;if(typeof e==`number`)return e;let t=String(e).trim(),n=parseFloat(t.replace(`px`,``));return isNaN(n)?0:n},a=n,o=(0,e.useTemplateRef)(`containerRef`),s=(0,e.ref)(null),c=(0,e.ref)(null),l=(0,e.ref)([.5,.5]),u=(0,e.ref)([.5,.5]),d=(0,e.ref)(a.paused),f=(0,e.ref)(null),p=(0,e.ref)(a.hoverDampness),m=(0,e.ref)(!0),h=(0,e.ref)(null),g=(0,e.ref)(null);return(0,e.onMounted)(()=>{let n=o.value;if(!n)return;let r=Math.min(window.devicePixelRatio||1,2),i=new t.Renderer({dpr:r,alpha:!1,antialias:!1});c.value=i;let y=i.gl;y.canvas.style.position=`absolute`,y.canvas.style.inset=`0`,y.canvas.style.width=`100%`,y.canvas.style.height=`100%`,y.canvas.style.mixBlendMode=a.mixBlendMode&&a.mixBlendMode!==`none`?a.mixBlendMode:``,n.appendChild(y.canvas);let b=new Uint8Array([255,255,255,255]),x=new t.Texture(y,{image:b,width:1,height:1,generateMipmaps:!1,flipY:!1});x.minFilter=y.LINEAR,x.magFilter=y.LINEAR,x.wrapS=y.CLAMP_TO_EDGE,x.wrapT=y.CLAMP_TO_EDGE,f.value=x;let S=new t.Program(y,{vertex:_,fragment:v,uniforms:{uResolution:{value:[1,1]},uTime:{value:0},uIntensity:{value:1},uSpeed:{value:1},uAnimType:{value:0},uMouse:{value:[.5,.5]},uColorCount:{value:0},uDistort:{value:0},uOffset:{value:[0,0]},uGradient:{value:x},uNoiseAmount:{value:.8},uRayCount:{value:0}}});s.value=S;let C=new t.Triangle(y),w=new t.Mesh(y,{geometry:C,program:S});g.value=C,h.value=w;let T=()=>{let e=n.clientWidth||1,t=n.clientHeight||1;i.setSize(e,t),S.uniforms.uResolution.value=[y.drawingBufferWidth,y.drawingBufferHeight]},E=null;`ResizeObserver`in window?(E=new ResizeObserver(T),E.observe(n)):window.addEventListener(`resize`,T),T();let D=e=>{let t=n.getBoundingClientRect(),r=(e.clientX-t.left)/Math.max(t.width,1),i=(e.clientY-t.top)/Math.max(t.height,1);l.value=[Math.min(Math.max(r,0),1),Math.min(Math.max(i,0),1)]};n.addEventListener(`pointermove`,D,{passive:!0});let O=null;`IntersectionObserver`in window&&(O=new IntersectionObserver(e=>{e[0]&&(m.value=e[0].isIntersecting)},{root:null,threshold:.01}),O.observe(n));let k=()=>{};document.addEventListener(`visibilitychange`,k);let A=0,j=performance.now(),M=0,N=e=>{let t=Math.max(0,e-j)*.001;j=e;let n=m.value&&!document.hidden;if(d.value||(M+=t),!n){A=requestAnimationFrame(N);return}let r=.02+Math.max(0,Math.min(1,p.value))*.5,a=1-Math.exp(-t/r),o=l.value,s=u.value;s[0]+=(o[0]-s[0])*a,s[1]+=(o[1]-s[1])*a,S.uniforms.uMouse.value=s,S.uniforms.uTime.value=M,i.render({scene:h.value}),A=requestAnimationFrame(N)};A=requestAnimationFrame(N),(0,e.onUnmounted)(()=>{cancelAnimationFrame(A),n.removeEventListener(`pointermove`,D),E?.disconnect(),E||window.removeEventListener(`resize`,T),O?.disconnect(),document.removeEventListener(`visibilitychange`,k);try{n.removeChild(y.canvas)}catch{}h.value=null,g.value=null,s.value=null;try{let e=c.value?.gl;e&&f.value?.texture&&e.deleteTexture(f.value.texture)}catch{}c.value=null,f.value=null})}),(0,e.watch)(()=>a.paused,e=>d.value=e),(0,e.watch)(()=>a.hoverDampness,e=>p.value=e),(0,e.watch)(()=>a.mixBlendMode,e=>{let t=c.value?.gl?.canvas;t&&(t.style.mixBlendMode=e&&e!==`none`?e:``)}),(0,e.watch)(()=>[a.intensity,a.speed,a.animationType,a.colors,a.distort,a.offset,a.rayCount],()=>{let e=s.value,t=c.value,n=f.value;if(!e||!t||!n)return;e.uniforms.uIntensity.value=a.intensity??1,e.uniforms.uSpeed.value=a.speed??1;let o={rotate:0,rotate3d:1,hover:2};e.uniforms.uAnimType.value=o[a.animationType??`rotate`],e.uniforms.uDistort.value=typeof a.distort==`number`?a.distort:0;let l=i(a.offset?.x),u=i(a.offset?.y);e.uniforms.uOffset.value=[l,u],e.uniforms.uRayCount.value=Math.max(0,Math.floor(a.rayCount??0));let d=0;if(Array.isArray(a.colors)&&a.colors.length>0){let e=t.gl,i=a.colors.slice(0,64);d=i.length;let o=new Uint8Array(d*4);for(let e=0;e<d;e++){let[t,n,a]=r(i[e]);o[e*4+0]=Math.round(t*255),o[e*4+1]=Math.round(n*255),o[e*4+2]=Math.round(a*255),o[e*4+3]=255}n.image=o,n.width=d,n.height=1,n.minFilter=e.LINEAR,n.magFilter=e.LINEAR,n.wrapS=e.CLAMP_TO_EDGE,n.wrapT=e.CLAMP_TO_EDGE,n.flipY=!1,n.generateMipmaps=!1,n.format=e.RGBA,n.type=e.UNSIGNED_BYTE,n.needsUpdate=!0}else d=0;e.uniforms.uColorCount.value=d},{immediate:!0}),(t,n)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,{style:{width:`100%`,height:`100%`,position:`fixed`,"z-index":`0`},ref_key:`containerRef`,ref:o},null,512))}}),b=`#version 300 es
precision highp float;
in vec2 aPoint;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uFrame;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;
uniform float uCount;
uniform float uThickness;
uniform float uSoftness;
uniform float uWaves;
uniform float uSplit;
uniform float uFray;
uniform float uSeed;
uniform vec2 uTurn;
uniform vec4 uPart;
uniform float uTaper;
out float vEdge;
out float vBand;
out float vDraw;
out float vAlpha;
out float vIndex;

float Perlin2D(vec2 P) {
  vec2 Pi = floor(P);
  vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
  vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
  Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
  Pt += vec2(26.0, 161.0).xyxy;
  Pt *= Pt;
  Pt = Pt.xzxz * Pt.yyww;
  vec4 hash_x = fract(Pt * (1.0 / 951.135664));
  vec4 hash_y = fract(Pt * (1.0 / 642.949883));
  vec4 grad_x = hash_x - 0.49999;
  vec4 grad_y = hash_y - 0.49999;
  vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y) * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
  grad_results *= 1.4142135623730950;
  vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
  vec4 blend2 = vec4(blend, vec2(1.0 - blend));
  return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

void main() {
  float perc = float(gl_InstanceID) / uCount;
  float x = aPoint.x;
  float pixel = 1.0 / max(uResolution.x, uResolution.y);
  float splitPoint = uSplit + perc * uFray;
  float amplitudeNormal = smoothstep(splitPoint, max(0.7, splitPoint + 0.2), x);
  float finalAmplitude = amplitudeNormal * 0.5 * uAmplitude * (1.0 + (uMouse.y - 0.5) * 0.2);
  float timeScaled = uTime / 10.0 + (uMouse.x - 0.5);
  float blur = smoothstep(splitPoint, splitPoint + 0.05, x) * perc;
  float xnoise = mix(
    Perlin2D(vec2(timeScaled * 2.5 + uSeed, (x * uWaves + perc) * 2.5)),
    Perlin2D(vec2(timeScaled * 3.5 + uSeed, (x * uWaves + timeScaled) * 3.5)) / 1.5,
    x * 0.3
  );
  float y = 0.5 + (perc - 0.5) * uDistance + xnoise / 2.0 * finalAmplitude;
  vec2 local = vec2((x - 0.5) * uFrame.x, (y - 0.5) * uFrame.y);
  if (uPart.z > 0.0) {
    vec2 delta = local - uPart.xy;
    float reach = uPart.w;
    float pull = exp(-dot(delta, delta) / (reach * reach));
    local.y += delta.y * pull * uPart.z;
  }
  float width = 7.0 * uThickness * pixel * (1.0 - perc);
  float band = (width / 2.0 + 10.0 * uSoftness * pixel * blur) * uFrame.y;
  float draw = max(band, 1.0);
  local.y += aPoint.y * draw;
  vec2 turned = vec2(local.x * uTurn.x - local.y * uTurn.y, local.x * uTurn.y + local.y * uTurn.x);
  gl_Position = vec4(turned / (uResolution * 0.5), 0.0, 1.0);
  vEdge = aPoint.y * draw;
  vBand = band;
  vDraw = draw;
  vAlpha = 1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3)) * uTaper;
  vIndex = perc;
}`,x=`#version 300 es
precision highp float;
in float vEdge;
in float vBand;
in float vDraw;
in float vAlpha;
in float vIndex;
uniform vec3 uColor;
uniform vec3 uAccent;
out vec4 outColor;
void main() {
  float coverage = (1.0 - smoothstep(0.0, vDraw, abs(vEdge))) * (vBand / vDraw) * vAlpha;
  outColor = vec4(mix(uColor, uAccent, vIndex) * coverage, coverage);
}`,S=`#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,C=`#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uLines;
uniform vec2 uResolution;
uniform float uFade;
uniform float uOpacity;
uniform float uCurve;
out vec4 outColor;

float smootherstep(float edge, float x) {
  float t = clamp(x / edge, 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void main() {
  vec4 lines = texture(uLines, vUv);
  float alpha = lines.a;
  vec3 color = alpha > 0.0001 ? lines.rgb / alpha : vec3(0.0);
  float mask = uOpacity;
  if (uFade > 0.0) {
    vec2 px = vUv * uResolution;
    float edge = uFade * min(uResolution.x, uResolution.y) * 0.5;
    mask *= smootherstep(edge, px.x) * smootherstep(edge, uResolution.x - px.x);
    mask *= smootherstep(edge, px.y) * smootherstep(edge, uResolution.y - px.y);
  }
  outColor = vec4(color * pow(alpha, uCurve), alpha) * mask;
}`,w=1920,T=(0,e.defineComponent)({name:`HBitsThreads`,__name:`HBitsThreads`,props:{color:{default:()=>[1,1,1]},accentColor:{default:void 0},amplitude:{default:1.7},distance:{default:.4},enableMouseInteraction:{type:Boolean,default:!1},lineCount:{default:90},thickness:{default:.6},softness:{default:1.3},speed:{default:.6},waves:{default:1.05},split:{default:.04},fray:{default:.5},angle:{default:25},seed:{default:0},parting:{default:0},taper:{default:.85},brightness:{default:1.4},fade:{default:0},opacity:{default:1},paused:{type:Boolean,default:!1},className:{default:``}},setup(t){let n=(e,t,n)=>Math.min(n,Math.max(t,e)),r=(e,t,n)=>{let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null},i=(e,t,n)=>{let i=r(e,e.VERTEX_SHADER,t),a=r(e,e.FRAGMENT_SHADER,n),o=e.createProgram();return!i||!a||!o?null:(e.attachShader(o,i),e.attachShader(o,a),e.linkProgram(o),e.deleteShader(i),e.deleteShader(a),e.getProgramParameter(o,e.LINK_STATUS)?o:(e.deleteProgram(o),null))},a=(e,t,n)=>{let r={};for(let i of n)r[i]=e.getUniformLocation(t,i);return r},o=t,s=(0,e.ref)(null),c=(0,e.ref)(null),l=null,u=null,d=(0,e.computed)(()=>{let{color:e,accentColor:t}=o;return{color:e,accentColor:t,colorKey:`${Array.isArray(e)?e.join(`,`):String(e)}|${Array.isArray(t)?t.join(`,`):String(t??``)}`,amplitude:o.amplitude,distance:o.distance,enableMouseInteraction:o.enableMouseInteraction,lineCount:n(Math.round(o.lineCount),1,400),thickness:Math.max(0,o.thickness),softness:Math.max(0,o.softness),speed:o.speed,waves:Math.max(0,o.waves),split:n(o.split,0,1),fray:n(o.fray,0,1),angle:o.angle,seed:o.seed,parting:n(o.parting,0,1),taper:n(o.taper,0,1),brightness:n(o.brightness,.25,2),fade:n(o.fade,0,1),opacity:n(o.opacity,0,1),paused:o.paused}});return(0,e.watch)(d,()=>{l?.()}),(0,e.onMounted)(()=>{let e=s.value,t=c.value,r=t?.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!e||!t||!r)return;let o=i(r,b,x),f=i(r,S,C);if(!o||!f)return;let p=a(r,o,[`uTime`,`uResolution`,`uFrame`,`uAmplitude`,`uDistance`,`uMouse`,`uCount`,`uThickness`,`uSoftness`,`uWaves`,`uSplit`,`uFray`,`uSeed`,`uTurn`,`uPart`,`uTaper`,`uColor`,`uAccent`]),m=a(r,f,[`uLines`,`uResolution`,`uFade`,`uOpacity`,`uCurve`]),h=r.createVertexArray(),g=r.createBuffer();r.bindVertexArray(h),r.bindBuffer(r.ARRAY_BUFFER,g);let _=r.getAttribLocation(o,`aPoint`);r.enableVertexAttribArray(_),r.vertexAttribPointer(_,2,r.FLOAT,!1,0,0);let v=r.createVertexArray(),y=r.createBuffer();r.bindVertexArray(v),r.bindBuffer(r.ARRAY_BUFFER,y),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),r.STATIC_DRAW);let T=r.getAttribLocation(f,`aPosition`);r.enableVertexAttribArray(T),r.vertexAttribPointer(T,2,r.FLOAT,!1,0,0),r.bindVertexArray(null);let E=r.createTexture(),D=r.createFramebuffer();r.bindTexture(r.TEXTURE_2D,E),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE);let O=document.createElement(`canvas`);O.width=1,O.height=1;let k=O.getContext(`2d`,{willReadFrequently:!0}),A=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1,j={time:0,width:1,height:1,segments:0,colorKey:``,color:[1,1,1],accent:[1,1,1],mouse:[.5,.5],targetMouse:[.5,.5],pointer:[0,0],targetPointer:[0,0],presence:0,inside:!1},M=0,N=0,P=!0,F=!0,I=e=>{if(Array.isArray(e))return[0,1,2].map(t=>n(Number(e[t]??1),0,1));if(!k)return[1,1,1];k.clearRect(0,0,1,1),k.fillStyle=`#ffffff`,k.fillStyle=String(e),k.fillRect(0,0,1,1);let[t,r,i]=k.getImageData(0,0,1,1).data;return[t/255,r/255,i/255]},L=e=>{e.colorKey!==j.colorKey&&(j.colorKey=e.colorKey,j.color=I(e.color),j.accent=e.accentColor===void 0||e.accentColor===null?j.color:I(e.accentColor))},R=e=>{if(e===j.segments)return;j.segments=e;let t=new Float32Array((e+1)*4);for(let n=0;n<=e;n++){let r=n/e;t.set([r,-1,r,1],n*4)}r.bindBuffer(r.ARRAY_BUFFER,g),r.bufferData(r.ARRAY_BUFFER,t,r.STATIC_DRAW)},z=()=>{let i=Math.max(1,e.clientWidth),a=Math.max(1,e.clientHeight),o=Math.min(window.devicePixelRatio||1,2),s=Math.max(i,a)*o,c=s>w?o*w/s:o;t.width=Math.max(1,Math.round(i*c)),t.height=Math.max(1,Math.round(a*c)),j.width=i,j.height=a,r.bindTexture(r.TEXTURE_2D,E),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,t.width,t.height,0,r.RGBA,r.UNSIGNED_BYTE,null),r.bindFramebuffer(r.FRAMEBUFFER,D),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,E,0),r.bindFramebuffer(r.FRAMEBUFFER,null),R(n(Math.round(i/3),96,640)),B()},B=()=>{let e=d.value;L(e);let n=t.width,i=t.height,a=e.angle*Math.PI/180,s=Math.cos(a),c=Math.sin(a),l=Math.abs(n*s)+Math.abs(i*c),u=Math.abs(n*c)+Math.abs(i*s),g=n/j.width,_=e.enableMouseInteraction?j.mouse:[.5,.5],y=e.parting*j.presence*2,b=j.pointer[0]*g,x=j.pointer[1]*g,S=[b*s+x*c,-b*c+x*s];r.bindFramebuffer(r.FRAMEBUFFER,D),r.viewport(0,0,n,i),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA),r.useProgram(o),r.uniform1f(p.uTime,j.time),r.uniform2f(p.uResolution,n,i),r.uniform2f(p.uFrame,l,u),r.uniform1f(p.uAmplitude,e.amplitude),r.uniform1f(p.uDistance,e.distance),r.uniform2f(p.uMouse,_[0],_[1]),r.uniform1f(p.uCount,e.lineCount),r.uniform1f(p.uThickness,e.thickness),r.uniform1f(p.uSoftness,e.softness),r.uniform1f(p.uWaves,e.waves),r.uniform1f(p.uSplit,e.split),r.uniform1f(p.uFray,e.fray),r.uniform1f(p.uSeed,e.seed*13.37),r.uniform2f(p.uTurn,s,c),r.uniform4f(p.uPart,S[0],S[1],y,Math.min(n,i)*.16),r.uniform1f(p.uTaper,e.taper),r.uniform3f(p.uColor,j.color[0],j.color[1],j.color[2]),r.uniform3f(p.uAccent,j.accent[0],j.accent[1],j.accent[2]),r.bindVertexArray(h),r.drawArraysInstanced(r.TRIANGLE_STRIP,0,(j.segments+1)*2,e.lineCount),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,n,i),r.disable(r.BLEND),r.clear(r.COLOR_BUFFER_BIT),r.useProgram(f),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,E),r.uniform1i(m.uLines,0),r.uniform2f(m.uResolution,n,i),r.uniform1f(m.uFade,e.fade),r.uniform1f(m.uOpacity,e.opacity),r.uniform1f(m.uCurve,2/e.brightness),r.bindVertexArray(v),r.drawArrays(r.TRIANGLES,0,3),r.bindVertexArray(null)},V=e=>{if(M=0,!F||!P||document.hidden)return;let t=d.value,n=N?Math.min(.05,(e-N)/1e3):1/60;N=e;let r=!t.paused&&!A;r&&(j.time+=n*t.speed);let i=1-Math.exp(-n*3);j.mouse[0]+=(j.targetMouse[0]-j.mouse[0])*i,j.mouse[1]+=(j.targetMouse[1]-j.mouse[1])*i;let a=1-Math.exp(-n*10);j.pointer[0]+=(j.targetPointer[0]-j.pointer[0])*a,j.pointer[1]+=(j.targetPointer[1]-j.pointer[1])*a,j.presence+=((j.inside&&t.parting>0?1:0)-j.presence)*(1-Math.exp(-n*4)),B();let o=Math.abs(j.targetMouse[0]-j.mouse[0])>5e-4||Math.abs(j.targetMouse[1]-j.mouse[1])>5e-4||Math.abs(j.targetPointer[0]-j.pointer[0])>.05||Math.abs(j.targetPointer[1]-j.pointer[1])>.05||Math.abs((j.inside&&t.parting>0?1:0)-j.presence)>.002;r||o?M=requestAnimationFrame(V):N=0},H=()=>{!M&&F&&P&&!document.hidden&&(M=requestAnimationFrame(V))},U=t=>{let n=e.getBoundingClientRect(),r=(t.clientX-n.left)/Math.max(1,n.width),i=(t.clientY-n.top)/Math.max(1,n.height),a=r>=0&&r<=1&&i>=0&&i<=1;a?(j.targetMouse=[r,1-i],j.targetPointer=[t.clientX-n.left-n.width/2,n.height/2-(t.clientY-n.top)],!j.inside&&j.presence<.01&&(j.pointer=[...j.targetPointer])):j.inside&&(j.targetMouse=[.5,.5]),j.inside=a,H()},W=()=>{j.inside=!1,j.targetMouse=[.5,.5],H()},G=()=>{N=0,H()},K=new ResizeObserver(z);K.observe(e);let q=new IntersectionObserver(e=>{P=e.some(e=>e.isIntersecting),P&&(N=0,H())});q.observe(e),window.addEventListener(`pointermove`,U,{passive:!0}),document.documentElement.addEventListener(`pointerleave`,W),document.addEventListener(`visibilitychange`,G),z(),l=()=>{M||B(),H()},u=()=>{F=!1,cancelAnimationFrame(M),l=null,K.disconnect(),q.disconnect(),window.removeEventListener(`pointermove`,U),document.documentElement.removeEventListener(`pointerleave`,W),document.removeEventListener(`visibilitychange`,G),r.deleteFramebuffer(D),r.deleteTexture(E),r.deleteBuffer(g),r.deleteBuffer(y),r.deleteVertexArray(h),r.deleteVertexArray(v),r.deleteProgram(o),r.deleteProgram(f)}}),(0,e.onUnmounted)(()=>{u?.(),u=null}),(n,r)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,{ref_key:`containerRef`,ref:s,class:(0,e.normalizeClass)([`threads-container`,t.className].filter(Boolean).join(` `))},[(0,e.createElementVNode)(`canvas`,{ref_key:`canvasRef`,ref:c,class:`threads-canvas`,"aria-hidden":`true`},null,512)],2))}}),E={particles:{number:{density:{enable:!0,width:1920,height:1080},value:100},links:{distance:125,enable:!0,triangles:{enable:!0,opacity:.1}},move:{enable:!0,speed:5},size:{value:1},shape:{type:`circle`}}},D=[`id`],O=(0,e.defineComponent)({name:`HParticles`,__name:`HParticles`,setup(t){let i=(0,e.shallowRef)(`HParticles`),a,o=()=>n.tsParticles.pluginManager.presets.has(`triangles`),s=async()=>{o()||await(0,r.loadTrianglesPreset)(n.tsParticles)},c=async()=>{a?.destroy(),a=await n.tsParticles.load({id:i.value,options:E})},l=async()=>{a?.destroy()};return(0,e.onBeforeMount)(()=>{s()}),(0,e.onMounted)(()=>{c()}),(0,e.onUnmounted)(()=>{l()}),(t,n)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,{id:i.value},[(0,e.renderSlot)(t.$slots,`default`)],8,D))}});c.install=e=>{e.component(c.name,c)},g.install=e=>{e.component(g.name,g)},y.install=e=>{e.component(y.name,y)},T.install=e=>{e.component(T.name,T)},O.install=e=>{e.component(O.name,O)};var k={version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,height:`896`,width:`967.8852157128662`},A={id:`linearGradient-3`,x1:`0.5`,y1:`0`,x2:`0.5`,y2:`1`},j=[`stop-color`],M=[`stop-color`],N=(0,e.defineComponent)({name:`HSignInCornerBottom`,__name:`HSignInCornerBottom`,props:{startColor:{},endColor:{}},setup(t){return(n,r)=>((0,e.openBlock)(),(0,e.createElementBlock)(`svg`,k,[(0,e.createElementVNode)(`defs`,null,[r[0]||=(0,e.createElementVNode)(`path`,{id:`path-2`,opacity:`1`,"fill-rule":`evenodd`,d:`M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896
			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806
			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z`},null,-1),(0,e.createElementVNode)(`linearGradient`,A,[(0,e.createElementVNode)(`stop`,{offset:`0`,"stop-color":t.startColor,"stop-opacity":`1`},null,8,j),(0,e.createElementVNode)(`stop`,{offset:`1`,"stop-color":t.endColor,"stop-opacity":`1`},null,8,M)])]),r[1]||=(0,e.createElementVNode)(`g`,{opacity:`1`},[(0,e.createElementVNode)(`use`,{"xlink:href":`#path-2`,fill:`url(#linearGradient-3)`,"fill-opacity":`1`})],-1)]))}}),P={height:`1337`,width:`1337`},F={id:`linearGradient-2`,x1:`0.79`,y1:`0.62`,x2:`0.21`,y2:`0.86`},I=[`stop-color`],L=[`stop-color`],R=(0,e.defineComponent)({name:`HSignInCornerTop`,__name:`HSignInCornerTop`,props:{startColor:{},endColor:{}},setup(t){return(n,r)=>((0,e.openBlock)(),(0,e.createElementBlock)(`svg`,P,[(0,e.createElementVNode)(`defs`,null,[r[0]||=(0,e.createElementVNode)(`path`,{id:`path-1`,opacity:`1`,"fill-rule":`evenodd`,d:`M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z`},null,-1),(0,e.createElementVNode)(`linearGradient`,F,[(0,e.createElementVNode)(`stop`,{offset:`0`,"stop-color":t.startColor,"stop-opacity":`1`},null,8,I),(0,e.createElementVNode)(`stop`,{offset:`1`,"stop-color":t.endColor,"stop-opacity":`1`},null,8,L)])]),r[1]||=(0,e.createElementVNode)(`g`,{opacity:`1`},[(0,e.createElementVNode)(`use`,{"xlink:href":`#path-1`,fill:`url(#linearGradient-2)`,"fill-opacity":`1`})],-1)]))}}),z={class:`corner-top`},B={class:`corner-bottom`},V=((e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n})((0,e.defineComponent)({name:`HSignInBackground`,components:{HSignInCornerBottom:N,HSignInCornerTop:R},__name:`HSignInBackground`,props:{startColor:{default:`#28aff0`},endColor:{default:`#120fc4`}},setup(t){return(n,r)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,null,[(0,e.createElementVNode)(`div`,z,[(0,e.createVNode)(R,{"start-color":t.startColor,"end-color":t.endColor},null,8,[`start-color`,`end-color`])]),(0,e.createElementVNode)(`div`,B,[(0,e.createVNode)(N,{"start-color":t.endColor,"end-color":t.startColor},null,8,[`start-color`,`end-color`])])]))}}),[[`__scopeId`,`data-v-7774e47e`]]);V.install=e=>{e.component(V.name,V)};var H=[c,g,y,T,O,V],U={install:e=>{H.map(t=>t.install(e))}};exports.HBitsGalaxy=c,exports.HBitsGhostFibers=g,exports.HBitsPrismaticBurst=y,exports.HBitsThreads=T,exports.HParticles=O,exports.HSignInBackground=V,exports.default=U;
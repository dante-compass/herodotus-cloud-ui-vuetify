Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:`Module`}});var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},s=(n,r,s)=>(s=n==null?{}:e(i(n)),o(r||!n||!n.__esModule||!a.call(n,`default`)?t(s,`default`,{value:n,enumerable:!0}):s,n));let c=require("vue"),l=require("ogl"),u=require("@tsparticles/engine"),d=require("@tsparticles/preset-triangles"),f=require("vuetify/components"),p=require("vuetify"),m=require("@herodotus/core"),h=require("lodash-es"),g=require("pinia"),_=require("@mdi/js");_=s(_,1);var v=`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,y=`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 4.0
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

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);

      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;

      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);

  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0); // Center in UV space
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha); // Enhance contrast
    alpha = min(alpha, 1.0); // Clamp to maximum 1.0
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`,b=(0,c.defineComponent)({name:`HBitsGalaxy`,__name:`HBitsGalaxy`,props:{focal:{default:()=>[.5,.5]},rotation:{default:()=>[1,0]},starSpeed:{default:.5},density:{default:1},hueShift:{default:140},disableAnimation:{type:Boolean,default:!1},speed:{default:1},mouseInteraction:{type:Boolean,default:!0},glowIntensity:{default:.3},saturation:{default:0},mouseRepulsion:{type:Boolean,default:!0},twinkleIntensity:{default:.3},rotationSpeed:{default:.1},repulsionStrength:{default:2},autoCenterRepulsion:{default:0},transparent:{type:Boolean,default:!0}},setup(e){let t=e,n=(0,c.useTemplateRef)(`ctnDom`),r=(0,c.ref)({x:.5,y:.5}),i=(0,c.ref)({x:.5,y:.5}),a=(0,c.ref)(0),o=(0,c.ref)(0),s=null,u=()=>{if(!n.value)return;let e=n.value,c=new l.Renderer({alpha:t.transparent,premultipliedAlpha:!1}),u=c.gl;t.transparent?(u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.clearColor(0,0,0,0)):u.clearColor(0,0,0,1);let d;function f(){c.setSize(e.offsetWidth*1,e.offsetHeight*1),d&&(d.uniforms.uResolution.value=new l.Color(u.canvas.width,u.canvas.height,u.canvas.width/u.canvas.height))}window.addEventListener(`resize`,f,!1),f();let p=new l.Triangle(u);d=new l.Program(u,{vertex:v,fragment:y,uniforms:{uTime:{value:0},uResolution:{value:new l.Color(u.canvas.width,u.canvas.height,u.canvas.width/u.canvas.height)},uFocal:{value:new Float32Array(t.focal)},uRotation:{value:new Float32Array(t.rotation)},uStarSpeed:{value:t.starSpeed},uDensity:{value:t.density},uHueShift:{value:t.hueShift},uSpeed:{value:t.speed},uMouse:{value:new Float32Array([i.value.x,i.value.y])},uGlowIntensity:{value:t.glowIntensity},uSaturation:{value:t.saturation},uMouseRepulsion:{value:t.mouseRepulsion},uTwinkleIntensity:{value:t.twinkleIntensity},uRotationSpeed:{value:t.rotationSpeed},uRepulsionStrength:{value:t.repulsionStrength},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:t.autoCenterRepulsion},uTransparent:{value:t.transparent}}});let m=new l.Mesh(u,{geometry:p,program:d}),h;function g(e){h=requestAnimationFrame(g),t.disableAnimation||(d.uniforms.uTime.value=e*.001,d.uniforms.uStarSpeed.value=e*.001*t.starSpeed/10);let n=.05;i.value.x+=(r.value.x-i.value.x)*n,i.value.y+=(r.value.y-i.value.y)*n,o.value+=(a.value-o.value)*n,d.uniforms.uMouse.value[0]=i.value.x,d.uniforms.uMouse.value[1]=i.value.y,d.uniforms.uMouseActiveFactor.value=o.value,c.render({scene:m})}h=requestAnimationFrame(g),e.appendChild(u.canvas);function _(t){let n=e.getBoundingClientRect(),i=(t.clientX-n.left)/n.width,o=1-(t.clientY-n.top)/n.height;r.value={x:i,y:o},a.value=1}function b(){a.value=0}t.mouseInteraction&&(e.addEventListener(`mousemove`,_),e.addEventListener(`mouseleave`,b)),s=()=>{cancelAnimationFrame(h),window.removeEventListener(`resize`,f),t.mouseInteraction&&(e.removeEventListener(`mousemove`,_),e.removeEventListener(`mouseleave`,b)),e.removeChild(u.canvas),u.getExtension(`WEBGL_lose_context`)?.loseContext()}};return(0,c.onMounted)(()=>{s?.(),u()}),(0,c.onUnmounted)(()=>{s?.()}),(0,c.watch)(()=>t,()=>{s?.(),u()},{deep:!0}),(e,t)=>((0,c.openBlock)(),(0,c.createElementBlock)(`div`,(0,c.mergeProps)({ref_key:`ctnDom`,ref:n,style:{width:`100%`,height:`100%`,position:`fixed`,"z-index":`0`}},e.$attrs),null,16))}}),x=`#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`,ee=`#version 300 es
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
}`,S=(0,c.defineComponent)({name:`HBitsPrismaticBurst`,__name:`HBitsPrismaticBurst`,props:{intensity:{default:2},speed:{default:.5},animationType:{default:`rotate3d`},colors:{},distort:{default:0},paused:{type:Boolean,default:!1},offset:{default:()=>({x:0,y:0})},hoverDampness:{default:0},rayCount:{},mixBlendMode:{default:`lighten`}},setup(e){let t=e=>{let t=e.trim();if(t.startsWith(`#`)&&(t=t.slice(1)),t.length===3){let e=t[0],n=t[1],r=t[2];t=e+e+n+n+r+r}let n=parseInt(t,16);return isNaN(n)||t.length!==6&&t.length!==8?[1,1,1]:[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]},n=e=>{if(e==null)return 0;if(typeof e==`number`)return e;let t=String(e).trim(),n=parseFloat(t.replace(`px`,``));return isNaN(n)?0:n},r=e,i=(0,c.useTemplateRef)(`containerRef`),a=(0,c.ref)(null),o=(0,c.ref)(null),s=(0,c.ref)([.5,.5]),u=(0,c.ref)([.5,.5]),d=(0,c.ref)(r.paused),f=(0,c.ref)(null),p=(0,c.ref)(r.hoverDampness),m=(0,c.ref)(!0),h=(0,c.ref)(null),g=(0,c.ref)(null);return(0,c.onMounted)(()=>{let e=i.value;if(!e)return;let t=Math.min(window.devicePixelRatio||1,2),n=new l.Renderer({dpr:t,alpha:!1,antialias:!1});o.value=n;let _=n.gl;_.canvas.style.position=`absolute`,_.canvas.style.inset=`0`,_.canvas.style.width=`100%`,_.canvas.style.height=`100%`,_.canvas.style.mixBlendMode=r.mixBlendMode&&r.mixBlendMode!==`none`?r.mixBlendMode:``,e.appendChild(_.canvas);let v=new Uint8Array([255,255,255,255]),y=new l.Texture(_,{image:v,width:1,height:1,generateMipmaps:!1,flipY:!1});y.minFilter=_.LINEAR,y.magFilter=_.LINEAR,y.wrapS=_.CLAMP_TO_EDGE,y.wrapT=_.CLAMP_TO_EDGE,f.value=y;let b=new l.Program(_,{vertex:x,fragment:ee,uniforms:{uResolution:{value:[1,1]},uTime:{value:0},uIntensity:{value:1},uSpeed:{value:1},uAnimType:{value:0},uMouse:{value:[.5,.5]},uColorCount:{value:0},uDistort:{value:0},uOffset:{value:[0,0]},uGradient:{value:y},uNoiseAmount:{value:.8},uRayCount:{value:0}}});a.value=b;let S=new l.Triangle(_),C=new l.Mesh(_,{geometry:S,program:b});g.value=S,h.value=C;let w=()=>{let t=e.clientWidth||1,r=e.clientHeight||1;n.setSize(t,r),b.uniforms.uResolution.value=[_.drawingBufferWidth,_.drawingBufferHeight]},T=null;`ResizeObserver`in window?(T=new ResizeObserver(w),T.observe(e)):window.addEventListener(`resize`,w),w();let E=t=>{let n=e.getBoundingClientRect(),r=(t.clientX-n.left)/Math.max(n.width,1),i=(t.clientY-n.top)/Math.max(n.height,1);s.value=[Math.min(Math.max(r,0),1),Math.min(Math.max(i,0),1)]};e.addEventListener(`pointermove`,E,{passive:!0});let D=null;`IntersectionObserver`in window&&(D=new IntersectionObserver(e=>{e[0]&&(m.value=e[0].isIntersecting)},{root:null,threshold:.01}),D.observe(e));let O=()=>{};document.addEventListener(`visibilitychange`,O);let k=0,A=performance.now(),j=0,M=e=>{let t=Math.max(0,e-A)*.001;A=e;let r=m.value&&!document.hidden;if(d.value||(j+=t),!r){k=requestAnimationFrame(M);return}let i=.02+Math.max(0,Math.min(1,p.value))*.5,a=1-Math.exp(-t/i),o=s.value,c=u.value;c[0]+=(o[0]-c[0])*a,c[1]+=(o[1]-c[1])*a,b.uniforms.uMouse.value=c,b.uniforms.uTime.value=j,n.render({scene:h.value}),k=requestAnimationFrame(M)};k=requestAnimationFrame(M),(0,c.onUnmounted)(()=>{cancelAnimationFrame(k),e.removeEventListener(`pointermove`,E),T?.disconnect(),T||window.removeEventListener(`resize`,w),D?.disconnect(),document.removeEventListener(`visibilitychange`,O);try{e.removeChild(_.canvas)}catch{}h.value=null,g.value=null,a.value=null;try{let e=o.value?.gl;e&&f.value?.texture&&e.deleteTexture(f.value.texture)}catch{}o.value=null,f.value=null})}),(0,c.watch)(()=>r.paused,e=>d.value=e),(0,c.watch)(()=>r.hoverDampness,e=>p.value=e),(0,c.watch)(()=>r.mixBlendMode,e=>{let t=o.value?.gl?.canvas;t&&(t.style.mixBlendMode=e&&e!==`none`?e:``)}),(0,c.watch)(()=>[r.intensity,r.speed,r.animationType,r.colors,r.distort,r.offset,r.rayCount],()=>{let e=a.value,i=o.value,s=f.value;if(!e||!i||!s)return;e.uniforms.uIntensity.value=r.intensity??1,e.uniforms.uSpeed.value=r.speed??1;let c={rotate:0,rotate3d:1,hover:2};e.uniforms.uAnimType.value=c[r.animationType??`rotate`],e.uniforms.uDistort.value=typeof r.distort==`number`?r.distort:0;let l=n(r.offset?.x),u=n(r.offset?.y);e.uniforms.uOffset.value=[l,u],e.uniforms.uRayCount.value=Math.max(0,Math.floor(r.rayCount??0));let d=0;if(Array.isArray(r.colors)&&r.colors.length>0){let e=i.gl,n=r.colors.slice(0,64);d=n.length;let a=new Uint8Array(d*4);for(let e=0;e<d;e++){let[r,i,o]=t(n[e]);a[e*4+0]=Math.round(r*255),a[e*4+1]=Math.round(i*255),a[e*4+2]=Math.round(o*255),a[e*4+3]=255}s.image=a,s.width=d,s.height=1,s.minFilter=e.LINEAR,s.magFilter=e.LINEAR,s.wrapS=e.CLAMP_TO_EDGE,s.wrapT=e.CLAMP_TO_EDGE,s.flipY=!1,s.generateMipmaps=!1,s.format=e.RGBA,s.type=e.UNSIGNED_BYTE,s.needsUpdate=!0}else d=0;e.uniforms.uColorCount.value=d},{immediate:!0}),(e,t)=>((0,c.openBlock)(),(0,c.createElementBlock)(`div`,{style:{width:`100%`,height:`100%`,position:`fixed`,"z-index":`0`},ref_key:`containerRef`,ref:i},null,512))}}),C=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,w=`
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

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
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`,T=(0,c.defineComponent)({name:`HBitsThreads`,__name:`HBitsThreads`,props:{color:{default:()=>[1,1,1]},amplitude:{default:1},distance:{default:0},enableMouseInteraction:{type:Boolean,default:!1}},setup(e){let t=e,n=(0,c.useTemplateRef)(`containerRef`),r=null,i=null,a=null,o=null,s=null,u=[.5,.5],d=[.5,.5],f=()=>{if(!n.value||!r||!a)return;let{clientWidth:e,clientHeight:t}=n.value;r.setSize(e,t),a.uniforms.iResolution.value.r=e,a.uniforms.iResolution.value.g=t,a.uniforms.iResolution.value.b=e/t},p=e=>{if(!n.value)return;let t=n.value.getBoundingClientRect();d=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height]},m=()=>{d=[.5,.5]},h=e=>{if(!(!a||!r||!o)){if(t.enableMouseInteraction){let e=.05;u[0]+=e*(d[0]-u[0]),u[1]+=e*(d[1]-u[1]),a.uniforms.uMouse.value[0]=u[0],a.uniforms.uMouse.value[1]=u[1]}else a.uniforms.uMouse.value[0]=.5,a.uniforms.uMouse.value[1]=.5;a.uniforms.iTime.value=e*.001,r.render({scene:o}),s=requestAnimationFrame(h)}},g=()=>{if(!n.value)return;_();let e=n.value;r=new l.Renderer({alpha:!0}),i=r.gl,i.clearColor(0,0,0,0),i.enable(i.BLEND),i.blendFunc(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA);let c=new l.Triangle(i);a=new l.Program(i,{vertex:C,fragment:w,uniforms:{iTime:{value:0},iResolution:{value:new l.Color(i.canvas.width,i.canvas.height,i.canvas.width/i.canvas.height)},uColor:{value:new l.Color(...t.color)},uAmplitude:{value:t.amplitude},uDistance:{value:t.distance},uMouse:{value:new Float32Array([.5,.5])}}}),o=new l.Mesh(i,{geometry:c,program:a});let u=i.canvas;u.style.width=`100%`,u.style.height=`100%`,u.style.display=`block`,e.appendChild(u),window.addEventListener(`resize`,f),t.enableMouseInteraction&&(e.addEventListener(`mousemove`,p),e.addEventListener(`mouseleave`,m)),f(),s=requestAnimationFrame(h)},_=()=>{if(s&&=(cancelAnimationFrame(s),null),window.removeEventListener(`resize`,f),n.value){n.value.removeEventListener(`mousemove`,p),n.value.removeEventListener(`mouseleave`,m);let e=n.value.querySelector(`canvas`);e&&n.value.removeChild(e)}i&&i.getExtension(`WEBGL_lose_context`)?.loseContext(),r=null,i=null,a=null,o=null,u=[.5,.5],d=[.5,.5]};return(0,c.onMounted)(()=>{g()}),(0,c.onUnmounted)(()=>{_()}),(0,c.watch)([()=>t.color,()=>t.amplitude,()=>t.distance,()=>t.enableMouseInteraction],()=>{g()},{deep:!0}),(e,t)=>((0,c.openBlock)(),(0,c.createElementBlock)(`div`,{ref_key:`containerRef`,ref:n,style:{width:`100%`,height:`100%`,position:`fixed`,"z-index":`0`}},null,512))}}),E={particles:{number:{density:{enable:!0,width:1920,height:1080},value:100},links:{distance:125,enable:!0,triangles:{enable:!0,opacity:.1}},move:{enable:!0,speed:5},size:{value:1},shape:{type:`circle`}}},D=[`id`],O=(0,c.defineComponent)({name:`HParticles`,__name:`HParticles`,setup(e){let t=(0,c.shallowRef)(`HParticles`),n,r=async()=>{await(0,d.loadTrianglesPreset)(u.tsParticles)},i=async()=>{n?.destroy(),n=await u.tsParticles.load({id:t.value,options:E})},a=async()=>{n?.destroy()};return(0,c.onBeforeMount)(()=>{r()}),(0,c.onMounted)(()=>{i()}),(0,c.onUnmounted)(()=>{a()}),(e,n)=>((0,c.openBlock)(),(0,c.createElementBlock)(`div`,{id:t.value},[(0,c.renderSlot)(e.$slots,`default`)],8,D))}});b.install=e=>{e.component(b.name,b)},S.install=e=>{e.component(S.name,S)},T.install=e=>{e.component(T.name,T)},O.install=e=>{e.component(O.name,O)};var k=(0,c.defineComponent)({name:`HIconButton`,components:{VTooltip:f.VTooltip,VIconBtn:f.VIconBtn},__name:`HIconButton`,props:{color:{},tooltip:{},location:{default:`bottom`}},setup(e){return(t,n)=>e.tooltip?((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VTooltip),{key:0,interactive:``,location:e.location},{activator:(0,c.withCtx)(({props:n})=>[(0,c.createVNode)((0,c.unref)(f.VIconBtn),(0,c.mergeProps)({color:e.color},(0,c.mergeProps)(n,t.$attrs)),null,16,[`color`])]),default:(0,c.withCtx)(()=>[(0,c.createElementVNode)(`span`,null,(0,c.toDisplayString)(e.tooltip),1)]),_:1},8,[`location`])):((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VIconBtn),(0,c.normalizeProps)((0,c.mergeProps)({key:1},t.$attrs)),null,16))}});k.install=e=>{e.component(k.name,k)};var A=(0,c.defineComponent)({name:`HDatePicker`,components:{VMenu:f.VMenu,VTooltip:f.VTooltip,VIcon:f.VIcon,VDatePicker:f.VDatePicker},__name:`HDatePicker`,props:{modelValue:{},modelModifiers:{}},emits:[`update:modelValue`],setup(e){let t=(0,c.useModel)(e,`modelValue`),n=(0,p.useDate)(),r=(0,c.computed)({get:()=>t.value?n.parseISO(t.value):``,set:e=>{e?t.value=(0,m.moment)(e).format(`YYYY-MM-DD`):t.value=e}});return(e,t)=>((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VMenu),(0,c.mergeProps)({"close-on-content-click":!1,activator:`parent`},e.$attrs),{activator:(0,c.withCtx)(({props:e})=>[(0,c.createVNode)((0,c.unref)(f.VTooltip),{location:`bottom`},{activator:(0,c.withCtx)(({props:t})=>[(0,c.createVNode)((0,c.unref)(f.VIcon),(0,c.mergeProps)({icon:`mdi-calendar`},(0,c.mergeProps)(e,t)),null,16)]),default:(0,c.withCtx)(()=>[t[1]||=(0,c.createElementVNode)(`span`,null,`点击设置日期`,-1)]),_:2},1024)]),default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VDatePicker),{modelValue:r.value,"onUpdate:modelValue":t[0]||=e=>r.value=e,"show-week":``,"show-adjacent-months":``,"first-day-of-week":`1`,"weeks-in-month":`dynamic`},null,8,[`modelValue`])]),_:1},16))}}),j=(0,c.defineComponent)({name:`HDate`,components:{VTextField:f.VTextField,HDatePicker:A},__name:`HDate`,props:{modelValue:{},modelModifiers:{}},emits:[`update:modelValue`],setup(e){let t=(0,c.useModel)(e,`modelValue`);return(e,n)=>((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VTextField),(0,c.mergeProps)({modelValue:t.value,"onUpdate:modelValue":n[1]||=e=>t.value=e,glow:``},e.$attrs),{"prepend-inner":(0,c.withCtx)(()=>[(0,c.createVNode)(A,{modelValue:t.value,"onUpdate:modelValue":n[0]||=e=>t.value=e},null,8,[`modelValue`])]),_:1},16,[`modelValue`]))}}),M=(0,c.defineComponent)({name:`HTimePicker`,components:{VMenu:f.VMenu,VTooltip:f.VTooltip,VIcon:f.VIcon,VTimePicker:f.VTimePicker},__name:`HTimePicker`,props:{modelValue:{},modelModifiers:{}},emits:[`update:modelValue`],setup(e){let t=(0,c.useModel)(e,`modelValue`);return(e,n)=>((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VMenu),(0,c.mergeProps)({"close-on-content-click":!1,activator:`parent`,"min-width":`0`},e.$attrs),{activator:(0,c.withCtx)(({props:e})=>[(0,c.createVNode)((0,c.unref)(f.VTooltip),{location:`bottom`},{activator:(0,c.withCtx)(({props:t})=>[(0,c.createVNode)((0,c.unref)(f.VIcon),(0,c.mergeProps)({icon:`mdi-clock-time-four-outline`},(0,c.mergeProps)(e,t)),null,16)]),default:(0,c.withCtx)(()=>[n[1]||=(0,c.createElementVNode)(`span`,null,`点击设置日期`,-1)]),_:2},1024)]),default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VTimePicker),{modelValue:t.value,"onUpdate:modelValue":n[0]||=e=>t.value=e,"use-seconds":``,format:`24hr`},null,8,[`modelValue`])]),_:1},16))}}),N=(0,c.defineComponent)({name:`HDateTime`,components:{VTextField:f.VTextField,HDatePicker:A,HTimePicker:M},__name:`HDateTime`,props:{modelValue:{},modelModifiers:{}},emits:[`update:modelValue`],setup(e){let t=(0,c.useModel)(e,`modelValue`),n=(0,c.shallowRef)(``),r=(0,c.shallowRef)(``),i=(e,t)=>{let n=e&&e.trim()!==``?e:`1970-01-01`,r=t&&t.trim()!==``?t:`00:00:00`;return(0,m.moment)(`${n} ${r}`).format(`YYYY-MM-DD HH:mm:ss`)};return(0,c.watch)(t,e=>{if(e){let t=(0,m.moment)(e);r.value=t.format(`YYYY-MM-DD`),n.value=t.format(`HH:mm:ss`)}}),(0,c.watch)([r,n],([e,n])=>{t.value=i(e,n)}),(e,i)=>((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VTextField),(0,c.mergeProps)({modelValue:t.value,"onUpdate:modelValue":i[2]||=e=>t.value=e,glow:``},e.$attrs),{"prepend-inner":(0,c.withCtx)(()=>[(0,c.createVNode)(A,{modelValue:r.value,"onUpdate:modelValue":i[0]||=e=>r.value=e},null,8,[`modelValue`])]),"append-inner":(0,c.withCtx)(()=>[(0,c.createVNode)(M,{modelValue:n.value,"onUpdate:modelValue":i[1]||=e=>n.value=e},null,8,[`modelValue`])]),_:1},16,[`modelValue`]))}}),P=[{title:`天`,value:`days`},{title:`小时`,value:`hours`},{title:`分`,value:`minutes`},{title:`秒`,value:`seconds`}],F=(0,c.defineComponent)({name:`HDuration`,components:{VContainer:f.VContainer,VRow:f.VRow,VCol:f.VCol,VNumberInput:f.VNumberInput,VSelect:f.VSelect},__name:`HDuration`,props:{modelValue:{required:!0},modelModifiers:{}},emits:[`update:modelValue`],setup(e){let t=(0,c.useModel)(e,`modelValue`),n=(0,c.shallowRef)(0),r=(0,c.shallowRef)(),i=(0,c.shallowRef)(P),a=e=>{if(e){let t=m.moment.duration(e,`second`);if(t){let e=t._data;for(let t in e){let i=t,a=e[i];a&&(n.value=a,r.value=i)}}}},o=(e,n)=>{if(e&&n){let r=n,i=m.moment.duration(e,r).toISOString();t.value=i}};return(0,c.watch)(()=>t.value,e=>{e&&a(e)},{immediate:!0}),(0,c.watch)(r,e=>{e&&o(n.value,e)}),(0,c.watch)(n,e=>{e&&o(e,r.value)}),(e,t)=>((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VContainer),{class:`pa-0`},{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VRow),null,{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VCol),null,{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VNumberInput),{modelValue:n.value,"onUpdate:modelValue":t[0]||=e=>n.value=e,label:`数值`,placeholder:`请输入数值`,"control-variant":`split`,inset:``},null,8,[`modelValue`])]),_:1}),(0,c.createVNode)((0,c.unref)(f.VCol),null,{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VSelect),{modelValue:r.value,"onUpdate:modelValue":t[1]||=e=>r.value=e,items:i.value,label:`单位`,clearable:``},null,8,[`modelValue`,`items`])]),_:1})]),_:1})]),_:1}))}}),I=(0,c.defineComponent)({name:`HTime`,components:{VTextField:f.VTextField,HTimePicker:M},__name:`HTime`,props:{modelValue:{},modelModifiers:{}},emits:[`update:modelValue`],setup(e){let t=(0,c.useModel)(e,`modelValue`);return(e,n)=>((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VTextField),(0,c.mergeProps)({modelValue:t.value,"onUpdate:modelValue":n[1]||=e=>t.value=e,glow:``},e.$attrs),{"prepend-inner":(0,c.withCtx)(()=>[(0,c.createVNode)(M,{modelValue:t.value,"onUpdate:modelValue":n[0]||=e=>t.value=e},null,8,[`modelValue`])]),_:1},16,[`modelValue`]))}});j.install=e=>{e.component(j.name,j)},N.install=e=>{e.component(N.name,N)},F.install=e=>{e.component(F.name,F)},I.install=e=>{e.component(I.name,I)};var L=(0,c.defineComponent)({name:`HDialog`,components:{VDialog:f.VDialog,HIconButton:k},__name:`HDialog`,props:(0,c.mergeModels)({loading:{type:Boolean,default:!1},closed:{type:Boolean,default:!1},hideActions:{type:Boolean,default:!1},maxWidth:{default:500},confirmLabel:{default:`确认`}},{modelValue:{type:Boolean,default:!1,required:!0},modelModifiers:{}}),emits:(0,c.mergeModels)([`close`,`cancel`,`confirm`],[`update:modelValue`]),setup(e,{emit:t}){let n=t,r=(0,c.useModel)(e,`modelValue`),i=()=>{r.value=!1,n(`close`)},a=()=>{r.value=!1,n(`cancel`)},o=()=>{n(`confirm`)};return(t,n)=>((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VDialog),{modelValue:r.value,"onUpdate:modelValue":n[0]||=e=>r.value=e,"max-width":e.maxWidth,persistent:``,"z-index":1900},{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VCard),(0,c.mergeProps)({disabled:e.loading,loading:e.loading},t.$attrs),(0,c.createSlots)({loader:(0,c.withCtx)(({isActive:e})=>[(0,c.createVNode)((0,c.unref)(f.VProgressLinear),{active:e,height:`4`,indeterminate:``},null,8,[`active`])]),default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VDivider)),(0,c.createVNode)((0,c.unref)(f.VCardText),{class:`pb-2`},{default:(0,c.withCtx)(()=>[(0,c.renderSlot)(t.$slots,`default`)]),_:3}),e.hideActions?(0,c.createCommentVNode)(``,!0):((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VCardActions),{key:0},{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VBtn),{text:`取消`,color:`red`,onClick:a}),(0,c.createVNode)((0,c.unref)(f.VBtn),{text:e.confirmLabel,onClick:o},null,8,[`text`])]),_:1}))]),_:2},[e.closed?{name:`append`,fn:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(k),{icon:`mdi-close`,tooltip:`关闭`,onClick:i,variant:`text`,color:`medium-emphasis`})]),key:`0`}:void 0]),1040,[`disabled`,`loading`])]),_:3},8,[`modelValue`,`max-width`]))}});L.install=e=>{e.component(L.name,L)};var R={class:`d-flex flex-column gr-4 py-4`},z=(0,c.defineComponent)({name:`HDivider`,components:{VDivider:f.VDivider},__name:`HDivider`,props:{label:{}},setup(e){return(t,n)=>((0,c.openBlock)(),(0,c.createElementBlock)(`div`,R,[(0,c.createVNode)((0,c.unref)(f.VDivider),(0,c.mergeProps)({opacity:`.7`},t.$attrs),{default:(0,c.withCtx)(()=>[e.label?((0,c.openBlock)(),(0,c.createElementBlock)(c.Fragment,{key:0},[(0,c.createTextVNode)((0,c.toDisplayString)(e.label),1)],64)):(0,c.renderSlot)(t.$slots,`default`,{},void 0,void 0,1)]),_:3},16)]))}});z.install=e=>{e.component(z.name,z)};var B=(0,c.defineComponent)({name:`HDownloadProgress`,components:{VSnackbar:f.VSnackbar,VContainer:f.VContainer,VRow:f.VRow,VCol:f.VCol,VProgressLinear:f.VProgressLinear},__name:`HDownloadProgress`,props:(0,c.mergeModels)({progress:{}},{modelValue:{type:Boolean,required:!0},modelModifiers:{}}),emits:[`update:modelValue`],setup(e){let t=(0,c.useModel)(e,`modelValue`);return(n,r)=>((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VSnackbar),(0,c.mergeProps)({modelValue:t.value,"onUpdate:modelValue":r[0]||=e=>t.value=e,timeout:2e3,location:`center center`,color:`primary`},n.$attrs),{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VContainer),null,{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VRow),{"align-content":`center`,justify:`center`},{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VCol),{class:`text-subtitle-1 text-center`,cols:`12`},{default:(0,c.withCtx)(()=>[(0,c.createTextVNode)(`文件下载 `+(0,c.toDisplayString)(`${e.progress}%`),1)]),_:1}),(0,c.createVNode)((0,c.unref)(f.VCol),{cols:`6`},{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VProgressLinear),{"model-value":e.progress,"chunk-width":`4`,color:`purple`,height:`15`,rounded:`lg`},null,8,[`model-value`])]),_:1})]),_:1})]),_:1})]),_:1},16,[`modelValue`]))}});B.install=e=>{e.component(B.name,B)};var te={class:`flex-1-1-0`},ne={class:`d-flex`},re={key:0,class:`d-flex align-self-center mr-1`},V={key:1,class:`d-flex align-self-center`},H=(0,c.defineComponent)({name:`HLabel`,components:{VIcon:f.VIcon,VBtn:f.VBtn,VTooltip:f.VTooltip,VLabel:f.VLabel,VMessages:f.VMessages},__name:`HLabel`,props:{required:{type:Boolean,default:!1},text:{},message:{},tooltip:{},hideDetails:{type:Boolean,default:!1}},setup(e){let t=e,n=(0,c.computed)(()=>!!t.message);return(t,r)=>((0,c.openBlock)(),(0,c.createElementBlock)(`div`,{class:(0,c.normalizeClass)([`d-flex w-100`,{"mb-3":!e.hideDetails}])},[(0,c.createElementVNode)(`div`,te,[(0,c.createElementVNode)(`div`,ne,[e.required?((0,c.openBlock)(),(0,c.createElementBlock)(`div`,re,[(0,c.createVNode)((0,c.unref)(f.VIcon),{size:`x-small`,icon:`mdi-star`,color:`red`})])):(0,c.createCommentVNode)(``,!0),(0,c.createVNode)((0,c.unref)(f.VLabel),{text:e.text,class:`font-weight-medium`},{default:(0,c.withCtx)(()=>[(0,c.renderSlot)(t.$slots,`text`)]),_:3},8,[`text`]),e.tooltip?((0,c.openBlock)(),(0,c.createElementBlock)(`div`,V,[(0,c.createVNode)((0,c.unref)(f.VTooltip),{location:`bottom`},{activator:(0,c.withCtx)(({props:e})=>[(0,c.createVNode)((0,c.unref)(f.VIcon),(0,c.mergeProps)({size:`x-small`,icon:`mdi-progress-question`,color:`grey`},e),null,16)]),default:(0,c.withCtx)(()=>[r[0]||=(0,c.createElementVNode)(`span`,null,`点击设置日期`,-1)]),_:1})])):(0,c.createCommentVNode)(``,!0)]),n.value?((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VMessages),{key:0,messages:e.message,active:n.value},null,8,[`messages`,`active`])):(0,c.createCommentVNode)(``,!0)])],2))}});H.install=e=>{e.component(H.name,H)};var U=(0,g.defineStore)(`MdiIcon`,{state:()=>({icons:[]}),getters:{getAllIcons:e=>e.icons},actions:{initialize(){if((0,h.isEmpty)(this.icons)){let e=Object.keys(_).map(e=>(0,h.kebabCase)(e));this.icons=e}},search(e){if((0,h.isEmpty)(e.trim()))return this.icons;let t=e.toLowerCase();return this.getAllIcons.filter(e=>e.toLowerCase().match(t))}}}),W=(0,c.defineComponent)({name:`HMdiIconSelect`,components:{VAutocomplete:f.VAutocomplete,VExpandXTransition:f.VExpandXTransition,VListItem:f.VListItem,VIcon:f.VIcon},__name:`HMdiIconSelect`,props:{modelValue:{required:!0},modelModifiers:{}},emits:[`update:modelValue`],setup(e){let t=(0,c.useModel)(e,`modelValue`),n=(0,c.shallowRef)([]),r=(0,c.shallowRef)(!1),i=(0,c.shallowRef)(``),a=U(),o=(0,h.debounce)((e,t)=>{r.value=!0,t(a.search(e)),r.value=!1},500);return(0,c.onMounted)(()=>{r.value=!0,a.initialize(),n.value=a.getAllIcons,r.value=!1}),(0,c.watch)(i,e=>{(0,h.isEmpty)(e)?n.value=a.getAllIcons:o(e,e=>{n.value=e})}),(e,a)=>((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VAutocomplete),(0,c.mergeProps)({modelValue:t.value,"onUpdate:modelValue":a[0]||=e=>t.value=e,search:i.value,"onUpdate:search":a[1]||=e=>i.value=e,items:n.value,loading:r.value,clearable:``,"single-line":``},e.$attrs),{"prepend-inner":(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VExpandXTransition),null,{default:(0,c.withCtx)(()=>[t.value?((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VIcon),{key:0,icon:t.value,start:``},null,8,[`icon`])):(0,c.createCommentVNode)(``,!0)]),_:1})]),item:(0,c.withCtx)(({props:e,internalItem:t})=>[(0,c.createVNode)((0,c.unref)(f.VListItem),(0,c.mergeProps)(e,{"prepend-icon":t.value,title:t.value}),null,16,[`prepend-icon`,`title`])]),_:1},16,[`modelValue`,`search`,`items`,`loading`]))}}),G=(0,c.defineComponent)({name:`HTreeSelect`,components:{VMenu:f.VMenu,VIcon:f.VIcon,VTreeview:f.VTreeview,VTextField:f.VTextField},__name:`HTreeSelect`,props:(0,c.mergeModels)({items:{}},{modelValue:{required:!0},modelModifiers:{}}),emits:[`update:modelValue`],setup(e){let t=e,n=(0,c.useModel)(e,`modelValue`),r=(0,c.ref)(),i=(0,c.shallowRef)(!1),a=(0,c.shallowRef)(!1),o=(0,c.ref)([]),s=(0,c.shallowRef)(``),l=()=>{i.value=!0},u=e=>{i.value=!i.value},d=()=>{a.value&&r.value?.focus()},p=()=>{},m=e=>{let t=[];for(let n of e){let{children:e,...r}=n;e&&e.length&&(t=t.concat(m(e))),t.push(r)}return t},g=e=>{let t=(0,h.find)(o.value,t=>t.id==e);t&&(s.value=t.name)},_=e=>{!(0,h.isEmpty)(e)&&(0,h.isEmpty)(o.value)&&(o.value=m(e),!s.value&&n.value&&g(n.value))},v=(0,c.computed)({get:()=>n.value?[n.value]:[],set:e=>{e&&(0,h.isArray)(e)&&e.length>0?n.value=e[0]:n.value=``}});return(0,c.watch)(()=>t.items,e=>{(0,h.isEmpty)(e)||_(e)},{immediate:!0}),(0,c.watch)(n,(e,t)=>{e&&(g(e),i.value&&=!1)},{immediate:!0}),(0,c.watch)(a,(e,t)=>{e||e===t||(i.value=!1)}),(t,n)=>((0,c.openBlock)(),(0,c.createBlock)((0,c.unref)(f.VTextField),(0,c.mergeProps)({ref_key:`vTextFieldRef`,ref:r,modelValue:s.value,"onUpdate:modelValue":n[3]||=e=>s.value=e,focused:a.value,"onUpdate:focused":n[4]||=e=>a.value=e,class:[`v-combobox`,{"v-combobox--active-menu":i.value}],"onMousedown:control":l,onAfterLeave:d},t.$attrs),{"append-inner":(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VIcon),{icon:`mdi-menu-down`,onMousedown:u,onClick:p,class:`v-combobox__menu-icon`,tabindex:`-1`})]),default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VMenu),{modelValue:i.value,"onUpdate:modelValue":n[2]||=e=>i.value=e,activator:`parent`,"content-class":`v-combobox__content`,"open-on-click":!1,"close-on-content-click":!1,"max-height":`310`},{default:(0,c.withCtx)(()=>[(0,c.createVNode)((0,c.unref)(f.VTreeview),{activated:v.value,"onUpdate:activated":n[0]||=e=>v.value=e,items:e.items,"item-value":`id`,"item-title":`name`,activatable:``,"indent-lines":`default`,"separate-roots":``,onMousedown:n[1]||=e=>e.preventDefault()},null,8,[`activated`,`items`])]),_:1},8,[`modelValue`])]),_:1},16,[`modelValue`,`focused`,`class`]))}});W.install=e=>{e.component(W.name,W)},G.install=e=>{e.component(G.name,G)};var K={version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,height:`896`,width:`967.8852157128662`},q={id:`linearGradient-3`,x1:`0.5`,y1:`0`,x2:`0.5`,y2:`1`},J=[`stop-color`],Y=[`stop-color`],X=(0,c.defineComponent)({name:`HSignInCornerBottom`,__name:`HSignInCornerBottom`,props:{startColor:{},endColor:{}},setup(e){return(t,n)=>((0,c.openBlock)(),(0,c.createElementBlock)(`svg`,K,[(0,c.createElementVNode)(`defs`,null,[n[0]||=(0,c.createElementVNode)(`path`,{id:`path-2`,opacity:`1`,"fill-rule":`evenodd`,d:`M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896
			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806
			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z`},null,-1),(0,c.createElementVNode)(`linearGradient`,q,[(0,c.createElementVNode)(`stop`,{offset:`0`,"stop-color":e.startColor,"stop-opacity":`1`},null,8,J),(0,c.createElementVNode)(`stop`,{offset:`1`,"stop-color":e.endColor,"stop-opacity":`1`},null,8,Y)])]),n[1]||=(0,c.createElementVNode)(`g`,{opacity:`1`},[(0,c.createElementVNode)(`use`,{"xlink:href":`#path-2`,fill:`url(#linearGradient-3)`,"fill-opacity":`1`})],-1)]))}}),ie={height:`1337`,width:`1337`},ae={id:`linearGradient-2`,x1:`0.79`,y1:`0.62`,x2:`0.21`,y2:`0.86`},oe=[`stop-color`],se=[`stop-color`],Z=(0,c.defineComponent)({name:`HSignInCornerTop`,__name:`HSignInCornerTop`,props:{startColor:{},endColor:{}},setup(e){return(t,n)=>((0,c.openBlock)(),(0,c.createElementBlock)(`svg`,ie,[(0,c.createElementVNode)(`defs`,null,[n[0]||=(0,c.createElementVNode)(`path`,{id:`path-1`,opacity:`1`,"fill-rule":`evenodd`,d:`M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z`},null,-1),(0,c.createElementVNode)(`linearGradient`,ae,[(0,c.createElementVNode)(`stop`,{offset:`0`,"stop-color":e.startColor,"stop-opacity":`1`},null,8,oe),(0,c.createElementVNode)(`stop`,{offset:`1`,"stop-color":e.endColor,"stop-opacity":`1`},null,8,se)])]),n[1]||=(0,c.createElementVNode)(`g`,{opacity:`1`},[(0,c.createElementVNode)(`use`,{"xlink:href":`#path-1`,fill:`url(#linearGradient-2)`,"fill-opacity":`1`})],-1)]))}}),ce={class:`corner-top`},le={class:`corner-bottom`},Q=((e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n})((0,c.defineComponent)({name:`HSignInBackground`,components:{HSignInCornerBottom:X,HSignInCornerTop:Z},__name:`HSignInBackground`,props:{startColor:{default:`#28aff0`},endColor:{default:`#120fc4`}},setup(e){return(t,n)=>((0,c.openBlock)(),(0,c.createElementBlock)(`div`,null,[(0,c.createElementVNode)(`div`,ce,[(0,c.createVNode)(Z,{"start-color":e.startColor,"end-color":e.endColor},null,8,[`start-color`,`end-color`])]),(0,c.createElementVNode)(`div`,le,[(0,c.createVNode)(X,{"start-color":e.endColor,"end-color":e.startColor},null,8,[`start-color`,`end-color`])])]))}}),[[`__scopeId`,`data-v-7774e47e`]]);Q.install=e=>{e.component(Q.name,Q)};var ue={class:`w-20`},de={class:`w-50`},$=(0,c.defineComponent)({name:`HLabelItem`,components:{HLabel:H},__name:`HLabelItem`,props:{label:{},required:{type:Boolean,default:!1},justify:{default:`center`},align:{default:`center`},right:{type:Boolean,default:!1}},setup(e){let t=e,n=(0,c.computed)(()=>{let e=[];return t.justify&&e.push(`justify-${t.justify}`),t.align&&e.push(`align-${t.align}`),e});return(t,r)=>((0,c.openBlock)(),(0,c.createElementBlock)(`div`,{class:(0,c.normalizeClass)([`d-flex`,...n.value,`ga-4`])},[(0,c.createElementVNode)(`div`,ue,[(0,c.createVNode)((0,c.unref)(H),{text:e.label,required:e.required,"hide-details":``,class:(0,c.normalizeClass)([{"justify-end":e.right}])},null,8,[`text`,`required`,`class`])]),(0,c.createElementVNode)(`div`,de,[(0,c.renderSlot)(t.$slots,`default`)]),(0,c.createElementVNode)(`div`,null,[(0,c.renderSlot)(t.$slots,`append`)])],2))}});$.install=e=>{e.component($.name,$)};var fe=[b,S,T,j,N,L,z,B,F,W,k,H,$,O,Q,I,G],pe={install:e=>{fe.map(t=>t.install(e))}};exports.HBitsGalaxy=b,exports.HBitsPrismaticBurst=S,exports.HBitsThreads=T,exports.HDate=j,exports.HDateTime=N,exports.HDialog=L,exports.HDivider=z,exports.HDownloadProgress=B,exports.HDuration=F,exports.HIconButton=k,exports.HLabel=H,exports.HLabelItem=$,exports.HMdiIconSelect=W,exports.HParticles=O,exports.HSignInBackground=Q,exports.HTime=I,exports.HTreeSelect=G,exports.default=pe;
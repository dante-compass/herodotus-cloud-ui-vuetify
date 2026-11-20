Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:`Module`}});let e=require("vue"),t=require("ogl"),n=require("@tsparticles/engine"),r=require("@tsparticles/preset-triangles");var i=`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,a=`
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
`,o=(0,e.defineComponent)({name:`HBitsGalaxy`,__name:`HBitsGalaxy`,props:{focal:{default:()=>[.5,.5]},rotation:{default:()=>[1,0]},starSpeed:{default:.5},density:{default:1},hueShift:{default:140},disableAnimation:{type:Boolean,default:!1},speed:{default:1},mouseInteraction:{type:Boolean,default:!0},glowIntensity:{default:.3},saturation:{default:0},mouseRepulsion:{type:Boolean,default:!0},twinkleIntensity:{default:.3},rotationSpeed:{default:.1},repulsionStrength:{default:2},autoCenterRepulsion:{default:0},transparent:{type:Boolean,default:!0}},setup(n){let r=n,o=(0,e.useTemplateRef)(`ctnDom`),s=(0,e.ref)({x:.5,y:.5}),c=(0,e.ref)({x:.5,y:.5}),l=(0,e.ref)(0),u=(0,e.ref)(0),d=null,f=()=>{if(!o.value)return;let e=o.value,n=new t.Renderer({alpha:r.transparent,premultipliedAlpha:!1}),f=n.gl;r.transparent?(f.enable(f.BLEND),f.blendFunc(f.SRC_ALPHA,f.ONE_MINUS_SRC_ALPHA),f.clearColor(0,0,0,0)):f.clearColor(0,0,0,1);let p;function m(){n.setSize(e.offsetWidth*1,e.offsetHeight*1),p&&(p.uniforms.uResolution.value=new t.Color(f.canvas.width,f.canvas.height,f.canvas.width/f.canvas.height))}window.addEventListener(`resize`,m,!1),m();let h=new t.Triangle(f);p=new t.Program(f,{vertex:i,fragment:a,uniforms:{uTime:{value:0},uResolution:{value:new t.Color(f.canvas.width,f.canvas.height,f.canvas.width/f.canvas.height)},uFocal:{value:new Float32Array(r.focal)},uRotation:{value:new Float32Array(r.rotation)},uStarSpeed:{value:r.starSpeed},uDensity:{value:r.density},uHueShift:{value:r.hueShift},uSpeed:{value:r.speed},uMouse:{value:new Float32Array([c.value.x,c.value.y])},uGlowIntensity:{value:r.glowIntensity},uSaturation:{value:r.saturation},uMouseRepulsion:{value:r.mouseRepulsion},uTwinkleIntensity:{value:r.twinkleIntensity},uRotationSpeed:{value:r.rotationSpeed},uRepulsionStrength:{value:r.repulsionStrength},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:r.autoCenterRepulsion},uTransparent:{value:r.transparent}}});let g=new t.Mesh(f,{geometry:h,program:p}),_;function v(e){_=requestAnimationFrame(v),r.disableAnimation||(p.uniforms.uTime.value=e*.001,p.uniforms.uStarSpeed.value=e*.001*r.starSpeed/10);let t=.05;c.value.x+=(s.value.x-c.value.x)*t,c.value.y+=(s.value.y-c.value.y)*t,u.value+=(l.value-u.value)*t,p.uniforms.uMouse.value[0]=c.value.x,p.uniforms.uMouse.value[1]=c.value.y,p.uniforms.uMouseActiveFactor.value=u.value,n.render({scene:g})}_=requestAnimationFrame(v),e.appendChild(f.canvas);function y(t){let n=e.getBoundingClientRect(),r=(t.clientX-n.left)/n.width,i=1-(t.clientY-n.top)/n.height;s.value={x:r,y:i},l.value=1}function b(){l.value=0}r.mouseInteraction&&(e.addEventListener(`mousemove`,y),e.addEventListener(`mouseleave`,b)),d=()=>{cancelAnimationFrame(_),window.removeEventListener(`resize`,m),r.mouseInteraction&&(e.removeEventListener(`mousemove`,y),e.removeEventListener(`mouseleave`,b)),e.removeChild(f.canvas),f.getExtension(`WEBGL_lose_context`)?.loseContext()}};return(0,e.onMounted)(()=>{d?.(),f()}),(0,e.onUnmounted)(()=>{d?.()}),(0,e.watch)(()=>r,()=>{d?.(),f()},{deep:!0}),(t,n)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,(0,e.mergeProps)({ref_key:`ctnDom`,ref:o,style:{width:`100%`,height:`100%`,position:`fixed`,"z-index":`0`}},t.$attrs),null,16))}}),s=`#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`,c=`#version 300 es
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
}`,l=(0,e.defineComponent)({name:`HBitsPrismaticBurst`,__name:`HBitsPrismaticBurst`,props:{intensity:{default:2},speed:{default:.5},animationType:{default:`rotate3d`},colors:{},distort:{default:0},paused:{type:Boolean,default:!1},offset:{default:()=>({x:0,y:0})},hoverDampness:{default:0},rayCount:{},mixBlendMode:{default:`lighten`}},setup(n){let r=e=>{let t=e.trim();if(t.startsWith(`#`)&&(t=t.slice(1)),t.length===3){let e=t[0],n=t[1],r=t[2];t=e+e+n+n+r+r}let n=parseInt(t,16);return isNaN(n)||t.length!==6&&t.length!==8?[1,1,1]:[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]},i=e=>{if(e==null)return 0;if(typeof e==`number`)return e;let t=String(e).trim(),n=parseFloat(t.replace(`px`,``));return isNaN(n)?0:n},a=n,o=(0,e.useTemplateRef)(`containerRef`),l=(0,e.ref)(null),u=(0,e.ref)(null),d=(0,e.ref)([.5,.5]),f=(0,e.ref)([.5,.5]),p=(0,e.ref)(a.paused),m=(0,e.ref)(null),h=(0,e.ref)(a.hoverDampness),g=(0,e.ref)(!0),_=(0,e.ref)(null),v=(0,e.ref)(null);return(0,e.onMounted)(()=>{let n=o.value;if(!n)return;let r=Math.min(window.devicePixelRatio||1,2),i=new t.Renderer({dpr:r,alpha:!1,antialias:!1});u.value=i;let y=i.gl;y.canvas.style.position=`absolute`,y.canvas.style.inset=`0`,y.canvas.style.width=`100%`,y.canvas.style.height=`100%`,y.canvas.style.mixBlendMode=a.mixBlendMode&&a.mixBlendMode!==`none`?a.mixBlendMode:``,n.appendChild(y.canvas);let b=new Uint8Array([255,255,255,255]),x=new t.Texture(y,{image:b,width:1,height:1,generateMipmaps:!1,flipY:!1});x.minFilter=y.LINEAR,x.magFilter=y.LINEAR,x.wrapS=y.CLAMP_TO_EDGE,x.wrapT=y.CLAMP_TO_EDGE,m.value=x;let S=new t.Program(y,{vertex:s,fragment:c,uniforms:{uResolution:{value:[1,1]},uTime:{value:0},uIntensity:{value:1},uSpeed:{value:1},uAnimType:{value:0},uMouse:{value:[.5,.5]},uColorCount:{value:0},uDistort:{value:0},uOffset:{value:[0,0]},uGradient:{value:x},uNoiseAmount:{value:.8},uRayCount:{value:0}}});l.value=S;let C=new t.Triangle(y),w=new t.Mesh(y,{geometry:C,program:S});v.value=C,_.value=w;let T=()=>{let e=n.clientWidth||1,t=n.clientHeight||1;i.setSize(e,t),S.uniforms.uResolution.value=[y.drawingBufferWidth,y.drawingBufferHeight]},E=null;`ResizeObserver`in window?(E=new ResizeObserver(T),E.observe(n)):window.addEventListener(`resize`,T),T();let D=e=>{let t=n.getBoundingClientRect(),r=(e.clientX-t.left)/Math.max(t.width,1),i=(e.clientY-t.top)/Math.max(t.height,1);d.value=[Math.min(Math.max(r,0),1),Math.min(Math.max(i,0),1)]};n.addEventListener(`pointermove`,D,{passive:!0});let O=null;`IntersectionObserver`in window&&(O=new IntersectionObserver(e=>{e[0]&&(g.value=e[0].isIntersecting)},{root:null,threshold:.01}),O.observe(n));let k=()=>{};document.addEventListener(`visibilitychange`,k);let A=0,j=performance.now(),M=0,N=e=>{let t=Math.max(0,e-j)*.001;j=e;let n=g.value&&!document.hidden;if(p.value||(M+=t),!n){A=requestAnimationFrame(N);return}let r=.02+Math.max(0,Math.min(1,h.value))*.5,a=1-Math.exp(-t/r),o=d.value,s=f.value;s[0]+=(o[0]-s[0])*a,s[1]+=(o[1]-s[1])*a,S.uniforms.uMouse.value=s,S.uniforms.uTime.value=M,i.render({scene:_.value}),A=requestAnimationFrame(N)};A=requestAnimationFrame(N),(0,e.onUnmounted)(()=>{cancelAnimationFrame(A),n.removeEventListener(`pointermove`,D),E?.disconnect(),E||window.removeEventListener(`resize`,T),O?.disconnect(),document.removeEventListener(`visibilitychange`,k);try{n.removeChild(y.canvas)}catch{}_.value=null,v.value=null,l.value=null;try{let e=u.value?.gl;e&&m.value?.texture&&e.deleteTexture(m.value.texture)}catch{}u.value=null,m.value=null})}),(0,e.watch)(()=>a.paused,e=>p.value=e),(0,e.watch)(()=>a.hoverDampness,e=>h.value=e),(0,e.watch)(()=>a.mixBlendMode,e=>{let t=u.value?.gl?.canvas;t&&(t.style.mixBlendMode=e&&e!==`none`?e:``)}),(0,e.watch)(()=>[a.intensity,a.speed,a.animationType,a.colors,a.distort,a.offset,a.rayCount],()=>{let e=l.value,t=u.value,n=m.value;if(!e||!t||!n)return;e.uniforms.uIntensity.value=a.intensity??1,e.uniforms.uSpeed.value=a.speed??1;let o={rotate:0,rotate3d:1,hover:2};e.uniforms.uAnimType.value=o[a.animationType??`rotate`],e.uniforms.uDistort.value=typeof a.distort==`number`?a.distort:0;let s=i(a.offset?.x),c=i(a.offset?.y);e.uniforms.uOffset.value=[s,c],e.uniforms.uRayCount.value=Math.max(0,Math.floor(a.rayCount??0));let d=0;if(Array.isArray(a.colors)&&a.colors.length>0){let e=t.gl,i=a.colors.slice(0,64);d=i.length;let o=new Uint8Array(d*4);for(let e=0;e<d;e++){let[t,n,a]=r(i[e]);o[e*4+0]=Math.round(t*255),o[e*4+1]=Math.round(n*255),o[e*4+2]=Math.round(a*255),o[e*4+3]=255}n.image=o,n.width=d,n.height=1,n.minFilter=e.LINEAR,n.magFilter=e.LINEAR,n.wrapS=e.CLAMP_TO_EDGE,n.wrapT=e.CLAMP_TO_EDGE,n.flipY=!1,n.generateMipmaps=!1,n.format=e.RGBA,n.type=e.UNSIGNED_BYTE,n.needsUpdate=!0}else d=0;e.uniforms.uColorCount.value=d},{immediate:!0}),(t,n)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,{style:{width:`100%`,height:`100%`,position:`fixed`,"z-index":`0`},ref_key:`containerRef`,ref:o},null,512))}}),u=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`
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
`,f=(0,e.defineComponent)({name:`HBitsThreads`,__name:`HBitsThreads`,props:{color:{default:()=>[1,1,1]},amplitude:{default:1},distance:{default:0},enableMouseInteraction:{type:Boolean,default:!1}},setup(n){let r=n,i=(0,e.useTemplateRef)(`containerRef`),a=null,o=null,s=null,c=null,l=null,f=[.5,.5],p=[.5,.5],m=()=>{if(!i.value||!a||!s)return;let{clientWidth:e,clientHeight:t}=i.value;a.setSize(e,t),s.uniforms.iResolution.value.r=e,s.uniforms.iResolution.value.g=t,s.uniforms.iResolution.value.b=e/t},h=e=>{if(!i.value)return;let t=i.value.getBoundingClientRect();p=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height]},g=()=>{p=[.5,.5]},_=e=>{if(s&&a&&c){if(r.enableMouseInteraction){let e=.05;f[0]+=e*(p[0]-f[0]),f[1]+=e*(p[1]-f[1]),s.uniforms.uMouse.value[0]=f[0],s.uniforms.uMouse.value[1]=f[1]}else s.uniforms.uMouse.value[0]=.5,s.uniforms.uMouse.value[1]=.5;s.uniforms.iTime.value=e*.001,a.render({scene:c}),l=requestAnimationFrame(_)}},v=()=>{if(!i.value)return;y();let e=i.value;a=new t.Renderer({alpha:!0}),o=a.gl,o.clearColor(0,0,0,0),o.enable(o.BLEND),o.blendFunc(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA);let n=new t.Triangle(o);s=new t.Program(o,{vertex:u,fragment:d,uniforms:{iTime:{value:0},iResolution:{value:new t.Color(o.canvas.width,o.canvas.height,o.canvas.width/o.canvas.height)},uColor:{value:new t.Color(...r.color)},uAmplitude:{value:r.amplitude},uDistance:{value:r.distance},uMouse:{value:new Float32Array([.5,.5])}}}),c=new t.Mesh(o,{geometry:n,program:s});let f=o.canvas;f.style.width=`100%`,f.style.height=`100%`,f.style.display=`block`,e.appendChild(f),window.addEventListener(`resize`,m),r.enableMouseInteraction&&(e.addEventListener(`mousemove`,h),e.addEventListener(`mouseleave`,g)),m(),l=requestAnimationFrame(_)},y=()=>{if(l&&=(cancelAnimationFrame(l),null),window.removeEventListener(`resize`,m),i.value){i.value.removeEventListener(`mousemove`,h),i.value.removeEventListener(`mouseleave`,g);let e=i.value.querySelector(`canvas`);e&&i.value.removeChild(e)}o&&o.getExtension(`WEBGL_lose_context`)?.loseContext(),a=null,o=null,s=null,c=null,f=[.5,.5],p=[.5,.5]};return(0,e.onMounted)(()=>{v()}),(0,e.onUnmounted)(()=>{y()}),(0,e.watch)([()=>r.color,()=>r.amplitude,()=>r.distance,()=>r.enableMouseInteraction],()=>{v()},{deep:!0}),(t,n)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,{ref_key:`containerRef`,ref:i,style:{width:`100%`,height:`100%`,position:`fixed`,"z-index":`0`}},null,512))}}),p={particles:{number:{density:{enable:!0,width:1920,height:1080},value:100},links:{distance:125,enable:!0,triangles:{enable:!0,opacity:.1}},move:{enable:!0,speed:5},size:{value:1},shape:{type:`circle`}}},m=[`id`],h=(0,e.defineComponent)({name:`HParticles`,__name:`HParticles`,setup(t){let i=(0,e.shallowRef)(`HParticles`),a,o=()=>n.tsParticles.pluginManager.presets.has(`triangles`),s=async()=>{o()||await(0,r.loadTrianglesPreset)(n.tsParticles)},c=async()=>{a?.destroy(),a=await n.tsParticles.load({id:i.value,options:p})},l=async()=>{a?.destroy()};return(0,e.onBeforeMount)(()=>{s()}),(0,e.onMounted)(()=>{c()}),(0,e.onUnmounted)(()=>{l()}),(t,n)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,{id:i.value},[(0,e.renderSlot)(t.$slots,`default`)],8,m))}});o.install=e=>{e.component(o.name,o)},l.install=e=>{e.component(l.name,l)},f.install=e=>{e.component(f.name,f)},h.install=e=>{e.component(h.name,h)};var g={version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,height:`896`,width:`967.8852157128662`},_={id:`linearGradient-3`,x1:`0.5`,y1:`0`,x2:`0.5`,y2:`1`},v=[`stop-color`],y=[`stop-color`],b=(0,e.defineComponent)({name:`HSignInCornerBottom`,__name:`HSignInCornerBottom`,props:{startColor:{},endColor:{}},setup(t){return(n,r)=>((0,e.openBlock)(),(0,e.createElementBlock)(`svg`,g,[(0,e.createElementVNode)(`defs`,null,[r[0]||=(0,e.createElementVNode)(`path`,{id:`path-2`,opacity:`1`,"fill-rule":`evenodd`,d:`M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896
			C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806
			200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z`},null,-1),(0,e.createElementVNode)(`linearGradient`,_,[(0,e.createElementVNode)(`stop`,{offset:`0`,"stop-color":t.startColor,"stop-opacity":`1`},null,8,v),(0,e.createElementVNode)(`stop`,{offset:`1`,"stop-color":t.endColor,"stop-opacity":`1`},null,8,y)])]),r[1]||=(0,e.createElementVNode)(`g`,{opacity:`1`},[(0,e.createElementVNode)(`use`,{"xlink:href":`#path-2`,fill:`url(#linearGradient-3)`,"fill-opacity":`1`})],-1)]))}}),x={height:`1337`,width:`1337`},S={id:`linearGradient-2`,x1:`0.79`,y1:`0.62`,x2:`0.21`,y2:`0.86`},C=[`stop-color`],w=[`stop-color`],T=(0,e.defineComponent)({name:`HSignInCornerTop`,__name:`HSignInCornerTop`,props:{startColor:{},endColor:{}},setup(t){return(n,r)=>((0,e.openBlock)(),(0,e.createElementBlock)(`svg`,x,[(0,e.createElementVNode)(`defs`,null,[r[0]||=(0,e.createElementVNode)(`path`,{id:`path-1`,opacity:`1`,"fill-rule":`evenodd`,d:`M1337,668.5 C1337,1037.455193874239 1037.455193874239,1337 668.5,1337 C523.6725684305388,1337 337,1236 370.50000000000006,1094 C434.03835568300906,824.6732385973953 6.906089672974592e-14,892.6277623047779 0,668.5000000000001 C0,299.5448061257611 299.5448061257609,1.1368683772161603e-13 668.4999999999999,0 C1037.455193874239,0 1337,299.544806125761 1337,668.5Z`},null,-1),(0,e.createElementVNode)(`linearGradient`,S,[(0,e.createElementVNode)(`stop`,{offset:`0`,"stop-color":t.startColor,"stop-opacity":`1`},null,8,C),(0,e.createElementVNode)(`stop`,{offset:`1`,"stop-color":t.endColor,"stop-opacity":`1`},null,8,w)])]),r[1]||=(0,e.createElementVNode)(`g`,{opacity:`1`},[(0,e.createElementVNode)(`use`,{"xlink:href":`#path-1`,fill:`url(#linearGradient-2)`,"fill-opacity":`1`})],-1)]))}}),E={class:`corner-top`},D={class:`corner-bottom`},O=((e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n})((0,e.defineComponent)({name:`HSignInBackground`,components:{HSignInCornerBottom:b,HSignInCornerTop:T},__name:`HSignInBackground`,props:{startColor:{default:`#28aff0`},endColor:{default:`#120fc4`}},setup(t){return(n,r)=>((0,e.openBlock)(),(0,e.createElementBlock)(`div`,null,[(0,e.createElementVNode)(`div`,E,[(0,e.createVNode)(T,{"start-color":t.startColor,"end-color":t.endColor},null,8,[`start-color`,`end-color`])]),(0,e.createElementVNode)(`div`,D,[(0,e.createVNode)(b,{"start-color":t.endColor,"end-color":t.startColor},null,8,[`start-color`,`end-color`])])]))}}),[[`__scopeId`,`data-v-7774e47e`]]);O.install=e=>{e.component(O.name,O)};var k=[o,l,f,h,O],A={install:e=>{k.map(t=>t.install(e))}};exports.HBitsGalaxy=o,exports.HBitsPrismaticBurst=l,exports.HBitsThreads=f,exports.HParticles=h,exports.HSignInBackground=O,exports.default=A;
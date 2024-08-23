import{d as Ye,r as We}from"./npm-min-dom-Bq-NsQKJ.js";import{i as $e,r as Ze,b as qe}from"./npm-bpmn-js-DpW1nqYr.js";import{i as ze}from"./npm-diagram-js-DM_6UXB0.js";const ke=`
<path d="M1.3 3.4c.3 0 .5-.2.5-.5s-.2-.4-.5-.4c-.2 0-.4.1-.4.4 0 .3.2.5.4.5zM3 3.4c.2 0 .4-.2.4-.5s-.2-.4-.4-.4c-.3 0-.5.1-.5.4 0 .3.2.5.5.5zM4.6 3.4c.2 0 .4-.2.4-.5s-.2-.4-.4-.4c-.3 0-.5.1-.5.4 0 .3.2.5.5.5z"/>
`,Je=`
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.8125 11.0069C14.7767 11.0079 13.7689 11.343 12.9388 11.9625L10.0375 9.06127C10.6643 8.2372 11.0026 7.22976 11 6.19439C11.0056 3.96215 9.47542 2.01909 7.30408 1.50118C5.13274 0.983268 2.89029 2.02648 1.88772 4.02092C0.885144 6.01536 1.38567 8.43742 3.09667 9.87109C4.80766 11.3048 7.27994 11.3737 9.06813 10.0375L11.9625 12.9388C10.6267 14.7264 10.6952 17.1979 12.1278 18.9089C13.5605 20.6199 15.9814 21.1216 17.976 20.1207C19.9706 19.1199 21.0155 16.8791 20.5 14.7079C19.9846 12.5366 18.0441 11.0045 15.8125 11.0069ZM2.75001 6.19439C2.75001 4.29591 4.28903 2.75689 6.18751 2.75689C8.08599 2.75689 9.62501 4.29591 9.62501 6.19439C9.62501 8.09287 8.08599 9.63189 6.18751 9.63189C4.28903 9.63189 2.75001 8.09287 2.75001 6.19439Z" fill="#22242A"/>
</svg>
`,Xe="data:image/svg+xml;utf8,"+encodeURIComponent(Je),Qe=`
<svg width="22" height="22" viewBox="0 0 5.82 5.82" xmlns="http://www.w3.org/2000/svg">
  ${ke}
</svg>
`,et="data:image/svg+xml;utf8,"+encodeURIComponent(Qe),tt=`
<svg width="46" height="46" viewBox="-2 -2 9.82 9.82" xmlns="http://www.w3.org/2000/svg">
  ${ke}
</svg>
`,nt="data:image/svg+xml;utf8,"+encodeURIComponent(tt),me=499;function k(e,t,n,a,o,i,c,l,s,h){this._create=n,this._contextPad=a,this._translate=o,this._elementTemplatesLoader=i,this._replaceMenu=c,this._appendMenu=l,this._createMenu=s,this._autoPlace=t.get("autoPlace",!1),this._config=e,a.registerProvider(me,this),this._isAppendAnything()&&h.registerProvider(me,this)}k.$inject=["config.connectorsExtension","injector","create","contextPad","translate","elementTemplatesLoader","replaceMenu","appendMenu","createMenu","palette"];k.prototype.loadTemplates=function(e){this._elementTemplatesLoader.setTemplates(e)};k.prototype._isAppendAnything=function(){return this._config&&this._config.appendAnything||!1};k.prototype._getReplaceMenuPosition=function(e){var t=5,n=this._contextPad.getPad(e).html,a=n.getBoundingClientRect(),o={x:a.left,y:a.bottom+t};return o};k.prototype._getAppendMenuPosition=function(e){var t=5,n=this._contextPad.getPad(e).html,a=n.getBoundingClientRect(),o={x:a.right+t,y:a.top};return o};k.prototype.appendAnything=function(e,t){const n=this._appendMenu;if(n.isEmpty(t))return;const a={...this._getAppendMenuPosition(t),cursor:e&&{x:e.x,y:e.y}};return n.open(t,a).then(o=>{if(!o)return;const{event:i,newElement:c,dragstart:l=!1}=o,s=(r,g,m)=>{this._create.start(r,m,{source:g})};(!l&&this._autoPlace?(r,g,m)=>{this._autoPlace.append(g,m)}:s)(i,t,c)}).catch(o=>{})};k.prototype.replaceAnything=function(e,t){const n=this._replaceMenu;if(n.isEmpty(t))return;const a={...this._getReplaceMenuPosition(t),cursor:e&&{x:e.x,y:e.y}};return n.open(t,a).catch(o=>{})};k.prototype.createAnything=function(e,t){return this._createMenu.open(e,t).then(n=>{const{event:a,newElement:o}=n;this._create.start(a instanceof MouseEvent?a:e,o)}).catch(n=>{})};k.prototype.getContextPadEntries=function(e){const t=this._replaceMenu,n=this._translate;return e.labelTarget?null:a=>{if(t.isEmpty(e)){const{replace:o,...i}=a;a=i}else a={...a},a.replace={group:"edit",className:"bpmn-icon-screw-wrench",title:n("Change type"),action:{click:(o,i)=>{this.replaceAnything(o,i)}}};return a["append.append-task"]&&(a={...a},this._isAppendAnything()?a["append-anything"]={group:"model",imageUrl:et,title:n("Append anything"),action:{click:(i,c)=>{this.appendAnything(i,c)}}}:a["append-connector"]={group:"model",imageUrl:Xe,title:n("Append Connector"),action:{click:(i,c)=>{this.appendAnything(i,c)}}}),a}};k.prototype.getPaletteEntries=function(){return{"create-anything":{group:"anything",imageUrl:nt,title:this._translate("Create anything"),action:{click:e=>{const t=e&&{x:e.x,y:e.y},n=e&&{x:t.x+35,y:t.y+10,cursor:t};this.createAnything(e,n)}}}}};function le(e,t,n,a){this._injector=e,this._selection=t,this._connectorsExtension=n,this._mouse=a;const o=e.get("keyboard",!1);o&&this.registerKeyboardBindings(o)}le.$inject=["injector","selection","connectorsExtension","mouse"];le.prototype.registerKeyboardBindings=function(e){const t=this._connectorsExtension,n=this._selection,a=this._mouse;function o(){const i=n.get(),c=i[0];return i.length!==1||ze(c)?null:c}e.addListener(i=>{var c=i.keyEvent;if(!e.hasModifier(c)){var l=a.getLastMoveEvent(),s=o();if(e.isKey(["r","R"],c)&&s)return t.replaceAnything(l,s),!0;if(e.isKey(["n","N"],c))return t.createAnything(l),!0;if(e.isKey(["a","A"],c))return s?t.appendAnything(l,s):t.createAnything(l),!0}})};var Q,y,xe,B,ue,z={},De=[],at=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function S(e,t){for(var n in t)e[n]=t[n];return e}function Me(e){var t=e.parentNode;t&&t.removeChild(e)}function Ae(e,t,n){var a,o,i,c={};for(i in t)i=="key"?a=t[i]:i=="ref"?o=t[i]:c[i]=t[i];if(arguments.length>2&&(c.children=arguments.length>3?Q.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(i in e.defaultProps)c[i]===void 0&&(c[i]=e.defaultProps[i]);return Y(e,c,a,o,null)}function Y(e,t,n,a,o){var i={type:e,props:t,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o??++xe};return o==null&&y.vnode!=null&&y.vnode(i),i}function ee(e){return e.children}function W(e,t){this.props=e,this.context=t}function O(e,t){if(t==null)return e.__?O(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?O(e):null}function Se(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=e.__c.base=n.__e;break}return Se(e)}}function de(e){(!e.__d&&(e.__d=!0)&&B.push(e)&&!J.__r++||ue!==y.debounceRendering)&&((ue=y.debounceRendering)||setTimeout)(J)}function J(){for(var e;J.__r=B.length;)e=B.sort(function(t,n){return t.__v.__b-n.__v.__b}),B=[],e.some(function(t){var n,a,o,i,c,l;t.__d&&(c=(i=(n=t).__v).__e,(l=n.__P)&&(a=[],(o=S({},i)).__v=i.__v+1,pe(l,i,o,n.__n,l.ownerSVGElement!==void 0,i.__h!=null?[c]:null,a,c??O(i),i.__h),Le(a,i),i.__e!=c&&Se(i)))})}function Pe(e,t,n,a,o,i,c,l,s,h){var r,g,m,p,_,u,f,d=a&&a.__k||De,v=d.length;for(n.__k=[],r=0;r<t.length;r++)if((p=n.__k[r]=(p=t[r])==null||typeof p=="boolean"?null:typeof p=="string"||typeof p=="number"||typeof p=="bigint"?Y(null,p,null,null,p):Array.isArray(p)?Y(ee,{children:p},null,null,null):p.__b>0?Y(p.type,p.props,p.key,p.ref?p.ref:null,p.__v):p)!=null){if(p.__=n,p.__b=n.__b+1,(m=d[r])===null||m&&p.key==m.key&&p.type===m.type)d[r]=void 0;else for(g=0;g<v;g++){if((m=d[g])&&p.key==m.key&&p.type===m.type){d[g]=void 0;break}m=null}pe(e,p,m=m||z,o,i,c,l,s,h),_=p.__e,(g=p.ref)&&m.ref!=g&&(f||(f=[]),m.ref&&f.push(m.ref,null,p),f.push(g,p.__c||_,p)),_!=null?(u==null&&(u=_),typeof p.type=="function"&&p.__k===m.__k?p.__d=s=Re(p,s,e):s=Ie(e,p,m,d,_,s),typeof n.type=="function"&&(n.__d=s)):s&&m.__e==s&&s.parentNode!=e&&(s=O(m))}for(n.__e=u,r=v;r--;)d[r]!=null&&Oe(d[r],d[r]);if(f)for(r=0;r<f.length;r++)Be(f[r],f[++r],f[++r])}function Re(e,t,n){for(var a,o=e.__k,i=0;o&&i<o.length;i++)(a=o[i])&&(a.__=e,t=typeof a.type=="function"?Re(a,t,n):Ie(n,a,a,o,a.__e,t));return t}function Ie(e,t,n,a,o,i){var c,l,s;if(t.__d!==void 0)c=t.__d,t.__d=void 0;else if(n==null||o!=i||o.parentNode==null)e:if(i==null||i.parentNode!==e)e.appendChild(o),c=null;else{for(l=i,s=0;(l=l.nextSibling)&&s<a.length;s+=1)if(l==o)break e;e.insertBefore(o,i),c=i}return c!==void 0?c:o.nextSibling}function it(e,t,n,a,o){var i;for(i in n)i==="children"||i==="key"||i in t||X(e,i,null,n[i],a);for(i in t)o&&typeof t[i]!="function"||i==="children"||i==="key"||i==="value"||i==="checked"||n[i]===t[i]||X(e,i,t[i],n[i],a)}function he(e,t,n){t[0]==="-"?e.setProperty(t,n):e[t]=n==null?"":typeof n!="number"||at.test(t)?n:n+"px"}function X(e,t,n,a,o){var i;e:if(t==="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof a=="string"&&(e.style.cssText=a=""),a)for(t in a)n&&t in n||he(e.style,t,"");if(n)for(t in n)a&&n[t]===a[t]||he(e.style,t,n[t])}else if(t[0]==="o"&&t[1]==="n")i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?a||e.addEventListener(t,i?ge:fe,i):e.removeEventListener(t,i?ge:fe,i);else if(t!=="dangerouslySetInnerHTML"){if(o)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!=="href"&&t!=="list"&&t!=="form"&&t!=="tabIndex"&&t!=="download"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&t.indexOf("-")==-1?e.removeAttribute(t):e.setAttribute(t,n))}}function fe(e){this.l[e.type+!1](y.event?y.event(e):e)}function ge(e){this.l[e.type+!0](y.event?y.event(e):e)}function pe(e,t,n,a,o,i,c,l,s){var h,r,g,m,p,_,u,f,d,v,b,x,j,K,F,w=t.type;if(t.constructor!==void 0)return null;n.__h!=null&&(s=n.__h,l=t.__e=n.__e,t.__h=null,i=[l]),(h=y.__b)&&h(t);try{e:if(typeof w=="function"){if(f=t.props,d=(h=w.contextType)&&a[h.__c],v=h?d?d.props.value:h.__:a,n.__c?u=(r=t.__c=n.__c).__=r.__E:("prototype"in w&&w.prototype.render?t.__c=r=new w(f,v):(t.__c=r=new W(f,v),r.constructor=w,r.render=ot),d&&d.sub(r),r.props=f,r.state||(r.state={}),r.context=v,r.__n=a,g=r.__d=!0,r.__h=[],r._sb=[]),r.__s==null&&(r.__s=r.state),w.getDerivedStateFromProps!=null&&(r.__s==r.state&&(r.__s=S({},r.__s)),S(r.__s,w.getDerivedStateFromProps(f,r.__s))),m=r.props,p=r.state,g)w.getDerivedStateFromProps==null&&r.componentWillMount!=null&&r.componentWillMount(),r.componentDidMount!=null&&r.__h.push(r.componentDidMount);else{if(w.getDerivedStateFromProps==null&&f!==m&&r.componentWillReceiveProps!=null&&r.componentWillReceiveProps(f,v),!r.__e&&r.shouldComponentUpdate!=null&&r.shouldComponentUpdate(f,r.__s,v)===!1||t.__v===n.__v){for(r.props=f,r.state=r.__s,t.__v!==n.__v&&(r.__d=!1),r.__v=t,t.__e=n.__e,t.__k=n.__k,t.__k.forEach(function(G){G&&(G.__=t)}),b=0;b<r._sb.length;b++)r.__h.push(r._sb[b]);r._sb=[],r.__h.length&&c.push(r);break e}r.componentWillUpdate!=null&&r.componentWillUpdate(f,r.__s,v),r.componentDidUpdate!=null&&r.__h.push(function(){r.componentDidUpdate(m,p,_)})}if(r.context=v,r.props=f,r.__v=t,r.__P=e,x=y.__r,j=0,"prototype"in w&&w.prototype.render){for(r.state=r.__s,r.__d=!1,x&&x(t),h=r.render(r.props,r.state,r.context),K=0;K<r._sb.length;K++)r.__h.push(r._sb[K]);r._sb=[]}else do r.__d=!1,x&&x(t),h=r.render(r.props,r.state,r.context),r.state=r.__s;while(r.__d&&++j<25);r.state=r.__s,r.getChildContext!=null&&(a=S(S({},a),r.getChildContext())),g||r.getSnapshotBeforeUpdate==null||(_=r.getSnapshotBeforeUpdate(m,p)),F=h!=null&&h.type===ee&&h.key==null?h.props.children:h,Pe(e,Array.isArray(F)?F:[F],t,n,a,o,i,c,l,s),r.base=t.__e,t.__h=null,r.__h.length&&c.push(r),u&&(r.__E=r.__=null),r.__e=!1}else i==null&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=rt(n.__e,t,n,a,o,i,c,s);(h=y.diffed)&&h(t)}catch(G){t.__v=null,(s||i!=null)&&(t.__e=l,t.__h=!!s,i[i.indexOf(l)]=null),y.__e(G,t,n)}}function Le(e,t){y.__c&&y.__c(t,e),e.some(function(n){try{e=n.__h,n.__h=[],e.some(function(a){a.call(n)})}catch(a){y.__e(a,n.__v)}})}function rt(e,t,n,a,o,i,c,l){var s,h,r,g=n.props,m=t.props,p=t.type,_=0;if(p==="svg"&&(o=!0),i!=null){for(;_<i.length;_++)if((s=i[_])&&"setAttribute"in s==!!p&&(p?s.localName===p:s.nodeType===3)){e=s,i[_]=null;break}}if(e==null){if(p===null)return document.createTextNode(m);e=o?document.createElementNS("http://www.w3.org/2000/svg",p):document.createElement(p,m.is&&m),i=null,l=!1}if(p===null)g===m||l&&e.data===m||(e.data=m);else{if(i=i&&Q.call(e.childNodes),h=(g=n.props||z).dangerouslySetInnerHTML,r=m.dangerouslySetInnerHTML,!l){if(i!=null)for(g={},_=0;_<e.attributes.length;_++)g[e.attributes[_].name]=e.attributes[_].value;(r||h)&&(r&&(h&&r.__html==h.__html||r.__html===e.innerHTML)||(e.innerHTML=r&&r.__html||""))}if(it(e,m,g,o,l),r)t.__k=[];else if(_=t.props.children,Pe(e,Array.isArray(_)?_:[_],t,n,a,o&&p!=="foreignObject",i,c,i?i[0]:n.__k&&O(n,0),l),i!=null)for(_=i.length;_--;)i[_]!=null&&Me(i[_]);l||("value"in m&&(_=m.value)!==void 0&&(_!==e.value||p==="progress"&&!_||p==="option"&&_!==g.value)&&X(e,"value",_,g.value,!1),"checked"in m&&(_=m.checked)!==void 0&&_!==e.checked&&X(e,"checked",_,g.checked,!1))}return e}function Be(e,t,n){try{typeof e=="function"?e(t):e.current=t}catch(a){y.__e(a,n)}}function Oe(e,t,n){var a,o;if(y.unmount&&y.unmount(e),(a=e.ref)&&(a.current&&a.current!==e.__e||Be(a,null,t)),(a=e.__c)!=null){if(a.componentWillUnmount)try{a.componentWillUnmount()}catch(i){y.__e(i,t)}a.base=a.__P=null,e.__c=void 0}if(a=e.__k)for(o=0;o<a.length;o++)a[o]&&Oe(a[o],t,n||typeof e.type!="function");n||e.__e==null||Me(e.__e),e.__=e.__e=e.__d=void 0}function ot(e,t,n){return this.constructor(e,n)}function Ue(e,t,n){var a,o,i;y.__&&y.__(e,t),o=(a=typeof n=="function")?null:t.__k,i=[],pe(t,e=(!a&&n||t).__k=Ae(ee,null,[e]),o||z,z,t.ownerSVGElement!==void 0,!a&&n?[n]:o?null:t.firstChild?Q.call(t.childNodes):null,i,!a&&n?n:o?o.__e:t.firstChild,a),Le(i,e)}Q=De.slice,y={__e:function(e,t,n,a){for(var o,i,c;t=t.__;)if((o=t.__c)&&!o.__)try{if((i=o.constructor)&&i.getDerivedStateFromError!=null&&(o.setState(i.getDerivedStateFromError(e)),c=o.__d),o.componentDidCatch!=null&&(o.componentDidCatch(e,a||{}),c=o.__d),c)return o.__E=o}catch(l){e=l}throw e}},xe=0,W.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=S({},this.state),typeof e=="function"&&(e=e(S({},n),this.props)),e&&S(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),de(this))},W.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),de(this))},W.prototype.render=ee,B=[],J.__r=0;var He=function(e,t,n,a){var o;t[0]=0;for(var i=1;i<t.length;i++){var c=t[i++],l=t[i]?(t[0]|=c?1:2,n[t[i++]]):t[++i];c===3?a[0]=l:c===4?a[1]=Object.assign(a[1]||{},l):c===5?(a[1]=a[1]||{})[t[++i]]=l:c===6?a[1][t[++i]]+=l+"":c?(o=e.apply(l,He(e,l,n,["",null])),a.push(o),l[0]?t[0]|=2:(t[i-2]=0,t[i]=o)):a.push(l)}return a},ye=new Map;function ct(e){var t=ye.get(this);return t||(t=new Map,ye.set(this,t)),(t=He(this,t.get(e)||(t.set(e,t=function(n){for(var a,o,i=1,c="",l="",s=[0],h=function(m){i===1&&(m||(c=c.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(0,m,c):i===3&&(m||c)?(s.push(3,m,c),i=2):i===2&&c==="..."&&m?s.push(4,m,0):i===2&&c&&!m?s.push(5,0,!0,c):i>=5&&((c||!m&&i===5)&&(s.push(i,0,c,o),i=6),m&&(s.push(i,m,0,o),i=6)),c=""},r=0;r<n.length;r++){r&&(i===1&&h(),h(r));for(var g=0;g<n[r].length;g++)a=n[r][g],i===1?a==="<"?(h(),s=[s],i=3):c+=a:i===4?c==="--"&&a===">"?(i=1,c=""):c=a+c[0]:l?a===l?l="":c+=a:a==='"'||a==="'"?l=a:a===">"?(h(),i=1):i&&(a==="="?(i=5,o=c,c=""):a==="/"&&(i<5||n[r][g+1]===">")?(h(),i===3&&(s=s[0]),i=s,(s=s[0]).push(2,0,i),i=0):a===" "||a==="	"||a===`
`||a==="\r"?(h(),i=2):c+=a),i===3&&c==="!--"&&(i=4,s=s[0])}return h(),s}(e)),t),arguments,[])).length>1?t:t[0]}var E=ct.bind(Ae),H,T,ce,ve,U=0,Ve=[],Z=[],be=y.__b,Ee=y.__r,Te=y.diffed,we=y.__c,Ce=y.unmount;function te(e,t){y.__h&&y.__h(T,e,U||t),U=0;var n=T.__H||(T.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({__V:Z}),n.__[e]}function C(e){return U=1,st(Ke,e)}function st(e,t,n){var a=te(H++,2);if(a.t=e,!a.__c&&(a.__=[Ke(void 0,t),function(i){var c=a.__N?a.__N[0]:a.__[0],l=a.t(c,i);c!==l&&(a.__N=[l,a.__[1]],a.__c.setState({}))}],a.__c=T,!T.u)){T.u=!0;var o=T.shouldComponentUpdate;T.shouldComponentUpdate=function(i,c,l){if(!a.__c.__H)return!0;var s=a.__c.__H.__.filter(function(r){return r.__c});if(s.every(function(r){return!r.__N}))return!o||o.call(this,i,c,l);var h=!1;return s.forEach(function(r){if(r.__N){var g=r.__[0];r.__=r.__N,r.__N=void 0,g!==r.__[0]&&(h=!0)}}),!(!h&&a.__c.props===i)&&(!o||o.call(this,i,c,l))}}return a.__N||a.__}function ne(e,t){var n=te(H++,3);!y.__s&&_e(n.__H,t)&&(n.__=e,n.i=t,T.__H.__h.push(n))}function D(e,t){var n=te(H++,4);!y.__s&&_e(n.__H,t)&&(n.__=e,n.i=t,T.__h.push(n))}function M(e){return U=5,je(function(){return{current:e}},[])}function je(e,t){var n=te(H++,7);return _e(n.__H,t)?(n.__V=e(),n.i=t,n.__h=e,n.__V):n.__}function N(e,t){return U=8,je(function(){return e},t)}function lt(){for(var e;e=Ve.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(q),e.__H.__h.forEach(se),e.__H.__h=[]}catch(t){e.__H.__h=[],y.__e(t,e.__v)}}y.__b=function(e){T=null,be&&be(e)},y.__r=function(e){Ee&&Ee(e),H=0;var t=(T=e.__c).__H;t&&(ce===T?(t.__h=[],T.__h=[],t.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=Z,n.__N=n.i=void 0})):(t.__h.forEach(q),t.__h.forEach(se),t.__h=[])),ce=T},y.diffed=function(e){Te&&Te(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Ve.push(t)!==1&&ve===y.requestAnimationFrame||((ve=y.requestAnimationFrame)||pt)(lt)),t.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==Z&&(n.__=n.__V),n.i=void 0,n.__V=Z})),ce=T=null},y.__c=function(e,t){t.some(function(n){try{n.__h.forEach(q),n.__h=n.__h.filter(function(a){return!a.__||se(a)})}catch(a){t.some(function(o){o.__h&&(o.__h=[])}),t=[],y.__e(a,n.__v)}}),we&&we(e,t)},y.unmount=function(e){Ce&&Ce(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(a){try{q(a)}catch(o){t=o}}),n.__H=void 0,t&&y.__e(t,n.__v))};var Ne=typeof requestAnimationFrame=="function";function pt(e){var t,n=function(){clearTimeout(a),Ne&&cancelAnimationFrame(t),setTimeout(e)},a=setTimeout(n,100);Ne&&(t=requestAnimationFrame(n))}function q(e){var t=T,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),T=t}function se(e){var t=T;e.__c=e.__(),T=t}function _e(e,t){return!e||e.length!==t.length||t.some(function(n,a){return n!==e[a]})}function Ke(e,t){return typeof t=="function"?t(e):t}function Fe(e){var t,n,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=Fe(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}function P(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=Fe(e))&&(a&&(a+=" "),a+=t);return a}function $(e,t){this._eventBus=t,this._container=this._createContainer({}),t.on("diagram.destroy",()=>{this._destroy()}),t.on("element.changed",n=>{const a=this._open&&this._open.element;n.element===a&&this._refresh()}),t.on("changeMenu.open",()=>{const n=e.get("directEditing",!1);n&&n.complete();const a=e.get("popupMenu",!1);a&&a.close()})}$.$inject=["injector","eventBus"];$.prototype._refresh=function(){const{renderFn:e,position:t,className:n}=this._open,a=t&&(i=>this._ensureVisible(i,t)),o=i=>this.close(i);Ue(E`
      <${_t}
        onClose=${o}
        position=${a}
        className=${n}
      >
        ${e(o)}
      </${$}>
    `,this._container)};$.prototype.open=function(e,t={}){const{position:n,className:a,element:o}=t;this._open&&this.close();const{promise:i,resolve:c}=mt();return this._open={renderFn:e,promise:i,resolve:c,position:n,className:a,element:o},this._emit("open"),this._refresh(),this._open.promise};$.prototype.close=function(e){const t=this._open;t&&(this._emit("close"),this.reset(),this._open=null,t&&t.resolve(e))};$.prototype.reset=function(){Ue(null,this._container)};$.prototype._emit=function(e,t){this._eventBus.fire(`changeMenu.${e}`,t)};$.prototype._createContainer=function(e){let t=e&&e.parent||"body";typeof t=="string"&&(t=document.querySelector(t));const n=Ye('<div class="cmd-change-menu-parent"></div>');return t.appendChild(n),n};$.prototype._destroy=function(){We(this._container)};$.prototype._ensureVisible=function(e,t){var n=document.documentElement.getBoundingClientRect(),a=e.getBoundingClientRect(),o={},i=t.x,c=t.y;return t.x+a.width>n.width&&(o.x=!0),t.y+a.height>n.height&&(o.y=!0),o.x&&o.y?(i=t.x-a.width,c=t.y-a.height):o.x?(i=t.x-a.width,c=t.y):o.y&&t.y<a.height?(i=t.x,c=10):o.y&&(i=t.x,c=t.y-a.height),{x:i,y:c}};function _t(e){const{children:t,onClose:n,className:a}=e,o=M();return D(()=>{if(typeof e.position!="function")return;const i=o.current,c=e.position(i);i.style.left=`${c.x}px`,i.style.top=`${c.y}px`},[o.current,e.position]),E`
    <div class=${P("cmd-change-menu",a)}>
      <div class="cmd-change-menu__backdrop" onClick=${()=>n()}></div>
      <div class="cmd-change-menu__overlay" ref=${o}>
        ${t}
      </div>
    </div>
  `}function mt(){var e,t,n=new Promise((a,o)=>{e=a,t=o});return{promise:n,resolve:e,reject:t}}var ut={__init__:["changeMenu"],changeMenu:["type",$]};function ae(e){typeof e.scrollIntoViewIfNeeded=="function"?e.scrollIntoViewIfNeeded():e.scrollIntoView({scrollMode:"if-needed",block:"nearest"})}function ie(e){return e&&/^(https?|data):/.test(e)?e:null}function re(e){const{template:t,lastTemplate:n,selected:a,showCategories:o=!0,...i}=e;return E`
    ${o&&dt(t,n)&&t.category&&E`
      <li
        key=${t.category.id}
        class="cmd-change-menu__entry_header"
      >${t.category.name}</li>
    `}

    <li
      class=${P("cmd-change-menu__entry",{selected:a})}
      data-entry-id=${t.id}
      ...${i}
    >
      <div class="cmd-change-menu__entry-content">
        <span
          class=${P("cmd-change-menu__name",t.className)}
          title=${t.label||t.name}
        >
          ${t.imageUrl&&E`
            <img class="cmd-change-menu__entry-icon" src=${t.imageUrl} />
          `}

          ${t.label||t.name}
        </span>
        ${t.description&&E`
          <span class="cmd-change-menu__description" title="${t.description}">
            ${t.description}
          </span>
        `}
      </div>

      ${t.documentationRef&&E`
        <div class="cmd-change-menu__entry-help">
          <a
            href="${t.documentationRef}"
            onClick=${c=>c.stopPropagation()}
            title="Open element documentation"
            target="_blank"
            rel="noopener"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6368 10.6375V5.91761H11.9995V10.6382C11.9995 10.9973 11.8623 11.3141 11.5878 11.5885C11.3134 11.863 10.9966 12.0002 10.6375 12.0002H1.36266C0.982345 12.0002 0.660159 11.8681 0.396102 11.6041C0.132044 11.34 1.52588e-05 11.0178 1.52588e-05 10.6375V1.36267C1.52588e-05 0.98236 0.132044 0.660173 0.396102 0.396116C0.660159 0.132058 0.982345 2.95639e-05 1.36266 2.95639e-05H5.91624V1.36267H1.36266V10.6375H10.6368ZM12 0H7.2794L7.27873 1.36197H9.68701L3.06507 7.98391L4.01541 8.93425L10.6373 2.31231V4.72059H12V0Z" fill="#818798"/>
            </svg>
          </a>
        </div>
      `}
    </li>
  `}function dt(e,t){const n=e&&e.category,a=t&&t.category;return(n&&n.id)!=(a&&a.id)}function L(e,t,n,a){this._changeMenu=a,this._elementTemplates=n,(!e||e.elementTemplateChooser!==!1)&&t.on("elementTemplates.select",i=>{const{element:c}=i,l=this._getMatchingTemplates(c);this.open(l).then(s=>{this._applyTemplate(c,s)}).catch(s=>{})})}L.$inject=["config.connectorsExtension","eventBus","elementTemplates","changeMenu"];L.prototype._applyTemplate=function(e,t){this._elementTemplates.applyTemplate(e,t)};L.prototype._getMatchingTemplates=function(e){return this._elementTemplates.getLatest().filter(t=>$e(e,t.appliesTo))};L.prototype._toEntries=function(e){return e.map(t=>{const{icon:n={}}=t;return{...t,imageUrl:ie(n.contents)}})};L.prototype.open=function(e){const t=n=>E`
    <${ht}
      entries=${this._toEntries(e)}
      onClose=${n}
    />
  `;return this._changeMenu.open(t,{className:"cmd-element-template-chooser"})};function ht(e){const{onClose:t}=e,n=M(),a=M(),[o,i]=C(""),[c,l]=C(e.entries),[s,h]=C(c[0]);ne(()=>{const p=u=>o?[u.name,u.description||"",u.search||""].join("---").toLowerCase().includes(o.toLowerCase()):!0,_=e.entries.filter(p);_.includes(s)||h(_[0]),l(_)},[o,s,e.entries]),D(()=>{n.current.focus()},[]),D(()=>{const _=a.current.querySelector(".selected");_&&ae(_)},[s]);const r=N(p=>{let u=c.indexOf(s)+p;u<0&&(u=c.length-1),u>=c.length&&(u=0),h(c[u])},[c,s]),g=N(p=>{if(p.key==="Enter"&&s)return t(s);if(p.key==="Escape")return t();if(p.key==="ArrowUp"||p.key==="Tab"&&p.shiftKey)return r(-1),p.preventDefault();if(p.key==="ArrowDown"||p.key==="Tab")return r(1),p.preventDefault()},[s,r]),m=N(p=>{i(()=>p.target.value)},[]);return E`
    <div class="cmd-change-menu__header">
      <h3 class="cmd-change-menu__title">
        Choose element template
      </h3>
    </div>

    <div class="cmd-change-menu__body">
      <div class=${P("cmd-change-menu__search",{hidden:e.entries.length<5})}>
        <svg class="cmd-change-menu__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0325 8.5H9.625L13.3675 12.25L12.25 13.3675L8.5 9.625V9.0325L8.2975 8.8225C7.4425 9.5575 6.3325 10 5.125 10C2.4325 10 0.25 7.8175 0.25 5.125C0.25 2.4325 2.4325 0.25 5.125 0.25C7.8175 0.25 10 2.4325 10 5.125C10 6.3325 9.5575 7.4425 8.8225 8.2975L9.0325 8.5ZM1.75 5.125C1.75 6.9925 3.2575 8.5 5.125 8.5C6.9925 8.5 8.5 6.9925 8.5 5.125C8.5 3.2575 6.9925 1.75 5.125 1.75C3.2575 1.75 1.75 3.2575 1.75 5.125Z" fill="#22242A"/>
        </svg>

        <input
          ref=${n}
          type="text"
          onKeyup=${m}
          onKeydown=${g}
        />
      </div>

      <ul class="cmd-change-menu__results" ref=${a}>
        ${c.map((p,_)=>E`

          <${re}
            key=${p.id}
            template=${p}
            lastTemplate=${c[_-1]}
            selected=${p===s}
            onMouseEnter=${()=>h(p)}
            onClick=${()=>t(p)}
          />

        `)}

        ${!c.length&&E`
          <li class="cmd-change-menu__muted-entry">No template found</li>
        `}
      </ul>
    </div>
  `}var ft={__init__:["elementTemplateChooser"],elementTemplateChooser:["type",L]};const gt="bpmn-replace";function R(e,t,n){this._elementTemplates=e,this._popupMenu=t,this._changeMenu=n}R.$inject=["elementTemplates","popupMenu","changeMenu"];R.prototype._getMatchingTemplates=function(e){return this._elementTemplates.getLatest().filter(t=>$e(e,t.appliesTo))};R.prototype._applyTemplate=function(e,t){this._elementTemplates.applyTemplate(e,t)};R.prototype._getTemplateEntries=function(e){return this._getMatchingTemplates(e).map(n=>{const{id:a,name:o,description:i,category:c={id:"templates",name:"Templates"},icon:l={},search:s,documentationRef:h}=n;return{name:o,description:i,id:`replace.template-${a}`,category:c,imageUrl:ie(l.contents),search:s,documentationRef:h,action:()=>{this._applyTemplate(e,n)}}})};R.prototype._getContext=function(e){const t=this._popupMenu._getProviders(gt),n=this._popupMenu._getHeaderEntries(e,t),a=this._popupMenu._getEntries(e,t),o=this._getTemplateEntries(e).reduce((c,l)=>(c[l.id]=l,c),{}),i=Object.entries({...a,...o}).map(([c,l])=>({id:c,...l}));return{entries:i,headerEntries:n,empty:!(i.length||Object.keys(n).length)}};R.prototype.open=function(e,t){const n=a=>{const{entries:o,headerEntries:i}=this._getContext(e);return E`
      <${yt}
        entries=${o}
        headerEntries=${i}
        onClose=${a}
      />
    `};return this._changeMenu.open(n,{className:"cmd-replace-menu",element:e,position:t}).catch(a=>{})};R.prototype.isEmpty=function(e){return this._getContext(e).empty};function yt(e){const{onClose:t}=e,n=(_,u,f=!0)=>{u.action(_,u),f&&t()},a=M(),o=M(),[i,c]=C(""),[l,s]=C(e.entries),[h,r]=C(l[0]);ne(()=>{const _=f=>{if(!i)return!0;const d=[f.name&&"connector"||"",f.name,f.description||"",f.label||"",f.search||""].join("---").toLowerCase();return i.toLowerCase().split(/\s/g).every(v=>d.includes(v))},u=e.entries.filter(_);u.includes(h)||r(u[0]),s(u)},[i,h,e.templates]),D(()=>{a.current.focus()},[]),D(()=>{const u=o.current.querySelector(".selected");u&&ae(u)},[h]);const g=N(_=>{let f=l.indexOf(h)+_;f<0&&(f=l.length-1),f>=l.length&&(f=0),r(l[f])},[l,h]),m=N(_=>{if(_.key==="Enter"&&h)return n(_,h);if(_.key==="Escape")return t();if(_.key==="ArrowUp"||_.key==="Tab"&&_.shiftKey)return g(-1),_.preventDefault();if(_.key==="ArrowDown"||_.key==="Tab")return g(1),_.preventDefault()},[h,g]),p=N(_=>{c(()=>_.target.value)},[]);return E`
  <div class="cmd-change-menu__header">
    <h3 class="cmd-change-menu__title">
      Change element
    </h3>
    ${Object.entries(e.headerEntries).map(([_,u])=>E`
      <span
        class=${P("cmd-change-menu__header-entry",u.className,{active:u.active})}
        onClick=${f=>n(f,u,!1)}
        title=${`Toggle ${u.title}`}
      ></span>
    `)}
  </div>

  <div class="cmd-change-menu__body">
    <div class=${P("cmd-change-menu__search",{hidden:e.entries.length<5})}>
      <svg class="cmd-change-menu__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0325 8.5H9.625L13.3675 12.25L12.25 13.3675L8.5 9.625V9.0325L8.2975 8.8225C7.4425 9.5575 6.3325 10 5.125 10C2.4325 10 0.25 7.8175 0.25 5.125C0.25 2.4325 2.4325 0.25 5.125 0.25C7.8175 0.25 10 2.4325 10 5.125C10 6.3325 9.5575 7.4425 8.8225 8.2975L9.0325 8.5ZM1.75 5.125C1.75 6.9925 3.2575 8.5 5.125 8.5C6.9925 8.5 8.5 6.9925 8.5 5.125C8.5 3.2575 6.9925 1.75 5.125 1.75C3.2575 1.75 1.75 3.2575 1.75 5.125Z" fill="#22242A"/>
      </svg>

      <input
        ref=${a}
        type="text"
        onKeyup=${p}
        onKeydown=${m}
      />
    </div>

    <ul class="cmd-change-menu__results" ref=${o}>
      ${l.map((_,u)=>E`

        <${re}
          key=${_.id}
          template=${_}
          lastTemplate=${l[u-1]}
          selected=${_===h}
          onMouseEnter=${()=>r(_)}
          onClick=${f=>n(f,_)}
        />
      `)}

      ${!l.length&&E`
        <li class="cmd-change-menu__muted-entry">Nothing found</li>
      `}
    </ul>
  </div>
  `}const vt=Object.values(Ze).flat();function bt(e){return vt}const Et="bpmn-replace",Tt=100;function oe(e,t,n){this._elementTemplates=e,this._translate=n,t.registerProvider(Et,Tt,this)}oe.prototype._getUnlinkEntry=function(e,t){const n=this._elementTemplates,a=this._translate;if(!n.get(e))return;const i=bt(),c=(_,u)=>u.target&&!qe(_)(u),l=i.findIndex(_=>c(e,_));if(l===-1)return;const s=i[l],h={id:"replace-unlink-element-template",action:()=>{n.applyTemplate(e,null)},label:a(s.label),className:s.className},r=i[l-1],g=r&&t.find(([_])=>_===r.actionName);if(g)return[t.indexOf(g)+1,h];const m=i[l+1],p=m&&t.find(([_])=>_===m.actionName);return p?[t.indexOf(p),h]:[0,h]};oe.prototype.getPopupMenuEntries=function(e){return t=>{const n=Object.entries(t),a=this._getUnlinkEntry(e,n);if(!a)return t;const[o,i]=a;return n.splice(o,0,[i.id,i]),n.reduce((c,[l,s])=>(c[l]=s,c),{})}};oe.$inject=["elementTemplates","popupMenu","translate"];var wt={__init__:["unlinkEntryProvider"],replaceMenu:["type",R],unlinkEntryProvider:["type",oe]},V={id:"events",name:"Events"},Ct={id:"events",name:"Tasks"},Nt={id:"data",name:"Data"},$t={id:"participant",name:"Participants"},kt={id:"subprocess",name:"Sub Processes"},xt={id:"gateway",name:"Gateways"},Dt=[{label:"Start Event",actionName:"replace-non-start-event",className:"bpmn-icon-start-event-none",rating:-1,target:{type:"bpmn:StartEvent"}},{label:"Intermediate Throw Event",actionName:"replace-with-none-intermediate-throwing",className:"bpmn-icon-intermediate-event-none",rating:-1,target:{type:"bpmn:IntermediateThrowEvent"}},{label:"Boundary Event",actionName:"replace-with-boundary-event",className:"bpmn-icon-intermediate-event-none",rating:-1,target:{type:"bpmn:IntermediateThrowEvent"}},{label:"End Event",actionName:"replace-with-none-end",className:"bpmn-icon-end-event-none",rating:-1,target:{type:"bpmn:EndEvent"}}].map(e=>({...e,category:V})),Mt=[{label:"Message Start Event",actionName:"replace-with-message-start",className:"bpmn-icon-start-event-message",target:{type:"bpmn:StartEvent",eventDefinitionType:"bpmn:MessageEventDefinition"}},{label:"Timer Start Event",actionName:"replace-with-timer-start",className:"bpmn-icon-start-event-timer",target:{type:"bpmn:StartEvent",eventDefinitionType:"bpmn:TimerEventDefinition"}},{label:"Conditional Start Event",actionName:"replace-with-conditional-start",className:"bpmn-icon-start-event-condition",target:{type:"bpmn:StartEvent",eventDefinitionType:"bpmn:ConditionalEventDefinition"}},{label:"Signal Start Event",actionName:"replace-with-signal-start",className:"bpmn-icon-start-event-signal",target:{type:"bpmn:StartEvent",eventDefinitionType:"bpmn:SignalEventDefinition"}}].map(e=>({...e,category:V})),At=[{label:"Message Intermediate Catch Event",actionName:"replace-with-message-intermediate-catch",className:"bpmn-icon-intermediate-event-catch-message",target:{type:"bpmn:IntermediateCatchEvent",eventDefinitionType:"bpmn:MessageEventDefinition"}},{label:"Message Intermediate Throw Event",actionName:"replace-with-message-intermediate-throw",className:"bpmn-icon-intermediate-event-throw-message",target:{type:"bpmn:IntermediateThrowEvent",eventDefinitionType:"bpmn:MessageEventDefinition"}},{label:"Timer Intermediate Catch Event",actionName:"replace-with-timer-intermediate-catch",className:"bpmn-icon-intermediate-event-catch-timer",target:{type:"bpmn:IntermediateCatchEvent",eventDefinitionType:"bpmn:TimerEventDefinition"}},{label:"Escalation Intermediate Throw Event",actionName:"replace-with-escalation-intermediate-throw",className:"bpmn-icon-intermediate-event-throw-escalation",target:{type:"bpmn:IntermediateThrowEvent",eventDefinitionType:"bpmn:EscalationEventDefinition"}},{label:"Conditional Intermediate Catch Event",actionName:"replace-with-conditional-intermediate-catch",className:"bpmn-icon-intermediate-event-catch-condition",target:{type:"bpmn:IntermediateCatchEvent",eventDefinitionType:"bpmn:ConditionalEventDefinition"}},{label:"Link Intermediate Catch Event",actionName:"replace-with-link-intermediate-catch",className:"bpmn-icon-intermediate-event-catch-link",target:{type:"bpmn:IntermediateCatchEvent",eventDefinitionType:"bpmn:LinkEventDefinition",eventDefinitionAttrs:{name:""}}},{label:"Link Intermediate Throw Event",actionName:"replace-with-link-intermediate-throw",className:"bpmn-icon-intermediate-event-throw-link",target:{type:"bpmn:IntermediateThrowEvent",eventDefinitionType:"bpmn:LinkEventDefinition",eventDefinitionAttrs:{name:""}}},{label:"Compensation Intermediate Throw Event",actionName:"replace-with-compensation-intermediate-throw",className:"bpmn-icon-intermediate-event-throw-compensation",target:{type:"bpmn:IntermediateThrowEvent",eventDefinitionType:"bpmn:CompensateEventDefinition"}},{label:"Signal Intermediate Catch Event",actionName:"replace-with-signal-intermediate-catch",className:"bpmn-icon-intermediate-event-catch-signal",target:{type:"bpmn:IntermediateCatchEvent",eventDefinitionType:"bpmn:SignalEventDefinition"}},{label:"Signal Intermediate Throw Event",actionName:"replace-with-signal-intermediate-throw",className:"bpmn-icon-intermediate-event-throw-signal",target:{type:"bpmn:IntermediateThrowEvent",eventDefinitionType:"bpmn:SignalEventDefinition"}}].map(e=>({...e,category:V})),St=[{label:"Message Boundary Event",actionName:"replace-with-message-boundary",className:"bpmn-icon-intermediate-event-catch-message",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:MessageEventDefinition"}},{label:"Timer Boundary Event",actionName:"replace-with-timer-boundary",className:"bpmn-icon-intermediate-event-catch-timer",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:TimerEventDefinition"}},{label:"Escalation Boundary Event",actionName:"replace-with-escalation-boundary",className:"bpmn-icon-intermediate-event-catch-escalation",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:EscalationEventDefinition"}},{label:"Conditional Boundary Event",actionName:"replace-with-conditional-boundary",className:"bpmn-icon-intermediate-event-catch-condition",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:ConditionalEventDefinition"}},{label:"Error Boundary Event",actionName:"replace-with-error-boundary",className:"bpmn-icon-intermediate-event-catch-error",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:ErrorEventDefinition"}},{label:"Cancel Boundary Event",actionName:"replace-with-cancel-boundary",className:"bpmn-icon-intermediate-event-catch-cancel",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:CancelEventDefinition"}},{label:"Signal Boundary Event",actionName:"replace-with-signal-boundary",className:"bpmn-icon-intermediate-event-catch-signal",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:SignalEventDefinition"}},{label:"Compensation Boundary Event",actionName:"replace-with-compensation-boundary",className:"bpmn-icon-intermediate-event-catch-compensation",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:CompensateEventDefinition"}},{label:"Message Boundary Event (non-interrupting)",actionName:"replace-with-non-interrupting-message-boundary",className:"bpmn-icon-intermediate-event-catch-non-interrupting-message",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:MessageEventDefinition",cancelActivity:!1}},{label:"Timer Boundary Event (non-interrupting)",actionName:"replace-with-non-interrupting-timer-boundary",className:"bpmn-icon-intermediate-event-catch-non-interrupting-timer",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:TimerEventDefinition",cancelActivity:!1}},{label:"Escalation Boundary Event (non-interrupting)",actionName:"replace-with-non-interrupting-escalation-boundary",className:"bpmn-icon-intermediate-event-catch-non-interrupting-escalation",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:EscalationEventDefinition",cancelActivity:!1}},{label:"Conditional Boundary Event (non-interrupting)",actionName:"replace-with-non-interrupting-conditional-boundary",className:"bpmn-icon-intermediate-event-catch-non-interrupting-condition",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:ConditionalEventDefinition",cancelActivity:!1}},{label:"Signal Boundary Event (non-interrupting)",actionName:"replace-with-non-interrupting-signal-boundary",className:"bpmn-icon-intermediate-event-catch-non-interrupting-signal",target:{type:"bpmn:BoundaryEvent",eventDefinitionType:"bpmn:SignalEventDefinition",cancelActivity:!1}}].map(e=>({...e,category:V})),Pt=[{label:"Message End Event",actionName:"replace-with-message-end",className:"bpmn-icon-end-event-message",target:{type:"bpmn:EndEvent",eventDefinitionType:"bpmn:MessageEventDefinition"}},{label:"Escalation End Event",actionName:"replace-with-escalation-end",className:"bpmn-icon-end-event-escalation",target:{type:"bpmn:EndEvent",eventDefinitionType:"bpmn:EscalationEventDefinition"}},{label:"Error End Event",actionName:"replace-with-error-end",className:"bpmn-icon-end-event-error",target:{type:"bpmn:EndEvent",eventDefinitionType:"bpmn:ErrorEventDefinition"}},{label:"Cancel End Event",actionName:"replace-with-cancel-end",className:"bpmn-icon-end-event-cancel",target:{type:"bpmn:EndEvent",eventDefinitionType:"bpmn:CancelEventDefinition"}},{label:"Compensation End Event",actionName:"replace-with-compensation-end",className:"bpmn-icon-end-event-compensation",target:{type:"bpmn:EndEvent",eventDefinitionType:"bpmn:CompensateEventDefinition"}},{label:"Signal End Event",actionName:"replace-with-signal-end",className:"bpmn-icon-end-event-signal",target:{type:"bpmn:EndEvent",eventDefinitionType:"bpmn:SignalEventDefinition"}},{label:"Terminate End Event",actionName:"replace-with-terminate-end",className:"bpmn-icon-end-event-terminate",target:{type:"bpmn:EndEvent",eventDefinitionType:"bpmn:TerminateEventDefinition"}}].map(e=>({...e,category:V})),Rt=[{label:"Exclusive Gateway",actionName:"replace-with-exclusive-gateway",className:"bpmn-icon-gateway-xor",target:{type:"bpmn:ExclusiveGateway"}},{label:"Parallel Gateway",actionName:"replace-with-parallel-gateway",className:"bpmn-icon-gateway-parallel",target:{type:"bpmn:ParallelGateway"}},{label:"Inclusive Gateway",search:"or",actionName:"replace-with-inclusive-gateway",className:"bpmn-icon-gateway-or",rating:-1,target:{type:"bpmn:InclusiveGateway"}},{label:"Complex Gateway",actionName:"replace-with-complex-gateway",className:"bpmn-icon-gateway-complex",rating:-1,target:{type:"bpmn:ComplexGateway"}},{label:"Event based Gateway",actionName:"replace-with-event-based-gateway",className:"bpmn-icon-gateway-eventbased",target:{type:"bpmn:EventBasedGateway",instantiate:!1,eventGatewayType:"Exclusive"}}].map(e=>({...e,category:xt})),It=[{label:"Transaction",actionName:"replace-with-transaction",className:"bpmn-icon-transaction",target:{type:"bpmn:Transaction",isExpanded:!0}},{label:"Event Sub Process",search:"subprocess",actionName:"replace-with-event-subprocess",className:"bpmn-icon-event-subprocess-expanded",target:{type:"bpmn:SubProcess",triggeredByEvent:!0,isExpanded:!0}},{label:"Sub Process (collapsed)",search:"subprocess",actionName:"replace-with-collapsed-subprocess",className:"bpmn-icon-subprocess-collapsed",target:{type:"bpmn:SubProcess",isExpanded:!1}},{label:"Sub Process (expanded)",search:"subprocess",actionName:"replace-with-collapsed-subprocess",className:"bpmn-icon-subprocess-collapsed",target:{type:"bpmn:SubProcess",isExpanded:!0}}].map(e=>({...e,category:kt})),Lt=[{label:"Task",actionName:"replace-with-task",className:"bpmn-icon-task",rating:-1,target:{type:"bpmn:Task"}},{label:"Send Task",actionName:"replace-with-send-task",className:"bpmn-icon-send",rating:-1,target:{type:"bpmn:SendTask"}},{label:"Receive Task",actionName:"replace-with-receive-task",className:"bpmn-icon-receive",rating:-1,target:{type:"bpmn:ReceiveTask"}},{label:"User Task",actionName:"replace-with-user-task",className:"bpmn-icon-user",target:{type:"bpmn:UserTask"}},{label:"Manual Task",actionName:"replace-with-manual-task",className:"bpmn-icon-manual",rating:-1,target:{type:"bpmn:ManualTask"}},{label:"Business Rule Task",actionName:"replace-with-rule-task",className:"bpmn-icon-business-rule",target:{type:"bpmn:BusinessRuleTask"}},{label:"Service Task",actionName:"replace-with-service-task",className:"bpmn-icon-service",target:{type:"bpmn:ServiceTask"}},{label:"Script Task",actionName:"replace-with-script-task",className:"bpmn-icon-script",rating:-1,target:{type:"bpmn:ScriptTask"}},{label:"Call Activity",actionName:"replace-with-call-activity",className:"bpmn-icon-call-activity",target:{type:"bpmn:CallActivity"}}].map(e=>({...e,category:Ct})),Bt=[{label:"Data Store Reference",actionName:"replace-with-data-store-reference",className:"bpmn-icon-data-store",target:{type:"bpmn:DataStoreReference"}},{label:"Data Object Reference",actionName:"replace-with-data-object-reference",className:"bpmn-icon-data-object",target:{type:"bpmn:DataObjectReference"}}].map(e=>({...e,category:Nt})),Ot=[{label:"Expanded Pool",search:"Participant",actionName:"replace-with-expanded-pool",className:"bpmn-icon-participant",target:{type:"bpmn:Participant",isExpanded:!0}},{label:"Empty Pool",search:"Collapsed Participant",actionName:"replace-with-collapsed-pool",className:"bpmn-icon-lane",target:{type:"bpmn:Participant",isExpanded:!1}}].map(e=>({...e,category:$t})),Ge=[...Rt,...Lt,...It,...Dt,...Mt,...At,...Pt,...St,...Bt,...Ot];function A(e,t,n,a,o){this._config=e,this._elementTemplates=t,this._elementFactory=n,this._injector=a,this._changeMenu=o}A.$inject=["config.connectorsExtension","elementTemplates","elementFactory","injector","changeMenu"];A.prototype._isAppendAnything=function(){return this._config&&this._config.appendAnything||!1};A.prototype._getMatchingTemplates=function(){return this._elementTemplates.getLatest().filter(e=>e.appliesTo.includes("bpmn:Task")||e.appliesTo.includes("bpmn:ServiceTask"))};A.prototype._getDefaultEntries=function(){return this._isAppendAnything()?Ge.filter(e=>!["bpmn:StartEvent","bpmn:Participant"].includes(e.target.type)).map(e=>{const{actionName:t,className:n,label:a,target:o,description:i,category:c,search:l,rating:s}=e;return{label:a,id:`append.${t}`,className:n,description:i,category:c,search:l,rating:s,action:()=>this._elementFactory.create("shape",{...o})}}):[]};A.prototype._getTemplateEntries=function(e){return"createElement"in this._elementTemplates?Ht(e)?[]:this._getMatchingTemplates().map(n=>{const{id:a,name:o,description:i,category:c={id:"templates",name:"Templates"},icon:l={},search:s,documentationRef:h}=n;return{name:o,description:i,id:`append.template-${a}`,category:c,imageUrl:ie(l.contents),search:s,documentationRef:h,action:()=>this._elementTemplates.createElement(n)}}):[]};A.prototype._getContext=function(e){const t=this._getDefaultEntries(),n=this._getTemplateEntries(e);return{entries:[...t,...n],empty:!(n.length+t.length)}};A.prototype.open=function(e,t){const{entries:n}=this._getContext(e),a=o=>E`
    <${Ut}
      entries=${n}
      onClose=${o}
      title=${this._isAppendAnything()?"Append element":"Append Connector"}
      showCategories=${this._isAppendAnything()}
    />
  `;return this._changeMenu.open(a,{position:t,className:"cmd-append-menu"}).then(o=>o||Promise.reject("user-canceled"))};A.prototype.isEmpty=function(e){return this._getContext(e).empty};function Ut(e){const{onClose:t,entries:n,title:a,showCategories:o=!0}=e,i=(d,v,b=!1)=>{const x=v.action();t({event:d,newElement:x,dragstart:b})},c=M(),l=M(),[s,h]=C(""),[r,g]=C(e.entries),[m,p]=C(r[0]);ne(()=>{const d=b=>{if(!s)return b.rating!==-1;const x=[b.name&&"connector"||"",b.name,b.description||"",b.label||"",b.search||""].join("---").toLowerCase();return s.toLowerCase().split(/\s/g).every(j=>x.includes(j))},v=n.filter(d);v.includes(m)||p(v[0]),g(v)},[s,m,e.templates]),D(()=>{c.current.focus()},[]),D(()=>{const v=l.current.querySelector(".selected");v&&ae(v)},[m]);const _=N(d=>{let b=r.indexOf(m)+d;b<0&&(b=r.length-1),b>=r.length&&(b=0),p(r[b])},[r,m]),u=N(d=>{if(d.key==="Enter"&&m)return i(d,m),d.preventDefault();if(d.key==="Escape")return t();if(d.key==="ArrowUp"||d.key==="Tab"&&d.shiftKey)return _(-1),d.preventDefault();if(d.key==="ArrowDown"||d.key==="Tab")return _(1),d.preventDefault()},[m,_]),f=N(d=>{h(()=>d.target.value)},[]);return E`
    <div class="cmd-change-menu__header">
      <h3 class="cmd-change-menu__title">
        ${a}
      </h3>
    </div>

    <div class="cmd-change-menu__body">
      <div class=${P("cmd-change-menu__search",{hidden:e.entries.length<5})}>
        <svg class="cmd-change-menu__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0325 8.5H9.625L13.3675 12.25L12.25 13.3675L8.5 9.625V9.0325L8.2975 8.8225C7.4425 9.5575 6.3325 10 5.125 10C2.4325 10 0.25 7.8175 0.25 5.125C0.25 2.4325 2.4325 0.25 5.125 0.25C7.8175 0.25 10 2.4325 10 5.125C10 6.3325 9.5575 7.4425 8.8225 8.2975L9.0325 8.5ZM1.75 5.125C1.75 6.9925 3.2575 8.5 5.125 8.5C6.9925 8.5 8.5 6.9925 8.5 5.125C8.5 3.2575 6.9925 1.75 5.125 1.75C3.2575 1.75 1.75 3.2575 1.75 5.125Z" fill="#22242A"/>
        </svg>

        <input
          ref=${c}
          type="text"
          onKeyup=${f}
          onKeydown=${u}
        />
      </div>

      <ul class="cmd-change-menu__results" ref=${l}>
        ${r.map((d,v)=>E`

          <${re}
            key=${d.id}
            template=${d}
            lastTemplate=${r[v-1]}
            showCategories=${o}
            selected=${d===m}
            draggable
            onMouseEnter=${()=>p(d)}
            onDragStart=${b=>{b.stopPropagation(),b.preventDefault(),i(b,d,!0)}}
            onClick=${b=>{b.stopPropagation(),i(b,d)}}
          />
        `)}

        ${!r.length&&E`
          <li class="cmd-change-menu__muted-entry">Nothing found</li>
        `}
      </ul>
    </div>
  `}function Ht(e){return e&&!!e.waypoints}var Vt={appendMenu:["type",A]};function I(e,t,n,a){this._elementTemplates=e,this._elementFactory=t,this._injector=n,this._changeMenu=a}I.$inject=["elementTemplates","elementFactory","injector","changeMenu"];I.prototype._getMatchingTemplates=function(){return this._elementTemplates.getLatest().filter(e=>e.appliesTo.includes("bpmn:Task")||e.appliesTo.includes("bpmn:ServiceTask"))};I.prototype._getDefaultEntries=function(){return Ge.map(e=>{const{actionName:t,className:n,label:a,category:o,search:i,rating:c,target:l}=e;return{label:a,id:`create.${t}`,className:n,category:o,search:i,rating:c,action:()=>this._elementFactory.create("shape",{...l})}})};I.prototype._getTemplateEntries=function(){return"createElement"in this._elementTemplates?this._getMatchingTemplates().map(t=>{const{id:n,name:a,description:o,category:i={id:"templates",name:"Templates"},icon:c={},search:l,documentationRef:s}=t;return{name:a,description:o,id:`create.template-${n}`,category:i,imageUrl:ie(c.contents),search:l,documentationRef:s,action:()=>this._elementTemplates.createElement(t)}}):[]};I.prototype._getContext=function(){const e=this._getDefaultEntries(),t=this._getTemplateEntries();return{entries:[...e,...t],empty:!(t.length+e.length)}};I.prototype.open=function(e,t=e){const{entries:n}=this._getContext(),a=o=>E`
    <${jt}
      entries=${n}
      onClose=${o}
    />
  `;return this._changeMenu.open(a,{position:t,className:"cmd-create-menu"}).then(o=>o||Promise.reject("user-canceled"))};function jt(e){const{onClose:t,entries:n}=e,a=(u,f,d=!1)=>{const v=f.action();t({event:u,newElement:v,dragstart:d})},o=M(),i=M(),[c,l]=C(""),[s,h]=C(e.entries),[r,g]=C(s[0]);ne(()=>{const u=d=>{if(!c)return d.rating!==-1;const v=[d.name&&"connector"||"",d.name,d.description||"",d.label||"",d.search||""].join("---").toLowerCase();return c.toLowerCase().split(/\s/g).every(b=>v.includes(b))},f=n.filter(u);f.includes(r)||g(f[0]),h(f)},[c,r,e.templates]),D(()=>{o.current.focus()},[]),D(()=>{const f=i.current.querySelector(".selected");f&&ae(f)},[r]);const m=N(u=>{let d=s.indexOf(r)+u;d<0&&(d=s.length-1),d>=s.length&&(d=0),g(s[d])},[s,r]),p=N(u=>{if(u.key==="Enter"&&r)return a(u,r),u.preventDefault();if(u.key==="Escape")return t();if(u.key==="ArrowUp"||u.key==="Tab"&&u.shiftKey)return m(-1),u.preventDefault();if(u.key==="ArrowDown"||u.key==="Tab")return m(1),u.preventDefault()},[r,m]),_=N(u=>{l(()=>u.target.value)},[]);return E`
    <div class="cmd-change-menu__header">
      <h3 class="cmd-change-menu__title">
        Create element
      </h3>
    </div>

    <div class="cmd-change-menu__body">
      <div class=${P("cmd-change-menu__search",{hidden:e.entries.length<5})}>
        <svg class="cmd-change-menu__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0325 8.5H9.625L13.3675 12.25L12.25 13.3675L8.5 9.625V9.0325L8.2975 8.8225C7.4425 9.5575 6.3325 10 5.125 10C2.4325 10 0.25 7.8175 0.25 5.125C0.25 2.4325 2.4325 0.25 5.125 0.25C7.8175 0.25 10 2.4325 10 5.125C10 6.3325 9.5575 7.4425 8.8225 8.2975L9.0325 8.5ZM1.75 5.125C1.75 6.9925 3.2575 8.5 5.125 8.5C6.9925 8.5 8.5 6.9925 8.5 5.125C8.5 3.2575 6.9925 1.75 5.125 1.75C3.2575 1.75 1.75 3.2575 1.75 5.125Z" fill="#22242A"/>
        </svg>

        <input
          ref=${o}
          type="text"
          onKeyup=${_}
          onKeydown=${p}
        />
      </div>

      <ul class="cmd-change-menu__results" ref=${i}>
        ${s.map((u,f)=>E`

          <${re}
            key=${u.id}
            template=${u}
            lastTemplate=${s[f-1]}
            selected=${u===r}
            draggable
            onMouseEnter=${()=>g(u)}
            onDragStart=${d=>{d.stopPropagation(),d.preventDefault(),a(d,u,!0)}}
            onClick=${d=>{d.stopPropagation(),a(d,u)}}
          />
        `)}

        ${!s.length&&E`
          <li class="cmd-change-menu__muted-entry">Nothing found</li>
        `}
      </ul>
    </div>
  `}var Kt={createMenu:["type",I]},Wt={__depends__:[ut,ft,wt,Vt,Kt],__init__:["connectorsExtension","connectorsKeyboardBindings"],connectorsExtension:["type",k],connectorsKeyboardBindings:["type",le]};export{Wt as i};

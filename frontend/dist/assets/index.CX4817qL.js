const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Login.BzWQQNDN.js","assets/react.C2-qyGTQ.js","assets/LandingPage.BxPHagQL.js","assets/Passenger.pE0G83dv.js","assets/leaflet.DC9QlCQY.js","assets/leaflet.Dgihpmma.css","assets/Driver.DCKqs_Ge.js"])))=>i.map(i=>d[i]);
import{r as Be,a as Fg,u as co,N as rr,R as Oe,b as Ug,L as Je,B as Bg,c as jg,d as jn}from"./react.C2-qyGTQ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const qg="modulepreload",zg=function(r){return"/"+r},wl={},uo=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(t.map(u=>{if(u=zg(u),u in wl)return;wl[u]=!0;const h=u.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${f}`))return;const m=document.createElement("link");if(m.rel=h?"stylesheet":qg,h||(m.as="script"),m.crossOrigin="",m.href=u,c&&m.setAttribute("nonce",c),document.head.appendChild(m),h)return new Promise((g,R)=>{m.addEventListener("load",g),m.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return s.then(o=>{for(const c of o||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})};var xd={exports:{}},lo={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $g=Be,Gg=Symbol.for("react.element"),Kg=Symbol.for("react.fragment"),Hg=Object.prototype.hasOwnProperty,Wg=$g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Qg={key:!0,ref:!0,__self:!0,__source:!0};function Dd(r,e,t){var n,s={},i=null,o=null;t!==void 0&&(i=""+t),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(n in e)Hg.call(e,n)&&!Qg.hasOwnProperty(n)&&(s[n]=e[n]);if(r&&r.defaultProps)for(n in e=r.defaultProps,e)s[n]===void 0&&(s[n]=e[n]);return{$$typeof:Gg,type:r,key:i,ref:o,props:s,_owner:Wg.current}}lo.Fragment=Kg;lo.jsx=Dd;lo.jsxs=Dd;xd.exports=lo;var x=xd.exports,kd,vl=Fg;kd=vl.createRoot,vl.hydrateRoot;const Jg=()=>{};var Al={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Yg=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],c=r[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Od={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,c=o?r[s+1]:0,u=s+2<r.length,h=u?r[s+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let g=(c&15)<<2|h>>6,R=h&63;u||(R=64,o||(g=64)),n.push(t[f],t[m],t[g],t[R])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Nd(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Yg(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const m=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new Xg;const g=i<<2|c>>4;if(n.push(g),h!==64){const R=c<<4&240|h>>2;if(n.push(R),m!==64){const V=h<<6&192|m;n.push(V)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Xg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Zg=function(r){const e=Nd(r);return Od.encodeByteArray(e,!0)},ki=function(r){return Zg(r).replace(/\./g,"")},Md=function(r){try{return Od.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ld(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e_=()=>Ld().__FIREBASE_DEFAULTS__,t_=()=>{if(typeof process>"u"||typeof Al>"u")return;const r=Al.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},n_=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Md(r[1]);return e&&JSON.parse(e)},ho=()=>{try{return Jg()||e_()||t_()||n_()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Fd=r=>{var e,t;return(t=(e=ho())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},r_=r=>{const e=Fd(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Ud=()=>{var r;return(r=ho())==null?void 0:r.config},Bd=r=>{var e;return(e=ho())==null?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Er(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function jd(r){return(await fetch(r,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i_(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[ki(JSON.stringify(t)),ki(JSON.stringify(o)),""].join(".")}const ns={};function o_(){const r={prod:[],emulator:[]};for(const e of Object.keys(ns))ns[e]?r.emulator.push(e):r.prod.push(e);return r}function a_(r){let e=document.getElementById(r),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",r),t=!0),{created:t,element:e}}let bl=!1;function qd(r,e){if(typeof window>"u"||typeof document>"u"||!Er(window.location.host)||ns[r]===e||ns[r]||bl)return;ns[r]=e;function t(g){return`__firebase__banner__${g}`}const n="__firebase__banner",i=o_().prod.length>0;function o(){const g=document.getElementById(n);g&&g.remove()}function c(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function u(g,R){g.setAttribute("width","24"),g.setAttribute("id",R),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function h(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{bl=!0,o()},g}function f(g,R){g.setAttribute("id",R),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function m(){const g=a_(n),R=t("text"),V=document.getElementById(R)||document.createElement("span"),k=t("learnmore"),C=document.getElementById(k)||document.createElement("a"),O=t("preprendIcon"),L=document.getElementById(O)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const U=g.element;c(U),f(C,k);const q=h();u(L,O),U.append(L,V,C,q),document.body.appendChild(U)}i?(V.innerText="Preview backend disconnected.",L.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(L.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,V.innerText="Preview backend running in this workspace."),V.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function c_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ge())}function zd(){var e;const r=(e=ho())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function u_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function l_(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function h_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function d_(){const r=ge();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function $d(){return!zd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Gd(){return!zd()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Kd(){try{return typeof indexedDB=="object"}catch{return!1}}function f_(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p_="FirebaseError";class At extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=p_,Object.setPrototypeOf(this,At.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ss.prototype.create)}}class Ss{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?m_(i,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new At(s,c,n)}}function m_(r,e){return r.replace(g_,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const g_=/\{\$([^}]+)}/g;function __(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function vn(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(Rl(i)&&Rl(o)){if(!vn(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Rl(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ps(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Qr(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,i]=n.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Jr(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function y_(r,e){const t=new I_(r,e);return t.subscribe.bind(t)}class I_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");E_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=pa),s.error===void 0&&(s.error=pa),s.complete===void 0&&(s.complete=pa);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function E_(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function pa(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(r){return r&&r._delegate?r._delegate:r}class An{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new s_;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(v_(e))try{this.getOrInitializeService({instanceIdentifier:un})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=un){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=un){return this.instances.has(e)}getOptions(e=un){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:w_(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=un){return this.component?this.component.multipleInstances?e:un:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function w_(r){return r===un?void 0:r}function v_(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new T_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(J||(J={}));const b_={debug:J.DEBUG,verbose:J.VERBOSE,info:J.INFO,warn:J.WARN,error:J.ERROR,silent:J.SILENT},R_=J.INFO,S_={[J.DEBUG]:"log",[J.VERBOSE]:"log",[J.INFO]:"info",[J.WARN]:"warn",[J.ERROR]:"error"},P_=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=S_[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class hc{constructor(e){this.name=e,this._logLevel=R_,this._logHandler=P_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in J))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?b_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,J.DEBUG,...e),this._logHandler(this,J.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,J.VERBOSE,...e),this._logHandler(this,J.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,J.INFO,...e),this._logHandler(this,J.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,J.WARN,...e),this._logHandler(this,J.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,J.ERROR,...e),this._logHandler(this,J.ERROR,...e)}}const C_=(r,e)=>e.some(t=>r instanceof t);let Sl,Pl;function V_(){return Sl||(Sl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function x_(){return Pl||(Pl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Hd=new WeakMap,Ca=new WeakMap,Wd=new WeakMap,ma=new WeakMap,dc=new WeakMap;function D_(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(zt(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Hd.set(t,r)}).catch(()=>{}),dc.set(e,r),e}function k_(r){if(Ca.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});Ca.set(r,e)}let Va={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Ca.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Wd.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return zt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function N_(r){Va=r(Va)}function O_(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(ga(this),e,...t);return Wd.set(n,e.sort?e.sort():[e]),zt(n)}:x_().includes(r)?function(...e){return r.apply(ga(this),e),zt(Hd.get(this))}:function(...e){return zt(r.apply(ga(this),e))}}function M_(r){return typeof r=="function"?O_(r):(r instanceof IDBTransaction&&k_(r),C_(r,V_())?new Proxy(r,Va):r)}function zt(r){if(r instanceof IDBRequest)return D_(r);if(ma.has(r))return ma.get(r);const e=M_(r);return e!==r&&(ma.set(r,e),dc.set(e,r)),e}const ga=r=>dc.get(r);function L_(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),c=zt(o);return n&&o.addEventListener("upgradeneeded",u=>{n(zt(o.result),u.oldVersion,u.newVersion,zt(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const F_=["get","getKey","getAll","getAllKeys","count"],U_=["put","add","delete","clear"],_a=new Map;function Cl(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(_a.get(e))return _a.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=U_.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||F_.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return _a.set(e,i),i}N_(r=>({...r,get:(e,t,n)=>Cl(e,t)||r.get(e,t,n),has:(e,t)=>!!Cl(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(j_(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function j_(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const xa="@firebase/app",Vl="0.14.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It=new hc("@firebase/app"),q_="@firebase/app-compat",z_="@firebase/analytics-compat",$_="@firebase/analytics",G_="@firebase/app-check-compat",K_="@firebase/app-check",H_="@firebase/auth",W_="@firebase/auth-compat",Q_="@firebase/database",J_="@firebase/data-connect",Y_="@firebase/database-compat",X_="@firebase/functions",Z_="@firebase/functions-compat",ey="@firebase/installations",ty="@firebase/installations-compat",ny="@firebase/messaging",ry="@firebase/messaging-compat",sy="@firebase/performance",iy="@firebase/performance-compat",oy="@firebase/remote-config",ay="@firebase/remote-config-compat",cy="@firebase/storage",uy="@firebase/storage-compat",ly="@firebase/firestore",hy="@firebase/ai",dy="@firebase/firestore-compat",fy="firebase",py="12.2.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da="[DEFAULT]",my={[xa]:"fire-core",[q_]:"fire-core-compat",[$_]:"fire-analytics",[z_]:"fire-analytics-compat",[K_]:"fire-app-check",[G_]:"fire-app-check-compat",[H_]:"fire-auth",[W_]:"fire-auth-compat",[Q_]:"fire-rtdb",[J_]:"fire-data-connect",[Y_]:"fire-rtdb-compat",[X_]:"fire-fn",[Z_]:"fire-fn-compat",[ey]:"fire-iid",[ty]:"fire-iid-compat",[ny]:"fire-fcm",[ry]:"fire-fcm-compat",[sy]:"fire-perf",[iy]:"fire-perf-compat",[oy]:"fire-rc",[ay]:"fire-rc-compat",[cy]:"fire-gcs",[uy]:"fire-gcs-compat",[ly]:"fire-fst",[dy]:"fire-fst-compat",[hy]:"fire-vertex","fire-js":"fire-js",[fy]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ni=new Map,gy=new Map,ka=new Map;function xl(r,e){try{r.container.addComponent(e)}catch(t){It.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function sr(r){const e=r.name;if(ka.has(e))return It.debug(`There were multiple attempts to register component ${e}.`),!1;ka.set(e,r);for(const t of Ni.values())xl(t,r);for(const t of gy.values())xl(t,r);return!0}function fc(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function qe(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _y={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new Ss("app","Firebase",_y);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new An("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr=py;function Qd(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:Da,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw $t.create("bad-app-name",{appName:String(s)});if(t||(t=Ud()),!t)throw $t.create("no-options");const i=Ni.get(s);if(i){if(vn(t,i.options)&&vn(n,i.config))return i;throw $t.create("duplicate-app",{appName:s})}const o=new A_(s);for(const u of ka.values())o.addComponent(u);const c=new yy(t,n,o);return Ni.set(s,c),c}function Jd(r=Da){const e=Ni.get(r);if(!e&&r===Da&&Ud())return Qd();if(!e)throw $t.create("no-app",{appName:r});return e}function Gt(r,e,t){let n=my[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),It.warn(o.join(" "));return}sr(new An(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iy="firebase-heartbeat-database",Ey=1,ds="firebase-heartbeat-store";let ya=null;function Yd(){return ya||(ya=L_(Iy,Ey,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(ds)}catch(t){console.warn(t)}}}}).catch(r=>{throw $t.create("idb-open",{originalErrorMessage:r.message})})),ya}async function Ty(r){try{const t=(await Yd()).transaction(ds),n=await t.objectStore(ds).get(Xd(r));return await t.done,n}catch(e){if(e instanceof At)It.warn(e.message);else{const t=$t.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});It.warn(t.message)}}}async function Dl(r,e){try{const n=(await Yd()).transaction(ds,"readwrite");await n.objectStore(ds).put(e,Xd(r)),await n.done}catch(t){if(t instanceof At)It.warn(t.message);else{const n=$t.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});It.warn(n.message)}}}function Xd(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wy=1024,vy=30;class Ay{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ry(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=kl();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>vy){const o=Sy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){It.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=kl(),{heartbeatsToSend:n,unsentEntries:s}=by(this._heartbeatsCache.heartbeats),i=ki(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return It.warn(t),""}}}function kl(){return new Date().toISOString().substring(0,10)}function by(r,e=wy){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Nl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Nl(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class Ry{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Kd()?f_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Ty(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Dl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Dl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function Nl(r){return ki(JSON.stringify({version:2,heartbeats:r})).length}function Sy(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Py(r){sr(new An("platform-logger",e=>new B_(e),"PRIVATE")),sr(new An("heartbeat",e=>new Ay(e),"PRIVATE")),Gt(xa,Vl,r),Gt(xa,Vl,"esm2020"),Gt("fire-js","")}Py("");function Zd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Cy=Zd,ef=new Ss("auth","Firebase",Zd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oi=new hc("@firebase/auth");function Vy(r,...e){Oi.logLevel<=J.WARN&&Oi.warn(`Auth (${Tr}): ${r}`,...e)}function _i(r,...e){Oi.logLevel<=J.ERROR&&Oi.error(`Auth (${Tr}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(r,...e){throw mc(r,...e)}function et(r,...e){return mc(r,...e)}function pc(r,e,t){const n={...Cy(),[e]:t};return new Ss("auth","Firebase",n).create(e,{appName:r.name})}function yt(r){return pc(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function xy(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&We(r,"argument-error"),pc(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function mc(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return ef.create(r,...e)}function $(r,e,...t){if(!r)throw mc(e,...t)}function mt(r){const e="INTERNAL ASSERTION FAILED: "+r;throw _i(e),new Error(e)}function Et(r,e){r||mt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Na(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function Dy(){return Ol()==="http:"||Ol()==="https:"}function Ol(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ky(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Dy()||l_()||"connection"in navigator)?navigator.onLine:!0}function Ny(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(e,t){this.shortDelay=e,this.longDelay=t,Et(t>e,"Short delay should be less than long delay!"),this.isMobile=c_()||h_()}get(){return ky()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gc(r,e){Et(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;mt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;mt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;mt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const My=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Ly=new Cs(3e4,6e4);function bt(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function ut(r,e,t,n,s={}){return nf(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const c=Ps({key:r.config.apiKey,...o}).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const h={method:e,headers:u,...i};return u_()||(h.referrerPolicy="no-referrer"),r.emulatorConfig&&Er(r.emulatorConfig.host)&&(h.credentials="include"),tf.fetch()(await rf(r,r.config.apiHost,t,c),h)})}async function nf(r,e,t){r._canInitEmulator=!1;const n={...Oy,...e};try{const s=new Uy(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ci(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ci(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ci(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw ci(r,"user-disabled",o);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw pc(r,f,h);We(r,f)}}catch(s){if(s instanceof At)throw s;We(r,"network-request-failed",{message:String(s)})}}async function Vs(r,e,t,n,s={}){const i=await ut(r,e,t,n,s);return"mfaPendingCredential"in i&&We(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function rf(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?gc(r.config,s):`${r.config.apiScheme}://${s}`;return My.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function Fy(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Uy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(et(this.auth,"network-request-failed")),Ly.get())})}}function ci(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=et(r,e,n);return s.customData._tokenResponse=t,s}function Ml(r){return r!==void 0&&r.enterprise!==void 0}class By{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Fy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function jy(r,e){return ut(r,"GET","/v2/recaptchaConfig",bt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qy(r,e){return ut(r,"POST","/v1/accounts:delete",e)}async function Mi(r,e){return ut(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rs(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function zy(r,e=!1){const t=de(r),n=await t.getIdToken(e),s=_c(n);$(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:rs(Ia(s.auth_time)),issuedAtTime:rs(Ia(s.iat)),expirationTime:rs(Ia(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Ia(r){return Number(r)*1e3}function _c(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return _i("JWT malformed, contained fewer than 3 sections"),null;try{const s=Md(t);return s?JSON.parse(s):(_i("Failed to decode base64 JWT payload"),null)}catch(s){return _i("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Ll(r){const e=_c(r);return $(e,"internal-error"),$(typeof e.exp<"u","internal-error"),$(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ir(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof At&&$y(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function $y({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=rs(this.lastLoginAt),this.creationTime=rs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Li(r){var m;const e=r.auth,t=await r.getIdToken(),n=await ir(r,Mi(e,{idToken:t}));$(n==null?void 0:n.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=(m=s.providerUserInfo)!=null&&m.length?sf(s.providerUserInfo):[],o=Hy(r.providerData,i),c=r.isAnonymous,u=!(r.email&&s.passwordHash)&&!(o!=null&&o.length),h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Oa(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(r,f)}async function Ky(r){const e=de(r);await Li(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Hy(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function sf(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wy(r,e){const t=await nf(r,{},async()=>{const n=Ps({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await rf(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:n};return r.emulatorConfig&&Er(r.emulatorConfig.host)&&(u.credentials="include"),tf.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Qy(r,e){return ut(r,"POST","/v2/accounts:revokeToken",bt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){$(e.idToken,"internal-error"),$(typeof e.idToken<"u","internal-error"),$(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ll(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){$(e.length!==0,"internal-error");const t=Ll(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:($(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await Wy(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new Zn;return n&&($(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&($(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&($(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Zn,this.toJSON())}_performRefresh(){return mt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(r,e){$(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Ze{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new Gy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Oa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ir(this,this.stsTokenManager.getToken(this.auth,e));return $(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return zy(this,e)}reload(){return Ky(this)}_assign(e){this!==e&&($(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ze({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){$(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Li(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(qe(this.auth.app))return Promise.reject(yt(this.auth));const e=await this.getIdToken();return await ir(this,qy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:m,emailVerified:g,isAnonymous:R,providerData:V,stsTokenManager:k}=t;$(m&&k,e,"internal-error");const C=Zn.fromJSON(this.name,k);$(typeof m=="string",e,"internal-error"),kt(n,e.name),kt(s,e.name),$(typeof g=="boolean",e,"internal-error"),$(typeof R=="boolean",e,"internal-error"),kt(i,e.name),kt(o,e.name),kt(c,e.name),kt(u,e.name),kt(h,e.name),kt(f,e.name);const O=new Ze({uid:m,auth:e,email:s,emailVerified:g,displayName:n,isAnonymous:R,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:C,createdAt:h,lastLoginAt:f});return V&&Array.isArray(V)&&(O.providerData=V.map(L=>({...L}))),u&&(O._redirectEventId=u),O}static async _fromIdTokenResponse(e,t,n=!1){const s=new Zn;s.updateFromServerResponse(t);const i=new Ze({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Li(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];$(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?sf(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Zn;c.updateFromIdToken(n);const u=new Ze({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Oa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl=new Map;function gt(r){Et(r instanceof Function,"Expected a class definition");let e=Fl.get(r);return e?(Et(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Fl.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}of.type="NONE";const Ul=of;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(r,e,t){return`firebase:${r}:${e}:${t}`}class er{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=yi(this.userKey,s.apiKey,i),this.fullPersistenceKey=yi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Mi(this.auth,{idToken:e}).catch(()=>{});return t?Ze._fromGetAccountInfoResponse(this.auth,t,e):null}return Ze._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new er(gt(Ul),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||gt(Ul);const o=yi(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let m;if(typeof f=="string"){const g=await Mi(e,{idToken:f}).catch(()=>{});if(!g)break;m=await Ze._fromGetAccountInfoResponse(e,g,f)}else m=Ze._fromJSON(e,f);h!==i&&(c=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new er(i,e,n):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new er(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(lf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(af(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(df(e))return"Blackberry";if(ff(e))return"Webos";if(cf(e))return"Safari";if((e.includes("chrome/")||uf(e))&&!e.includes("edge/"))return"Chrome";if(hf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function af(r=ge()){return/firefox\//i.test(r)}function cf(r=ge()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function uf(r=ge()){return/crios\//i.test(r)}function lf(r=ge()){return/iemobile/i.test(r)}function hf(r=ge()){return/android/i.test(r)}function df(r=ge()){return/blackberry/i.test(r)}function ff(r=ge()){return/webos/i.test(r)}function yc(r=ge()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function Jy(r=ge()){var e;return yc(r)&&!!((e=window.navigator)!=null&&e.standalone)}function Yy(){return d_()&&document.documentMode===10}function pf(r=ge()){return yc(r)||hf(r)||ff(r)||df(r)||/windows phone/i.test(r)||lf(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mf(r,e=[]){let t;switch(r){case"Browser":t=Bl(ge());break;case"Worker":t=`${Bl(ge())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Tr}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zy(r,e={}){return ut(r,"GET","/v2/passwordPolicy",bt(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eI=6;class tI{constructor(e){var n;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??eI,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new jl(this),this.idTokenSubscription=new jl(this),this.beforeStateQueue=new Xy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ef,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=gt(t)),this._initializationPromise=this.queue(async()=>{var n,s,i;if(!this._deleted&&(this.persistenceManager=await er.create(this,e),(n=this._resolvePersistenceManagerAvailable)==null||n.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Mi(this,{idToken:e}),n=await Ze._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(qe(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=n==null?void 0:n._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(n=u.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return $(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Li(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ny()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(qe(this.app))return Promise.reject(yt(this));const t=e?de(e):null;return t&&$(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&$(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return qe(this.app)?Promise.reject(yt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return qe(this.app)?Promise.reject(yt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(gt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Zy(this),t=new tI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ss("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await Qy(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&gt(e)||this._popupRedirectResolver;$(t,this,"argument-error"),this.redirectPersistenceManager=await er.create(this,[gt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if($(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return $(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=mf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var t;if(qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Vy(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Rt(r){return de(r)}class jl{constructor(e){this.auth=e,this.observer=null,this.addObserver=y_(t=>this.observer=t)}get next(){return $(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function rI(r){fo=r}function gf(r){return fo.loadJS(r)}function sI(){return fo.recaptchaEnterpriseScript}function iI(){return fo.gapiScript}function oI(r){return`__${r}${Math.floor(Math.random()*1e6)}`}class aI{constructor(){this.enterprise=new cI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class cI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const uI="recaptcha-enterprise",_f="NO_RECAPTCHA";class lI{constructor(e){this.type=uI,this.auth=Rt(e)}async verify(e="verify",t=!1){async function n(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{jy(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new By(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Ml(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(_f)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new aI().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{n(this.auth).then(c=>{if(!t&&Ml(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=sI();u.length!==0&&(u+=c),gf(u).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function ql(r,e,t,n=!1,s=!1){const i=new lI(r);let o;if(s)o=_f;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return n?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Fi(r,e,t,n,s){var i;if((i=r._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await ql(r,e,t,t==="getOobCode");return n(r,o)}else return n(r,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await ql(r,e,t,t==="getOobCode");return n(r,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hI(r,e){const t=fc(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(vn(i,e??{}))return s;We(s,"already-initialized")}return t.initialize({options:e})}function dI(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(gt);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function fI(r,e,t){const n=Rt(r);$(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=yf(e),{host:o,port:c}=pI(e),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){$(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),$(vn(h,n.config.emulator)&&vn(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,Er(o)?(jd(`${i}//${o}${u}`),qd("Auth",!0)):mI()}function yf(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function pI(r){const e=yf(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:zl(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:zl(o)}}}function zl(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function mI(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return mt("not implemented")}_getIdTokenResponse(e){return mt("not implemented")}_linkToIdToken(e,t){return mt("not implemented")}_getReauthenticationResolver(e){return mt("not implemented")}}async function gI(r,e){return ut(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _I(r,e){return Vs(r,"POST","/v1/accounts:signInWithPassword",bt(r,e))}async function yI(r,e){return ut(r,"POST","/v1/accounts:sendOobCode",bt(r,e))}async function II(r,e){return yI(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EI(r,e){return Vs(r,"POST","/v1/accounts:signInWithEmailLink",bt(r,e))}async function TI(r,e){return Vs(r,"POST","/v1/accounts:signInWithEmailLink",bt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs extends Ic{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new fs(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new fs(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Fi(e,t,"signInWithPassword",_I);case"emailLink":return EI(e,{email:this._email,oobCode:this._password});default:We(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Fi(e,n,"signUpPassword",gI);case"emailLink":return TI(e,{idToken:t,email:this._email,oobCode:this._password});default:We(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(r,e){return Vs(r,"POST","/v1/accounts:signInWithIdp",bt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wI="http://localhost";class bn extends Ic{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new bn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):We("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new bn(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return tr(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,tr(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,tr(e,t)}buildRequest(){const e={requestUri:wI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ps(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vI(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function AI(r){const e=Qr(Jr(r)).link,t=e?Qr(Jr(e)).deep_link_id:null,n=Qr(Jr(r)).deep_link_id;return(n?Qr(Jr(n)).link:null)||n||t||e||r}class Ec{constructor(e){const t=Qr(Jr(e)),n=t.apiKey??null,s=t.oobCode??null,i=vI(t.mode??null);$(n&&s&&i,"argument-error"),this.apiKey=n,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=AI(e);try{return new Ec(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(){this.providerId=wr.PROVIDER_ID}static credential(e,t){return fs._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Ec.parseLink(t);return $(n,"argument-error"),fs._fromEmailAndCode(e,n.code,n.tenantId)}}wr.PROVIDER_ID="password";wr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";wr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs extends Tc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft extends xs{constructor(){super("facebook.com")}static credential(e){return bn._fromParams({providerId:ft.PROVIDER_ID,signInMethod:ft.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ft.credentialFromTaggedObject(e)}static credentialFromError(e){return ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ft.credential(e.oauthAccessToken)}catch{return null}}}ft.FACEBOOK_SIGN_IN_METHOD="facebook.com";ft.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends xs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return bn._fromParams({providerId:pt.PROVIDER_ID,signInMethod:pt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return pt.credentialFromTaggedObject(e)}static credentialFromError(e){return pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return pt.credential(t,n)}catch{return null}}}pt.GOOGLE_SIGN_IN_METHOD="google.com";pt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends xs{constructor(){super("github.com")}static credential(e){return bn._fromParams({providerId:Ft.PROVIDER_ID,signInMethod:Ft.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ft.credentialFromTaggedObject(e)}static credentialFromError(e){return Ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ft.credential(e.oauthAccessToken)}catch{return null}}}Ft.GITHUB_SIGN_IN_METHOD="github.com";Ft.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut extends xs{constructor(){super("twitter.com")}static credential(e,t){return bn._fromParams({providerId:Ut.PROVIDER_ID,signInMethod:Ut.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ut.credentialFromTaggedObject(e)}static credentialFromError(e){return Ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Ut.credential(t,n)}catch{return null}}}Ut.TWITTER_SIGN_IN_METHOD="twitter.com";Ut.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bI(r,e){return Vs(r,"POST","/v1/accounts:signUp",bt(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await Ze._fromIdTokenResponse(e,n,s),o=$l(n);return new Rn({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=$l(n);return new Rn({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function $l(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui extends At{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Ui.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Ui(e,t,n,s)}}function If(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ui._fromErrorAndOperation(r,i,e,n):i})}async function RI(r,e,t=!1){const n=await ir(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Rn._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SI(r,e,t=!1){const{auth:n}=r;if(qe(n.app))return Promise.reject(yt(n));const s="reauthenticate";try{const i=await ir(r,If(n,s,e,r),t);$(i.idToken,n,"internal-error");const o=_c(i.idToken);$(o,n,"internal-error");const{sub:c}=o;return $(r.uid===c,n,"user-mismatch"),Rn._forOperation(r,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&We(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ef(r,e,t=!1){if(qe(r.app))return Promise.reject(yt(r));const n="signIn",s=await If(r,n,e),i=await Rn._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}async function PI(r,e){return Ef(Rt(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tf(r){const e=Rt(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function CI(r,e,t){const n=Rt(r);await Fi(n,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",II)}async function VI(r,e,t){if(qe(r.app))return Promise.reject(yt(r));const n=Rt(r),o=await Fi(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",bI).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Tf(r),u}),c=await Rn._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(c.user),c}function xI(r,e,t){return qe(r.app)?Promise.reject(yt(r)):PI(de(r),wr.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&Tf(r),n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DI(r,e){return ut(r,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kI(r,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const n=de(r),i={idToken:await n.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await ir(n,DI(n.auth,i));n.displayName=o.displayName||null,n.photoURL=o.photoUrl||null;const c=n.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=n.displayName,c.photoURL=n.photoURL),await n._updateTokensIfNecessary(o)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NI(r,e){return de(r).setPersistence(e)}function OI(r,e,t,n){return de(r).onIdTokenChanged(e,t,n)}function MI(r,e,t){return de(r).beforeAuthStateChanged(e,t)}function LI(r,e,t,n){return de(r).onAuthStateChanged(e,t,n)}function FI(r){return de(r).signOut()}const Bi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Bi,"1"),this.storage.removeItem(Bi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UI=1e3,BI=10;class vf extends wf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=pf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);Yy()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,BI):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},UI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}vf.type="LOCAL";const Af=vf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf extends wf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}bf.type="SESSION";const Rf=bf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jI(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new po(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),u=await jI(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}po.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wc(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=wc("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(m){const g=m;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(){return window}function zI(r){st().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sf(){return typeof st().WorkerGlobalScope<"u"&&typeof st().importScripts=="function"}async function $I(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function GI(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function KI(){return Sf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf="firebaseLocalStorageDb",HI=1,ji="firebaseLocalStorage",Cf="fbase_key";class Ds{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function mo(r,e){return r.transaction([ji],e?"readwrite":"readonly").objectStore(ji)}function WI(){const r=indexedDB.deleteDatabase(Pf);return new Ds(r).toPromise()}function Ma(){const r=indexedDB.open(Pf,HI);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(ji,{keyPath:Cf})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(ji)?e(n):(n.close(),await WI(),e(await Ma()))})})}async function Gl(r,e,t){const n=mo(r,!0).put({[Cf]:e,value:t});return new Ds(n).toPromise()}async function QI(r,e){const t=mo(r,!1).get(e),n=await new Ds(t).toPromise();return n===void 0?null:n.value}function Kl(r,e){const t=mo(r,!0).delete(e);return new Ds(t).toPromise()}const JI=800,YI=3;class Vf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ma(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>YI)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Sf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=po._getInstance(KI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await $I(),!this.activeServiceWorker)return;this.sender=new qI(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(n=e[0])!=null&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||GI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ma();return await Gl(e,Bi,"1"),await Kl(e,Bi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Gl(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>QI(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Kl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=mo(s,!1).getAll();return new Ds(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),JI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Vf.type="LOCAL";const XI=Vf;new Cs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xf(r,e){return e?gt(e):($(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc extends Ic{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return tr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return tr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return tr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ZI(r){return Ef(r.auth,new vc(r),r.bypassAuthState)}function eE(r){const{auth:e,user:t}=r;return $(t,e,"internal-error"),SI(t,new vc(r),r.bypassAuthState)}async function tE(r){const{auth:e,user:t}=r;return $(t,e,"internal-error"),RI(t,new vc(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ZI;case"linkViaPopup":case"linkViaRedirect":return tE;case"reauthViaPopup":case"reauthViaRedirect":return eE;default:We(this.auth,"internal-error")}}resolve(e){Et(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Et(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nE=new Cs(2e3,1e4);async function Hl(r,e,t){if(qe(r.app))return Promise.reject(et(r,"operation-not-supported-in-this-environment"));const n=Rt(r);xy(r,e,Tc);const s=xf(n,t);return new gn(n,"signInViaPopup",e,s).executeNotNull()}class gn extends Df{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,gn.currentPopupAction&&gn.currentPopupAction.cancel(),gn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return $(e,this.auth,"internal-error"),e}async onExecution(){Et(this.filter.length===1,"Popup operations only handle one event");const e=wc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(et(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(et(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,gn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if((n=(t=this.authWindow)==null?void 0:t.window)!=null&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(et(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,nE.get())};e()}}gn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE="pendingRedirect",Ii=new Map;class sE extends Df{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Ii.get(this.auth._key());if(!e){try{const n=await iE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Ii.set(this.auth._key(),e)}return this.bypassAuthState||Ii.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function iE(r,e){const t=cE(e),n=aE(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function oE(r,e){Ii.set(r._key(),e)}function aE(r){return gt(r._redirectPersistence)}function cE(r){return yi(rE,r.config.apiKey,r.name)}async function uE(r,e,t=!1){if(qe(r.app))return Promise.reject(yt(r));const n=Rt(r),s=xf(n,e),o=await new sE(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lE=10*60*1e3;class hE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!dE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!kf(e)){const s=((n=e.error.code)==null?void 0:n.split("auth/")[1])||"internal-error";t.onError(et(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=lE&&this.cachedEventUids.clear(),this.cachedEventUids.has(Wl(e))}saveEventToCache(e){this.cachedEventUids.add(Wl(e)),this.lastProcessedEventTime=Date.now()}}function Wl(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function kf({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function dE(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return kf(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fE(r,e={}){return ut(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,mE=/^https?/;async function gE(r){if(r.config.emulator)return;const{authorizedDomains:e}=await fE(r);for(const t of e)try{if(_E(t))return}catch{}We(r,"unauthorized-domain")}function _E(r){const e=Na(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!mE.test(t))return!1;if(pE.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yE=new Cs(3e4,6e4);function Ql(){const r=st().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function IE(r){return new Promise((e,t)=>{var s,i,o;function n(){Ql(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ql(),t(et(r,"network-request-failed"))},timeout:yE.get()})}if((i=(s=st().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=st().gapi)!=null&&o.load)n();else{const c=oI("iframefcb");return st()[c]=()=>{gapi.load?n():t(et(r,"network-request-failed"))},gf(`${iI()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ei=null,e})}let Ei=null;function EE(r){return Ei=Ei||IE(r),Ei}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TE=new Cs(5e3,15e3),wE="__/auth/iframe",vE="emulator/auth/iframe",AE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},bE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function RE(r){const e=r.config;$(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?gc(e,vE):`https://${r.config.authDomain}/${wE}`,n={apiKey:e.apiKey,appName:r.name,v:Tr},s=bE.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${Ps(n).slice(1)}`}async function SE(r){const e=await EE(r),t=st().gapi;return $(t,r,"internal-error"),e.open({where:document.body,url:RE(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:AE,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=et(r,"network-request-failed"),c=st().setTimeout(()=>{i(o)},TE.get());function u(){st().clearTimeout(c),s(n)}n.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},CE=500,VE=600,xE="_blank",DE="http://localhost";class Jl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function kE(r,e,t,n=CE,s=VE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u={...PE,width:n.toString(),height:s.toString(),top:i,left:o},h=ge().toLowerCase();t&&(c=uf(h)?xE:t),af(h)&&(e=e||DE,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[R,V])=>`${g}${R}=${V},`,"");if(Jy(h)&&c!=="_self")return NE(e||"",c),new Jl(null);const m=window.open(e||"",c,f);$(m,r,"popup-blocked");try{m.focus()}catch{}return new Jl(m)}function NE(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OE="__/auth/handler",ME="emulator/auth/handler",LE=encodeURIComponent("fac");async function Yl(r,e,t,n,s,i){$(r.config.authDomain,r,"auth-domain-config-required"),$(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Tr,eventId:s};if(e instanceof Tc){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",__(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof xs){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),h=u?`#${LE}=${encodeURIComponent(u)}`:"";return`${FE(r)}?${Ps(c).slice(1)}${h}`}function FE({config:r}){return r.emulator?gc(r,ME):`https://${r.authDomain}/${OE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea="webStorageSupport";class UE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Rf,this._completeRedirectFn=uE,this._overrideRedirectResult=oE}async _openPopup(e,t,n,s){var o;Et((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Yl(e,t,n,Na(),s);return kE(e,i,wc())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await Yl(e,t,n,Na(),s);return zI(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Et(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await SE(e),n=new hE(e);return t.register("authEvent",s=>($(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ea,{type:Ea},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[Ea];i!==void 0&&t(!!i),We(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=gE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return pf()||cf()||yc()}}const La=UE;var Xl="@firebase/auth",Zl="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){$(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jE(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function qE(r){sr(new An("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;$(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:mf(r)},h=new nI(n,s,i,u);return dI(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),sr(new An("auth-internal",e=>{const t=Rt(e.getProvider("auth").getImmediate());return(n=>new BE(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Gt(Xl,Zl,jE(r)),Gt(Xl,Zl,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zE=5*60,$E=Bd("authIdTokenMaxAge")||zE;let eh=null;const GE=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>$E)return;const s=t==null?void 0:t.token;eh!==s&&(eh=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function KE(r=Jd()){const e=fc(r,"auth");if(e.isInitialized())return e.getImmediate();const t=hI(r,{popupRedirectResolver:La,persistence:[XI,Af,Rf]}),n=Bd("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=GE(i.toString());MI(t,o,()=>o(t.currentUser)),OI(t,c=>o(c))}}const s=Fd("auth");return s&&fI(t,`http://${s}`),t}function HE(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}rI({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=et("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",HE().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});qE("Browser");var WE="firebase",QE="12.2.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Gt(WE,QE,"app");var th=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Kt,Nf;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function I(){}I.prototype=_.prototype,E.D=_.prototype,E.prototype=new I,E.prototype.constructor=E,E.C=function(T,w,b){for(var y=Array(arguments.length-2),lt=2;lt<arguments.length;lt++)y[lt-2]=arguments[lt];return _.prototype[w].apply(T,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,_,I){I||(I=0);var T=Array(16);if(typeof _=="string")for(var w=0;16>w;++w)T[w]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(w=0;16>w;++w)T[w]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=E.g[0],I=E.g[1],w=E.g[2];var b=E.g[3],y=_+(b^I&(w^b))+T[0]+3614090360&4294967295;_=I+(y<<7&4294967295|y>>>25),y=b+(w^_&(I^w))+T[1]+3905402710&4294967295,b=_+(y<<12&4294967295|y>>>20),y=w+(I^b&(_^I))+T[2]+606105819&4294967295,w=b+(y<<17&4294967295|y>>>15),y=I+(_^w&(b^_))+T[3]+3250441966&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(b^I&(w^b))+T[4]+4118548399&4294967295,_=I+(y<<7&4294967295|y>>>25),y=b+(w^_&(I^w))+T[5]+1200080426&4294967295,b=_+(y<<12&4294967295|y>>>20),y=w+(I^b&(_^I))+T[6]+2821735955&4294967295,w=b+(y<<17&4294967295|y>>>15),y=I+(_^w&(b^_))+T[7]+4249261313&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(b^I&(w^b))+T[8]+1770035416&4294967295,_=I+(y<<7&4294967295|y>>>25),y=b+(w^_&(I^w))+T[9]+2336552879&4294967295,b=_+(y<<12&4294967295|y>>>20),y=w+(I^b&(_^I))+T[10]+4294925233&4294967295,w=b+(y<<17&4294967295|y>>>15),y=I+(_^w&(b^_))+T[11]+2304563134&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(b^I&(w^b))+T[12]+1804603682&4294967295,_=I+(y<<7&4294967295|y>>>25),y=b+(w^_&(I^w))+T[13]+4254626195&4294967295,b=_+(y<<12&4294967295|y>>>20),y=w+(I^b&(_^I))+T[14]+2792965006&4294967295,w=b+(y<<17&4294967295|y>>>15),y=I+(_^w&(b^_))+T[15]+1236535329&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(w^b&(I^w))+T[1]+4129170786&4294967295,_=I+(y<<5&4294967295|y>>>27),y=b+(I^w&(_^I))+T[6]+3225465664&4294967295,b=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(b^_))+T[11]+643717713&4294967295,w=b+(y<<14&4294967295|y>>>18),y=I+(b^_&(w^b))+T[0]+3921069994&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(w^b&(I^w))+T[5]+3593408605&4294967295,_=I+(y<<5&4294967295|y>>>27),y=b+(I^w&(_^I))+T[10]+38016083&4294967295,b=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(b^_))+T[15]+3634488961&4294967295,w=b+(y<<14&4294967295|y>>>18),y=I+(b^_&(w^b))+T[4]+3889429448&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(w^b&(I^w))+T[9]+568446438&4294967295,_=I+(y<<5&4294967295|y>>>27),y=b+(I^w&(_^I))+T[14]+3275163606&4294967295,b=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(b^_))+T[3]+4107603335&4294967295,w=b+(y<<14&4294967295|y>>>18),y=I+(b^_&(w^b))+T[8]+1163531501&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(w^b&(I^w))+T[13]+2850285829&4294967295,_=I+(y<<5&4294967295|y>>>27),y=b+(I^w&(_^I))+T[2]+4243563512&4294967295,b=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(b^_))+T[7]+1735328473&4294967295,w=b+(y<<14&4294967295|y>>>18),y=I+(b^_&(w^b))+T[12]+2368359562&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(I^w^b)+T[5]+4294588738&4294967295,_=I+(y<<4&4294967295|y>>>28),y=b+(_^I^w)+T[8]+2272392833&4294967295,b=_+(y<<11&4294967295|y>>>21),y=w+(b^_^I)+T[11]+1839030562&4294967295,w=b+(y<<16&4294967295|y>>>16),y=I+(w^b^_)+T[14]+4259657740&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(I^w^b)+T[1]+2763975236&4294967295,_=I+(y<<4&4294967295|y>>>28),y=b+(_^I^w)+T[4]+1272893353&4294967295,b=_+(y<<11&4294967295|y>>>21),y=w+(b^_^I)+T[7]+4139469664&4294967295,w=b+(y<<16&4294967295|y>>>16),y=I+(w^b^_)+T[10]+3200236656&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(I^w^b)+T[13]+681279174&4294967295,_=I+(y<<4&4294967295|y>>>28),y=b+(_^I^w)+T[0]+3936430074&4294967295,b=_+(y<<11&4294967295|y>>>21),y=w+(b^_^I)+T[3]+3572445317&4294967295,w=b+(y<<16&4294967295|y>>>16),y=I+(w^b^_)+T[6]+76029189&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(I^w^b)+T[9]+3654602809&4294967295,_=I+(y<<4&4294967295|y>>>28),y=b+(_^I^w)+T[12]+3873151461&4294967295,b=_+(y<<11&4294967295|y>>>21),y=w+(b^_^I)+T[15]+530742520&4294967295,w=b+(y<<16&4294967295|y>>>16),y=I+(w^b^_)+T[2]+3299628645&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(w^(I|~b))+T[0]+4096336452&4294967295,_=I+(y<<6&4294967295|y>>>26),y=b+(I^(_|~w))+T[7]+1126891415&4294967295,b=_+(y<<10&4294967295|y>>>22),y=w+(_^(b|~I))+T[14]+2878612391&4294967295,w=b+(y<<15&4294967295|y>>>17),y=I+(b^(w|~_))+T[5]+4237533241&4294967295,I=w+(y<<21&4294967295|y>>>11),y=_+(w^(I|~b))+T[12]+1700485571&4294967295,_=I+(y<<6&4294967295|y>>>26),y=b+(I^(_|~w))+T[3]+2399980690&4294967295,b=_+(y<<10&4294967295|y>>>22),y=w+(_^(b|~I))+T[10]+4293915773&4294967295,w=b+(y<<15&4294967295|y>>>17),y=I+(b^(w|~_))+T[1]+2240044497&4294967295,I=w+(y<<21&4294967295|y>>>11),y=_+(w^(I|~b))+T[8]+1873313359&4294967295,_=I+(y<<6&4294967295|y>>>26),y=b+(I^(_|~w))+T[15]+4264355552&4294967295,b=_+(y<<10&4294967295|y>>>22),y=w+(_^(b|~I))+T[6]+2734768916&4294967295,w=b+(y<<15&4294967295|y>>>17),y=I+(b^(w|~_))+T[13]+1309151649&4294967295,I=w+(y<<21&4294967295|y>>>11),y=_+(w^(I|~b))+T[4]+4149444226&4294967295,_=I+(y<<6&4294967295|y>>>26),y=b+(I^(_|~w))+T[11]+3174756917&4294967295,b=_+(y<<10&4294967295|y>>>22),y=w+(_^(b|~I))+T[2]+718787259&4294967295,w=b+(y<<15&4294967295|y>>>17),y=I+(b^(w|~_))+T[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+w&4294967295,E.g[3]=E.g[3]+b&4294967295}n.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var I=_-this.blockSize,T=this.B,w=this.h,b=0;b<_;){if(w==0)for(;b<=I;)s(this,E,b),b+=this.blockSize;if(typeof E=="string"){for(;b<_;)if(T[w++]=E.charCodeAt(b++),w==this.blockSize){s(this,T),w=0;break}}else for(;b<_;)if(T[w++]=E[b++],w==this.blockSize){s(this,T),w=0;break}}this.h=w,this.o+=_},n.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var I=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=I&255,I/=256;for(this.u(E),E=Array(16),_=I=0;4>_;++_)for(var T=0;32>T;T+=8)E[I++]=this.g[_]>>>T&255;return E};function i(E,_){var I=c;return Object.prototype.hasOwnProperty.call(I,E)?I[E]:I[E]=_(E)}function o(E,_){this.h=_;for(var I=[],T=!0,w=E.length-1;0<=w;w--){var b=E[w]|0;T&&b==_||(I[w]=b,T=!1)}this.g=I}var c={};function u(E){return-128<=E&&128>E?i(E,function(_){return new o([_|0],0>_?-1:0)}):new o([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return m;if(0>E)return C(h(-E));for(var _=[],I=1,T=0;E>=I;T++)_[T]=E/I|0,I*=4294967296;return new o(_,0)}function f(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return C(f(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=h(Math.pow(_,8)),T=m,w=0;w<E.length;w+=8){var b=Math.min(8,E.length-w),y=parseInt(E.substring(w,w+b),_);8>b?(b=h(Math.pow(_,b)),T=T.j(b).add(h(y))):(T=T.j(I),T=T.add(h(y)))}return T}var m=u(0),g=u(1),R=u(16777216);r=o.prototype,r.m=function(){if(k(this))return-C(this).m();for(var E=0,_=1,I=0;I<this.g.length;I++){var T=this.i(I);E+=(0<=T?T:4294967296+T)*_,_*=4294967296}return E},r.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(V(this))return"0";if(k(this))return"-"+C(this).toString(E);for(var _=h(Math.pow(E,6)),I=this,T="";;){var w=q(I,_).g;I=O(I,w.j(_));var b=((0<I.g.length?I.g[0]:I.h)>>>0).toString(E);if(I=w,V(I))return b+T;for(;6>b.length;)b="0"+b;T=b+T}},r.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function V(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function k(E){return E.h==-1}r.l=function(E){return E=O(this,E),k(E)?-1:V(E)?0:1};function C(E){for(var _=E.g.length,I=[],T=0;T<_;T++)I[T]=~E.g[T];return new o(I,~E.h).add(g)}r.abs=function(){return k(this)?C(this):this},r.add=function(E){for(var _=Math.max(this.g.length,E.g.length),I=[],T=0,w=0;w<=_;w++){var b=T+(this.i(w)&65535)+(E.i(w)&65535),y=(b>>>16)+(this.i(w)>>>16)+(E.i(w)>>>16);T=y>>>16,b&=65535,y&=65535,I[w]=y<<16|b}return new o(I,I[I.length-1]&-2147483648?-1:0)};function O(E,_){return E.add(C(_))}r.j=function(E){if(V(this)||V(E))return m;if(k(this))return k(E)?C(this).j(C(E)):C(C(this).j(E));if(k(E))return C(this.j(C(E)));if(0>this.l(R)&&0>E.l(R))return h(this.m()*E.m());for(var _=this.g.length+E.g.length,I=[],T=0;T<2*_;T++)I[T]=0;for(T=0;T<this.g.length;T++)for(var w=0;w<E.g.length;w++){var b=this.i(T)>>>16,y=this.i(T)&65535,lt=E.i(w)>>>16,Sr=E.i(w)&65535;I[2*T+2*w]+=y*Sr,L(I,2*T+2*w),I[2*T+2*w+1]+=b*Sr,L(I,2*T+2*w+1),I[2*T+2*w+1]+=y*lt,L(I,2*T+2*w+1),I[2*T+2*w+2]+=b*lt,L(I,2*T+2*w+2)}for(T=0;T<_;T++)I[T]=I[2*T+1]<<16|I[2*T];for(T=_;T<2*_;T++)I[T]=0;return new o(I,0)};function L(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function U(E,_){this.g=E,this.h=_}function q(E,_){if(V(_))throw Error("division by zero");if(V(E))return new U(m,m);if(k(E))return _=q(C(E),_),new U(C(_.g),C(_.h));if(k(_))return _=q(E,C(_)),new U(C(_.g),_.h);if(30<E.g.length){if(k(E)||k(_))throw Error("slowDivide_ only works with positive integers.");for(var I=g,T=_;0>=T.l(E);)I=G(I),T=G(T);var w=Q(I,1),b=Q(T,1);for(T=Q(T,2),I=Q(I,2);!V(T);){var y=b.add(T);0>=y.l(E)&&(w=w.add(I),b=y),T=Q(T,1),I=Q(I,1)}return _=O(E,w.j(_)),new U(w,_)}for(w=m;0<=E.l(_);){for(I=Math.max(1,Math.floor(E.m()/_.m())),T=Math.ceil(Math.log(I)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),b=h(I),y=b.j(_);k(y)||0<y.l(E);)I-=T,b=h(I),y=b.j(_);V(b)&&(b=g),w=w.add(b),E=O(E,y)}return new U(w,E)}r.A=function(E){return q(this,E).h},r.and=function(E){for(var _=Math.max(this.g.length,E.g.length),I=[],T=0;T<_;T++)I[T]=this.i(T)&E.i(T);return new o(I,this.h&E.h)},r.or=function(E){for(var _=Math.max(this.g.length,E.g.length),I=[],T=0;T<_;T++)I[T]=this.i(T)|E.i(T);return new o(I,this.h|E.h)},r.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),I=[],T=0;T<_;T++)I[T]=this.i(T)^E.i(T);return new o(I,this.h^E.h)};function G(E){for(var _=E.g.length+1,I=[],T=0;T<_;T++)I[T]=E.i(T)<<1|E.i(T-1)>>>31;return new o(I,E.h)}function Q(E,_){var I=_>>5;_%=32;for(var T=E.g.length-I,w=[],b=0;b<T;b++)w[b]=0<_?E.i(b+I)>>>_|E.i(b+I+1)<<32-_:E.i(b+I);return new o(w,E.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Nf=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Kt=o}).apply(typeof th<"u"?th:typeof self<"u"?self:typeof window<"u"?window:{});var ui=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Of,Yr,Mf,Ti,Fa,Lf,Ff,Uf;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,d){return a==Array.prototype||a==Object.prototype||(a[l]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ui=="object"&&ui];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var A=a[p];if(!(A in d))break e;d=d[A]}a=a[a.length-1],p=d[a],l=l(p),l!=p&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}function i(a,l){a instanceof String&&(a+="");var d=0,p=!1,A={next:function(){if(!p&&d<a.length){var S=d++;return{value:l(S,a[S]),done:!1}}return p=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(a){return a||function(){return i(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function u(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function h(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,d){return a.call.apply(a.bind,arguments)}function m(a,l,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,p),a.apply(l,A)}}return function(){return a.apply(l,arguments)}}function g(a,l,d){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,g.apply(null,arguments)}function R(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function V(a,l){function d(){}d.prototype=l.prototype,a.aa=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,A,S){for(var M=Array(arguments.length-2),se=2;se<arguments.length;se++)M[se-2]=arguments[se];return l.prototype[A].apply(p,M)}}function k(a){const l=a.length;if(0<l){const d=Array(l);for(let p=0;p<l;p++)d[p]=a[p];return d}return[]}function C(a,l){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const A=a.length||0,S=p.length||0;a.length=A+S;for(let M=0;M<S;M++)a[A+M]=p[M]}else a.push(p)}}class O{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function L(a){return/^[\s\xa0]*$/.test(a)}function U(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function q(a){return q[" "](a),a}q[" "]=function(){};var G=U().indexOf("Gecko")!=-1&&!(U().toLowerCase().indexOf("webkit")!=-1&&U().indexOf("Edge")==-1)&&!(U().indexOf("Trident")!=-1||U().indexOf("MSIE")!=-1)&&U().indexOf("Edge")==-1;function Q(a,l,d){for(const p in a)l.call(d,a[p],p,a)}function E(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function _(a){const l={};for(const d in a)l[d]=a[d];return l}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(a,l){let d,p;for(let A=1;A<arguments.length;A++){p=arguments[A];for(d in p)a[d]=p[d];for(let S=0;S<I.length;S++)d=I[S],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function w(a){var l=1;a=a.split(":");const d=[];for(;0<l&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function b(a){c.setTimeout(()=>{throw a},0)}function y(){var a=$o;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class lt{constructor(){this.h=this.g=null}add(l,d){const p=Sr.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var Sr=new O(()=>new rg,a=>a.reset());class rg{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Pr,Cr=!1,$o=new lt,wu=()=>{const a=c.Promise.resolve(void 0);Pr=()=>{a.then(sg)}};var sg=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){b(d)}var l=Sr;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}Cr=!1};function Ct(){this.s=this.s,this.C=this.C}Ct.prototype.s=!1,Ct.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ct.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ve(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}ve.prototype.h=function(){this.defaultPrevented=!0};var ig=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return a}();function Vr(a,l){if(ve.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(G){e:{try{q(l.nodeName);var A=!0;break e}catch{}A=!1}A||(l=null)}}else d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:og[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Vr.aa.h.call(this)}}V(Vr,ve);var og={2:"touch",3:"pen",4:"mouse"};Vr.prototype.h=function(){Vr.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var zs="closure_listenable_"+(1e6*Math.random()|0),ag=0;function cg(a,l,d,p,A){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=A,this.key=++ag,this.da=this.fa=!1}function $s(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Gs(a){this.src=a,this.g={},this.h=0}Gs.prototype.add=function(a,l,d,p,A){var S=a.toString();a=this.g[S],a||(a=this.g[S]=[],this.h++);var M=Ko(a,l,p,A);return-1<M?(l=a[M],d||(l.fa=!1)):(l=new cg(l,this.src,S,!!p,A),l.fa=d,a.push(l)),l};function Go(a,l){var d=l.type;if(d in a.g){var p=a.g[d],A=Array.prototype.indexOf.call(p,l,void 0),S;(S=0<=A)&&Array.prototype.splice.call(p,A,1),S&&($s(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Ko(a,l,d,p){for(var A=0;A<a.length;++A){var S=a[A];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==p)return A}return-1}var Ho="closure_lm_"+(1e6*Math.random()|0),Wo={};function vu(a,l,d,p,A){if(Array.isArray(l)){for(var S=0;S<l.length;S++)vu(a,l[S],d,p,A);return null}return d=Ru(d),a&&a[zs]?a.K(l,d,h(p)?!!p.capture:!1,A):ug(a,l,d,!1,p,A)}function ug(a,l,d,p,A,S){if(!l)throw Error("Invalid event type");var M=h(A)?!!A.capture:!!A,se=Jo(a);if(se||(a[Ho]=se=new Gs(a)),d=se.add(l,d,p,M,S),d.proxy)return d;if(p=lg(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)ig||(A=M),A===void 0&&(A=!1),a.addEventListener(l.toString(),p,A);else if(a.attachEvent)a.attachEvent(bu(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function lg(){function a(d){return l.call(a.src,a.listener,d)}const l=hg;return a}function Au(a,l,d,p,A){if(Array.isArray(l))for(var S=0;S<l.length;S++)Au(a,l[S],d,p,A);else p=h(p)?!!p.capture:!!p,d=Ru(d),a&&a[zs]?(a=a.i,l=String(l).toString(),l in a.g&&(S=a.g[l],d=Ko(S,d,p,A),-1<d&&($s(S[d]),Array.prototype.splice.call(S,d,1),S.length==0&&(delete a.g[l],a.h--)))):a&&(a=Jo(a))&&(l=a.g[l.toString()],a=-1,l&&(a=Ko(l,d,p,A)),(d=-1<a?l[a]:null)&&Qo(d))}function Qo(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[zs])Go(l.i,a);else{var d=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(d,p,a.capture):l.detachEvent?l.detachEvent(bu(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=Jo(l))?(Go(d,a),d.h==0&&(d.src=null,l[Ho]=null)):$s(a)}}}function bu(a){return a in Wo?Wo[a]:Wo[a]="on"+a}function hg(a,l){if(a.da)a=!0;else{l=new Vr(l,this);var d=a.listener,p=a.ha||a.src;a.fa&&Qo(a),a=d.call(p,l)}return a}function Jo(a){return a=a[Ho],a instanceof Gs?a:null}var Yo="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ru(a){return typeof a=="function"?a:(a[Yo]||(a[Yo]=function(l){return a.handleEvent(l)}),a[Yo])}function Ae(){Ct.call(this),this.i=new Gs(this),this.M=this,this.F=null}V(Ae,Ct),Ae.prototype[zs]=!0,Ae.prototype.removeEventListener=function(a,l,d,p){Au(this,a,l,d,p)};function xe(a,l){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new ve(l,a);else if(l instanceof ve)l.target=l.target||a;else{var A=l;l=new ve(p,a),T(l,A)}if(A=!0,d)for(var S=d.length-1;0<=S;S--){var M=l.g=d[S];A=Ks(M,p,!0,l)&&A}if(M=l.g=a,A=Ks(M,p,!0,l)&&A,A=Ks(M,p,!1,l)&&A,d)for(S=0;S<d.length;S++)M=l.g=d[S],A=Ks(M,p,!1,l)&&A}Ae.prototype.N=function(){if(Ae.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var d=a.g[l],p=0;p<d.length;p++)$s(d[p]);delete a.g[l],a.h--}}this.F=null},Ae.prototype.K=function(a,l,d,p){return this.i.add(String(a),l,!1,d,p)},Ae.prototype.L=function(a,l,d,p){return this.i.add(String(a),l,!0,d,p)};function Ks(a,l,d,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var A=!0,S=0;S<l.length;++S){var M=l[S];if(M&&!M.da&&M.capture==d){var se=M.listener,Ee=M.ha||M.src;M.fa&&Go(a.i,M),A=se.call(Ee,p)!==!1&&A}}return A&&!p.defaultPrevented}function Su(a,l,d){if(typeof a=="function")d&&(a=g(a,d));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(a,l||0)}function Pu(a){a.g=Su(()=>{a.g=null,a.i&&(a.i=!1,Pu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class dg extends Ct{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Pu(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function xr(a){Ct.call(this),this.h=a,this.g={}}V(xr,Ct);var Cu=[];function Vu(a){Q(a.g,function(l,d){this.g.hasOwnProperty(d)&&Qo(l)},a),a.g={}}xr.prototype.N=function(){xr.aa.N.call(this),Vu(this)},xr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Xo=c.JSON.stringify,fg=c.JSON.parse,pg=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Zo(){}Zo.prototype.h=null;function xu(a){return a.h||(a.h=a.i())}function Du(){}var Dr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ea(){ve.call(this,"d")}V(ea,ve);function ta(){ve.call(this,"c")}V(ta,ve);var nn={},ku=null;function Hs(){return ku=ku||new Ae}nn.La="serverreachability";function Nu(a){ve.call(this,nn.La,a)}V(Nu,ve);function kr(a){const l=Hs();xe(l,new Nu(l))}nn.STAT_EVENT="statevent";function Ou(a,l){ve.call(this,nn.STAT_EVENT,a),this.stat=l}V(Ou,ve);function De(a){const l=Hs();xe(l,new Ou(l,a))}nn.Ma="timingevent";function Mu(a,l){ve.call(this,nn.Ma,a),this.size=l}V(Mu,ve);function Nr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},l)}function Or(){this.g=!0}Or.prototype.xa=function(){this.g=!1};function mg(a,l,d,p,A,S){a.info(function(){if(a.g)if(S)for(var M="",se=S.split("&"),Ee=0;Ee<se.length;Ee++){var Z=se[Ee].split("=");if(1<Z.length){var be=Z[0];Z=Z[1];var Re=be.split("_");M=2<=Re.length&&Re[1]=="type"?M+(be+"="+Z+"&"):M+(be+"=redacted&")}}else M=null;else M=S;return"XMLHTTP REQ ("+p+") [attempt "+A+"]: "+l+`
`+d+`
`+M})}function gg(a,l,d,p,A,S,M){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+A+"]: "+l+`
`+d+`
`+S+" "+M})}function Ln(a,l,d,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+yg(a,d)+(p?" "+p:"")})}function _g(a,l){a.info(function(){return"TIMEOUT: "+l})}Or.prototype.info=function(){};function yg(a,l){if(!a.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var A=p[1];if(Array.isArray(A)&&!(1>A.length)){var S=A[0];if(S!="noop"&&S!="stop"&&S!="close")for(var M=1;M<A.length;M++)A[M]=""}}}}return Xo(d)}catch{return l}}var Ws={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Lu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},na;function Qs(){}V(Qs,Zo),Qs.prototype.g=function(){return new XMLHttpRequest},Qs.prototype.i=function(){return{}},na=new Qs;function Vt(a,l,d,p){this.j=a,this.i=l,this.l=d,this.R=p||1,this.U=new xr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Fu}function Fu(){this.i=null,this.g="",this.h=!1}var Uu={},ra={};function sa(a,l,d){a.L=1,a.v=Zs(ht(l)),a.m=d,a.P=!0,Bu(a,null)}function Bu(a,l){a.F=Date.now(),Js(a),a.A=ht(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),el(d.i,"t",p),a.C=0,d=a.j.J,a.h=new Fu,a.g=yl(a.j,d?l:null,!a.m),0<a.O&&(a.M=new dg(g(a.Y,a,a.g),a.O)),l=a.U,d=a.g,p=a.ca;var A="readystatechange";Array.isArray(A)||(A&&(Cu[0]=A.toString()),A=Cu);for(var S=0;S<A.length;S++){var M=vu(d,A[S],p||l.handleEvent,!1,l.h||l);if(!M)break;l.g[M.key]=M}l=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),kr(),mg(a.i,a.u,a.A,a.l,a.R,a.m)}Vt.prototype.ca=function(a){a=a.target;const l=this.M;l&&dt(a)==3?l.j():this.Y(a)},Vt.prototype.Y=function(a){try{if(a==this.g)e:{const Re=dt(this.g);var l=this.g.Ba();const Bn=this.g.Z();if(!(3>Re)&&(Re!=3||this.g&&(this.h.h||this.g.oa()||al(this.g)))){this.J||Re!=4||l==7||(l==8||0>=Bn?kr(3):kr(2)),ia(this);var d=this.g.Z();this.X=d;t:if(ju(this)){var p=al(this.g);a="";var A=p.length,S=dt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){rn(this),Mr(this);var M="";break t}this.h.i=new c.TextDecoder}for(l=0;l<A;l++)this.h.h=!0,a+=this.h.i.decode(p[l],{stream:!(S&&l==A-1)});p.length=0,this.h.g+=a,this.C=0,M=this.h.g}else M=this.g.oa();if(this.o=d==200,gg(this.i,this.u,this.A,this.l,this.R,Re,d),this.o){if(this.T&&!this.K){t:{if(this.g){var se,Ee=this.g;if((se=Ee.g?Ee.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(se)){var Z=se;break t}}Z=null}if(d=Z)Ln(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,oa(this,d);else{this.o=!1,this.s=3,De(12),rn(this),Mr(this);break e}}if(this.P){d=!0;let Qe;for(;!this.J&&this.C<M.length;)if(Qe=Ig(this,M),Qe==ra){Re==4&&(this.s=4,De(14),d=!1),Ln(this.i,this.l,null,"[Incomplete Response]");break}else if(Qe==Uu){this.s=4,De(15),Ln(this.i,this.l,M,"[Invalid Chunk]"),d=!1;break}else Ln(this.i,this.l,Qe,null),oa(this,Qe);if(ju(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Re!=4||M.length!=0||this.h.h||(this.s=1,De(16),d=!1),this.o=this.o&&d,!d)Ln(this.i,this.l,M,"[Invalid Chunked Response]"),rn(this),Mr(this);else if(0<M.length&&!this.W){this.W=!0;var be=this.j;be.g==this&&be.ba&&!be.M&&(be.j.info("Great, no buffering proxy detected. Bytes received: "+M.length),da(be),be.M=!0,De(11))}}else Ln(this.i,this.l,M,null),oa(this,M);Re==4&&rn(this),this.o&&!this.J&&(Re==4?pl(this.j,this):(this.o=!1,Js(this)))}else Mg(this.g),d==400&&0<M.indexOf("Unknown SID")?(this.s=3,De(12)):(this.s=0,De(13)),rn(this),Mr(this)}}}catch{}finally{}};function ju(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Ig(a,l){var d=a.C,p=l.indexOf(`
`,d);return p==-1?ra:(d=Number(l.substring(d,p)),isNaN(d)?Uu:(p+=1,p+d>l.length?ra:(l=l.slice(p,p+d),a.C=p+d,l)))}Vt.prototype.cancel=function(){this.J=!0,rn(this)};function Js(a){a.S=Date.now()+a.I,qu(a,a.I)}function qu(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Nr(g(a.ba,a),l)}function ia(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Vt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(_g(this.i,this.A),this.L!=2&&(kr(),De(17)),rn(this),this.s=2,Mr(this)):qu(this,this.S-a)};function Mr(a){a.j.G==0||a.J||pl(a.j,a)}function rn(a){ia(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,Vu(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function oa(a,l){try{var d=a.j;if(d.G!=0&&(d.g==a||aa(d.h,a))){if(!a.K&&aa(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var A=p;if(A[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)ii(d),ri(d);else break e;ha(d),De(18)}}else d.za=A[1],0<d.za-d.T&&37500>A[2]&&d.F&&d.v==0&&!d.C&&(d.C=Nr(g(d.Za,d),6e3));if(1>=Gu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else on(d,11)}else if((a.K||d.g==a)&&ii(d),!L(l))for(A=d.Da.g.parse(l),l=0;l<A.length;l++){let Z=A[l];if(d.T=Z[0],Z=Z[1],d.G==2)if(Z[0]=="c"){d.K=Z[1],d.ia=Z[2];const be=Z[3];be!=null&&(d.la=be,d.j.info("VER="+d.la));const Re=Z[4];Re!=null&&(d.Aa=Re,d.j.info("SVER="+d.Aa));const Bn=Z[5];Bn!=null&&typeof Bn=="number"&&0<Bn&&(p=1.5*Bn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Qe=a.g;if(Qe){const ai=Qe.g?Qe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ai){var S=p.h;S.g||ai.indexOf("spdy")==-1&&ai.indexOf("quic")==-1&&ai.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(ca(S,S.h),S.h=null))}if(p.D){const fa=Qe.g?Qe.g.getResponseHeader("X-HTTP-Session-Id"):null;fa&&(p.ya=fa,ie(p.I,p.D,fa))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var M=a;if(p.qa=_l(p,p.J?p.ia:null,p.W),M.K){Ku(p.h,M);var se=M,Ee=p.L;Ee&&(se.I=Ee),se.B&&(ia(se),Js(se)),p.g=M}else dl(p);0<d.i.length&&si(d)}else Z[0]!="stop"&&Z[0]!="close"||on(d,7);else d.G==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?on(d,7):la(d):Z[0]!="noop"&&d.l&&d.l.ta(Z),d.v=0)}}kr(4)}catch{}}var Eg=class{constructor(a,l){this.g=a,this.map=l}};function zu(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function $u(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Gu(a){return a.h?1:a.g?a.g.size:0}function aa(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function ca(a,l){a.g?a.g.add(l):a.h=l}function Ku(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}zu.prototype.cancel=function(){if(this.i=Hu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Hu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.D);return l}return k(a.i)}function Tg(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var l=[],d=a.length,p=0;p<d;p++)l.push(a[p]);return l}l=[],d=0;for(p in a)l[d++]=a[p];return l}function wg(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var l=[];a=a.length;for(var d=0;d<a;d++)l.push(d);return l}l=[],d=0;for(const p in a)l[d++]=p;return l}}}function Wu(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var d=wg(a),p=Tg(a),A=p.length,S=0;S<A;S++)l.call(void 0,p[S],d&&d[S],a)}var Qu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function vg(a,l){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),A=null;if(0<=p){var S=a[d].substring(0,p);A=a[d].substring(p+1)}else S=a[d];l(S,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function sn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof sn){this.h=a.h,Ys(this,a.j),this.o=a.o,this.g=a.g,Xs(this,a.s),this.l=a.l;var l=a.i,d=new Ur;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),Ju(this,d),this.m=a.m}else a&&(l=String(a).match(Qu))?(this.h=!1,Ys(this,l[1]||"",!0),this.o=Lr(l[2]||""),this.g=Lr(l[3]||"",!0),Xs(this,l[4]),this.l=Lr(l[5]||"",!0),Ju(this,l[6]||"",!0),this.m=Lr(l[7]||"")):(this.h=!1,this.i=new Ur(null,this.h))}sn.prototype.toString=function(){var a=[],l=this.j;l&&a.push(Fr(l,Yu,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Fr(l,Yu,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Fr(d,d.charAt(0)=="/"?Rg:bg,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Fr(d,Pg)),a.join("")};function ht(a){return new sn(a)}function Ys(a,l,d){a.j=d?Lr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Xs(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function Ju(a,l,d){l instanceof Ur?(a.i=l,Cg(a.i,a.h)):(d||(l=Fr(l,Sg)),a.i=new Ur(l,a.h))}function ie(a,l,d){a.i.set(l,d)}function Zs(a){return ie(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Lr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Fr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Ag),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Ag(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Yu=/[#\/\?@]/g,bg=/[#\?:]/g,Rg=/[#\?]/g,Sg=/[#\?@]/g,Pg=/#/g;function Ur(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function xt(a){a.g||(a.g=new Map,a.h=0,a.i&&vg(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Ur.prototype,r.add=function(a,l){xt(this),this.i=null,a=Fn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function Xu(a,l){xt(a),l=Fn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Zu(a,l){return xt(a),l=Fn(a,l),a.g.has(l)}r.forEach=function(a,l){xt(this),this.g.forEach(function(d,p){d.forEach(function(A){a.call(l,A,p,this)},this)},this)},r.na=function(){xt(this);const a=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){const A=a[p];for(let S=0;S<A.length;S++)d.push(l[p])}return d},r.V=function(a){xt(this);let l=[];if(typeof a=="string")Zu(this,a)&&(l=l.concat(this.g.get(Fn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)l=l.concat(a[d])}return l},r.set=function(a,l){return xt(this),this.i=null,a=Fn(this,a),Zu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function el(a,l,d){Xu(a,l),0<d.length&&(a.i=null,a.g.set(Fn(a,l),k(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];const S=encodeURIComponent(String(p)),M=this.V(p);for(p=0;p<M.length;p++){var A=S;M[p]!==""&&(A+="="+encodeURIComponent(String(M[p]))),a.push(A)}}return this.i=a.join("&")};function Fn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Cg(a,l){l&&!a.j&&(xt(a),a.i=null,a.g.forEach(function(d,p){var A=p.toLowerCase();p!=A&&(Xu(this,p),el(this,A,d))},a)),a.j=l}function Vg(a,l){const d=new Or;if(c.Image){const p=new Image;p.onload=R(Dt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=R(Dt,d,"TestLoadImage: error",!1,l,p),p.onabort=R(Dt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=R(Dt,d,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function xg(a,l){const d=new Or,p=new AbortController,A=setTimeout(()=>{p.abort(),Dt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(S=>{clearTimeout(A),S.ok?Dt(d,"TestPingServer: ok",!0,l):Dt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),Dt(d,"TestPingServer: error",!1,l)})}function Dt(a,l,d,p,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),p(d)}catch{}}function Dg(){this.g=new pg}function kg(a,l,d){const p=d||"";try{Wu(a,function(A,S){let M=A;h(A)&&(M=Xo(A)),l.push(p+S+"="+encodeURIComponent(M))})}catch(A){throw l.push(p+"type="+encodeURIComponent("_badmap")),A}}function ei(a){this.l=a.Ub||null,this.j=a.eb||!1}V(ei,Zo),ei.prototype.g=function(){return new ti(this.l,this.j)},ei.prototype.i=function(a){return function(){return a}}({});function ti(a,l){Ae.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}V(ti,Ae),r=ti.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,jr(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Br(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,jr(this)),this.g&&(this.readyState=3,jr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;tl(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function tl(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?Br(this):jr(this),this.readyState==3&&tl(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,Br(this))},r.Qa=function(a){this.g&&(this.response=a,Br(this))},r.ga=function(){this.g&&Br(this)};function Br(a){a.readyState=4,a.l=null,a.j=null,a.v=null,jr(a)}r.setRequestHeader=function(a,l){this.u.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function jr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ti.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function nl(a){let l="";return Q(a,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function ua(a,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=nl(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ie(a,l,d))}function ue(a){Ae.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}V(ue,Ae);var Ng=/^https?$/i,Og=["POST","PUT"];r=ue.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():na.g(),this.v=this.o?xu(this.o):xu(na),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(S){rl(this,S);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var A in p)d.set(A,p[A]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())d.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),A=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Og,l,void 0))||p||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,M]of d)this.g.setRequestHeader(S,M);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ol(this),this.u=!0,this.g.send(a),this.u=!1}catch(S){rl(this,S)}};function rl(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,sl(a),ni(a)}function sl(a){a.A||(a.A=!0,xe(a,"complete"),xe(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,xe(this,"complete"),xe(this,"abort"),ni(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ni(this,!0)),ue.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?il(this):this.bb())},r.bb=function(){il(this)};function il(a){if(a.h&&typeof o<"u"&&(!a.v[1]||dt(a)!=4||a.Z()!=2)){if(a.u&&dt(a)==4)Su(a.Ea,0,a);else if(xe(a,"readystatechange"),dt(a)==4){a.h=!1;try{const M=a.Z();e:switch(M){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=M===0){var A=String(a.D).match(Qu)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),p=!Ng.test(A?A.toLowerCase():"")}d=p}if(d)xe(a,"complete"),xe(a,"success");else{a.m=6;try{var S=2<dt(a)?a.g.statusText:""}catch{S=""}a.l=S+" ["+a.Z()+"]",sl(a)}}finally{ni(a)}}}}function ni(a,l){if(a.g){ol(a);const d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||xe(a,"ready");try{d.onreadystatechange=p}catch{}}}function ol(a){a.I&&(c.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function dt(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<dt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),fg(l)}};function al(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Mg(a){const l={};a=(a.g&&2<=dt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(L(a[p]))continue;var d=w(a[p]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[A]||[];l[A]=S,S.push(d)}E(l,function(p){return p.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function qr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function cl(a){this.Aa=0,this.i=[],this.j=new Or,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=qr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=qr("baseRetryDelayMs",5e3,a),this.cb=qr("retryDelaySeedMs",1e4,a),this.Wa=qr("forwardChannelMaxRetries",2,a),this.wa=qr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new zu(a&&a.concurrentRequestLimit),this.Da=new Dg,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=cl.prototype,r.la=8,r.G=1,r.connect=function(a,l,d,p){De(0),this.W=a,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=_l(this,null,this.W),si(this)};function la(a){if(ul(a),a.G==3){var l=a.U++,d=ht(a.I);if(ie(d,"SID",a.K),ie(d,"RID",l),ie(d,"TYPE","terminate"),zr(a,d),l=new Vt(a,a.j,l),l.L=2,l.v=Zs(ht(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=yl(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Js(l)}gl(a)}function ri(a){a.g&&(da(a),a.g.cancel(),a.g=null)}function ul(a){ri(a),a.u&&(c.clearTimeout(a.u),a.u=null),ii(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function si(a){if(!$u(a.h)&&!a.s){a.s=!0;var l=a.Ga;Pr||wu(),Cr||(Pr(),Cr=!0),$o.add(l,a),a.B=0}}function Lg(a,l){return Gu(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Nr(g(a.Ga,a,l),ml(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const A=new Vt(this,this.j,a);let S=this.o;if(this.S&&(S?(S=_(S),T(S,this.S)):S=this.S),this.m!==null||this.O||(A.H=S,S=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=hl(this,A,l),d=ht(this.I),ie(d,"RID",a),ie(d,"CVER",22),this.D&&ie(d,"X-HTTP-Session-Id",this.D),zr(this,d),S&&(this.O?l="headers="+encodeURIComponent(String(nl(S)))+"&"+l:this.m&&ua(d,this.m,S)),ca(this.h,A),this.Ua&&ie(d,"TYPE","init"),this.P?(ie(d,"$req",l),ie(d,"SID","null"),A.T=!0,sa(A,d,null)):sa(A,d,l),this.G=2}}else this.G==3&&(a?ll(this,a):this.i.length==0||$u(this.h)||ll(this))};function ll(a,l){var d;l?d=l.l:d=a.U++;const p=ht(a.I);ie(p,"SID",a.K),ie(p,"RID",d),ie(p,"AID",a.T),zr(a,p),a.m&&a.o&&ua(p,a.m,a.o),d=new Vt(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),l&&(a.i=l.D.concat(a.i)),l=hl(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),ca(a.h,d),sa(d,p,l)}function zr(a,l){a.H&&Q(a.H,function(d,p){ie(l,p,d)}),a.l&&Wu({},function(d,p){ie(l,p,d)})}function hl(a,l,d){d=Math.min(a.i.length,d);var p=a.l?g(a.l.Na,a.l,a):null;e:{var A=a.i;let S=-1;for(;;){const M=["count="+d];S==-1?0<d?(S=A[0].g,M.push("ofs="+S)):S=0:M.push("ofs="+S);let se=!0;for(let Ee=0;Ee<d;Ee++){let Z=A[Ee].g;const be=A[Ee].map;if(Z-=S,0>Z)S=Math.max(0,A[Ee].g-100),se=!1;else try{kg(be,M,"req"+Z+"_")}catch{p&&p(be)}}if(se){p=M.join("&");break e}}}return a=a.i.splice(0,d),l.D=a,p}function dl(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;Pr||wu(),Cr||(Pr(),Cr=!0),$o.add(l,a),a.v=0}}function ha(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Nr(g(a.Fa,a),ml(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,fl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Nr(g(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,De(10),ri(this),fl(this))};function da(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function fl(a){a.g=new Vt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=ht(a.qa);ie(l,"RID","rpc"),ie(l,"SID",a.K),ie(l,"AID",a.T),ie(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&ie(l,"TO",a.ja),ie(l,"TYPE","xmlhttp"),zr(a,l),a.m&&a.o&&ua(l,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Zs(ht(l)),d.m=null,d.P=!0,Bu(d,a)}r.Za=function(){this.C!=null&&(this.C=null,ri(this),ha(this),De(19))};function ii(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function pl(a,l){var d=null;if(a.g==l){ii(a),da(a),a.g=null;var p=2}else if(aa(a.h,l))d=l.D,Ku(a.h,l),p=1;else return;if(a.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var A=a.B;p=Hs(),xe(p,new Mu(p,d)),si(a)}else dl(a);else if(A=l.s,A==3||A==0&&0<l.X||!(p==1&&Lg(a,l)||p==2&&ha(a)))switch(d&&0<d.length&&(l=a.h,l.i=l.i.concat(d)),A){case 1:on(a,5);break;case 4:on(a,10);break;case 3:on(a,6);break;default:on(a,2)}}}function ml(a,l){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*l}function on(a,l){if(a.j.info("Error code "+l),l==2){var d=g(a.fb,a),p=a.Xa;const A=!p;p=new sn(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ys(p,"https"),Zs(p),A?Vg(p.toString(),d):xg(p.toString(),d)}else De(2);a.G=0,a.l&&a.l.sa(l),gl(a),ul(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),De(2)):(this.j.info("Failed to ping google.com"),De(1))};function gl(a){if(a.G=0,a.ka=[],a.l){const l=Hu(a.h);(l.length!=0||a.i.length!=0)&&(C(a.ka,l),C(a.ka,a.i),a.h.i.length=0,k(a.i),a.i.length=0),a.l.ra()}}function _l(a,l,d){var p=d instanceof sn?ht(d):new sn(d);if(p.g!="")l&&(p.g=l+"."+p.g),Xs(p,p.s);else{var A=c.location;p=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;var S=new sn(null);p&&Ys(S,p),l&&(S.g=l),A&&Xs(S,A),d&&(S.l=d),p=S}return d=a.D,l=a.ya,d&&l&&ie(p,d,l),ie(p,"VER",a.la),zr(a,p),p}function yl(a,l,d){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new ue(new ei({eb:d})):new ue(a.pa),l.Ha(a.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Il(){}r=Il.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function oi(){}oi.prototype.g=function(a,l){return new Ue(a,l)};function Ue(a,l){Ae.call(this),this.g=new cl(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!L(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!L(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Un(this)}V(Ue,Ae),Ue.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ue.prototype.close=function(){la(this.g)},Ue.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Xo(a),a=d);l.i.push(new Eg(l.Ya++,a)),l.G==3&&si(l)},Ue.prototype.N=function(){this.g.l=null,delete this.j,la(this.g),delete this.g,Ue.aa.N.call(this)};function El(a){ea.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}V(El,ea);function Tl(){ta.call(this),this.status=1}V(Tl,ta);function Un(a){this.g=a}V(Un,Il),Un.prototype.ua=function(){xe(this.g,"a")},Un.prototype.ta=function(a){xe(this.g,new El(a))},Un.prototype.sa=function(a){xe(this.g,new Tl)},Un.prototype.ra=function(){xe(this.g,"b")},oi.prototype.createWebChannel=oi.prototype.g,Ue.prototype.send=Ue.prototype.o,Ue.prototype.open=Ue.prototype.m,Ue.prototype.close=Ue.prototype.close,Uf=function(){return new oi},Ff=function(){return Hs()},Lf=nn,Fa={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ws.NO_ERROR=0,Ws.TIMEOUT=8,Ws.HTTP_ERROR=6,Ti=Ws,Lu.COMPLETE="complete",Mf=Lu,Du.EventType=Dr,Dr.OPEN="a",Dr.CLOSE="b",Dr.ERROR="c",Dr.MESSAGE="d",Ae.prototype.listen=Ae.prototype.K,Yr=Du,ue.prototype.listenOnce=ue.prototype.L,ue.prototype.getLastError=ue.prototype.Ka,ue.prototype.getLastErrorCode=ue.prototype.Ba,ue.prototype.getStatus=ue.prototype.Z,ue.prototype.getResponseJson=ue.prototype.Oa,ue.prototype.getResponseText=ue.prototype.oa,ue.prototype.send=ue.prototype.ea,ue.prototype.setWithCredentials=ue.prototype.Ha,Of=ue}).apply(typeof ui<"u"?ui:typeof self<"u"?self:typeof window<"u"?window:{});const nh="@firebase/firestore",rh="4.9.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Te.UNAUTHENTICATED=new Te(null),Te.GOOGLE_CREDENTIALS=new Te("google-credentials-uid"),Te.FIRST_PARTY=new Te("first-party-uid"),Te.MOCK_USER=new Te("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vr="12.2.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn=new hc("@firebase/firestore");function Wn(){return Sn.logLevel}function D(r,...e){if(Sn.logLevel<=J.DEBUG){const t=e.map(Ac);Sn.debug(`Firestore (${vr}): ${r}`,...t)}}function ke(r,...e){if(Sn.logLevel<=J.ERROR){const t=e.map(Ac);Sn.error(`Firestore (${vr}): ${r}`,...t)}}function Pn(r,...e){if(Sn.logLevel<=J.WARN){const t=e.map(Ac);Sn.warn(`Firestore (${vr}): ${r}`,...t)}}function Ac(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,Bf(r,n,t)}function Bf(r,e,t){let n=`FIRESTORE (${vr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw ke(n),new Error(n)}function j(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||Bf(e,s,n)}function H(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends At{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class JE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Te.UNAUTHENTICATED))}shutdown(){}}class YE{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class XE{constructor(e){this.t=e,this.currentUser=Te.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){j(this.o===void 0,42304);let n=this.i;const s=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let i=new it;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new it,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new it)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(j(typeof n.accessToken=="string",31837,{l:n}),new jf(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return j(e===null||typeof e=="string",2055,{h:e}),new Te(e)}}class ZE{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Te.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class eT{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new ZE(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Te.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class sh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class tT{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,qe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){j(this.o===void 0,3512);const n=i=>{i.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,D("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>n(i))};const s=i=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new sh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(j(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new sh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nT(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=nT(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function K(r,e){return r<e?-1:r>e?1:0}function Ua(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return Ta(s)===Ta(i)?K(s,i):Ta(s)?1:-1}return K(r.length,e.length)}const rT=55296,sT=57343;function Ta(r){const e=r.charCodeAt(0);return e>=rT&&e<=sT}function or(r,e,t){return r.length===e.length&&r.every((n,s)=>t(n,e[s]))}function qf(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih="__name__";class tt{constructor(e,t,n){t===void 0?t=0:t>e.length&&B(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&B(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return tt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof tt?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=tt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return K(e.length,t.length)}static compareSegments(e,t){const n=tt.isNumericId(e),s=tt.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?tt.extractNumericId(e).compare(tt.extractNumericId(t)):Ua(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Kt.fromString(e.substring(4,e.length-2))}}class ee extends tt{construct(e,t,n){return new ee(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(s=>s.length>0))}return new ee(t)}static emptyPath(){return new ee([])}}const iT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ce extends tt{construct(e,t,n){return new ce(e,t,n)}static isValidIdentifier(e){return iT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ce.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ih}static keyField(){return new ce([ih])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(n+=c,s++):(i(),s++)}if(i(),o)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ce(t)}static emptyPath(){return new ce([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.path=e}static fromPath(e){return new F(ee.fromString(e))}static fromName(e){return new F(ee.fromString(e).popFirst(5))}static empty(){return new F(ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new F(new ee(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zf(r,e,t){if(!t)throw new N(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function oT(r,e,t,n){if(e===!0&&n===!0)throw new N(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function oh(r){if(!F.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function ah(r){if(F.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function $f(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function go(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":B(12329,{type:typeof r})}function Fe(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=go(r);throw new N(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(r,e){const t={typeString:r};return e&&(t.value=e),t}function ks(r,e){if(!$f(r))throw new N(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const o=r[n];if(s&&typeof o!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new N(P.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ch=-62135596800,uh=1e6;class te{static now(){return te.fromMillis(Date.now())}static fromDate(e){return te.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*uh);return new te(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ch)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/uh}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:te._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ks(e,te._jsonSchema))return new te(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ch;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}te._jsonSchemaVersion="firestore/timestamp/1.0",te._jsonSchema={type:pe("string",te._jsonSchemaVersion),seconds:pe("number"),nanoseconds:pe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{static fromTimestamp(e){return new z(e)}static min(){return new z(new te(0,0))}static max(){return new z(new te(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ps=-1;class qi{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function Ba(r){return r.fields.find(e=>e.kind===2)}function ln(r){return r.fields.filter(e=>e.kind!==2)}qi.UNKNOWN_ID=-1;class wi{constructor(e,t){this.fieldPath=e,this.kind=t}}class ms{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ms(0,$e.min())}}function aT(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=z.fromTimestamp(n===1e9?new te(t+1,0):new te(t,n));return new $e(s,F.empty(),e)}function Gf(r){return new $e(r.readTime,r.key,ps)}class $e{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new $e(z.min(),F.empty(),ps)}static max(){return new $e(z.max(),F.empty(),ps)}}function Rc(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(r.documentKey,e.documentKey),t!==0?t:K(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Hf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function On(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Kf)throw r;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new v((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof v?t:v.resolve(t)}catch(t){return v.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):v.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):v.reject(t)}static resolve(e){return new v((t,n)=>{t(e)})}static reject(e){return new v((t,n)=>{n(e)})}static waitFor(e){return new v((t,n)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},u=>n(u))}),o=!0,i===s&&t()})}static or(e){let t=v.resolve(!1);for(const n of e)t=t.next(s=>s?v.resolve(s):n());return t}static forEach(e,t){const n=[];return e.forEach((s,i)=>{n.push(t.call(this,s,i))}),this.waitFor(n)}static mapArray(e,t){return new v((n,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next(f=>{o[h]=f,++c,c===i&&n(o)},f=>s(f))}})}static doWhile(e,t){return new v((n,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):n()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const je="SimpleDb";class _o{static open(e,t,n,s){try{return new _o(t,e.transaction(s,n))}catch(i){throw new ss(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new it,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new ss(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=Sc(n.target.error);this.S.reject(new ss(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(D(je,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new uT(t)}}class Ht{static delete(e){return D(je,"Removing database:",e),dn(Ld().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!Kd())return!1;if(Ht.F())return!0;const e=ge(),t=Ht.M(e),n=0<t&&t<10,s=Wf(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,Ht.M(ge())===12.2&&ke("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(D(je,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new ss(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new N(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new N(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new ss(e,o))},s.onupgradeneeded=i=>{D(je,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next(()=>{D(je,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}$(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=_o.open(this.db,e,i?"readonly":"readwrite",n),u=s(c).next(h=>(c.C(),h)).catch(h=>(c.abort(h),v.reject(h))).toPromise();return u.catch(()=>{}),await c.D,u}catch(c){const u=c,h=u.name!=="FirebaseError"&&o<3;if(D(je,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Wf(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class cT{constructor(e){this.U=e,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(e){this.U=e}done(){this.K=!0}j(e){this.W=e}delete(){return dn(this.U.delete())}}class ss extends N{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Zt(r){return r.name==="IndexedDbTransactionError"}class uT{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(D(je,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(D(je,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),dn(n)}add(e){return D(je,"ADD",this.store.name,e,e),dn(this.store.add(e))}get(e){return dn(this.store.get(e)).next(t=>(t===void 0&&(t=null),D(je,"GET",this.store.name,e,t),t))}delete(e){return D(je,"DELETE",this.store.name,e),dn(this.store.delete(e))}count(){return D(je,"COUNT",this.store.name),dn(this.store.count())}J(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new v((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}})}{const i=this.cursor(n),o=[];return this.H(i,(c,u)=>{o.push(u)}).next(()=>o)}}Y(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new v((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}})}Z(e,t){D(je,"DELETE ALL",this.store.name);const n=this.options(e,t);n.X=!1;const s=this.cursor(n);return this.H(s,(i,o,c)=>c.delete())}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.H(s,t)}te(e){const t=this.cursor({});return new v((n,s)=>{t.onerror=i=>{const o=Sc(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():n()}):n()}})}H(e,t){const n=[];return new v((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new cT(c),h=t(c.primaryKey,c.value,u);if(h instanceof v){const f=h.catch(m=>(u.done(),v.reject(m)));n.push(f)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}}).next(()=>v.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.X?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function dn(r){return new v((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=Sc(n.target.error);t(s)}})}let lh=!1;function Sc(r){const e=Ht.M(ge());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new N("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return lh||(lh=!0,setTimeout(()=>{throw n},0)),n}}return r}const is="IndexBackfiller";class lT{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){D(is,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ne.ie();D(is,`Documents written: ${t}`)}catch(t){Zt(t)?D(is,"Ignoring IndexedDB error during index backfill: ",t):await On(t)}await this.re(6e4)})}}class hT{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const n=new Set;let s=t,i=!0;return v.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return D(is,`Processing collection: ${o}`),this.oe(e,o,s).next(c=>{s-=c,n.add(o)});i=!1})).next(()=>t-s)}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this._e(s,i)).next(c=>(D(is,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}_e(e,t){let n=e;return t.changes.forEach((s,i)=>{const o=Gf(i);Rc(o,n)>0&&(n=o)}),new $e(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ke.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=-1;function yo(r){return r==null}function gs(r){return r===0&&1/r==-1/0}function dT(r){return typeof r=="number"&&Number.isInteger(r)&&!gs(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zi="";function Ve(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=hh(e)),e=fT(r.get(t),e);return hh(e)}function fT(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case zi:t+="";break;default:t+=i}}return t}function hh(r){return r+zi+""}function nt(r){const e=r.length;if(j(e>=2,64408,{path:r}),e===2)return j(r.charAt(0)===zi&&r.charAt(1)==="",56145,{path:r}),ee.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(zi,i);switch((o<0||o>t)&&B(50515,{path:r}),r.charAt(o+1)){case"":const c=r.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),n.push(u);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:B(61167,{path:r})}i=o+2}return new ee(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn="remoteDocuments",Ns="owner",qn="owner",_s="mutationQueues",pT="userId",Ye="mutations",dh="batchId",_n="userMutationsIndex",fh=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vi(r,e){return[r,Ve(e)]}function Qf(r,e,t){return[r,Ve(e),t]}const mT={},ar="documentMutations",$i="remoteDocumentsV14",gT=["prefixPath","collectionGroup","readTime","documentId"],Ai="documentKeyIndex",_T=["prefixPath","collectionGroup","documentId"],Jf="collectionGroupIndex",yT=["collectionGroup","readTime","prefixPath","documentId"],ys="remoteDocumentGlobal",ja="remoteDocumentGlobalKey",cr="targets",Yf="queryTargetsIndex",IT=["canonicalId","targetId"],ur="targetDocuments",ET=["targetId","path"],Pc="documentTargetsIndex",TT=["path","targetId"],Gi="targetGlobalKey",In="targetGlobal",Is="collectionParents",wT=["collectionId","parent"],lr="clientMetadata",vT="clientId",Io="bundles",AT="bundleId",Eo="namedQueries",bT="name",Cc="indexConfiguration",RT="indexId",qa="collectionGroupIndex",ST="collectionGroup",os="indexState",PT=["indexId","uid"],Xf="sequenceNumberIndex",CT=["uid","sequenceNumber"],as="indexEntries",VT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Zf="documentKeyIndex",xT=["indexId","uid","orderedDocumentKey"],To="documentOverlays",DT=["userId","collectionPath","documentId"],za="collectionPathOverlayIndex",kT=["userId","collectionPath","largestBatchId"],ep="collectionGroupOverlayIndex",NT=["userId","collectionGroup","largestBatchId"],Vc="globals",OT="name",tp=[_s,Ye,ar,hn,cr,Ns,In,ur,lr,ys,Is,Io,Eo],MT=[...tp,To],np=[_s,Ye,ar,$i,cr,Ns,In,ur,lr,ys,Is,Io,Eo,To],rp=np,xc=[...rp,Cc,os,as],LT=xc,sp=[...xc,Vc],FT=sp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a extends Hf{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function _e(r,e){const t=H(r);return Ht.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ph(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function en(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function ip(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e,t){this.comparator=e,this.root=t||we.EMPTY}insert(e,t){return new ae(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,we.BLACK,null,null))}remove(e){return new ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,we.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new li(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new li(this.root,e,this.comparator,!1)}getReverseIterator(){return new li(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new li(this.root,e,this.comparator,!0)}}class li{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class we{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??we.RED,this.left=s??we.EMPTY,this.right=i??we.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new we(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return we.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return we.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,we.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,we.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw B(27949);return e+(this.isRed()?0:1)}}we.EMPTY=null,we.RED=!0,we.BLACK=!1;we.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new we(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.comparator=e,this.data=new ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new mh(this.data.getIterator())}getIteratorFrom(e){return new mh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof re)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new re(this.comparator);return t.data=e,t}}class mh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function zn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.fields=e,e.sort(ce.comparator)}static empty(){return new Le([])}unionWith(e){let t=new re(ce.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Le(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return or(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new op("Invalid base64 string: "+i):i}}(e);return new me(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new me(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}me.EMPTY_BYTE_STRING=new me("");const UT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Tt(r){if(j(!!r,39018),typeof r=="string"){let e=0;const t=UT.exec(r);if(j(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:oe(r.seconds),nanos:oe(r.nanos)}}function oe(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function wt(r){return typeof r=="string"?me.fromBase64String(r):me.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap="server_timestamp",cp="__type__",up="__previous_value__",lp="__local_write_time__";function Dc(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[cp])==null?void 0:n.stringValue)===ap}function wo(r){const e=r.mapValue.fields[up];return Dc(e)?wo(e):e}function Es(r){const e=Tt(r.mapValue.fields[lp].timestampValue);return new te(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(e,t,n,s,i,o,c,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const Ki="(default)";class Cn{constructor(e,t){this.projectId=e,this.database=t||Ki}static empty(){return new Cn("","")}get isDefaultDatabase(){return this.database===Ki}isEqual(e){return e instanceof Cn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kc="__type__",hp="__max__",jt={mapValue:{fields:{__type__:{stringValue:hp}}}},Nc="__vector__",hr="value",bi={nullValue:"NULL_VALUE"};function Qt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Dc(r)?4:dp(r)?9007199254740991:vo(r)?10:11:B(28295,{value:r})}function ct(r,e){if(r===e)return!0;const t=Qt(r);if(t!==Qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return Es(r).isEqual(Es(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Tt(s.timestampValue),c=Tt(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(s,i){return wt(s.bytesValue).isEqual(wt(i.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(s,i){return oe(s.geoPointValue.latitude)===oe(i.geoPointValue.latitude)&&oe(s.geoPointValue.longitude)===oe(i.geoPointValue.longitude)}(r,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return oe(s.integerValue)===oe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=oe(s.doubleValue),c=oe(i.doubleValue);return o===c?gs(o)===gs(c):isNaN(o)&&isNaN(c)}return!1}(r,e);case 9:return or(r.arrayValue.values||[],e.arrayValue.values||[],ct);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(ph(o)!==ph(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!ct(o[u],c[u])))return!1;return!0}(r,e);default:return B(52216,{left:r})}}function Ts(r,e){return(r.values||[]).find(t=>ct(t,e))!==void 0}function Jt(r,e){if(r===e)return 0;const t=Qt(r),n=Qt(e);if(t!==n)return K(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(r.booleanValue,e.booleanValue);case 2:return function(i,o){const c=oe(i.integerValue||i.doubleValue),u=oe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(r,e);case 3:return gh(r.timestampValue,e.timestampValue);case 4:return gh(Es(r),Es(e));case 5:return Ua(r.stringValue,e.stringValue);case 6:return function(i,o){const c=wt(i),u=wt(o);return c.compareTo(u)}(r.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=K(c[h],u[h]);if(f!==0)return f}return K(c.length,u.length)}(r.referenceValue,e.referenceValue);case 8:return function(i,o){const c=K(oe(i.latitude),oe(o.latitude));return c!==0?c:K(oe(i.longitude),oe(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return _h(r.arrayValue,e.arrayValue);case 10:return function(i,o){var g,R,V,k;const c=i.fields||{},u=o.fields||{},h=(g=c[hr])==null?void 0:g.arrayValue,f=(R=u[hr])==null?void 0:R.arrayValue,m=K(((V=h==null?void 0:h.values)==null?void 0:V.length)||0,((k=f==null?void 0:f.values)==null?void 0:k.length)||0);return m!==0?m:_h(h,f)}(r.mapValue,e.mapValue);case 11:return function(i,o){if(i===jt.mapValue&&o===jt.mapValue)return 0;if(i===jt.mapValue)return 1;if(o===jt.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const g=Ua(u[m],f[m]);if(g!==0)return g;const R=Jt(c[u[m]],h[f[m]]);if(R!==0)return R}return K(u.length,f.length)}(r.mapValue,e.mapValue);default:throw B(23264,{he:t})}}function gh(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return K(r,e);const t=Tt(r),n=Tt(e),s=K(t.seconds,n.seconds);return s!==0?s:K(t.nanos,n.nanos)}function _h(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=Jt(t[s],n[s]);if(i)return i}return K(t.length,n.length)}function dr(r){return Ga(r)}function Ga(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=Tt(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return wt(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return F.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=Ga(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${Ga(t.fields[o])}`;return s+"}"}(r.mapValue):B(61005,{value:r})}function Ri(r){switch(Qt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=wo(r);return e?16+Ri(e):16;case 5:return 2*r.stringValue.length;case 6:return wt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+Ri(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return en(n.fields,(i,o)=>{s+=i.length+Ri(o)}),s}(r.mapValue);default:throw B(13486,{value:r})}}function ws(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Ka(r){return!!r&&"integerValue"in r}function vs(r){return!!r&&"arrayValue"in r}function yh(r){return!!r&&"nullValue"in r}function Ih(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Si(r){return!!r&&"mapValue"in r}function vo(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[kc])==null?void 0:n.stringValue)===Nc}function cs(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return en(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=cs(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=cs(r.arrayValue.values[t]);return e}return{...r}}function dp(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===hp}const fp={mapValue:{fields:{[kc]:{stringValue:Nc},[hr]:{arrayValue:{}}}}};function jT(r){return"nullValue"in r?bi:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?ws(Cn.empty(),F.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?vo(r)?fp:{mapValue:{}}:B(35942,{value:r})}function qT(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?ws(Cn.empty(),F.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?fp:"mapValue"in r?vo(r)?{mapValue:{}}:jt:B(61959,{value:r})}function Eh(r,e){const t=Jt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Th(r,e){const t=Jt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.value=e}static empty(){return new Ce({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Si(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=cs(t)}setAll(e){let t=ce.emptyPath(),n={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,s),n={},s=[],t=c.popLast()}o?n[c.lastSegment()]=cs(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Si(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Si(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){en(t,(s,i)=>e[s]=i);for(const s of n)delete e[s]}clone(){return new Ce(cs(this.value))}}function pp(r){const e=[];return en(r.fields,(t,n)=>{const s=new ce([t]);if(Si(n)){const i=pp(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Le(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t,n,s,i,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new le(e,0,z.min(),z.min(),z.min(),Ce.empty(),0)}static newFoundDocument(e,t,n,s){return new le(e,1,t,z.min(),n,s,0)}static newNoDocument(e,t){return new le(e,2,t,z.min(),z.min(),Ce.empty(),0)}static newUnknownDocument(e,t){return new le(e,3,t,z.min(),z.min(),Ce.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ce.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ce.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof le&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new le(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,t){this.position=e,this.inclusive=t}}function wh(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=F.comparator(F.fromName(o.referenceValue),t.key):n=Jt(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function vh(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!ct(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,t="asc"){this.field=e,this.dir=t}}function zT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{}class Y extends mp{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new $T(e,t,n):t==="array-contains"?new HT(e,n):t==="in"?new Tp(e,n):t==="not-in"?new WT(e,n):t==="array-contains-any"?new QT(e,n):new Y(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new GT(e,n):new KT(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Jt(t,this.value)):t!==null&&Qt(this.value)===Qt(t)&&this.matchesComparison(Jt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ne extends mp{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ne(e,t)}matches(e){return pr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function pr(r){return r.op==="and"}function Ha(r){return r.op==="or"}function Oc(r){return gp(r)&&pr(r)}function gp(r){for(const e of r.filters)if(e instanceof ne)return!1;return!0}function Wa(r){if(r instanceof Y)return r.field.canonicalString()+r.op.toString()+dr(r.value);if(Oc(r))return r.filters.map(e=>Wa(e)).join(",");{const e=r.filters.map(t=>Wa(t)).join(",");return`${r.op}(${e})`}}function _p(r,e){return r instanceof Y?function(n,s){return s instanceof Y&&n.op===s.op&&n.field.isEqual(s.field)&&ct(n.value,s.value)}(r,e):r instanceof ne?function(n,s){return s instanceof ne&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,o,c)=>i&&_p(o,s.filters[c]),!0):!1}(r,e):void B(19439)}function yp(r,e){const t=r.filters.concat(e);return ne.create(t,r.op)}function Ip(r){return r instanceof Y?function(t){return`${t.field.canonicalString()} ${t.op} ${dr(t.value)}`}(r):r instanceof ne?function(t){return t.op.toString()+" {"+t.getFilters().map(Ip).join(" ,")+"}"}(r):"Filter"}class $T extends Y{constructor(e,t,n){super(e,t,n),this.key=F.fromName(n.referenceValue)}matches(e){const t=F.comparator(e.key,this.key);return this.matchesComparison(t)}}class GT extends Y{constructor(e,t){super(e,"in",t),this.keys=Ep("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class KT extends Y{constructor(e,t){super(e,"not-in",t),this.keys=Ep("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ep(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(n=>F.fromName(n.referenceValue))}class HT extends Y{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return vs(t)&&Ts(t.arrayValue,this.value)}}class Tp extends Y{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ts(this.value.arrayValue,t)}}class WT extends Y{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ts(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ts(this.value.arrayValue,t)}}class QT extends Y{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!vs(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>Ts(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(e,t=null,n=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function Qa(r,e=null,t=[],n=[],s=null,i=null,o=null){return new JT(r,e,t,n,s,i,o)}function Vn(r){const e=H(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>Wa(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),yo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>dr(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>dr(n)).join(",")),e.Te=t}return e.Te}function Os(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!zT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!_p(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!vh(r.startAt,e.startAt)&&vh(r.endAt,e.endAt)}function Hi(r){return F.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Wi(r,e){return r.filters.filter(t=>t instanceof Y&&t.field.isEqual(e))}function Ah(r,e,t){let n=bi,s=!0;for(const i of Wi(r,e)){let o=bi,c=!0;switch(i.op){case"<":case"<=":o=jT(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=bi}Eh({value:n,inclusive:s},{value:o,inclusive:c})<0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Eh({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function bh(r,e,t){let n=jt,s=!0;for(const i of Wi(r,e)){let o=jt,c=!0;switch(i.op){case">=":case">":o=qT(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=jt}Th({value:n,inclusive:s},{value:o,inclusive:c})>0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Th({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e,t=null,n=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function YT(r,e,t,n,s,i,o,c){return new Ar(r,e,t,n,s,i,o,c)}function Ms(r){return new Ar(r)}function Rh(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function wp(r){return r.collectionGroup!==null}function us(r){const e=H(r);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new re(ce.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new As(i,n))}),t.has(ce.keyField().canonicalString())||e.Ie.push(new As(ce.keyField(),n))}return e.Ie}function He(r){const e=H(r);return e.Ee||(e.Ee=XT(e,us(r))),e.Ee}function XT(r,e){if(r.limitType==="F")return Qa(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new As(s.field,i)});const t=r.endAt?new fr(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new fr(r.startAt.position,r.startAt.inclusive):null;return Qa(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function Ja(r,e){const t=r.filters.concat([e]);return new Ar(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function Ya(r,e,t){return new Ar(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function Ao(r,e){return Os(He(r),He(e))&&r.limitType===e.limitType}function vp(r){return`${Vn(He(r))}|lt:${r.limitType}`}function Qn(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(s=>Ip(s)).join(", ")}]`),yo(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(s=>dr(s)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(s=>dr(s)).join(",")),`Target(${n})`}(He(r))}; limitType=${r.limitType})`}function Ls(r,e){return e.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):F.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,e)&&function(n,s){for(const i of us(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,e)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,e)&&function(n,s){return!(n.startAt&&!function(o,c,u){const h=wh(o,c,u);return o.inclusive?h<=0:h<0}(n.startAt,us(n),s)||n.endAt&&!function(o,c,u){const h=wh(o,c,u);return o.inclusive?h>=0:h>0}(n.endAt,us(n),s))}(r,e)}function ZT(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Ap(r){return(e,t)=>{let n=!1;for(const s of us(r)){const i=ew(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function ew(r,e,t){const n=r.field.isKeyField()?F.comparator(e.key,t.key):function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?Jt(u,h):B(42886)}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return B(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){en(this.inner,(t,n)=>{for(const[s,i]of n)e(s,i)})}isEmpty(){return ip(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tw=new ae(F.comparator);function ze(){return tw}const bp=new ae(F.comparator);function Xr(...r){let e=bp;for(const t of r)e=e.insert(t.key,t);return e}function Rp(r){let e=bp;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function rt(){return ls()}function Sp(){return ls()}function ls(){return new St(r=>r.toString(),(r,e)=>r.isEqual(e))}const nw=new ae(F.comparator),rw=new re(F.comparator);function W(...r){let e=rw;for(const t of r)e=e.add(t);return e}const sw=new re(K);function iw(){return sw}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:gs(e)?"-0":e}}function Pp(r){return{integerValue:""+r}}function ow(r,e){return dT(e)?Pp(e):Mc(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(){this._=void 0}}function aw(r,e,t){return r instanceof mr?function(s,i){const o={fields:{[cp]:{stringValue:ap},[lp]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Dc(i)&&(i=wo(i)),i&&(o.fields[up]=i),{mapValue:o}}(t,e):r instanceof gr?Vp(r,e):r instanceof _r?xp(r,e):function(s,i){const o=Cp(s,i),c=Sh(o)+Sh(s.Ae);return Ka(o)&&Ka(s.Ae)?Pp(c):Mc(s.serializer,c)}(r,e)}function cw(r,e,t){return r instanceof gr?Vp(r,e):r instanceof _r?xp(r,e):t}function Cp(r,e){return r instanceof bs?function(n){return Ka(n)||function(i){return!!i&&"doubleValue"in i}(n)}(e)?e:{integerValue:0}:null}class mr extends bo{}class gr extends bo{constructor(e){super(),this.elements=e}}function Vp(r,e){const t=Dp(e);for(const n of r.elements)t.some(s=>ct(s,n))||t.push(n);return{arrayValue:{values:t}}}class _r extends bo{constructor(e){super(),this.elements=e}}function xp(r,e){let t=Dp(e);for(const n of r.elements)t=t.filter(s=>!ct(s,n));return{arrayValue:{values:t}}}class bs extends bo{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Sh(r){return oe(r.integerValue||r.doubleValue)}function Dp(r){return vs(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e,t){this.field=e,this.transform=t}}function uw(r,e){return r.field.isEqual(e.field)&&function(n,s){return n instanceof gr&&s instanceof gr||n instanceof _r&&s instanceof _r?or(n.elements,s.elements,ct):n instanceof bs&&s instanceof bs?ct(n.Ae,s.Ae):n instanceof mr&&s instanceof mr}(r.transform,e.transform)}class lw{constructor(e,t){this.version=e,this.transformResults=t}}class Ne{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ne}static exists(e){return new Ne(void 0,e)}static updateTime(e){return new Ne(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Pi(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Ro{}function Np(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new Lc(r.key,Ne.none()):new br(r.key,r.data,Ne.none());{const t=r.data,n=Ce.empty();let s=new re(ce.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new Pt(r.key,n,new Le(s.toArray()),Ne.none())}}function hw(r,e,t){r instanceof br?function(s,i,o){const c=s.value.clone(),u=Ch(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):r instanceof Pt?function(s,i,o){if(!Pi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Ch(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Op(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(r,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function hs(r,e,t,n){return r instanceof br?function(i,o,c,u){if(!Pi(i.precondition,o))return c;const h=i.value.clone(),f=Vh(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(r,e,t,n):r instanceof Pt?function(i,o,c,u){if(!Pi(i.precondition,o))return c;const h=Vh(i.fieldTransforms,u,o),f=o.data;return f.setAll(Op(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(r,e,t,n):function(i,o,c){return Pi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(r,e,t)}function dw(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=Cp(n.transform,s||null);i!=null&&(t===null&&(t=Ce.empty()),t.set(n.field,i))}return t||null}function Ph(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&or(n,s,(i,o)=>uw(i,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class br extends Ro{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Pt extends Ro{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Op(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function Ch(r,e,t){const n=new Map;j(r.length===t.length,32656,{Re:t.length,Ve:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,c=e.data.field(i.field);n.set(i.field,cw(o,c,t[s]))}return n}function Vh(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,aw(i,o,e))}return n}class Lc extends Ro{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Mp extends Ro{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&hw(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=hs(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=hs(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Sp();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=Np(o,c);u!==null&&n.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(z.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&or(this.mutations,e.mutations,(t,n)=>Ph(t,n))&&or(this.baseMutations,e.baseMutations,(t,n)=>Ph(t,n))}}class Uc{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){j(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=function(){return nw}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new Uc(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fe,X;function pw(r){switch(r){case P.OK:return B(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return B(15467,{code:r})}}function Lp(r){if(r===void 0)return ke("GRPC error has no .code"),P.UNKNOWN;switch(r){case fe.OK:return P.OK;case fe.CANCELLED:return P.CANCELLED;case fe.UNKNOWN:return P.UNKNOWN;case fe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case fe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case fe.INTERNAL:return P.INTERNAL;case fe.UNAVAILABLE:return P.UNAVAILABLE;case fe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case fe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case fe.NOT_FOUND:return P.NOT_FOUND;case fe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case fe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case fe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case fe.ABORTED:return P.ABORTED;case fe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case fe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case fe.DATA_LOSS:return P.DATA_LOSS;default:return B(39323,{code:r})}}(X=fe||(fe={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mw(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gw=new Kt([4294967295,4294967295],0);function xh(r){const e=mw().encode(r),t=new Nf;return t.update(e),new Uint8Array(t.digest())}function Dh(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Kt([t,n],0),new Kt([s,i],0)]}class jc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Zr(`Invalid padding: ${t}`);if(n<0)throw new Zr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Zr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Zr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Kt.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(Kt.fromNumber(n)));return s.compare(gw)===1&&(s=new Kt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=xh(e),[n,s]=Dh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);if(!this.we(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new jc(i,s,t);return n.forEach(c=>o.insert(c)),o}insert(e){if(this.ge===0)return;const t=xh(e),[n,s]=Dh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Zr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Fs.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new So(z.min(),s,new ae(K),ze(),W())}}class Fs{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Fs(n,t,W(),W(),W())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class Fp{constructor(e,t){this.targetId=e,this.Ce=t}}class Up{constructor(e,t,n=me.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class kh{constructor(){this.ve=0,this.Fe=Nh(),this.Me=me.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=W(),t=W(),n=W();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:B(38017,{changeType:i})}}),new Fs(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Nh()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,j(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class _w{constructor(e){this.Ge=e,this.ze=new Map,this.je=ze(),this.Je=hi(),this.He=hi(),this.Ye=new ae(K)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:B(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((n,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Hi(i))if(n===0){const o=new F(i.path);this.et(t,o,le.newNoDocument(o,z.min()))}else j(n===1,20013,{expectedCount:n});else{const o=this._t(t);if(o!==n){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=wt(n).toUint8Array()}catch(u){if(u instanceof op)return Pn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new jc(o,s,i)}catch(u){return Pn(u instanceof Zr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach(i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,o)=>{const c=this.ot(o);if(c){if(i.current&&Hi(c.target)){const u=new F(c.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,le.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}});let n=W();this.He.forEach((i,o)=>{let c=!0;o.forEachWhile(u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(i))}),this.je.forEach((i,o)=>o.setReadTime(e));const s=new So(e,t,this.Ye,this.je,n);return this.je=ze(),this.Je=hi(),this.He=hi(),this.Ye=new ae(K),s}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new kh,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new re(K),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new re(K),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||D("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new kh),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function hi(){return new ae(F.comparator)}function Nh(){return new ae(F.comparator)}const yw={asc:"ASCENDING",desc:"DESCENDING"},Iw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ew={and:"AND",or:"OR"};class Tw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Xa(r,e){return r.useProto3Json||yo(e)?e:{value:e}}function yr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Bp(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function ww(r,e){return yr(r,e.toTimestamp())}function Me(r){return j(!!r,49232),z.fromTimestamp(function(t){const n=Tt(t);return new te(n.seconds,n.nanos)}(r))}function qc(r,e){return Za(r,e).canonicalString()}function Za(r,e){const t=function(s){return new ee(["projects",s.projectId,"databases",s.database])}(r).child("documents");return e===void 0?t:t.child(e)}function jp(r){const e=ee.fromString(r);return j(Jp(e),10190,{key:e.toString()}),e}function Qi(r,e){return qc(r.databaseId,e.path)}function En(r,e){const t=jp(e);if(t.get(1)!==r.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new F($p(t))}function qp(r,e){return qc(r.databaseId,e)}function zp(r){const e=jp(r);return e.length===4?ee.emptyPath():$p(e)}function ec(r){return new ee(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function $p(r){return j(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Oh(r,e,t){return{name:Qi(r,e),fields:t.value.mapValue.fields}}function vw(r,e,t){const n=En(r,e.name),s=Me(e.updateTime),i=e.createTime?Me(e.createTime):z.min(),o=new Ce({mapValue:{fields:e.fields}}),c=le.newFoundDocument(n,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function Aw(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:B(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(j(f===void 0||typeof f=="string",58123),me.fromBase64String(f||"")):(j(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),me.fromUint8Array(f||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){const f=h.code===void 0?P.UNKNOWN:Lp(h.code);return new N(f,h.message||"")}(o);t=new Up(n,s,i,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=En(r,n.document.name),i=Me(n.document.updateTime),o=n.document.createTime?Me(n.document.createTime):z.min(),c=new Ce({mapValue:{fields:n.document.fields}}),u=le.newFoundDocument(s,i,o,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new Ci(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=En(r,n.document),i=n.readTime?Me(n.readTime):z.min(),o=le.newNoDocument(s,i),c=n.removedTargetIds||[];t=new Ci([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=En(r,n.document),i=n.removedTargetIds||[];t=new Ci([],i,s,null)}else{if(!("filter"in e))return B(11601,{Rt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new fw(s,i),c=n.targetId;t=new Fp(c,o)}}return t}function Ji(r,e){let t;if(e instanceof br)t={update:Oh(r,e.key,e.value)};else if(e instanceof Lc)t={delete:Qi(r,e.key)};else if(e instanceof Pt)t={update:Oh(r,e.key,e.data),updateMask:Vw(e.fieldMask)};else{if(!(e instanceof Mp))return B(16599,{Vt:e.type});t={verify:Qi(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(i,o){const c=o.transform;if(c instanceof mr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof gr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof _r)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof bs)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw B(20930,{transform:o.transform})}(0,n))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:ww(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:B(27497)}(r,e.precondition)),t}function tc(r,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?Ne.updateTime(Me(i.updateTime)):i.exists!==void 0?Ne.exists(i.exists):Ne.none()}(e.currentDocument):Ne.none(),n=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let u=null;if("setToServerValue"in c)j(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new mr;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new gr(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new _r(f)}else"increment"in c?u=new bs(o,c.increment):B(16584,{proto:c});const h=ce.fromServerFormat(c.fieldPath);return new kp(h,u)}(r,s)):[];if(e.update){e.update.name;const s=En(r,e.update.name),i=new Ce({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const h=u.fieldPaths||[];return new Le(h.map(f=>ce.fromServerFormat(f)))}(e.updateMask);return new Pt(s,i,o,t,n)}return new br(s,i,t,n)}if(e.delete){const s=En(r,e.delete);return new Lc(s,t)}if(e.verify){const s=En(r,e.verify);return new Mp(s,t)}return B(1463,{proto:e})}function bw(r,e){return r&&r.length>0?(j(e!==void 0,14353),r.map(t=>function(s,i){let o=s.updateTime?Me(s.updateTime):Me(i);return o.isEqual(z.min())&&(o=Me(i)),new lw(o,s.transformResults||[])}(t,e))):[]}function Gp(r,e){return{documents:[qp(r,e.path)]}}function Kp(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=qp(r,s);const i=function(h){if(h.length!==0)return Qp(ne.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(f=>function(g){return{field:Jn(g.field),direction:Sw(g.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Xa(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ft:t,parent:s}}function Hp(r){let e=zp(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){j(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(m){const g=Wp(m);return g instanceof ne&&Oc(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(g=>function(V){return new As(Yn(V.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(V.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(m){let g;return g=typeof m=="object"?m.value:m,yo(g)?null:g}(t.limit));let u=null;t.startAt&&(u=function(m){const g=!!m.before,R=m.values||[];return new fr(R,g)}(t.startAt));let h=null;return t.endAt&&(h=function(m){const g=!m.before,R=m.values||[];return new fr(R,g)}(t.endAt)),YT(e,s,o,i,c,"F",u,h)}function Rw(r,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Wp(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Yn(t.unaryFilter.field);return Y.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Yn(t.unaryFilter.field);return Y.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Yn(t.unaryFilter.field);return Y.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Yn(t.unaryFilter.field);return Y.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}}(r):r.fieldFilter!==void 0?function(t){return Y.create(Yn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return ne.create(t.compositeFilter.filters.map(n=>Wp(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B(1026)}}(t.compositeFilter.op))}(r):B(30097,{filter:r})}function Sw(r){return yw[r]}function Pw(r){return Iw[r]}function Cw(r){return Ew[r]}function Jn(r){return{fieldPath:r.canonicalString()}}function Yn(r){return ce.fromServerFormat(r.fieldPath)}function Qp(r){return r instanceof Y?function(t){if(t.op==="=="){if(Ih(t.value))return{unaryFilter:{field:Jn(t.field),op:"IS_NAN"}};if(yh(t.value))return{unaryFilter:{field:Jn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ih(t.value))return{unaryFilter:{field:Jn(t.field),op:"IS_NOT_NAN"}};if(yh(t.value))return{unaryFilter:{field:Jn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Jn(t.field),op:Pw(t.op),value:t.value}}}(r):r instanceof ne?function(t){const n=t.getFilters().map(s=>Qp(s));return n.length===1?n[0]:{compositeFilter:{op:Cw(t.op),filters:n}}}(r):B(54877,{filter:r})}function Vw(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Jp(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,t,n,s,i=z.min(),o=z.min(),c=me.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new _t(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new _t(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new _t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new _t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{constructor(e){this.yt=e}}function xw(r,e){let t;if(e.document)t=vw(r.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=F.fromSegments(e.noDocument.path),s=Dn(e.noDocument.readTime);t=le.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return B(56709);{const n=F.fromSegments(e.unknownDocument.path),s=Dn(e.unknownDocument.version);t=le.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime(function(s){const i=new te(s[0],s[1]);return z.fromTimestamp(i)}(e.readTime)),t}function Mh(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Yi(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(i,o){return{name:Qi(i,o.key),fields:o.data.value.mapValue.fields,updateTime:yr(i,o.version.toTimestamp()),createTime:yr(i,o.createTime.toTimestamp())}}(r.yt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:xn(e.version)};else{if(!e.isUnknownDocument())return B(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:xn(e.version)}}return n}function Yi(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function xn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Dn(r){const e=new te(r.seconds,r.nanoseconds);return z.fromTimestamp(e)}function fn(r,e){const t=(e.baseMutations||[]).map(i=>tc(r.yt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map(i=>tc(r.yt,i)),s=te.fromMillis(e.localWriteTimeMs);return new Fc(e.batchId,s,t,n)}function es(r){const e=Dn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?Dn(r.lastLimboFreeSnapshotVersion):z.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){const o=i.documents.length;return j(o===1,1966,{count:o}),He(Ms(zp(i.documents[0])))}(r.query):function(i){return He(Hp(i))}(r.query),new _t(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,me.fromBase64String(r.resumeToken))}function Xp(r,e){const t=xn(e.snapshotVersion),n=xn(e.lastLimboFreeSnapshotVersion);let s;s=Hi(e.target)?Gp(r.yt,e.target):Kp(r.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Vn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Zp(r){const e=Hp({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Ya(e,e.limit,"L"):e}function wa(r,e){return new Bc(e.largestBatchId,tc(r.yt,e.overlayMutation))}function Lh(r,e){const t=e.path.lastSegment();return[r,Ve(e.path.popLast()),t]}function Fh(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:xn(n.readTime),documentKey:Ve(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dw{getBundleMetadata(e,t){return Uh(e).get(t).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:Dn(i.createTime),version:i.version}}(n)})}saveBundleMetadata(e,t){return Uh(e).put(function(s){return{bundleId:s.id,createTime:xn(Me(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return Bh(e).get(t).next(n=>{if(n)return function(i){return{name:i.name,query:Zp(i.bundledQuery),readTime:Dn(i.readTime)}}(n)})}saveNamedQuery(e,t){return Bh(e).put(function(s){return{name:s.name,readTime:xn(Me(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function Uh(r){return _e(r,Io)}function Bh(r){return _e(r,Eo)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new Po(e,n)}getOverlay(e,t){return $r(e).get(Lh(this.userId,t)).next(n=>n?wa(this.serializer,n):null)}getOverlays(e,t){const n=rt();return v.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(e,t,n){const s=[];return n.forEach((i,o)=>{const c=new Bc(t,o);s.push(this.St(e,c))}),v.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach(o=>s.add(Ve(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push($r(e).Z(za,c))}),v.waitFor(i)}getOverlaysForCollection(e,t,n){const s=rt(),i=Ve(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return $r(e).J(za,o).next(c=>{for(const u of c){const h=wa(this.serializer,u);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(e,t,n,s){const i=rt();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return $r(e).ee({index:ep,range:c},(u,h,f)=>{const m=wa(this.serializer,h);i.size()<s||m.largestBatchId===o?(i.set(m.getKey(),m),o=m.largestBatchId):f.done()}).next(()=>i)}St(e,t){return $r(e).put(function(s,i,o){const[c,u,h]=Lh(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ji(s.yt,o.mutation)}}(this.serializer,this.userId,t))}}function $r(r){return _e(r,To)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{bt(e){return _e(e,Vc)}getSessionToken(e){return this.bt(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?me.fromUint8Array(n):me.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(oe(e.integerValue));else if("doubleValue"in e){const n=oe(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),gs(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),typeof n=="string"&&(n=Tt(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(wt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?dp(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):vo(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Qt(e.arrayValue,t),this.Nt(t)):B(19022,{$t:e})}Ot(e,t){this.Ft(t,25),this.Ut(e,t)}Ut(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const s of Object.keys(n))this.Ot(s,t),this.Ct(n[s],t)}kt(e,t){var o,c;const n=e.fields||{};this.Ft(t,53);const s=hr,i=((c=(o=n[s].arrayValue)==null?void 0:o.values)==null?void 0:c.length)||0;this.Ft(t,15),t.Mt(oe(i)),this.Ot(s,t),this.Ct(n[s],t)}Qt(e,t){const n=e.values||[];this.Ft(t,50);for(const s of n)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),F.fromName(e).path.forEach(n=>{this.Ft(t,60),this.Ut(n,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}pn.Kt=new pn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=255;function Nw(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function jh(r){const e=64-function(n){let s=0;for(let i=0;i<8;++i){const o=Nw(255&n[i]);if(s+=o,o!==8)break}return s}(r);return Math.ceil(e/8)}class Ow{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Yt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Xt(e){const t=this.en(e),n=jh(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),n=jh(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn($n),this.sn(255)}_n(){this.an($n),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===$n?(this.sn($n),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===$n?(this.an($n),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class Mw{constructor(e){this.cn=e}Bt(e){this.cn.Wt(e)}xt(e){this.cn.Yt(e)}Mt(e){this.cn.Xt(e)}vt(){this.cn.rn()}}class Lw{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Gr{constructor(){this.cn=new Ow,this.ln=new Mw(this.cn),this.hn=new Lw(this.cn)}seed(e){this.cn.seed(e)}Pn(e){return e===0?this.ln:this.hn}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,t,n,s){this.Tn=e,this.In=t,this.En=n,this.dn=s}An(){const e=this.dn.length,t=e===0||this.dn[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.dn,0),t!==e?n.set([0],this.dn.length):++n[n.length-1],new mn(this.Tn,this.In,this.En,n)}Rn(e,t,n){return{indexId:this.Tn,uid:e,arrayValue:Vi(this.En),directionalValue:Vi(this.dn),orderedDocumentKey:Vi(t),documentKey:n.path.toArray()}}Vn(e,t,n){const s=this.Rn(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Nt(r,e){let t=r.Tn-e.Tn;return t!==0?t:(t=qh(r.En,e.En),t!==0?t:(t=qh(r.dn,e.dn),t!==0?t:F.comparator(r.In,e.In)))}function qh(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function Vi(r){return Gd()?function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n}(r):r}function zh(r){return typeof r!="string"?r:function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(r)}class $h{constructor(e){this.mn=new re((t,n)=>ce.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.fn=e.orderBy,this.gn=[];for(const t of e.filters){const n=t;n.isInequality()?this.mn=this.mn.add(n):this.gn.push(n)}}get pn(){return this.mn.size>1}yn(e){if(j(e.collectionGroup===this.collectionId,49279),this.pn)return!1;const t=Ba(e);if(t!==void 0&&!this.wn(t))return!1;const n=ln(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.wn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.mn.size>0){const c=this.mn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=n[i];if(!this.Sn(c,u)||!this.bn(this.fn[o++],u))return!1}++i}for(;i<n.length;++i){const c=n[i];if(o>=this.fn.length||!this.bn(this.fn[o++],c))return!1}return!0}Dn(){if(this.pn)return null;let e=new re(ce.comparator);const t=[];for(const n of this.gn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new wi(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new wi(n.field,0))}for(const n of this.fn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new wi(n.field,n.dir==="asc"?0:1)));return new qi(qi.UNKNOWN_ID,this.collectionId,t,ms.empty())}wn(e){for(const t of this.gn)if(this.Sn(t,e))return!0;return!1}Sn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}bn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(r){var t,n;if(j(r instanceof Y||r instanceof ne,20012),r instanceof Y){if(r instanceof Tp){const s=((n=(t=r.value.arrayValue)==null?void 0:t.values)==null?void 0:n.map(i=>Y.create(r.field,"==",i)))||[];return ne.create(s,"or")}return r}const e=r.filters.map(s=>em(s));return ne.create(e,r.op)}function Fw(r){if(r.getFilters().length===0)return[];const e=sc(em(r));return j(tm(e),7391),nc(e)||rc(e)?[e]:e.getFilters()}function nc(r){return r instanceof Y}function rc(r){return r instanceof ne&&Oc(r)}function tm(r){return nc(r)||rc(r)||function(t){if(t instanceof ne&&Ha(t)){for(const n of t.getFilters())if(!nc(n)&&!rc(n))return!1;return!0}return!1}(r)}function sc(r){if(j(r instanceof Y||r instanceof ne,34018),r instanceof Y)return r;if(r.filters.length===1)return sc(r.filters[0]);const e=r.filters.map(n=>sc(n));let t=ne.create(e,r.op);return t=Xi(t),tm(t)?t:(j(t instanceof ne,64498),j(pr(t),40251),j(t.filters.length>1,57927),t.filters.reduce((n,s)=>zc(n,s)))}function zc(r,e){let t;return j(r instanceof Y||r instanceof ne,38388),j(e instanceof Y||e instanceof ne,25473),t=r instanceof Y?e instanceof Y?function(s,i){return ne.create([s,i],"and")}(r,e):Gh(r,e):e instanceof Y?Gh(e,r):function(s,i){if(j(s.filters.length>0&&i.filters.length>0,48005),pr(s)&&pr(i))return yp(s,i.getFilters());const o=Ha(s)?s:i,c=Ha(s)?i:s,u=o.filters.map(h=>zc(h,c));return ne.create(u,"or")}(r,e),Xi(t)}function Gh(r,e){if(pr(e))return yp(e,r.getFilters());{const t=e.filters.map(n=>zc(r,n));return ne.create(t,"or")}}function Xi(r){if(j(r instanceof Y||r instanceof ne,11850),r instanceof Y)return r;const e=r.getFilters();if(e.length===1)return Xi(e[0]);if(gp(r))return r;const t=e.map(s=>Xi(s)),n=[];return t.forEach(s=>{s instanceof Y?n.push(s):s instanceof ne&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:ne.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(){this.Cn=new $c}addToCollectionParentIndex(e,t){return this.Cn.add(t),v.resolve()}getCollectionParents(e,t){return v.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return v.resolve()}deleteFieldIndex(e,t){return v.resolve()}deleteAllFieldIndexes(e){return v.resolve()}createTargetIndexes(e,t){return v.resolve()}getDocumentsMatchingTarget(e,t){return v.resolve(null)}getIndexType(e,t){return v.resolve(0)}getFieldIndexes(e,t){return v.resolve([])}getNextCollectionGroupToUpdate(e){return v.resolve(null)}getMinOffset(e,t){return v.resolve($e.min())}getMinOffsetFromCollectionGroup(e,t){return v.resolve($e.min())}updateCollectionGroup(e,t,n){return v.resolve()}updateIndexEntries(e,t){return v.resolve()}}class $c{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new re(ee.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new re(ee.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh="IndexedDbIndexManager",di=new Uint8Array(0);class Bw{constructor(e,t){this.databaseId=t,this.vn=new $c,this.Fn=new St(n=>Vn(n),(n,s)=>Os(n,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.vn.add(t)});const i={collectionId:n,parent:Ve(s)};return Hh(e).put(i)}return v.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[qf(t),""],!1,!0);return Hh(e).J(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;n.push(nt(o.parent))}return n})}addFieldIndex(e,t){const n=Kr(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=Kn(e);return i.next(c=>{o.put(Fh(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const n=Kr(e),s=Kn(e),i=Gn(e);return n.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Kr(e),n=Gn(e),s=Kn(e);return t.Z().next(()=>n.Z()).next(()=>s.Z())}createTargetIndexes(e,t){return v.forEach(this.Mn(t),n=>this.getIndexType(e,n).next(s=>{if(s===0||s===1){const i=new $h(n).Dn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const n=Gn(e);let s=!0;const i=new Map;return v.forEach(this.Mn(t),o=>this.xn(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=W();const c=[];return v.forEach(i,(u,h)=>{D(Kh,`Using index ${function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map(q=>`${q.fieldPath}:${q.kind}`).join(",")}`}(u)} to execute ${Vn(t)}`);const f=function(U,q){const G=Ba(q);if(G===void 0)return null;for(const Q of Wi(U,G.fieldPath))switch(Q.op){case"array-contains-any":return Q.value.arrayValue.values||[];case"array-contains":return[Q.value]}return null}(h,u),m=function(U,q){const G=new Map;for(const Q of ln(q))for(const E of Wi(U,Q.fieldPath))switch(E.op){case"==":case"in":G.set(Q.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return G.set(Q.fieldPath.canonicalString(),E.value),Array.from(G.values())}return null}(h,u),g=function(U,q){const G=[];let Q=!0;for(const E of ln(q)){const _=E.kind===0?Ah(U,E.fieldPath,U.startAt):bh(U,E.fieldPath,U.startAt);G.push(_.value),Q&&(Q=_.inclusive)}return new fr(G,Q)}(h,u),R=function(U,q){const G=[];let Q=!0;for(const E of ln(q)){const _=E.kind===0?bh(U,E.fieldPath,U.endAt):Ah(U,E.fieldPath,U.endAt);G.push(_.value),Q&&(Q=_.inclusive)}return new fr(G,Q)}(h,u),V=this.On(u,h,g),k=this.On(u,h,R),C=this.Nn(u,h,m),O=this.Bn(u.indexId,f,V,g.inclusive,k,R.inclusive,C);return v.forEach(O,L=>n.Y(L,t.limit).next(U=>{U.forEach(q=>{const G=F.fromSegments(q.documentKey);o.has(G)||(o=o.add(G),c.push(G))})}))}).next(()=>c)}return v.resolve(null)})}Mn(e){let t=this.Fn.get(e);return t||(e.filters.length===0?t=[e]:t=Fw(ne.create(e.filters,"and")).map(n=>Qa(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.Fn.set(e,t),t)}Bn(e,t,n,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(n.length,i.length),h=u/(t!=null?t.length:1),f=[];for(let m=0;m<u;++m){const g=t?this.Ln(t[m/h]):di,R=this.kn(e,g,n[m%h],s),V=this.qn(e,g,i[m%h],o),k=c.map(C=>this.kn(e,g,C,!0));f.push(...this.createRange(R,V,k))}return f}kn(e,t,n,s){const i=new mn(e,F.empty(),t,n);return s?i:i.An()}qn(e,t,n,s){const i=new mn(e,F.empty(),t,n);return s?i.An():i}xn(e,t){const n=new $h(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)n.yn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let n=2;const s=this.Mn(t);return v.forEach(s,i=>this.xn(e,i).next(o=>{o?n!==0&&o.fields.length<function(u){let h=new re(ce.comparator),f=!1;for(const m of u.filters)for(const g of m.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?f=!0:h=h.add(g.field));for(const m of u.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)}(i)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&n===2?1:n)}Qn(e,t){const n=new Gr;for(const s of ln(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.Pn(s.kind);pn.Kt.Dt(i,o)}return n.un()}Ln(e){const t=new Gr;return pn.Kt.Dt(e,t.Pn(0)),t.un()}$n(e,t){const n=new Gr;return pn.Kt.Dt(ws(this.databaseId,t),n.Pn(function(i){const o=ln(i);return o.length===0?0:o[o.length-1].kind}(e))),n.un()}Nn(e,t,n){if(n===null)return[];let s=[];s.push(new Gr);let i=0;for(const o of ln(e)){const c=n[i++];for(const u of s)if(this.Un(t,o.fieldPath)&&vs(c))s=this.Kn(s,o,c);else{const h=u.Pn(o.kind);pn.Kt.Dt(c,h)}}return this.Wn(s)}On(e,t,n){return this.Nn(e,t,n.position)}Wn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Kn(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const c of s){const u=new Gr;u.seed(c.un()),pn.Kt.Dt(o,u.Pn(t.kind)),i.push(u)}return i}Un(e,t){return!!e.filters.find(n=>n instanceof Y&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=Kr(e),s=Kn(e);return(t?n.J(qa,IDBKeyRange.bound(t,t)):n.J()).next(i=>{const o=[];return v.forEach(i,c=>s.get([c.indexId,this.uid]).next(u=>{o.push(function(f,m){const g=m?new ms(m.sequenceNumber,new $e(Dn(m.readTime),new F(nt(m.documentKey)),m.largestBatchId)):ms.empty(),R=f.fields.map(([V,k])=>new wi(ce.fromServerFormat(V),k));return new qi(f.indexId,f.collectionGroup,R,g)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:K(n.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const s=Kr(e),i=Kn(e);return this.Gn(e).next(o=>s.J(qa,IDBKeyRange.bound(t,t)).next(c=>v.forEach(c,u=>i.put(Fh(u.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return v.forEach(t,(s,i)=>{const o=n.get(s.collectionGroup);return(o?v.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(n.set(s.collectionGroup,c),v.forEach(c,u=>this.zn(e,s,u).next(h=>{const f=this.jn(i,u);return h.isEqual(f)?v.resolve():this.Jn(e,i,u,h,f)}))))})}Hn(e,t,n,s){return Gn(e).put(s.Rn(this.uid,this.$n(n,t.key),t.key))}Yn(e,t,n,s){return Gn(e).delete(s.Vn(this.uid,this.$n(n,t.key),t.key))}zn(e,t,n){const s=Gn(e);let i=new re(Nt);return s.ee({index:Zf,range:IDBKeyRange.only([n.indexId,this.uid,Vi(this.$n(n,t))])},(o,c)=>{i=i.add(new mn(n.indexId,t,zh(c.arrayValue),zh(c.directionalValue)))}).next(()=>i)}jn(e,t){let n=new re(Nt);const s=this.Qn(t,e);if(s==null)return n;const i=Ba(t);if(i!=null){const o=e.data.field(i.fieldPath);if(vs(o))for(const c of o.arrayValue.values||[])n=n.add(new mn(t.indexId,e.key,this.Ln(c),s))}else n=n.add(new mn(t.indexId,e.key,di,s));return n}Jn(e,t,n,s,i){D(Kh,"Updating index entries for document '%s'",t.key);const o=[];return function(u,h,f,m,g){const R=u.getIterator(),V=h.getIterator();let k=zn(R),C=zn(V);for(;k||C;){let O=!1,L=!1;if(k&&C){const U=f(k,C);U<0?L=!0:U>0&&(O=!0)}else k!=null?L=!0:O=!0;O?(m(C),C=zn(V)):L?(g(k),k=zn(R)):(k=zn(R),C=zn(V))}}(s,i,Nt,c=>{o.push(this.Hn(e,t,n,c))},c=>{o.push(this.Yn(e,t,n,c))}),v.waitFor(o)}Gn(e){let t=1;return Kn(e).ee({index:Xf,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,c)=>Nt(o,c)).filter((o,c,u)=>!c||Nt(o,u[c-1])!==0);const s=[];s.push(e);for(const o of n){const c=Nt(o,e),u=Nt(o,t);if(c===0)s[0]=e.An();else if(c>0&&u<0)s.push(o),s.push(o.An());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Zn(s[o],s[o+1]))return[];const c=s[o].Vn(this.uid,di,F.empty()),u=s[o+1].Vn(this.uid,di,F.empty());i.push(IDBKeyRange.bound(c,u))}return i}Zn(e,t){return Nt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Wh)}getMinOffset(e,t){return v.mapArray(this.Mn(t),n=>this.xn(e,n).next(s=>s||B(44426))).next(Wh)}}function Hh(r){return _e(r,Is)}function Gn(r){return _e(r,as)}function Kr(r){return _e(r,Cc)}function Kn(r){return _e(r,os)}function Wh(r){j(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Rc(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new $e(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},nm=41943040;class Pe{static withCacheSize(e){return new Pe(e,Pe.DEFAULT_COLLECTION_PERCENTILE,Pe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rm(r,e,t){const n=r.store(Ye),s=r.store(ar),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=n.ee({range:o},(f,m,g)=>(c++,g.delete()));i.push(u.next(()=>{j(c===1,47070,{batchId:t.batchId})}));const h=[];for(const f of t.mutations){const m=Qf(e,f.key.path,t.batchId);i.push(s.delete(m)),h.push(f.key)}return v.waitFor(i).next(()=>h)}function Zi(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw B(14731);e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Pe.DEFAULT_COLLECTION_PERCENTILE=10,Pe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Pe.DEFAULT=new Pe(nm,Pe.DEFAULT_COLLECTION_PERCENTILE,Pe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Pe.DISABLED=new Pe(-1,0,0);class Co{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Xn={}}static wt(e,t,n,s){j(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new Co(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ot(e).ee({index:_n,range:n},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,s){const i=Xn(e),o=Ot(e);return o.add({}).next(c=>{j(typeof c=="number",49019);const u=new Fc(c,t,n,s),h=function(R,V,k){const C=k.baseMutations.map(L=>Ji(R.yt,L)),O=k.mutations.map(L=>Ji(R.yt,L));return{userId:V,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:C,mutations:O}}(this.serializer,this.userId,u),f=[];let m=new re((g,R)=>K(g.canonicalString(),R.canonicalString()));for(const g of s){const R=Qf(this.userId,g.key.path,c);m=m.add(g.key.path.popLast()),f.push(o.put(h)),f.push(i.put(R,mT))}return m.forEach(g=>{f.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Xn[c]=u.keys()}),v.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return Ot(e).get(t).next(n=>n?(j(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),fn(this.serializer,n)):null)}er(e,t){return this.Xn[t]?v.resolve(this.Xn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const s=n.keys();return this.Xn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Ot(e).ee({index:_n,range:s},(o,c,u)=>{c.userId===this.userId&&(j(c.batchId>=n,47524,{tr:n}),i=fn(this.serializer,c)),u.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=yn;return Ot(e).ee({index:_n,range:t,reverse:!0},(s,i,o)=>{n=i.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,yn],[this.userId,Number.POSITIVE_INFINITY]);return Ot(e).J(_n,t).next(n=>n.map(s=>fn(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=vi(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return Xn(e).ee({range:s},(o,c,u)=>{const[h,f,m]=o,g=nt(f);if(h===this.userId&&t.path.isEqual(g))return Ot(e).get(m).next(R=>{if(!R)throw B(61480,{nr:o,batchId:m});j(R.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:R.userId,batchId:m}),i.push(fn(this.serializer,R))});u.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(K);const s=[];return t.forEach(i=>{const o=vi(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Xn(e).ee({range:c},(h,f,m)=>{const[g,R,V]=h,k=nt(R);g===this.userId&&i.path.isEqual(k)?n=n.add(V):m.done()});s.push(u)}),v.waitFor(s).next(()=>this.rr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=vi(this.userId,n),o=IDBKeyRange.lowerBound(i);let c=new re(K);return Xn(e).ee({range:o},(u,h,f)=>{const[m,g,R]=u,V=nt(g);m===this.userId&&n.isPrefixOf(V)?V.length===s&&(c=c.add(R)):f.done()}).next(()=>this.rr(e,c))}rr(e,t){const n=[],s=[];return t.forEach(i=>{s.push(Ot(e).get(i).next(o=>{if(o===null)throw B(35274,{batchId:i});j(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(fn(this.serializer,o))}))}),v.waitFor(s).next(()=>n)}removeMutationBatch(e,t){return rm(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.ir(t.batchId)}),v.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}ir(e){delete this.Xn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return v.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return Xn(e).ee({range:n},(i,o,c)=>{if(i[0]===this.userId){const u=nt(i[1]);s.push(u)}else c.done()}).next(()=>{j(s.length===0,56720,{sr:s.map(i=>i.canonicalString())})})})}containsKey(e,t){return sm(e,this.userId,t)}_r(e){return im(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:yn,lastStreamToken:""})}}function sm(r,e,t){const n=vi(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return Xn(r).ee({range:i,X:!0},(c,u,h)=>{const[f,m,g]=c;f===e&&m===s&&(o=!0),h.done()}).next(()=>o)}function Ot(r){return _e(r,Ye)}function Xn(r){return _e(r,ar)}function im(r){return _e(r,_s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new kn(0)}static cr(){return new kn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.lr(e).next(t=>{const n=new kn(t.highestTargetId);return t.highestTargetId=n.next(),this.hr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.lr(e).next(t=>z.fromTimestamp(new te(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.lr(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.lr(e).next(s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.hr(e,s)))}addTargetData(e,t){return this.Pr(e,t).next(()=>this.lr(e).next(n=>(n.targetCount+=1,this.Tr(t,n),this.hr(e,n))))}updateTargetData(e,t){return this.Pr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Hn(e).delete(t.targetId)).next(()=>this.lr(e)).next(n=>(j(n.targetCount>0,8065),n.targetCount-=1,this.hr(e,n)))}removeTargets(e,t,n){let s=0;const i=[];return Hn(e).ee((o,c)=>{const u=es(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))}).next(()=>v.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Hn(e).ee((n,s)=>{const i=es(s);t(i)})}lr(e){return Jh(e).get(Gi).next(t=>(j(t!==null,2888),t))}hr(e,t){return Jh(e).put(Gi,t)}Pr(e,t){return Hn(e).put(Xp(this.serializer,t))}Tr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.lr(e).next(t=>t.targetCount)}getTargetData(e,t){const n=Vn(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Hn(e).ee({range:s,index:Yf},(o,c,u)=>{const h=es(c);Os(t,h.target)&&(i=h,u.done())}).next(()=>i)}addMatchingKeys(e,t,n){const s=[],i=Bt(e);return t.forEach(o=>{const c=Ve(o.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(e,n,o))}),v.waitFor(s)}removeMatchingKeys(e,t,n){const s=Bt(e);return v.forEach(t,i=>{const o=Ve(i.path);return v.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])})}removeMatchingKeysForTargetId(e,t){const n=Bt(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=Bt(e);let i=W();return s.ee({range:n,X:!0},(o,c,u)=>{const h=nt(o[1]),f=new F(h);i=i.add(f)}).next(()=>i)}containsKey(e,t){const n=Ve(t.path),s=IDBKeyRange.bound([n],[qf(n)],!1,!0);let i=0;return Bt(e).ee({index:Pc,X:!0,range:s},([o,c],u,h)=>{o!==0&&(i++,h.done())}).next(()=>i>0)}At(e,t){return Hn(e).get(t).next(n=>n?es(n):null)}}function Hn(r){return _e(r,cr)}function Jh(r){return _e(r,In)}function Bt(r){return _e(r,ur)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yh="LruGarbageCollector",qw=1048576;function Xh([r,e],[t,n]){const s=K(r,t);return s===0?K(e,n):s}class zw{constructor(e){this.Ir=e,this.buffer=new re(Xh),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Xh(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class om{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){D(Yh,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Zt(t)?D(Yh,"Ignoring IndexedDB error during garbage collection: ",t):await On(t)}await this.Vr(3e5)})}}class $w{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return v.resolve(Ke.ce);const n=new zw(t);return this.mr.forEachTarget(e,s=>n.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>n.Ar(s))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),v.resolve(Qh)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Qh):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(n=m,c=Date.now(),this.removeTargets(e,n,t))).next(m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(e,n))).next(m=>(h=Date.now(),Wn()<=J.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),v.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function am(r,e){return new $w(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e,t){this.db=e,this.garbageCollector=am(this,t)}gr(e){const t=this.wr(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}wr(e){let t=0;return this.pr(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}pr(e,t){return this.Sr(e,(n,s)=>t(s))}addReference(e,t,n){return fi(e,n)}removeReference(e,t,n){return fi(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return fi(e,t)}br(e,t){return function(s,i){let o=!1;return im(s).te(c=>sm(s,c,i).next(u=>(u&&(o=!0),v.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Sr(e,(o,c)=>{if(c<=t){const u=this.br(e,o).next(h=>{if(!h)return i++,n.getEntry(e,o).next(()=>(n.removeEntry(o,z.min()),Bt(e).delete(function(m){return[0,Ve(m.path)]}(o))))});s.push(u)}}).next(()=>v.waitFor(s)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return fi(e,t)}Sr(e,t){const n=Bt(e);let s,i=Ke.ce;return n.ee({index:Pc},([o,c],{path:u,sequenceNumber:h})=>{o===0?(i!==Ke.ce&&t(new F(nt(s)),i),i=h,s=u):i=Ke.ce}).next(()=>{i!==Ke.ce&&t(new F(nt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function fi(r,e){return Bt(r).put(function(n,s){return{targetId:0,path:Ve(n.path),sequenceNumber:s}}(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cm{constructor(){this.changes=new St(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,le.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?v.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return an(e).put(n)}removeEntry(e,t,n){return an(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Yi(o),c[c.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.Dr(e,n)))}getEntry(e,t){let n=le.newInvalidDocument(t);return an(e).ee({index:Ai,range:IDBKeyRange.only(Hr(t))},(s,i)=>{n=this.Cr(t,i)}).next(()=>n)}vr(e,t){let n={size:0,document:le.newInvalidDocument(t)};return an(e).ee({index:Ai,range:IDBKeyRange.only(Hr(t))},(s,i)=>{n={document:this.Cr(t,i),size:Zi(i)}}).next(()=>n)}getEntries(e,t){let n=ze();return this.Fr(e,t,(s,i)=>{const o=this.Cr(s,i);n=n.insert(s,o)}).next(()=>n)}Mr(e,t){let n=ze(),s=new ae(F.comparator);return this.Fr(e,t,(i,o)=>{const c=this.Cr(i,o);n=n.insert(i,c),s=s.insert(i,Zi(o))}).next(()=>({documents:n,Or:s}))}Fr(e,t,n){if(t.isEmpty())return v.resolve();let s=new re(td);t.forEach(u=>s=s.add(u));const i=IDBKeyRange.bound(Hr(s.first()),Hr(s.last())),o=s.getIterator();let c=o.getNext();return an(e).ee({index:Ai,range:i},(u,h,f)=>{const m=F.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&td(c,m)<0;)n(c,null),c=o.getNext();c&&c.isEqual(m)&&(n(c,h),c=o.hasNext()?o.getNext():null),c?f.j(Hr(c)):f.done()}).next(()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Yi(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return an(e).J(IDBKeyRange.bound(c,u,!0)).next(h=>{i==null||i.incrementDocumentReadCount(h.length);let f=ze();for(const m of h){const g=this.Cr(F.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);g.isFoundDocument()&&(Ls(t,g)||s.has(g.key))&&(f=f.insert(g.key,g))}return f})}getAllFromCollectionGroup(e,t,n,s){let i=ze();const o=ed(t,n),c=ed(t,$e.max());return an(e).ee({index:Jf,range:IDBKeyRange.bound(o,c,!0)},(u,h,f)=>{const m=this.Cr(F.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(e){return new Hw(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Zh(e).get(ja).next(t=>(j(!!t,20021),t))}Dr(e,t){return Zh(e).put(ja,t)}Cr(e,t){if(t){const n=xw(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(z.min())))return n}return le.newInvalidDocument(e)}}function um(r){return new Kw(r)}class Hw extends cm{constructor(e,t){super(),this.Nr=e,this.trackRemovals=t,this.Br=new St(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(e){const t=[];let n=0,s=new re((i,o)=>K(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Br.get(i);if(t.push(this.Nr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Mh(this.Nr.serializer,o);s=s.add(i.path.popLast());const h=Zi(u);n+=h-c.size,t.push(this.Nr.addEntry(e,i,u))}else if(n-=c.size,this.trackRemovals){const u=Mh(this.Nr.serializer,o.convertToNoDocument(z.min()));t.push(this.Nr.addEntry(e,i,u))}}),s.forEach(i=>{t.push(this.Nr.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Nr.updateMetadata(e,n)),v.waitFor(t)}getFromCache(e,t){return this.Nr.vr(e,t).next(n=>(this.Br.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.Nr.Mr(e,t).next(({documents:n,Or:s})=>(s.forEach((i,o)=>{this.Br.set(i,{size:o,readTime:n.get(i).readTime})}),n))}}function Zh(r){return _e(r,ys)}function an(r){return _e(r,$i)}function Hr(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function ed(r,e){const t=e.documentKey.path.toArray();return[r,Yi(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function td(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=K(t[i],n[i]),s)return s;return s=K(t.length,n.length),s||(s=K(t[t.length-2],n[n.length-2]),s||K(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(n=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(n!==null&&hs(n.mutation,s,Le.empty(),te.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,W()).next(()=>n))}getLocalViewOfDocuments(e,t,n=W()){const s=rt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,n).next(i=>{let o=Xr();return i.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=rt();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,W()))}populateOverlays(e,t,n){const s=[];return n.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,n,s){let i=ze();const o=ls(),c=function(){return ls()}();return t.forEach((u,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Pt)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),hs(f.mutation,h,f.mutation.getFieldMask(),te.now())):o.set(h.key,Le.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>c.set(h,new Ww(f,o.get(h)??null))),c))}recalculateAndSaveOverlays(e,t){const n=ls();let s=new ae((o,c)=>o-c),i=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||Le.empty();f=c.applyToLocalView(h,f),n.set(u,f);const m=(s.get(c.batchId)||W()).add(u);s=s.insert(c.batchId,m)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,m=Sp();f.forEach(g=>{if(!i.has(g)){const R=Np(t.get(g),n.get(g));R!==null&&m.set(g,R),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return v.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,s){return function(o){return F.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):wp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):v.resolve(rt());let c=ps,u=i;return o.next(h=>v.forEach(h,(f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?v.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,W())).next(f=>({batchId:c,changes:Rp(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(n=>{let s=Xr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=Xr();return this.indexManager.getCollectionParents(e,i).next(c=>v.forEach(c,u=>{const h=function(m,g){return new Ar(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next(f=>{f.forEach((m,g)=>{o=o.insert(m,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s))).next(o=>{i.forEach((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,le.newInvalidDocument(f)))});let c=Xr();return o.forEach((u,h)=>{const f=i.get(u);f!==void 0&&hs(f.mutation,h,Le.empty(),te.now()),Ls(t,h)&&(c=c.insert(u,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return v.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Me(s.createTime)}}(t)),v.resolve()}getNamedQuery(e,t){return v.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(s){return{name:s.name,query:Zp(s.bundledQuery),readTime:Me(s.readTime)}}(t)),v.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{constructor(){this.overlays=new ae(F.comparator),this.qr=new Map}getOverlay(e,t){return v.resolve(this.overlays.get(t))}getOverlays(e,t){const n=rt();return v.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((s,i)=>{this.St(e,t,i)}),v.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.qr.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(n)),v.resolve()}getOverlaysForCollection(e,t,n){const s=rt(),i=t.length+1,o=new F(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>n&&s.set(u.getKey(),u)}return v.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new ae((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=rt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=rt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=s)););return v.resolve(c)}St(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(n.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new Bc(t,n));let i=this.qr.get(t);i===void 0&&(i=W(),this.qr.set(t,i)),this.qr.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(){this.sessionToken=me.EMPTY_BYTE_STRING}getSessionToken(e){return v.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,v.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(){this.Qr=new re(Ie.$r),this.Ur=new re(Ie.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new Ie(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Gr(new Ie(e,t))}zr(e,t){e.forEach(n=>this.removeReference(n,t))}jr(e){const t=new F(new ee([])),n=new Ie(t,e),s=new Ie(t,e+1),i=[];return this.Ur.forEachInRange([n,s],o=>{this.Gr(o),i.push(o.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new F(new ee([])),n=new Ie(t,e),s=new Ie(t,e+1);let i=W();return this.Ur.forEachInRange([n,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Ie(e,0),n=this.Qr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Ie{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return F.comparator(e.key,t.key)||K(e.Yr,t.Yr)}static Kr(e,t){return K(e.Yr,t.Yr)||F.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new re(Ie.$r)}checkEmpty(e){return v.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Fc(i,t,n,s);this.mutationQueue.push(o);for(const c of s)this.Zr=this.Zr.add(new Ie(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return v.resolve(o)}lookupMutationBatch(e,t){return v.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.ei(n),i=s<0?0:s;return v.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return v.resolve(this.mutationQueue.length===0?yn:this.tr-1)}getAllMutationBatches(e){return v.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Ie(t,0),s=new Ie(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([n,s],o=>{const c=this.Xr(o.Yr);i.push(c)}),v.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(K);return t.forEach(s=>{const i=new Ie(s,0),o=new Ie(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],c=>{n=n.add(c.Yr)})}),v.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;F.isDocumentKey(i)||(i=i.child(""));const o=new Ie(new F(i),0);let c=new re(K);return this.Zr.forEachWhile(u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Yr)),!0)},o),v.resolve(this.ti(c))}ti(e){const t=[];return e.forEach(n=>{const s=this.Xr(n);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){j(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Zr;return v.forEach(t.mutations,s=>{const i=new Ie(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=n})}ir(e){}containsKey(e,t){const n=new Ie(t,0),s=this.Zr.firstAfterOrEqual(n);return v.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,v.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(e){this.ri=e,this.docs=function(){return new ae(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return v.resolve(n?n.document.mutableCopy():le.newInvalidDocument(t))}getEntries(e,t){let n=ze();return t.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():le.newInvalidDocument(s))}),v.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=ze();const o=t.path,c=new F(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Rc(Gf(f),n)<=0||(s.has(f.key)||Ls(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return v.resolve(i)}getAllFromCollectionGroup(e,t,n,s){B(9500)}ii(e,t){return v.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new ev(this)}getSize(e){return v.resolve(this.size)}}class ev extends cm{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(n)}),v.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tv{constructor(e){this.persistence=e,this.si=new St(t=>Vn(t),Os),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.oi=0,this._i=new Gc,this.targetCount=0,this.ai=kn.ur()}forEachTarget(e,t){return this.si.forEach((n,s)=>t(s)),v.resolve()}getLastRemoteSnapshotVersion(e){return v.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return v.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),v.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),v.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new kn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,v.resolve()}updateTargetData(e,t){return this.Pr(t),v.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,v.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.si.forEach((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),v.waitFor(i).next(()=>s)}getTargetCount(e){return v.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return v.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),v.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),v.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),v.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return v.resolve(n)}containsKey(e,t){return v.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,t){this.ui={},this.overlays={},this.ci=new Ke(0),this.li=!1,this.li=!0,this.hi=new Yw,this.referenceDelegate=e(this),this.Pi=new tv(this),this.indexManager=new Uw,this.remoteDocumentCache=function(s){return new Zw(s)}(n=>this.referenceDelegate.Ti(n)),this.serializer=new Yp(t),this.Ii=new Qw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Jw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new Xw(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){D("MemoryPersistence","Starting transaction:",e);const s=new nv(this.ci.next());return this.referenceDelegate.Ei(),n(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,t){return v.or(Object.values(this.ui).map(n=>()=>n.containsKey(e,t)))}}class nv extends Hf{constructor(e){super(),this.currentSequenceNumber=e}}class Vo{constructor(e){this.persistence=e,this.Ri=new Gc,this.Vi=null}static mi(e){return new Vo(e)}get fi(){if(this.Vi)return this.Vi;throw B(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),v.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),v.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),v.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(s=>this.fi.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>n.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return v.forEach(this.fi,n=>{const s=F.fromPath(n);return this.gi(e,s).next(i=>{i||t.removeEntry(s,z.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(n=>{n?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return v.or([()=>v.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class eo{constructor(e,t){this.persistence=e,this.pi=new St(n=>Ve(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=am(this,t)}static mi(e,t){return new eo(e,t)}Ei(){}di(e){return v.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}wr(e){let t=0;return this.pr(e,n=>{t++}).next(()=>t)}pr(e,t){return v.forEach(this.pi,(n,s)=>this.br(e,n,s).next(i=>i?v.resolve():t(s)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,o=>this.br(e,o,t).next(c=>{c||(n++,i.removeEntry(o,z.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),v.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),v.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),v.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),v.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ri(e.data.value)),t}br(e,t,n){return v.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return v.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rv{constructor(e){this.serializer=e}k(e,t,n,s){const i=new _o("createOrUpgrade",t);n<1&&s>=1&&(function(u){u.createObjectStore(Ns)}(e),function(u){u.createObjectStore(_s,{keyPath:pT}),u.createObjectStore(Ye,{keyPath:dh,autoIncrement:!0}).createIndex(_n,fh,{unique:!0}),u.createObjectStore(ar)}(e),nd(e),function(u){u.createObjectStore(hn)}(e));let o=v.resolve();return n<3&&s>=3&&(n!==0&&(function(u){u.deleteObjectStore(ur),u.deleteObjectStore(cr),u.deleteObjectStore(In)}(e),nd(e)),o=o.next(()=>function(u){const h=u.store(In),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:z.min().toTimestamp(),targetCount:0};return h.put(Gi,f)}(i))),n<4&&s>=4&&(n!==0&&(o=o.next(()=>function(u,h){return h.store(Ye).J().next(m=>{u.deleteObjectStore(Ye),u.createObjectStore(Ye,{keyPath:dh,autoIncrement:!0}).createIndex(_n,fh,{unique:!0});const g=h.store(Ye),R=m.map(V=>g.put(V));return v.waitFor(R)})}(e,i))),o=o.next(()=>{(function(u){u.createObjectStore(lr,{keyPath:vT})})(e)})),n<5&&s>=5&&(o=o.next(()=>this.yi(i))),n<6&&s>=6&&(o=o.next(()=>(function(u){u.createObjectStore(ys)}(e),this.wi(i)))),n<7&&s>=7&&(o=o.next(()=>this.Si(i))),n<8&&s>=8&&(o=o.next(()=>this.bi(e,i))),n<9&&s>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&s>=10&&(o=o.next(()=>this.Di(i))),n<11&&s>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(Io,{keyPath:AT})})(e),function(u){u.createObjectStore(Eo,{keyPath:bT})}(e)})),n<12&&s>=12&&(o=o.next(()=>{(function(u){const h=u.createObjectStore(To,{keyPath:DT});h.createIndex(za,kT,{unique:!1}),h.createIndex(ep,NT,{unique:!1})})(e)})),n<13&&s>=13&&(o=o.next(()=>function(u){const h=u.createObjectStore($i,{keyPath:gT});h.createIndex(Ai,_T),h.createIndex(Jf,yT)}(e)).next(()=>this.Ci(e,i)).next(()=>e.deleteObjectStore(hn))),n<14&&s>=14&&(o=o.next(()=>this.Fi(e,i))),n<15&&s>=15&&(o=o.next(()=>function(u){u.createObjectStore(Cc,{keyPath:RT,autoIncrement:!0}).createIndex(qa,ST,{unique:!1}),u.createObjectStore(os,{keyPath:PT}).createIndex(Xf,CT,{unique:!1}),u.createObjectStore(as,{keyPath:VT}).createIndex(Zf,xT,{unique:!1})}(e))),n<16&&s>=16&&(o=o.next(()=>{t.objectStore(os).clear()}).next(()=>{t.objectStore(as).clear()})),n<17&&s>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(Vc,{keyPath:OT})})(e)})),n<18&&s>=18&&Gd()&&(o=o.next(()=>{t.objectStore(os).clear()}).next(()=>{t.objectStore(as).clear()})),o}wi(e){let t=0;return e.store(hn).ee((n,s)=>{t+=Zi(s)}).next(()=>{const n={byteSize:t};return e.store(ys).put(ja,n)})}yi(e){const t=e.store(_s),n=e.store(Ye);return t.J().next(s=>v.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,yn],[i.userId,i.lastAcknowledgedBatchId]);return n.J(_n,o).next(c=>v.forEach(c,u=>{j(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const h=fn(this.serializer,u);return rm(e,i.userId,h).next(()=>{})}))}))}Si(e){const t=e.store(ur),n=e.store(hn);return e.store(In).get(Gi).next(s=>{const i=[];return n.ee((o,c)=>{const u=new ee(o),h=function(m){return[0,Ve(m)]}(u);i.push(t.get(h).next(f=>f?v.resolve():(m=>t.put({targetId:0,path:Ve(m),sequenceNumber:s.highestListenSequenceNumber}))(u)))}).next(()=>v.waitFor(i))})}bi(e,t){e.createObjectStore(Is,{keyPath:wT});const n=t.store(Is),s=new $c,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return n.put({collectionId:c,parent:Ve(u)})}};return t.store(hn).ee({X:!0},(o,c)=>{const u=new ee(o);return i(u.popLast())}).next(()=>t.store(ar).ee({X:!0},([o,c,u],h)=>{const f=nt(c);return i(f.popLast())}))}Di(e){const t=e.store(cr);return t.ee((n,s)=>{const i=es(s),o=Xp(this.serializer,i);return t.put(o)})}Ci(e,t){const n=t.store(hn),s=[];return n.ee((i,o)=>{const c=t.store($i),u=function(m){return m.document?new F(ee.fromString(m.document.name).popFirst(5)):m.noDocument?F.fromSegments(m.noDocument.path):m.unknownDocument?F.fromSegments(m.unknownDocument.path):B(36783)}(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))}).next(()=>v.waitFor(s))}Fi(e,t){const n=t.store(Ye),s=um(this.serializer),i=new Kc(Vo.mi,this.serializer.yt);return n.J().next(o=>{const c=new Map;return o.forEach(u=>{let h=c.get(u.userId)??W();fn(this.serializer,u).keys().forEach(f=>h=h.add(f)),c.set(u.userId,h)}),v.forEach(c,(u,h)=>{const f=new Te(h),m=Po.wt(this.serializer,f),g=i.getIndexManager(f),R=Co.wt(f,this.serializer,g,i.referenceDelegate);return new lm(s,R,m,g).recalculateAndSaveOverlaysForDocumentKeys(new $a(t,Ke.ce),u).next()})})}}function nd(r){r.createObjectStore(ur,{keyPath:ET}).createIndex(Pc,TT,{unique:!0}),r.createObjectStore(cr,{keyPath:"targetId"}).createIndex(Yf,IT,{unique:!0}),r.createObjectStore(In)}const Mt="IndexedDbPersistence",va=18e5,Aa=5e3,ba="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",sv="main";class Hc{constructor(e,t,n,s,i,o,c,u,h,f,m=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Mi=i,this.window=o,this.document=c,this.xi=h,this.Oi=f,this.Ni=m,this.ci=null,this.li=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Bi=null,this.inForeground=!1,this.Li=null,this.ki=null,this.qi=Number.NEGATIVE_INFINITY,this.Qi=g=>Promise.resolve(),!Hc.v())throw new N(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Gw(this,s),this.$i=t+sv,this.serializer=new Yp(u),this.Ui=new Ht(this.$i,this.Ni,new rv(this.serializer)),this.hi=new kw,this.Pi=new jw(this.referenceDelegate,this.serializer),this.remoteDocumentCache=um(this.serializer),this.Ii=new Dw,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,f===!1&&ke(Mt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new N(P.FAILED_PRECONDITION,ba);return this.Gi(),this.zi(),this.ji(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Pi.getHighestSequenceNumber(e))}).then(e=>{this.ci=new Ke(e,this.xi)}).then(()=>{this.li=!0}).catch(e=>(this.Ui&&this.Ui.close(),Promise.reject(e)))}Ji(e){return this.Qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ui.$(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Mi.enqueueAndForget(async()=>{this.started&&await this.Wi()}))}Wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>pi(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Hi(e).next(t=>{t||(this.isPrimary=!1,this.Mi.enqueueRetryable(()=>this.Qi(!1)))})}).next(()=>this.Yi(e)).next(t=>this.isPrimary&&!t?this.Zi(e).next(()=>!1):!!t&&this.Xi(e).next(()=>!0))).catch(e=>{if(Zt(e))return D(Mt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return D(Mt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Mi.enqueueRetryable(()=>this.Qi(e)),this.isPrimary=e})}Hi(e){return Wr(e).get(qn).next(t=>v.resolve(this.es(t)))}ts(e){return pi(e).delete(this.clientId)}async ns(){if(this.isPrimary&&!this.rs(this.qi,va)){this.qi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=_e(t,lr);return n.J().next(s=>{const i=this.ss(s,va),o=s.filter(c=>i.indexOf(c)===-1);return v.forEach(o,c=>n.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Ki)for(const t of e)this.Ki.removeItem(this._s(t.clientId))}}ji(){this.ki=this.Mi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Wi().then(()=>this.ns()).then(()=>this.ji()))}es(e){return!!e&&e.ownerId===this.clientId}Yi(e){return this.Oi?v.resolve(!0):Wr(e).get(qn).next(t=>{if(t!==null&&this.rs(t.leaseTimestampMs,Aa)&&!this.us(t.ownerId)){if(this.es(t)&&this.networkEnabled)return!0;if(!this.es(t)){if(!t.allowTabSynchronization)throw new N(P.FAILED_PRECONDITION,ba);return!1}}return!(!this.networkEnabled||!this.inForeground)||pi(e).J().next(n=>this.ss(n,Aa).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&D(Mt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.li=!1,this.cs(),this.ki&&(this.ki.cancel(),this.ki=null),this.ls(),this.hs(),await this.Ui.runTransaction("shutdown","readwrite",[Ns,lr],e=>{const t=new $a(e,Ke.ce);return this.Zi(t).next(()=>this.ts(t))}),this.Ui.close(),this.Ps()}ss(e,t){return e.filter(n=>this.rs(n.updateTimeMs,t)&&!this.us(n.clientId))}Ts(){return this.runTransaction("getActiveClients","readonly",e=>pi(e).J().next(t=>this.ss(t,va).map(n=>n.clientId)))}get started(){return this.li}getGlobalsCache(){return this.hi}getMutationQueue(e,t){return Co.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Bw(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return Po.wt(this.serializer,e)}getBundleCache(){return this.Ii}runTransaction(e,t,n){D(Mt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(u){return u===18?FT:u===17?sp:u===16?LT:u===15?xc:u===14?rp:u===13?np:u===12?MT:u===11?tp:void B(60245)}(this.Ni);let o;return this.Ui.runTransaction(e,s,i,c=>(o=new $a(c,this.ci?this.ci.next():Ke.ce),t==="readwrite-primary"?this.Hi(o).next(u=>!!u||this.Yi(o)).next(u=>{if(!u)throw ke(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Mi.enqueueRetryable(()=>this.Qi(!1)),new N(P.FAILED_PRECONDITION,Kf);return n(o)}).next(u=>this.Xi(o).next(()=>u)):this.Is(o).next(()=>n(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Is(e){return Wr(e).get(qn).next(t=>{if(t!==null&&this.rs(t.leaseTimestampMs,Aa)&&!this.us(t.ownerId)&&!this.es(t)&&!(this.Oi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new N(P.FAILED_PRECONDITION,ba)})}Xi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Wr(e).put(qn,t)}static v(){return Ht.v()}Zi(e){const t=Wr(e);return t.get(qn).next(n=>this.es(n)?(D(Mt,"Releasing primary lease."),t.delete(qn)):v.resolve())}rs(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(ke(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Gi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Li=()=>{this.Mi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Wi()))},this.document.addEventListener("visibilitychange",this.Li),this.inForeground=this.document.visibilityState==="visible")}ls(){this.Li&&(this.document.removeEventListener("visibilitychange",this.Li),this.Li=null)}zi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Bi=()=>{this.cs();const t=/(?:Version|Mobile)\/1[456]/;$d()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Mi.enterRestrictedMode(!0),this.Mi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Bi))}hs(){this.Bi&&(this.window.removeEventListener("pagehide",this.Bi),this.Bi=null)}us(e){var t;try{const n=((t=this.Ki)==null?void 0:t.getItem(this._s(e)))!==null;return D(Mt,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ke(Mt,"Failed to get zombied client id.",n),!1}}cs(){if(this.Ki)try{this.Ki.setItem(this._s(this.clientId),String(Date.now()))}catch(e){ke("Failed to set zombie client id.",e)}}Ps(){if(this.Ki)try{this.Ki.removeItem(this._s(this.clientId))}catch{}}_s(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Wr(r){return _e(r,Ns)}function pi(r){return _e(r,lr)}function iv(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=s}static As(e,t){let n=W(),s=W();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Wc(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return $d()?8:Wf(ge())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.ys(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ws(e,t,s,n).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new ov;return this.Ss(e,t,o).next(c=>{if(i.result=c,this.Vs)return this.bs(e,t,o,c.size)})}).next(()=>i.result)}bs(e,t,n,s){return n.documentReadCount<this.fs?(Wn()<=J.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Qn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),v.resolve()):(Wn()<=J.DEBUG&&D("QueryEngine","Query:",Qn(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.gs*s?(Wn()<=J.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Qn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,He(t))):v.resolve())}ys(e,t){if(Rh(t))return v.resolve(null);let n=He(t);return this.indexManager.getIndexType(e,n).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Ya(t,null,"F"),n=He(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(i=>{const o=W(...i);return this.ps.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,n).next(u=>{const h=this.Ds(t,c);return this.Cs(t,h,o,u.readTime)?this.ys(e,Ya(t,null,"F")):this.vs(e,h,t,u)}))})))}ws(e,t,n,s){return Rh(t)||s.isEqual(z.min())?v.resolve(null):this.ps.getDocuments(e,n).next(i=>{const o=this.Ds(t,i);return this.Cs(t,o,n,s)?v.resolve(null):(Wn()<=J.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Qn(t)),this.vs(e,o,t,aT(s,ps)).next(c=>c))})}Ds(e,t){let n=new re(Ap(e));return t.forEach((s,i)=>{Ls(e,i)&&(n=n.add(i))}),n}Cs(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,n){return Wn()<=J.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Qn(t)),this.ps.getDocumentsMatchingQuery(e,t,$e.min(),n)}vs(e,t,n,s){return this.ps.getDocumentsMatchingQuery(e,n,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc="LocalStore",av=3e8;class cv{constructor(e,t,n,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new ae(K),this.xs=new St(i=>Vn(i),Os),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new lm(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function dm(r,e,t,n){return new cv(r,e,t,n)}async function fm(r,e){const t=H(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(n))).next(i=>{const o=[],c=[];let u=W();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next(h=>({Ls:h,removedBatchIds:o,addedBatchIds:c}))})})}function uv(r,e){const t=H(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(c,u,h,f){const m=h.batch,g=m.keys();let R=v.resolve();return g.forEach(V=>{R=R.next(()=>f.getEntry(u,V)).next(k=>{const C=h.docVersions.get(V);j(C!==null,48541),k.version.compareTo(C)<0&&(m.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),f.addEntry(k)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(u,m))}(t,n,e,i).next(()=>i.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let u=W();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(n,s))})}function pm(r){const e=H(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function lv(r,e){const t=H(r),n=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const c=[];e.targetChanges.forEach((f,m)=>{const g=s.get(m);if(!g)return;c.push(t.Pi.removeMatchingKeys(i,f.removedDocuments,m).next(()=>t.Pi.addMatchingKeys(i,f.addedDocuments,m)));let R=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?R=R.withResumeToken(me.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,n)),s=s.insert(m,R),function(k,C,O){return k.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=av?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0}(g,R,f)&&c.push(t.Pi.updateTargetData(i,R))});let u=ze(),h=W();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(hv(i,o,e.documentUpdates).next(f=>{u=f.ks,h=f.qs})),!n.isEqual(z.min())){const f=t.Pi.getLastRemoteSnapshotVersion(i).next(m=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,n));c.push(f)}return v.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(t.Ms=s,i))}function hv(r,e,t){let n=W(),s=W();return t.forEach(i=>n=n.add(i)),e.getEntries(r,n).next(i=>{let o=ze();return t.forEach((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(z.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):D(Qc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)}),{ks:o,qs:s}})}function dv(r,e){const t=H(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=yn),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function fv(r,e){const t=H(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return t.Pi.getTargetData(n,e).next(i=>i?(s=i,v.resolve(s)):t.Pi.allocateTargetId(n).next(o=>(s=new _t(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Pi.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=t.Ms.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(n.targetId,n),t.xs.set(e,n.targetId)),n})}async function ic(r,e,t){const n=H(r),s=n.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,o=>n.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Zt(o))throw o;D(Qc,`Failed to update sequence numbers for target ${e}: ${o}`)}n.Ms=n.Ms.remove(e),n.xs.delete(s.target)}function rd(r,e,t){const n=H(r);let s=z.min(),i=W();return n.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,f){const m=H(u),g=m.xs.get(f);return g!==void 0?v.resolve(m.Ms.get(g)):m.Pi.getTargetData(h,f)}(n,o,He(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.Pi.getMatchingKeysForTargetId(o,c.targetId).next(u=>{i=u})}).next(()=>n.Fs.getDocumentsMatchingQuery(o,e,t?s:z.min(),t?i:W())).next(c=>(pv(n,ZT(e),c),{documents:c,Qs:i})))}function pv(r,e,t){let n=r.Os.get(e)||z.min();t.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.Os.set(e,n)}class sd{constructor(){this.activeTargetIds=iw()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class mm{constructor(){this.Mo=new sd,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new sd,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mv{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="ConnectivityMonitor";class od{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){D(id,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){D(id,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mi=null;function oc(){return mi===null?mi=function(){return 268435456+Math.round(2147483648*Math.random())}():mi++,"0x"+mi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ra="RestConnection",gv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class _v{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${s}`,this.Wo=this.databaseId.database===Ki?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Go(e,t,n,s,i){const o=oc(),c=this.zo(e,t.toUriEncodedString());D(Ra,`Sending RPC '${e}' ${o}:`,c,n);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:h}=new URL(c),f=Er(h);return this.Jo(e,c,u,n,f).then(m=>(D(Ra,`Received RPC '${e}' ${o}: `,m),m),m=>{throw Pn(Ra,`RPC '${e}' ${o} failed with error: `,m,"url: ",c,"request:",n),m})}Ho(e,t,n,s,i,o){return this.Go(e,t,n,s,i)}jo(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+vr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),n&&n.headers.forEach((s,i)=>e[i]=s)}zo(e,t){const n=gv[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="WebChannelConnection";class Iv extends _v{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,s,i){const o=oc();return new Promise((c,u)=>{const h=new Of;h.setWithCredentials(!0),h.listenOnce(Mf.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Ti.NO_ERROR:const m=h.getResponseJson();D(Se,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),c(m);break;case Ti.TIMEOUT:D(Se,`RPC '${e}' ${o} timed out`),u(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case Ti.HTTP_ERROR:const g=h.getStatus();if(D(Se,`RPC '${e}' ${o} failed with status:`,g,"response text:",h.getResponseText()),g>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const V=R==null?void 0:R.error;if(V&&V.status&&V.message){const k=function(O){const L=O.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(L)>=0?L:P.UNKNOWN}(V.status);u(new N(k,V.message))}else u(new N(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new N(P.UNAVAILABLE,"Connection failed."));break;default:B(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{D(Se,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(s);D(Se,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,n,15)})}T_(e,t,n){const s=oc(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Uf(),c=Ff(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const f=i.join("");D(Se,`Creating RPC '${e}' stream ${s}: ${f}`,u);const m=o.createWebChannel(f,u);this.I_(m);let g=!1,R=!1;const V=new yv({Yo:C=>{R?D(Se,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(g||(D(Se,`Opening RPC '${e}' stream ${s} transport.`),m.open(),g=!0),D(Se,`RPC '${e}' stream ${s} sending:`,C),m.send(C))},Zo:()=>m.close()}),k=(C,O,L)=>{C.listen(O,U=>{try{L(U)}catch(q){setTimeout(()=>{throw q},0)}})};return k(m,Yr.EventType.OPEN,()=>{R||(D(Se,`RPC '${e}' stream ${s} transport opened.`),V.o_())}),k(m,Yr.EventType.CLOSE,()=>{R||(R=!0,D(Se,`RPC '${e}' stream ${s} transport closed`),V.a_(),this.E_(m))}),k(m,Yr.EventType.ERROR,C=>{R||(R=!0,Pn(Se,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),V.a_(new N(P.UNAVAILABLE,"The operation could not be completed")))}),k(m,Yr.EventType.MESSAGE,C=>{var O;if(!R){const L=C.data[0];j(!!L,16349);const U=L,q=(U==null?void 0:U.error)||((O=U[0])==null?void 0:O.error);if(q){D(Se,`RPC '${e}' stream ${s} received error:`,q);const G=q.status;let Q=function(I){const T=fe[I];if(T!==void 0)return Lp(T)}(G),E=q.message;Q===void 0&&(Q=P.INTERNAL,E="Unknown error status: "+G+" with message "+q.message),R=!0,V.a_(new N(Q,E)),m.close()}else D(Se,`RPC '${e}' stream ${s} received:`,L),V.u_(L)}}),k(c,Lf.STAT_EVENT,C=>{C.stat===Fa.PROXY?D(Se,`RPC '${e}' stream ${s} detected buffering proxy`):C.stat===Fa.NOPROXY&&D(Se,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{V.__()},0),V}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ev(){return typeof window<"u"?window:null}function xi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(r){return new Tw(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="PersistentStream";class _m{constructor(e,t,n,s,i,o,c,u){this.Mi=e,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new gm(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(ke(t.toString()),ke("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.D_===t&&this.G_(n,s)},n=>{e(()=>{const s=new N(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)})})}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{n(()=>this.listener.Xo())}),this.stream.t_(()=>{n(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{n(()=>this.z_(s))}),this.stream.onMessage(s=>{n(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return D(ad,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(D(ad,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Tv extends _m{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Aw(this.serializer,e),n=function(i){if(!("targetChange"in i))return z.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?z.min():o.readTime?Me(o.readTime):z.min()}(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=ec(this.serializer),t.addTarget=function(i,o){let c;const u=o.target;if(c=Hi(u)?{documents:Gp(i,u)}:{query:Kp(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Bp(i,o.resumeToken);const h=Xa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(z.min())>0){c.readTime=yr(i,o.snapshotVersion.toTimestamp());const h=Xa(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const n=Rw(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=ec(this.serializer),t.removeTarget=e,this.q_(t)}}class wv extends _m{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return j(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,j(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){j(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=bw(e.writeResults,e.commitTime),n=Me(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=ec(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>Ji(this.serializer,n))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{}class Av extends vv{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Go(e,Za(t,n),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(P.UNKNOWN,i.toString())})}Ho(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Ho(e,Za(t,n),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(P.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class bv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ke(t),this.aa=!1):D("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn="RemoteStore";class Rv{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(o=>{n.enqueueAndForget(async()=>{Mn(this)&&(D(Nn,"Restarting streams for network reachability change."),await async function(u){const h=H(u);h.Ea.add(4),await Us(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Do(h)}(this))})}),this.Ra=new bv(n,s)}}async function Do(r){if(Mn(r))for(const e of r.da)await e(!0)}async function Us(r){for(const e of r.da)await e(!1)}function ym(r,e){const t=H(r);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Zc(t)?Xc(t):Rr(t).O_()&&Yc(t,e))}function Jc(r,e){const t=H(r),n=Rr(t);t.Ia.delete(e),n.O_()&&Im(t,e),t.Ia.size===0&&(n.O_()?n.L_():Mn(t)&&t.Ra.set("Unknown"))}function Yc(r,e){if(r.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(z.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Rr(r).Y_(e)}function Im(r,e){r.Va.Ue(e),Rr(r).Z_(e)}function Xc(r){r.Va=new _w({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ia.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),Rr(r).start(),r.Ra.ua()}function Zc(r){return Mn(r)&&!Rr(r).x_()&&r.Ia.size>0}function Mn(r){return H(r).Ea.size===0}function Em(r){r.Va=void 0}async function Sv(r){r.Ra.set("Online")}async function Pv(r){r.Ia.forEach((e,t)=>{Yc(r,e)})}async function Cv(r,e){Em(r),Zc(r)?(r.Ra.ha(e),Xc(r)):r.Ra.set("Unknown")}async function Vv(r,e,t){if(r.Ra.set("Online"),e instanceof Up&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ia.delete(c),s.Va.removeTarget(c))}(r,e)}catch(n){D(Nn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await to(r,n)}else if(e instanceof Ci?r.Va.Ze(e):e instanceof Fp?r.Va.st(e):r.Va.tt(e),!t.isEqual(z.min()))try{const n=await pm(r.localStore);t.compareTo(n)>=0&&await function(i,o){const c=i.Va.Tt(o);return c.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,h)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(me.EMPTY_BYTE_STRING,f.snapshotVersion)),Im(i,u);const m=new _t(f.target,u,h,f.sequenceNumber);Yc(i,m)}),i.remoteSyncer.applyRemoteEvent(c)}(r,t)}catch(n){D(Nn,"Failed to raise snapshot:",n),await to(r,n)}}async function to(r,e,t){if(!Zt(e))throw e;r.Ea.add(1),await Us(r),r.Ra.set("Offline"),t||(t=()=>pm(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{D(Nn,"Retrying IndexedDB access"),await t(),r.Ea.delete(1),await Do(r)})}function Tm(r,e){return e().catch(t=>to(r,t,e))}async function Bs(r){const e=H(r),t=Yt(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:yn;for(;xv(e);)try{const s=await dv(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,Dv(e,s)}catch(s){await to(e,s)}wm(e)&&vm(e)}function xv(r){return Mn(r)&&r.Ta.length<10}function Dv(r,e){r.Ta.push(e);const t=Yt(r);t.O_()&&t.X_&&t.ea(e.mutations)}function wm(r){return Mn(r)&&!Yt(r).x_()&&r.Ta.length>0}function vm(r){Yt(r).start()}async function kv(r){Yt(r).ra()}async function Nv(r){const e=Yt(r);for(const t of r.Ta)e.ea(t.mutations)}async function Ov(r,e,t){const n=r.Ta.shift(),s=Uc.from(n,e,t);await Tm(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await Bs(r)}async function Mv(r,e){e&&Yt(r).X_&&await async function(n,s){if(function(o){return pw(o)&&o!==P.ABORTED}(s.code)){const i=n.Ta.shift();Yt(n).B_(),await Tm(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Bs(n)}}(r,e),wm(r)&&vm(r)}async function cd(r,e){const t=H(r);t.asyncQueue.verifyOperationInProgress(),D(Nn,"RemoteStore received new credentials");const n=Mn(t);t.Ea.add(3),await Us(t),n&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Do(t)}async function Lv(r,e){const t=H(r);e?(t.Ea.delete(2),await Do(t)):e||(t.Ea.add(2),await Us(t),t.Ra.set("Unknown"))}function Rr(r){return r.ma||(r.ma=function(t,n,s){const i=H(t);return i.sa(),new Tv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Xo:Sv.bind(null,r),t_:Pv.bind(null,r),r_:Cv.bind(null,r),H_:Vv.bind(null,r)}),r.da.push(async e=>{e?(r.ma.B_(),Zc(r)?Xc(r):r.Ra.set("Unknown")):(await r.ma.stop(),Em(r))})),r.ma}function Yt(r){return r.fa||(r.fa=function(t,n,s){const i=H(t);return i.sa(),new wv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Xo:()=>Promise.resolve(),t_:kv.bind(null,r),r_:Mv.bind(null,r),ta:Nv.bind(null,r),na:Ov.bind(null,r)}),r.da.push(async e=>{e?(r.fa.B_(),await Bs(r)):(await r.fa.stop(),r.Ta.length>0&&(D(Nn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))})),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new it,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,c=new eu(e,t,o,s,i);return c.start(n),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function tu(r,e){if(ke("AsyncQueue",`${e}: ${r}`),Zt(r))return new N(P.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{static emptySet(e){return new nr(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||F.comparator(t.key,n.key):(t,n)=>F.comparator(t.key,n.key),this.keyedMap=Xr(),this.sortedSet=new ae(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof nr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new nr;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(){this.ga=new ae(F.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):B(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class Ir{constructor(e,t,n,s,i,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Ir(e,t,nr.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ao(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fv{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Uv{constructor(){this.queries=ld(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=H(t),i=s.queries;s.queries=ld(),i.forEach((o,c)=>{for(const u of c.Sa)u.onError(n)})})(this,new N(P.ABORTED,"Firestore shutting down"))}}function ld(){return new St(r=>vp(r),Ao)}async function nu(r,e){const t=H(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(n=2):(i=new Fv,n=e.Da()?0:1);try{switch(n){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=tu(o,`Initialization of query '${Qn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&su(t)}async function ru(r,e){const t=H(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function Bv(r,e){const t=H(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(n=!0);o.wa=s}}n&&su(t)}function jv(r,e,t){const n=H(r),s=n.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);n.queries.delete(e)}function su(r){r.Ca.forEach(e=>{e.next()})}var ac,hd;(hd=ac||(ac={})).Ma="default",hd.Cache="cache";class iu{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new Ir(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Ir.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==ac.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(e){this.key=e}}class bm{constructor(e){this.key=e}}class qv{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=W(),this.mutatedKeys=W(),this.eu=Ap(e),this.tu=new nr(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new ud,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,m)=>{const g=s.get(f),R=Ls(this.query,m)?m:null,V=!!g&&this.mutatedKeys.has(g.key),k=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let C=!1;g&&R?g.data.isEqual(R.data)?V!==k&&(n.track({type:3,doc:R}),C=!0):this.su(g,R)||(n.track({type:2,doc:R}),C=!0,(u&&this.eu(R,u)>0||h&&this.eu(R,h)<0)&&(c=!0)):!g&&R?(n.track({type:0,doc:R}),C=!0):g&&!R&&(n.track({type:1,doc:g}),C=!0,(u||h)&&(c=!0)),C&&(R?(o=o.add(R),i=k?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:o,iu:n,Cs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((f,m)=>function(R,V){const k=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B(20277,{Rt:C})}};return k(R)-k(V)}(f.type,m.type)||this.eu(f.doc,m.doc)),this.ou(n),s=s??!1;const c=t&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,h=u!==this.Za;return this.Za=u,o.length!==0||h?{snapshot:new Ir(this.query,e.tu,i,o,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new ud,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=W(),this.tu.forEach(n=>{this.uu(n.key)&&(this.Xa=this.Xa.add(n.key))});const t=[];return e.forEach(n=>{this.Xa.has(n)||t.push(new bm(n))}),this.Xa.forEach(n=>{e.has(n)||t.push(new Am(n))}),t}cu(e){this.Ya=e.Qs,this.Xa=W();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Ir.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const ou="SyncEngine";class zv{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class $v{constructor(e){this.key=e,this.hu=!1}}class Gv{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new St(c=>vp(c),Ao),this.Iu=new Map,this.Eu=new Set,this.du=new ae(F.comparator),this.Au=new Map,this.Ru=new Gc,this.Vu={},this.mu=new Map,this.fu=kn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Kv(r,e,t=!0){const n=xm(r);let s;const i=n.Tu.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Rm(n,e,t,!0),s}async function Hv(r,e){const t=xm(r);await Rm(t,e,!0,!1)}async function Rm(r,e,t,n){const s=await fv(r.localStore,He(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let c;return n&&(c=await Wv(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&ym(r.remoteStore,s),c}async function Wv(r,e,t,n,s){r.pu=(m,g,R)=>async function(k,C,O,L){let U=C.view.ru(O);U.Cs&&(U=await rd(k.localStore,C.query,!1).then(({documents:E})=>C.view.ru(E,U)));const q=L&&L.targetChanges.get(C.targetId),G=L&&L.targetMismatches.get(C.targetId)!=null,Q=C.view.applyChanges(U,k.isPrimaryClient,q,G);return fd(k,C.targetId,Q.au),Q.snapshot}(r,m,g,R);const i=await rd(r.localStore,e,!0),o=new qv(e,i.Qs),c=o.ru(i.documents),u=Fs.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(c,r.isPrimaryClient,u);fd(r,t,h.au);const f=new zv(e,t,o);return r.Tu.set(e,f),r.Iu.has(t)?r.Iu.get(t).push(e):r.Iu.set(t,[e]),h.snapshot}async function Qv(r,e,t){const n=H(r),s=n.Tu.get(e),i=n.Iu.get(s.targetId);if(i.length>1)return n.Iu.set(s.targetId,i.filter(o=>!Ao(o,e))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await ic(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),t&&Jc(n.remoteStore,s.targetId),cc(n,s.targetId)}).catch(On)):(cc(n,s.targetId),await ic(n.localStore,s.targetId,!0))}async function Jv(r,e){const t=H(r),n=t.Tu.get(e),s=t.Iu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Jc(t.remoteStore,n.targetId))}async function Yv(r,e,t){const n=Dm(r);try{const s=await function(o,c){const u=H(o),h=te.now(),f=c.reduce((R,V)=>R.add(V.key),W());let m,g;return u.persistence.runTransaction("Locally write mutations","readwrite",R=>{let V=ze(),k=W();return u.Ns.getEntries(R,f).next(C=>{V=C,V.forEach((O,L)=>{L.isValidDocument()||(k=k.add(O))})}).next(()=>u.localDocuments.getOverlayedDocuments(R,V)).next(C=>{m=C;const O=[];for(const L of c){const U=dw(L,m.get(L.key).overlayedDocument);U!=null&&O.push(new Pt(L.key,U,pp(U.value.mapValue),Ne.exists(!0)))}return u.mutationQueue.addMutationBatch(R,h,O,c)}).next(C=>{g=C;const O=C.applyToLocalDocumentSet(m,k);return u.documentOverlayCache.saveOverlays(R,C.batchId,O)})}).then(()=>({batchId:g.batchId,changes:Rp(m)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),function(o,c,u){let h=o.Vu[o.currentUser.toKey()];h||(h=new ae(K)),h=h.insert(c,u),o.Vu[o.currentUser.toKey()]=h}(n,s.batchId,t),await js(n,s.changes),await Bs(n.remoteStore)}catch(s){const i=tu(s,"Failed to persist write");t.reject(i)}}async function Sm(r,e){const t=H(r);try{const n=await lv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Au.get(i);o&&(j(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?j(o.hu,14607):s.removedDocuments.size>0&&(j(o.hu,42227),o.hu=!1))}),await js(t,n,e)}catch(n){await On(n)}}function dd(r,e,t){const n=H(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const u=H(o);u.onlineState=c;let h=!1;u.queries.forEach((f,m)=>{for(const g of m.Sa)g.va(c)&&(h=!0)}),h&&su(u)}(n.eventManager,e),s.length&&n.Pu.H_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function Xv(r,e,t){const n=H(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),i=s&&s.key;if(i){let o=new ae(F.comparator);o=o.insert(i,le.newNoDocument(i,z.min()));const c=W().add(i),u=new So(z.min(),new Map,new ae(K),o,c);await Sm(n,u),n.du=n.du.remove(i),n.Au.delete(e),au(n)}else await ic(n.localStore,e,!1).then(()=>cc(n,e,t)).catch(On)}async function Zv(r,e){const t=H(r),n=e.batch.batchId;try{const s=await uv(t.localStore,e);Cm(t,n,null),Pm(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await js(t,s)}catch(s){await On(s)}}async function eA(r,e,t){const n=H(r);try{const s=await function(o,c){const u=H(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next(m=>(j(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(n.localStore,e);Cm(n,e,t),Pm(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await js(n,s)}catch(s){await On(s)}}function Pm(r,e){(r.mu.get(e)||[]).forEach(t=>{t.resolve()}),r.mu.delete(e)}function Cm(r,e,t){const n=H(r);let s=n.Vu[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.Vu[n.currentUser.toKey()]=s}}function cc(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Iu.get(e))r.Tu.delete(n),t&&r.Pu.yu(n,t);r.Iu.delete(e),r.isPrimaryClient&&r.Ru.jr(e).forEach(n=>{r.Ru.containsKey(n)||Vm(r,n)})}function Vm(r,e){r.Eu.delete(e.path.canonicalString());const t=r.du.get(e);t!==null&&(Jc(r.remoteStore,t),r.du=r.du.remove(e),r.Au.delete(t),au(r))}function fd(r,e,t){for(const n of t)n instanceof Am?(r.Ru.addReference(n.key,e),tA(r,n)):n instanceof bm?(D(ou,"Document no longer in limbo: "+n.key),r.Ru.removeReference(n.key,e),r.Ru.containsKey(n.key)||Vm(r,n.key)):B(19791,{wu:n})}function tA(r,e){const t=e.key,n=t.path.canonicalString();r.du.get(t)||r.Eu.has(n)||(D(ou,"New document in limbo: "+t),r.Eu.add(n),au(r))}function au(r){for(;r.Eu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const e=r.Eu.values().next().value;r.Eu.delete(e);const t=new F(ee.fromString(e)),n=r.fu.next();r.Au.set(n,new $v(t)),r.du=r.du.insert(t,n),ym(r.remoteStore,new _t(He(Ms(t.path)),n,"TargetPurposeLimboResolution",Ke.ce))}}async function js(r,e,t){const n=H(r),s=[],i=[],o=[];n.Tu.isEmpty()||(n.Tu.forEach((c,u)=>{o.push(n.pu(u,e,t).then(h=>{var f;if((h||t)&&n.isPrimaryClient){const m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){s.push(h);const m=Wc.As(u.targetId,h);i.push(m)}}))}),await Promise.all(o),n.Pu.H_(s),await async function(u,h){const f=H(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>v.forEach(h,g=>v.forEach(g.Es,R=>f.persistence.referenceDelegate.addReference(m,g.targetId,R)).next(()=>v.forEach(g.ds,R=>f.persistence.referenceDelegate.removeReference(m,g.targetId,R)))))}catch(m){if(!Zt(m))throw m;D(Qc,"Failed to update sequence numbers: "+m)}for(const m of h){const g=m.targetId;if(!m.fromCache){const R=f.Ms.get(g),V=R.snapshotVersion,k=R.withLastLimboFreeSnapshotVersion(V);f.Ms=f.Ms.insert(g,k)}}}(n.localStore,i))}async function nA(r,e){const t=H(r);if(!t.currentUser.isEqual(e)){D(ou,"User change. New user:",e.toKey());const n=await fm(t.localStore,e);t.currentUser=e,function(i,o){i.mu.forEach(c=>{c.forEach(u=>{u.reject(new N(P.CANCELLED,o))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await js(t,n.Ls)}}function rA(r,e){const t=H(r),n=t.Au.get(e);if(n&&n.hu)return W().add(n.key);{let s=W();const i=t.Iu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}function xm(r){const e=H(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Sm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=rA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Xv.bind(null,e),e.Pu.H_=Bv.bind(null,e.eventManager),e.Pu.yu=jv.bind(null,e.eventManager),e}function Dm(r){const e=H(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Zv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=eA.bind(null,e),e}class Rs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=xo(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return dm(this.persistence,new hm,e.initialUser,this.serializer)}Cu(e){return new Kc(Vo.mi,this.serializer)}Du(e){return new mm}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Rs.provider={build:()=>new Rs};class sA extends Rs{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){j(this.persistence.referenceDelegate instanceof eo,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new om(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Pe.withCacheSize(this.cacheSizeBytes):Pe.DEFAULT;return new Kc(n=>eo.mi(n,t),this.serializer)}}class iA extends Rs{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Dm(this.xu.syncEngine),await Bs(this.xu.remoteStore),await this.persistence.Ji(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return dm(this.persistence,new hm,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new om(n,e.asyncQueue,t)}Mu(e,t){const n=new hT(t,this.persistence);return new lT(e.asyncQueue,n)}Cu(e){const t=iv(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Pe.withCacheSize(this.cacheSizeBytes):Pe.DEFAULT;return new Hc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Ev(),xi(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new mm}}class no{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>dd(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=nA.bind(null,this.syncEngine),await Lv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Uv}()}createDatastore(e){const t=xo(e.databaseInfo.databaseId),n=function(i){return new Iv(i)}(e.databaseInfo);return function(i,o,c,u){return new Av(i,o,c,u)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,s,i,o,c){return new Rv(n,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>dd(this.syncEngine,t,0),function(){return od.v()?new od:new mv}())}createSyncEngine(e,t){return function(s,i,o,c,u,h,f){const m=new Gv(s,i,o,c,u,h);return f&&(m.gu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=H(s);D(Nn,"RemoteStore shutting down."),i.Ea.add(5),await Us(i),i.Aa.shutdown(),i.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}no.provider={build:()=>new no};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ke("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt="FirestoreClient";class oA{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=Te.UNAUTHENTICATED,this.clientId=bc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async o=>{D(Xt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(D(Xt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new it;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=tu(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Sa(r,e){r.asyncQueue.verifyOperationInProgress(),D(Xt,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await fm(e.localStore,s),n=s)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function pd(r,e){r.asyncQueue.verifyOperationInProgress();const t=await aA(r);D(Xt,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>cd(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>cd(e.remoteStore,s)),r._onlineComponents=e}async function aA(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){D(Xt,"Using user provided OfflineComponentProvider");try{await Sa(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Pn("Error using user provided cache. Falling back to memory cache: "+t),await Sa(r,new Rs)}}else D(Xt,"Using default OfflineComponentProvider"),await Sa(r,new sA(void 0));return r._offlineComponents}async function km(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(D(Xt,"Using user provided OnlineComponentProvider"),await pd(r,r._uninitializedComponentsProvider._online)):(D(Xt,"Using default OnlineComponentProvider"),await pd(r,new no))),r._onlineComponents}function cA(r){return km(r).then(e=>e.syncEngine)}async function ro(r){const e=await km(r),t=e.eventManager;return t.onListen=Kv.bind(null,e.syncEngine),t.onUnlisten=Qv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Hv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Jv.bind(null,e.syncEngine),t}function uA(r,e,t={}){const n=new it;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,h){const f=new cu({next:g=>{f.Nu(),o.enqueueAndForget(()=>ru(i,m));const R=g.docs.has(c);!R&&g.fromCache?h.reject(new N(P.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&g.fromCache&&u&&u.source==="server"?h.reject(new N(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new iu(Ms(c.path),f,{includeMetadataChanges:!0,qa:!0});return nu(i,m)}(await ro(r),r.asyncQueue,e,t,n)),n.promise}function lA(r,e,t={}){const n=new it;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,h){const f=new cu({next:g=>{f.Nu(),o.enqueueAndForget(()=>ru(i,m)),g.fromCache&&u.source==="server"?h.reject(new N(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new iu(c,f,{includeMetadataChanges:!0,qa:!0});return nu(i,m)}(await ro(r),r.asyncQueue,e,t,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nm(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Om="firestore.googleapis.com",gd=!0;class _d{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Om,this.ssl=gd}else this.host=e.host,this.ssl=e.ssl??gd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=nm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<qw)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}oT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Nm(e.experimentalLongPollingOptions??{}),function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ko{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new _d({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new _d(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new JE;switch(n.type){case"firstParty":return new eT(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=md.get(t);n&&(D("ComponentProvider","Removing Datastore"),md.delete(t),n.terminate())}(this),Promise.resolve()}}function hA(r,e,t,n={}){var h;r=Fe(r,ko);const s=Er(e),i=r._getSettings(),o={...i,emulatorOptions:r._getEmulatorOptions()},c=`${e}:${t}`;s&&(jd(`https://${c}`),qd("Firestore",!0)),i.host!==Om&&i.host!==c&&Pn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:n};if(!vn(u,o)&&(r._setSettings(u),n.mockUserToken)){let f,m;if(typeof n.mockUserToken=="string")f=n.mockUserToken,m=Te.MOCK_USER;else{f=i_(n.mockUserToken,(h=r._app)==null?void 0:h.options.projectId);const g=n.mockUserToken.sub||n.mockUserToken.user_id;if(!g)throw new N(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new Te(g)}r._authCredentials=new YE(new jf(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new tn(this.firestore,e,this._query)}}class he{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new he(this.firestore,e,this._key)}toJSON(){return{type:he._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(ks(t,he._jsonSchema))return new he(e,n||null,new F(ee.fromString(t.referencePath)))}}he._jsonSchemaVersion="firestore/documentReference/1.0",he._jsonSchema={type:pe("string",he._jsonSchemaVersion),referencePath:pe("string")};class Wt extends tn{constructor(e,t,n){super(e,t,Ms(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new he(this.firestore,null,new F(e))}withConverter(e){return new Wt(this.firestore,e,this._path)}}function uu(r,e,...t){if(r=de(r),zf("collection","path",e),r instanceof ko){const n=ee.fromString(e,...t);return ah(n),new Wt(r,null,n)}{if(!(r instanceof he||r instanceof Wt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(ee.fromString(e,...t));return ah(n),new Wt(r.firestore,null,n)}}function qt(r,e,...t){if(r=de(r),arguments.length===1&&(e=bc.newId()),zf("doc","path",e),r instanceof ko){const n=ee.fromString(e,...t);return oh(n),new he(r,null,new F(n))}{if(!(r instanceof he||r instanceof Wt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(ee.fromString(e,...t));return oh(n),new he(r.firestore,r instanceof Wt?r.converter:null,new F(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd="AsyncQueue";class Id{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new gm(this,"async_queue_retry"),this._c=()=>{const n=xi();n&&D(yd,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=xi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=xi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new it;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Zt(e))throw e;D(yd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(n=>{throw this.nc=n,this.rc=!1,ke("INTERNAL UNHANDLED ERROR: ",Ed(n)),n}).then(n=>(this.rc=!1,n))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=eu.createAndSchedule(this,e,t,n,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&B(47125,{Pc:Ed(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Ed(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Td(r){return function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1}(r,["next","error","complete"])}class vt extends ko{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Id,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Id(e),this._firestoreClient=void 0,await e}}}function dA(r,e){const t=typeof r=="object"?r:Jd(),n=typeof r=="string"?r:Ki,s=fc(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=r_("firestore");i&&hA(s,...i)}return s}function No(r){if(r._terminated)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Mm(r),r._firestoreClient}function Mm(r){var n,s,i;const e=r._freezeSettings(),t=function(c,u,h,f){return new BT(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Nm(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,e);r._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new oA(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(r._componentsProvider))}function fA(r,e){Pn("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return pA(r,no.provider,{build:n=>new iA(n,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}function pA(r,e,t){if((r=Fe(r,vt))._firestoreClient||r._terminated)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new N(P.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},Mm(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ge(me.fromBase64String(e))}catch(t){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ge(me.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ge._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ks(e,Ge._jsonSchema))return Ge.fromBase64String(e.bytes)}}Ge._jsonSchemaVersion="firestore/bytes/1.0",Ge._jsonSchema={type:pe("string",Ge._jsonSchemaVersion),bytes:pe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ce(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ot._jsonSchemaVersion}}static fromJSON(e){if(ks(e,ot._jsonSchema))return new ot(e.latitude,e.longitude)}}ot._jsonSchemaVersion="firestore/geoPoint/1.0",ot._jsonSchema={type:pe("string",ot._jsonSchemaVersion),latitude:pe("number"),longitude:pe("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:at._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ks(e,at._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new at(e.vectorValues);throw new N(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}at._jsonSchemaVersion="firestore/vectorValue/1.0",at._jsonSchema={type:pe("string",at._jsonSchemaVersion),vectorValues:pe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mA=/^__.*__$/;class gA{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new Pt(e,this.data,this.fieldMask,t,this.fieldTransforms):new br(e,this.data,t,this.fieldTransforms)}}class Lm{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Pt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Fm(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{Ac:r})}}class lu{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new lu({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.Vc({path:t,fc:!1});return n.gc(e),n}yc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.Vc({path:t,fc:!1});return n.Rc(),n}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return so(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Fm(this.Ac)&&mA.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class _A{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||xo(e)}Cc(e,t,n,s=!1){return new lu({Ac:e,methodName:t,Dc:n,path:ce.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Lo(r){const e=r._freezeSettings(),t=xo(r._databaseId);return new _A(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Um(r,e,t,n,s,i={}){const o=r.Cc(i.merge||i.mergeFields?2:0,e,t,s);du("Data must be an object, but it was:",o,n);const c=Bm(n,o);let u,h;if(i.merge)u=new Le(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const g=uc(e,m,t);if(!o.contains(g))throw new N(P.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);qm(f,g)||f.push(g)}u=new Le(f),h=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=o.fieldTransforms;return new gA(new Ce(c),u,h)}class Fo extends Mo{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Fo}}class hu extends Mo{_toFieldTransform(e){return new kp(e.path,new mr)}isEqual(e){return e instanceof hu}}function yA(r,e,t,n){const s=r.Cc(1,e,t);du("Data must be an object, but it was:",s,n);const i=[],o=Ce.empty();en(n,(u,h)=>{const f=fu(e,u,t);h=de(h);const m=s.yc(f);if(h instanceof Fo)i.push(f);else{const g=qs(h,m);g!=null&&(i.push(f),o.set(f,g))}});const c=new Le(i);return new Lm(o,c,s.fieldTransforms)}function IA(r,e,t,n,s,i){const o=r.Cc(1,e,t),c=[uc(e,n,t)],u=[s];if(i.length%2!=0)throw new N(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(uc(e,i[g])),u.push(i[g+1]);const h=[],f=Ce.empty();for(let g=c.length-1;g>=0;--g)if(!qm(h,c[g])){const R=c[g];let V=u[g];V=de(V);const k=o.yc(R);if(V instanceof Fo)h.push(R);else{const C=qs(V,k);C!=null&&(h.push(R),f.set(R,C))}}const m=new Le(h);return new Lm(f,m,o.fieldTransforms)}function EA(r,e,t,n=!1){return qs(t,r.Cc(n?4:3,e))}function qs(r,e){if(jm(r=de(r)))return du("Unsupported field value:",e,r),Bm(r,e);if(r instanceof Mo)return function(n,s){if(!Fm(s.Ac))throw s.Sc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(n,s){const i=[];let o=0;for(const c of n){let u=qs(c,s.wc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(r,e)}return function(n,s){if((n=de(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return ow(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=te.fromDate(n);return{timestampValue:yr(s.serializer,i)}}if(n instanceof te){const i=new te(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:yr(s.serializer,i)}}if(n instanceof ot)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ge)return{bytesValue:Bp(s.serializer,n._byteString)};if(n instanceof he){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:qc(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof at)return function(o,c){return{mapValue:{fields:{[kc]:{stringValue:Nc},[hr]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return Mc(c.serializer,h)})}}}}}}(n,s);throw s.Sc(`Unsupported field value: ${go(n)}`)}(r,e)}function Bm(r,e){const t={};return ip(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):en(r,(n,s)=>{const i=qs(s,e.mc(n));i!=null&&(t[n]=i)}),{mapValue:{fields:t}}}function jm(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof te||r instanceof ot||r instanceof Ge||r instanceof he||r instanceof Mo||r instanceof at)}function du(r,e,t){if(!jm(t)||!$f(t)){const n=go(t);throw n==="an object"?e.Sc(r+" a custom object"):e.Sc(r+" "+n)}}function uc(r,e,t){if((e=de(e))instanceof Oo)return e._internalPath;if(typeof e=="string")return fu(r,e);throw so("Field path arguments must be of type string or ",r,!1,void 0,t)}const TA=new RegExp("[~\\*/\\[\\]]");function fu(r,e,t){if(e.search(TA)>=0)throw so(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Oo(...e.split("."))._internalPath}catch{throw so(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function so(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${n}`),o&&(u+=` in document ${s}`),u+=")"),new N(P.INVALID_ARGUMENT,c+r+u)}function qm(r,e){return r.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new he(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new wA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Uo("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class wA extends zm{data(){return super.data()}}function Uo(r,e){return typeof e=="string"?fu(r,e):e instanceof Oo?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $m(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new N(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class pu{}class Gm extends pu{}function mu(r,e,...t){let n=[];e instanceof pu&&n.push(e),n=n.concat(t),function(i){const o=i.filter(u=>u instanceof gu).length,c=i.filter(u=>u instanceof Bo).length;if(o>1||o>0&&c>0)throw new N(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class Bo extends Gm{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Bo(e,t,n)}_apply(e){const t=this._parse(e);return Km(e._query,t),new tn(e.firestore,e.converter,Ja(e._query,t))}_parse(e){const t=Lo(e.firestore);return function(i,o,c,u,h,f,m){let g;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new N(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){vd(m,f);const V=[];for(const k of m)V.push(wd(u,i,k));g={arrayValue:{values:V}}}else g=wd(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||vd(m,f),g=EA(c,o,m,f==="in"||f==="not-in");return Y.create(h,f,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function io(r,e,t){const n=e,s=Uo("where",r);return Bo._create(s,n,t)}class gu extends pu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new gu(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:ne.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)Km(o,u),o=Ja(o,u)}(e._query,t),new tn(e.firestore,e.converter,Ja(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class _u extends Gm{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new _u(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new As(i,o)}(e._query,this._field,this._direction);return new tn(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Ar(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function yu(r,e="asc"){const t=e,n=Uo("orderBy",r);return _u._create(n,t)}function wd(r,e,t){if(typeof(t=de(t))=="string"){if(t==="")throw new N(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!wp(e)&&t.indexOf("/")!==-1)throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(ee.fromString(t));if(!F.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return ws(r,new F(n))}if(t instanceof he)return ws(r,t._key);throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${go(t)}.`)}function vd(r,e){if(!Array.isArray(r)||r.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Km(r,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class vA{convertValue(e,t="none"){switch(Qt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(wt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return en(e,(s,i)=>{n[s]=this.convertValue(i,t)}),n}convertVectorValue(e){var n,s,i;const t=(i=(s=(n=e.fields)==null?void 0:n[hr].arrayValue)==null?void 0:s.values)==null?void 0:i.map(o=>oe(o.doubleValue));return new at(t)}convertGeoPoint(e){return new ot(oe(e.latitude),oe(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=wo(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Es(e));default:return null}}convertTimestamp(e){const t=Tt(e);return new te(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ee.fromString(e);j(Jp(n),9688,{name:e});const s=new Cn(n.get(1),n.get(3)),i=new F(n.popFirst(5));return s.isEqual(t)||ke(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hm(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class ts{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Tn extends zm{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Di(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Uo("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Tn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Tn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Tn._jsonSchema={type:pe("string",Tn._jsonSchemaVersion),bundleSource:pe("string","DocumentSnapshot"),bundleName:pe("string"),bundle:pe("string")};class Di extends Tn{data(e={}){return super.data(e)}}class wn{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ts(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Di(this._firestore,this._userDataWriter,n.key,n,new ts(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const u=new Di(s._firestore,s._userDataWriter,c.doc.key,c.doc,new ts(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new Di(s._firestore,s._userDataWriter,c.doc.key,c.doc,new ts(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:AA(c.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=wn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=bc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function AA(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(r){r=Fe(r,he);const e=Fe(r.firestore,vt);return uA(No(e),r._key).then(t=>Jm(e,r,t))}wn._jsonSchemaVersion="firestore/querySnapshot/1.0",wn._jsonSchema={type:pe("string",wn._jsonSchemaVersion),bundleSource:pe("string","QuerySnapshot"),bundleName:pe("string"),bundle:pe("string")};class Iu extends vA{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ge(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new he(this.firestore,null,t)}}function bA(r){r=Fe(r,tn);const e=Fe(r.firestore,vt),t=No(e),n=new Iu(e);return $m(r._query),lA(t,r._query).then(s=>new wn(e,n,r,s))}function Wm(r,e,t){r=Fe(r,he);const n=Fe(r.firestore,vt),s=Hm(r.converter,e,t);return Eu(n,[Um(Lo(n),"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,Ne.none())])}function lc(r,e,t,...n){r=Fe(r,he);const s=Fe(r.firestore,vt),i=Lo(s);let o;return o=typeof(e=de(e))=="string"||e instanceof Oo?IA(i,"updateDoc",r._key,e,t,n):yA(i,"updateDoc",r._key,e),Eu(s,[o.toMutation(r._key,Ne.exists(!0))])}function YA(r,e){const t=Fe(r.firestore,vt),n=qt(r),s=Hm(r.converter,e);return Eu(t,[Um(Lo(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,Ne.exists(!1))]).then(()=>n)}function Qm(r,...e){var u,h,f;r=de(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||Td(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Td(e[n])){const m=e[n];e[n]=(u=m.next)==null?void 0:u.bind(m),e[n+1]=(h=m.error)==null?void 0:h.bind(m),e[n+2]=(f=m.complete)==null?void 0:f.bind(m)}let i,o,c;if(r instanceof he)o=Fe(r.firestore,vt),c=Ms(r._key.path),i={next:m=>{e[n]&&e[n](Jm(o,r,m))},error:e[n+1],complete:e[n+2]};else{const m=Fe(r,tn);o=Fe(m.firestore,vt),c=m._query;const g=new Iu(o);i={next:R=>{e[n]&&e[n](new wn(o,g,m,R))},error:e[n+1],complete:e[n+2]},$m(r._query)}return function(g,R,V,k){const C=new cu(k),O=new iu(R,C,V);return g.asyncQueue.enqueueAndForget(async()=>nu(await ro(g),O)),()=>{C.Nu(),g.asyncQueue.enqueueAndForget(async()=>ru(await ro(g),O))}}(No(o),c,s,i)}function Eu(r,e){return function(n,s){const i=new it;return n.asyncQueue.enqueueAndForget(async()=>Yv(await cA(n),s,i)),i.promise}(No(r),e)}function Jm(r,e,t){const n=t.docs.get(e._key),s=new Iu(r);return new Tn(r,s,e._key,n,new ts(t.hasPendingWrites,t.fromCache),e.converter)}function Tu(){return new hu("serverTimestamp")}(function(e,t=!0){(function(s){vr=s})(Tr),sr(new An("firestore",(n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),c=new vt(new XE(n.getProvider("auth-internal")),new tT(o,n.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Cn(h.options.projectId,f)}(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Gt(nh,rh,e),Gt(nh,rh,"esm2020")})();const RA={apiKey:"AIzaSyBwff9ZSIOE8hF3c0-kKxX7zyj8MpO0C6E",authDomain:"transportapp-dfd34.firebaseapp.com",projectId:"transportapp-dfd34",storageBucket:"transportapp-dfd34.appspot.com",messagingSenderId:"81243763076",appId:"1:81243763076:web:7e0e3baca62282b0476dd1",measurementId:"G-HQ0VQ56HPB"},Ym=Qd(RA),Lt=KE(Ym),SA=async()=>{try{await NI(Lt,Af),await fA(Xe,{forceOwnership:!0}),console.log("Firestore persistence enabled")}catch(r){r.code==="failed-precondition"?console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time."):r.code==="unimplemented"&&console.warn("The current browser does not support all of the features required to enable persistence"),console.error("Persistence error:",r)}},Xe=dA(Ym),Xm=new pt;Xm.setCustomParameters({prompt:"select_account",login_hint:"user@example.com"});const Zm=new ft;Zm.setCustomParameters({display:"popup",auth_type:"reauthenticate"});uu(Xe,"users");const jo=uu(Xe,"trips");uu(Xe,"bookings");const PA=1e3;let bd=0;const qo=()=>{const r=Date.now();if(r-bd<PA)throw new Error("Rate limit exceeded. Please try again later.");bd=r},cn=async(r,e,t=!0)=>{try{qo();const n=qt(Xe,"users",r),s=Tu(),i={...e,updatedAt:s,...!e.createdAt&&{createdAt:s}};return await Wm(n,i,{merge:t}),{id:r,...i}}catch(n){throw console.error("Error updating user:",n),n}},XA=async r=>{try{qo();const e=qt(jo),t=Tu(),n={...r,status:"searching",createdAt:t,updatedAt:t};return await Wm(e,n),{id:e.id,...n}}catch(e){throw console.error("Error creating trip:",e),e}},ZA=(r,e,t=[])=>{try{const n=mu(jo,io("status","==",r),yu("createdAt","desc"));return Qm(n,s=>{const i=s.docs.map(o=>{const c=o.data();return t.length>0?{id:o.id,...t.reduce((u,h)=>(c[h]!==void 0&&(u[h]=c[h]),u),{})}:{id:o.id,...c}});e(i)})}catch(n){throw console.error("Error subscribing to trips:",n),n}},e0=async(r,e,t={})=>{try{qo();const n=qt(Xe,"trips",r),s={status:e,updatedAt:Tu(),...t};return await lc(n,s),{id:r,...s}}catch(n){throw console.error("Error updating trip status:",n),n}},t0=async(r,e=!1)=>{try{qo();const t=e?"==":"!=",n=mu(jo,io("driverId","==",r),io("status",t,"completed"),yu("createdAt","desc"));return(await bA(n)).docs.map(o=>({id:o.id,...o.data()}))}catch(t){throw console.error("Error getting user trips:",t),t}},n0=(r,e)=>{try{const t=mu(jo,io("driverId","==",r),yu("createdAt","desc"));return Qm(t,n=>{const s=n.docs.map(i=>({id:i.id,...i.data()}));e(s)})}catch(t){throw console.error("Error subscribing to trip updates:",t),t}},eg=Be.createContext();function zo(){return Be.useContext(eg)}function CA({children:r}){const[e,t]=Be.useState(null),[n,s]=Be.useState(!0),[i,o]=Be.useState(null),c=Be.useCallback(async(C,O,L,U="passenger")=>{try{s(!0),o(null);const q=await VI(Lt,C,O),{user:G}=q;return await kI(G,{displayName:L,photoURL:G.photoURL||""}),await cn(G.uid,{email:G.email,displayName:L,role:U,photoURL:G.photoURL||"",provider:"email",createdAt:new Date().toISOString()}),q}catch(q){console.error("Error al registrar usuario:",q);let G="Error al registrar el usuario";switch(q.code){case"auth/email-already-in-use":G="El correo electrónico ya está en uso";break;case"auth/invalid-email":G="El correo electrónico no es válido";break;case"auth/weak-password":G="La contraseña es demasiado débil";break;case"auth/operation-not-allowed":G="La operación no está permitida";break;default:G=q.message||G}throw o(G),new Error(G)}finally{s(!1)}},[]),u=Be.useCallback(async(C,O)=>{var L;try{s(!0),o(null);const U=await xI(Lt,C,O);return(L=U==null?void 0:U.user)!=null&&L.uid&&await lc(qt(Xe,"users",U.user.uid),{lastLogin:new Date().toISOString()}),U}catch(U){console.error("Error al iniciar sesión:",U);let q="Error al iniciar sesión";switch(U.code){case"auth/user-not-found":case"auth/wrong-password":q="Correo o contraseña incorrectos";break;case"auth/too-many-requests":q="Demasiados intentos fallidos. Por favor, inténtalo más tarde";break;case"auth/user-disabled":q="Esta cuenta ha sido deshabilitada";break;default:q=U.message||q}throw o(q),new Error(q)}finally{s(!1)}},[]),h=Be.useCallback(async()=>{try{const C=await Hl(Lt,Xm,La),{user:O}=C;return O&&await cn(O.uid,{email:O.email,displayName:O.displayName,photoURL:O.photoURL,role:"passenger",provider:"google.com",lastLogin:new Date().toISOString()}),C}catch(C){console.error("Error al iniciar sesión con Google:",C);let O="Error al iniciar sesión con Google";switch(C.code){case"auth/account-exists-with-different-credential":O="Ya existe una cuenta con el mismo correo pero con otro proveedor";break;case"auth/popup-closed-by-user":O="La ventana de autenticación fue cerrada";break;case"auth/cancelled-popup-request":O="Solicitud de autenticación cancelada";break;case"auth/popup-blocked":O="El navegador bloqueó la ventana emergente. Por favor, permite ventanas emergentes para este sitio";break;default:O=C.message||O}throw new Error(O)}},[cn]),f=Be.useCallback(async()=>{try{const C=await Hl(Lt,Zm,La),{user:O}=C;return O&&await cn(O.uid,{email:O.email,displayName:O.displayName,photoURL:O.photoURL,role:"passenger",provider:"facebook.com",lastLogin:new Date().toISOString()}),C}catch(C){console.error("Error al iniciar sesión con Facebook:",C);let O="Error al iniciar sesión con Facebook";switch(C.code){case"auth/account-exists-with-different-credential":O="Ya existe una cuenta con el mismo correo pero con otro proveedor";break;case"auth/popup-closed-by-user":O="La ventana de autenticación fue cerrada";break;case"auth/cancelled-popup-request":O="Solicitud de autenticación cancelada";break;case"auth/popup-blocked":O="El navegador bloqueó la ventana emergente. Por favor, permite ventanas emergentes para este sitio";break;case"auth/facebook-auth-already-in-use":O="Esta cuenta de Facebook ya está en uso";break;default:O=C.message||O}throw new Error(O)}},[cn]),m=()=>FI(Lt),g=C=>CI(Lt,C),R=Be.useCallback(()=>{o(null)},[]),V=Be.useCallback(async C=>{var U,q;if(!C)return null;const O=3;let L=0;for(;L<O;)try{return(await Ad(qt(Xe,"users",C.uid))).exists()?await lc(qt(Xe,"users",C.uid),{lastLogin:new Date().toISOString()}):await cn(C.uid,{email:C.email,displayName:C.displayName||"Usuario",photoURL:C.photoURL||"",role:"passenger",provider:((q=(U=C.providerData)==null?void 0:U[0])==null?void 0:q.providerId)||"email",lastLogin:new Date().toISOString(),createdAt:new Date().toISOString()}),C}catch(G){if(console.error(`Error en verificación de usuario (intento ${L+1}):`,G),L++,L<O)await new Promise(Q=>setTimeout(Q,1e3*Math.pow(2,L)));else throw console.error("Número máximo de reintentos alcanzado para verificación de usuario"),G}},[cn,Xe]);Be.useEffect(()=>{let C=!0;const O=LI(Lt,async L=>{var U,q,G,Q;try{if(L){await V(L);const E=await Ad(qt(Xe,"users",L.uid));if(E.exists()){const _=E.data();t({uid:L.uid,email:L.email,displayName:L.displayName||_.displayName,photoURL:L.photoURL||_.photoURL,role:_.role||"passenger",provider:((q=(U=L.providerData)==null?void 0:U[0])==null?void 0:q.providerId)||"email"})}else t({uid:L.uid,email:L.email,displayName:L.displayName||"Usuario",photoURL:L.photoURL||"",role:"passenger",provider:((Q=(G=L.providerData)==null?void 0:G[0])==null?void 0:Q.providerId)||"email"})}else t(null)}catch(E){console.error("Error al verificar el estado de autenticación:",E),o("Error al cargar la información del usuario")}finally{C&&s(!1)}});return()=>{C=!1,O()}},[V]);const k={currentUser:e,signup:c,login:u,loginWithGoogle:h,loginWithFacebook:f,logout:m,resetPassword:g,loading:n,error:i,clearError:R};return x.jsx(eg.Provider,{value:k,children:!n&&r})}function Pa({children:r,roles:e=[]}){const{currentUser:t,loading:n}=zo(),s=co();if(n)return x.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),x.jsx("p",{className:"mt-4 text-gray-600",children:"Cargando..."})]})});if(!t)return x.jsx(rr,{to:"/login",state:{from:s},replace:!0});if(e.length>0){const i=t.role||"passenger";if(!e.includes(i))return x.jsx(rr,{to:"/",replace:!0})}return r}var tg={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Rd=Oe.createContext&&Oe.createContext(tg),VA=["attr","size","title"];function xA(r,e){if(r==null)return{};var t=DA(r,e),n,s;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(r);for(s=0;s<i.length;s++)n=i[s],!(e.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(r,n)&&(t[n]=r[n])}return t}function DA(r,e){if(r==null)return{};var t={};for(var n in r)if(Object.prototype.hasOwnProperty.call(r,n)){if(e.indexOf(n)>=0)continue;t[n]=r[n]}return t}function oo(){return oo=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r},oo.apply(this,arguments)}function Sd(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(r,s).enumerable})),t.push.apply(t,n)}return t}function ao(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Sd(Object(t),!0).forEach(function(n){kA(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Sd(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function kA(r,e,t){return e=NA(e),e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function NA(r){var e=OA(r,"string");return typeof e=="symbol"?e:e+""}function OA(r,e){if(typeof r!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var n=t.call(r,e);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function ng(r){return r&&r.map((e,t)=>Oe.createElement(e.tag,ao({key:t},e.attr),ng(e.child)))}function ye(r){return e=>Oe.createElement(MA,oo({attr:ao({},r.attr)},e),ng(r.child))}function MA(r){var e=t=>{var{attr:n,size:s,title:i}=r,o=xA(r,VA),c=s||t.size||"1em",u;return t.className&&(u=t.className),r.className&&(u=(u?u+" ":"")+r.className),Oe.createElement("svg",oo({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,n,o,{className:u,style:ao(ao({color:r.color||t.color},t.style),r.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),i&&Oe.createElement("title",null,i),r.children)};return Rd!==void 0?Oe.createElement(Rd.Consumer,null,t=>e(t)):e(tg)}function r0(r){return ye({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"},child:[]}]})(r)}function s0(r){return ye({attr:{viewBox:"0 0 488 512"},child:[{tag:"path",attr:{d:"M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"},child:[]}]})(r)}function LA(r){return ye({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"},child:[]}]})(r)}function FA(r){return ye({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"},child:[]}]})(r)}function i0(r){return ye({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"},child:[]}]})(r)}function o0(r){return ye({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"},child:[]}]})(r)}function a0(r){return ye({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"},child:[]}]})(r)}function c0(r){return ye({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"},child:[]}]})(r)}function u0(r){return ye({attr:{viewBox:"0 0 384 512"},child:[{tag:"path",attr:{d:"M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"},child:[]}]})(r)}function l0(r){return ye({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M621.16 54.46C582.37 38.19 543.55 32 504.75 32c-123.17-.01-246.33 62.34-369.5 62.34-30.89 0-61.76-3.92-92.65-13.72-3.47-1.1-6.95-1.62-10.35-1.62C15.04 79 0 92.32 0 110.81v317.26c0 12.63 7.23 24.6 18.84 29.46C57.63 473.81 96.45 480 135.25 480c123.17 0 246.34-62.35 369.51-62.35 30.89 0 61.76 3.92 92.65 13.72 3.47 1.1 6.95 1.62 10.35 1.62 17.21 0 32.25-13.32 32.25-31.81V83.93c-.01-12.64-7.24-24.6-18.85-29.47zM48 132.22c20.12 5.04 41.12 7.57 62.72 8.93C104.84 170.54 79 192.69 48 192.69v-60.47zm0 285v-47.78c34.37 0 62.18 27.27 63.71 61.4-22.53-1.81-43.59-6.31-63.71-13.62zM320 352c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 27.78c-17.52-4.39-35.71-6.85-54.32-8.44 5.87-26.08 27.5-45.88 54.32-49.28v57.72zm0-236.11c-30.89-3.91-54.86-29.7-55.81-61.55 19.54 2.17 38.09 6.23 55.81 12.66v48.89z"},child:[]}]})(r)}function h0(r){return ye({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"},child:[]}]})(r)}function d0(r){return ye({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(r)}function f0(r){return ye({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"},child:[]}]})(r)}function Pd(r){return ye({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"},child:[]}]})(r)}function p0(r){return ye({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"},child:[]}]})(r)}function m0(r){return ye({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"},child:[]}]})(r)}function g0(r){return ye({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M622.3 271.1l-115.2-45c-4.1-1.6-12.6-3.7-22.2 0l-115.2 45c-10.7 4.2-17.7 14-17.7 24.9 0 111.6 68.7 188.8 132.9 213.9 9.6 3.7 18 1.6 22.2 0C558.4 489.9 640 420.5 640 296c0-10.9-7-20.7-17.7-24.9zM496 462.4V273.3l95.5 37.3c-5.6 87.1-60.9 135.4-95.5 151.8zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm96 40c0-2.5.8-4.8 1.1-7.2-2.5-.1-4.9-.8-7.5-.8h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c6.8 0 13.3-1.5 19.2-4-54-42.9-99.2-116.7-99.2-212z"},child:[]}]})(r)}function _0(r){return ye({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"},child:[]}]})(r)}function Cd(r){return ye({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"},child:[]}]})(r)}function UA(){const{currentUser:r,logout:e}=zo(),[t,n]=Oe.useState(!1),s=Ug(),i=async()=>{try{await e(),s("/")}catch(o){console.error("Error al cerrar sesión:",o)}};return x.jsxs("nav",{className:"bg-white shadow-lg",children:[x.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:x.jsxs("div",{className:"flex justify-between h-16",children:[x.jsxs("div",{className:"flex items-center",children:[x.jsxs(Je,{to:"/",className:"flex-shrink-0 flex items-center",children:[x.jsx(FA,{className:"h-8 w-8 text-blue-600"}),x.jsx("span",{className:"ml-2 text-xl font-bold text-gray-900",children:"TransportApp"})]}),x.jsxs("div",{className:"hidden md:ml-6 md:flex md:space-x-8",children:[x.jsx(Je,{to:"/",className:"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",children:"Inicio"}),r&&x.jsx(Je,{to:r.role==="driver"?"/driver":"/passenger",className:"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",children:r.role==="driver"?"Mis Viajes":"Buscar Viaje"})]})]}),x.jsx("div",{className:"hidden md:ml-6 md:flex md:items-center",children:r?x.jsx("div",{className:"ml-3 relative",children:x.jsxs("div",{className:"flex items-center space-x-4",children:[x.jsxs("span",{className:"text-sm text-gray-700",children:["Hola, ",r.displayName||r.email]}),x.jsxs("div",{className:"relative group",children:[x.jsx("button",{className:"flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",onClick:()=>n(!t),children:x.jsx("div",{className:"h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700",children:x.jsx(Cd,{className:"h-5 w-5"})})}),t&&x.jsxs("div",{className:"origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50",children:[x.jsx(Je,{to:"/profile",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",onClick:()=>n(!1),children:"Mi perfil"}),x.jsxs("button",{onClick:i,className:"w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center",children:[x.jsx(Pd,{className:"mr-2"}),"Cerrar sesión"]})]})]})]})}):x.jsxs("div",{className:"flex items-center space-x-4",children:[x.jsx(Je,{to:"/login",className:"text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium",state:{from:window.location.pathname},children:"Iniciar sesión"}),x.jsx(Je,{to:"/login",className:"bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700",state:{from:window.location.pathname,register:!0},children:"Registrarse"})]})}),x.jsx("div",{className:"-mr-2 flex items-center md:hidden",children:x.jsxs("button",{onClick:()=>n(!t),className:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",children:[x.jsx("span",{className:"sr-only",children:"Abrir menú principal"}),x.jsx(LA,{className:"block h-6 w-6"})]})})]})}),t&&x.jsxs("div",{className:"md:hidden",children:[x.jsxs("div",{className:"pt-2 pb-3 space-y-1",children:[x.jsx(Je,{to:"/",className:"border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium",onClick:()=>n(!1),children:"Inicio"}),r&&x.jsx(Je,{to:r.role==="driver"?"/driver":"/passenger",className:"border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium",onClick:()=>n(!1),children:r.role==="driver"?"Mis Viajes":"Buscar Viaje"})]}),x.jsxs("div",{className:"pt-4 pb-3 border-t border-gray-200",children:[r?x.jsxs("div",{className:"flex items-center px-4",children:[x.jsx("div",{className:"flex-shrink-0",children:x.jsx("div",{className:"h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700",children:x.jsx(Cd,{className:"h-6 w-6"})})}),x.jsxs("div",{className:"ml-3",children:[x.jsx("div",{className:"text-base font-medium text-gray-800",children:r.displayName||r.email}),x.jsx("div",{className:"text-sm font-medium text-gray-500",children:r.role==="driver"?"Conductor":"Pasajero"})]})]}):x.jsxs("div",{className:"space-y-2 px-4",children:[x.jsx(Je,{to:"/login",className:"w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700",state:{from:window.location.pathname},onClick:()=>n(!1),children:"Iniciar sesión"}),x.jsxs("p",{className:"text-center text-sm text-gray-500",children:["¿No tienes cuenta?"," ",x.jsx(Je,{to:"/login",className:"font-medium text-blue-600 hover:text-blue-500",state:{from:window.location.pathname,register:!0},onClick:()=>n(!1),children:"Regístrate"})]})]}),r&&x.jsxs("div",{className:"mt-3 space-y-1",children:[x.jsx(Je,{to:"/profile",className:"block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100",onClick:()=>n(!1),children:"Mi perfil"}),x.jsxs("button",{onClick:()=>{i(),n(!1)},className:"w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 flex items-center",children:[x.jsx(Pd,{className:"mr-2"}),"Cerrar sesión"]})]})]})]})]})}SA();const BA=Oe.lazy(()=>uo(()=>import("./Login.BzWQQNDN.js"),__vite__mapDeps([0,1]))),jA=Oe.lazy(()=>uo(()=>import("./LandingPage.BxPHagQL.js"),__vite__mapDeps([2,1]))),qA=Oe.lazy(()=>uo(()=>import("./Passenger.pE0G83dv.js"),__vite__mapDeps([3,1,4,5]))),zA=Oe.lazy(()=>uo(()=>import("./Driver.DCKqs_Ge.js"),__vite__mapDeps([6,1,4,5]))),$A=()=>x.jsx("div",{className:"min-h-screen flex items-center justify-center",children:x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),x.jsx("p",{className:"mt-4 text-gray-600",children:"Cargando..."})]})}),GA=()=>{const{pathname:r}=co();return Oe.useEffect(()=>{window.scrollTo(0,0)},[r]),null},KA=()=>{var n;const{currentUser:r}=zo(),e=co();if((n=e.state)!=null&&n.from)return x.jsx(rr,{to:e.state.from,replace:!0});const t=(r==null?void 0:r.role)==="driver"?"/driver":"/passenger";return x.jsx(rr,{to:t,replace:!0})};function gi({children:r}){return x.jsxs("div",{className:"min-h-screen flex flex-col",children:[x.jsx(UA,{}),x.jsx("main",{className:"flex-grow",children:r}),x.jsx("footer",{className:"bg-gray-800 text-white py-6",children:x.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:x.jsx("div",{className:"text-center",children:x.jsxs("p",{children:["© ",new Date().getFullYear()," TransportApp. Todos los derechos reservados."]})})})})]})}function HA({children:r}){var n,s;const{currentUser:e}=zo(),t=co();if(e){const i=((s=(n=t.state)==null?void 0:n.from)==null?void 0:s.pathname)||(e.role==="driver"?"/driver":"/passenger");return x.jsx(rr,{to:i,state:{from:t},replace:!0})}return r}function WA(){return x.jsxs(Bg,{basename:"/",children:[x.jsx(GA,{}),x.jsx(Oe.Suspense,{fallback:x.jsx($A,{}),children:x.jsxs(jg,{children:[x.jsx(jn,{path:"/",element:x.jsx(gi,{children:x.jsx(jA,{})})}),x.jsx(jn,{path:"/login",element:x.jsx(HA,{children:x.jsx(BA,{})})}),x.jsx(jn,{path:"/passenger/*",element:x.jsx(Pa,{children:x.jsx(gi,{children:x.jsx(qA,{})})})}),x.jsx(jn,{path:"/driver/*",element:x.jsx(Pa,{roles:["driver"],children:x.jsx(gi,{children:x.jsx(zA,{})})})}),x.jsx(jn,{path:"/app",element:x.jsx(Pa,{children:x.jsx(KA,{})})}),x.jsx(jn,{path:"*",element:x.jsx(gi,{children:x.jsx(rr,{to:"/",replace:!0})})})]})})]})}const Vd=document.getElementById("root");Vd&&kd(Vd).render(x.jsx(Oe.StrictMode,{children:x.jsx(CA,{children:x.jsx(WA,{})})}));export{ZA as A,n0 as B,h0 as C,i0 as D,t0 as E,p0 as F,XA as G,e0 as H,s0 as a,r0 as b,Cd as c,a0 as d,c0 as e,_0 as f,g0 as g,qt as h,Xe as i,x as j,lc as k,d0 as l,FA as m,l0 as n,f0 as o,yu as p,mu as q,uu as r,Qm as s,u0 as t,zo as u,m0 as v,io as w,o0 as x,YA as y,Tu as z};

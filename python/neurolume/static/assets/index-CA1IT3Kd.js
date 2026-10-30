const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/notes-BKaGThLj.js","assets/notes-BJmosK-V.css"])))=>i.map(i=>d[i]);
var qu=Object.defineProperty;var Yu=(n,t,e)=>t in n?qu(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var ae=(n,t,e)=>Yu(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ia="170",$u=0,Ia=1,Zu=2,Sc=1,Ku=2,sn=3,wn=0,Ae=1,an=2,cn=0,un=1,pi=2,Ua=3,Na=4,Ju=5,Bn=100,ju=101,Qu=102,th=103,eh=104,nh=200,ih=201,rh=202,sh=203,ro=204,so=205,oh=206,ah=207,lh=208,ch=209,uh=210,hh=211,fh=212,dh=213,ph=214,oo=0,ao=1,lo=2,mi=3,co=4,uo=5,ho=6,fo=7,yc=0,mh=1,gh=2,bn=0,Ec=1,Tc=2,bc=3,Ac=4,_h=5,wc=6,Cc=7,Rc=300,gi=301,_i=302,po=303,mo=304,os=306,go=1e3,Hn=1001,_o=1002,Se=1003,vh=1004,ur=1005,$e=1006,_s=1007,Gn=1008,dn=1009,Pc=1010,Lc=1011,Ki=1012,ra=1013,Wn=1014,Ze=1015,hn=1016,sa=1017,oa=1018,vi=1020,Dc=35902,Ic=1021,Uc=1022,Ue=1023,Nc=1024,Fc=1025,fi=1026,xi=1027,aa=1028,la=1029,Oc=1030,ca=1031,ua=1033,Vr=33776,kr=33777,Wr=33778,Xr=33779,vo=35840,xo=35841,Mo=35842,So=35843,yo=36196,Eo=37492,To=37496,bo=37808,Ao=37809,wo=37810,Co=37811,Ro=37812,Po=37813,Lo=37814,Do=37815,Io=37816,Uo=37817,No=37818,Fo=37819,Oo=37820,Bo=37821,qr=36492,zo=36494,Ho=36495,Bc=36283,Go=36284,Vo=36285,ko=36286,xh=3200,Mh=3201,Sh=0,yh=1,Tn="",be="srgb",bi="srgb-linear",as="linear",$t="srgb",Yn=7680,Fa=519,Eh=512,Th=513,bh=514,zc=515,Ah=516,wh=517,Ch=518,Rh=519,Oa=35044,Ba="300 es",ln=2e3,Jr=2001;class Ai{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vs=Math.PI/180,Wo=180/Math.PI;function wi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ge[n&255]+ge[n>>8&255]+ge[n>>16&255]+ge[n>>24&255]+"-"+ge[t&255]+ge[t>>8&255]+"-"+ge[t>>16&15|64]+ge[t>>24&255]+"-"+ge[e&63|128]+ge[e>>8&255]+"-"+ge[e>>16&255]+ge[e>>24&255]+ge[i&255]+ge[i>>8&255]+ge[i>>16&255]+ge[i>>24&255]).toLowerCase()}function ve(n,t,e){return Math.max(t,Math.min(e,n))}function Ph(n,t){return(n%t+t)%t}function xs(n,t,e){return(1-e)*n+e*t}function Ni(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Te(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class pt{constructor(t=0,e=0){pt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ve(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Dt{constructor(t,e,i,r,s,o,a,l,c){Dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=r,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],_=r[0],p=r[3],m=r[6],A=r[1],v=r[4],x=r[7],D=r[2],T=r[5],b=r[8];return s[0]=o*_+a*A+l*D,s[3]=o*p+a*v+l*T,s[6]=o*m+a*x+l*b,s[1]=c*_+h*A+u*D,s[4]=c*p+h*v+u*T,s[7]=c*m+h*x+u*b,s[2]=f*_+d*A+g*D,s[5]=f*p+d*v+g*T,s[8]=f*m+d*x+g*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*s,d=c*s-o*l,g=e*u+i*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(r*c-h*i)*_,t[2]=(a*i-r*o)*_,t[3]=f*_,t[4]=(h*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ms.makeScale(t,e)),this}rotate(t){return this.premultiply(Ms.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ms.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ms=new Dt;function Hc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function jr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Lh(){const n=jr("canvas");return n.style.display="block",n}const za={};function Wi(n){n in za||(za[n]=!0,console.warn(n))}function Dh(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function Ih(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Uh(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ht={enabled:!0,workingColorSpace:bi,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===$t&&(n.r=fn(n.r),n.g=fn(n.g),n.b=fn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===$t&&(n.r=di(n.r),n.g=di(n.g),n.b=di(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Tn?as:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function fn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function di(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Ha=[.64,.33,.3,.6,.15,.06],Ga=[.2126,.7152,.0722],Va=[.3127,.329],ka=new Dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wa=new Dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ht.define({[bi]:{primaries:Ha,whitePoint:Va,transfer:as,toXYZ:ka,fromXYZ:Wa,luminanceCoefficients:Ga,workingColorSpaceConfig:{unpackColorSpace:be},outputColorSpaceConfig:{drawingBufferColorSpace:be}},[be]:{primaries:Ha,whitePoint:Va,transfer:$t,toXYZ:ka,fromXYZ:Wa,luminanceCoefficients:Ga,outputColorSpaceConfig:{drawingBufferColorSpace:be}}});let $n;class Nh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{$n===void 0&&($n=jr("canvas")),$n.width=t.width,$n.height=t.height;const i=$n.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=$n}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=jr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=fn(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(fn(e[i]/255)*255):e[i]=fn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Fh=0;class Gc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=wi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ss(r[o].image)):s.push(Ss(r[o]))}else s=Ss(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function Ss(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Nh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Oh=0;class pe extends Ai{constructor(t=pe.DEFAULT_IMAGE,e=pe.DEFAULT_MAPPING,i=Hn,r=Hn,s=$e,o=Gn,a=Ue,l=dn,c=pe.DEFAULT_ANISOTROPY,h=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Oh++}),this.uuid=wi(),this.name="",this.source=new Gc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new pt(0,0),this.repeat=new pt(1,1),this.center=new pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case go:t.x=t.x-Math.floor(t.x);break;case Hn:t.x=t.x<0?0:1;break;case _o:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case go:t.y=t.y-Math.floor(t.y);break;case Hn:t.y=t.y<0?0:1;break;case _o:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}pe.DEFAULT_IMAGE=null;pe.DEFAULT_MAPPING=Rc;pe.DEFAULT_ANISOTROPY=1;class le{constructor(t=0,e=0,i=0,r=1){le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,x=(d+1)/2,D=(m+1)/2,T=(h+f)/4,b=(u+_)/4,R=(g+p)/4;return v>x&&v>D?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=T/i,s=b/i):x>D?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=T/r,s=R/r):D<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),i=b/s,r=R/s),this.set(i,r,s,e),this}let A=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(A)<.001&&(A=1),this.x=(p-g)/A,this.y=(u-_)/A,this.z=(f-h)/A,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bh extends Ai{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new pe(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Gc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class We extends Bh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Vc extends pe{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Se,this.minFilter=Se,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class zh extends pe{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Se,this.minFilter=Se,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==g){let p=1-a;const m=l*f+c*d+h*g+u*_,A=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const D=Math.sqrt(v),T=Math.atan2(D,m*A);p=Math.sin(p*T)/D,a=Math.sin(a*T)/D}const x=a*A;if(l=l*p+f*x,c=c*p+d*x,h=h*p+g*x,u=u*p+_*x,p===1-a){const D=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=D,c*=D,h*=D,u*=D}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-a*d,t[e+2]=c*g+h*d+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),f=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ve(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,i=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),h=2*(a*e-s*r),u=2*(s*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ys.copy(this).projectOnVector(t),this.sub(ys)}reflect(t){return this.sub(ys.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ve(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ys=new P,Xa=new rr;class Cn{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ze.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ze.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ze.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ze):ze.fromBufferAttribute(s,o),ze.applyMatrix4(t.matrixWorld),this.expandByPoint(ze);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),hr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),hr.copy(i.boundingBox)),hr.applyMatrix4(t.matrixWorld),this.union(hr)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ze),ze.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Fi),fr.subVectors(this.max,Fi),Zn.subVectors(t.a,Fi),Kn.subVectors(t.b,Fi),Jn.subVectors(t.c,Fi),vn.subVectors(Kn,Zn),xn.subVectors(Jn,Kn),Pn.subVectors(Zn,Jn);let e=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Pn.z,Pn.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Pn.z,0,-Pn.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Pn.y,Pn.x,0];return!Es(e,Zn,Kn,Jn,fr)||(e=[1,0,0,0,1,0,0,0,1],!Es(e,Zn,Kn,Jn,fr))?!1:(dr.crossVectors(vn,xn),e=[dr.x,dr.y,dr.z],Es(e,Zn,Kn,Jn,fr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ze).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ze).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Qe[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Qe[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Qe[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Qe[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Qe[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Qe[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Qe[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Qe[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Qe),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Qe=[new P,new P,new P,new P,new P,new P,new P,new P],ze=new P,hr=new Cn,Zn=new P,Kn=new P,Jn=new P,vn=new P,xn=new P,Pn=new P,Fi=new P,fr=new P,dr=new P,Ln=new P;function Es(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ln.fromArray(n,s);const a=r.x*Math.abs(Ln.x)+r.y*Math.abs(Ln.y)+r.z*Math.abs(Ln.z),l=t.dot(Ln),c=e.dot(Ln),h=i.dot(Ln);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Hh=new Cn,Oi=new P,Ts=new P;class Ci{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Hh.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Oi.subVectors(t,this.center);const e=Oi.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Oi,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ts.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Oi.copy(t.center).add(Ts)),this.expandByPoint(Oi.copy(t.center).sub(Ts))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const tn=new P,bs=new P,pr=new P,Mn=new P,As=new P,mr=new P,ws=new P;class ha{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(tn.copy(this.origin).addScaledVector(this.direction,e),tn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){bs.copy(t).add(e).multiplyScalar(.5),pr.copy(e).sub(t).normalize(),Mn.copy(this.origin).sub(bs);const s=t.distanceTo(e)*.5,o=-this.direction.dot(pr),a=Mn.dot(this.direction),l=-Mn.dot(pr),c=Mn.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=s*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(bs).addScaledVector(pr,f),d}intersectSphere(t,e){tn.subVectors(t.center,this.origin);const i=tn.dot(this.direction),r=tn.dot(tn)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),h>=0?(s=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(s=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,tn)!==null}intersectTriangle(t,e,i,r,s){As.subVectors(e,t),mr.subVectors(i,t),ws.crossVectors(As,mr);let o=this.direction.dot(ws),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Mn.subVectors(this.origin,t);const l=a*this.direction.dot(mr.crossVectors(Mn,mr));if(l<0)return null;const c=a*this.direction.dot(As.cross(Mn));if(c<0||l+c>o)return null;const h=-a*Mn.dot(ws);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wt{constructor(t,e,i,r,s,o,a,l,c,h,u,f,d,g,_,p){Wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,h,u,f,d,g,_,p)}set(t,e,i,r,s,o,a,l,c,h,u,f,d,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/jn.setFromMatrixColumn(t,0).length(),s=1/jn.setFromMatrixColumn(t,1).length(),o=1/jn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Gh,t,Vh)}lookAt(t,e,i){const r=this.elements;return Ce.subVectors(t,e),Ce.lengthSq()===0&&(Ce.z=1),Ce.normalize(),Sn.crossVectors(i,Ce),Sn.lengthSq()===0&&(Math.abs(i.z)===1?Ce.x+=1e-4:Ce.z+=1e-4,Ce.normalize(),Sn.crossVectors(i,Ce)),Sn.normalize(),gr.crossVectors(Ce,Sn),r[0]=Sn.x,r[4]=gr.x,r[8]=Ce.x,r[1]=Sn.y,r[5]=gr.y,r[9]=Ce.y,r[2]=Sn.z,r[6]=gr.z,r[10]=Ce.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],_=i[6],p=i[10],m=i[14],A=i[3],v=i[7],x=i[11],D=i[15],T=r[0],b=r[4],R=r[8],y=r[12],S=r[1],C=r[5],z=r[9],O=r[13],X=r[2],K=r[6],$=r[10],Q=r[14],k=r[3],ot=r[7],F=r[11],q=r[15];return s[0]=o*T+a*S+l*X+c*k,s[4]=o*b+a*C+l*K+c*ot,s[8]=o*R+a*z+l*$+c*F,s[12]=o*y+a*O+l*Q+c*q,s[1]=h*T+u*S+f*X+d*k,s[5]=h*b+u*C+f*K+d*ot,s[9]=h*R+u*z+f*$+d*F,s[13]=h*y+u*O+f*Q+d*q,s[2]=g*T+_*S+p*X+m*k,s[6]=g*b+_*C+p*K+m*ot,s[10]=g*R+_*z+p*$+m*F,s[14]=g*y+_*O+p*Q+m*q,s[3]=A*T+v*S+x*X+D*k,s[7]=A*b+v*C+x*K+D*ot,s[11]=A*R+v*z+x*$+D*F,s[15]=A*y+v*O+x*Q+D*q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+s*l*u-r*c*u-s*a*f+i*c*f+r*a*d-i*l*d)+_*(+e*l*d-e*c*f+s*o*f-r*o*d+r*c*h-s*l*h)+p*(+e*c*u-e*a*d-s*o*u+i*o*d+s*a*h-i*c*h)+m*(-r*a*h-e*l*u+e*a*f+r*o*u-i*o*f+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],p=t[14],m=t[15],A=u*p*c-_*f*c+_*l*d-a*p*d-u*l*m+a*f*m,v=g*f*c-h*p*c-g*l*d+o*p*d+h*l*m-o*f*m,x=h*_*c-g*u*c+g*a*d-o*_*d-h*a*m+o*u*m,D=g*u*l-h*_*l-g*a*f+o*_*f+h*a*p-o*u*p,T=e*A+i*v+r*x+s*D;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/T;return t[0]=A*b,t[1]=(_*f*s-u*p*s-_*r*d+i*p*d+u*r*m-i*f*m)*b,t[2]=(a*p*s-_*l*s+_*r*c-i*p*c-a*r*m+i*l*m)*b,t[3]=(u*l*s-a*f*s-u*r*c+i*f*c+a*r*d-i*l*d)*b,t[4]=v*b,t[5]=(h*p*s-g*f*s+g*r*d-e*p*d-h*r*m+e*f*m)*b,t[6]=(g*l*s-o*p*s-g*r*c+e*p*c+o*r*m-e*l*m)*b,t[7]=(o*f*s-h*l*s+h*r*c-e*f*c-o*r*d+e*l*d)*b,t[8]=x*b,t[9]=(g*u*s-h*_*s-g*i*d+e*_*d+h*i*m-e*u*m)*b,t[10]=(o*_*s-g*a*s+g*i*c-e*_*c-o*i*m+e*a*m)*b,t[11]=(h*a*s-o*u*s-h*i*c+e*u*c+o*i*d-e*a*d)*b,t[12]=D*b,t[13]=(h*_*r-g*u*r+g*i*f-e*_*f-h*i*p+e*u*p)*b,t[14]=(g*a*r-o*_*r-g*i*l+e*_*l+o*i*p-e*a*p)*b,t[15]=(o*u*r-h*a*r+h*i*l-e*u*l-o*i*f+e*a*f)*b,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,f=s*c,d=s*h,g=s*u,_=o*h,p=o*u,m=a*u,A=l*c,v=l*h,x=l*u,D=i.x,T=i.y,b=i.z;return r[0]=(1-(_+m))*D,r[1]=(d+x)*D,r[2]=(g-v)*D,r[3]=0,r[4]=(d-x)*T,r[5]=(1-(f+m))*T,r[6]=(p+A)*T,r[7]=0,r[8]=(g+v)*b,r[9]=(p-A)*b,r[10]=(1-(f+_))*b,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=jn.set(r[0],r[1],r[2]).length();const o=jn.set(r[4],r[5],r[6]).length(),a=jn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],He.copy(this);const c=1/s,h=1/o,u=1/a;return He.elements[0]*=c,He.elements[1]*=c,He.elements[2]*=c,He.elements[4]*=h,He.elements[5]*=h,He.elements[6]*=h,He.elements[8]*=u,He.elements[9]*=u,He.elements[10]*=u,e.setFromRotationMatrix(He),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=ln){const l=this.elements,c=2*s/(e-t),h=2*s/(i-r),u=(e+t)/(e-t),f=(i+r)/(i-r);let d,g;if(a===ln)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Jr)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=ln){const l=this.elements,c=1/(e-t),h=1/(i-r),u=1/(o-s),f=(e+t)*c,d=(i+r)*h;let g,_;if(a===ln)g=(o+s)*u,_=-2*u;else if(a===Jr)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const jn=new P,He=new Wt,Gh=new P(0,0,0),Vh=new P(1,1,1),Sn=new P,gr=new P,Ce=new P,qa=new Wt,Ya=new rr;class pn{constructor(t=0,e=0,i=0,r=pn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],f=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ve(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return qa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qa,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ya.setFromEuler(this),this.setFromQuaternion(Ya,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pn.DEFAULT_ORDER="XYZ";class fa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let kh=0;const $a=new P,Qn=new rr,en=new Wt,_r=new P,Bi=new P,Wh=new P,Xh=new rr,Za=new P(1,0,0),Ka=new P(0,1,0),Ja=new P(0,0,1),ja={type:"added"},qh={type:"removed"},ti={type:"childadded",child:null},Cs={type:"childremoved",child:null};class ye extends Ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ye.DEFAULT_UP.clone();const t=new P,e=new pn,i=new rr,r=new P(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Wt},normalMatrix:{value:new Dt}}),this.matrix=new Wt,this.matrixWorld=new Wt,this.matrixAutoUpdate=ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qn.setFromAxisAngle(t,e),this.quaternion.multiply(Qn),this}rotateOnWorldAxis(t,e){return Qn.setFromAxisAngle(t,e),this.quaternion.premultiply(Qn),this}rotateX(t){return this.rotateOnAxis(Za,t)}rotateY(t){return this.rotateOnAxis(Ka,t)}rotateZ(t){return this.rotateOnAxis(Ja,t)}translateOnAxis(t,e){return $a.copy(t).applyQuaternion(this.quaternion),this.position.add($a.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Za,t)}translateY(t){return this.translateOnAxis(Ka,t)}translateZ(t){return this.translateOnAxis(Ja,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(en.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?_r.copy(t):_r.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?en.lookAt(Bi,_r,this.up):en.lookAt(_r,Bi,this.up),this.quaternion.setFromRotationMatrix(en),r&&(en.extractRotation(r.matrixWorld),Qn.setFromRotationMatrix(en),this.quaternion.premultiply(Qn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ja),ti.child=t,this.dispatchEvent(ti),ti.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qh),Cs.child=t,this.dispatchEvent(Cs),Cs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),en.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),en.multiply(t.parent.matrixWorld)),t.applyMatrix4(en),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ja),ti.child=t,this.dispatchEvent(ti),ti.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,t,Wh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,Xh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}ye.DEFAULT_UP=new P(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ge=new P,nn=new P,Rs=new P,rn=new P,ei=new P,ni=new P,Qa=new P,Ps=new P,Ls=new P,Ds=new P,Is=new le,Us=new le,Ns=new le;class ke{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Ge.subVectors(t,e),r.cross(Ge);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Ge.subVectors(r,e),nn.subVectors(i,e),Rs.subVectors(t,e);const o=Ge.dot(Ge),a=Ge.dot(nn),l=Ge.dot(Rs),c=nn.dot(nn),h=nn.dot(Rs),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,rn)===null?!1:rn.x>=0&&rn.y>=0&&rn.x+rn.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,rn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,rn.x),l.addScaledVector(o,rn.y),l.addScaledVector(a,rn.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return Is.setScalar(0),Us.setScalar(0),Ns.setScalar(0),Is.fromBufferAttribute(t,e),Us.fromBufferAttribute(t,i),Ns.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(Is,s.x),o.addScaledVector(Us,s.y),o.addScaledVector(Ns,s.z),o}static isFrontFacing(t,e,i,r){return Ge.subVectors(i,e),nn.subVectors(t,e),Ge.cross(nn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ge.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),Ge.cross(nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ke.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ke.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return ke.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return ke.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ke.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;ei.subVectors(r,i),ni.subVectors(s,i),Ps.subVectors(t,i);const l=ei.dot(Ps),c=ni.dot(Ps);if(l<=0&&c<=0)return e.copy(i);Ls.subVectors(t,r);const h=ei.dot(Ls),u=ni.dot(Ls);if(h>=0&&u<=h)return e.copy(r);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(ei,o);Ds.subVectors(t,s);const d=ei.dot(Ds),g=ni.dot(Ds);if(g>=0&&d<=g)return e.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(ni,a);const p=h*g-d*u;if(p<=0&&u-h>=0&&d-g>=0)return Qa.subVectors(s,r),a=(u-h)/(u-h+(d-g)),e.copy(r).addScaledVector(Qa,a);const m=1/(p+_+f);return o=_*m,a=f*m,e.copy(i).addScaledVector(ei,o).addScaledVector(ni,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yn={h:0,s:0,l:0},vr={h:0,s:0,l:0};function Fs(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ft{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ht.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=Ht.workingColorSpace){return this.r=t,this.g=e,this.b=i,Ht.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=Ht.workingColorSpace){if(t=Ph(t,1),e=ve(e,0,1),i=ve(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=Fs(o,s,t+1/3),this.g=Fs(o,s,t),this.b=Fs(o,s,t-1/3)}return Ht.toWorkingColorSpace(this,r),this}setStyle(t,e=be){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=be){const i=kc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fn(t.r),this.g=fn(t.g),this.b=fn(t.b),this}copyLinearToSRGB(t){return this.r=di(t.r),this.g=di(t.g),this.b=di(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=be){return Ht.fromWorkingColorSpace(_e.copy(this),t),Math.round(ve(_e.r*255,0,255))*65536+Math.round(ve(_e.g*255,0,255))*256+Math.round(ve(_e.b*255,0,255))}getHexString(t=be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Ht.workingColorSpace){Ht.fromWorkingColorSpace(_e.copy(this),e);const i=_e.r,r=_e.g,s=_e.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Ht.workingColorSpace){return Ht.fromWorkingColorSpace(_e.copy(this),e),t.r=_e.r,t.g=_e.g,t.b=_e.b,t}getStyle(t=be){Ht.fromWorkingColorSpace(_e.copy(this),t);const e=_e.r,i=_e.g,r=_e.b;return t!==be?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(yn),this.setHSL(yn.h+t,yn.s+e,yn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(yn),t.getHSL(vr);const i=xs(yn.h,vr.h,e),r=xs(yn.s,vr.s,e),s=xs(yn.l,vr.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _e=new Ft;Ft.NAMES=kc;let Yh=0;class sr extends Ai{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=wi(),this.name="",this.blending=un,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ro,this.blendDst=so,this.blendEquation=Bn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yn,this.stencilZFail=Yn,this.stencilZPass=Yn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==un&&(i.blending=this.blending),this.side!==wn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ro&&(i.blendSrc=this.blendSrc),this.blendDst!==so&&(i.blendDst=this.blendDst),this.blendEquation!==Bn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==mi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fa&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Yn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Yn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Pe extends sr{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ce=new P,xr=new pt;class Xe{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Oa,this.updateRanges=[],this.gpuType=Ze,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)xr.fromBufferAttribute(this,e),xr.applyMatrix3(t),this.setXY(e,xr.x,xr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyMatrix3(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyMatrix4(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyNormalMatrix(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.transformDirection(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ni(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Te(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ni(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ni(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ni(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ni(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array),r=Te(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array),r=Te(r,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Oa&&(t.usage=this.usage),t}}class Wc extends Xe{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Xc extends Xe{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Zt extends Xe{constructor(t,e,i){super(new Float32Array(t),e,i)}}let $h=0;const Ie=new Wt,Os=new ye,ii=new P,Re=new Cn,zi=new Cn,de=new P;class se extends Ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Hc(t)?Xc:Wc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Dt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ie.makeRotationFromQuaternion(t),this.applyMatrix4(Ie),this}rotateX(t){return Ie.makeRotationX(t),this.applyMatrix4(Ie),this}rotateY(t){return Ie.makeRotationY(t),this.applyMatrix4(Ie),this}rotateZ(t){return Ie.makeRotationZ(t),this.applyMatrix4(Ie),this}translate(t,e,i){return Ie.makeTranslation(t,e,i),this.applyMatrix4(Ie),this}scale(t,e,i){return Ie.makeScale(t,e,i),this.applyMatrix4(Ie),this}lookAt(t){return Os.lookAt(t),Os.updateMatrix(),this.applyMatrix4(Os.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ii).negate(),this.translate(ii.x,ii.y,ii.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(i,3))}else{for(let i=0,r=e.count;i<r;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];Re.setFromBufferAttribute(s),this.morphTargetsRelative?(de.addVectors(this.boundingBox.min,Re.min),this.boundingBox.expandByPoint(de),de.addVectors(this.boundingBox.max,Re.max),this.boundingBox.expandByPoint(de)):(this.boundingBox.expandByPoint(Re.min),this.boundingBox.expandByPoint(Re.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ci);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const i=this.boundingSphere.center;if(Re.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];zi.setFromBufferAttribute(a),this.morphTargetsRelative?(de.addVectors(Re.min,zi.min),Re.expandByPoint(de),de.addVectors(Re.max,zi.max),Re.expandByPoint(de)):(Re.expandByPoint(zi.min),Re.expandByPoint(zi.max))}Re.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)de.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(de));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)de.fromBufferAttribute(a,c),l&&(ii.fromBufferAttribute(t,c),de.add(ii)),r=Math.max(r,i.distanceToSquared(de))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xe(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new P,l[R]=new P;const c=new P,h=new P,u=new P,f=new pt,d=new pt,g=new pt,_=new P,p=new P;function m(R,y,S){c.fromBufferAttribute(i,R),h.fromBufferAttribute(i,y),u.fromBufferAttribute(i,S),f.fromBufferAttribute(s,R),d.fromBufferAttribute(s,y),g.fromBufferAttribute(s,S),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(C),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(C),a[R].add(_),a[y].add(_),a[S].add(_),l[R].add(p),l[y].add(p),l[S].add(p))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let R=0,y=A.length;R<y;++R){const S=A[R],C=S.start,z=S.count;for(let O=C,X=C+z;O<X;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const v=new P,x=new P,D=new P,T=new P;function b(R){D.fromBufferAttribute(r,R),T.copy(D);const y=a[R];v.copy(y),v.sub(D.multiplyScalar(D.dot(y))).normalize(),x.crossVectors(T,y);const C=x.dot(l[R])<0?-1:1;o.setXYZW(R,v.x,v.y,v.z,C)}for(let R=0,y=A.length;R<y;++R){const S=A[R],C=S.start,z=S.count;for(let O=C,X=C+z;O<X;O+=3)b(t.getX(O+0)),b(t.getX(O+1)),b(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const r=new P,s=new P,o=new P,a=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)de.fromBufferAttribute(t,e),de.normalize(),t.setXYZ(e,de.x,de.y,de.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let m=0;m<h;m++)f[g++]=c[d++]}return new Xe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new se,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(r[l]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tl=new Wt,Dn=new ha,Mr=new Ci,el=new P,Sr=new P,yr=new P,Er=new P,Bs=new P,Tr=new P,nl=new P,br=new P;class ue extends ye{constructor(t=new se,e=new Pe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Tr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(Bs.fromBufferAttribute(u,t),o?Tr.addScaledVector(Bs,h):Tr.addScaledVector(Bs.sub(e),h))}e.add(Tr)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Mr.copy(i.boundingSphere),Mr.applyMatrix4(s),Dn.copy(t.ray).recast(t.near),!(Mr.containsPoint(Dn.origin)===!1&&(Dn.intersectSphere(Mr,el)===null||Dn.origin.distanceToSquared(el)>(t.far-t.near)**2))&&(tl.copy(s).invert(),Dn.copy(t.ray).applyMatrix4(tl),!(i.boundingBox!==null&&Dn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Dn)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=o[p.materialIndex],A=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let x=A,D=v;x<D;x+=3){const T=a.getX(x),b=a.getX(x+1),R=a.getX(x+2);r=Ar(this,m,t,i,c,h,u,T,b,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const A=a.getX(p),v=a.getX(p+1),x=a.getX(p+2);r=Ar(this,o,t,i,c,h,u,A,v,x),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=o[p.materialIndex],A=Math.max(p.start,d.start),v=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let x=A,D=v;x<D;x+=3){const T=x,b=x+1,R=x+2;r=Ar(this,m,t,i,c,h,u,T,b,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const A=p,v=p+1,x=p+2;r=Ar(this,o,t,i,c,h,u,A,v,x),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}}}function Zh(n,t,e,i,r,s,o,a){let l;if(t.side===Ae?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===wn,a),l===null)return null;br.copy(a),br.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(br);return c<e.near||c>e.far?null:{distance:c,point:br.clone(),object:n}}function Ar(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,Sr),n.getVertexPosition(l,yr),n.getVertexPosition(c,Er);const h=Zh(n,t,e,i,Sr,yr,Er,nl);if(h){const u=new P;ke.getBarycoord(nl,Sr,yr,Er,u),r&&(h.uv=ke.getInterpolatedAttribute(r,a,l,c,u,new pt)),s&&(h.uv1=ke.getInterpolatedAttribute(s,a,l,c,u,new pt)),o&&(h.normal=ke.getInterpolatedAttribute(o,a,l,c,u,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new P,materialIndex:0};ke.getNormal(Sr,yr,Er,f.normal),h.face=f,h.barycoord=u}return h}class or extends se{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,r,o,2),g("x","z","y",1,-1,t,i,-e,r,o,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(u,2));function g(_,p,m,A,v,x,D,T,b,R,y){const S=x/b,C=D/R,z=x/2,O=D/2,X=T/2,K=b+1,$=R+1;let Q=0,k=0;const ot=new P;for(let F=0;F<$;F++){const q=F*C-O;for(let et=0;et<K;et++){const ct=et*S-z;ot[_]=ct*A,ot[p]=q*v,ot[m]=X,c.push(ot.x,ot.y,ot.z),ot[_]=0,ot[p]=0,ot[m]=T>0?1:-1,h.push(ot.x,ot.y,ot.z),u.push(et/b),u.push(1-F/R),Q+=1}}for(let F=0;F<R;F++)for(let q=0;q<b;q++){const et=f+q+K*F,ct=f+q+K*(F+1),H=f+(q+1)+K*(F+1),Y=f+(q+1)+K*F;l.push(et,ct,Y),l.push(ct,H,Y),k+=6}a.addGroup(d,k,y),d+=k,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new or(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Mi(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function xe(n){const t={};for(let e=0;e<n.length;e++){const i=Mi(n[e]);for(const r in i)t[r]=i[r]}return t}function Kh(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function qc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ht.workingColorSpace}const Ji={clone:Mi,merge:xe};var Jh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Me extends sr{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jh,this.fragmentShader=jh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Mi(t.uniforms),this.uniformsGroups=Kh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Yc extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wt,this.projectionMatrix=new Wt,this.projectionMatrixInverse=new Wt,this.coordinateSystem=ln}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new P,il=new pt,rl=new pt;class Ve extends Yc{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Wo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Wo*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(En.x,En.y).multiplyScalar(-t/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(En.x,En.y).multiplyScalar(-t/En.z)}getViewSize(t,e){return this.getViewBounds(t,il,rl),e.subVectors(rl,il)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(vs*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ri=-90,si=1;class Qh extends ye{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ve(ri,si,t,e);r.layers=this.layers,this.add(r);const s=new Ve(ri,si,t,e);s.layers=this.layers,this.add(s);const o=new Ve(ri,si,t,e);o.layers=this.layers,this.add(o);const a=new Ve(ri,si,t,e);a.layers=this.layers,this.add(a);const l=new Ve(ri,si,t,e);l.layers=this.layers,this.add(l);const c=new Ve(ri,si,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===ln)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Jr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class $c extends pe{constructor(t,e,i,r,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:gi,super(t,e,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class tf extends We{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new $c(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:$e}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new or(5,5,5),s=new Me({name:"CubemapFromEquirect",uniforms:Mi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ae,blending:cn});s.uniforms.tEquirect.value=e;const o=new ue(r,s),a=e.minFilter;return e.minFilter===Gn&&(e.minFilter=$e),new Qh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}const zs=new P,ef=new P,nf=new Dt;class Fn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=zs.subVectors(i,e).cross(ef.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(zs),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||nf.getNormalMatrix(t),r=this.coplanarPoint(zs).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const In=new Ci,wr=new P;class Zc{constructor(t=new Fn,e=new Fn,i=new Fn,r=new Fn,s=new Fn,o=new Fn){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ln){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],f=r[7],d=r[8],g=r[9],_=r[10],p=r[11],m=r[12],A=r[13],v=r[14],x=r[15];if(i[0].setComponents(l-s,f-c,p-d,x-m).normalize(),i[1].setComponents(l+s,f+c,p+d,x+m).normalize(),i[2].setComponents(l+o,f+h,p+g,x+A).normalize(),i[3].setComponents(l-o,f-h,p-g,x-A).normalize(),i[4].setComponents(l-a,f-u,p-_,x-v).normalize(),e===ln)i[5].setComponents(l+a,f+u,p+_,x+v).normalize();else if(e===Jr)i[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),In.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),In.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(In)}intersectsSprite(t){return In.center.set(0,0,0),In.radius=.7071067811865476,In.applyMatrix4(t.matrixWorld),this.intersectsSphere(In)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(wr.x=r.normal.x>0?t.max.x:t.min.x,wr.y=r.normal.y>0?t.max.y:t.min.y,wr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(wr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Kc(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function rf(n){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class Ri extends se{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=t/a,f=e/l,d=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const A=m*f-o;for(let v=0;v<c;v++){const x=v*u-s;g.push(x,-A,0),_.push(0,0,1),p.push(v/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let A=0;A<a;A++){const v=A+c*m,x=A+c*(m+1),D=A+1+c*(m+1),T=A+1+c*m;d.push(v,x,T),d.push(x,D,T)}this.setIndex(d),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(_,3)),this.setAttribute("uv",new Zt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ri(t.width,t.height,t.widthSegments,t.heightSegments)}}var sf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,of=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,af=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,uf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ff=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,df=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,pf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_f=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Mf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Af=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Cf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Rf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Pf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Lf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Df=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,If=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Uf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Nf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ff=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Of=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Bf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$f=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Jf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,td=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ed=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,id=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,od=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ad=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ld=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ud=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,pd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,md=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_d=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Md=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Sd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ed=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Td=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ad=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ld=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Id=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ud=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Od=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Gd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Wd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$d=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Qd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ip=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ap=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,up=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,fp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_p=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,xp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ep=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ap=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Rp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ip=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Up=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Op=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ut={alphahash_fragment:sf,alphahash_pars_fragment:of,alphamap_fragment:af,alphamap_pars_fragment:lf,alphatest_fragment:cf,alphatest_pars_fragment:uf,aomap_fragment:hf,aomap_pars_fragment:ff,batching_pars_vertex:df,batching_vertex:pf,begin_vertex:mf,beginnormal_vertex:gf,bsdfs:_f,iridescence_fragment:vf,bumpmap_pars_fragment:xf,clipping_planes_fragment:Mf,clipping_planes_pars_fragment:Sf,clipping_planes_pars_vertex:yf,clipping_planes_vertex:Ef,color_fragment:Tf,color_pars_fragment:bf,color_pars_vertex:Af,color_vertex:wf,common:Cf,cube_uv_reflection_fragment:Rf,defaultnormal_vertex:Pf,displacementmap_pars_vertex:Lf,displacementmap_vertex:Df,emissivemap_fragment:If,emissivemap_pars_fragment:Uf,colorspace_fragment:Nf,colorspace_pars_fragment:Ff,envmap_fragment:Of,envmap_common_pars_fragment:Bf,envmap_pars_fragment:zf,envmap_pars_vertex:Hf,envmap_physical_pars_fragment:Jf,envmap_vertex:Gf,fog_vertex:Vf,fog_pars_vertex:kf,fog_fragment:Wf,fog_pars_fragment:Xf,gradientmap_pars_fragment:qf,lightmap_pars_fragment:Yf,lights_lambert_fragment:$f,lights_lambert_pars_fragment:Zf,lights_pars_begin:Kf,lights_toon_fragment:jf,lights_toon_pars_fragment:Qf,lights_phong_fragment:td,lights_phong_pars_fragment:ed,lights_physical_fragment:nd,lights_physical_pars_fragment:id,lights_fragment_begin:rd,lights_fragment_maps:sd,lights_fragment_end:od,logdepthbuf_fragment:ad,logdepthbuf_pars_fragment:ld,logdepthbuf_pars_vertex:cd,logdepthbuf_vertex:ud,map_fragment:hd,map_pars_fragment:fd,map_particle_fragment:dd,map_particle_pars_fragment:pd,metalnessmap_fragment:md,metalnessmap_pars_fragment:gd,morphinstance_vertex:_d,morphcolor_vertex:vd,morphnormal_vertex:xd,morphtarget_pars_vertex:Md,morphtarget_vertex:Sd,normal_fragment_begin:yd,normal_fragment_maps:Ed,normal_pars_fragment:Td,normal_pars_vertex:bd,normal_vertex:Ad,normalmap_pars_fragment:wd,clearcoat_normal_fragment_begin:Cd,clearcoat_normal_fragment_maps:Rd,clearcoat_pars_fragment:Pd,iridescence_pars_fragment:Ld,opaque_fragment:Dd,packing:Id,premultiplied_alpha_fragment:Ud,project_vertex:Nd,dithering_fragment:Fd,dithering_pars_fragment:Od,roughnessmap_fragment:Bd,roughnessmap_pars_fragment:zd,shadowmap_pars_fragment:Hd,shadowmap_pars_vertex:Gd,shadowmap_vertex:Vd,shadowmask_pars_fragment:kd,skinbase_vertex:Wd,skinning_pars_vertex:Xd,skinning_vertex:qd,skinnormal_vertex:Yd,specularmap_fragment:$d,specularmap_pars_fragment:Zd,tonemapping_fragment:Kd,tonemapping_pars_fragment:Jd,transmission_fragment:jd,transmission_pars_fragment:Qd,uv_pars_fragment:tp,uv_pars_vertex:ep,uv_vertex:np,worldpos_vertex:ip,background_vert:rp,background_frag:sp,backgroundCube_vert:op,backgroundCube_frag:ap,cube_vert:lp,cube_frag:cp,depth_vert:up,depth_frag:hp,distanceRGBA_vert:fp,distanceRGBA_frag:dp,equirect_vert:pp,equirect_frag:mp,linedashed_vert:gp,linedashed_frag:_p,meshbasic_vert:vp,meshbasic_frag:xp,meshlambert_vert:Mp,meshlambert_frag:Sp,meshmatcap_vert:yp,meshmatcap_frag:Ep,meshnormal_vert:Tp,meshnormal_frag:bp,meshphong_vert:Ap,meshphong_frag:wp,meshphysical_vert:Cp,meshphysical_frag:Rp,meshtoon_vert:Pp,meshtoon_frag:Lp,points_vert:Dp,points_frag:Ip,shadow_vert:Up,shadow_frag:Np,sprite_vert:Fp,sprite_frag:Op},at={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Dt}},envmap:{envMap:{value:null},envMapRotation:{value:new Dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Dt},normalScale:{value:new pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0},uvTransform:{value:new Dt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}}},Ye={basic:{uniforms:xe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:xe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:xe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:xe([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:xe([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:xe([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:xe([at.points,at.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:xe([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:xe([at.common,at.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:xe([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:xe([at.sprite,at.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new Dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Dt}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distanceRGBA:{uniforms:xe([at.common,at.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distanceRGBA_vert,fragmentShader:Ut.distanceRGBA_frag},shadow:{uniforms:xe([at.lights,at.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};Ye.physical={uniforms:xe([Ye.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Dt},clearcoatNormalScale:{value:new pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Dt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Dt},transmissionSamplerSize:{value:new pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Dt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Dt},anisotropyVector:{value:new pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Dt}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};const Cr={r:0,b:0,g:0},Un=new pn,Bp=new Wt;function zp(n,t,e,i,r,s,o){const a=new Ft(0);let l=s===!0?0:1,c,h,u=null,f=0,d=null;function g(A){let v=A.isScene===!0?A.background:null;return v&&v.isTexture&&(v=(A.backgroundBlurriness>0?e:t).get(v)),v}function _(A){let v=!1;const x=g(A);x===null?m(a,l):x&&x.isColor&&(m(x,1),v=!0);const D=n.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(A,v){const x=g(v);x&&(x.isCubeTexture||x.mapping===os)?(h===void 0&&(h=new ue(new or(1,1,1),new Me({name:"BackgroundCubeMaterial",uniforms:Mi(Ye.backgroundCube.uniforms),vertexShader:Ye.backgroundCube.vertexShader,fragmentShader:Ye.backgroundCube.fragmentShader,side:Ae,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,T,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Un.copy(v.backgroundRotation),Un.x*=-1,Un.y*=-1,Un.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Un.y*=-1,Un.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Bp.makeRotationFromEuler(Un)),h.material.toneMapped=Ht.getTransfer(x.colorSpace)!==$t,(u!==x||f!==x.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,d=n.toneMapping),h.layers.enableAll(),A.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new ue(new Ri(2,2),new Me({name:"BackgroundMaterial",uniforms:Mi(Ye.background.uniforms),vertexShader:Ye.background.vertexShader,fragmentShader:Ye.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Ht.getTransfer(x.colorSpace)!==$t,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,d=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null))}function m(A,v){A.getRGB(Cr,qc(n)),i.buffers.color.setClear(Cr.r,Cr.g,Cr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(A,v=1){a.set(A),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(A){l=A,m(a,l)},render:_,addToRenderList:p}}function Hp(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(S,C,z,O,X){let K=!1;const $=u(O,z,C);s!==$&&(s=$,c(s.object)),K=d(S,O,z,X),K&&g(S,O,z,X),X!==null&&t.update(X,n.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,x(S,C,z,O),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function h(S){return n.deleteVertexArray(S)}function u(S,C,z){const O=z.wireframe===!0;let X=i[S.id];X===void 0&&(X={},i[S.id]=X);let K=X[C.id];K===void 0&&(K={},X[C.id]=K);let $=K[O];return $===void 0&&($=f(l()),K[O]=$),$}function f(S){const C=[],z=[],O=[];for(let X=0;X<e;X++)C[X]=0,z[X]=0,O[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:z,attributeDivisors:O,object:S,attributes:{},index:null}}function d(S,C,z,O){const X=s.attributes,K=C.attributes;let $=0;const Q=z.getAttributes();for(const k in Q)if(Q[k].location>=0){const F=X[k];let q=K[k];if(q===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(q=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(q=S.instanceColor)),F===void 0||F.attribute!==q||q&&F.data!==q.data)return!0;$++}return s.attributesNum!==$||s.index!==O}function g(S,C,z,O){const X={},K=C.attributes;let $=0;const Q=z.getAttributes();for(const k in Q)if(Q[k].location>=0){let F=K[k];F===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(F=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(F=S.instanceColor));const q={};q.attribute=F,F&&F.data&&(q.data=F.data),X[k]=q,$++}s.attributes=X,s.attributesNum=$,s.index=O}function _(){const S=s.newAttributes;for(let C=0,z=S.length;C<z;C++)S[C]=0}function p(S){m(S,0)}function m(S,C){const z=s.newAttributes,O=s.enabledAttributes,X=s.attributeDivisors;z[S]=1,O[S]===0&&(n.enableVertexAttribArray(S),O[S]=1),X[S]!==C&&(n.vertexAttribDivisor(S,C),X[S]=C)}function A(){const S=s.newAttributes,C=s.enabledAttributes;for(let z=0,O=C.length;z<O;z++)C[z]!==S[z]&&(n.disableVertexAttribArray(z),C[z]=0)}function v(S,C,z,O,X,K,$){$===!0?n.vertexAttribIPointer(S,C,z,X,K):n.vertexAttribPointer(S,C,z,O,X,K)}function x(S,C,z,O){_();const X=O.attributes,K=z.getAttributes(),$=C.defaultAttributeValues;for(const Q in K){const k=K[Q];if(k.location>=0){let ot=X[Q];if(ot===void 0&&(Q==="instanceMatrix"&&S.instanceMatrix&&(ot=S.instanceMatrix),Q==="instanceColor"&&S.instanceColor&&(ot=S.instanceColor)),ot!==void 0){const F=ot.normalized,q=ot.itemSize,et=t.get(ot);if(et===void 0)continue;const ct=et.buffer,H=et.type,Y=et.bytesPerElement,st=H===n.INT||H===n.UNSIGNED_INT||ot.gpuType===ra;if(ot.isInterleavedBufferAttribute){const rt=ot.data,St=rt.stride,Rt=ot.offset;if(rt.isInstancedInterleavedBuffer){for(let Nt=0;Nt<k.locationSize;Nt++)m(k.location+Nt,rt.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Nt=0;Nt<k.locationSize;Nt++)p(k.location+Nt);n.bindBuffer(n.ARRAY_BUFFER,ct);for(let Nt=0;Nt<k.locationSize;Nt++)v(k.location+Nt,q/k.locationSize,H,F,St*Y,(Rt+q/k.locationSize*Nt)*Y,st)}else{if(ot.isInstancedBufferAttribute){for(let rt=0;rt<k.locationSize;rt++)m(k.location+rt,ot.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let rt=0;rt<k.locationSize;rt++)p(k.location+rt);n.bindBuffer(n.ARRAY_BUFFER,ct);for(let rt=0;rt<k.locationSize;rt++)v(k.location+rt,q/k.locationSize,H,F,q*Y,q/k.locationSize*rt*Y,st)}}else if($!==void 0){const F=$[Q];if(F!==void 0)switch(F.length){case 2:n.vertexAttrib2fv(k.location,F);break;case 3:n.vertexAttrib3fv(k.location,F);break;case 4:n.vertexAttrib4fv(k.location,F);break;default:n.vertexAttrib1fv(k.location,F)}}}}A()}function D(){R();for(const S in i){const C=i[S];for(const z in C){const O=C[z];for(const X in O)h(O[X].object),delete O[X];delete C[z]}delete i[S]}}function T(S){if(i[S.id]===void 0)return;const C=i[S.id];for(const z in C){const O=C[z];for(const X in O)h(O[X].object),delete O[X];delete C[z]}delete i[S.id]}function b(S){for(const C in i){const z=i[C];if(z[S.id]===void 0)continue;const O=z[S.id];for(const X in O)h(O[X].object),delete O[X];delete z[S.id]}}function R(){y(),o=!0,s!==r&&(s=r,c(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:y,dispose:D,releaseStatesOfGeometry:T,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:p,disableUnusedAttributes:A}}function Gp(n,t,e){let i;function r(c){i=c}function s(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,i,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Vp(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(b){return!(b!==Ue&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const R=b===hn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==dn&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Ze&&!R)}function l(b){if(b==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:A,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:D,maxSamples:T}}function kp(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new Fn,a=new Dt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||r;return r=f,i=u.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=n.get(u);if(!r||g===null||g.length===0||s&&!p)s?h(null):c();else{const A=s?0:i,v=A*4;let x=m.clippingState||null;l.value=x,x=h(g,f,v,d);for(let D=0;D!==v;++D)x[D]=e[D];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=d+_*4,A=f.matrixWorldInverse;a.getNormalMatrix(A),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,x=d;v!==_;++v,x+=4)o.copy(u[v]).applyMatrix4(A,a),o.normal.toArray(p,x),p[x+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function Wp(n){let t=new WeakMap;function e(o,a){return a===po?o.mapping=gi:a===mo&&(o.mapping=_i),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===po||a===mo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new tf(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class da extends Yc{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ui=4,sl=[.125,.215,.35,.446,.526,.582],zn=20,Hs=new da,ol=new Ft;let Gs=null,Vs=0,ks=0,Ws=!1;const On=(1+Math.sqrt(5))/2,oi=1/On,al=[new P(-On,oi,0),new P(On,oi,0),new P(-oi,0,On),new P(oi,0,On),new P(0,On,-oi),new P(0,On,oi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class ll{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){Gs=this._renderer.getRenderTarget(),Vs=this._renderer.getActiveCubeFace(),ks=this._renderer.getActiveMipmapLevel(),Ws=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Gs,Vs,ks),this._renderer.xr.enabled=Ws,t.scissorTest=!1,Rr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===gi||t.mapping===_i?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Gs=this._renderer.getRenderTarget(),Vs=this._renderer.getActiveCubeFace(),ks=this._renderer.getActiveMipmapLevel(),Ws=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:hn,format:Ue,colorSpace:bi,depthBuffer:!1},r=cl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cl(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xp(s)),this._blurMaterial=qp(s,t,e)}return r}_compileMaterial(t){const e=new ue(this._lodPlanes[0],t);this._renderer.compile(e,Hs)}_sceneToCubeUV(t,e,i,r){const a=new Ve(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(ol),h.toneMapping=bn,h.autoClear=!1;const d=new Pe({name:"PMREM.Background",side:Ae,depthWrite:!1,depthTest:!1}),g=new ue(new or,d);let _=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,_=!0):(d.color.copy(ol),_=!0);for(let m=0;m<6;m++){const A=m%3;A===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):A===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const v=this._cubeSize;Rr(r,A*v,m>2?v:0,v,v),h.setRenderTarget(r),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===gi||t.mapping===_i;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=hl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ul());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ue(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Rr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Hs)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=al[(r-s-1)%al.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ue(this._lodPlanes[r],c),f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*zn-1),_=s/g,p=isFinite(s)?1+Math.floor(h*_):zn;p>zn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${zn}`);const m=[];let A=0;for(let b=0;b<zn;++b){const R=b/_,y=Math.exp(-R*R/2);m.push(y),b===0?A+=y:b<p&&(A+=2*y)}for(let b=0;b<m.length;b++)m[b]=m[b]/A;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-i;const x=this._sizeLods[r],D=3*x*(r>v-ui?r-v+ui:0),T=4*(this._cubeSize-x);Rr(e,D,T,3*x,2*x),l.setRenderTarget(e),l.render(u,Hs)}}function Xp(n){const t=[],e=[],i=[];let r=n;const s=n-ui+1+sl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-ui?l=sl[o-n+ui-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,p=2,m=1,A=new Float32Array(_*g*d),v=new Float32Array(p*g*d),x=new Float32Array(m*g*d);for(let T=0;T<d;T++){const b=T%3*2/3-1,R=T>2?0:-1,y=[b,R,0,b+2/3,R,0,b+2/3,R+1,0,b,R,0,b+2/3,R+1,0,b,R+1,0];A.set(y,_*g*T),v.set(f,p*g*T);const S=[T,T,T,T,T,T];x.set(S,m*g*T)}const D=new se;D.setAttribute("position",new Xe(A,_)),D.setAttribute("uv",new Xe(v,p)),D.setAttribute("faceIndex",new Xe(x,m)),t.push(D),r>ui&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function cl(n,t,e){const i=new We(n,t,e);return i.texture.mapping=os,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Rr(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function qp(n,t,e){const i=new Float32Array(zn),r=new P(0,1,0);return new Me({name:"SphericalGaussianBlur",defines:{n:zn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function ul(){return new Me({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function hl(){return new Me({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function pa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Yp(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===po||l===mo,h=l===gi||l===_i;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new ll(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&r(d)?(e===null&&(e=new ll(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function $p(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Wi("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Zp(n,t,e,i){const r={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],n.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],n.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const A=d.array;_=d.version;for(let v=0,x=A.length;v<x;v+=3){const D=A[v+0],T=A[v+1],b=A[v+2];f.push(D,T,T,b,b,D)}}else if(g!==void 0){const A=g.array;_=g.version;for(let v=0,x=A.length/3-1;v<x;v+=3){const D=v+0,T=v+1,b=v+2;f.push(D,T,T,b,b,D)}}else return;const p=new(Hc(f)?Xc:Wc)(f,1);p.version=_;const m=s.get(u);m&&t.remove(m),s.set(u,p)}function h(u){const f=s.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Kp(n,t,e){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){n.drawElements(i,d,s,f*o),e.update(d,i,1)}function c(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,s,f*o,g),e.update(d,i,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,i,1)}function u(f,d,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)c(f[m]/o,d[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(i,d,0,s,f,0,_,0,g);let m=0;for(let A=0;A<g;A++)m+=d[A]*_[A];e.update(m,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Jp(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function jp(n,t,e){const i=new WeakMap,r=new le;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let S=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var d=S;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],A=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),p===!0&&(x=3);let D=a.attributes.position.count*x,T=1;D>t.maxTextureSize&&(T=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const b=new Float32Array(D*T*4*u),R=new Vc(b,D,T,u);R.type=Ze,R.needsUpdate=!0;const y=x*4;for(let C=0;C<u;C++){const z=m[C],O=A[C],X=v[C],K=D*T*4*C;for(let $=0;$<z.count;$++){const Q=$*y;g===!0&&(r.fromBufferAttribute(z,$),b[K+Q+0]=r.x,b[K+Q+1]=r.y,b[K+Q+2]=r.z,b[K+Q+3]=0),_===!0&&(r.fromBufferAttribute(O,$),b[K+Q+4]=r.x,b[K+Q+5]=r.y,b[K+Q+6]=r.z,b[K+Q+7]=0),p===!0&&(r.fromBufferAttribute(X,$),b[K+Q+8]=r.x,b[K+Q+9]=r.y,b[K+Q+10]=r.z,b[K+Q+11]=X.itemSize===4?r.w:1)}}f={count:u,texture:R,size:new pt(D,T)},i.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Qp(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(r.get(u)!==c&&(t.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class Jc extends pe{constructor(t,e,i,r,s,o,a,l,c,h=fi){if(h!==fi&&h!==xi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===fi&&(i=Wn),i===void 0&&h===xi&&(i=vi),super(null,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Se,this.minFilter=l!==void 0?l:Se,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const jc=new pe,fl=new Jc(1,1),Qc=new Vc,tu=new zh,eu=new $c,dl=[],pl=[],ml=new Float32Array(16),gl=new Float32Array(9),_l=new Float32Array(4);function Pi(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=dl[r];if(s===void 0&&(s=new Float32Array(r),dl[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function he(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function fe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ls(n,t){let e=pl[t];e===void 0&&(e=new Int32Array(t),pl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function tm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function em(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;n.uniform2fv(this.addr,t),fe(e,t)}}function nm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(he(e,t))return;n.uniform3fv(this.addr,t),fe(e,t)}}function im(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;n.uniform4fv(this.addr,t),fe(e,t)}}function rm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(he(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),fe(e,t)}else{if(he(e,i))return;_l.set(i),n.uniformMatrix2fv(this.addr,!1,_l),fe(e,i)}}function sm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(he(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),fe(e,t)}else{if(he(e,i))return;gl.set(i),n.uniformMatrix3fv(this.addr,!1,gl),fe(e,i)}}function om(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(he(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),fe(e,t)}else{if(he(e,i))return;ml.set(i),n.uniformMatrix4fv(this.addr,!1,ml),fe(e,i)}}function am(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function lm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;n.uniform2iv(this.addr,t),fe(e,t)}}function cm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;n.uniform3iv(this.addr,t),fe(e,t)}}function um(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;n.uniform4iv(this.addr,t),fe(e,t)}}function hm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function fm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;n.uniform2uiv(this.addr,t),fe(e,t)}}function dm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;n.uniform3uiv(this.addr,t),fe(e,t)}}function pm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;n.uniform4uiv(this.addr,t),fe(e,t)}}function mm(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(fl.compareFunction=zc,s=fl):s=jc,e.setTexture2D(t||s,r)}function gm(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||tu,r)}function _m(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||eu,r)}function vm(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Qc,r)}function xm(n){switch(n){case 5126:return tm;case 35664:return em;case 35665:return nm;case 35666:return im;case 35674:return rm;case 35675:return sm;case 35676:return om;case 5124:case 35670:return am;case 35667:case 35671:return lm;case 35668:case 35672:return cm;case 35669:case 35673:return um;case 5125:return hm;case 36294:return fm;case 36295:return dm;case 36296:return pm;case 35678:case 36198:case 36298:case 36306:case 35682:return mm;case 35679:case 36299:case 36307:return gm;case 35680:case 36300:case 36308:case 36293:return _m;case 36289:case 36303:case 36311:case 36292:return vm}}function Mm(n,t){n.uniform1fv(this.addr,t)}function Sm(n,t){const e=Pi(t,this.size,2);n.uniform2fv(this.addr,e)}function ym(n,t){const e=Pi(t,this.size,3);n.uniform3fv(this.addr,e)}function Em(n,t){const e=Pi(t,this.size,4);n.uniform4fv(this.addr,e)}function Tm(n,t){const e=Pi(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function bm(n,t){const e=Pi(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Am(n,t){const e=Pi(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function wm(n,t){n.uniform1iv(this.addr,t)}function Cm(n,t){n.uniform2iv(this.addr,t)}function Rm(n,t){n.uniform3iv(this.addr,t)}function Pm(n,t){n.uniform4iv(this.addr,t)}function Lm(n,t){n.uniform1uiv(this.addr,t)}function Dm(n,t){n.uniform2uiv(this.addr,t)}function Im(n,t){n.uniform3uiv(this.addr,t)}function Um(n,t){n.uniform4uiv(this.addr,t)}function Nm(n,t,e){const i=this.cache,r=t.length,s=ls(e,r);he(i,s)||(n.uniform1iv(this.addr,s),fe(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||jc,s[o])}function Fm(n,t,e){const i=this.cache,r=t.length,s=ls(e,r);he(i,s)||(n.uniform1iv(this.addr,s),fe(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||tu,s[o])}function Om(n,t,e){const i=this.cache,r=t.length,s=ls(e,r);he(i,s)||(n.uniform1iv(this.addr,s),fe(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||eu,s[o])}function Bm(n,t,e){const i=this.cache,r=t.length,s=ls(e,r);he(i,s)||(n.uniform1iv(this.addr,s),fe(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Qc,s[o])}function zm(n){switch(n){case 5126:return Mm;case 35664:return Sm;case 35665:return ym;case 35666:return Em;case 35674:return Tm;case 35675:return bm;case 35676:return Am;case 5124:case 35670:return wm;case 35667:case 35671:return Cm;case 35668:case 35672:return Rm;case 35669:case 35673:return Pm;case 5125:return Lm;case 36294:return Dm;case 36295:return Im;case 36296:return Um;case 35678:case 36198:case 36298:case 36306:case 35682:return Nm;case 35679:case 36299:case 36307:return Fm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return Bm}}class Hm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=xm(e.type)}}class Gm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zm(e.type)}}class Vm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const Xs=/(\w+)(\])?(\[|\.)?/g;function vl(n,t){n.seq.push(t),n.map[t.id]=t}function km(n,t,e){const i=n.name,r=i.length;for(Xs.lastIndex=0;;){const s=Xs.exec(i),o=Xs.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){vl(e,c===void 0?new Hm(a,n,t):new Gm(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new Vm(a),vl(e,u)),e=u}}}class Yr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);km(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function xl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Wm=37297;let Xm=0;function qm(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Ml=new Dt;function Ym(n){Ht._getMatrix(Ml,Ht.workingColorSpace,n);const t=`mat3( ${Ml.elements.map(e=>e.toFixed(4))} )`;switch(Ht.getTransfer(n)){case as:return[t,"LinearTransferOETF"];case $t:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Sl(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+qm(n.getShaderSource(t),o)}else return r}function $m(n,t){const e=Ym(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Zm(n,t){let e;switch(t){case Ec:e="Linear";break;case Tc:e="Reinhard";break;case bc:e="Cineon";break;case Ac:e="ACESFilmic";break;case wc:e="AgX";break;case Cc:e="Neutral";break;case _h:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Pr=new P;function Km(){Ht.getLuminanceCoefficients(Pr);const n=Pr.x.toFixed(4),t=Pr.y.toFixed(4),e=Pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xi).join(`
`)}function jm(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Qm(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Xi(n){return n!==""}function yl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function El(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const tg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xo(n){return n.replace(tg,ng)}const eg=new Map;function ng(n,t){let e=Ut[t];if(e===void 0){const i=eg.get(t);if(i!==void 0)e=Ut[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Xo(e)}const ig=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tl(n){return n.replace(ig,rg)}function rg(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function bl(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function sg(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Sc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ku?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===sn&&(t="SHADOWMAP_TYPE_VSM"),t}function og(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case gi:case _i:t="ENVMAP_TYPE_CUBE";break;case os:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ag(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case _i:t="ENVMAP_MODE_REFRACTION";break}return t}function lg(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case yc:t="ENVMAP_BLENDING_MULTIPLY";break;case mh:t="ENVMAP_BLENDING_MIX";break;case gh:t="ENVMAP_BLENDING_ADD";break}return t}function cg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function ug(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=sg(e),c=og(e),h=ag(e),u=lg(e),f=cg(e),d=Jm(e),g=jm(s),_=r.createProgram();let p,m,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Xi).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Xi).join(`
`),m.length>0&&(m+=`
`)):(p=[bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xi).join(`
`),m=[bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==bn?"#define TONE_MAPPING":"",e.toneMapping!==bn?Ut.tonemapping_pars_fragment:"",e.toneMapping!==bn?Zm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,$m("linearToOutputTexel",e.outputColorSpace),Km(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Xi).join(`
`)),o=Xo(o),o=yl(o,e),o=El(o,e),a=Xo(a),a=yl(a,e),a=El(a,e),o=Tl(o),a=Tl(a),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Ba?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ba?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=A+p+o,x=A+m+a,D=xl(r,r.VERTEX_SHADER,v),T=xl(r,r.FRAGMENT_SHADER,x);r.attachShader(_,D),r.attachShader(_,T),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function b(C){if(n.debug.checkShaderErrors){const z=r.getProgramInfoLog(_).trim(),O=r.getShaderInfoLog(D).trim(),X=r.getShaderInfoLog(T).trim();let K=!0,$=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,D,T);else{const Q=Sl(r,D,"vertex"),k=Sl(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+Q+`
`+k)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(O===""||X==="")&&($=!1);$&&(C.diagnostics={runnable:K,programLog:z,vertexShader:{log:O,prefix:p},fragmentShader:{log:X,prefix:m}})}r.deleteShader(D),r.deleteShader(T),R=new Yr(r,_),y=Qm(r,_)}let R;this.getUniforms=function(){return R===void 0&&b(this),R};let y;this.getAttributes=function(){return y===void 0&&b(this),y};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(_,Wm)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Xm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=T,this}let hg=0;class fg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new dg(t),e.set(t,i)),i}}class dg{constructor(t){this.id=hg++,this.code=t,this.usedTimes=0}}function pg(n,t,e,i,r,s,o){const a=new fa,l=new fg,c=new Set,h=[],u=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function p(y,S,C,z,O){const X=z.fog,K=O.geometry,$=y.isMeshStandardMaterial?z.environment:null,Q=(y.isMeshStandardMaterial?e:t).get(y.envMap||$),k=Q&&Q.mapping===os?Q.image.height:null,ot=g[y.type];y.precision!==null&&(d=r.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const F=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,q=F!==void 0?F.length:0;let et=0;K.morphAttributes.position!==void 0&&(et=1),K.morphAttributes.normal!==void 0&&(et=2),K.morphAttributes.color!==void 0&&(et=3);let ct,H,Y,st;if(ot){const Yt=Ye[ot];ct=Yt.vertexShader,H=Yt.fragmentShader}else ct=y.vertexShader,H=y.fragmentShader,l.update(y),Y=l.getVertexShaderID(y),st=l.getFragmentShaderID(y);const rt=n.getRenderTarget(),St=n.state.buffers.depth.getReversed(),Rt=O.isInstancedMesh===!0,Nt=O.isBatchedMesh===!0,ne=!!y.map,Gt=!!y.matcap,oe=!!Q,N=!!y.aoMap,Le=!!y.lightMap,Ot=!!y.bumpMap,Bt=!!y.normalMap,bt=!!y.displacementMap,Qt=!!y.emissiveMap,Tt=!!y.metalnessMap,w=!!y.roughnessMap,M=y.anisotropy>0,B=y.clearcoat>0,J=y.dispersion>0,tt=y.iridescence>0,Z=y.sheen>0,yt=y.transmission>0,ut=M&&!!y.anisotropyMap,mt=B&&!!y.clearcoatMap,Vt=B&&!!y.clearcoatNormalMap,nt=B&&!!y.clearcoatRoughnessMap,gt=tt&&!!y.iridescenceMap,At=tt&&!!y.iridescenceThicknessMap,wt=Z&&!!y.sheenColorMap,_t=Z&&!!y.sheenRoughnessMap,zt=!!y.specularMap,It=!!y.specularColorMap,Kt=!!y.specularIntensityMap,L=yt&&!!y.transmissionMap,lt=yt&&!!y.thicknessMap,W=!!y.gradientMap,j=!!y.alphaMap,dt=y.alphaTest>0,ht=!!y.alphaHash,Pt=!!y.extensions;let re=bn;y.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(re=n.toneMapping);const me={shaderID:ot,shaderType:y.type,shaderName:y.name,vertexShader:ct,fragmentShader:H,defines:y.defines,customVertexShaderID:Y,customFragmentShaderID:st,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:Nt,batchingColor:Nt&&O._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&O.instanceColor!==null,instancingMorph:Rt&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?n.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:bi,alphaToCoverage:!!y.alphaToCoverage,map:ne,matcap:Gt,envMap:oe,envMapMode:oe&&Q.mapping,envMapCubeUVHeight:k,aoMap:N,lightMap:Le,bumpMap:Ot,normalMap:Bt,displacementMap:f&&bt,emissiveMap:Qt,normalMapObjectSpace:Bt&&y.normalMapType===yh,normalMapTangentSpace:Bt&&y.normalMapType===Sh,metalnessMap:Tt,roughnessMap:w,anisotropy:M,anisotropyMap:ut,clearcoat:B,clearcoatMap:mt,clearcoatNormalMap:Vt,clearcoatRoughnessMap:nt,dispersion:J,iridescence:tt,iridescenceMap:gt,iridescenceThicknessMap:At,sheen:Z,sheenColorMap:wt,sheenRoughnessMap:_t,specularMap:zt,specularColorMap:It,specularIntensityMap:Kt,transmission:yt,transmissionMap:L,thicknessMap:lt,gradientMap:W,opaque:y.transparent===!1&&y.blending===un&&y.alphaToCoverage===!1,alphaMap:j,alphaTest:dt,alphaHash:ht,combine:y.combine,mapUv:ne&&_(y.map.channel),aoMapUv:N&&_(y.aoMap.channel),lightMapUv:Le&&_(y.lightMap.channel),bumpMapUv:Ot&&_(y.bumpMap.channel),normalMapUv:Bt&&_(y.normalMap.channel),displacementMapUv:bt&&_(y.displacementMap.channel),emissiveMapUv:Qt&&_(y.emissiveMap.channel),metalnessMapUv:Tt&&_(y.metalnessMap.channel),roughnessMapUv:w&&_(y.roughnessMap.channel),anisotropyMapUv:ut&&_(y.anisotropyMap.channel),clearcoatMapUv:mt&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Vt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:At&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:_t&&_(y.sheenRoughnessMap.channel),specularMapUv:zt&&_(y.specularMap.channel),specularColorMapUv:It&&_(y.specularColorMap.channel),specularIntensityMapUv:Kt&&_(y.specularIntensityMap.channel),transmissionMapUv:L&&_(y.transmissionMap.channel),thicknessMapUv:lt&&_(y.thicknessMap.channel),alphaMapUv:j&&_(y.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Bt||M),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!K.attributes.uv&&(ne||j),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:St,skinning:O.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:et,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:re,decodeVideoTexture:ne&&y.map.isVideoTexture===!0&&Ht.getTransfer(y.map.colorSpace)===$t,decodeVideoTextureEmissive:Qt&&y.emissiveMap.isVideoTexture===!0&&Ht.getTransfer(y.emissiveMap.colorSpace)===$t,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===an,flipSided:y.side===Ae,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Pt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&y.extensions.multiDraw===!0||Nt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return me.vertexUv1s=c.has(1),me.vertexUv2s=c.has(2),me.vertexUv3s=c.has(3),c.clear(),me}function m(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const C in y.defines)S.push(C),S.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(A(S,y),v(S,y),S.push(n.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function A(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function v(y,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const S=g[y.type];let C;if(S){const z=Ye[S];C=Ji.clone(z.uniforms)}else C=y.uniforms;return C}function D(y,S){let C;for(let z=0,O=h.length;z<O;z++){const X=h[z];if(X.cacheKey===S){C=X,++C.usedTimes;break}}return C===void 0&&(C=new ug(n,S,y,s),h.push(C)),C}function T(y){if(--y.usedTimes===0){const S=h.indexOf(y);h[S]=h[h.length-1],h.pop(),y.destroy()}}function b(y){l.remove(y)}function R(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:x,acquireProgram:D,releaseProgram:T,releaseShaderCache:b,programs:h,dispose:R}}function mg(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function gg(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Al(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function wl(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(u,f,d,g,_,p){let m=n[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},n[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),t++,m}function a(u,f,d,g,_,p){const m=o(u,f,d,g,_,p);d.transmission>0?i.push(m):d.transparent===!0?r.push(m):e.push(m)}function l(u,f,d,g,_,p){const m=o(u,f,d,g,_,p);d.transmission>0?i.unshift(m):d.transparent===!0?r.unshift(m):e.unshift(m)}function c(u,f){e.length>1&&e.sort(u||gg),i.length>1&&i.sort(f||Al),r.length>1&&r.sort(f||Al)}function h(){for(let u=t,f=n.length;u<f;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function _g(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new wl,n.set(i,[o])):r>=s.length?(o=new wl,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function vg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Ft};break;case"SpotLight":e={position:new P,direction:new P,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function xg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Mg=0;function Sg(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function yg(n){const t=new vg,e=xg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const r=new P,s=new Wt,o=new Wt;function a(c){let h=0,u=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let d=0,g=0,_=0,p=0,m=0,A=0,v=0,x=0,D=0,T=0,b=0;c.sort(Sg);for(let y=0,S=c.length;y<S;y++){const C=c[y],z=C.color,O=C.intensity,X=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=z.r*O,u+=z.g*O,f+=z.b*O;else if(C.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(C.sh.coefficients[$],O);b++}else if(C.isDirectionalLight){const $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,k=e.get(C);k.shadowIntensity=Q.intensity,k.shadowBias=Q.bias,k.shadowNormalBias=Q.normalBias,k.shadowRadius=Q.radius,k.shadowMapSize=Q.mapSize,i.directionalShadow[d]=k,i.directionalShadowMap[d]=K,i.directionalShadowMatrix[d]=C.shadow.matrix,A++}i.directional[d]=$,d++}else if(C.isSpotLight){const $=t.get(C);$.position.setFromMatrixPosition(C.matrixWorld),$.color.copy(z).multiplyScalar(O),$.distance=X,$.coneCos=Math.cos(C.angle),$.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),$.decay=C.decay,i.spot[_]=$;const Q=C.shadow;if(C.map&&(i.spotLightMap[D]=C.map,D++,Q.updateMatrices(C),C.castShadow&&T++),i.spotLightMatrix[_]=Q.matrix,C.castShadow){const k=e.get(C);k.shadowIntensity=Q.intensity,k.shadowBias=Q.bias,k.shadowNormalBias=Q.normalBias,k.shadowRadius=Q.radius,k.shadowMapSize=Q.mapSize,i.spotShadow[_]=k,i.spotShadowMap[_]=K,x++}_++}else if(C.isRectAreaLight){const $=t.get(C);$.color.copy(z).multiplyScalar(O),$.halfWidth.set(C.width*.5,0,0),$.halfHeight.set(0,C.height*.5,0),i.rectArea[p]=$,p++}else if(C.isPointLight){const $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),$.distance=C.distance,$.decay=C.decay,C.castShadow){const Q=C.shadow,k=e.get(C);k.shadowIntensity=Q.intensity,k.shadowBias=Q.bias,k.shadowNormalBias=Q.normalBias,k.shadowRadius=Q.radius,k.shadowMapSize=Q.mapSize,k.shadowCameraNear=Q.camera.near,k.shadowCameraFar=Q.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=K,i.pointShadowMatrix[g]=C.shadow.matrix,v++}i.point[g]=$,g++}else if(C.isHemisphereLight){const $=t.get(C);$.skyColor.copy(C.color).multiplyScalar(O),$.groundColor.copy(C.groundColor).multiplyScalar(O),i.hemi[m]=$,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const R=i.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==p||R.hemiLength!==m||R.numDirectionalShadows!==A||R.numPointShadows!==v||R.numSpotShadows!==x||R.numSpotMaps!==D||R.numLightProbes!==b)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=x+D-T,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=b,R.directionalLength=d,R.pointLength=g,R.spotLength=_,R.rectAreaLength=p,R.hemiLength=m,R.numDirectionalShadows=A,R.numPointShadows=v,R.numSpotShadows=x,R.numSpotMaps=D,R.numLightProbes=b,i.version=Mg++)}function l(c,h){let u=0,f=0,d=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,A=c.length;m<A;m++){const v=c[m];if(v.isDirectionalLight){const x=i.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(p),u++}else if(v.isSpotLight){const x=i.spot[d];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(p),d++}else if(v.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(p),o.identity(),s.copy(v.matrixWorld),s.premultiply(p),o.extractRotation(s),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(p),_++}}}return{setup:a,setupView:l,state:i}}function Cl(n){const t=new yg(n),e=[],i=[];function r(h){c.camera=h,e.length=0,i.length=0}function s(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Eg(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Cl(n),t.set(r,[a])):s>=o.length?(a=new Cl(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class Tg extends sr{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=xh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class bg extends sr{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ag=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Cg(n,t,e){let i=new Zc;const r=new pt,s=new pt,o=new le,a=new Tg({depthPacking:Mh}),l=new bg,c={},h=e.maxTextureSize,u={[wn]:Ae,[Ae]:wn,[an]:an},f=new Me({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pt},radius:{value:4}},vertexShader:Ag,fragmentShader:wg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new se;g.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ue(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sc;let m=this.type;this.render=function(T,b,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const y=n.getRenderTarget(),S=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),z=n.state;z.setBlending(cn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const O=m!==sn&&this.type===sn,X=m===sn&&this.type!==sn;for(let K=0,$=T.length;K<$;K++){const Q=T[K],k=Q.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const ot=k.getFrameExtents();if(r.multiply(ot),s.copy(k.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ot.x),r.x=s.x*ot.x,k.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ot.y),r.y=s.y*ot.y,k.mapSize.y=s.y)),k.map===null||O===!0||X===!0){const q=this.type!==sn?{minFilter:Se,magFilter:Se}:{};k.map!==null&&k.map.dispose(),k.map=new We(r.x,r.y,q),k.map.texture.name=Q.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const F=k.getViewportCount();for(let q=0;q<F;q++){const et=k.getViewport(q);o.set(s.x*et.x,s.y*et.y,s.x*et.z,s.y*et.w),z.viewport(o),k.updateMatrices(Q,q),i=k.getFrustum(),x(b,R,k.camera,Q,this.type)}k.isPointLightShadow!==!0&&this.type===sn&&A(k,R),k.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(y,S,C)};function A(T,b){const R=t.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new We(r.x,r.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(b,null,R,f,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(b,null,R,d,_,null)}function v(T,b,R,y){let S=null;const C=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)S=C;else if(S=R.isPointLight===!0?l:a,n.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const z=S.uuid,O=b.uuid;let X=c[z];X===void 0&&(X={},c[z]=X);let K=X[O];K===void 0&&(K=S.clone(),X[O]=K,b.addEventListener("dispose",D)),S=K}if(S.visible=b.visible,S.wireframe=b.wireframe,y===sn?S.side=b.shadowSide!==null?b.shadowSide:b.side:S.side=b.shadowSide!==null?b.shadowSide:u[b.side],S.alphaMap=b.alphaMap,S.alphaTest=b.alphaTest,S.map=b.map,S.clipShadows=b.clipShadows,S.clippingPlanes=b.clippingPlanes,S.clipIntersection=b.clipIntersection,S.displacementMap=b.displacementMap,S.displacementScale=b.displacementScale,S.displacementBias=b.displacementBias,S.wireframeLinewidth=b.wireframeLinewidth,S.linewidth=b.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const z=n.properties.get(S);z.light=R}return S}function x(T,b,R,y,S){if(T.visible===!1)return;if(T.layers.test(b.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===sn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const O=t.update(T),X=T.material;if(Array.isArray(X)){const K=O.groups;for(let $=0,Q=K.length;$<Q;$++){const k=K[$],ot=X[k.materialIndex];if(ot&&ot.visible){const F=v(T,ot,y,S);T.onBeforeShadow(n,T,b,R,O,F,k),n.renderBufferDirect(R,null,O,F,T,k),T.onAfterShadow(n,T,b,R,O,F,k)}}}else if(X.visible){const K=v(T,X,y,S);T.onBeforeShadow(n,T,b,R,O,K,null),n.renderBufferDirect(R,null,O,K,T,null),T.onAfterShadow(n,T,b,R,O,K,null)}}const z=T.children;for(let O=0,X=z.length;O<X;O++)x(z[O],b,R,y,S)}function D(T){T.target.removeEventListener("dispose",D);for(const R in c){const y=c[R],S=T.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const Rg={[oo]:ao,[lo]:ho,[co]:fo,[mi]:uo,[ao]:oo,[ho]:lo,[fo]:co,[uo]:mi};function Pg(n,t){function e(){let L=!1;const lt=new le;let W=null;const j=new le(0,0,0,0);return{setMask:function(dt){W!==dt&&!L&&(n.colorMask(dt,dt,dt,dt),W=dt)},setLocked:function(dt){L=dt},setClear:function(dt,ht,Pt,re,me){me===!0&&(dt*=re,ht*=re,Pt*=re),lt.set(dt,ht,Pt,re),j.equals(lt)===!1&&(n.clearColor(dt,ht,Pt,re),j.copy(lt))},reset:function(){L=!1,W=null,j.set(-1,0,0,0)}}}function i(){let L=!1,lt=!1,W=null,j=null,dt=null;return{setReversed:function(ht){if(lt!==ht){const Pt=t.get("EXT_clip_control");lt?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT);const re=dt;dt=null,this.setClear(re)}lt=ht},getReversed:function(){return lt},setTest:function(ht){ht?rt(n.DEPTH_TEST):St(n.DEPTH_TEST)},setMask:function(ht){W!==ht&&!L&&(n.depthMask(ht),W=ht)},setFunc:function(ht){if(lt&&(ht=Rg[ht]),j!==ht){switch(ht){case oo:n.depthFunc(n.NEVER);break;case ao:n.depthFunc(n.ALWAYS);break;case lo:n.depthFunc(n.LESS);break;case mi:n.depthFunc(n.LEQUAL);break;case co:n.depthFunc(n.EQUAL);break;case uo:n.depthFunc(n.GEQUAL);break;case ho:n.depthFunc(n.GREATER);break;case fo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}j=ht}},setLocked:function(ht){L=ht},setClear:function(ht){dt!==ht&&(lt&&(ht=1-ht),n.clearDepth(ht),dt=ht)},reset:function(){L=!1,W=null,j=null,dt=null,lt=!1}}}function r(){let L=!1,lt=null,W=null,j=null,dt=null,ht=null,Pt=null,re=null,me=null;return{setTest:function(Yt){L||(Yt?rt(n.STENCIL_TEST):St(n.STENCIL_TEST))},setMask:function(Yt){lt!==Yt&&!L&&(n.stencilMask(Yt),lt=Yt)},setFunc:function(Yt,Oe,Je){(W!==Yt||j!==Oe||dt!==Je)&&(n.stencilFunc(Yt,Oe,Je),W=Yt,j=Oe,dt=Je)},setOp:function(Yt,Oe,Je){(ht!==Yt||Pt!==Oe||re!==Je)&&(n.stencilOp(Yt,Oe,Je),ht=Yt,Pt=Oe,re=Je)},setLocked:function(Yt){L=Yt},setClear:function(Yt){me!==Yt&&(n.clearStencil(Yt),me=Yt)},reset:function(){L=!1,lt=null,W=null,j=null,dt=null,ht=null,Pt=null,re=null,me=null}}}const s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,p=null,m=null,A=null,v=null,x=null,D=null,T=null,b=new Ft(0,0,0),R=0,y=!1,S=null,C=null,z=null,O=null,X=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,Q=0;const k=n.getParameter(n.VERSION);k.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(k)[1]),$=Q>=1):k.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),$=Q>=2);let ot=null,F={};const q=n.getParameter(n.SCISSOR_BOX),et=n.getParameter(n.VIEWPORT),ct=new le().fromArray(q),H=new le().fromArray(et);function Y(L,lt,W,j){const dt=new Uint8Array(4),ht=n.createTexture();n.bindTexture(L,ht),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pt=0;Pt<W;Pt++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(lt,0,n.RGBA,1,1,j,0,n.RGBA,n.UNSIGNED_BYTE,dt):n.texImage2D(lt+Pt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,dt);return ht}const st={};st[n.TEXTURE_2D]=Y(n.TEXTURE_2D,n.TEXTURE_2D,1),st[n.TEXTURE_CUBE_MAP]=Y(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[n.TEXTURE_2D_ARRAY]=Y(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),st[n.TEXTURE_3D]=Y(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(n.DEPTH_TEST),o.setFunc(mi),Ot(!1),Bt(Ia),rt(n.CULL_FACE),N(cn);function rt(L){h[L]!==!0&&(n.enable(L),h[L]=!0)}function St(L){h[L]!==!1&&(n.disable(L),h[L]=!1)}function Rt(L,lt){return u[L]!==lt?(n.bindFramebuffer(L,lt),u[L]=lt,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=lt),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=lt),!0):!1}function Nt(L,lt){let W=d,j=!1;if(L){W=f.get(lt),W===void 0&&(W=[],f.set(lt,W));const dt=L.textures;if(W.length!==dt.length||W[0]!==n.COLOR_ATTACHMENT0){for(let ht=0,Pt=dt.length;ht<Pt;ht++)W[ht]=n.COLOR_ATTACHMENT0+ht;W.length=dt.length,j=!0}}else W[0]!==n.BACK&&(W[0]=n.BACK,j=!0);j&&n.drawBuffers(W)}function ne(L){return g!==L?(n.useProgram(L),g=L,!0):!1}const Gt={[Bn]:n.FUNC_ADD,[ju]:n.FUNC_SUBTRACT,[Qu]:n.FUNC_REVERSE_SUBTRACT};Gt[th]=n.MIN,Gt[eh]=n.MAX;const oe={[nh]:n.ZERO,[ih]:n.ONE,[rh]:n.SRC_COLOR,[ro]:n.SRC_ALPHA,[uh]:n.SRC_ALPHA_SATURATE,[lh]:n.DST_COLOR,[oh]:n.DST_ALPHA,[sh]:n.ONE_MINUS_SRC_COLOR,[so]:n.ONE_MINUS_SRC_ALPHA,[ch]:n.ONE_MINUS_DST_COLOR,[ah]:n.ONE_MINUS_DST_ALPHA,[hh]:n.CONSTANT_COLOR,[fh]:n.ONE_MINUS_CONSTANT_COLOR,[dh]:n.CONSTANT_ALPHA,[ph]:n.ONE_MINUS_CONSTANT_ALPHA};function N(L,lt,W,j,dt,ht,Pt,re,me,Yt){if(L===cn){_===!0&&(St(n.BLEND),_=!1);return}if(_===!1&&(rt(n.BLEND),_=!0),L!==Ju){if(L!==p||Yt!==y){if((m!==Bn||x!==Bn)&&(n.blendEquation(n.FUNC_ADD),m=Bn,x=Bn),Yt)switch(L){case un:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pi:n.blendFunc(n.ONE,n.ONE);break;case Ua:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Na:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case un:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pi:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ua:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Na:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}A=null,v=null,D=null,T=null,b.set(0,0,0),R=0,p=L,y=Yt}return}dt=dt||lt,ht=ht||W,Pt=Pt||j,(lt!==m||dt!==x)&&(n.blendEquationSeparate(Gt[lt],Gt[dt]),m=lt,x=dt),(W!==A||j!==v||ht!==D||Pt!==T)&&(n.blendFuncSeparate(oe[W],oe[j],oe[ht],oe[Pt]),A=W,v=j,D=ht,T=Pt),(re.equals(b)===!1||me!==R)&&(n.blendColor(re.r,re.g,re.b,me),b.copy(re),R=me),p=L,y=!1}function Le(L,lt){L.side===an?St(n.CULL_FACE):rt(n.CULL_FACE);let W=L.side===Ae;lt&&(W=!W),Ot(W),L.blending===un&&L.transparent===!1?N(cn):N(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const j=L.stencilWrite;a.setTest(j),j&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Qt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?rt(n.SAMPLE_ALPHA_TO_COVERAGE):St(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(L){S!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),S=L)}function Bt(L){L!==$u?(rt(n.CULL_FACE),L!==C&&(L===Ia?n.cullFace(n.BACK):L===Zu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):St(n.CULL_FACE),C=L}function bt(L){L!==z&&($&&n.lineWidth(L),z=L)}function Qt(L,lt,W){L?(rt(n.POLYGON_OFFSET_FILL),(O!==lt||X!==W)&&(n.polygonOffset(lt,W),O=lt,X=W)):St(n.POLYGON_OFFSET_FILL)}function Tt(L){L?rt(n.SCISSOR_TEST):St(n.SCISSOR_TEST)}function w(L){L===void 0&&(L=n.TEXTURE0+K-1),ot!==L&&(n.activeTexture(L),ot=L)}function M(L,lt,W){W===void 0&&(ot===null?W=n.TEXTURE0+K-1:W=ot);let j=F[W];j===void 0&&(j={type:void 0,texture:void 0},F[W]=j),(j.type!==L||j.texture!==lt)&&(ot!==W&&(n.activeTexture(W),ot=W),n.bindTexture(L,lt||st[L]),j.type=L,j.texture=lt)}function B(){const L=F[ot];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function J(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function yt(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ut(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function mt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Vt(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function nt(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function gt(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function At(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function wt(L){ct.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),ct.copy(L))}function _t(L){H.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),H.copy(L))}function zt(L,lt){let W=c.get(lt);W===void 0&&(W=new WeakMap,c.set(lt,W));let j=W.get(L);j===void 0&&(j=n.getUniformBlockIndex(lt,L.name),W.set(L,j))}function It(L,lt){const j=c.get(lt).get(L);l.get(lt)!==j&&(n.uniformBlockBinding(lt,j,L.__bindingPointIndex),l.set(lt,j))}function Kt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},ot=null,F={},u={},f=new WeakMap,d=[],g=null,_=!1,p=null,m=null,A=null,v=null,x=null,D=null,T=null,b=new Ft(0,0,0),R=0,y=!1,S=null,C=null,z=null,O=null,X=null,ct.set(0,0,n.canvas.width,n.canvas.height),H.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:rt,disable:St,bindFramebuffer:Rt,drawBuffers:Nt,useProgram:ne,setBlending:N,setMaterial:Le,setFlipSided:Ot,setCullFace:Bt,setLineWidth:bt,setPolygonOffset:Qt,setScissorTest:Tt,activeTexture:w,bindTexture:M,unbindTexture:B,compressedTexImage2D:J,compressedTexImage3D:tt,texImage2D:gt,texImage3D:At,updateUBOMapping:zt,uniformBlockBinding:It,texStorage2D:Vt,texStorage3D:nt,texSubImage2D:Z,texSubImage3D:yt,compressedTexSubImage2D:ut,compressedTexSubImage3D:mt,scissor:wt,viewport:_t,reset:Kt}}function Rl(n,t,e,i){const r=Lg(i);switch(e){case Ic:return n*t;case Nc:return n*t;case Fc:return n*t*2;case aa:return n*t/r.components*r.byteLength;case la:return n*t/r.components*r.byteLength;case Oc:return n*t*2/r.components*r.byteLength;case ca:return n*t*2/r.components*r.byteLength;case Uc:return n*t*3/r.components*r.byteLength;case Ue:return n*t*4/r.components*r.byteLength;case ua:return n*t*4/r.components*r.byteLength;case Vr:case kr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Wr:case Xr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xo:case So:return Math.max(n,16)*Math.max(t,8)/4;case vo:case Mo:return Math.max(n,8)*Math.max(t,8)/2;case yo:case Eo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case To:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case bo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case wo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Co:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Ro:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Po:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Do:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Io:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case No:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Fo:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Oo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Bo:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case qr:case zo:case Ho:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Bc:case Go:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Vo:case ko:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Lg(n){switch(n){case dn:case Pc:return{byteLength:1,components:1};case Ki:case Lc:case hn:return{byteLength:2,components:1};case sa:case oa:return{byteLength:2,components:4};case Wn:case ra:case Ze:return{byteLength:4,components:1};case Dc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Dg(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new pt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,M){return d?new OffscreenCanvas(w,M):jr("canvas")}function _(w,M,B){let J=1;const tt=Tt(w);if((tt.width>B||tt.height>B)&&(J=B/Math.max(tt.width,tt.height)),J<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const Z=Math.floor(J*tt.width),yt=Math.floor(J*tt.height);u===void 0&&(u=g(Z,yt));const ut=M?g(Z,yt):u;return ut.width=Z,ut.height=yt,ut.getContext("2d").drawImage(w,0,0,Z,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+Z+"x"+yt+")."),ut}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),w;return w}function p(w){return w.generateMipmaps}function m(w){n.generateMipmap(w)}function A(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(w,M,B,J,tt=!1){if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Z=M;if(M===n.RED&&(B===n.FLOAT&&(Z=n.R32F),B===n.HALF_FLOAT&&(Z=n.R16F),B===n.UNSIGNED_BYTE&&(Z=n.R8)),M===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.R8UI),B===n.UNSIGNED_SHORT&&(Z=n.R16UI),B===n.UNSIGNED_INT&&(Z=n.R32UI),B===n.BYTE&&(Z=n.R8I),B===n.SHORT&&(Z=n.R16I),B===n.INT&&(Z=n.R32I)),M===n.RG&&(B===n.FLOAT&&(Z=n.RG32F),B===n.HALF_FLOAT&&(Z=n.RG16F),B===n.UNSIGNED_BYTE&&(Z=n.RG8)),M===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RG8UI),B===n.UNSIGNED_SHORT&&(Z=n.RG16UI),B===n.UNSIGNED_INT&&(Z=n.RG32UI),B===n.BYTE&&(Z=n.RG8I),B===n.SHORT&&(Z=n.RG16I),B===n.INT&&(Z=n.RG32I)),M===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),B===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),B===n.UNSIGNED_INT&&(Z=n.RGB32UI),B===n.BYTE&&(Z=n.RGB8I),B===n.SHORT&&(Z=n.RGB16I),B===n.INT&&(Z=n.RGB32I)),M===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),B===n.UNSIGNED_INT&&(Z=n.RGBA32UI),B===n.BYTE&&(Z=n.RGBA8I),B===n.SHORT&&(Z=n.RGBA16I),B===n.INT&&(Z=n.RGBA32I)),M===n.RGB&&B===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),M===n.RGBA){const yt=tt?as:Ht.getTransfer(J);B===n.FLOAT&&(Z=n.RGBA32F),B===n.HALF_FLOAT&&(Z=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Z=yt===$t?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function x(w,M){let B;return w?M===null||M===Wn||M===vi?B=n.DEPTH24_STENCIL8:M===Ze?B=n.DEPTH32F_STENCIL8:M===Ki&&(B=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Wn||M===vi?B=n.DEPTH_COMPONENT24:M===Ze?B=n.DEPTH_COMPONENT32F:M===Ki&&(B=n.DEPTH_COMPONENT16),B}function D(w,M){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==Se&&w.minFilter!==$e?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function T(w){const M=w.target;M.removeEventListener("dispose",T),R(M),M.isVideoTexture&&h.delete(M)}function b(w){const M=w.target;M.removeEventListener("dispose",b),S(M)}function R(w){const M=i.get(w);if(M.__webglInit===void 0)return;const B=w.source,J=f.get(B);if(J){const tt=J[M.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&y(w),Object.keys(J).length===0&&f.delete(B)}i.remove(w)}function y(w){const M=i.get(w);n.deleteTexture(M.__webglTexture);const B=w.source,J=f.get(B);delete J[M.__cacheKey],o.memory.textures--}function S(w){const M=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let tt=0;tt<M.__webglFramebuffer[J].length;tt++)n.deleteFramebuffer(M.__webglFramebuffer[J][tt]);else n.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)n.deleteFramebuffer(M.__webglFramebuffer[J]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=w.textures;for(let J=0,tt=B.length;J<tt;J++){const Z=i.get(B[J]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(B[J])}i.remove(w)}let C=0;function z(){C=0}function O(){const w=C;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),C+=1,w}function X(w){const M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function K(w,M){const B=i.get(w);if(w.isVideoTexture&&bt(w),w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){const J=w.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{H(B,w,M);return}}e.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+M)}function $(w,M){const B=i.get(w);if(w.version>0&&B.__version!==w.version){H(B,w,M);return}e.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+M)}function Q(w,M){const B=i.get(w);if(w.version>0&&B.__version!==w.version){H(B,w,M);return}e.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+M)}function k(w,M){const B=i.get(w);if(w.version>0&&B.__version!==w.version){Y(B,w,M);return}e.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+M)}const ot={[go]:n.REPEAT,[Hn]:n.CLAMP_TO_EDGE,[_o]:n.MIRRORED_REPEAT},F={[Se]:n.NEAREST,[vh]:n.NEAREST_MIPMAP_NEAREST,[ur]:n.NEAREST_MIPMAP_LINEAR,[$e]:n.LINEAR,[_s]:n.LINEAR_MIPMAP_NEAREST,[Gn]:n.LINEAR_MIPMAP_LINEAR},q={[Eh]:n.NEVER,[Rh]:n.ALWAYS,[Th]:n.LESS,[zc]:n.LEQUAL,[bh]:n.EQUAL,[Ch]:n.GEQUAL,[Ah]:n.GREATER,[wh]:n.NOTEQUAL};function et(w,M){if(M.type===Ze&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===$e||M.magFilter===_s||M.magFilter===ur||M.magFilter===Gn||M.minFilter===$e||M.minFilter===_s||M.minFilter===ur||M.minFilter===Gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,ot[M.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,ot[M.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,ot[M.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,F[M.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,F[M.minFilter]),M.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,q[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Se||M.minFilter!==ur&&M.minFilter!==Gn||M.type===Ze&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");n.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function ct(w,M){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",T));const J=M.source;let tt=f.get(J);tt===void 0&&(tt={},f.set(J,tt));const Z=X(M);if(Z!==w.__cacheKey){tt[Z]===void 0&&(tt[Z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,B=!0),tt[Z].usedTimes++;const yt=tt[w.__cacheKey];yt!==void 0&&(tt[w.__cacheKey].usedTimes--,yt.usedTimes===0&&y(M)),w.__cacheKey=Z,w.__webglTexture=tt[Z].texture}return B}function H(w,M,B){let J=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=n.TEXTURE_3D);const tt=ct(w,M),Z=M.source;e.bindTexture(J,w.__webglTexture,n.TEXTURE0+B);const yt=i.get(Z);if(Z.version!==yt.__version||tt===!0){e.activeTexture(n.TEXTURE0+B);const ut=Ht.getPrimaries(Ht.workingColorSpace),mt=M.colorSpace===Tn?null:Ht.getPrimaries(M.colorSpace),Vt=M.colorSpace===Tn||ut===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let nt=_(M.image,!1,r.maxTextureSize);nt=Qt(M,nt);const gt=s.convert(M.format,M.colorSpace),At=s.convert(M.type);let wt=v(M.internalFormat,gt,At,M.colorSpace,M.isVideoTexture);et(J,M);let _t;const zt=M.mipmaps,It=M.isVideoTexture!==!0,Kt=yt.__version===void 0||tt===!0,L=Z.dataReady,lt=D(M,nt);if(M.isDepthTexture)wt=x(M.format===xi,M.type),Kt&&(It?e.texStorage2D(n.TEXTURE_2D,1,wt,nt.width,nt.height):e.texImage2D(n.TEXTURE_2D,0,wt,nt.width,nt.height,0,gt,At,null));else if(M.isDataTexture)if(zt.length>0){It&&Kt&&e.texStorage2D(n.TEXTURE_2D,lt,wt,zt[0].width,zt[0].height);for(let W=0,j=zt.length;W<j;W++)_t=zt[W],It?L&&e.texSubImage2D(n.TEXTURE_2D,W,0,0,_t.width,_t.height,gt,At,_t.data):e.texImage2D(n.TEXTURE_2D,W,wt,_t.width,_t.height,0,gt,At,_t.data);M.generateMipmaps=!1}else It?(Kt&&e.texStorage2D(n.TEXTURE_2D,lt,wt,nt.width,nt.height),L&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,nt.width,nt.height,gt,At,nt.data)):e.texImage2D(n.TEXTURE_2D,0,wt,nt.width,nt.height,0,gt,At,nt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){It&&Kt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,lt,wt,zt[0].width,zt[0].height,nt.depth);for(let W=0,j=zt.length;W<j;W++)if(_t=zt[W],M.format!==Ue)if(gt!==null)if(It){if(L)if(M.layerUpdates.size>0){const dt=Rl(_t.width,_t.height,M.format,M.type);for(const ht of M.layerUpdates){const Pt=_t.data.subarray(ht*dt/_t.data.BYTES_PER_ELEMENT,(ht+1)*dt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,W,0,0,ht,_t.width,_t.height,1,gt,Pt)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,W,0,0,0,_t.width,_t.height,nt.depth,gt,_t.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,W,wt,_t.width,_t.height,nt.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else It?L&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,W,0,0,0,_t.width,_t.height,nt.depth,gt,At,_t.data):e.texImage3D(n.TEXTURE_2D_ARRAY,W,wt,_t.width,_t.height,nt.depth,0,gt,At,_t.data)}else{It&&Kt&&e.texStorage2D(n.TEXTURE_2D,lt,wt,zt[0].width,zt[0].height);for(let W=0,j=zt.length;W<j;W++)_t=zt[W],M.format!==Ue?gt!==null?It?L&&e.compressedTexSubImage2D(n.TEXTURE_2D,W,0,0,_t.width,_t.height,gt,_t.data):e.compressedTexImage2D(n.TEXTURE_2D,W,wt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):It?L&&e.texSubImage2D(n.TEXTURE_2D,W,0,0,_t.width,_t.height,gt,At,_t.data):e.texImage2D(n.TEXTURE_2D,W,wt,_t.width,_t.height,0,gt,At,_t.data)}else if(M.isDataArrayTexture)if(It){if(Kt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,lt,wt,nt.width,nt.height,nt.depth),L)if(M.layerUpdates.size>0){const W=Rl(nt.width,nt.height,M.format,M.type);for(const j of M.layerUpdates){const dt=nt.data.subarray(j*W/nt.data.BYTES_PER_ELEMENT,(j+1)*W/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,nt.width,nt.height,1,gt,At,dt)}M.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,gt,At,nt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,wt,nt.width,nt.height,nt.depth,0,gt,At,nt.data);else if(M.isData3DTexture)It?(Kt&&e.texStorage3D(n.TEXTURE_3D,lt,wt,nt.width,nt.height,nt.depth),L&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,gt,At,nt.data)):e.texImage3D(n.TEXTURE_3D,0,wt,nt.width,nt.height,nt.depth,0,gt,At,nt.data);else if(M.isFramebufferTexture){if(Kt)if(It)e.texStorage2D(n.TEXTURE_2D,lt,wt,nt.width,nt.height);else{let W=nt.width,j=nt.height;for(let dt=0;dt<lt;dt++)e.texImage2D(n.TEXTURE_2D,dt,wt,W,j,0,gt,At,null),W>>=1,j>>=1}}else if(zt.length>0){if(It&&Kt){const W=Tt(zt[0]);e.texStorage2D(n.TEXTURE_2D,lt,wt,W.width,W.height)}for(let W=0,j=zt.length;W<j;W++)_t=zt[W],It?L&&e.texSubImage2D(n.TEXTURE_2D,W,0,0,gt,At,_t):e.texImage2D(n.TEXTURE_2D,W,wt,gt,At,_t);M.generateMipmaps=!1}else if(It){if(Kt){const W=Tt(nt);e.texStorage2D(n.TEXTURE_2D,lt,wt,W.width,W.height)}L&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,gt,At,nt)}else e.texImage2D(n.TEXTURE_2D,0,wt,gt,At,nt);p(M)&&m(J),yt.__version=Z.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function Y(w,M,B){if(M.image.length!==6)return;const J=ct(w,M),tt=M.source;e.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+B);const Z=i.get(tt);if(tt.version!==Z.__version||J===!0){e.activeTexture(n.TEXTURE0+B);const yt=Ht.getPrimaries(Ht.workingColorSpace),ut=M.colorSpace===Tn?null:Ht.getPrimaries(M.colorSpace),mt=M.colorSpace===Tn||yt===ut?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const Vt=M.isCompressedTexture||M.image[0].isCompressedTexture,nt=M.image[0]&&M.image[0].isDataTexture,gt=[];for(let j=0;j<6;j++)!Vt&&!nt?gt[j]=_(M.image[j],!0,r.maxCubemapSize):gt[j]=nt?M.image[j].image:M.image[j],gt[j]=Qt(M,gt[j]);const At=gt[0],wt=s.convert(M.format,M.colorSpace),_t=s.convert(M.type),zt=v(M.internalFormat,wt,_t,M.colorSpace),It=M.isVideoTexture!==!0,Kt=Z.__version===void 0||J===!0,L=tt.dataReady;let lt=D(M,At);et(n.TEXTURE_CUBE_MAP,M);let W;if(Vt){It&&Kt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,lt,zt,At.width,At.height);for(let j=0;j<6;j++){W=gt[j].mipmaps;for(let dt=0;dt<W.length;dt++){const ht=W[dt];M.format!==Ue?wt!==null?It?L&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,dt,0,0,ht.width,ht.height,wt,ht.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,dt,zt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):It?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,dt,0,0,ht.width,ht.height,wt,_t,ht.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,dt,zt,ht.width,ht.height,0,wt,_t,ht.data)}}}else{if(W=M.mipmaps,It&&Kt){W.length>0&&lt++;const j=Tt(gt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,lt,zt,j.width,j.height)}for(let j=0;j<6;j++)if(nt){It?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,gt[j].width,gt[j].height,wt,_t,gt[j].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,zt,gt[j].width,gt[j].height,0,wt,_t,gt[j].data);for(let dt=0;dt<W.length;dt++){const Pt=W[dt].image[j].image;It?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,dt+1,0,0,Pt.width,Pt.height,wt,_t,Pt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,dt+1,zt,Pt.width,Pt.height,0,wt,_t,Pt.data)}}else{It?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,wt,_t,gt[j]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,zt,wt,_t,gt[j]);for(let dt=0;dt<W.length;dt++){const ht=W[dt];It?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,dt+1,0,0,wt,_t,ht.image[j]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,dt+1,zt,wt,_t,ht.image[j])}}}p(M)&&m(n.TEXTURE_CUBE_MAP),Z.__version=tt.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function st(w,M,B,J,tt,Z){const yt=s.convert(B.format,B.colorSpace),ut=s.convert(B.type),mt=v(B.internalFormat,yt,ut,B.colorSpace),Vt=i.get(M),nt=i.get(B);if(nt.__renderTarget=M,!Vt.__hasExternalTextures){const gt=Math.max(1,M.width>>Z),At=Math.max(1,M.height>>Z);tt===n.TEXTURE_3D||tt===n.TEXTURE_2D_ARRAY?e.texImage3D(tt,Z,mt,gt,At,M.depth,0,yt,ut,null):e.texImage2D(tt,Z,mt,gt,At,0,yt,ut,null)}e.bindFramebuffer(n.FRAMEBUFFER,w),Bt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,tt,nt.__webglTexture,0,Ot(M)):(tt===n.TEXTURE_2D||tt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,tt,nt.__webglTexture,Z),e.bindFramebuffer(n.FRAMEBUFFER,null)}function rt(w,M,B){if(n.bindRenderbuffer(n.RENDERBUFFER,w),M.depthBuffer){const J=M.depthTexture,tt=J&&J.isDepthTexture?J.type:null,Z=x(M.stencilBuffer,tt),yt=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=Ot(M);Bt(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ut,Z,M.width,M.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,ut,Z,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,Z,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,yt,n.RENDERBUFFER,w)}else{const J=M.textures;for(let tt=0;tt<J.length;tt++){const Z=J[tt],yt=s.convert(Z.format,Z.colorSpace),ut=s.convert(Z.type),mt=v(Z.internalFormat,yt,ut,Z.colorSpace),Vt=Ot(M);B&&Bt(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Vt,mt,M.width,M.height):Bt(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Vt,mt,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,mt,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function St(w,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=i.get(M.depthTexture);J.__renderTarget=M,(!J.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),K(M.depthTexture,0);const tt=J.__webglTexture,Z=Ot(M);if(M.depthTexture.format===fi)Bt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,tt,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,tt,0);else if(M.depthTexture.format===xi)Bt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,tt,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Rt(w){const M=i.get(w),B=w.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==w.depthTexture){const J=w.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),J){const tt=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,J.removeEventListener("dispose",tt)};J.addEventListener("dispose",tt),M.__depthDisposeCallback=tt}M.__boundDepthTexture=J}if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");St(M.__webglFramebuffer,w)}else if(B){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]===void 0)M.__webglDepthbuffer[J]=n.createRenderbuffer(),rt(M.__webglDepthbuffer[J],w,!1);else{const tt=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,tt,n.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),rt(M.__webglDepthbuffer,w,!1);else{const J=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,tt=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,tt),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,tt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Nt(w,M,B){const J=i.get(w);M!==void 0&&st(J.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Rt(w)}function ne(w){const M=w.texture,B=i.get(w),J=i.get(M);w.addEventListener("dispose",b);const tt=w.textures,Z=w.isWebGLCubeRenderTarget===!0,yt=tt.length>1;if(yt||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=M.version,o.memory.textures++),Z){B.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[ut]=[];for(let mt=0;mt<M.mipmaps.length;mt++)B.__webglFramebuffer[ut][mt]=n.createFramebuffer()}else B.__webglFramebuffer[ut]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let ut=0;ut<M.mipmaps.length;ut++)B.__webglFramebuffer[ut]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(yt)for(let ut=0,mt=tt.length;ut<mt;ut++){const Vt=i.get(tt[ut]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&Bt(w)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ut=0;ut<tt.length;ut++){const mt=tt[ut];B.__webglColorRenderbuffer[ut]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[ut]);const Vt=s.convert(mt.format,mt.colorSpace),nt=s.convert(mt.type),gt=v(mt.internalFormat,Vt,nt,mt.colorSpace,w.isXRRenderTarget===!0),At=Ot(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,At,gt,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.RENDERBUFFER,B.__webglColorRenderbuffer[ut])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),rt(B.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),et(n.TEXTURE_CUBE_MAP,M);for(let ut=0;ut<6;ut++)if(M.mipmaps&&M.mipmaps.length>0)for(let mt=0;mt<M.mipmaps.length;mt++)st(B.__webglFramebuffer[ut][mt],w,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,mt);else st(B.__webglFramebuffer[ut],w,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);p(M)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let ut=0,mt=tt.length;ut<mt;ut++){const Vt=tt[ut],nt=i.get(Vt);e.bindTexture(n.TEXTURE_2D,nt.__webglTexture),et(n.TEXTURE_2D,Vt),st(B.__webglFramebuffer,w,Vt,n.COLOR_ATTACHMENT0+ut,n.TEXTURE_2D,0),p(Vt)&&m(n.TEXTURE_2D)}e.unbindTexture()}else{let ut=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ut=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ut,J.__webglTexture),et(ut,M),M.mipmaps&&M.mipmaps.length>0)for(let mt=0;mt<M.mipmaps.length;mt++)st(B.__webglFramebuffer[mt],w,M,n.COLOR_ATTACHMENT0,ut,mt);else st(B.__webglFramebuffer,w,M,n.COLOR_ATTACHMENT0,ut,0);p(M)&&m(ut),e.unbindTexture()}w.depthBuffer&&Rt(w)}function Gt(w){const M=w.textures;for(let B=0,J=M.length;B<J;B++){const tt=M[B];if(p(tt)){const Z=A(w),yt=i.get(tt).__webglTexture;e.bindTexture(Z,yt),m(Z),e.unbindTexture()}}}const oe=[],N=[];function Le(w){if(w.samples>0){if(Bt(w)===!1){const M=w.textures,B=w.width,J=w.height;let tt=n.COLOR_BUFFER_BIT;const Z=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,yt=i.get(w),ut=M.length>1;if(ut)for(let mt=0;mt<M.length;mt++)e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let mt=0;mt<M.length;mt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(tt|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(tt|=n.STENCIL_BUFFER_BIT)),ut){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,yt.__webglColorRenderbuffer[mt]);const Vt=i.get(M[mt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Vt,0)}n.blitFramebuffer(0,0,B,J,0,0,B,J,tt,n.NEAREST),l===!0&&(oe.length=0,N.length=0,oe.push(n.COLOR_ATTACHMENT0+mt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(oe.push(Z),N.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,N)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,oe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ut)for(let mt=0;mt<M.length;mt++){e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,yt.__webglColorRenderbuffer[mt]);const Vt=i.get(M[mt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,Vt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const M=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Ot(w){return Math.min(r.maxSamples,w.samples)}function Bt(w){const M=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function bt(w){const M=o.render.frame;h.get(w)!==M&&(h.set(w,M),w.update())}function Qt(w,M){const B=w.colorSpace,J=w.format,tt=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==bi&&B!==Tn&&(Ht.getTransfer(B)===$t?(J!==Ue||tt!==dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function Tt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=z,this.setTexture2D=K,this.setTexture2DArray=$,this.setTexture3D=Q,this.setTextureCube=k,this.rebindTextures=Nt,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=st,this.useMultisampledRTT=Bt}function Ig(n,t){function e(i,r=Tn){let s;const o=Ht.getTransfer(r);if(i===dn)return n.UNSIGNED_BYTE;if(i===sa)return n.UNSIGNED_SHORT_4_4_4_4;if(i===oa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Dc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Pc)return n.BYTE;if(i===Lc)return n.SHORT;if(i===Ki)return n.UNSIGNED_SHORT;if(i===ra)return n.INT;if(i===Wn)return n.UNSIGNED_INT;if(i===Ze)return n.FLOAT;if(i===hn)return n.HALF_FLOAT;if(i===Ic)return n.ALPHA;if(i===Uc)return n.RGB;if(i===Ue)return n.RGBA;if(i===Nc)return n.LUMINANCE;if(i===Fc)return n.LUMINANCE_ALPHA;if(i===fi)return n.DEPTH_COMPONENT;if(i===xi)return n.DEPTH_STENCIL;if(i===aa)return n.RED;if(i===la)return n.RED_INTEGER;if(i===Oc)return n.RG;if(i===ca)return n.RG_INTEGER;if(i===ua)return n.RGBA_INTEGER;if(i===Vr||i===kr||i===Wr||i===Xr)if(o===$t)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Vr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===kr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Vr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===kr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vo||i===xo||i===Mo||i===So)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===vo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Mo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===So)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===yo||i===Eo||i===To)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===yo||i===Eo)return o===$t?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===To)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===bo||i===Ao||i===wo||i===Co||i===Ro||i===Po||i===Lo||i===Do||i===Io||i===Uo||i===No||i===Fo||i===Oo||i===Bo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===bo)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ao)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===wo)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Co)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ro)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Po)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Lo)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Do)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Io)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Uo)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===No)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fo)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Oo)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Bo)return o===$t?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qr||i===zo||i===Ho)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===qr)return o===$t?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===zo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ho)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Bc||i===Go||i===Vo||i===ko)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===qr)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Go)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Vo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ko)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===vi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Ug extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Vn extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ng={type:"move"};class qs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,i),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ng)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Vn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Fg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Og=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Bg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new pe,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Me({vertexShader:Fg,fragmentShader:Og,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ue(new Ri(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zg extends Ai{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const _=new Bg,p=e.getContextAttributes();let m=null,A=null;const v=[],x=[],D=new pt;let T=null;const b=new Ve;b.viewport=new le;const R=new Ve;R.viewport=new le;const y=[b,R],S=new Ug;let C=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let Y=v[H];return Y===void 0&&(Y=new qs,v[H]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(H){let Y=v[H];return Y===void 0&&(Y=new qs,v[H]=Y),Y.getGripSpace()},this.getHand=function(H){let Y=v[H];return Y===void 0&&(Y=new qs,v[H]=Y),Y.getHandSpace()};function O(H){const Y=x.indexOf(H.inputSource);if(Y===-1)return;const st=v[Y];st!==void 0&&(st.update(H.inputSource,H.frame,c||o),st.dispatchEvent({type:H.type,data:H.inputSource}))}function X(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",K);for(let H=0;H<v.length;H++){const Y=x[H];Y!==null&&(x[H]=null,v[H].disconnect(Y))}C=null,z=null,_.reset(),t.setRenderTarget(m),d=null,f=null,u=null,r=null,A=null,ct.stop(),i.isPresenting=!1,t.setPixelRatio(T),t.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(m=t.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",X),r.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(D),r.renderState.layers===void 0){const Y={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,Y),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),A=new We(d.framebufferWidth,d.framebufferHeight,{format:Ue,type:dn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let Y=null,st=null,rt=null;p.depth&&(rt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Y=p.stencil?xi:fi,st=p.stencil?vi:Wn);const St={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:s};u=new XRWebGLBinding(r,e),f=u.createProjectionLayer(St),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),A=new We(f.textureWidth,f.textureHeight,{format:Ue,type:dn,depthTexture:new Jc(f.textureWidth,f.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ct.setContext(r),ct.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K(H){for(let Y=0;Y<H.removed.length;Y++){const st=H.removed[Y],rt=x.indexOf(st);rt>=0&&(x[rt]=null,v[rt].disconnect(st))}for(let Y=0;Y<H.added.length;Y++){const st=H.added[Y];let rt=x.indexOf(st);if(rt===-1){for(let Rt=0;Rt<v.length;Rt++)if(Rt>=x.length){x.push(st),rt=Rt;break}else if(x[Rt]===null){x[Rt]=st,rt=Rt;break}if(rt===-1)break}const St=v[rt];St&&St.connect(st)}}const $=new P,Q=new P;function k(H,Y,st){$.setFromMatrixPosition(Y.matrixWorld),Q.setFromMatrixPosition(st.matrixWorld);const rt=$.distanceTo(Q),St=Y.projectionMatrix.elements,Rt=st.projectionMatrix.elements,Nt=St[14]/(St[10]-1),ne=St[14]/(St[10]+1),Gt=(St[9]+1)/St[5],oe=(St[9]-1)/St[5],N=(St[8]-1)/St[0],Le=(Rt[8]+1)/Rt[0],Ot=Nt*N,Bt=Nt*Le,bt=rt/(-N+Le),Qt=bt*-N;if(Y.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Qt),H.translateZ(bt),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),St[10]===-1)H.projectionMatrix.copy(Y.projectionMatrix),H.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const Tt=Nt+bt,w=ne+bt,M=Ot-Qt,B=Bt+(rt-Qt),J=Gt*ne/w*Tt,tt=oe*ne/w*Tt;H.projectionMatrix.makePerspective(M,B,J,tt,Tt,w),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function ot(H,Y){Y===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(Y.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;let Y=H.near,st=H.far;_.texture!==null&&(_.depthNear>0&&(Y=_.depthNear),_.depthFar>0&&(st=_.depthFar)),S.near=R.near=b.near=Y,S.far=R.far=b.far=st,(C!==S.near||z!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),C=S.near,z=S.far),b.layers.mask=H.layers.mask|2,R.layers.mask=H.layers.mask|4,S.layers.mask=b.layers.mask|R.layers.mask;const rt=H.parent,St=S.cameras;ot(S,rt);for(let Rt=0;Rt<St.length;Rt++)ot(St[Rt],rt);St.length===2?k(S,b,R):S.projectionMatrix.copy(b.projectionMatrix),F(H,S,rt)};function F(H,Y,st){st===null?H.matrix.copy(Y.matrixWorld):(H.matrix.copy(st.matrixWorld),H.matrix.invert(),H.matrix.multiply(Y.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(Y.projectionMatrix),H.projectionMatrixInverse.copy(Y.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Wo*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(H){l=H,f!==null&&(f.fixedFoveation=H),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=H)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let q=null;function et(H,Y){if(h=Y.getViewerPose(c||o),g=Y,h!==null){const st=h.views;d!==null&&(t.setRenderTargetFramebuffer(A,d.framebuffer),t.setRenderTarget(A));let rt=!1;st.length!==S.cameras.length&&(S.cameras.length=0,rt=!0);for(let Rt=0;Rt<st.length;Rt++){const Nt=st[Rt];let ne=null;if(d!==null)ne=d.getViewport(Nt);else{const oe=u.getViewSubImage(f,Nt);ne=oe.viewport,Rt===0&&(t.setRenderTargetTextures(A,oe.colorTexture,f.ignoreDepthValues?void 0:oe.depthStencilTexture),t.setRenderTarget(A))}let Gt=y[Rt];Gt===void 0&&(Gt=new Ve,Gt.layers.enable(Rt),Gt.viewport=new le,y[Rt]=Gt),Gt.matrix.fromArray(Nt.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(Nt.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(ne.x,ne.y,ne.width,ne.height),Rt===0&&(S.matrix.copy(Gt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),rt===!0&&S.cameras.push(Gt)}const St=r.enabledFeatures;if(St&&St.includes("depth-sensing")){const Rt=u.getDepthInformation(st[0]);Rt&&Rt.isValid&&Rt.texture&&_.init(t,Rt,r.renderState)}}for(let st=0;st<v.length;st++){const rt=x[st],St=v[st];rt!==null&&St!==void 0&&St.update(rt,Y,c||o)}q&&q(H,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const ct=new Kc;ct.setAnimationLoop(et),this.setAnimationLoop=function(H){q=H},this.dispose=function(){}}}const Nn=new pn,Hg=new Wt;function Gg(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,qc(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,A,v,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),u(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,x)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,A,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ae&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ae&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const A=t.get(m),v=A.envMap,x=A.envMapRotation;v&&(p.envMap.value=v,Nn.copy(x),Nn.x*=-1,Nn.y*=-1,Nn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Nn.y*=-1,Nn.z*=-1),p.envMapRotation.value.setFromMatrix4(Hg.makeRotationFromEuler(Nn)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,A,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*A,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,A){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ae&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=A.texture,p.transmissionSamplerSize.value.set(A.width,A.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const A=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(A.matrixWorld),p.nearDistance.value=A.shadow.camera.near,p.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Vg(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,v){const x=v.program;i.uniformBlockBinding(A,x)}function c(A,v){let x=r[A.id];x===void 0&&(g(A),x=h(A),r[A.id]=x,A.addEventListener("dispose",p));const D=v.program;i.updateUBOMapping(A,D);const T=t.render.frame;s[A.id]!==T&&(f(A),s[A.id]=T)}function h(A){const v=u();A.__bindingPointIndex=v;const x=n.createBuffer(),D=A.__size,T=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,D,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,x),x}function u(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const v=r[A.id],x=A.uniforms,D=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let T=0,b=x.length;T<b;T++){const R=Array.isArray(x[T])?x[T]:[x[T]];for(let y=0,S=R.length;y<S;y++){const C=R[y];if(d(C,T,y,D)===!0){const z=C.__offset,O=Array.isArray(C.value)?C.value:[C.value];let X=0;for(let K=0;K<O.length;K++){const $=O[K],Q=_($);typeof $=="number"||typeof $=="boolean"?(C.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,z+X,C.__data)):$.isMatrix3?(C.__data[0]=$.elements[0],C.__data[1]=$.elements[1],C.__data[2]=$.elements[2],C.__data[3]=0,C.__data[4]=$.elements[3],C.__data[5]=$.elements[4],C.__data[6]=$.elements[5],C.__data[7]=0,C.__data[8]=$.elements[6],C.__data[9]=$.elements[7],C.__data[10]=$.elements[8],C.__data[11]=0):($.toArray(C.__data,X),X+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,z,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(A,v,x,D){const T=A.value,b=v+"_"+x;if(D[b]===void 0)return typeof T=="number"||typeof T=="boolean"?D[b]=T:D[b]=T.clone(),!0;{const R=D[b];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return D[b]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(A){const v=A.uniforms;let x=0;const D=16;for(let b=0,R=v.length;b<R;b++){const y=Array.isArray(v[b])?v[b]:[v[b]];for(let S=0,C=y.length;S<C;S++){const z=y[S],O=Array.isArray(z.value)?z.value:[z.value];for(let X=0,K=O.length;X<K;X++){const $=O[X],Q=_($),k=x%D,ot=k%Q.boundary,F=k+ot;x+=ot,F!==0&&D-F<Q.storage&&(x+=D-F),z.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=Q.storage}}}const T=x%D;return T>0&&(x+=D-T),A.__size=x,A.__cache={},this}function _(A){const v={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(v.boundary=4,v.storage=4):A.isVector2?(v.boundary=8,v.storage=8):A.isVector3||A.isColor?(v.boundary=16,v.storage=12):A.isVector4?(v.boundary=16,v.storage=16):A.isMatrix3?(v.boundary=48,v.storage=48):A.isMatrix4?(v.boundary=64,v.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),v}function p(A){const v=A.target;v.removeEventListener("dispose",p);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function m(){for(const A in r)n.deleteBuffer(r[A]);o=[],r={},s={}}return{bind:l,update:c,dispose:m}}class kg{constructor(t={}){const{canvas:e=Lh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,m=null;const A=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=be,this.toneMapping=bn,this.toneMappingExposure=1;const x=this;let D=!1,T=0,b=0,R=null,y=-1,S=null;const C=new le,z=new le;let O=null;const X=new Ft(0);let K=0,$=e.width,Q=e.height,k=1,ot=null,F=null;const q=new le(0,0,$,Q),et=new le(0,0,$,Q);let ct=!1;const H=new Zc;let Y=!1,st=!1;const rt=new Wt,St=new Wt,Rt=new P,Nt=new le,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function oe(){return R===null?k:1}let N=i;function Le(E,I){return e.getContext(E,I)}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ia}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),N===null){const I="webgl2";if(N=Le(I,E),N===null)throw Le(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ot,Bt,bt,Qt,Tt,w,M,B,J,tt,Z,yt,ut,mt,Vt,nt,gt,At,wt,_t,zt,It,Kt,L;function lt(){Ot=new $p(N),Ot.init(),It=new Ig(N,Ot),Bt=new Vp(N,Ot,t,It),bt=new Pg(N,Ot),Bt.reverseDepthBuffer&&f&&bt.buffers.depth.setReversed(!0),Qt=new Jp(N),Tt=new mg,w=new Dg(N,Ot,bt,Tt,Bt,It,Qt),M=new Wp(x),B=new Yp(x),J=new rf(N),Kt=new Hp(N,J),tt=new Zp(N,J,Qt,Kt),Z=new Qp(N,tt,J,Qt),wt=new jp(N,Bt,w),nt=new kp(Tt),yt=new pg(x,M,B,Ot,Bt,Kt,nt),ut=new Gg(x,Tt),mt=new _g,Vt=new Eg(Ot),At=new zp(x,M,B,bt,Z,d,l),gt=new Cg(x,Z,Bt),L=new Vg(N,Qt,Bt,bt),_t=new Gp(N,Ot,Qt),zt=new Kp(N,Ot,Qt),Qt.programs=yt.programs,x.capabilities=Bt,x.extensions=Ot,x.properties=Tt,x.renderLists=mt,x.shadowMap=gt,x.state=bt,x.info=Qt}lt();const W=new zg(x,N);this.xr=W,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=Ot.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ot.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(E){E!==void 0&&(k=E,this.setSize($,Q,!1))},this.getSize=function(E){return E.set($,Q)},this.setSize=function(E,I,G=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=E,Q=I,e.width=Math.floor(E*k),e.height=Math.floor(I*k),G===!0&&(e.style.width=E+"px",e.style.height=I+"px"),this.setViewport(0,0,E,I)},this.getDrawingBufferSize=function(E){return E.set($*k,Q*k).floor()},this.setDrawingBufferSize=function(E,I,G){$=E,Q=I,k=G,e.width=Math.floor(E*G),e.height=Math.floor(I*G),this.setViewport(0,0,E,I)},this.getCurrentViewport=function(E){return E.copy(C)},this.getViewport=function(E){return E.copy(q)},this.setViewport=function(E,I,G,V){E.isVector4?q.set(E.x,E.y,E.z,E.w):q.set(E,I,G,V),bt.viewport(C.copy(q).multiplyScalar(k).round())},this.getScissor=function(E){return E.copy(et)},this.setScissor=function(E,I,G,V){E.isVector4?et.set(E.x,E.y,E.z,E.w):et.set(E,I,G,V),bt.scissor(z.copy(et).multiplyScalar(k).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(E){bt.setScissorTest(ct=E)},this.setOpaqueSort=function(E){ot=E},this.setTransparentSort=function(E){F=E},this.getClearColor=function(E){return E.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor.apply(At,arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha.apply(At,arguments)},this.clear=function(E=!0,I=!0,G=!0){let V=0;if(E){let U=!1;if(R!==null){const it=R.texture.format;U=it===ua||it===ca||it===la}if(U){const it=R.texture.type,ft=it===dn||it===Wn||it===Ki||it===vi||it===sa||it===oa,vt=At.getClearColor(),xt=At.getClearAlpha(),Ct=vt.r,Lt=vt.g,Mt=vt.b;ft?(g[0]=Ct,g[1]=Lt,g[2]=Mt,g[3]=xt,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Ct,_[1]=Lt,_[2]=Mt,_[3]=xt,N.clearBufferiv(N.COLOR,0,_))}else V|=N.COLOR_BUFFER_BIT}I&&(V|=N.DEPTH_BUFFER_BIT),G&&(V|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),mt.dispose(),Vt.dispose(),Tt.dispose(),M.dispose(),B.dispose(),Z.dispose(),Kt.dispose(),L.dispose(),yt.dispose(),W.dispose(),W.removeEventListener("sessionstart",ba),W.removeEventListener("sessionend",Aa),Rn.stop()};function j(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const E=Qt.autoReset,I=gt.enabled,G=gt.autoUpdate,V=gt.needsUpdate,U=gt.type;lt(),Qt.autoReset=E,gt.enabled=I,gt.autoUpdate=G,gt.needsUpdate=V,gt.type=U}function ht(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Pt(E){const I=E.target;I.removeEventListener("dispose",Pt),re(I)}function re(E){me(E),Tt.remove(E)}function me(E){const I=Tt.get(E).programs;I!==void 0&&(I.forEach(function(G){yt.releaseProgram(G)}),E.isShaderMaterial&&yt.releaseShaderCache(E))}this.renderBufferDirect=function(E,I,G,V,U,it){I===null&&(I=ne);const ft=U.isMesh&&U.matrixWorld.determinant()<0,vt=ku(E,I,G,V,U);bt.setMaterial(V,ft);let xt=G.index,Ct=1;if(V.wireframe===!0){if(xt=tt.getWireframeAttribute(G),xt===void 0)return;Ct=2}const Lt=G.drawRange,Mt=G.attributes.position;let kt=Lt.start*Ct,Jt=(Lt.start+Lt.count)*Ct;it!==null&&(kt=Math.max(kt,it.start*Ct),Jt=Math.min(Jt,(it.start+it.count)*Ct)),xt!==null?(kt=Math.max(kt,0),Jt=Math.min(Jt,xt.count)):Mt!=null&&(kt=Math.max(kt,0),Jt=Math.min(Jt,Mt.count));const te=Jt-kt;if(te<0||te===1/0)return;Kt.setup(U,V,vt,G,xt);let Ee,Xt=_t;if(xt!==null&&(Ee=J.get(xt),Xt=zt,Xt.setIndex(Ee)),U.isMesh)V.wireframe===!0?(bt.setLineWidth(V.wireframeLinewidth*oe()),Xt.setMode(N.LINES)):Xt.setMode(N.TRIANGLES);else if(U.isLine){let Et=V.linewidth;Et===void 0&&(Et=1),bt.setLineWidth(Et*oe()),U.isLineSegments?Xt.setMode(N.LINES):U.isLineLoop?Xt.setMode(N.LINE_LOOP):Xt.setMode(N.LINE_STRIP)}else U.isPoints?Xt.setMode(N.POINTS):U.isSprite&&Xt.setMode(N.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Xt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Ot.get("WEBGL_multi_draw"))Xt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Et=U._multiDrawStarts,je=U._multiDrawCounts,qt=U._multiDrawCount,Be=xt?J.get(xt).bytesPerElement:1,qn=Tt.get(V).currentProgram.getUniforms();for(let we=0;we<qt;we++)qn.setValue(N,"_gl_DrawID",we),Xt.render(Et[we]/Be,je[we])}else if(U.isInstancedMesh)Xt.renderInstances(kt,te,U.count);else if(G.isInstancedBufferGeometry){const Et=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,je=Math.min(G.instanceCount,Et);Xt.renderInstances(kt,te,je)}else Xt.render(kt,te)};function Yt(E,I,G){E.transparent===!0&&E.side===an&&E.forceSinglePass===!1?(E.side=Ae,E.needsUpdate=!0,cr(E,I,G),E.side=wn,E.needsUpdate=!0,cr(E,I,G),E.side=an):cr(E,I,G)}this.compile=function(E,I,G=null){G===null&&(G=E),m=Vt.get(G),m.init(I),v.push(m),G.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),E!==G&&E.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),m.setupLights();const V=new Set;return E.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const it=U.material;if(it)if(Array.isArray(it))for(let ft=0;ft<it.length;ft++){const vt=it[ft];Yt(vt,G,U),V.add(vt)}else Yt(it,G,U),V.add(it)}),v.pop(),m=null,V},this.compileAsync=function(E,I,G=null){const V=this.compile(E,I,G);return new Promise(U=>{function it(){if(V.forEach(function(ft){Tt.get(ft).currentProgram.isReady()&&V.delete(ft)}),V.size===0){U(E);return}setTimeout(it,10)}Ot.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Oe=null;function Je(E){Oe&&Oe(E)}function ba(){Rn.stop()}function Aa(){Rn.start()}const Rn=new Kc;Rn.setAnimationLoop(Je),typeof self<"u"&&Rn.setContext(self),this.setAnimationLoop=function(E){Oe=E,W.setAnimationLoop(E),E===null?Rn.stop():Rn.start()},W.addEventListener("sessionstart",ba),W.addEventListener("sessionend",Aa),this.render=function(E,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(I),I=W.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,I,R),m=Vt.get(E,v.length),m.init(I),v.push(m),St.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),H.setFromProjectionMatrix(St),st=this.localClippingEnabled,Y=nt.init(this.clippingPlanes,st),p=mt.get(E,A.length),p.init(),A.push(p),W.enabled===!0&&W.isPresenting===!0){const it=x.xr.getDepthSensingMesh();it!==null&&gs(it,I,-1/0,x.sortObjects)}gs(E,I,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(ot,F),Gt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Gt&&At.addToRenderList(p,E),this.info.render.frame++,Y===!0&&nt.beginShadows();const G=m.state.shadowsArray;gt.render(G,E,I),Y===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=p.opaque,U=p.transmissive;if(m.setupLights(),I.isArrayCamera){const it=I.cameras;if(U.length>0)for(let ft=0,vt=it.length;ft<vt;ft++){const xt=it[ft];Ca(V,U,E,xt)}Gt&&At.render(E);for(let ft=0,vt=it.length;ft<vt;ft++){const xt=it[ft];wa(p,E,xt,xt.viewport)}}else U.length>0&&Ca(V,U,E,I),Gt&&At.render(E),wa(p,E,I);R!==null&&(w.updateMultisampleRenderTarget(R),w.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(x,E,I),Kt.resetDefaultState(),y=-1,S=null,v.pop(),v.length>0?(m=v[v.length-1],Y===!0&&nt.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,A.pop(),A.length>0?p=A[A.length-1]:p=null};function gs(E,I,G,V){if(E.visible===!1)return;if(E.layers.test(I.layers)){if(E.isGroup)G=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(I);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||H.intersectsSprite(E)){V&&Nt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(St);const ft=Z.update(E),vt=E.material;vt.visible&&p.push(E,ft,vt,G,Nt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||H.intersectsObject(E))){const ft=Z.update(E),vt=E.material;if(V&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Nt.copy(E.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Nt.copy(ft.boundingSphere.center)),Nt.applyMatrix4(E.matrixWorld).applyMatrix4(St)),Array.isArray(vt)){const xt=ft.groups;for(let Ct=0,Lt=xt.length;Ct<Lt;Ct++){const Mt=xt[Ct],kt=vt[Mt.materialIndex];kt&&kt.visible&&p.push(E,ft,kt,G,Nt.z,Mt)}}else vt.visible&&p.push(E,ft,vt,G,Nt.z,null)}}const it=E.children;for(let ft=0,vt=it.length;ft<vt;ft++)gs(it[ft],I,G,V)}function wa(E,I,G,V){const U=E.opaque,it=E.transmissive,ft=E.transparent;m.setupLightsView(G),Y===!0&&nt.setGlobalState(x.clippingPlanes,G),V&&bt.viewport(C.copy(V)),U.length>0&&lr(U,I,G),it.length>0&&lr(it,I,G),ft.length>0&&lr(ft,I,G),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function Ca(E,I,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new We(1,1,{generateMipmaps:!0,type:Ot.has("EXT_color_buffer_half_float")||Ot.has("EXT_color_buffer_float")?hn:dn,minFilter:Gn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ht.workingColorSpace}));const it=m.state.transmissionRenderTarget[V.id],ft=V.viewport||C;it.setSize(ft.z,ft.w);const vt=x.getRenderTarget();x.setRenderTarget(it),x.getClearColor(X),K=x.getClearAlpha(),K<1&&x.setClearColor(16777215,.5),x.clear(),Gt&&At.render(G);const xt=x.toneMapping;x.toneMapping=bn;const Ct=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),Y===!0&&nt.setGlobalState(x.clippingPlanes,V),lr(E,G,V),w.updateMultisampleRenderTarget(it),w.updateRenderTargetMipmap(it),Ot.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let Mt=0,kt=I.length;Mt<kt;Mt++){const Jt=I[Mt],te=Jt.object,Ee=Jt.geometry,Xt=Jt.material,Et=Jt.group;if(Xt.side===an&&te.layers.test(V.layers)){const je=Xt.side;Xt.side=Ae,Xt.needsUpdate=!0,Ra(te,G,V,Ee,Xt,Et),Xt.side=je,Xt.needsUpdate=!0,Lt=!0}}Lt===!0&&(w.updateMultisampleRenderTarget(it),w.updateRenderTargetMipmap(it))}x.setRenderTarget(vt),x.setClearColor(X,K),Ct!==void 0&&(V.viewport=Ct),x.toneMapping=xt}function lr(E,I,G){const V=I.isScene===!0?I.overrideMaterial:null;for(let U=0,it=E.length;U<it;U++){const ft=E[U],vt=ft.object,xt=ft.geometry,Ct=V===null?ft.material:V,Lt=ft.group;vt.layers.test(G.layers)&&Ra(vt,I,G,xt,Ct,Lt)}}function Ra(E,I,G,V,U,it){E.onBeforeRender(x,I,G,V,U,it),E.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),U.onBeforeRender(x,I,G,V,E,it),U.transparent===!0&&U.side===an&&U.forceSinglePass===!1?(U.side=Ae,U.needsUpdate=!0,x.renderBufferDirect(G,I,V,U,E,it),U.side=wn,U.needsUpdate=!0,x.renderBufferDirect(G,I,V,U,E,it),U.side=an):x.renderBufferDirect(G,I,V,U,E,it),E.onAfterRender(x,I,G,V,U,it)}function cr(E,I,G){I.isScene!==!0&&(I=ne);const V=Tt.get(E),U=m.state.lights,it=m.state.shadowsArray,ft=U.state.version,vt=yt.getParameters(E,U.state,it,I,G),xt=yt.getProgramCacheKey(vt);let Ct=V.programs;V.environment=E.isMeshStandardMaterial?I.environment:null,V.fog=I.fog,V.envMap=(E.isMeshStandardMaterial?B:M).get(E.envMap||V.environment),V.envMapRotation=V.environment!==null&&E.envMap===null?I.environmentRotation:E.envMapRotation,Ct===void 0&&(E.addEventListener("dispose",Pt),Ct=new Map,V.programs=Ct);let Lt=Ct.get(xt);if(Lt!==void 0){if(V.currentProgram===Lt&&V.lightsStateVersion===ft)return La(E,vt),Lt}else vt.uniforms=yt.getUniforms(E),E.onBeforeCompile(vt,x),Lt=yt.acquireProgram(vt,xt),Ct.set(xt,Lt),V.uniforms=vt.uniforms;const Mt=V.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Mt.clippingPlanes=nt.uniform),La(E,vt),V.needsLights=Xu(E),V.lightsStateVersion=ft,V.needsLights&&(Mt.ambientLightColor.value=U.state.ambient,Mt.lightProbe.value=U.state.probe,Mt.directionalLights.value=U.state.directional,Mt.directionalLightShadows.value=U.state.directionalShadow,Mt.spotLights.value=U.state.spot,Mt.spotLightShadows.value=U.state.spotShadow,Mt.rectAreaLights.value=U.state.rectArea,Mt.ltc_1.value=U.state.rectAreaLTC1,Mt.ltc_2.value=U.state.rectAreaLTC2,Mt.pointLights.value=U.state.point,Mt.pointLightShadows.value=U.state.pointShadow,Mt.hemisphereLights.value=U.state.hemi,Mt.directionalShadowMap.value=U.state.directionalShadowMap,Mt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Mt.spotShadowMap.value=U.state.spotShadowMap,Mt.spotLightMatrix.value=U.state.spotLightMatrix,Mt.spotLightMap.value=U.state.spotLightMap,Mt.pointShadowMap.value=U.state.pointShadowMap,Mt.pointShadowMatrix.value=U.state.pointShadowMatrix),V.currentProgram=Lt,V.uniformsList=null,Lt}function Pa(E){if(E.uniformsList===null){const I=E.currentProgram.getUniforms();E.uniformsList=Yr.seqWithValue(I.seq,E.uniforms)}return E.uniformsList}function La(E,I){const G=Tt.get(E);G.outputColorSpace=I.outputColorSpace,G.batching=I.batching,G.batchingColor=I.batchingColor,G.instancing=I.instancing,G.instancingColor=I.instancingColor,G.instancingMorph=I.instancingMorph,G.skinning=I.skinning,G.morphTargets=I.morphTargets,G.morphNormals=I.morphNormals,G.morphColors=I.morphColors,G.morphTargetsCount=I.morphTargetsCount,G.numClippingPlanes=I.numClippingPlanes,G.numIntersection=I.numClipIntersection,G.vertexAlphas=I.vertexAlphas,G.vertexTangents=I.vertexTangents,G.toneMapping=I.toneMapping}function ku(E,I,G,V,U){I.isScene!==!0&&(I=ne),w.resetTextureUnits();const it=I.fog,ft=V.isMeshStandardMaterial?I.environment:null,vt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:bi,xt=(V.isMeshStandardMaterial?B:M).get(V.envMap||ft),Ct=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Lt=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Mt=!!G.morphAttributes.position,kt=!!G.morphAttributes.normal,Jt=!!G.morphAttributes.color;let te=bn;V.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(te=x.toneMapping);const Ee=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Xt=Ee!==void 0?Ee.length:0,Et=Tt.get(V),je=m.state.lights;if(Y===!0&&(st===!0||E!==S)){const De=E===S&&V.id===y;nt.setState(V,E,De)}let qt=!1;V.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==je.state.version||Et.outputColorSpace!==vt||U.isBatchedMesh&&Et.batching===!1||!U.isBatchedMesh&&Et.batching===!0||U.isBatchedMesh&&Et.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Et.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Et.instancing===!1||!U.isInstancedMesh&&Et.instancing===!0||U.isSkinnedMesh&&Et.skinning===!1||!U.isSkinnedMesh&&Et.skinning===!0||U.isInstancedMesh&&Et.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Et.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Et.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Et.instancingMorph===!1&&U.morphTexture!==null||Et.envMap!==xt||V.fog===!0&&Et.fog!==it||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==nt.numPlanes||Et.numIntersection!==nt.numIntersection)||Et.vertexAlphas!==Ct||Et.vertexTangents!==Lt||Et.morphTargets!==Mt||Et.morphNormals!==kt||Et.morphColors!==Jt||Et.toneMapping!==te||Et.morphTargetsCount!==Xt)&&(qt=!0):(qt=!0,Et.__version=V.version);let Be=Et.currentProgram;qt===!0&&(Be=cr(V,I,U));let qn=!1,we=!1,Ii=!1;const ee=Be.getUniforms(),qe=Et.uniforms;if(bt.useProgram(Be.program)&&(qn=!0,we=!0,Ii=!0),V.id!==y&&(y=V.id,we=!0),qn||S!==E){bt.buffers.depth.getReversed()?(rt.copy(E.projectionMatrix),Ih(rt),Uh(rt),ee.setValue(N,"projectionMatrix",rt)):ee.setValue(N,"projectionMatrix",E.projectionMatrix),ee.setValue(N,"viewMatrix",E.matrixWorldInverse);const gn=ee.map.cameraPosition;gn!==void 0&&gn.setValue(N,Rt.setFromMatrixPosition(E.matrixWorld)),Bt.logarithmicDepthBuffer&&ee.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ee.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,we=!0,Ii=!0)}if(U.isSkinnedMesh){ee.setOptional(N,U,"bindMatrix"),ee.setOptional(N,U,"bindMatrixInverse");const De=U.skeleton;De&&(De.boneTexture===null&&De.computeBoneTexture(),ee.setValue(N,"boneTexture",De.boneTexture,w))}U.isBatchedMesh&&(ee.setOptional(N,U,"batchingTexture"),ee.setValue(N,"batchingTexture",U._matricesTexture,w),ee.setOptional(N,U,"batchingIdTexture"),ee.setValue(N,"batchingIdTexture",U._indirectTexture,w),ee.setOptional(N,U,"batchingColorTexture"),U._colorsTexture!==null&&ee.setValue(N,"batchingColorTexture",U._colorsTexture,w));const Ui=G.morphAttributes;if((Ui.position!==void 0||Ui.normal!==void 0||Ui.color!==void 0)&&wt.update(U,G,Be),(we||Et.receiveShadow!==U.receiveShadow)&&(Et.receiveShadow=U.receiveShadow,ee.setValue(N,"receiveShadow",U.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(qe.envMap.value=xt,qe.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&I.environment!==null&&(qe.envMapIntensity.value=I.environmentIntensity),we&&(ee.setValue(N,"toneMappingExposure",x.toneMappingExposure),Et.needsLights&&Wu(qe,Ii),it&&V.fog===!0&&ut.refreshFogUniforms(qe,it),ut.refreshMaterialUniforms(qe,V,k,Q,m.state.transmissionRenderTarget[E.id]),Yr.upload(N,Pa(Et),qe,w)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Yr.upload(N,Pa(Et),qe,w),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ee.setValue(N,"center",U.center),ee.setValue(N,"modelViewMatrix",U.modelViewMatrix),ee.setValue(N,"normalMatrix",U.normalMatrix),ee.setValue(N,"modelMatrix",U.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const De=V.uniformsGroups;for(let gn=0,_n=De.length;gn<_n;gn++){const Da=De[gn];L.update(Da,Be),L.bind(Da,Be)}}return Be}function Wu(E,I){E.ambientLightColor.needsUpdate=I,E.lightProbe.needsUpdate=I,E.directionalLights.needsUpdate=I,E.directionalLightShadows.needsUpdate=I,E.pointLights.needsUpdate=I,E.pointLightShadows.needsUpdate=I,E.spotLights.needsUpdate=I,E.spotLightShadows.needsUpdate=I,E.rectAreaLights.needsUpdate=I,E.hemisphereLights.needsUpdate=I}function Xu(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,I,G){Tt.get(E.texture).__webglTexture=I,Tt.get(E.depthTexture).__webglTexture=G;const V=Tt.get(E);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=G===void 0,V.__autoAllocateDepthBuffer||Ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,I){const G=Tt.get(E);G.__webglFramebuffer=I,G.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(E,I=0,G=0){R=E,T=I,b=G;let V=!0,U=null,it=!1,ft=!1;if(E){const xt=Tt.get(E);if(xt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(N.FRAMEBUFFER,null),V=!1;else if(xt.__webglFramebuffer===void 0)w.setupRenderTarget(E);else if(xt.__hasExternalTextures)w.rebindTextures(E,Tt.get(E.texture).__webglTexture,Tt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Mt=E.depthTexture;if(xt.__boundDepthTexture!==Mt){if(Mt!==null&&Tt.has(Mt)&&(E.width!==Mt.image.width||E.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(E)}}const Ct=E.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ft=!0);const Lt=Tt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Lt[I])?U=Lt[I][G]:U=Lt[I],it=!0):E.samples>0&&w.useMultisampledRTT(E)===!1?U=Tt.get(E).__webglMultisampledFramebuffer:Array.isArray(Lt)?U=Lt[G]:U=Lt,C.copy(E.viewport),z.copy(E.scissor),O=E.scissorTest}else C.copy(q).multiplyScalar(k).floor(),z.copy(et).multiplyScalar(k).floor(),O=ct;if(bt.bindFramebuffer(N.FRAMEBUFFER,U)&&V&&bt.drawBuffers(E,U),bt.viewport(C),bt.scissor(z),bt.setScissorTest(O),it){const xt=Tt.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,xt.__webglTexture,G)}else if(ft){const xt=Tt.get(E.texture),Ct=I||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,xt.__webglTexture,G||0,Ct)}y=-1},this.readRenderTargetPixels=function(E,I,G,V,U,it,ft){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Tt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ft!==void 0&&(vt=vt[ft]),vt){bt.bindFramebuffer(N.FRAMEBUFFER,vt);try{const xt=E.texture,Ct=xt.format,Lt=xt.type;if(!Bt.textureFormatReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Bt.textureTypeReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=E.width-V&&G>=0&&G<=E.height-U&&N.readPixels(I,G,V,U,It.convert(Ct),It.convert(Lt),it)}finally{const xt=R!==null?Tt.get(R).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(E,I,G,V,U,it,ft){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Tt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ft!==void 0&&(vt=vt[ft]),vt){const xt=E.texture,Ct=xt.format,Lt=xt.type;if(!Bt.textureFormatReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Bt.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=E.width-V&&G>=0&&G<=E.height-U){bt.bindFramebuffer(N.FRAMEBUFFER,vt);const Mt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Mt),N.bufferData(N.PIXEL_PACK_BUFFER,it.byteLength,N.STREAM_READ),N.readPixels(I,G,V,U,It.convert(Ct),It.convert(Lt),0);const kt=R!==null?Tt.get(R).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,kt);const Jt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Dh(N,Jt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Mt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,it),N.deleteBuffer(Mt),N.deleteSync(Jt),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,I=null,G=0){E.isTexture!==!0&&(Wi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,E=arguments[1]);const V=Math.pow(2,-G),U=Math.floor(E.image.width*V),it=Math.floor(E.image.height*V),ft=I!==null?I.x:0,vt=I!==null?I.y:0;w.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,ft,vt,U,it),bt.unbindTexture()},this.copyTextureToTexture=function(E,I,G=null,V=null,U=0){E.isTexture!==!0&&(Wi("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,E=arguments[1],I=arguments[2],U=arguments[3]||0,G=null);let it,ft,vt,xt,Ct,Lt,Mt,kt,Jt;const te=E.isCompressedTexture?E.mipmaps[U]:E.image;G!==null?(it=G.max.x-G.min.x,ft=G.max.y-G.min.y,vt=G.isBox3?G.max.z-G.min.z:1,xt=G.min.x,Ct=G.min.y,Lt=G.isBox3?G.min.z:0):(it=te.width,ft=te.height,vt=te.depth||1,xt=0,Ct=0,Lt=0),V!==null?(Mt=V.x,kt=V.y,Jt=V.z):(Mt=0,kt=0,Jt=0);const Ee=It.convert(I.format),Xt=It.convert(I.type);let Et;I.isData3DTexture?(w.setTexture3D(I,0),Et=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(w.setTexture2DArray(I,0),Et=N.TEXTURE_2D_ARRAY):(w.setTexture2D(I,0),Et=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);const je=N.getParameter(N.UNPACK_ROW_LENGTH),qt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Be=N.getParameter(N.UNPACK_SKIP_PIXELS),qn=N.getParameter(N.UNPACK_SKIP_ROWS),we=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,te.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,te.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,xt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ct),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Lt);const Ii=E.isDataArrayTexture||E.isData3DTexture,ee=I.isDataArrayTexture||I.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const qe=Tt.get(E),Ui=Tt.get(I),De=Tt.get(qe.__renderTarget),gn=Tt.get(Ui.__renderTarget);bt.bindFramebuffer(N.READ_FRAMEBUFFER,De.__webglFramebuffer),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,gn.__webglFramebuffer);for(let _n=0;_n<vt;_n++)Ii&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Tt.get(E).__webglTexture,U,Lt+_n),E.isDepthTexture?(ee&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Tt.get(I).__webglTexture,U,Jt+_n),N.blitFramebuffer(xt,Ct,it,ft,Mt,kt,it,ft,N.DEPTH_BUFFER_BIT,N.NEAREST)):ee?N.copyTexSubImage3D(Et,U,Mt,kt,Jt+_n,xt,Ct,it,ft):N.copyTexSubImage2D(Et,U,Mt,kt,Jt+_n,xt,Ct,it,ft);bt.bindFramebuffer(N.READ_FRAMEBUFFER,null),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ee?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(Et,U,Mt,kt,Jt,it,ft,vt,Ee,Xt,te.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(Et,U,Mt,kt,Jt,it,ft,vt,Ee,te.data):N.texSubImage3D(Et,U,Mt,kt,Jt,it,ft,vt,Ee,Xt,te):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,Mt,kt,it,ft,Ee,Xt,te.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,Mt,kt,te.width,te.height,Ee,te.data):N.texSubImage2D(N.TEXTURE_2D,U,Mt,kt,it,ft,Ee,Xt,te);N.pixelStorei(N.UNPACK_ROW_LENGTH,je),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,qt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Be),N.pixelStorei(N.UNPACK_SKIP_ROWS,qn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,we),U===0&&I.generateMipmaps&&N.generateMipmap(Et),bt.unbindTexture()},this.copyTextureToTexture3D=function(E,I,G=null,V=null,U=0){return E.isTexture!==!0&&(Wi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,V=arguments[1]||null,E=arguments[2],I=arguments[3],U=arguments[4]||0),Wi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,I,G,V,U)},this.initRenderTarget=function(E){Tt.get(E).__webglFramebuffer===void 0&&w.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?w.setTextureCube(E,0):E.isData3DTexture?w.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?w.setTexture2DArray(E,0):w.setTexture2D(E,0),bt.unbindTexture()},this.resetState=function(){T=0,b=0,R=null,bt.reset(),Kt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Ht._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ht._getUnpackColorSpace()}}class Wg extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class nu extends pe{constructor(t=null,e=1,i=1,r,s,o,a,l,c=Se,h=Se,u,f){super(null,o,a,l,c,h,r,s,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pl extends Xe{constructor(t,e,i,r=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ai=new Wt,Ll=new Wt,Lr=[],Dl=new Cn,Xg=new Wt,Hi=new ue,Gi=new Ci;class ma extends ue{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Pl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Xg)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Cn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ai),Dl.copy(t.boundingBox).applyMatrix4(ai),this.boundingBox.union(Dl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ci),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ai),Gi.copy(t.boundingSphere).applyMatrix4(ai),this.boundingSphere.union(Gi)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=t*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(t,e){const i=this.matrixWorld,r=this.count;if(Hi.geometry=this.geometry,Hi.material=this.material,Hi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gi.copy(this.boundingSphere),Gi.applyMatrix4(i),t.ray.intersectsSphere(Gi)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ai),Ll.multiplyMatrices(i,ai),Hi.matrixWorld=Ll,Hi.raycast(t,Lr);for(let o=0,a=Lr.length;o<a;o++){const l=Lr[o];l.instanceId=s,l.object=this,e.push(l)}Lr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Pl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new nu(new Float32Array(r*this.count),r,this.count,aa,Ze));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*t;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class mn extends sr{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Qr=new P,ts=new P,Il=new Wt,Vi=new ha,Dr=new Ci,Ys=new P,Ul=new P;class ga extends ye{constructor(t=new se,e=new mn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)Qr.fromBufferAttribute(e,r-1),ts.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=Qr.distanceTo(ts);t.setAttribute("lineDistance",new Zt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Dr.copy(i.boundingSphere),Dr.applyMatrix4(r),Dr.radius+=s,t.ray.intersectsSphere(Dr)===!1)return;Il.copy(r).invert(),Vi.copy(t.ray).applyMatrix4(Il);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,p=g-1;_<p;_+=c){const m=h.getX(_),A=h.getX(_+1),v=Ir(this,t,Vi,l,m,A);v&&e.push(v)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(d),m=Ir(this,t,Vi,l,_,p);m&&e.push(m)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,p=g-1;_<p;_+=c){const m=Ir(this,t,Vi,l,_,_+1);m&&e.push(m)}if(this.isLineLoop){const _=Ir(this,t,Vi,l,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ir(n,t,e,i,r,s){const o=n.geometry.attributes.position;if(Qr.fromBufferAttribute(o,r),ts.fromBufferAttribute(o,s),e.distanceSqToSegment(Qr,ts,Ys,Ul)>i)return;Ys.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ys);if(!(l<t.near||l>t.far))return{distance:l,point:Ul.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const Nl=new P,Fl=new P;class Li extends ga{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)Nl.fromBufferAttribute(e,r),Fl.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Nl.distanceTo(Fl);t.setAttribute("lineDistance",new Zt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class iu extends ga{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class qg extends pe{constructor(t,e,i,r,s,o,a,l,c){super(t,e,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ke{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let r=0;const s=i.length;let o;e?o=e:o=t*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const h=i[r],f=i[r+1]-h,d=(o-h)/f;return(r+d)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new pt:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new P,r=[],s=[],o=[],a=new P,l=new Wt;for(let d=0;d<=t;d++){const g=d/t;r[d]=this.getTangentAt(g,new P)}s[0]=new P,o[0]=new P;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ve(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(e===!0){let d=Math.acos(ve(s[0].dot(s[t]),-1,1));d/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class _a extends Ke{constructor(t=0,e=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new pt){const i=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Yg extends _a{constructor(t,e,i,r,s,o){super(t,e,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function va(){let n=0,t=0,e=0,i=0;function r(s,o,a,l){n=s,t=a,e=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let f=(o-s)/c-(a-s)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,r(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return n+t*s+e*o+i*a}}}const Ur=new P,$s=new va,Zs=new va,Ks=new va;class ru extends Ke{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new P){const i=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(Ur.subVectors(r[0],r[1]).add(r[0]),c=Ur);const u=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(Ur.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=Ur),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),$s.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,_,p),Zs.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,_,p),Ks.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&($s.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Zs.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Ks.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return i.set($s.calc(l),Zs.calc(l),Ks.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new P().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ol(n,t,e,i,r){const s=(i-t)*.5,o=(r-e)*.5,a=n*n,l=n*a;return(2*e-2*i+s+o)*l+(-3*e+3*i-2*s-o)*a+s*n+e}function $g(n,t){const e=1-n;return e*e*t}function Zg(n,t){return 2*(1-n)*n*t}function Kg(n,t){return n*n*t}function Yi(n,t,e,i){return $g(n,t)+Zg(n,e)+Kg(n,i)}function Jg(n,t){const e=1-n;return e*e*e*t}function jg(n,t){const e=1-n;return 3*e*e*n*t}function Qg(n,t){return 3*(1-n)*n*n*t}function t_(n,t){return n*n*n*t}function $i(n,t,e,i,r){return Jg(n,t)+jg(n,e)+Qg(n,i)+t_(n,r)}class su extends Ke{constructor(t=new pt,e=new pt,i=new pt,r=new pt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new pt){const i=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set($i(t,r.x,s.x,o.x,a.x),$i(t,r.y,s.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class e_ extends Ke{constructor(t=new P,e=new P,i=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new P){const i=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set($i(t,r.x,s.x,o.x,a.x),$i(t,r.y,s.y,o.y,a.y),$i(t,r.z,s.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ou extends Ke{constructor(t=new pt,e=new pt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new pt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new pt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class n_ extends Ke{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class au extends Ke{constructor(t=new pt,e=new pt,i=new pt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new pt){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(Yi(t,r.x,s.x,o.x),Yi(t,r.y,s.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class i_ extends Ke{constructor(t=new P,e=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new P){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(Yi(t,r.x,s.x,o.x),Yi(t,r.y,s.y,o.y),Yi(t,r.z,s.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class lu extends Ke{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new pt){const i=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return i.set(Ol(a,l.x,c.x,h.x,u.x),Ol(a,l.y,c.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new pt().fromArray(r))}return this}}var Bl=Object.freeze({__proto__:null,ArcCurve:Yg,CatmullRomCurve3:ru,CubicBezierCurve:su,CubicBezierCurve3:e_,EllipseCurve:_a,LineCurve:ou,LineCurve3:n_,QuadraticBezierCurve:au,QuadraticBezierCurve3:i_,SplineCurve:lu});class r_ extends Ke{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Bl[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(new Bl[r.type]().fromJSON(r))}return this}}class zl extends r_{constructor(t){super(),this.type="Path",this.currentPoint=new pt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new ou(this.currentPoint.clone(),new pt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){const s=new au(this.currentPoint.clone(),new pt(t,e),new pt(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,s,o){const a=new su(this.currentPoint.clone(),new pt(t,e),new pt(i,r),new pt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new lu(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,r,s,o),this}absarc(t,e,i,r,s,o){return this.absellipse(t,e,i,i,r,s,o),this}ellipse(t,e,i,r,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,r,s,o,a,l),this}absellipse(t,e,i,r,s,o,a,l){const c=new _a(t,e,i,r,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ar extends se{constructor(t=1,e=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:r},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new P,h=new pt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=i+u/e*r;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Zt(o,3)),this.setAttribute("normal",new Zt(a,3)),this.setAttribute("uv",new Zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ar(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class cu extends zl{constructor(t){super(t),this.uuid=wi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,r=this.holes.length;i<r;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(new zl().fromJSON(r))}return this}}const s_={triangulate:function(n,t,e=2){const i=t&&t.length,r=i?t[0]*e:n.length;let s=uu(n,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,f,d;if(i&&(s=u_(n,t,s,e)),n.length>80*e){a=c=n[0],l=h=n[1];for(let g=e;g<r;g+=e)u=n[g],f=n[g+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-a,h-l),d=d!==0?32767/d:0}return ji(s,o,e,a,l,d,0),o}};function uu(n,t,e,i,r){let s,o;if(r===S_(n,t,e,i)>0)for(s=t;s<e;s+=i)o=Hl(s,n[s],n[s+1],o);else for(s=e-i;s>=t;s-=i)o=Hl(s,n[s],n[s+1],o);return o&&cs(o,o.next)&&(tr(o),o=o.next),o}function Xn(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(cs(e,e.next)||ie(e.prev,e,e.next)===0)){if(tr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function ji(n,t,e,i,r,s,o){if(!n)return;!o&&s&&m_(n,i,r,s);let a=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,s?a_(n,i,r,s):o_(n)){t.push(l.i/e|0),t.push(n.i/e|0),t.push(c.i/e|0),tr(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=l_(Xn(n),t,e),ji(n,t,e,i,r,s,2)):o===2&&c_(n,t,e,i,r,s):ji(Xn(n),t,e,i,r,s,1);break}}}function o_(n){const t=n.prev,e=n,i=n.next;if(ie(t,e,i)>=0)return!1;const r=t.x,s=e.x,o=i.x,a=t.y,l=e.y,c=i.y,h=r<s?r<o?r:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,f=r>s?r>o?r:o:s>o?s:o,d=a>l?a>c?a:c:l>c?l:c;let g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&hi(r,a,s,l,o,c,g.x,g.y)&&ie(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function a_(n,t,e,i){const r=n.prev,s=n,o=n.next;if(ie(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,g=h<u?h<f?h:f:u<f?u:f,_=a>l?a>c?a:c:l>c?l:c,p=h>u?h>f?h:f:u>f?u:f,m=qo(d,g,t,e,i),A=qo(_,p,t,e,i);let v=n.prevZ,x=n.nextZ;for(;v&&v.z>=m&&x&&x.z<=A;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=p&&v!==r&&v!==o&&hi(a,h,l,u,c,f,v.x,v.y)&&ie(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=p&&x!==r&&x!==o&&hi(a,h,l,u,c,f,x.x,x.y)&&ie(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=m;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=p&&v!==r&&v!==o&&hi(a,h,l,u,c,f,v.x,v.y)&&ie(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=A;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=p&&x!==r&&x!==o&&hi(a,h,l,u,c,f,x.x,x.y)&&ie(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function l_(n,t,e){let i=n;do{const r=i.prev,s=i.next.next;!cs(r,s)&&hu(r,i,i.next,s)&&Qi(r,s)&&Qi(s,r)&&(t.push(r.i/e|0),t.push(i.i/e|0),t.push(s.i/e|0),tr(i),tr(i.next),i=n=s),i=i.next}while(i!==n);return Xn(i)}function c_(n,t,e,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&v_(o,a)){let l=fu(o,a);o=Xn(o,o.next),l=Xn(l,l.next),ji(o,t,e,i,r,s,0),ji(l,t,e,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function u_(n,t,e,i){const r=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*i,l=s<o-1?t[s+1]*i:n.length,c=uu(n,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(__(c));for(r.sort(h_),s=0;s<r.length;s++)e=f_(r[s],e);return e}function h_(n,t){return n.x-t.x}function f_(n,t){const e=d_(n,t);if(!e)return t;const i=fu(e,n);return Xn(i,i.next),Xn(e,e.next)}function d_(n,t){let e=t,i=-1/0,r;const s=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=s&&f>i&&(i=f,r=e.x<e.next.x?e:e.next,f===s))return r}e=e.next}while(e!==t);if(!r)return null;const a=r,l=r.x,c=r.y;let h=1/0,u;e=r;do s>=e.x&&e.x>=l&&s!==e.x&&hi(o<c?s:i,o,l,c,o<c?i:s,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(s-e.x),Qi(e,n)&&(u<h||u===h&&(e.x>r.x||e.x===r.x&&p_(r,e)))&&(r=e,h=u)),e=e.next;while(e!==a);return r}function p_(n,t){return ie(n.prev,n,t.prev)<0&&ie(t.next,n,n.next)<0}function m_(n,t,e,i){let r=n;do r.z===0&&(r.z=qo(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,g_(r)}function g_(n){let t,e,i,r,s,o,a,l,c=1;do{for(e=n,n=null,s=null,o=0;e;){for(o++,i=e,a=0,t=0;t<c&&(a++,i=i.nextZ,!!i);t++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||e.z<=i.z)?(r=e,e=e.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;e=i}s.nextZ=null,c*=2}while(o>1);return n}function qo(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function __(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function hi(n,t,e,i,r,s,o,a){return(r-o)*(t-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(i-a)}function v_(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!x_(n,t)&&(Qi(n,t)&&Qi(t,n)&&M_(n,t)&&(ie(n.prev,n,t.prev)||ie(n,t.prev,t))||cs(n,t)&&ie(n.prev,n,n.next)>0&&ie(t.prev,t,t.next)>0)}function ie(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function cs(n,t){return n.x===t.x&&n.y===t.y}function hu(n,t,e,i){const r=Fr(ie(n,t,e)),s=Fr(ie(n,t,i)),o=Fr(ie(e,i,n)),a=Fr(ie(e,i,t));return!!(r!==s&&o!==a||r===0&&Nr(n,e,t)||s===0&&Nr(n,i,t)||o===0&&Nr(e,n,i)||a===0&&Nr(e,t,i))}function Nr(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Fr(n){return n>0?1:n<0?-1:0}function x_(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&hu(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Qi(n,t){return ie(n.prev,n,n.next)<0?ie(n,t,n.next)>=0&&ie(n,n.prev,t)>=0:ie(n,t,n.prev)<0||ie(n,n.next,t)<0}function M_(n,t){let e=n,i=!1;const r=(n.x+t.x)/2,s=(n.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function fu(n,t){const e=new Yo(n.i,n.x,n.y),i=new Yo(t.i,t.x,t.y),r=n.next,s=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,s.next=i,i.prev=s,i}function Hl(n,t,e,i){const r=new Yo(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function tr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Yo(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function S_(n,t,e,i){let r=0;for(let s=t,o=e-i;s<e;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}class Zi{static area(t){const e=t.length;let i=0;for(let r=e-1,s=0;s<e;r=s++)i+=t[r].x*t[s].y-t[s].x*t[r].y;return i*.5}static isClockWise(t){return Zi.area(t)<0}static triangulateShape(t,e){const i=[],r=[],s=[];Gl(t),Vl(i,t);let o=t.length;e.forEach(Gl);for(let l=0;l<e.length;l++)r.push(o),o+=e[l].length,Vl(i,e[l]);const a=s_.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Gl(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Vl(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class us extends se{constructor(t=new cu([new pt(0,.5),new pt(-.5,-.5),new pt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new Zt(r,3)),this.setAttribute("normal",new Zt(s,3)),this.setAttribute("uv",new Zt(o,2));function c(h){const u=r.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;Zi.isClockWise(d)===!1&&(d=d.reverse());for(let p=0,m=g.length;p<m;p++){const A=g[p];Zi.isClockWise(A)===!0&&(g[p]=A.reverse())}const _=Zi.triangulateShape(d,g);for(let p=0,m=g.length;p<m;p++){const A=g[p];d=d.concat(A)}for(let p=0,m=d.length;p<m;p++){const A=d[p];r.push(A.x,A.y,0),s.push(0,0,1),o.push(A.x,A.y)}for(let p=0,m=_.length;p<m;p++){const A=_[p],v=A[0]+u,x=A[1]+u,D=A[2]+u;i.push(v,x,D),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return y_(e,t)}static fromJSON(t,e){const i=[];for(let r=0,s=t.shapes.length;r<s;r++){const o=e[t.shapes[r]];i.push(o)}return new us(i,t.curveSegments)}}function y_(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const r=n[e];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t}class E_ extends Me{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class du extends mn{static get type(){return"LineDashedMaterial"}constructor(t){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class T_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=kl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=kl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function kl(){return performance.now()}const Wl=new Wt;class b_{constructor(t,e,i=0,r=1/0){this.ray=new ha(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new fa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Wl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wl),this}intersectObject(t,e=!0,i=[]){return $o(t,this,i,e),i.sort(Xl),i}intersectObjects(t,e=!0,i=[]){for(let r=0,s=t.length;r<s;r++)$o(t[r],this,i,e);return i.sort(Xl),i}}function Xl(n,t){return n.distance-t.distance}function $o(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)$o(s[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ia}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ia);const A_=12,ql=190,w_=48,C_=8,R_=64,pu=.5,mu=.02,P_=.012,L_=12;function Zo(n){return n.length===3}function Yl(n,t,e=Math.max(n[1],n[2])){const[i,r,s]=n,o=Math.max(1,Math.min(i,A_)),a=_=>G_(ql*Math.sqrt(_/Math.max(e,1)),w_,ql),l=a(s),c=a(r),h=o>1?Math.min(C_,R_/(o-1)):0,u=h*(o-1),f=t-(l+u)/2,d=-(c+u)/2,g=Array.from({length:o},(_,p)=>{const m=o-1-p;return{left:f+m*h,bottom:d+m*h,width:l,height:c}});return{channels:i,mapHeight:r,mapWidth:s,slabs:g}}function er(n){return n.slabs[n.slabs.length-1]}function D_(n,t){return pu+(n.slabs.length-1-t)*mu}function Ko(n,t,e,i){const r=n.slabs[n.slabs.length-1-t];return[...B_(r,n.mapHeight,n.mapWidth,e,i),D_(n,t)+P_]}function I_(n){const t=er(n),e=n.slabs[0];return(e.bottom+e.height-t.bottom)/2}function U_(n){const t=er(n),e=Math.min(L_,Math.max(n.mapHeight,2)),i=t.height*.1,r=t.height-i*2;return Array.from({length:e},(s,o)=>t.bottom+t.height-i-r*o/(e-1))}function N_(n,t,e){const i=(l,c)=>Array.isArray(l)?[Number(l[0]),Number(l[1]??l[0])]:typeof l=="number"?[l,l]:[c,c];if(n.kernel_size===void 0&&t&&e){const l=(u,f)=>u/Math.max(f,1),[c,h]=[l(t.mapHeight,e.mapHeight),l(t.mapWidth,e.mapWidth)];return{kernel:[Math.ceil(c),Math.ceil(h)],stride:[Math.floor(c),Math.floor(h)],padding:[0,0]}}const r=i(n.kernel_size,1),s=i(n.stride,1),o=n.padding,a=o==="same"?[Math.floor((r[0]-1)/2),Math.floor((r[1]-1)/2)]:o==="valid"||o===void 0?[0,0]:i(o,0);return{kernel:r,stride:s,padding:a}}const F_=480,Js=3;function O_(n,t,e){const i=$l(e.kernel[0]),r=$l(e.kernel[1]),s=Math.max(1,Math.floor(F_/(i.length*r.length))),o=Math.max(1,Math.ceil(Math.sqrt(t.mapHeight*t.mapWidth/s))),a=Math.floor((t.mapHeight-1)%o/2),l=Math.floor((t.mapWidth-1)%o/2),c=[];let h=0;for(let u=a;u<t.mapHeight;u+=o)for(let f=l;f<t.mapWidth;f+=o){const d=Ko(t,h%t.slabs.length,u,f);for(const g of i)for(const _ of r){const p=u*e.stride[0]-e.padding[0]+g,m=f*e.stride[1]-e.padding[1]+_;p<0||p>=n.mapHeight||m<0||m>=n.mapWidth||c.push([Ko(n,(h+c.length)%n.slabs.length,p,m),d])}h+=1}return c}function $l(n){return n<=Js?Array.from({length:n},(t,e)=>e):Array.from({length:Js},(t,e)=>Math.round(e*(n-1)/(Js-1)))}function B_(n,t,e,i,r){return[n.left+(r+.5)/e*n.width,n.bottom+n.height-(i+.5)/t*n.height]}const Zl=32;function z_(n,t,e){const i=[],r=n.bottom+n.height,s=n.left+n.width,o=Math.ceil(t/Zl),a=Math.ceil(e/Zl);for(let l=o;l<t;l+=o){const c=r-l/t*n.height;i.push([n.left,c,s,c])}for(let l=a;l<e;l+=a){const c=n.left+l/e*n.width;i.push([c,n.bottom,c,r])}return i}function gu(n,t,e){const i=n.mapHeight*n.mapWidth,r=t%i,s=Math.floor(t/i),o=n.slabs.length,a=(e==null?void 0:e.indexOf(s))??-1,l=a>=0&&a<o?a:e?Math.min(o-1,Math.floor(s*o/Math.max(n.channels,1))):s%o;return Ko(n,l,Math.floor(r/n.mapWidth),r%n.mapWidth)}function H_(n){const t=Uint8Array.from(atob(n.data),i=>i.charCodeAt(0)),e=n.height*n.width;return n.channels.map((i,r)=>t.subarray(r*e,(r+1)*e))}function G_(n,t,e){return Math.min(e,Math.max(t,n))}const es=64,_u=12,V_=28,k_=210,Kl=300,on=12,li=32,Or=56,Jo=3,Jl=125,js=100,W_=30,X_=new Set(["activation","dropout","flatten","reshape","norm","add","concat","output"]),ns=40,q_=.75,Y_=new Set(["add","concat"]);function qi(n){return X_.has(n.type)}const vu=n=>n.reduce((t,e)=>t*e,1);function Br(n,t){return Zo(n.output_shape)?n.type!=="input"||t!==void 0&&Zo(t.output_shape):!1}function $_(n){if(n.output_shape.length>0)return vu(n.output_shape);const t=n.params.out_features;return typeof t=="number"?t:1}function jl(n,t=es,e=_u){if(n<=t){const o=(n-1)*e/2;return{slots:Array.from({length:n},(a,l)=>o-l*e),ellipsisY:null}}const i=Math.floor(t/2),r=(t-1+Jo)*e,s=[];for(let o=0;o<t;o+=1){const a=o<i?o:o+Jo;s.push(r/2-a*e)}return{slots:s,ellipsisY:(s[i-1]+s[i])/2}}function Z_(n){return n>es?es-1+Jo:Math.max(n-1,1)}function jo(n,t,e){return Math.min(e-1,Math.floor(n*e/Math.max(t,1)))}function xu(n){const t=n.nodes.filter(F=>!qi(F)),e=Math.max(1,...n.nodes.filter(F=>Zo(F.output_shape)).flatMap(F=>F.output_shape.slice(1))),i=[],r=[[]];for(const F of n.nodes)qi(F)?r[r.length-1].push(F):r.push([]);const s={left:0,right:0,top:0,bottom:0},o=new Map;for(const F of n.nodes){const q=n.edges.filter(et=>et.target===F.id).map(et=>o.get(et.source)??0);o.set(F.id,Math.max(0,...q)+(qi(F)||q.length===0?0:1))}const a=[];t.forEach((F,q)=>{const et=t[q-1],ct=et!==void 0&&n.edges.length>0&&o.get(F.id)===o.get(et.id)&&r[q].length===0&&!Br(F,t[q+1])&&!Br(et,F);a.push(q===0?0:a[q-1]+(ct?0:1))});const l=F=>t.flatMap((q,et)=>a[et]===a[F]?[et]:[]),c=(a[a.length-1]??-1)+1,h=t.map((F,q)=>{if(!Br(F,t[q+1]))return 0;const et=Yl(F.output_shape,0,e);return-er(et).left+W_}),u=[0];for(let F=1;F<t.length;F+=1){if(a[F]===a[F-1]){u.push(u[F-1]);continue}const q=h[F-1]+h[F]+r[F].length*js;u.push(u[F-1]+Math.max(Kl,q))}for(const F of t){const q=$_(F),et=i.length,ct=u[et];if(Br(F,t[et+1])){const H=Yl(F.output_shape,ct,e),Y=er(H),st=U_(H);i.push({node:F,index:et,x:ct,units:q,slots:st,ellipsisY:null,maps:H,entryX:Y.left,exitX:Y.left+Y.width,panel:s})}else{const{slots:H,ellipsisY:Y}=jl(q);i.push({node:F,index:et,x:ct,units:q,slots:H,ellipsisY:Y,maps:null,entryX:ct,exitX:ct,panel:s})}}const f=Or/2+li,d=Math.max(...i.map((F,q)=>{const et=l(q).length,ct=F.maps?I_(F.maps):Math.max(...F.slots.map(Math.abs));return et*(ct+f)+(et-1)*on/2-f})),g=Math.max(k_,d),_=g+li+Or,p=F=>{const q=l(F),et=(_+g+li-(q.length-1)*on)/q.length,ct=_-q.indexOf(F)*(et+on),H=(et-Or)/2-li;return{top:ct,bottom:ct-et,middle:ct-Or-li-H,extent:H}};i.forEach((F,q)=>{if(F.maps)return;const{middle:et,extent:ct}=p(q),H=ct*2*.85/Z_(F.units),Y=Math.min(V_,Math.max(_u,H)),{slots:st,ellipsisY:rt}=jl(F.units,es,Y);Object.assign(F,{slots:st.map(St=>St+et),ellipsisY:rt===null?null:rt+et})});const m=[],A=[],v=g+li/2,x=(F,q)=>i[F].x+q*Math.max(Kl/2,h[F]);r.forEach((F,q)=>{const et=i[q-1],ct=i[q],H=et?ct?et.x+h[q-1]:x(q-1,1):0;A[q]=F.map((Y,st)=>{const rt=ct?H+(st+1)/(F.length+1)*(ct.x-h[q]-H):H+Jl/2+st*Jl,St=Y_.has(Y.type)?"merge":Y.type==="flatten"&&(et!=null&&et.maps)?"flatten":"plain";return{node:Y,x:rt,halfHeight:v,kind:St,stripHalfHeight:St==="flatten"?g*q_:0}}),m.push(...A[q])});const D=F=>{const q=A[F+1];if(q.length>0)return[q[0].x-js/2,q[q.length-1].x+js/2];const et=(i[F].x+i[F+1].x)/2;return[et-on/2,et+on/2]};i.forEach((F,q)=>{const et=l(q),[ct,H]=[et[0],et[et.length-1]],{top:Y,bottom:st}=p(q);F.panel={left:i[ct-1]?D(ct-1)[1]:x(ct,-1)+on/2,right:i[H+1]?D(H)[0]:x(H,1)-on/2,top:Y,bottom:st}});const T=new Map(n.nodes.map((F,q)=>[F.id,q])),b=new Map(n.nodes.map(F=>[F.id,F])),R=new Set(n.edges.map(F=>`${F.source}>${F.target}`)),y=new Map(m.map(F=>[F.node.id,F])),S=(F,q)=>{if(n.edges.length===0)return n.nodes.slice(T.get(F.id)+1,T.get(q.id));for(const et of n.edges.filter(ct=>ct.source===F.id)){if(et.target===q.id)return[];const ct=b.get(et.target),H=ct&&qi(ct)?S(ct,q):null;if(ct&&H)return[ct,...H]}return null},C=(F,q)=>n.nodes.slice(T.get(F.id)+1,q?T.get(q.id):void 0).flatMap(et=>y.get(et.id)??[]),z=F=>c>2?a[F]/(c-2):0,O=new Set,X=[];i.forEach((F,q)=>{for(const et of i.filter((ct,H)=>a[H]===a[q]+1)){const ct=S(F.node,et.node);if(!ct)continue;const H=[F.node,...ct,et.node];for(let Y=1;Y<H.length;Y+=1)O.add(`${H[Y-1].id}>${H[Y].id}`);X.push({from:F,to:et,t:z(q),through:ct.flatMap(Y=>y.get(Y.id)??[]).filter(Y=>Y.kind!=="plain")})}});const K=Math.min(...i.map(F=>F.panel.bottom),0),$=K_(n,T,i,m,K,O),Q=new Set($.map(F=>F.source.id)),k=[];i.forEach((F,q)=>{var Y;if(X.some(st=>st.from===F))return;const et=[];let ct=F.node;for(const st of C(F.node,(Y=i[q+1])==null?void 0:Y.node)){if(!R.has(`${ct.id}>${st.node.id}`))break;et.push(st),ct=st.node}const H=et.find(st=>st.kind==="merge")??[...et].reverse().find(st=>Q.has(st.node.id));H&&k.push({from:F,to:H,t:z(Math.max(0,q-1))})});const ot=[...i.flatMap(F=>[F.panel.left,F.panel.right]),...m.map(F=>F.x)];return{columns:i,bands:m,links:X,stubs:k,arcs:$,bounds:{left:Math.min(...ot,0),right:Math.max(...ot,0),top:Math.max(...i.map(F=>F.panel.top),0),bottom:Math.min(K,...$.map(F=>F.laneY-ns/2))}}}function K_(n,t,e,i,r,s){const o=new Map;for(const d of e)o.set(d.node.id,{end:{column:d},x:d.x});for(const d of i)o.set(d.node.id,{end:{band:d},x:d.x});const a=n.edges.filter(d=>{const g=t.get(d.source),_=t.get(d.target);return s.has(`${d.source}>${d.target}`)?!1:g!==void 0&&_!==void 0&&_!==g+1&&o.has(d.source)&&o.has(d.target)}),l=Math.min(...e.map(d=>d.x)),c=Math.max(...e.map(d=>d.x)),h=new Map(n.nodes.map(d=>[d.id,d])),u=a.map(d=>{const g=o.get(d.source),_=o.get(d.target),p=c>l?(_.x-l)/(c-l):0;return{source:h.get(d.source),target:h.get(d.target),start:g.end,end:_.end,x0:g.x,x1:_.x,laneY:0,t:p,tensorShape:d.tensor_shape}}),f=[];for(const d of[...u].sort((g,_)=>Math.abs(g.x1-g.x0)-Math.abs(_.x1-_.x0))){const[g,_]=[Math.min(d.x0,d.x1),Math.max(d.x0,d.x1)];let p=f.findIndex(m=>m.every(([A,v])=>_<A||g>v));p===-1&&(p=f.push([])-1),f[p].push([g,_]),d.laneY=r-ns*(p+1)}return u}function J_(n,t){const e=n.from.slots.length,i=n.to.slots.length;if(!t||t.pairs.length===0){const c=[];for(let h=0;h<e;h+=1)for(let u=0;u<i;u+=1)c.push([h,u]);return{pairs:c,strength:c.map(()=>1)}}const r=n.to.node.input_shape.length>0?vu(n.to.node.input_shape):n.from.units,s=new Map;for(const[c,h,u]of t.pairs){const f=jo(c,r,e)*i+jo(h,n.to.units,i);s.set(f,Math.max(s.get(f)??0,Math.abs(u)))}const o=Math.max(...s.values())||1,a=[],l=[];for(const[c,h]of s)a.push([Math.floor(c/i),c%i]),l.push(.25+.75*(h/o));return{pairs:a,strength:l}}const j_={width:260,height:180},Q_={width:400,height:280},Ql={width:170,height:76},tv=150,tc=56,ev=48,nv=5,ec=700,iv=160,rv={width:170,height:180},sv=.6,ov=90,Mu=24,av=7,lv=260,cv={items:[],links:[],arcs:[]};function is(n){return n.groups.some(t=>t.parent===null)}function xa(n,t){return Su(n,t.group)}function Su(n,t){const e=new Map(n.groups.map(r=>[r.id,r]));let i=t?e.get(t):void 0;for(;i!=null&&i.parent;)i=e.get(i.parent);return i??null}function yu(n,t){var A;const e=n.groups.find(v=>v.id===t);if(!e)throw new Error(`unknown group ${t}`);const i=n.nodes.filter(v=>{var x;return((x=xa(n,v))==null?void 0:x.id)===t}),r=n.groups.filter(v=>{var x;return v.id!==t&&((x=Su(n,v.id))==null?void 0:x.id)===t}).map(v=>v.parent===t?{...v,parent:null}:v),s=new Set(i.map(v=>v.id)),o=n.edges.filter(v=>s.has(v.source)&&s.has(v.target)),a=i[0],l=i[i.length-1],c={},h=new Map(n.nodes.map(v=>[v.id,v])),u=v=>uv(n,h.get(v)),f=[],d=[],g=n.edges.filter(v=>!s.has(v.source)&&s.has(v.target));for(const v of new Set(g.map(x=>u(x.source)))){const x=g.filter(y=>u(y.source)===v);if(x.every(y=>h.get(y.target).type==="input")){for(const y of x)nc(i,y.target,`from ${v}`,v);continue}const T=x[0].tensor_shape,b=zr(`${t}::from:${v}`,"input","Input",T,{context:`from ${v}`,contextName:v,outside:!0});for(const y of new Set(x.map(S=>S.target)))o.push({source:b.id,target:y,tensor_shape:T,label:null});const R=(A=n.feature_maps)==null?void 0:A[x[0].source];R&&(c[b.id]=R),f.push(b)}if(g.length===0&&a&&a.type!=="input"){const v=zr(`${t}::input`,"input","Input",a.input_shape);o.unshift({source:v.id,target:a.id,tensor_shape:a.input_shape,label:null}),f.push(v)}const _=n.edges.filter(v=>s.has(v.source)&&!s.has(v.target));for(const v of new Set(_.map(x=>u(x.target)))){const x=_.filter(b=>u(b.target)===v);if(x.every(b=>h.get(b.source).type==="output")){for(const b of x)nc(i,b.source,`to ${v}`,v);continue}const D=x[0].tensor_shape,T=zr(`${t}::to:${v}`,"output","Output",D,{context:`to ${v}`,contextName:v,outside:!0});for(const b of new Set(x.map(R=>R.source)))o.push({source:b,target:T.id,tensor_shape:D,label:null});d.push(T)}if(_.length===0&&l&&l.type!=="output"){const v=zr(`${t}::output`,"output","Output",l.output_shape);o.push({source:l.id,target:v.id,tensor_shape:l.output_shape,label:null}),d.push(v)}i.unshift(...f),i.push(...d);const p=Object.fromEntries(Object.entries(n.weights??{}).filter(([v])=>s.has(v))),m={...c,...Object.fromEntries(Object.entries(n.feature_maps??{}).filter(([v])=>s.has(v)))};return{schema_version:n.schema_version,model:{name:e.label,framework:e.framework??n.model.framework,total_params:i.reduce((v,x)=>v+x.param_count,0)},nodes:i,edges:o,groups:r,weights:Object.keys(p).length>0?p:null,feature_maps:Object.keys(m).length>0?m:null}}function Ne(n){return n.params.outside===!0}function uv(n,t){const e=t.params.contextName;if(typeof e=="string")return e;const i=xa(n,t);return i?i.label:t.type==="custom"||t.type==="input"||t.type==="output"?t.label:t.id.split("/").pop()??t.id}function nc(n,t,e,i){const r=n.findIndex(s=>s.id===t);r>=0&&(n[r]={...n[r],params:{...n[r].params,context:e,contextName:i}})}function Eu(n){const t=[],e=new Map;for(const T of n.nodes){const b=xa(n,T),R=b?`group:${b.id}`:`node:${T.id}`;let y=t.find(S=>S.id===R);y||(y=b?hv(n,b,R):fv(T,R),t.push(y)),e.set(T.id,y)}const i=[];for(const T of n.edges){const b=e.get(T.source),R=e.get(T.target);!b||!R||b===R||i.some(y=>y.from===b&&y.to===R)||i.push({from:b,to:R,label:T.label,shape:T.tensor_shape,back:!1,via:[],outShare:[0,1],inShare:[0,1]})}const r=new Set,s=new Set,o=T=>{s.add(T),r.add(T);for(const b of i.filter(R=>R.from===T))r.has(b.to)?b.back=!0:s.has(b.to)||o(b.to);r.delete(T)};for(const T of t)s.has(T)||o(T);const a=i.filter(T=>!T.back),l=new Map(t.map(T=>[T,0]));for(const T of a)l.set(T.to,l.get(T.to)+1);const c=t.filter(T=>l.get(T)===0);for(;c.length>0;){const T=c.shift();for(const b of a.filter(R=>R.from===T))b.to.rank=Math.max(b.to.rank,T.rank+1),l.set(b.to,l.get(b.to)-1),l.get(b.to)===0&&c.push(b.to)}const h=Math.max(...t.map(T=>T.rank))+1,u=Array.from({length:h},()=>[]);for(const T of t)u[T.rank].push(T);const f=new Map,d=[];for(const T of a){const b=Array.from({length:T.to.rank-T.from.rank-1},(y,S)=>({rank:T.from.rank+S+1,x:0,y:0,width:0,height:Mu}));for(const y of b)u[y.rank].push(y);f.set(T,b);const R=[T.from,...b,T.to];for(let y=1;y<R.length;y+=1)d.push({from:R[y-1],to:R[y]})}const g=new Map;u.forEach((T,b)=>{if(b>0){const R=y=>{const S=d.filter(C=>C.to===y).map(C=>g.get(C.from)??0);return S.length>0?S.reduce((C,z)=>C+z,0)/S.length:1/0};T.sort((y,S)=>R(y)-R(S))}T.forEach((R,y)=>g.set(R,y-(T.length-1)/2))});let _=0;const p=[];for(const T of u){const b=Math.max(...T.map(S=>S.width));let y=(T.reduce((S,C)=>S+C.height,0)+tc*(T.length-1))/2;for(const S of T)S.x=_+b/2,S.y=y-S.height/2,y-=S.height+tc;p.push(b),_+=b+tv}for(const[T,b]of f)T.via=b.flatMap(({rank:R,x:y,y:S})=>[{x:y-p[R]/2,y:S},{x:y+p[R]/2,y:S}]);const m=(T,b)=>T.back?-1/0:b==="out"?(T.via[0]??T.to).y:(T.via[T.via.length-1]??T.from).y;for(const T of t)for(const b of["out","in"]){const R=i.filter(y=>(b==="out"?y.from:y.to)===T);R.sort((y,S)=>m(y,b)===m(S,b)?0:m(S,b)>m(y,b)?1:-1),R.forEach((y,S)=>y[b==="out"?"outShare":"inShare"]=[S/R.length,(S+1)/R.length])}for(const T of t.filter(b=>Ne(b.node)))T.x+=T.node.type==="input"?-ec:ec;const A=t.filter(T=>!Ne(T.node)),v=A.length>0?A:t,x=T=>t.some(b=>Ne(b.node)&&b.node.type===T)?iv:0,D=[...v,...[...f.values()].flat()];return{cards:t,links:i,bounds:{left:Math.min(...v.map(T=>T.x-T.width/2))-x("input"),right:Math.max(...v.map(T=>T.x+T.width/2))+x("output"),top:Math.max(...D.map(T=>T.y+T.height/2)),bottom:Math.min(...D.map(T=>T.y-T.height/2))-(a.length<i.length?ov:0)}}}function Tu(n){return n.length===0?0:Math.min(n.reduce((t,e)=>t*e,1),ev)}function Si(n,t,[e,i]=[0,1]){const r=t.height*sv,s=Math.min((n-1)*nv,r*(i-e)),o=t.y+r*(.5-(e+i)/2),a=n>1?s/(n-1):0;return Array.from({length:n},(l,c)=>o+s/2-c*a)}function hv(n,t,e){var l;const i=yu(n,t.id),r=i.nodes.filter(c=>c.type!=="input"&&c.type!=="output"),s=((l=i.nodes[0])==null?void 0:l.output_shape)??[],o=i.nodes[i.nodes.length-1],a=o?o.output_shape.length>0?o.output_shape:o.input_shape:[];return{id:e,kind:"network",group:t,node:{id:t.label,type:"custom",label:"Network",group:null,input_shape:s,output_shape:a,params:{},param_count:i.model.total_params,activation:null,notes:null},inputShape:s,outputShape:a,paramCount:i.model.total_params,layerCount:r.length,partCount:i.groups.filter(c=>c.parent===null).length,miniature:is(i)?pv(i):dv(i),rank:0,x:0,y:0,...is(i)?Q_:j_}}function fv(n,t){const e=n.params.description,i=typeof e=="string"?e.length*av+28:0,r=Ma(n)?rv:{...Ql,width:Math.min(lv,Math.max(Ql.width,i))};return{id:t,kind:"node",group:null,node:n,inputShape:n.input_shape,outputShape:n.output_shape,paramCount:n.param_count,layerCount:0,partCount:0,miniature:mv(n),rank:0,x:0,y:0,...r}}function Ma(n){return n.type!=="custom"&&n.type!=="input"&&n.type!=="output"}function zr(n,t,e,i,r={}){return{id:n,type:t,label:e,group:null,input_shape:i,output_shape:i,params:r,param_count:0,activation:null,notes:null}}function dv(n){const t=xu(n),e=[...t.columns.map(g=>g.x),...t.bands.filter(g=>g.kind==="merge").map(g=>g.x)],[i,r]=[Math.min(...e),Math.max(...e)],s=g=>r>i?(g-i)/(r-i):.5,o=Math.max(1,...t.columns.map(g=>g.maps?g.maps.slabs[0].width:0)),a=Math.max(...t.columns.map(g=>g.panel.top)),l=a-Math.min(...t.columns.map(g=>g.panel.bottom)),c=({panel:g})=>g.top-g.bottom<l?[(a-g.top)/l,(a-g.bottom)/l]:void 0,h=[],u=new Map;for(const g of t.columns)u.set(g.node.id,h.length),h.push(g.maps?{kind:"maps",x:s(g.x),size:g.maps.slabs[0].width/o,channels:g.maps.channels}:{kind:"neurons",x:s(g.x),units:g.units,...c(g)&&{share:c(g)}});for(const g of t.bands.filter(_=>_.kind==="merge"))u.set(g.node.id,h.length),h.push({kind:"merge",x:s(g.x),glyph:g.node.type==="add"?"+":"∥"});const f=[];for(const g of t.links){const _=[g.from.node.id,...g.through.filter(p=>p.kind==="merge").map(p=>p.node.id),g.to.node.id];for(let p=1;p<_.length;p+=1)f.push([u.get(_[p-1]),u.get(_[p])])}for(const g of t.stubs)u.has(g.to.node.id)&&f.push([u.get(g.from.node.id),u.get(g.to.node.id)]);const d=t.arcs.flatMap(g=>{const _=u.get(g.source.id),p=u.get(g.target.id);return _!==void 0&&p!==void 0?[[_,p]]:[]});return{items:h,links:f,arcs:d}}function pv(n){const t=Eu(n),e=t.cards.filter(u=>u.node.type!=="input"&&u.node.type!=="output"),i=Math.min(...e.map(u=>u.x-u.width/2)),r=Math.max(...e.map(u=>u.x+u.width/2)),s=Math.max(...e.map(u=>u.y+u.height/2)),o=Math.min(...e.map(u=>u.y-u.height/2)),a=Math.max(r-i,1),l=Math.max(s-o,1),c=e.map(u=>({kind:"box",x:(u.x-i)/a,y:(u.y-o)/l,width:u.width/a,height:u.height/l,label:u.group?u.group.label:u.node.params.contextName?String(u.node.params.contextName):u.node.label,inner:u.miniature})),h=t.links.filter(u=>e.includes(u.from)&&e.includes(u.to)).map(u=>[e.indexOf(u.from),e.indexOf(u.to)]);return{items:c,links:h,arcs:[]}}function mv(n){if(!Ma(n))return cv;const t=n.output_shape;return t.length===3?{items:[{kind:"maps",x:.5,size:1,channels:t[0]}],links:[],arcs:[]}:{items:[{kind:"neurons",x:.5,units:t.reduce((e,i)=>e*i,1)}],links:[],arcs:[]}}class bu extends ye{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new pt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const ci=new P,ic=new Wt,rc=new Wt,sc=new P,oc=new P;class gv{constructor(t={}){const e=this;let i,r,s,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:r}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),ic.copy(_.matrixWorldInverse),rc.multiplyMatrices(_.projectionMatrix,ic),h(g,g,_),d(g)},this.setSize=function(g,_){i=g,r=_,s=i/2,o=r/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,p=g.children.length;_<p;_++)c(g.children[_])}function h(g,_,p){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){ci.setFromMatrixPosition(g.matrixWorld),ci.applyMatrix4(rc);const m=ci.z>=-1&&ci.z<=1&&g.layers.test(p.layers)===!0,A=g.element;A.style.display=m===!0?"":"none",m===!0&&(g.onBeforeRender(e,_,p),A.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(ci.x*s+s)+"px,"+(-ci.y*o+o)+"px)",A.parentNode!==l&&l.appendChild(A),g.onAfterRender(e,_,p));const v={distanceToCameraSquared:u(p,g)};a.objects.set(g,v)}for(let m=0,A=g.children.length;m<A;m++)h(g.children[m],_,p)}function u(g,_){return sc.setFromMatrixPosition(g.matrixWorld),oc.setFromMatrixPosition(_.matrixWorld),sc.distanceToSquared(oc)}function f(g){const _=[];return g.traverseVisible(function(p){p.isCSS2DObject&&_.push(p)}),_}function d(g){const _=f(g).sort(function(m,A){if(m.renderOrder!==A.renderOrder)return A.renderOrder-m.renderOrder;const v=a.objects.get(m).distanceToCameraSquared,x=a.objects.get(A).distanceToCameraSquared;return v-x}),p=_.length;for(let m=0,A=_.length;m<A;m++)_[m].element.style.zIndex=p-m}}}function kn(n){return n.toLocaleString("en-GB")}function Au(n){return n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1e3?`${(n/1e3).toFixed(1)}K`:String(n)}function nr(n){return n.join(" × ")}const _v={relu:"ReLU",relu6:"ReLU6",leaky_relu:"Leaky ReLU",elu:"ELU",gelu:"GELU",silu:"SiLU",mish:"Mish",sigmoid:"Sigmoid",tanh:"Tanh",softplus:"Softplus",softmax:"Softmax",log_softmax:"LogSoftmax"};function hs(n){return n?_v[n]??n:""}const vv={pytorch:"PyTorch",keras:"Keras",demo:"Demo"};function wu(n){return vv[n]??n}const xv=8;function Cu(n){return Math.min(256,Math.max(16,Math.ceil(n/xv)))}function Mv(n,t,e,i,{handle:r=.55,bend:s=0}={}){const o=(e-n)*r;return Cu(2*Math.hypot(o,s)+Math.hypot(e-n-2*o,i-t))}function fs(n,t,e,i,r,{handle:s=.55,bend:o=0,wave:a}={}){const l=(e-n)*s,c=[];for(let h=0;h<=r;h+=1){const u=h/r,f=1-u,d=f*f*f,g=3*f*f*u,_=3*f*u*u,p=u*u*u,m=d*n+g*(n+l)+_*(e-l)+p*e,A=e===n?u:(m-n)/(e-n);let v=d*t+g*(t+o)+_*(i+o)+p*i;a&&(v+=a.amplitude*Math.sin(Math.PI*A*a.cycles+a.phase)*Math.sin(Math.PI*A)),c.push({x:m,y:v,along:A})}return c}const Ru=16,Sv=90,yv=24,Ev=700,yi=.3,Tv=24,ds=6,Qo=40,bv=3,Av=.2,ac=900,lc=.8,$r=48,wv=34,Qs=25,Cv=2.5;function Rv(n,t,e,i){const r=n.from.maps&&n.to.maps?Uv(n):n.from.maps?Fv(n,t,i):Nv(n,t),s={start:n.from.maps?yi:0,end:n.to.maps?yi:0},o=Math.max(...n.from.slots.map(Math.abs),...n.to.slots.map(Math.abs)),a=r.map((l,c)=>{const h=[[l.x0,l.y0]],u=new Set;for(const f of n.through){const d=Pv(f,l,c);h.push(d),f.kind==="merge"&&(u.add(h.length-1),h.push([d[0]+Qo,d[1]*bv]))}return h.push([l.x1,l.y1]),{points:rs(h,l.z0,l.z1,o,c+n.from.index*7919,u),strength:l.strength}});return ps(n.t,[n.from.node.id,n.to.node.id],a,r.length,e,s)}function Pv(n,t,e){return n.kind==="flatten"?[n.x,n.stripHalfHeight*(1-2*(t.flat??.5))]:[n.x,(Fe(e*1.7+n.x)-.5)*ds]}function Lv(n,t,e){const i=n.from.maps?$r:n.from.slots.length,r=Math.max(...n.from.slots.map(Math.abs)),s=Array.from({length:i},(o,a)=>{const[l,c,h]=Sa(n.from,a,i,e,"exit"),[u,f]=ya(n.to,a);return{points:rs([[l,c],[u,f]],h,0,r,a+n.from.index*131),strength:.4+.6*Fe(a+.3)}});return ps(n.t,[n.from.node.id,n.to.node.id],s,i,t,{start:n.from.maps?yi:0,end:0})}function Dv(n,t,e){const i=Tu(n.tensorShape),r=Array.from({length:i},(o,a)=>{const l=D=>Fe(a*13.7+D+n.x0*.01+n.x1*.003),[c,h,u]=cc(n.start,a,i,e,"start"),[f,d,g]=cc(n.end,a,i,void 0,"end"),_=(D,T)=>"column"in D&&!D.column.maps&&D.column.panel.bottom>0?Math.abs(T-D.column.x)+50:0,p="band"in n.start?Qo+50:_(n.start,n.start.column.panel.right)||30+30*l(1),m="band"in n.end?60:_(n.end,n.end.column.panel.left)||30+30*l(2),A=n.laneY+(l(3)-.5)*(ns/3),v=(D,T,b,R)=>{if("band"in D){const O=(l(b)-.5)*ds;return[R==="start"?new P(c+Qo,h-8+O,T):new P(f-26,d-22+O*2,T)]}const[y,S]=Iv(D.column),C=S-wv+(l(b+1)-.5)*12;if(D.column.maps)return[new P(y+(l(b)-.5)*24,C,T)];if(D.column.panel.bottom>0){const O=R==="start"?D.column.panel.right+on/2:D.column.panel.left-on/2,X=n.laneY+ns+(l(b+1)-.5)*12;return R==="start"?[new P(O,h,T),new P(O,X,T)]:[new P(O,X,T),new P(O,d,T)]}const z=Qs+l(b)*10;return R==="start"?[new P(c+Qs,h,T),new P(y+z,C,T)]:[new P(y-z,C,T),new P(f-Qs,d,T)]};return{points:new ru([new P(c,h,u),...v(n.start,u,9,"start"),new P(c+p+(l(4)-.5)*16,A+(l(5)-.5)*6,u),new P(f-m+(l(6)-.5)*16,A+(l(7)-.5)*6,g),...v(n.end,g,11,"end"),new P(f,d,g)],!1,"centripetal").getPoints(Ru*3),strength:.35+.65*l(8)}}),s={start:"column"in n.start&&n.start.column.maps?yi:0,end:"column"in n.end&&n.end.column.maps?yi:0};return ps(n.t,[n.source.id,n.target.id],r,i*Cv,t,s)}function Zr(n,t,e,i,r=[]){var u;const s="column"in n?n.column.node:n.band.node,o="column"in n?Math.max(...n.column.slots.map(Math.abs)):n.band.halfHeight,a=Array.from({length:$r},(f,d)=>{var T;const g=b=>Fe(d*7.3+b+s.id.length),[_,p,m]="column"in n?Sa(n.column,d,$r,i,t==="in"?"entry":"exit"):[...ya(n.band,d),0];if(t==="in"){const b=[_-ac,p*.4+(g(1)-.5)*o*.6];return{points:rs([b,[_,p]],0,m,o,d*31+7),strength:.4+.6*g(2)}}const A=r.map(b=>[b.x,(g(3)-.5)*ds*2]),x=[(((T=r[r.length-1])==null?void 0:T.x)??_)+ac,(g(1)-.5)*o*.8],D=new Set(r.slice(0,-1).map((b,R)=>R+1));return"band"in n&&D.add(0),{points:rs([[_,p],...A,x],m,0,o,d*31+11,D),strength:.4+.6*g(2)}}),l="column"in n&&n.column.maps?yi:0,c=t==="in"?{start:0,end:l}:{start:l,end:0},h=((u=r[r.length-1])==null?void 0:u.node)??s;return ps(t==="in"?0:1,[s.id,h.id],a,$r,e,c,t==="in"?"start":"end")}function Iv(n){if(!n.maps)return[n.x,Math.min(...n.slots)];const t=er(n.maps);return[t.left+t.width/2,t.bottom]}function cc(n,t,e,i,r){return"column"in n?Sa(n.column,t,e,i,r==="start"?"exit":"entry"):[...ya(n.band,t),0]}function Sa(n,t,e,i,r){const s=(t+.5)/e;if(n.maps){const a=n.maps.channels*n.maps.mapHeight*n.maps.mapWidth,l=Math.floor(s*a*7.31%a);return gu(n.maps,l,i==null?void 0:i.channels)}const o=n.slots[Math.min(n.slots.length-1,Math.floor(s*n.slots.length))];return[r==="entry"?n.entryX:n.exitX,o,0]}function ya(n,t){return[n.x,(Fe(t*2.3+n.x)-.5)*ds]}function Uv(n){return O_(n.from.maps,n.to.maps,N_(n.to.node.params,n.from.maps,n.to.maps)).map(([[t,e,i],[r,s,o]],a)=>({x0:t,y0:e,z0:i,x1:r,y1:s,z1:o,strength:.4+.6*Fe(a+.5)}))}function Nv(n,t){const{pairs:e,strength:i}=J_(n,t);return e.map(([r,s],o)=>({x0:n.from.exitX,y0:n.from.slots[r],z0:0,x1:n.to.entryX,y1:n.to.slots[s],z1:0,strength:i[o]}))}function Fv(n,t,e){const i=n.from.maps,r=i.mapHeight*i.mapWidth,s=r*i.channels,o=n.to.slots.length,a=new Map;if(t&&t.pairs.length>0)for(const[h,u,f]of t.pairs){const d=h*o+jo(u,n.to.units,o);a.set(d,Math.max(a.get(d)??0,Math.abs(f)))}else{const h=Math.max(1,Math.floor(r/Tv));for(let u=0;u<r;u+=h)for(let f=0;f<o;f+=1)a.set(u*o+f,1)}const l=Math.max(...a.values())||1;return[...a].sort((h,u)=>u[1]-h[1]).slice(0,Ev).map(([h,u])=>{const f=Math.floor(h/o),[d,g,_]=gu(i,f,e==null?void 0:e.channels);return{x0:d,y0:g,z0:_,x1:n.to.entryX,z1:0,y1:n.to.slots[h%o],strength:.25+.75*(u/l),flat:f/Math.max(s-1,1)}})}function rs(n,t,e,i,r,s=new Set){const o=u=>Fe(Fe(r)*1e4+u),a=n.length-1,l=Math.min(Sv,i*.4)/a,c=Math.min(yv,4+i*.12)/a,h=[];for(let u=0;u<a;u+=1){const[f,d]=n[u],[g,_]=n[u+1],p=s.has(u)?Av:1,m={bend:(o(1+u*7)-.5)*2*l*p,handle:.25+.5*o(2+u*7),wave:{amplitude:(o(3+u*7)-.5)*2*c*p,cycles:1+2*o(4+u*7),phase:o(5+u*7)*Math.PI*2}},A=fs(f,d,g,_,Math.ceil(Ru/a)+2,m);h.push(...u===0?A:A.slice(1))}return h.map(({x:u,y:f},d)=>new P(u,f,t+(e-t)*d/(h.length-1)))}function ps(n,t,e,i,r,s={start:0,end:0},o=null){const{r:a,g:l,b:c}=ms(r.edgeGradient,n),h=[],u=[];for(const{points:m,strength:A}of e){const v=m.length-1,x=(b,R,y=.25)=>R>0?Math.min(1,y+(1-y)*b/(R*v)):1,D=b=>o==="start"?x(b,lc,0):o==="end"?x(v-b,lc,0):1,T=b=>A*Math.min(x(b,s.start),x(v-b,s.end),D(b));for(let b=0;b<m.length-1;b+=1)h.push(m[b].x,m[b].y,m[b].z,m[b+1].x,m[b+1].y,m[b+1].z),u.push(a,l,c,T(b),a,l,c,T(b+1))}const f=new se;f.setAttribute("position",new Zt(h,3)),f.setAttribute("color",new Zt(u,4));const d=Math.min(.45,Math.max(.05,2.8/Math.sqrt(Math.max(i,1)))),g=Math.min(.9,d*r.edgeOpacity),_=new mn({vertexColors:!0,transparent:!0,opacity:g,blending:r.edgeBlending==="additive"?pi:un,depthWrite:!1}),p=new Li(f,_);return p.renderOrder=1,{ends:t,lines:p,baseOpacity:g}}function Ov(n,t){n.lines.material.opacity=t}function ms(n,t){const e=Math.min(Math.max(t,0),1)*(n.length-1),i=Math.min(Math.floor(e),n.length-2);return new Ft(n[i]).lerp(new Ft(n[i+1]),e-i)}function Fe(n){const t=Math.sin(n*12.9898)*43758.5453;return t-Math.floor(t)}const Bv=3.2,zv=2,Hv=24;function Gv(n,t,e){var l;const i=new Vn;ix(t);const r=[...n.links.map(c=>{var h,u;return Rv(c,(h=t.weights)==null?void 0:h[c.to.node.id],e,(u=t.feature_maps)==null?void 0:u[c.from.node.id])}),...n.stubs.map(c=>{var h;return Lv(c,e,(h=t.feature_maps)==null?void 0:h[c.from.node.id])}),...n.arcs.map(c=>{var h;return Dv(c,e,(h=t.feature_maps)==null?void 0:h[c.source.id])}),...n.columns.filter(c=>c.node.type==="input"&&typeof c.node.params.context=="string").map(c=>{var h;return Zr({column:c},"in",e,(h=t.feature_maps)==null?void 0:h[c.node.id])}),...n.bands.filter(c=>c.node.type==="output"&&typeof c.node.params.context=="string").flatMap(c=>ex(n,t,c,e))];r.forEach(c=>i.add(c.lines));const s=c=>r.filter(h=>h.ends.includes(c.id)),o=[];for(const c of n.columns){const h=Jv(c),u=Zv(c,h,e);u.links=s(c.node),i.add(u.mesh,u.outline,...h),o.push(u)}for(const c of n.bands){const h=jv(c),u=Kv(c,h,e);u.links=s(c.node),i.add(u.mesh,u.outline,h),c.kind==="flatten"&&i.add(tx(c,e)),o.push(u)}const a=n.columns.filter(c=>!c.maps);i.add(Wv(a,e),$v(a,e));for(const c of n.columns)c.maps&&i.add(qv(c,Xv(c,n.columns.length),e,(l=t.feature_maps)==null?void 0:l[c.node.id]));return{root:i,pickables:o,edges:r,theme:e}}function Vv(n){n.root.removeFromParent(),n.root.traverse(t=>{var e;t instanceof bu&&t.element.remove(),(t instanceof ue||t instanceof ga)&&(t.geometry.dispose(),(e=t.material.map)==null||e.dispose(),t.material.dispose())})}function kv(n,t,e){t.outline.material.color.set(e?n.panelBorderHover:n.panelBorder);for(const i of t.labels)i.classList.toggle("is-active",e)}function Wv(n,t){const e=n.reduce((a,l)=>a+l.slots.length,0),i=new Pe({color:t.neuron}),r=new ma(new ar(Bv,24),i,e),s=new Wt;let o=0;for(const a of n)for(const l of a.slots)r.setMatrixAt(o++,s.makeTranslation(a.x,l,2));return r.renderOrder=3,r}function Xv(n,t){return t>2?Math.max(0,n.index-1)/(t-2):0}function qv(n,t,e,i){const r=n.maps.slabs,s=ms(e.edgeGradient,t),o=new Ft(e.panelFill),a=new Ft(e.panelBorder),l=i?H_(i):[],c=new Vn,h=[],u=[];r.forEach(({left:g,bottom:_,width:p,height:m},A)=>{const v=pu+A*mu,x=l[r.length-1-A],D=new ue(new Ri(p,m).translate(g+p/2,_+m/2,v),new Pe(x?{map:Yv(x,i.width,i.height,o,s)}:{color:o}));c.add(D);const T=r.length>1?.35+.65*A/(r.length-1):1,[b,R]=[g+p,_+m],y=[[g,_],[b,_],[b,R],[g,R]];y.forEach(([C,z],O)=>{const[X,K]=y[(O+1)%4];h.push(C,z,v+.01,X,K,v+.01),u.push(s.r,s.g,s.b,T,s.r,s.g,s.b,T)});const S=.7*T;for(const[C,z,O,X]of z_({left:g,bottom:_,width:p,height:m},n.maps.mapHeight,n.maps.mapWidth))h.push(C,z,v+.015,O,X,v+.015),u.push(a.r,a.g,a.b,S,a.r,a.g,a.b,S)});const f=new se;f.setAttribute("position",new Zt(h,3)),f.setAttribute("color",new Zt(u,4));const d=new Li(f,new mn({vertexColors:!0,transparent:!0}));return d.renderOrder=3,c.add(d),c}function Yv(n,t,e,i,r){const s=i.clone().convertLinearToSRGB(),o=r.clone().convertLinearToSRGB(),a=new Uint8Array(t*e*4);for(let c=0;c<e;c+=1){const h=e-1-c;for(let u=0;u<t;u+=1){const f=n[c*t+u]/255,d=(h*t+u)*4;a[d]=Math.round(255*(s.r+(o.r-s.r)*f)),a[d+1]=Math.round(255*(s.g+(o.g-s.g)*f)),a[d+2]=Math.round(255*(s.b+(o.b-s.b)*f)),a[d+3]=255}}const l=new nu(a,t,e,Ue);return l.colorSpace=be,l.magFilter=Se,l.minFilter=Se,l.needsUpdate=!0,l}function $v(n,t){const e=n.filter(s=>s.ellipsisY!==null),i=new ma(new ar(1.6,12),new Pe({color:t.muted}),e.length*3),r=new Wt;return e.forEach((s,o)=>{for(let a=0;a<3;a+=1)i.setMatrixAt(o*3+a,r.makeTranslation(s.x,s.ellipsisY+(a-1)*6,2))}),i.renderOrder=3,i}function Zv(n,t,e){const{left:i,right:r,top:s,bottom:o}=n.panel,a=Du(i,o,r-i,s-o,zv),l=new ue(new us(a,8),new Pe({color:e.panelFill,transparent:!0,opacity:e.panelFillOpacity,depthWrite:!1})),c=new iu(new se().setFromPoints(a.getPoints(8)),new mn({color:e.panelBorder}));return c.renderOrder=2,{node:n.node,mesh:l,outline:c,labels:t.map(h=>h.element),links:[]}}function Kv(n,t,e){const{x:i,halfHeight:r}=n,s=new ue(new Ri(Hv,r*2).translate(i,0,1),new Pe({visible:!1})),o=new Li(new se().setFromPoints([new P(i,r,1),new P(i,-r,1)]),new du({color:e.panelBorder,dashSize:4,gapSize:4}));return o.computeLineDistances(),o.renderOrder=2,o.visible=n.kind!=="merge",{node:n.node,mesh:s,outline:o,labels:[t.element],links:[]}}function Jv(n){const{node:t,panel:e}=n,i=t.output_shape.length>1?nr(t.output_shape):`${kn(n.units)} units`,r=typeof t.params.context=="string"?t.params.context:"",o=[t.type==="input"?r:[t.label,hs(t.activation)].filter(Boolean).join(" · "),i].filter(Boolean).join(" · "),a=An("layer-header",`<span class="layer-name">${jt(ir(t))}</span><span class="layer-kind">${jt(o)}</span>`);return a.position.set(e.left+14,e.top-12,5),a.center.set(0,0),[a]}function jv(n){if(n.kind==="merge"){const i=n.node.type==="add"?"+":"∥",r=An("merge-node",`${i}<span class="merge-caption">${jt(n.node.type)}</span>`);return r.position.set(n.x,0,5),r}const t=Qv(n.node),e=An("band-chip",`${t?`<svg viewBox="0 0 14 10" aria-hidden="true"><path d="${t}"/></svg>`:""}${jt(nx(n.node))}`);return e.position.set(n.x,n.kind==="flatten"?-n.stripHalfHeight-16:0,5),e}function Qv(n){if(n.type==="norm")return"M1 9 C4 9 5 1 7 1 C9 1 10 9 13 9";if(n.type==="dropout")return"M1 5 H3.5 M6 5 H8 M10.5 5 H13";if(n.type==="flatten"||n.type==="reshape")return"M2 1 H5 V9 H2 Z M8 1 H12 M8 5 H12 M8 9 H12";if(n.type==="output")return"M1 5 H12 M9 2 L12 5 L9 8";if(n.type==="activation"){const t=(n.activation??"").toLowerCase();return t.includes("relu")||t.includes("elu")?"M1 8 H7 L13 2":t.includes("sigmoid")||t.includes("tanh")||t.includes("softmax")?"M1 8 C6 8 8 2 13 2":"M1 8 C5 8 9 6 13 2"}return null}function tx(n,t){const e=n.stripHalfHeight,i=10,[r,s]=[n.x-i/2,n.x+i/2],o=24,a=[new P(r,e,2),new P(s,e,2),new P(s,e,2),new P(s,-e,2),new P(s,-e,2),new P(r,-e,2),new P(r,-e,2),new P(r,e,2)];for(let c=1;c<o;c+=1){const h=e-2*e*c/o;a.push(new P(r,h,2),new P(s,h,2))}const l=new Li(new se().setFromPoints(a),new mn({color:t.panelBorderHover,transparent:!0,opacity:.8}));return l.renderOrder=3,l}function ex(n,t,e,i){var s;const r=[e];for(let o=t.nodes.indexOf(e.node)-1;o>=0;o-=1){const a=t.nodes[o],l=n.columns.find(h=>h.node===a);if(l)return[Zr({column:l},"out",i,(s=t.feature_maps)==null?void 0:s[a.id],r)];const c=n.bands.find(h=>h.node===a);if((c==null?void 0:c.kind)==="merge")return[Zr({band:c},"out",i,void 0,r)];c&&r.unshift(c)}return[Zr({band:e},"out",i)]}function nx(n){return n.type==="output"?typeof n.params.context=="string"?`Output ${n.params.context}`:"Output":n.type==="dropout"&&typeof n.params.p=="number"?`Dropout ${n.params.p}`:n.type==="activation"?hs(n.activation)||n.label:n.type==="norm"&&n.label.startsWith("BatchNorm")?"BatchNorm":n.label}const Pu=new WeakMap;function ix(n){let t=0;for(const e of n.nodes)e.type==="input"||e.type==="output"||!/^\d+$/.test(Lu(e))||Pu.set(e,qi(e)?e.label:`Layer ${++t}`)}function ir(n){return n.type==="input"?"Input":n.type==="output"?typeof n.params.context=="string"?`Output ${n.params.context}`:"Output":Pu.get(n)??Lu(n)}function Lu(n){var i;const t=n.id.split("/").pop()??n.id,e=`${(((i=n.group)==null?void 0:i.split("/").pop())??"").replace(/\./g,"_")}_`;return n.group&&t.startsWith(e)?t.slice(e.length):t}function An(n,t){const e=document.createElement("div");return e.className=n,e.innerHTML=t,new bu(e)}function Du(n,t,e,i,r){const s=Math.min(r,e/2,i/2),o=new cu;return o.moveTo(n+s,t),o.lineTo(n+e-s,t),o.quadraticCurveTo(n+e,t,n+e,t+s),o.lineTo(n+e,t+i-s),o.quadraticCurveTo(n+e,t+i,n+e-s,t+i),o.lineTo(n+s,t+i),o.quadraticCurveTo(n,t+i,n,t+i-s),o.lineTo(n,t+s),o.quadraticCurveTo(n,t,n+s,t),o}function jt(n){return n.replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}const rx=2,sx=2.4,to=10,uc=9,Hr={left:28,right:28,top:64,bottom:40},ox=12,hc=1,Gr=.02,ax=40,lx=2,Iu=2.6,cx=14,ux=12,fc=.7,dc=80,hx=60,ki=220,fx=20;function dx(n,t,e){const i=new Vn,r=[],s=[],o=[],a=[],l=[],c=new Map;for(const f of n.cards){if(Ne(f.node))continue;const d=px(f,t);if(f.group){const _=f.group.id;d.activate=()=>e(_)}const g=vx(f,t,s,o,a,l);f.kind==="node"&&Ma(f.node)&&g.anchors.length===1&&c.set(f,g.anchors[0]),i.add(d.mesh,d.outline,...mx(f,d),...g.labels),r.push(d)}const h=Math.max(...n.cards.map(f=>f.rank))+1,u=n.bounds.bottom+fx;for(const f of n.links)i.add(...wx(f,t,h,c,u));return i.add(Tx(s,o,t),Ax(a,t),bx(l,t)),{root:i,pickables:r,edges:[],theme:t}}function px(n,t){const e=Du(n.x-n.width/2,n.y-n.height/2,n.width,n.height,rx),i=new ue(new us(e,8),new Pe({color:t.panelFill,transparent:!0,opacity:t.panelFillOpacity,depthWrite:!1})),r=Ne(n.node),s=new iu(new se().setFromPoints(e.getPoints(8)),r?new du({color:t.panelBorder,dashSize:5,gapSize:4}):new mn({color:t.panelBorder}));return r&&(s.computeLineDistances(),i.material.opacity*=.4),s.renderOrder=2,{node:n.node,mesh:i,outline:s,labels:[],links:[]}}function mx(n,t){const e=n.x-n.width/2+14,i=n.y+n.height/2-12,r=n.y-n.height/2+12;let s,o;if(n.group){const d=n.group.framework?wu(n.group.framework):"Network",g=n.partCount>0?`${n.partCount} parts`:`${n.layerCount} layers`;s=`${d} · ${g} · ${Au(n.paramCount)} params`,o=`${Kr(n.inputShape)} → ${Kr(n.outputShape)}`}else{const d=n.node.params.description;s=typeof d=="string"?jt(d):gx(n),o=Kr(n.outputShape.length>0?n.outputShape:n.inputShape)}const a=n.node.type==="input"||n.node.type==="output",l=Ne(n.node)?String(n.node.params.contextName):null,c=n.group?n.group.label:l??(a||n.node.type!=="custom"?ir(n.node):n.node.label),h=An("layer-header card-header",`<span class="layer-name">${jt(c)}</span><span class="layer-kind">${s}</span>`);h.position.set(e,i,5),h.center.set(0,0),h.element.style.maxWidth=`calc(${n.width-28}px * var(--zoom, 1))`;const u=An("card-footer",o);if(u.position.set(e,r,5),u.center.set(0,1),t.labels.push(h.element,u.element),!n.node.notes)return[h,u];const f=An("card-footer note-hint","Notes");return f.position.set(n.x+n.width/2-14,r,5),f.center.set(1,1),t.labels.push(f.element),[h,u,f]}function gx(n){const t=n.node.params.context;return Ne(n.node)?n.node.type==="input"?"Outside · feeds in":"Outside · receives the output":n.node.type==="input"?typeof t=="string"?`Model input · ${jt(t)}`:"Model input":n.node.type==="output"?typeof t=="string"?`Model output · ${jt(t)}`:"Model output":n.node.type==="custom"?"Block":jt(n.node.label)}function Kr(n){return n.length===0?"—":n.length===1?kn(n[0]):nr(n)}function _x(n){return{left:n.x-n.width/2+Hr.left,right:n.x+n.width/2-Hr.right,top:n.y+n.height/2-Hr.top,bottom:n.y-n.height/2+Hr.bottom}}function vx(n,t,e,i,r,s){if(n.miniature.items.length===0)return{labels:[],anchors:[]};const o=(c,h,u,f,d,g=0)=>{const _=ms(t.edgeGradient,d);e.push(c,h,g,u,f,g),i.push(_.r,_.g,_.b,_.r,_.g,_.b)},a=[],l=Uu(n.miniature,_x(n),{segment:o,dots:r,labels:a,fills:s},0);return{labels:a,anchors:l}}function Uu({items:n,links:t,arcs:e},i,r,s){const o=i.right-i.left,a=i.top-i.bottom,l=(i.top+i.bottom)/2,c=f=>i.left+f*o,h=n.length===1,u=n.map(f=>{if(f.kind==="neurons"){const[d,g]=f.share??[0,1];return Mx(f.units,c(f.x),i.top-a*((d+g)/2),a*(g-d),s,r.dots)}return f.kind==="maps"?Sx(f,c(f.x),l,h?Math.min(a*.8,o*.6):Math.min(a*.7,30),r):f.kind==="merge"?yx(f,c(f.x),l,r.segment):Ex(f,i,r,s)});t.forEach(([f,d],g)=>xx(u[f].right,u[d].left,(n[f].x+n[d].x)/2,g,r.segment));for(const[f,d]of e){const[g,_]=u[f].bottom,[p,m]=u[d].bottom,A=Math.min(_,m)-Math.min(8,a*.15),v=fs(g,_,p,m,10,{handle:0,bend:(A-(_+m)/2)*1.33});for(let x=1;x<v.length;x+=1)r.segment(v[x-1].x,v[x-1].y,v[x].x,v[x].y,n[d].x)}return u}function xx(n,t,e,i,r){const s=n.flatMap((l,c)=>t.map((h,u)=>({start:l,end:h,a:c,b:u}))),o=ax/s.length,a=Math.max(...[...n,...t].map(([,l])=>l))-Math.min(...[...n,...t].map(([,l])=>l));s.forEach(({start:[l,c,h=0],end:[u,f,d=0],a:g,b:_},p)=>{const m=D=>Fe(p*3.7+i*101+D);if(!(g===Math.floor(_*n.length/t.length)||_===Math.floor(g*t.length/n.length))&&m(0)>=o)return;const v=fs(l,c,u,f,8,{handle:.3+.4*m(1),bend:(m(2)-.5)*(a*.25+3)}),x=D=>h+(d-h)*(D-.5)/(v.length-1);for(let D=1;D<v.length;D+=1)r(v[D-1].x,v[D-1].y,v[D].x,v[D].y,e,x(D))})}function Mx(n,t,e,i,r,s){const o=r>0?.6:1,a=Math.max(1,Math.min(n,ox,Math.floor(i/(Iu*2.5*o))+1)),l=a>1?Math.min(i/(a-1),12):0,c=Array.from({length:a},(h,u)=>[t,e+((a-1)/2-u)*l]);return s.push(...c.map(([h,u])=>[h,u,o])),{left:c,right:c,bottom:c[c.length-1]}}function Sx(n,t,e,i,{segment:r,fills:s}){const o=i*(.45+.55*n.size),a=Math.min(n.channels,4),l=Math.max(1.5,o*.1),c=(a-1)*l,h=t-c/2,u=e-c/2;for(let g=a-1;g>=0;g-=1){const[_,p]=[h-o/2+g*l,u-o/2+g*l],[m,A]=[_+o,p+o],v=hc+(a-1-g)*Gr;s.push(_,p,v,m,p,v,m,A,v,_,p,v,m,A,v,_,A,v);const x=v+Gr/2;r(_,p,m,p,n.x,x),r(m,p,m,A,n.x,x),r(m,A,_,A,n.x,x),r(_,A,_,p,n.x,x)}const f=Array.from({length:a},(g,_)=>({offset:_*l,z:hc+(a-1-_)*Gr+Gr*.75})),d=[-.25,.05,.3].map(g=>g*o);return{left:f.flatMap(({offset:g,z:_})=>d.map(p=>[h-o/2+g,u+p+g,_])),right:f.flatMap(({offset:g,z:_})=>d.map(p=>[h+o/2+g,u+p+g,_])),bottom:[h,u-o/2]}}function yx(n,t,e,i){for(let s=0;s<12;s+=1){const[o,a]=[s/12*Math.PI*2,(s+1)/12*Math.PI*2];i(t+5*Math.cos(o),e+5*Math.sin(o),t+5*Math.cos(a),e+5*Math.sin(a),n.x)}return n.glyph==="+"?(i(t-2.5,e,t+2.5,e,n.x),i(t,e-2.5,t,e+2.5,n.x)):(i(t-1.2,e-2.5,t-1.2,e+2.5,n.x),i(t+1.2,e-2.5,t+1.2,e+2.5,n.x)),{left:[[t-5,e]],right:[[t+5,e]],bottom:[t,e-5]}}function Ex(n,t,e,i){const r=t.right-t.left,s=t.top-t.bottom,o=Math.max(n.width*r,8),a=Math.max(n.height*s,8),l=t.left+n.x*r,c=t.bottom+n.y*s,[h,u,f,d]=[l-o/2,l+o/2,c-a/2,c+a/2];e.segment(h,f,u,f,n.x),e.segment(u,f,u,d,n.x),e.segment(u,d,h,d,n.x),e.segment(h,d,h,f,n.x);const g=o>=40&&a>=34&&i<lx;if(o>=24){const p=An("preview-part",jt(n.label));p.element.style.maxWidth=`${Math.max(o-6,12)}px`,g?(p.position.set(h+3,d-2,5),p.center.set(0,0)):p.position.set(l,c,5),e.labels.push(p)}g&&n.inner.items.length>0&&Uu(n.inner,{left:h+6,right:u-6,top:d-14,bottom:f+5},e,i+1);const _=[-.2,0,.2].map(p=>c+p*a);return{left:_.map(p=>[h,p]),right:_.map(p=>[u,p]),bottom:[l,f]}}function Tx(n,t,e){const i=new se;i.setAttribute("position",new Zt(n,3)),i.setAttribute("color",new Zt(t,3));const r=new mn({vertexColors:!0,transparent:!0,opacity:e.edgeBlending==="additive"?.35:.45,blending:e.edgeBlending==="additive"?pi:un,depthWrite:!1}),s=new Li(i,r);return s.renderOrder=1,s}function bx(n,t){const e=new se;return e.setAttribute("position",new Zt(n,3)),new ue(e,new Pe({color:t.panelFill}))}function Ax(n,t){const e=new ma(new ar(Iu,16),new Pe({color:t.neuron}),n.length),i=new Wt;return n.forEach(([r,s,o],a)=>e.setMatrixAt(a,i.makeScale(o,o,1).setPosition(r,s,2))),e.renderOrder=3,e}function wx(n,t,e,i,r){var m;const s=n.from.x+n.from.width/2,o=n.to.x-n.to.width/2,a=Tu(n.shape),l=a>0?[Cx(n,a,t,e,i,r)]:Rx(n,t,r),c=Ne(n.from.node)?n.from.node:Ne(n.to.node)?n.to.node:null,h=c?String(c.params.context):n.label??(n.shape.length>0?Kr(n.shape):null);if(!h)return l;const u=Math.max(o-s,1),f=((((m=n.via[0])==null?void 0:m.x)??o)-s)/2/u,d=c===n.from.node?1-dc/u:c===n.to.node?dc/u:n.back?.5:f,_=Ea(n,s,Si(1,n.from,n.outShare)[0],o,Si(1,n.to,n.inShare)[0],{handle:.5},r).reduce((A,v)=>Math.abs(v.along-d)<Math.abs(A.along-d)?v:A),p=An("link-chip",jt(h));return p.position.set(_.x,_.y,5),[...l,p]}function Cx(n,t,e,i,r,s){var S,C;const o=n.from.x+n.from.width/2,a=n.to.x-n.to.width/2,l=Si(t,n.from,n.outShare),c=Si(t,n.to,n.inShare),h=(S=r.get(n.from))==null?void 0:S.right,u=(C=r.get(n.to))==null?void 0:C.left,f=(z,O)=>z[Math.floor(O*z.length/t)],d=z=>h?f(h,z):[o,l[z]],g=z=>u?f(u,z):[a,c[z]],_=z=>t>1?.5-z/(t-1):0,p=[];if(u&&n.to.node.type==="dense"){const z=hx/(t*u.length);for(let O=0;O<t;O+=1)for(let X=0;X<u.length;X+=1)(X===Math.floor(O*u.length/t)||O===Math.floor(X*t/u.length)||Fe(O*31.7+X*7.1)<z)&&p.push([d(O),u[X],_(O)])}else for(let z=0;z<t;z+=1)p.push([d(z),g(z),_(z)]);const m=n.from.rank/Math.max(i-1,1),A=n.to.rank/Math.max(i-1,1),v=z=>Nu(n,z),x=[],D=[];p.forEach(([[z,O,X=0],[K,$,Q=0],k],ot)=>{const F=Fe(ot+n.from.rank*7919+n.to.y),q=Y=>Fe(F*1e4+Y),et={handle:.35+.3*q(1),bend:(q(2)-.5)*2*cx,wave:{amplitude:(q(3)-.5)*2*ux,cycles:1+2*q(4),phase:q(5)*Math.PI*2}},ct=Ea(n,z,O,K,$,et,s,k),H=ct.length-1;for(let Y=0;Y<H;Y+=1)for(const[st,rt]of[[Y,ct[Y]],[Y+1,ct[Y+1]]]){const St=ms(e.edgeGradient,m+(A-m)*rt.along);x.push(rt.x,rt.y,X+(Q-X)*st/H),D.push(St.r,St.g,St.b,v(rt.along))}});const T=new se;T.setAttribute("position",new Zt(x,3)),T.setAttribute("color",new Zt(D,4));const b=Math.min(.8,Math.max(.2,3/Math.sqrt(p.length))),R=new mn({vertexColors:!0,transparent:!0,opacity:Math.min(.9,b*e.edgeOpacity),blending:e.edgeBlending==="additive"?pi:un,depthWrite:!1}),y=new Li(T,R);return y.renderOrder=h||u?1:-1,y}function Ea(n,t,e,i,r,s,o,a=0){if(!n.back){const u=[[t,e],...n.via.map(({x:d,y:g})=>[d,g+a*Mu]),[i,r]],f=[];for(let d=1;d<u.length;d+=1){const[[g,_],[p,m]]=[u[d-1],u[d]],A=d%2===0?{...s,bend:0}:{...s,wave:void 0},v=fs(g,_,p,m,Mv(g,_,p,m,A),A);f.push(...d===1?v:v.slice(1))}for(const d of f)d.along=i===t?0:(d.x-t)/(i-t);return f}const l=(o-.125*(e+r))/.75+(s.bend??0),c=Cu(Math.hypot(ki,l-e)+Math.abs(i-t-2*ki)+Math.hypot(ki,l-r)),h=[];for(let u=0;u<=c;u+=1){const f=u/c,[d,g,_,p]=[(1-f)**3,3*(1-f)**2*f,3*(1-f)*f*f,f**3];h.push({x:d*t+g*(t+ki)+_*(i-ki)+p*i,y:d*e+(g+_)*l+p*r,along:f})}return h}function Nu(n,t){return Ne(n.from.node)?Math.min(1,t/fc):Ne(n.to.node)?Math.min(1,(1-t)/fc):1}function Rx(n,t,e){const i=n.from.x+n.from.width/2,r=Si(1,n.from,n.outShare)[0],s=n.to.x-n.to.width/2,o=Si(1,n.to,n.inShare)[0],a=Ne(n.to.node),l=Ea(n,i,r,a?s:s-to,o,{handle:.5},e),c=new Pe({color:t.panelBorderHover,transparent:!0,opacity:.75,vertexColors:!0}),h=new ue(Px(l,sx,f=>Nu(n,f)),c);if(a)return h.renderOrder=-1,[h];const u=new ue(new se().setFromPoints([new P(s,o,1),new P(s-to,o+uc/2,1),new P(s-to,o-uc/2,1)]),new Pe({color:t.panelBorderHover,transparent:!0,opacity:.75}));return h.renderOrder=u.renderOrder=-1,[h,u]}function Px(n,t,e){const i=[],r=[],s=[];n.forEach((a,l)=>{const c=n[Math.max(l-1,0)],h=n[Math.min(l+1,n.length-1)],u=h.x-c.x,f=h.y-c.y,d=Math.hypot(u,f)||1,g=-f/d*(t/2),_=u/d*(t/2);if(i.push(a.x+g,a.y+_,1,a.x-g,a.y-_,1),r.push(1,1,1,e(a.along),1,1,1,e(a.along)),l>0){const p=(l-1)*2;s.push(p,p+1,p+2,p+1,p+3,p+2)}});const o=new se;return o.setAttribute("position",new Zt(i,3)),o.setAttribute("color",new Zt(r,4)),o.setIndex(s),o}const Fu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Di{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Lx=new da(-1,1,1,-1,0,1);class Dx extends se{constructor(){super(),this.setAttribute("position",new Zt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Zt([0,2,0,0,2,0],2))}}const Ix=new Dx;class Ta{constructor(t){this._mesh=new ue(Ix,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Lx)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Ux extends Di{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Me?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Ji.clone(t.uniforms),this.material=new Me({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Ta(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class pc extends Di{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const r=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class Nx extends Di{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Fx{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new pt);this._width=i.width,this._height=i.height,e=new We(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:hn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ux(Fu),this.copyPass.material.blending=cn,this.clock=new T_}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}pc!==void 0&&(o instanceof pc?i=!0:o instanceof Nx&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new pt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Ox={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Bx extends Di{constructor(){super();const t=Ox;this.uniforms=Ji.clone(t.uniforms),this.material=new E_({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Ta(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Ht.getTransfer(this._outputColorSpace)===$t&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ec?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Tc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===bc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ac?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===wc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Cc&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class zx extends Di{constructor(t,e,i=null,r=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ft}render(t,e,i){const r=t.autoClear;t.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=r}}const Hx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ft(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ei extends Di{constructor(t,e,i,r){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=r,this.resolution=t!==void 0?new pt(t.x,t.y):new pt(256,256),this.clearColor=new Ft(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new We(s,o,{type:hn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new We(s,o,{type:hn});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const d=new We(s,o,{type:hn});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),o=Math.round(o/2)}const a=Hx;this.highPassUniforms=Ji.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Me({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new pt(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Fu;this.copyUniforms=Ji.clone(h.uniforms),this.blendMaterial=new Me({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:pi,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ft,this.oldClearAlpha=1,this.basic=new Pe,this.fsQuad=new Ta(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),r=Math.round(e/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new pt(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(t,e,i,r,s){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ei.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ei.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new Me({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new pt(.5,.5)},direction:{value:new pt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new Me({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ei.BlurDirectionX=new pt(1,0);Ei.BlurDirectionY=new pt(0,1);const eo=.05,no=20,Gx=2,Vx=.45,kx=.8,Wx=500;class Xx{constructor(t,e){ae(this,"scene",new Wg);ae(this,"camera",new da(-1,1,1,-1,-1e3,1e3));ae(this,"renderer");ae(this,"labelRenderer",new gv);ae(this,"composer");ae(this,"bloomPass");ae(this,"themeHasBloom",!0);ae(this,"needsRender",!0);ae(this,"onUserZoom",null);ae(this,"zoomPausedUntil",0);ae(this,"fitInsetTop",()=>0);ae(this,"fitInsetBottom",()=>0);ae(this,"fitInsetLeft",()=>0);ae(this,"minZoom",eo);this.container=t,this.renderer=new kg({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,Gx)),t.append(this.renderer.domElement),this.labelRenderer.domElement.className="labels",t.append(this.labelRenderer.domElement),this.composer=new Fx(this.renderer),this.composer.addPass(new zx(this.scene,this.camera)),this.bloomPass=new Ei(new pt(1,1),0,0,1),this.composer.addPass(this.bloomPass),this.composer.addPass(new Bx),this.applyTheme(e),this.camera.position.z=10,new ResizeObserver(()=>this.resize()).observe(t),this.resize(),this.attachPanZoom(),this.renderer.setAnimationLoop(()=>this.renderIfNeeded())}requestRender(){this.needsRender=!0}applyTheme(t){this.scene.background instanceof pe&&this.scene.background.dispose(),this.scene.background=qx(t.backgroundTop,t.backgroundBottom),this.themeHasBloom=t.bloom!==null,t.bloom&&(this.bloomPass.strength=t.bloom.strength,this.bloomPass.radius=t.bloom.radius,this.bloomPass.threshold=t.bloom.threshold),this.requestRender()}fitTo(t,e=.88){this.place(this.fitTarget(t,e))}screenRect(t){const e=this.camera.zoom;return{x:((t.left+t.right)/2-this.camera.position.x)*e,y:((t.top+t.bottom)/2-this.camera.position.y)*e,width:(t.right-t.left)*e,height:(t.top-t.bottom)*e}}frameIn(t,e){const i=io(Math.min(e.width/Math.max(t.right-t.left,1),e.height/Math.max(t.top-t.bottom,1)),eo,no);this.place({zoom:i,x:(t.left+t.right)/2-e.x/i,y:(t.top+t.bottom)/2-e.y/i})}fitTarget(t,e){const{width:i,height:r}=this.size(),s=Math.min(this.fitInsetTop(),r/3),o=Math.min(this.fitInsetBottom(),r/4),a=Math.min(this.fitInsetLeft(),i/3),l=Math.max(t.right-t.left,1),c=Math.max(t.top-t.bottom,1),h=io(Math.min((i-a)/l,(r-s-o)/c)*e,eo,no);return{zoom:h,x:(t.left+t.right)/2-a/2/h,y:(t.top+t.bottom)/2+(s-o)/2/h}}place({zoom:t,x:e,y:i}){this.camera.zoom=t,this.camera.position.x=e,this.camera.position.y=i,this.camera.updateProjectionMatrix(),this.requestRender()}toNdc(t,e){const i=this.renderer.domElement.getBoundingClientRect();return new pt((t-i.left)/i.width*2-1,-((e-i.top)/i.height)*2+1)}toWorld(t,e){const i=this.toNdc(t,e);return new P(i.x,i.y,0).unproject(this.camera)}pauseZoom(t){this.zoomPausedUntil=performance.now()+t}zoomStrength(){const t=(performance.now()-this.zoomPausedUntil)/Wx;return t<=0?0:t>=1?1:t*t*(3-2*t)}size(){return{width:this.container.clientWidth||1,height:this.container.clientHeight||1}}resize(){const{width:t,height:e}=this.size();Object.assign(this.camera,{left:-t/2,right:t/2,top:e/2,bottom:-e/2}),this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e),this.labelRenderer.setSize(t,e),this.composer.setSize(t,e),this.requestRender()}renderIfNeeded(){if(!this.needsRender)return;this.needsRender=!1,this.themeHasBloom?this.composer.render():this.renderer.render(this.scene,this.camera);const t=this.camera.zoom;this.labelRenderer.domElement.dataset.detail=t<Vx?"low":t<kx?"medium":"full",this.labelRenderer.domElement.style.setProperty("--zoom",String(t)),this.labelRenderer.render(this.scene,this.camera)}attachPanZoom(){const t=this.renderer.domElement;let e=null;t.addEventListener("pointerdown",r=>{e={x:r.clientX,y:r.clientY},t.setPointerCapture(r.pointerId)}),t.addEventListener("pointermove",r=>{e&&(this.camera.position.x-=(r.clientX-e.x)/this.camera.zoom,this.camera.position.y+=(r.clientY-e.y)/this.camera.zoom,e={x:r.clientX,y:r.clientY},this.requestRender())});const i=()=>e=null;t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i),t.addEventListener("wheel",r=>{var c;r.preventDefault();const s=this.zoomStrength();if(s===0)return;const o=this.toWorld(r.clientX,r.clientY),a=io(this.camera.zoom*Math.exp(-r.deltaY*.0015*s),this.minZoom,no);if(a===this.camera.zoom)return;this.camera.zoom=a,this.camera.updateProjectionMatrix();const l=this.toWorld(r.clientX,r.clientY);this.camera.position.x+=o.x-l.x,this.camera.position.y+=o.y-l.y,this.requestRender(),(c=this.onUserZoom)==null||c.call(this,this.camera.zoom,r.clientX,r.clientY)},{passive:!1})}}function io(n,t,e){return Math.min(e,Math.max(t,n))}function qx(n,t){const e=document.createElement("canvas");e.width=2,e.height=256;const i=e.getContext("2d"),r=i.createLinearGradient(0,0,0,e.height);r.addColorStop(0,n),r.addColorStop(1,t),i.fillStyle=r,i.fillRect(0,0,e.width,e.height);const s=new qg(e);return s.colorSpace=be,s}const mc="1.3",Ti={dark:{name:"dark",backgroundTop:"#0d0d12",backgroundBottom:"#050507",panelFill:"#15151c",panelFillOpacity:.7,panelBorder:"#3a3a48",panelBorderHover:"#f4f4f5",neuron:"#fafafa",muted:"#71717a",edgeGradient:["#ffa94d","#ff6b9a","#c084fc","#9f8cff"],edgeBlending:"additive",edgeOpacity:1,dimmedEdges:.3,bloom:{strength:.35,radius:.3,threshold:.5}},light:{name:"light",backgroundTop:"#f6f6f7",backgroundBottom:"#ececee",panelFill:"#ffffff",panelFillOpacity:.9,panelBorder:"#c4c4cc",panelBorderHover:"#18181b",neuron:"#18181b",muted:"#71717a",edgeGradient:["#e8590c","#d6336c","#7c3aed","#5b21b6"],edgeBlending:"normal",edgeOpacity:1.4,dimmedEdges:.35,bloom:null}},Ou="neurolume-theme";function Yx(){try{const n=localStorage.getItem(Ou);if(n==="dark"||n==="light")return Ti[n]}catch{}return Ti[window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"]}function $x(n){try{localStorage.setItem(Ou,n.name)}catch{}}const ss={dark:[{name:"Ember",colors:Ti.dark.edgeGradient},{name:"Aurora",colors:["#5eead4","#38bdf8","#818cf8","#c084fc"]},{name:"Plasma",colors:["#f0f921","#fca636","#e16462","#b12a90"]},{name:"Viridis",colors:["#fde725","#5ec962","#21918c","#3b528b"]},{name:"Ice",colors:["#f0f9ff","#bae6fd","#7dd3fc","#a5b4fc"]}],light:[{name:"Ember",colors:Ti.light.edgeGradient},{name:"Ocean",colors:["#0e7490","#0369a1","#4338ca","#6d28d9"]},{name:"Magma",colors:["#3b0f70","#8c2981","#de4968","#f97316"]},{name:"Viridis",colors:["#440154","#31688e","#21918c","#35b779"]},{name:"Ink",colors:["#18181b","#3f3f46","#52525b","#27272a"]}]},Bu=n=>`neurolume-colormap-${n}`;function ta(n){try{const t=localStorage.getItem(Bu(n)),e=ss[n].find(i=>i.name===t);if(e)return e}catch{}return ss[n][0]}function Zx(n,t){try{localStorage.setItem(Bu(n),t.name)}catch{}}function ea(n,t){return{...n,edgeGradient:t.colors}}function Kx(n){return`linear-gradient(90deg, ${n.colors.join(", ")})`}const Jx="modulepreload",jx=function(n){return"/"+n},gc={},Qx=function(t,e,i){let r=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=Promise.allSettled(e.map(l=>{if(l=jx(l),l in gc)return;gc[l]=!0;const c=l.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":Jx,c||(u.as="script"),u.crossOrigin="",u.href=l,a&&u.setAttribute("nonce",a),document.head.appendChild(u),c)return new Promise((f,d)=>{u.addEventListener("load",f),u.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})},t0={input:"Input",output:"Output",dense:"Dense layer",conv1d:"Convolution",conv2d:"Convolution",pool:"Pooling",norm:"Normalisation",activation:"Activation",dropout:"Dropout",flatten:"Flatten",reshape:"Reshape",custom:"Custom layer"};class e0{constructor(t,e,i){ae(this,"element",document.createElement("aside"));this.graph=e,this.onClose=i,this.element.className="inspector surface",this.element.hidden=!0,this.element.setAttribute("aria-label","Layer details"),t.append(this.element)}show(t){const e=n0(this.graph,t),i=t.params.description,r=e?typeof i=="string"?i:"":[t.label,hs(t.activation)].filter(Boolean).join(" · "),s=t.output_shape.reduce((l,c)=>l*c,1),o=_c([["Input",t.input_shape.length>0?nr(t.input_shape):"—"],["Output",t.output_shape.length>0?nr(t.output_shape):"—"]]),a=Object.entries(t.params).filter(([l])=>!(e&&l==="description")).map(([l,c])=>[i0(l),Array.isArray(c)?c.join(" × "):String(c)]);this.element.innerHTML=`
      <header class="inspector-header">
        <div>
          <p class="eyebrow">${e?"Block":jt(t0[t.type]??t.type)}</p>
          <h2>${jt(e?t.label:ir(t))}</h2>
          ${r?`<p class="subtitle">${jt(r)}</p>`:""}
        </div>
        <button class="icon-button" data-close title="Close (Esc)" aria-label="Close">${r0}</button>
      </header>
      <div class="stats">
        <div><span class="stat-value">${kn(t.param_count)}</span><span class="stat-label">Parameters</span></div>
        <div><span class="stat-value">${t.output_shape.length>0?kn(s):"—"}</span><span class="stat-label">Output units</span></div>
      </div>
      <section><h3>Shapes</h3>${o}</section>
      ${a.length>0?`<section><h3>Configuration</h3>${_c(a)}</section>`:""}
      ${t.notes?'<section><h3>Notes</h3><div class="notes"></div></section>':""}
      ${this.weightNote(t)}`,this.element.querySelector("[data-close]").addEventListener("click",()=>this.hide()),this.element.hidden=!1,t.notes&&this.renderNotes(t.notes)}async renderNotes(t){const e=this.element.querySelector(".notes"),{renderMarkdown:i}=await Qx(async()=>{const{renderMarkdown:r}=await import("./notes-BKaGThLj.js");return{renderMarkdown:r}},__vite__mapDeps([0,1]));e!=null&&e.isConnected&&(e.innerHTML=i(t))}get isOpen(){return!this.element.hidden}hide(){this.element.hidden||(this.element.hidden=!0,this.onClose())}weightNote(t){var o;const e=(o=this.graph.weights)==null?void 0:o[t.id],i=t.params.in_features,r=t.params.out_features;if(!e||typeof i!="number"||typeof r!="number")return"";const s=e.mode==="topk"?"strongest":"randomly sampled";return`<p class="note">Edges show the ${kn(e.k)} ${s} of ${kn(i*r)} connections.</p>`}}function n0(n,t){return t.type==="custom"&&t.group===null&&n.groups.length>0}function _c(n){return`<dl>${n.map(([e,i])=>`<dt>${jt(e)}</dt><dd>${jt(i)}</dd>`).join("")}</dl>`}function i0(n){const t=n.replace(/_/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}const r0='<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',s0=4,o0=400,vc=new b_;function zu(n,t,e,i){vc.setFromCamera(n.toNdc(e,i),n.camera);const r=vc.intersectObjects(t.pickables.map(s=>s.mesh),!1)[0];return r?t.pickables.find(s=>s.mesh===r.object)??null:null}function a0(n,t,e,i,r){const s=n.renderer.domElement,o=new AbortController,a={signal:o.signal};let l=null,c=null,h=null;const u=performance.now()+o0,f=g=>zu(n,t,g.clientX,g.clientY);function d(){for(const _ of t.pickables)kv(t.theme,_,_===l||_===c);const g=l??c;for(const _ of t.edges){const p=!g||g.links.length===0||g.links.includes(_);Ov(_,_.baseOpacity*(p?1:t.theme.dimmedEdges))}n.requestRender()}return s.addEventListener("pointermove",g=>{const _=f(g);if(_!==l&&(l=_,s.style.cursor=_?"pointer":"grab",d()),_){const{node:p}=_,m=[p.output_shape.length>0?nr(p.output_shape):"",hs(p.activation),p.param_count>0?`${Au(p.param_count)} params`:""].filter(Boolean);i.innerHTML=`<div class="tooltip-title">${jt(ir(p))}${p.label!==ir(p)?` <span>${jt(p.label)}</span>`:""}</div><div class="tooltip-meta">${m.map(jt).join(" · ")}</div>`,i.style.transform=`translate(${g.clientX+16}px, ${g.clientY+16}px)`}i.hidden=!_||h!==null},a),s.addEventListener("pointerleave",()=>{l=null,i.hidden=!0,d()},a),s.addEventListener("pointerdown",g=>h={x:g.clientX,y:g.clientY},a),s.addEventListener("pointerup",g=>{const _=h;if(h=null,performance.now()<u||!_||Math.hypot(g.clientX-_.x,g.clientY-_.y)>s0)return;const p=f(g);if(p!=null&&p.activate){p.activate();return}c=p,c?e.show(c.node):e.hide(),d()},a),s.addEventListener("dblclick",g=>{if(performance.now()<u)return;const _=f(g);if(!_){r();return}if(_.activate)return;_.mesh.geometry.computeBoundingBox();const p=_.mesh.geometry.boundingBox;n.fitTo({left:p.min.x-60,right:p.max.x+60,top:p.max.y,bottom:p.min.y},.8)},a),{clearSelection:()=>{c=null,d()},detach:()=>{o.abort(),i.hidden=!0}}}const l0={back:'<path d="M10 3L5 8l5 5"/>',settings:'<path d="M2 5h7M13 5h1M2 11h1M7 11h7"/><circle cx="11" cy="5" r="2"/><circle cx="5" cy="11" r="2"/>'},c0=[["Zoom","Scroll"],["Pan","Drag"],["Layer or block details","Click"],["Open a network","Click / zoom in"],["Back to the overview","Zoom out / Esc"],["Fit to screen","Double-click / F"],["Light or dark","T"]];function xc(n){return`<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${l0[n]}</svg>`}async function u0(){if(window.__NEUROLUME_GRAPH__)return window.__NEUROLUME_GRAPH__;const n=await fetch("/api/graph");if(!n.ok)throw new Error(`Graph request failed: ${n.status}`);return await n.json()}const h0=.5,Mc=.6,f0=300,d0=.45;function Hu(n,t,e=null){const i=xu(n);return{kind:"network",graph:n,bounds:i.bounds,parent:t,origin:e,build:r=>Gv(i,n,r)}}function Gu(n,t,e=null,i=null){const r=Eu(n),s={kind:"system",graph:n,bounds:r.bounds,parent:e,origin:i,cardBounds:o=>{const a=r.cards.find(l=>{var c;return((c=l.group)==null?void 0:c.id)===o});return a?{left:a.x-a.width/2,right:a.x+a.width/2,top:a.y+a.height/2,bottom:a.y-a.height/2}:null},build:o=>dx(r,o,a=>t(Vu(s,a,t)))};return s}function Vu(n,t,e){const i=yu(n.graph,t);return is(i)?Gu(i,e,n,t):Hu(i,n,t)}class p0{constructor(t,e,i,r,s){ae(this,"view",null);ae(this,"network",null);ae(this,"interaction",null);ae(this,"fitZoom",1);ae(this,"lastZoom",1);this.viewer=t,this.inspector=e,this.tooltip=i,this.onViewChange=r,this.theme=s,t.onUserZoom=(o,a,l)=>{var h;const c=o>this.lastZoom;this.lastZoom=o,(h=this.view)!=null&&h.parent&&o<this.fitZoom*h0?this.back():c&&o>this.fitZoom&&this.openCardUnder(a,l,o)}}openCardUnder(t,e,i){if(!this.network)return;const r=zu(this.viewer,this.network,t,e);if(!(r!=null&&r.activate))return;const s=new Cn().setFromObject(r.mesh),{width:o,height:a}=this.viewer.size();((s.max.x-s.min.x)*i>=o*Mc||(s.max.y-s.min.y)*i>=a*Mc)&&r.activate()}show(t){const e=this.view!==null&&na(t).length>na(this.view).length;this.view=t,this.onViewChange(t),this.remount(),this.fit(),e&&this.viewer.pauseZoom(f0)}back(){var r,s;const t=this.view;if(!(t!=null&&t.parent))return!1;const e=this.viewer.screenRect(t.bounds);this.show(t.parent);const i=t.origin?(s=(r=t.parent).cardBounds)==null?void 0:s.call(r,t.origin):null;return i&&(this.viewer.frameIn(i,e),this.lastZoom=this.viewer.camera.zoom),!0}openPath(t){let e=this.view;for(;e!=null&&e.parent;)e=e.parent;if(!e)return;const i=r=>this.show(r);for(const r of t)e=Vu(e,r,i);this.show(e)}fit(){this.view&&(this.viewer.fitTo(this.view.bounds),this.fitZoom=this.viewer.camera.zoom,this.lastZoom=this.fitZoom,this.viewer.minZoom=this.fitZoom*d0)}setTheme(t){this.theme=t,this.viewer.applyTheme(t),this.remount()}clearSelection(){var t;(t=this.interaction)==null||t.clearSelection()}remount(){var t;this.inspector.hide(),(t=this.interaction)==null||t.detach(),this.network&&Vv(this.network),this.view&&(document.documentElement.dataset.theme=this.theme.name,this.network=this.view.build(this.theme),this.viewer.scene.add(this.network.root),this.interaction=a0(this.viewer,this.network,this.inspector,this.tooltip,()=>this.fit()),this.viewer.requestRender())}}function na(n){const t=[];for(let e=n;e!=null&&e.origin;e=e.parent)t.unshift(e.origin);return t}function m0(n,t,e){let i=t;for(;i.parent;)i=i.parent;const{groups:r}=i.graph;n.hidden=r.length===0;const s=na(t);n.innerHTML='<p class="eyebrow">Levels</p>';const o=(a,l)=>{const c=l.every((f,d)=>s[d]===f),h=c&&l.length===s.length,u=document.createElement(h?"span":"button");u.className="depth-row",u.style.paddingLeft=`${8+l.length*14}px`,u.innerHTML=`${l.length>0?'<span class="depth-branch"></span>':""}${jt(a)}`,h?u.setAttribute("aria-current","true"):(c&&u.classList.add("is-ancestor"),u.addEventListener("click",()=>e.openPath(l))),n.append(u);for(const f of r.filter(d=>d.parent===(l[l.length-1]??null)))o(f.label,[...l,f.id])};o(i.graph.model.name,[])}function g0(n,t){const{model:e,nodes:i,groups:r}=t.graph,s=t.kind==="system"?[`<span><strong>${r.filter(a=>a.parent===null).length}</strong> networks</span>`]:[`<span><strong>${i.filter(a=>a.type!=="input"&&a.type!=="output").length}</strong> layers</span>`],o=t.parent?` · in ${jt(t.parent.graph.model.name)}`:"";n.innerHTML=`
    <p class="eyebrow">${jt(wu(e.framework))}${o}</p>
    <h1>${jt(e.name)}</h1>
    <p class="title-meta">
      <span><strong>${kn(e.total_params)}</strong> parameters</span>
      ${s.join("")}
    </p>`}function _0(n,t,e){let i=Ti[e.name],r=ta(i.name);const s=document.createElement("nav");s.className="controls surface",s.setAttribute("aria-label","View controls"),s.innerHTML=`
    <button data-action="back" title="Back to the overview (Esc)" hidden>${xc("back")}<span>Overview</span></button>
    <div class="settings">
      <button data-action="settings" aria-haspopup="dialog" aria-expanded="false">${xc("settings")}<span>Settings</span></button>
      <div class="settings-panel surface" role="dialog" aria-label="Settings" hidden></div>
    </div>`;const o=s.querySelector('[data-action="back"]'),a=s.querySelector('[data-action="settings"]'),l=s.querySelector(".settings-panel"),c=()=>{const f=(d,g,_)=>`<button role="radio" ${g} aria-checked="${d}">${_}</button>`;l.innerHTML=`
      <section>
        <h3>Theme</h3>
        <div class="segmented" role="radiogroup" aria-label="Theme">
          ${f(i.name==="dark",'data-theme-name="dark"',"Dark")}
          ${f(i.name==="light",'data-theme-name="light"',"Light")}
        </div>
      </section>
      <section>
        <h3>Edge colours</h3>
        <div class="colormap-list" role="radiogroup" aria-label="Edge colours">
          ${ss[i.name].map(d=>f(d.name===r.name,`data-colormap="${jt(d.name)}"`,`<span class="swatch" style="background: ${Kx(d)}"></span>${jt(d.name)}`)).join("")}
        </div>
      </section>
      <section>
        <h3>Controls</h3>
        <dl class="shortcuts">${c0.map(([d,g])=>`<dt>${d}</dt><dd>${g}</dd>`).join("")}</dl>
      </section>`},h=f=>{l.hidden=!f,a.setAttribute("aria-expanded",String(f))},u=f=>{f!==i.name&&(i=Ti[f],r=ta(i.name),$x(i),t.setTheme(ea(i,r)),c())};return a.addEventListener("click",()=>h(l.hidden)),l.addEventListener("click",f=>{const d=f.target.closest("button");((d==null?void 0:d.dataset.themeName)==="dark"||(d==null?void 0:d.dataset.themeName)==="light")&&u(d.dataset.themeName);const g=ss[i.name].find(_=>_.name===(d==null?void 0:d.dataset.colormap));g&&(r=g,Zx(i.name,r),t.setTheme(ea(i,r)),c())}),document.addEventListener("pointerdown",f=>{!l.hidden&&!s.contains(f.target)&&h(!1)}),o.addEventListener("click",()=>t.back()),window.addEventListener("keydown",f=>{f.key==="Escape"&&!l.hidden&&(h(!1),f.stopImmediatePropagation()),f.key==="f"&&t.fit(),f.key==="t"&&u(i.name==="dark"?"light":"dark")}),c(),n.append(s),o}async function v0(){const n=document.querySelector("#app");if(!n)throw new Error("Neurolume mount element was not found");const t=await u0();t.schema_version.split(".")[0]!==mc.split(".")[0]&&console.warn(`Graph uses schema ${t.schema_version}; this viewer expects ${mc}`),document.title=`${t.model.name} – Neurolume`;const e=Yx(),i=ea(e,ta(e.name)),r=new Xx(n,i),s=document.createElement("div");s.className="tooltip surface",s.hidden=!0,n.append(s);const o=document.createElement("header");o.className="title-card surface";const a=document.createElement("nav");a.className="depth-tree surface",a.setAttribute("aria-label","Levels"),a.hidden=!0;let l=null,c=null;const h=new e0(n,t,()=>l==null?void 0:l.clearSelection());l=new p0(r,h,s,d=>{g0(o,d),l&&m0(a,d,l),c&&(c.hidden=d.parent===null)},i),n.append(o,a),r.fitInsetTop=()=>o.getBoundingClientRect().bottom-n.getBoundingClientRect().top;const u=()=>a.getBoundingClientRect().height>n.getBoundingClientRect().height/4;r.fitInsetBottom=()=>a.hidden||u()?0:n.getBoundingClientRect().bottom-a.getBoundingClientRect().top,r.fitInsetLeft=()=>a.hidden||!u()?0:a.getBoundingClientRect().right-n.getBoundingClientRect().left,c=_0(n,l,i);const f=d=>l==null?void 0:l.show(d);l.show(is(t)?Gu(t,f):Hu(t,null)),window.addEventListener("keydown",d=>{d.key==="Escape"&&(h.isOpen?h.hide():l==null||l.back())})}v0().catch(n=>{document.body.innerHTML=`<pre class="error">Neurolume could not start:
${jt(String(n))}</pre>`,console.error(n)});

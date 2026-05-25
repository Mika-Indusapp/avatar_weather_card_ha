/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t=>t,s$1=t.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$1=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$1,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$1+x):s+o$1+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$1),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$1)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$1),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$1,t+1));)d.push({type:7,index:l}),t+=o$1.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

class AvatarWeatherCardEditor extends i {
  
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object }
    };
  }

  constructor() {
    super();
    this._config = {};
  }

  setConfig(config) {
    this._config = config || {};
  }

  render() {
    if (!this.hass || !this._config) {
      return b``;
    }

    // Le schéma automatique : Home Assistant va dessiner lui-même les composants parfaits
    const schema = [
      { 
        name: "entity", 
        selector: { entity: { domain: "weather" } } 
      },
      { 
        name: "title", 
        selector: { text: {} } 
      },
      {
        name: "forecast_day",
        selector: {
          select: {
            options: [
              { value: "0", label: "Actuelle / Aujourd'hui" },
              { value: "1", label: "Demain (Prévision J+1)" },
              { value: "2", label: "Après-demain (Prévision J+2)" }
            ]
          }
        }
      }
    ];

    return b`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${schema}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }

  // Permet de donner un joli nom en français aux champs du formulaire
  _computeLabel(schema) {
    const labels = {
      entity: "Entité Météo",
      title: "Titre de la carte",
      forecast_day: "Temporalité de l'avatar"
    };
    return labels[schema.name] || schema.name;
  }

  // Reçoit les modifications de ha-form et les renvoie proprement à Lovelace
  _valueChanged(ev) {
    ev.stopPropagation();
    const newConfig = ev.detail.value;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true
      })
    );
  }

  static get styles() {
    return i$3`
      .card-config {
        padding: 16px 0;
      }
    `;
  }
}

if (!customElements.get("avatar-weather-card-editor")) {
  customElements.define("avatar-weather-card-editor", AvatarWeatherCardEditor);
}

// Contient l'intégralité du dessin vectoriel de l'avatar et de ses vêtements
const avatarSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="100%" height="100%">
    
    <g id="corps-de-base">
      <rect x="85" y="190" width="10" height="70" fill="#D7CCC8" rx="2"/>
      <rect x="105" y="190" width="10" height="70" fill="#D7CCC8" rx="2"/>
      <ellipse cx="90" cy="260" rx="8" ry="4" fill="#37474F" />
      <ellipse cx="110" cy="260" rx="8" ry="4" fill="#37474F" />
      
      <path d="M 130 110 Q 150 120 150 155" stroke="#FFD54F" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M 70 110 Q 55 130 55 165" stroke="#FFD54F" stroke-width="10" stroke-linecap="round" fill="none" />
      
      <path d="M 72 100 L 128 100 L 122 150 L 78 150 Z" fill="#E0E0E0" />
      
      <circle cx="100" cy="70" r="25" fill="#FFD54F" />
      <circle cx="92" cy="68" r="2.5" fill="#333" />
      <circle cx="108" cy="68" r="2.5" fill="#333" />
      <path d="M 93 78 Q 100 85 107 78" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
  
    <g class="vetement-chaud">
      <path d="M 72 100 Q 62 110 60 118" stroke="#29B6F6" stroke-width="12" stroke-linecap="round" />
      <path d="M 128 100 Q 138 110 142 118" stroke="#29B6F6" stroke-width="12" stroke-linecap="round" />
      <path d="M 70 100 L 130 100 L 125 145 L 75 145 Z" fill="#29B6F6" />
      <rect x="75" y="145" width="50" height="35" fill="#26A69A" />
    </g>
  
    <g class="vetement-tempere">
      <path d="M 72 100 Q 58 122 56 150" stroke="#D4A373" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M 128 100 Q 146 118 148 145" stroke="#D4A373" stroke-width="12" stroke-linecap="round" fill="none" />
      <rect x="75" y="145" width="50" height="75" fill="#78909C" />
      <path d="M 70 100 L 130 100 L 125 150 L 75 150 Z" fill="#EEEEEE" />
      <path d="M 68 98 L 92 98 L 90 150 L 68 145 Z" fill="#D4A373" />
      <path d="M 132 98 L 108 98 L 110 150 L 132 145 Z" fill="#D4A373" />
    </g>
  
    <g class="vetement-coupevent">
      <path d="M 72 100 Q 58 122 56 150" stroke="#26A69A" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M 128 100 Q 146 118 148 145" stroke="#26A69A" stroke-width="12" stroke-linecap="round" fill="none" />
      <rect x="75" y="145" width="50" height="75" fill="#78909C" />
      <path d="M 68 98 L 132 98 L 126 150 L 74 150 Z" fill="#26A69A" rx="4" /> 
      <line x1="100" y1="98" x2="100" y2="150" stroke="#004D40" stroke-width="2" />
    </g>
  
    <g class="vetement-froid">
      <path d="M 72 100 Q 56 122 54 152" stroke="#AB47BC" stroke-width="16" stroke-linecap="round" fill="none" />
      <path d="M 128 100 Q 148 118 150 142" stroke="#AB47BC" stroke-width="16" stroke-linecap="round" fill="none" />
      <rect x="73" y="145" width="54" height="85" fill="#37474F" rx="4" />
      <path d="M 65 95 L 135 95 L 130 195 L 70 195 Z" fill="#AB47BC" rx="8" />
      <line x1="67" y1="125" x2="133" y2="125" stroke="#7B1FA2" stroke-width="2" />
      <line x1="69" y1="160" x2="131" y2="160" stroke="#7B1FA2" stroke-width="2" />
    </g>
    
    <g class="meteo-soleil">
      <rect x="83" y="63" width="15" height="10" fill="#333" rx="2" />
      <rect x="102" y="63" width="15" height="10" fill="#333" rx="2" />
      <line x1="98" y1="66" x2="102" y2="66" stroke="#333" stroke-width="2" />
    </g>
    
    <g class="accessoire-bonnet">
      <path d="M 75 58 Q 100 25 125 58 Z" fill="#FF7043" />
      <rect x="72" y="53" width="56" height="8" fill="#F4511E" rx="3" />
      <circle cx="100" cy="30" r="5" fill="#FFF" />
    </g>
  
    <g class="meteo-pluie">
      <path d="M 148 145 L 148 50 Q 148 45 142 45" stroke="#455A64" stroke-width="3" fill="none" />
      <path d="M 105 50 Q 150 10 195 50 Z" fill="#EF5350" />
    </g>
    
    <g class="meteo-vent">
      <path d="M 20 80 Q 40 75 50 85 M 45 85 L 35 85" stroke="#B0BEC5" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 15 120 Q 30 125 45 115 M 40 115 L 30 115" stroke="#B0BEC5" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
  </svg>
`;

// ==========================================
//          LOGIQUE MÉTIER DE L'AVATAR
// ==========================================

function getWeatherState(hass, config) {
  const entityId = config.entity;
  if (!entityId || !hass.states[entityId]) return null;
  const stateObj = hass.states[entityId];

  let weatherState = stateObj.state;
  const targetDay = parseInt(config.forecast_day || "0", 10);

  if (targetDay > 0 && stateObj.attributes.forecast && stateObj.attributes.forecast.length >= targetDay) {
    weatherState = stateObj.attributes.forecast[targetDay - 1].condition;
  }
  return weatherState;
}

function getWeatherClass(weatherState) {
  if (!weatherState) return 'temperate';
  const mapping = {
    'sunny': 'sunny',
    'clear-night': 'sunny',
    'rainy': 'rainy',
    'pouring': 'rainy',
    'hail': 'rainy',
    'snowy': 'snowy',
    'snowy-rainy': 'snowy',
    'windy': 'windy',
    'windy-variant': 'windy',
    'cloudy': 'temperate',
    'partlycloudy': 'temperate',
    'fog': 'temperate'
  };
  return mapping[weatherState] || 'temperate';
}

// ==========================================
//          COMPOSANT CARTE PRINCIPAL
// ==========================================

class AvatarWeatherCard extends i {
  
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object }
    };
  }

  static getConfigElement() {
    return document.createElement("avatar-weather-card-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      title: "", 
      forecast_day: "0"
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Veuillez sélectionner une entité météo.");
    }
    this._config = config;
  }

  render() {
    if (!this.hass || !this._config) return b``;

    const entityId = this._config.entity;
    const stateObj = this.hass.states[entityId];

    if (!stateObj) {
      return b`
        <ha-card>
          <div class="error" style="padding: 16px; color: var(--error-color);">
            Entité introuvable : ${entityId}
          </div>
        </ha-card>
      `;
    }

    const weatherState = getWeatherState(this.hass, this._config);
    const weatherClass = getWeatherClass(weatherState);
    const hasTitle = this._config.title && this._config.title.trim() !== "";

    // LA SOLUTION EST ICI : Utilisation de .innerHTML natif pour injecter le SVG
    // Plus besoin de unsafeHTML !
    return b`
      <ha-card .header=${hasTitle ? this._config.title : undefined}>
        <div class="card-content">
          <div class="avatar-container state-${weatherClass}" .innerHTML=${avatarSVG}>
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return i$3`
      :host {
        display: block;
      }
      .card-content {
        padding: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .avatar-container {
        display: flex;
        justify-content: center;
        width: 100%;
        max-width: 250px;
        height: auto;
      }
      
      .meteo-soleil, .meteo-pluie, .meteo-vent, 
      .vetement-chaud, .vetement-tempere, .vetement-coupevent, 
      .vetement-froid, .accessoire-bonnet { 
        display: none; 
      }

      .state-sunny .meteo-soleil, .state-sunny .vetement-chaud { display: block; }
      .state-temperate .vetement-tempere { display: block; }
      .state-windy .vetement-coupevent, .state-windy .meteo-vent { display: block; }
      .state-rainy .meteo-pluie, .state-rainy .vetement-tempere { display: block; }
      .state-snowy .vetement-froid, .state-snowy .accessoire-bonnet { display: block; }
    `;
  }
}

if (!customElements.get("avatar-weather-card")) {
  customElements.define("avatar-weather-card", AvatarWeatherCard);
}

const registerCard = () => {
  window.customCards = window.customCards || [];
  if (!window.customCards.some(c => c.type === "avatar-weather-card")) {
    window.customCards.push({
      type: "avatar-weather-card",
      name: "Avatar Weather Card",
      description: "Un personnage qui s'habille selon la météo.",
      preview: true,
    });
  }
};

registerCard();
if (window.loadCardHelpers) {
  registerCard();
}

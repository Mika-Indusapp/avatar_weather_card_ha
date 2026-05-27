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
  <svg
   viewBox="0 0 200 300"
   width="100%"
   height="100%"
   version="1.1"
   id="svg27"
   sodipodi:docname="svg-templates.svg"
   inkscape:version="1.4.4 (dcaf3e7, 2026-05-05)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs27" />
  <sodipodi:namedview
     id="namedview27"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     showgrid="false"
     inkscape:zoom="2.69"
     inkscape:cx="100"
     inkscape:cy="150"
     inkscape:window-width="1920"
     inkscape:window-height="1009"
     inkscape:window-x="2989"
     inkscape:window-y="-8"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg27" />
  <g
     id="corps-de-base"
     style="display:inline">
    <rect
       x="85"
       y="190"
       width="10"
       height="70"
       fill="#d7ccc8"
       rx="2"
       id="rect1" />
    <rect
       x="105"
       y="190"
       width="10"
       height="70"
       fill="#d7ccc8"
       rx="2"
       id="rect2" />
    <ellipse
       cx="90"
       cy="260"
       rx="8"
       ry="4"
       fill="#37474f"
       id="ellipse2" />
    <ellipse
       cx="110"
       cy="260"
       rx="8"
       ry="4"
       fill="#37474f"
       id="ellipse3" />
    <path
       d="m 130,110 q 20,10 20,45"
       stroke="#ffd54f"
       stroke-width="10"
       stroke-linecap="round"
       fill="none"
       id="path3" />
    <path
       d="M 70,110 Q 55,130 55,165"
       stroke="#ffd54f"
       stroke-width="10"
       stroke-linecap="round"
       fill="none"
       id="path4" />
    <path
       d="m 72,100 h 56 l -6,50 H 78 Z"
       fill="#e0e0e0"
       id="path5" />
    <circle
       cx="100"
       cy="70"
       r="25"
       fill="#ffd54f"
       id="circle5" />
    <circle
       cx="92"
       cy="68"
       r="2.5"
       fill="#333333"
       id="circle6" />
    <circle
       cx="108"
       cy="68"
       r="2.5"
       fill="#333333"
       id="circle7" />
    <path
       d="m 93,78 q 7,7 14,0"
       stroke="#333333"
       stroke-width="2"
       fill="none"
       stroke-linecap="round"
       id="path7" />
  </g>
  <g
     class="vetement-chaud"
     id="g10"
     style="display:inline">
    <path
       d="m 72.743495,106.3197 c -6.666667,6.66667 -8.807932,10.80793 -10.141265,16.14126"
       stroke="#29b6f6"
       stroke-width="12"
       stroke-linecap="round"
       id="path8"
       sodipodi:nodetypes="cc"
       style="stroke:#f64229;stroke-opacity:1" />
    <path
       d="m 127.62825,106.3197 c 6.66667,6.66667 10.96159,8.2057 13.62826,13.53904"
       stroke="#29b6f6"
       stroke-width="12"
       stroke-linecap="round"
       id="path9"
       sodipodi:nodetypes="cc"
       style="stroke:#f64229;stroke-opacity:1" />
    <path
       d="m 70,100 h 60 l -5,48.71747 H 75 Z"
       fill="#29b6f6"
       id="path10"
       style="fill:#f64229;fill-opacity:1"
       sodipodi:nodetypes="ccccc" />
    <rect
       x="75"
       y="148.71747"
       width="50"
       height="17.156145"
       fill="#26a69a"
       id="rect10"
       ry="0" />
    <path
       d="m 75,165.87361 h 25 l -3.171004,24.08922 -18.085501,-0.33458 z"
       fill="#29b6f6"
       id="path10-9"
       style="display:inline;fill:#26a69a;fill-opacity:1"
       sodipodi:nodetypes="ccccc" />
    <path
       d="m 100,165.87361 h 25 L 121.62825,190 H 105 Z"
       fill="#29b6f6"
       id="path10-9-8"
       style="display:inline;fill:#26a69a;fill-opacity:1"
       sodipodi:nodetypes="ccccc" />
  </g>
  <g
     class="vetement-tempere"
     id="g15"
     style="display:inline">
    <path
       d="M 72,103.71747 C 62.666667,118.38414 57.333333,131.33333 56,150"
       stroke="#d4a373"
       stroke-width="12"
       stroke-linecap="round"
       fill="none"
       id="path11"
       sodipodi:nodetypes="cc" />
    <path
       d="m 128.88476,103.71747 c 12,12 19.64065,23.65428 20.97398,41.65428"
       stroke="#d4a373"
       stroke-width="12"
       stroke-linecap="round"
       fill="none"
       id="path12"
       sodipodi:nodetypes="cc" />
    <rect
       x="75"
       y="145"
       width="50"
       height="25.929365"
       fill="#78909c"
       id="rect12" />
    <path
       d="m 70,100 h 60 l -5,50 H 75 Z"
       fill="#eeeeee"
       id="path13" />
    <path
       d="m 68,98 h 24 l -2,52 -22,-5 z"
       fill="#d4a373"
       id="path14" />
    <path
       d="m 132,98 h -24 l 2,52 22,-5 z"
       fill="#d4a373"
       id="path15" />
    <path
       d="m 125,170.92937 h -25 l 2,72.96654 18,-0.53904 z"
       fill="#d4a373"
       id="path15-2"
       style="display:inline;fill:#78909c;fill-opacity:1"
       sodipodi:nodetypes="ccccc" />
    <path
       d="M 100,170.92937 H 75 l 4.769517,73.71003 18.204461,-0.74349 z"
       fill="#d4a373"
       id="path15-2-5"
       style="display:inline;fill:#78909c;fill-opacity:1"
       sodipodi:nodetypes="ccccc" />
  </g>
  <g
     class="vetement-coupevent"
     id="g18"
     style="display:inline">
    <path
       d="M 72.743494,103.71747 C 63.410161,118.38414 57.333333,131.33333 56,150"
       stroke="#26a69a"
       stroke-width="12"
       stroke-linecap="round"
       fill="none"
       id="path16"
       sodipodi:nodetypes="cc" />
    <path
       d="m 128.51301,104.42379 c 12,12 20.01239,22.20446 21.34573,40.20446"
       stroke="#26a69a"
       stroke-width="12"
       stroke-linecap="round"
       fill="none"
       id="path17"
       sodipodi:nodetypes="cc" />
    <rect
       x="75"
       y="145"
       width="50"
       height="25.929371"
       fill="#78909c"
       id="rect17" />
    <path
       d="m 68,98 h 64 l -6,52 H 74 Z"
       fill="#26a69a"
       rx="4"
       id="path18" />
    <line
       x1="100"
       y1="98"
       x2="100"
       y2="150"
       stroke="#004d40"
       stroke-width="2"
       id="line18" />
    <path
       d="m 125,170.92937 h -25 l 2,72.96654 18,-0.53904 z"
       fill="#d4a373"
       id="path15-2-1"
       style="display:inline;fill:#78909c;fill-opacity:1"
       sodipodi:nodetypes="ccccc" />
    <path
       d="M 100,170.92937 H 75 l 4.769517,73.71003 18.204461,-0.74349 z"
       fill="#d4a373"
       id="path15-2-5-1"
       style="display:inline;fill:#78909c;fill-opacity:1"
       sodipodi:nodetypes="ccccc" />
  </g>
  <g
     class="vetement-froid"
     id="g22"
     style="display:inline">
    <path
       d="M 100,170.92937 H 75 l 4.769517,73.71003 18.204461,-0.74349 z"
       fill="#d4a373"
       id="path31"
       style="display:inline;fill:#37474f;fill-opacity:1"
       sodipodi:nodetypes="ccccc" />
    <path
       d="m 125,170.92937 h -25 l 2,72.96654 18,-0.53904 z"
       fill="#d4a373"
       id="path30"
       style="display:inline;fill:#37474f;fill-opacity:1"
       sodipodi:nodetypes="ccccc" />
    <path
       d="M 130.23048,102.23048 C 143.56382,114.23048 148.66667,126 150,142"
       stroke="#ab47bc"
       stroke-width="16"
       stroke-linecap="round"
       fill="none"
       id="path20"
       style="stroke:#474abc;stroke-opacity:1"
       sodipodi:nodetypes="cc" />
    <path
       d="M 69.769517,102.23048 C 59.10285,116.89715 55.333333,132 54,152"
       stroke="#ab47bc"
       stroke-width="16"
       stroke-linecap="round"
       fill="none"
       id="path19"
       style="stroke:#474abc;stroke-opacity:1"
       sodipodi:nodetypes="cc" />
    <path
       d="m 65,95 h 70 l -5,100 H 70 Z"
       fill="#ab47bc"
       rx="8"
       id="path21"
       style="fill:#474abc;fill-opacity:1" />
    <line
       x1="67"
       y1="125"
       x2="133"
       y2="125"
       stroke="#7b1fa2"
       stroke-width="2"
       id="line21"
       style="stroke:#381fa2;stroke-opacity:1" />
    <line
       x1="69"
       y1="160"
       x2="131"
       y2="160"
       stroke="#7b1fa2"
       stroke-width="2"
       id="line22"
       style="stroke:#381fa2;stroke-opacity:1" />
  </g>
  <g
     class="meteo-soleil"
     id="g23"
     style="display:inline">
    <rect
       x="83"
       y="63"
       width="15"
       height="10"
       fill="#333333"
       rx="2"
       id="rect22" />
    <rect
       x="102"
       y="63"
       width="15"
       height="10"
       fill="#333333"
       rx="2"
       id="rect23" />
    <line
       x1="98"
       y1="66"
       x2="102"
       y2="66"
       stroke="#333333"
       stroke-width="2"
       id="line23" />
  </g>
  <g
     class="accessoire-bonnet"
     id="g24"
     style="display:inline">
    <path
       d="m 75,58 q 25,-33 50,0 z"
       fill="#ff7043"
       id="path23"
       style="fill:#43b4ff;fill-opacity:1" />
    <rect
       x="72"
       y="53"
       width="56"
       height="8"
       fill="#f4511e"
       rx="3"
       id="rect24"
       style="fill:#1e93f4;fill-opacity:1" />
    <circle
       cx="100"
       cy="30"
       r="5"
       fill="#ffffff"
       id="circle24" />
  </g>
  <g
     class="meteo-pluie"
     id="g25"
     style="display:inline">
    <path
       d="M 148,145 V 50 q 0,-5 -6,-5"
       stroke="#455a64"
       stroke-width="3"
       fill="none"
       id="path24" />
    <path
       d="m 105,50 q 45,-40 90,0 z"
       fill="#ef5350"
       id="path25"
       style="display:inline;fill:#ed50ef;fill-opacity:1" />
  </g>
  <g
     class="meteo-vent"
     id="g27"
     style="display:inline">
    <path
       d="m 20,80 q 20,-5 30,5 m -5,0 H 35"
       stroke="#b0bec5"
       stroke-width="2"
       fill="none"
       stroke-linecap="round"
       id="path26" />
    <path
       d="m 15,120 q 15,5 30,-5 m -5,0 H 30"
       stroke="#b0bec5"
       stroke-width="2"
       fill="none"
       stroke-linecap="round"
       id="path27" />
  </g>
</svg>
`;

// Enregistrement Lovelace
window.customCards = window.customCards || [];
if (!window.customCards.some(c => c.type === "avatar-weather-card")) {
  window.customCards.push({
    type: "avatar-weather-card",
    name: "Avatar Weather Card",
    description: "Un personnage qui s'habille selon la météo.",
    preview: true,
  });
}

// Extraction robuste des données météo
function getWeatherData(hass, config) {
  const entityId = config.entity;
  if (!entityId || !hass.states[entityId]) return null;
  const stateObj = hass.states[entityId];

  // 1. Valeurs par défaut (J+0)
  let condition = stateObj.state;
  
  // Sécurisation de la température J+0 : on cherche partout où elle peut se cacher
  let temperature = 0;
  if (stateObj.attributes && stateObj.attributes.temperature !== undefined) {
    temperature = parseFloat(stateObj.attributes.temperature);
  } else if (!isNaN(parseFloat(stateObj.state))) {
    temperature = parseFloat(stateObj.state);
  }

  const targetDay = parseInt(config.forecast_day || "0", 10);

  // 2. Si prévision J+1 ou J+2, on extrait depuis le tableau forecast
  if (targetDay > 0 && stateObj.attributes && stateObj.attributes.forecast && stateObj.attributes.forecast.length >= targetDay) {
    const forecast = stateObj.attributes.forecast[targetDay - 1];
    condition = forecast.condition;
    // Sur les prévisions, c'est toujours la température maximale de la journée
    temperature = parseFloat(forecast.temperature);
  }

  // Si le calcul a échoué et donne NaN, on force à 15 par sécurité pour éviter les plantages
  if (isNaN(temperature)) temperature = 15;

  return { condition, temperature };
}

// Génération des classes CSS propres
function generateAvatarClasses(condition, temp) {
  let classes = [];

  // Choix du vêtement de base selon la température
  if (temp < 10) {
    classes.push('state-froid');
  } else if (temp >= 10 && temp <= 20) {
    if (condition === 'windy' || condition === 'windy-variant') {
      classes.push('state-coupevent');
    } else {
      classes.push('state-tempere');
    }
  } else if (temp > 20) {
    classes.push('state-chaud');
  }

  // Accessoire Bonnet
  if (temp < 5) {
    classes.push('state-bonnet');
  }

  // Décors météo
  if (condition === 'sunny' || condition === 'clear-night') {
    classes.push('state-soleil');
  }
  if (condition === 'rainy' || condition === 'pouring' || condition === 'hail') {
    classes.push('state-pluie');
  }
  if (condition === 'windy' || condition === 'windy-variant') {
    classes.push('state-vent');
  }

  return classes.join(' ');
}

class AvatarWeatherCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static getConfigElement() {
    return document.createElement("avatar-weather-card-editor");
  }

  static getStubConfig() {
    return { entity: "", title: "", forecast_day: "0" };
  }
  
  setConfig(config) {
    if (!config.entity) {
      throw new Error("Veuillez sélectionner une entité météo.");
    }
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    const entityId = this.config.entity;
    const stateObj = hass.states[entityId];

    if (!stateObj) {
      this.shadowRoot.innerHTML = `<div style="color: red; padding: 16px;">Entité introuvable : ${entityId}</div>`;
      return;
    }

    const weatherData = getWeatherData(hass, this.config);
    const activeClasses = weatherData ? generateAvatarClasses(weatherData.condition, weatherData.temperature) : "";
    const title = this.config.title || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: block; 
        }
        .card-container { 
          background: var(--ha-card-background, var(--card-background-color, white)); 
          border-radius: var(--ha-card-border-radius, 12px); 
          box-shadow: var(--ha-card-box-shadow, none);
          border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
          box-sizing: border-box;
        }
        .card-title { 
          font-size: 16px; 
          padding: 16px 16px 0px 16px;
          font-weight: bold; 
          color: var(--primary-text-color);
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
          align-items: center;
          width: 100%;
          height: var(--ha-card-height, auto); 
          box-sizing: border-box;
        }
        .avatar-container svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        /* 1. TOUT MASQUER PAR DÉFAUT (Le !important écrase le display:inline d'Inkscape) */
        .meteo-soleil, .meteo-pluie, .meteo-vent, 
        .vetement-chaud, .vetement-tempere, .vetement-coupevent, 
        .vetement-froid, .accessoire-bonnet { 
          display: none !important; 
        }
        
        /* 2. RÉAFFICHAGE CONDITIONNEL */
        .state-froid .vetement-froid { display: block !important; }
        .state-tempere .vetement-tempere { display: block !important; }
        .state-coupevent .vetement-coupevent { display: block !important; }
        .state-chaud .vetement-chaud { display: block !important; }
        .state-bonnet .accessoire-bonnet { display: block !important; }
        
        .state-soleil .meteo-soleil { display: block !important; }
        .state-pluie .meteo-pluie { display: block !important; }
        .state-vent .meteo-vent { display: block !important; }

      </style>

      <div class="card-container">
        ${title.trim() !== "" ? `<div class="card-title">${title}</div>` : ''}
        <div class="card-content">
          <div class="avatar-container ${activeClasses}">
            ${avatarSVG}
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("avatar-weather-card")) {
  customElements.define("avatar-weather-card", AvatarWeatherCard);
}

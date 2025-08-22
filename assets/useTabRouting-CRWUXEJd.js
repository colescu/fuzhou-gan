import{d as X,ae as f,r as A,b4 as vt,b5 as ye,b6 as gt,bB as ht,bC as te,bD as xt,au as mt,av as yt,L as Le,bE as Ct,a_ as St,bf as wt,F as Tt,aD as Rt,bF as Pt,b as ee,ay as zt,a9 as r,aa as s,ad as T,ab as $,ac as Lt,ah as $e,by as oe,af as Ce,b3 as ie,ak as $t,bt as Se,aE as Bt,G as U,E as se,D as Be,aB as Wt,p as j,bG as At,P as Et,aj as M,bk as J,am as _t,b9 as kt,br as jt,bH as Mt,bA as Ht,bd as Vt,aw as Z,ao as It,ap as Ot}from"./app-xu_rIrQu.js";const Ft=ye(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[ye("&::-webkit-scrollbar",{width:0,height:0})]),Gt=X({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=A(null);function n(l){!(l.currentTarget.offsetWidth<l.currentTarget.scrollWidth)||l.deltaY===0||(l.currentTarget.scrollLeft+=l.deltaY+l.deltaX,l.preventDefault())}const o=vt();return Ft.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:gt,ssr:o}),Object.assign({selfRef:e,handleWheel:n},{scrollTo(...l){var C;(C=e.value)===null||C===void 0||C.scrollTo(...l)}})},render(){return f("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Dt=/\s/;function Nt(e){for(var n=e.length;n--&&Dt.test(e.charAt(n)););return n}var Ut=/^\s+/;function Xt(e){return e&&e.slice(0,Nt(e)+1).replace(Ut,"")}var we=NaN,qt=/^[-+]0x[0-9a-f]+$/i,Yt=/^0b[01]+$/i,Kt=/^0o[0-7]+$/i,Qt=parseInt;function Te(e){if(typeof e=="number")return e;if(ht(e))return we;if(te(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=te(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=Xt(e);var o=Yt.test(e);return o||Kt.test(e)?Qt(e.slice(2),o?2:8):qt.test(e)?we:+e}var le=function(){return xt.Date.now()},Jt="Expected a function",Zt=Math.max,ea=Math.min;function ta(e,n,o){var u,l,C,b,d,p,g=0,x=!1,y=!1,R=!0;if(typeof e!="function")throw new TypeError(Jt);n=Te(n)||0,te(o)&&(x=!!o.leading,y="maxWait"in o,C=y?Zt(Te(o.maxWait)||0,n):C,R="trailing"in o?!!o.trailing:R);function m(v){var L=u,I=l;return u=l=void 0,g=v,b=e.apply(I,L),b}function P(v){return g=v,d=setTimeout(W,n),x?m(v):b}function S(v){var L=v-p,I=v-g,q=n-L;return y?ea(q,C-I):q}function z(v){var L=v-p,I=v-g;return p===void 0||L>=n||L<0||y&&I>=C}function W(){var v=le();if(z(v))return B(v);d=setTimeout(W,S(v))}function B(v){return d=void 0,R&&u?m(v):(u=l=void 0,b)}function V(){d!==void 0&&clearTimeout(d),g=0,u=p=l=d=void 0}function E(){return d===void 0?b:B(le())}function h(){var v=le(),L=z(v);if(u=arguments,l=this,p=v,L){if(d===void 0)return P(p);if(y)return clearTimeout(d),d=setTimeout(W,n),m(p)}return d===void 0&&(d=setTimeout(W,n)),b}return h.cancel=V,h.flush=E,h}var aa="Expected a function";function de(e,n,o){var u=!0,l=!0;if(typeof e!="function")throw new TypeError(aa);return te(o)&&(u="leading"in o?!!o.leading:u,l="trailing"in o?!!o.trailing:l),ta(e,n,{leading:u,maxWait:n,trailing:l})}const ra=X({name:"Add",render(){return f("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},f("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),na={tabFontSizeSmall:"14px",tabFontSizeMedium:"14px",tabFontSizeLarge:"16px",tabGapSmallLine:"36px",tabGapMediumLine:"36px",tabGapLargeLine:"36px",tabGapSmallLineVertical:"8px",tabGapMediumLineVertical:"8px",tabGapLargeLineVertical:"8px",tabPaddingSmallLine:"6px 0",tabPaddingMediumLine:"10px 0",tabPaddingLargeLine:"14px 0",tabPaddingVerticalSmallLine:"6px 12px",tabPaddingVerticalMediumLine:"8px 16px",tabPaddingVerticalLargeLine:"10px 20px",tabGapSmallBar:"36px",tabGapMediumBar:"36px",tabGapLargeBar:"36px",tabGapSmallBarVertical:"8px",tabGapMediumBarVertical:"8px",tabGapLargeBarVertical:"8px",tabPaddingSmallBar:"4px 0",tabPaddingMediumBar:"6px 0",tabPaddingLargeBar:"10px 0",tabPaddingVerticalSmallBar:"6px 12px",tabPaddingVerticalMediumBar:"8px 16px",tabPaddingVerticalLargeBar:"10px 20px",tabGapSmallCard:"4px",tabGapMediumCard:"4px",tabGapLargeCard:"4px",tabGapSmallCardVertical:"4px",tabGapMediumCardVertical:"4px",tabGapLargeCardVertical:"4px",tabPaddingSmallCard:"8px 16px",tabPaddingMediumCard:"10px 20px",tabPaddingLargeCard:"12px 24px",tabPaddingSmallSegment:"4px 0",tabPaddingMediumSegment:"6px 0",tabPaddingLargeSegment:"8px 0",tabPaddingVerticalLargeSegment:"0 8px",tabPaddingVerticalSmallCard:"8px 12px",tabPaddingVerticalMediumCard:"10px 16px",tabPaddingVerticalLargeCard:"12px 20px",tabPaddingVerticalSmallSegment:"0 4px",tabPaddingVerticalMediumSegment:"0 6px",tabGapSmallSegment:"0",tabGapMediumSegment:"0",tabGapLargeSegment:"0",tabGapSmallSegmentVertical:"0",tabGapMediumSegmentVertical:"0",tabGapLargeSegmentVertical:"0",panePaddingSmall:"8px 0 0 0",panePaddingMedium:"12px 0 0 0",panePaddingLarge:"16px 0 0 0",closeSize:"18px",closeIconSize:"14px"};function oa(e){const{textColor2:n,primaryColor:o,textColorDisabled:u,closeIconColor:l,closeIconColorHover:C,closeIconColorPressed:b,closeColorHover:d,closeColorPressed:p,tabColor:g,baseColor:x,dividerColor:y,fontWeight:R,textColor1:m,borderRadius:P,fontSize:S,fontWeightStrong:z}=e;return Object.assign(Object.assign({},na),{colorSegment:g,tabFontSizeCard:S,tabTextColorLine:m,tabTextColorActiveLine:o,tabTextColorHoverLine:o,tabTextColorDisabledLine:u,tabTextColorSegment:m,tabTextColorActiveSegment:n,tabTextColorHoverSegment:n,tabTextColorDisabledSegment:u,tabTextColorBar:m,tabTextColorActiveBar:o,tabTextColorHoverBar:o,tabTextColorDisabledBar:u,tabTextColorCard:m,tabTextColorHoverCard:m,tabTextColorActiveCard:o,tabTextColorDisabledCard:u,barColor:o,closeIconColor:l,closeIconColorHover:C,closeIconColorPressed:b,closeColorHover:d,closeColorPressed:p,closeBorderRadius:P,tabColor:g,tabColorSegment:x,tabBorderColor:y,tabFontWeightActive:R,tabFontWeight:R,tabBorderRadius:P,paneTextColor:n,fontWeightStrong:z})}const ia={common:mt,self:oa},fe=yt("n-tabs"),We={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},ca=X({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:We,slots:Object,setup(e){const n=Le(fe,null);return n||Ct("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:n.paneStyleRef,class:n.paneClassRef,mergedClsPrefix:n.mergedClsPrefixRef}},render(){return f("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),sa=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},zt(We,["displayDirective"])),ce=X({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:sa,setup(e){const{mergedClsPrefixRef:n,valueRef:o,typeRef:u,closableRef:l,tabStyleRef:C,addTabStyleRef:b,tabClassRef:d,addTabClassRef:p,tabChangeIdRef:g,onBeforeLeaveRef:x,triggerRef:y,handleAdd:R,activateTab:m,handleClose:P}=Le(fe);return{trigger:y,mergedClosable:ee(()=>{if(e.internalAddable)return!1;const{closable:S}=e;return S===void 0?l.value:S}),style:C,addStyle:b,tabClass:d,addTabClass:p,clsPrefix:n,value:o,type:u,handleClose(S){S.stopPropagation(),!e.disabled&&P(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){R();return}const{name:S}=e,z=++g.id;if(S!==o.value){const{value:W}=x;W?Promise.resolve(W(e.name,o.value)).then(B=>{B&&g.id===z&&m(S)}):m(S)}}}},render(){const{internalAddable:e,clsPrefix:n,name:o,disabled:u,label:l,tab:C,value:b,mergedClosable:d,trigger:p,$slots:{default:g}}=this,x=l??C;return f("div",{class:`${n}-tabs-tab-wrapper`},this.internalLeftPadded?f("div",{class:`${n}-tabs-tab-pad`}):null,f("div",Object.assign({key:o,"data-name":o,"data-disabled":u?!0:void 0},St({class:[`${n}-tabs-tab`,b===o&&`${n}-tabs-tab--active`,u&&`${n}-tabs-tab--disabled`,d&&`${n}-tabs-tab--closable`,e&&`${n}-tabs-tab--addable`,e?this.addTabClass:this.tabClass],onClick:p==="click"?this.activateTab:void 0,onMouseenter:p==="hover"?this.activateTab:void 0,style:e?this.addStyle:this.style},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),f("span",{class:`${n}-tabs-tab__label`},e?f(Tt,null,f("div",{class:`${n}-tabs-tab__height-placeholder`}," "),f(Rt,{clsPrefix:n},{default:()=>f(ra,null)})):g?g():typeof x=="object"?x:wt(x??o)),d&&this.type==="card"?f(Pt,{clsPrefix:n,class:`${n}-tabs-tab__close`,onClick:this.handleClose,disabled:u}):null))}}),la=r("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[s("segment-type",[r("tabs-rail",[T("&.transition-disabled",[r("tabs-capsule",`
 transition: none;
 `)])])]),s("top",[r("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),s("left",[r("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),s("left, right",`
 flex-direction: row;
 `,[r("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),s("right",`
 flex-direction: row-reverse;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),r("tabs-bar",`
 left: 0;
 `)]),s("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),r("tabs-bar",`
 top: 0;
 `)]),r("tabs-rail",`
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[r("tabs-capsule",`
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `),r("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[r("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[s("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `),T("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),s("flex",[r("tabs-nav",`
 width: 100%;
 position: relative;
 `,[r("tabs-wrapper",`
 width: 100%;
 `,[r("tabs-tab",`
 margin-right: 0;
 `)])])]),r("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[$("prefix, suffix",`
 display: flex;
 align-items: center;
 `),$("prefix","padding-right: 16px;"),$("suffix","padding-left: 16px;")]),s("top, bottom",[r("tabs-nav-scroll-wrapper",[T("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),T("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),s("shadow-start",[T("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),s("shadow-end",[T("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])]),s("left, right",[r("tabs-nav-scroll-content",`
 flex-direction: column;
 `),r("tabs-nav-scroll-wrapper",[T("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),T("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),s("shadow-start",[T("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),s("shadow-end",[T("&::after",`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])]),r("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[r("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[T("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `)]),T("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),r("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),r("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),r("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),r("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[s("disabled",{cursor:"not-allowed"}),$("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),$("label",`
 display: flex;
 align-items: center;
 z-index: 1;
 `)]),r("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[T("&.transition-disabled",`
 transition: none;
 `),s("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),r("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),r("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[T("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),T("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),T("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),T("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),T("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),r("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),s("line-type, bar-type",[r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[T("&:hover",{color:"var(--n-tab-text-color-hover)"}),s("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),s("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),r("tabs-nav",[s("line-type",[s("top",[$("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 bottom: -1px;
 `)]),s("left",[$("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 right: -1px;
 `)]),s("right",[$("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 left: -1px;
 `)]),s("bottom",[$("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 top: -1px;
 `)]),$("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-bar",`
 border-radius: 0;
 `)]),s("card-type",[$("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[s("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `,[$("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),Lt("disabled",[T("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),s("closable","padding-right: 8px;"),s("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),s("disabled","color: var(--n-tab-text-color-disabled);")])]),s("left, right",`
 flex-direction: column; 
 `,[$("prefix, suffix",`
 padding: var(--n-tab-padding-vertical);
 `),r("tabs-wrapper",`
 flex-direction: column;
 `),r("tabs-tab-wrapper",`
 flex-direction: column;
 `,[r("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]),s("top",[s("card-type",[r("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);"),$("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[s("active",`
 border-bottom: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),s("left",[s("card-type",[r("tabs-scroll-padding","border-right: 1px solid var(--n-tab-border-color);"),$("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[s("active",`
 border-right: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),s("right",[s("card-type",[r("tabs-scroll-padding","border-left: 1px solid var(--n-tab-border-color);"),$("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[s("active",`
 border-left: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),s("bottom",[s("card-type",[r("tabs-scroll-padding","border-top: 1px solid var(--n-tab-border-color);"),$("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[s("active",`
 border-top: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),da=Object.assign(Object.assign({},$e.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],tabClass:String,addTabStyle:[String,Object],addTabClass:String,barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),fa=X({name:"Tabs",props:da,slots:Object,setup(e,{slots:n}){var o,u,l,C;const{mergedClsPrefixRef:b,inlineThemeDisabled:d}=$t(e),p=$e("Tabs","-tabs",la,ia,e,b),g=A(null),x=A(null),y=A(null),R=A(null),m=A(null),P=A(null),S=A(!0),z=A(!0),W=Se(e,["labelSize","size"]),B=Se(e,["activeName","value"]),V=A((u=(o=B.value)!==null&&o!==void 0?o:e.defaultValue)!==null&&u!==void 0?u:n.default?(C=(l=oe(n.default())[0])===null||l===void 0?void 0:l.props)===null||C===void 0?void 0:C.name:null),E=Bt(B,V),h={id:0},v=ee(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});U(E,()=>{h.id=0,Y(),ue()});function L(){var t;const{value:a}=E;return a===null?null:(t=g.value)===null||t===void 0?void 0:t.querySelector(`[data-name="${a}"]`)}function I(t){if(e.type==="card")return;const{value:a}=x;if(!a)return;const i=a.style.opacity==="0";if(t){const c=`${b.value}-tabs-bar--disabled`,{barWidth:w,placement:_}=e;if(t.dataset.disabled==="true"?a.classList.add(c):a.classList.remove(c),["top","bottom"].includes(_)){if(pe(["top","maxHeight","height"]),typeof w=="number"&&t.offsetWidth>=w){const k=Math.floor((t.offsetWidth-w)/2)+t.offsetLeft;a.style.left=`${k}px`,a.style.maxWidth=`${w}px`}else a.style.left=`${t.offsetLeft}px`,a.style.maxWidth=`${t.offsetWidth}px`;a.style.width="8192px",i&&(a.style.transition="none"),a.offsetWidth,i&&(a.style.transition="",a.style.opacity="1")}else{if(pe(["left","maxWidth","width"]),typeof w=="number"&&t.offsetHeight>=w){const k=Math.floor((t.offsetHeight-w)/2)+t.offsetTop;a.style.top=`${k}px`,a.style.maxHeight=`${w}px`}else a.style.top=`${t.offsetTop}px`,a.style.maxHeight=`${t.offsetHeight}px`;a.style.height="8192px",i&&(a.style.transition="none"),a.offsetHeight,i&&(a.style.transition="",a.style.opacity="1")}}}function q(){if(e.type==="card")return;const{value:t}=x;t&&(t.style.opacity="0")}function pe(t){const{value:a}=x;if(a)for(const i of t)a.style[i]=""}function Y(){if(e.type==="card")return;const t=L();t?I(t):q()}function ue(){var t;const a=(t=m.value)===null||t===void 0?void 0:t.$el;if(!a)return;const i=L();if(!i)return;const{scrollLeft:c,offsetWidth:w}=a,{offsetLeft:_,offsetWidth:k}=i;c>_?a.scrollTo({top:0,left:_,behavior:"smooth"}):_+k>c+w&&a.scrollTo({top:0,left:_+k-w,behavior:"smooth"})}const K=A(null);let ae=0,H=null;function Ae(t){const a=K.value;if(a){ae=t.getBoundingClientRect().height;const i=`${ae}px`,c=()=>{a.style.height=i,a.style.maxHeight=i};H?(c(),H(),H=null):H=c}}function Ee(t){const a=K.value;if(a){const i=t.getBoundingClientRect().height,c=()=>{document.body.offsetHeight,a.style.maxHeight=`${i}px`,a.style.height=`${Math.max(ae,i)}px`};H?(H(),H=null,c()):H=c}}function _e(){const t=K.value;if(t){t.style.maxHeight="",t.style.height="";const{paneWrapperStyle:a}=e;if(typeof a=="string")t.style.cssText=a;else if(a){const{maxHeight:i,height:c}=a;i!==void 0&&(t.style.maxHeight=i),c!==void 0&&(t.style.height=c)}}}const ve={value:[]},ge=A("next");function ke(t){const a=E.value;let i="next";for(const c of ve.value){if(c===a)break;if(c===t){i="prev";break}}ge.value=i,je(t)}function je(t){const{onActiveNameChange:a,onUpdateValue:i,"onUpdate:value":c}=e;a&&Z(a,t),i&&Z(i,t),c&&Z(c,t),V.value=t}function Me(t){const{onClose:a}=e;a&&Z(a,t)}function he(){const{value:t}=x;if(!t)return;const a="transition-disabled";t.classList.add(a),Y(),t.classList.remove(a)}const O=A(null);function re({transitionDisabled:t}){const a=g.value;if(!a)return;t&&a.classList.add("transition-disabled");const i=L();i&&O.value&&(O.value.style.width=`${i.offsetWidth}px`,O.value.style.height=`${i.offsetHeight}px`,O.value.style.transform=`translateX(${i.offsetLeft-kt(getComputedStyle(a).paddingLeft)}px)`,t&&O.value.offsetWidth),t&&a.classList.remove("transition-disabled")}U([E],()=>{e.type==="segment"&&se(()=>{re({transitionDisabled:!1})})}),Be(()=>{e.type==="segment"&&re({transitionDisabled:!0})});let xe=0;function He(t){var a;if(t.contentRect.width===0&&t.contentRect.height===0||xe===t.contentRect.width)return;xe=t.contentRect.width;const{type:i}=e;if((i==="line"||i==="bar")&&he(),i!=="segment"){const{placement:c}=e;ne((c==="top"||c==="bottom"?(a=m.value)===null||a===void 0?void 0:a.$el:P.value)||null)}}const Ve=de(He,64);U([()=>e.justifyContent,()=>e.size],()=>{se(()=>{const{type:t}=e;(t==="line"||t==="bar")&&he()})});const F=A(!1);function Ie(t){var a;const{target:i,contentRect:{width:c,height:w}}=t,_=i.parentElement.parentElement.offsetWidth,k=i.parentElement.parentElement.offsetHeight,{placement:D}=e;if(!F.value)D==="top"||D==="bottom"?_<c&&(F.value=!0):k<w&&(F.value=!0);else{const{value:N}=R;if(!N)return;D==="top"||D==="bottom"?_-c>N.$el.offsetWidth&&(F.value=!1):k-w>N.$el.offsetHeight&&(F.value=!1)}ne(((a=m.value)===null||a===void 0?void 0:a.$el)||null)}const Oe=de(Ie,64);function Fe(){const{onAdd:t}=e;t&&t(),se(()=>{const a=L(),{value:i}=m;!a||!i||i.scrollTo({left:a.offsetLeft,top:0,behavior:"smooth"})})}function ne(t){if(!t)return;const{placement:a}=e;if(a==="top"||a==="bottom"){const{scrollLeft:i,scrollWidth:c,offsetWidth:w}=t;S.value=i<=0,z.value=i+w>=c}else{const{scrollTop:i,scrollHeight:c,offsetHeight:w}=t;S.value=i<=0,z.value=i+w>=c}}const Ge=de(t=>{ne(t.target)},64);Wt(fe,{triggerRef:j(e,"trigger"),tabStyleRef:j(e,"tabStyle"),tabClassRef:j(e,"tabClass"),addTabStyleRef:j(e,"addTabStyle"),addTabClassRef:j(e,"addTabClass"),paneClassRef:j(e,"paneClass"),paneStyleRef:j(e,"paneStyle"),mergedClsPrefixRef:b,typeRef:j(e,"type"),closableRef:j(e,"closable"),valueRef:E,tabChangeIdRef:h,onBeforeLeaveRef:j(e,"onBeforeLeave"),activateTab:ke,handleClose:Me,handleAdd:Fe}),At(()=>{Y(),ue()}),Et(()=>{const{value:t}=y;if(!t)return;const{value:a}=b,i=`${a}-tabs-nav-scroll-wrapper--shadow-start`,c=`${a}-tabs-nav-scroll-wrapper--shadow-end`;S.value?t.classList.remove(i):t.classList.add(i),z.value?t.classList.remove(c):t.classList.add(c)});const De={syncBarPosition:()=>{Y()}},Ne=()=>{re({transitionDisabled:!0})},me=ee(()=>{const{value:t}=W,{type:a}=e,i={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[a],c=`${t}${i}`,{self:{barColor:w,closeIconColor:_,closeIconColorHover:k,closeIconColorPressed:D,tabColor:N,tabBorderColor:Ue,paneTextColor:Xe,tabFontWeight:qe,tabBorderRadius:Ye,tabFontWeightActive:Ke,colorSegment:Qe,fontWeightStrong:Je,tabColorSegment:Ze,closeSize:et,closeIconSize:tt,closeColorHover:at,closeColorPressed:rt,closeBorderRadius:nt,[M("panePadding",t)]:Q,[M("tabPadding",c)]:ot,[M("tabPaddingVertical",c)]:it,[M("tabGap",c)]:st,[M("tabGap",`${c}Vertical`)]:lt,[M("tabTextColor",a)]:dt,[M("tabTextColorActive",a)]:bt,[M("tabTextColorHover",a)]:ct,[M("tabTextColorDisabled",a)]:ft,[M("tabFontSize",t)]:pt},common:{cubicBezierEaseInOut:ut}}=p.value;return{"--n-bezier":ut,"--n-color-segment":Qe,"--n-bar-color":w,"--n-tab-font-size":pt,"--n-tab-text-color":dt,"--n-tab-text-color-active":bt,"--n-tab-text-color-disabled":ft,"--n-tab-text-color-hover":ct,"--n-pane-text-color":Xe,"--n-tab-border-color":Ue,"--n-tab-border-radius":Ye,"--n-close-size":et,"--n-close-icon-size":tt,"--n-close-color-hover":at,"--n-close-color-pressed":rt,"--n-close-border-radius":nt,"--n-close-icon-color":_,"--n-close-icon-color-hover":k,"--n-close-icon-color-pressed":D,"--n-tab-color":N,"--n-tab-font-weight":qe,"--n-tab-font-weight-active":Ke,"--n-tab-padding":ot,"--n-tab-padding-vertical":it,"--n-tab-gap":st,"--n-tab-gap-vertical":lt,"--n-pane-padding-left":J(Q,"left"),"--n-pane-padding-right":J(Q,"right"),"--n-pane-padding-top":J(Q,"top"),"--n-pane-padding-bottom":J(Q,"bottom"),"--n-font-weight-strong":Je,"--n-tab-color-segment":Ze}}),G=d?_t("tabs",ee(()=>`${W.value[0]}${e.type[0]}`),me,e):void 0;return Object.assign({mergedClsPrefix:b,mergedValue:E,renderedNames:new Set,segmentCapsuleElRef:O,tabsPaneWrapperRef:K,tabsElRef:g,barElRef:x,addTabInstRef:R,xScrollInstRef:m,scrollWrapperElRef:y,addTabFixed:F,tabWrapperStyle:v,handleNavResize:Ve,mergedSize:W,handleScroll:Ge,handleTabsResize:Oe,cssVars:d?void 0:me,themeClass:G?.themeClass,animationDirection:ge,renderNameListRef:ve,yScrollElRef:P,handleSegmentResize:Ne,onAnimationBeforeLeave:Ae,onAnimationEnter:Ee,onAnimationAfterEnter:_e,onRender:G?.onRender},De)},render(){const{mergedClsPrefix:e,type:n,placement:o,addTabFixed:u,addable:l,mergedSize:C,renderNameListRef:b,onRender:d,paneWrapperClass:p,paneWrapperStyle:g,$slots:{default:x,prefix:y,suffix:R}}=this;d?.();const m=x?oe(x()).filter(h=>h.type.__TAB_PANE__===!0):[],P=x?oe(x()).filter(h=>h.type.__TAB__===!0):[],S=!P.length,z=n==="card",W=n==="segment",B=!z&&!W&&this.justifyContent;b.value=[];const V=()=>{const h=f("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},B?null:f("div",{class:`${e}-tabs-scroll-padding`,style:o==="top"||o==="bottom"?{width:`${this.tabsPadding}px`}:{height:`${this.tabsPadding}px`}}),S?m.map((v,L)=>(b.value.push(v.props.name),be(f(ce,Object.assign({},v.props,{internalCreatedByPane:!0,internalLeftPadded:L!==0&&(!B||B==="center"||B==="start"||B==="end")}),v.children?{default:v.children.tab}:void 0)))):P.map((v,L)=>(b.value.push(v.props.name),be(L!==0&&!B?ze(v):v))),!u&&l&&z?Pe(l,(S?m.length:P.length)!==0):null,B?null:f("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return f("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},z&&l?f(ie,{onResize:this.handleTabsResize},{default:()=>h}):h,z?f("div",{class:`${e}-tabs-pad`}):null,z?null:f("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},E=W?"top":o;return f("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${n}-type`,`${e}-tabs--${C}-size`,B&&`${e}-tabs--flex`,`${e}-tabs--${E}`],style:this.cssVars},f("div",{class:[`${e}-tabs-nav--${n}-type`,`${e}-tabs-nav--${E}`,`${e}-tabs-nav`]},Ce(y,h=>h&&f("div",{class:`${e}-tabs-nav__prefix`},h)),W?f(ie,{onResize:this.handleSegmentResize},{default:()=>f("div",{class:`${e}-tabs-rail`,ref:"tabsElRef"},f("div",{class:`${e}-tabs-capsule`,ref:"segmentCapsuleElRef"},f("div",{class:`${e}-tabs-wrapper`},f("div",{class:`${e}-tabs-tab`}))),S?m.map((h,v)=>(b.value.push(h.props.name),f(ce,Object.assign({},h.props,{internalCreatedByPane:!0,internalLeftPadded:v!==0}),h.children?{default:h.children.tab}:void 0))):P.map((h,v)=>(b.value.push(h.props.name),v===0?h:ze(h))))}):f(ie,{onResize:this.handleNavResize},{default:()=>f("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(E)?f(Gt,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:V}):f("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll,ref:"yScrollElRef"},V()))}),u&&l&&z?Pe(l,!0):null,Ce(R,h=>h&&f("div",{class:`${e}-tabs-nav__suffix`},h))),S&&(this.animated&&(E==="top"||E==="bottom")?f("div",{ref:"tabsPaneWrapperRef",style:g,class:[`${e}-tabs-pane-wrapper`,p]},Re(m,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Re(m,this.mergedValue,this.renderedNames)))}});function Re(e,n,o,u,l,C,b){const d=[];return e.forEach(p=>{const{name:g,displayDirective:x,"display-directive":y}=p.props,R=P=>x===P||y===P,m=n===g;if(p.key!==void 0&&(p.key=g),m||R("show")||R("show:lazy")&&o.has(g)){o.has(g)||o.add(g);const P=!R("if");d.push(P?jt(p,[[Vt,m]]):p)}}),b?f(Mt,{name:`${b}-transition`,onBeforeLeave:u,onEnter:l,onAfterEnter:C},{default:()=>d}):d}function Pe(e,n){return f(ce,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:n,disabled:typeof e=="object"&&e.disabled})}function ze(e){const n=Ht(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function be(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}function pa(){const e=Ot(),n=It(),o={};let u=!1;function l(){u||(u=!0,Promise.resolve().then(()=>{const b={...e.currentRoute.value.query};for(const[p,g]of Object.entries(o))g===void 0?delete b[p]:b[p]=g;const d=e.currentRoute.value.query;[...Object.keys(d),...Object.keys(b)].some(p=>d[p]!==b[p])&&e.push({query:b});for(const p in o)delete o[p];u=!1}))}function C({queryName:b,store:d,tabs:p,parent:g,parentValue:x}){Be(()=>{d.value===""&&(d.value=p[0]);const y=n.query[b];typeof y=="string"&&p.includes(y)&&(d.value=y)}),U([d,g?g.store:A("")],([y,R])=>{o[b]=y,g&&x!==R&&(o[b]=void 0),l()},{immediate:!0}),U(()=>n.query[b],y=>{typeof y=="string"&&p.includes(y)&&(d.value=y)})}return{setupTabRouting:C}}export{ca as N,fa as a,pa as c};

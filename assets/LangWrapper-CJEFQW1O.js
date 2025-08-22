import{a9 as f,aa as u,ab as n,ac as H,ad as b,d as S,ae as h,af as M,ag as U,ah as _,ai as K,b as x,aj as k,ak as Y,al as J,am as Q,an as X,r as C,G as Z,c as R,k as m,W as z,g as y,w,u as p,m as ee,ao as ae,ap as oe,e as re,o as v,i as se,aq as te,F as ne,s as le,U as ie,N as de,a6 as ce}from"./app-xu_rIrQu.js";const ue=f("radio",`
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`,[u("checked",[n("dot",`
 background-color: var(--n-color-active);
 `)]),n("dot-wrapper",`
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `),f("radio-input",`
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `),n("dot",`
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[b("&::before",`
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),u("checked",{boxShadow:"var(--n-box-shadow-active)"},[b("&::before",`
 opacity: 1;
 transform: scale(1);
 `)])]),n("label",`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),H("disabled",`
 cursor: pointer;
 `,[b("&:hover",[n("dot",{boxShadow:"var(--n-box-shadow-hover)"})]),u("focus",[b("&:not(:active)",[n("dot",{boxShadow:"var(--n-box-shadow-focus)"})])])]),u("disabled",`
 cursor: not-allowed;
 `,[n("dot",{boxShadow:"var(--n-box-shadow-disabled)",backgroundColor:"var(--n-color-disabled)"},[b("&::before",{backgroundColor:"var(--n-dot-color-disabled)"}),u("checked",`
 opacity: 1;
 `)]),n("label",{color:"var(--n-text-color-disabled)"}),f("radio-input",`
 cursor: not-allowed;
 `)])]),be=Object.assign(Object.assign({},_.props),X),he=S({name:"Radio",props:be,setup(r){const e=U(r),l=_("Radio","-radio",ue,K,r,e.mergedClsPrefix),o=x(()=>{const{mergedSize:{value:t}}=e,{common:{cubicBezierEaseInOut:g},self:{boxShadow:$,boxShadowActive:N,boxShadowDisabled:B,boxShadowFocus:D,boxShadowHover:V,color:A,colorDisabled:F,colorActive:P,textColor:E,textColorDisabled:j,dotColorActive:G,dotColorDisabled:I,labelPadding:L,labelLineHeight:O,labelFontWeight:T,[k("fontSize",t)]:W,[k("radioSize",t)]:q}}=l.value;return{"--n-bezier":g,"--n-label-line-height":O,"--n-label-font-weight":T,"--n-box-shadow":$,"--n-box-shadow-active":N,"--n-box-shadow-disabled":B,"--n-box-shadow-focus":D,"--n-box-shadow-hover":V,"--n-color":A,"--n-color-active":P,"--n-color-disabled":F,"--n-dot-color-active":G,"--n-dot-color-disabled":I,"--n-font-size":W,"--n-radio-size":q,"--n-text-color":E,"--n-text-color-disabled":j,"--n-label-padding":L}}),{inlineThemeDisabled:a,mergedClsPrefixRef:d,mergedRtlRef:c}=Y(r),i=J("Radio",c,d),s=a?Q("radio",x(()=>e.mergedSize.value[0]),o,r):void 0;return Object.assign(e,{rtlEnabled:i,cssVars:a?void 0:o,themeClass:s?.themeClass,onRender:s?.onRender})},render(){const{$slots:r,mergedClsPrefix:e,onRender:l,label:o}=this;return l?.(),h("label",{class:[`${e}-radio`,this.themeClass,this.rtlEnabled&&`${e}-radio--rtl`,this.mergedDisabled&&`${e}-radio--disabled`,this.renderSafeChecked&&`${e}-radio--checked`,this.focus&&`${e}-radio--focus`],style:this.cssVars},h("div",{class:`${e}-radio__dot-wrapper`}," ",h("div",{class:[`${e}-radio__dot`,this.renderSafeChecked&&`${e}-radio__dot--checked`]}),h("input",{ref:"inputRef",type:"radio",class:`${e}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur})),M(r.default,a=>!a&&!o?null:h("div",{ref:"labelRef",class:`${e}-radio__label`},a||o)))}}),ge=S({__name:"LangWrapper",props:{language:{}},setup(r){const e=ae(),l=oe(),o=r,a=C(o.language||"FG"),d=C(!1);return Z(a,async c=>{d.value=!1,await re.load(a.value),o.language&&c!==o.language&&await l.push({name:e.name,params:{...e.params,language:c},query:{...e.query}}),d.value=!0},{immediate:!0}),(c,i)=>{const s=ee("RouterView");return v(),R("div",null,[o.language?(v(),m(p(de),{key:0,align:"center",justify:"center",style:{"margin-bottom":"1.5em"}},{default:w(()=>[i[1]||(i[1]=se(" 選擇語言： ",-1)),y(p(te),{value:a.value,"onUpdate:value":i[0]||(i[0]=t=>a.value=t),name:"language",size:"small"},{default:w(()=>[(v(!0),R(ne,null,le(p(ie),(t,g)=>(v(),m(p(he),{key:g,value:g,label:t},null,8,["value","label"]))),128))]),_:1},8,["value"])]),_:1})):z("",!0),y(s,null,{default:w(({Component:t})=>[d.value?(v(),m(ce(t),{key:0,language:a.value},null,8,["language"])):z("",!0)]),_:1})])}}});export{ge as default};

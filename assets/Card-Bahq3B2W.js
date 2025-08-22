import{au as U,ad as n,a9 as z,c3 as X,c4 as Y,c5 as Z,aa as i,ab as a,d as ee,ae as s,af as m,c6 as v,bF as oe,ak as re,ah as F,al as te,b as E,aj as $,bk as ne,am as de,aw as ae}from"./app-xu_rIrQu.js";const ie={paddingSmall:"12px 16px 12px",paddingMedium:"19px 24px 20px",paddingLarge:"23px 32px 24px",paddingHuge:"27px 40px 28px",titleFontSizeSmall:"16px",titleFontSizeMedium:"18px",titleFontSizeLarge:"18px",titleFontSizeHuge:"18px",closeIconSize:"18px",closeSize:"22px"};function le(o){const{primaryColor:u,borderRadius:g,lineHeight:e,fontSize:c,cardColor:b,textColor2:x,textColor1:f,dividerColor:d,fontWeightStrong:t,closeIconColor:r,closeIconColorHover:l,closeIconColorPressed:C,closeColorHover:p,closeColorPressed:S,modalColor:y,boxShadow1:k,popoverColor:w,actionColor:h}=o;return Object.assign(Object.assign({},ie),{lineHeight:e,color:b,colorModal:y,colorPopover:w,colorTarget:u,colorEmbedded:h,colorEmbeddedModal:h,colorEmbeddedPopover:h,textColor:x,titleTextColor:f,borderColor:d,actionColor:h,titleFontWeight:t,closeColorHover:p,closeColorPressed:S,closeBorderRadius:g,closeIconColor:r,closeIconColorHover:l,closeIconColorPressed:C,fontSizeSmall:c,fontSizeMedium:c,fontSizeLarge:c,fontSizeHuge:c,boxShadow:k,borderRadius:g})}const se={common:U,self:le},ce=n([z("card",`
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[Z({background:"var(--n-color-modal)"}),i("hoverable",[n("&:hover","box-shadow: var(--n-box-shadow);")]),i("content-segmented",[n(">",[a("content",{paddingTop:"var(--n-padding-bottom)"})])]),i("content-soft-segmented",[n(">",[a("content",`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]),i("footer-segmented",[n(">",[a("footer",{paddingTop:"var(--n-padding-bottom)"})])]),i("footer-soft-segmented",[n(">",[a("footer",`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),n(">",[z("card-header",`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[a("main",`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),a("extra",`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),a("close",`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),a("action",`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),a("content","flex: 1; min-width: 0;"),a("content, footer",`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[n("&:first-child",{paddingTop:"var(--n-padding-bottom)"})]),a("action",`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),z("card-cover",`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[n("img",`
 display: block;
 width: 100%;
 `)]),i("bordered",`
 border: 1px solid var(--n-border-color);
 `,[n("&:target","border-color: var(--n-color-target);")]),i("action-segmented",[n(">",[a("action",[n("&:not(:first-child)",{borderTop:"1px solid var(--n-border-color)"})])])]),i("content-segmented, content-soft-segmented",[n(">",[a("content",{transition:"border-color 0.3s var(--n-bezier)"},[n("&:not(:first-child)",{borderTop:"1px solid var(--n-border-color)"})])])]),i("footer-segmented, footer-soft-segmented",[n(">",[a("footer",{transition:"border-color 0.3s var(--n-bezier)"},[n("&:not(:first-child)",{borderTop:"1px solid var(--n-border-color)"})])])]),i("embedded",`
 background-color: var(--n-color-embedded);
 `)]),X(z("card",`
 background: var(--n-color-modal);
 `,[i("embedded",`
 background-color: var(--n-color-embedded-modal);
 `)])),Y(z("card",`
 background: var(--n-color-popover);
 `,[i("embedded",`
 background-color: var(--n-color-embedded-popover);
 `)]))]),be={title:[String,Function],contentClass:String,contentStyle:[Object,String],headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:{type:String,default:"medium"},bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:"div"},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function},ge=Object.assign(Object.assign({},F.props),be),pe=ee({name:"Card",props:ge,slots:Object,setup(o){const u=()=>{const{onClose:t}=o;t&&ae(t)},{inlineThemeDisabled:g,mergedClsPrefixRef:e,mergedRtlRef:c}=re(o),b=F("Card","-card",ce,se,o,e),x=te("Card",c,e),f=E(()=>{const{size:t}=o,{self:{color:r,colorModal:l,colorTarget:C,textColor:p,titleTextColor:S,titleFontWeight:y,borderColor:k,actionColor:w,borderRadius:h,lineHeight:P,closeIconColor:T,closeIconColorHover:R,closeIconColorPressed:B,closeColorHover:_,closeColorPressed:j,closeBorderRadius:M,closeIconSize:O,closeSize:H,boxShadow:I,colorPopover:V,colorEmbedded:L,colorEmbeddedModal:N,colorEmbeddedPopover:W,[$("padding",t)]:A,[$("fontSize",t)]:D,[$("titleFontSize",t)]:K},common:{cubicBezierEaseInOut:q}}=b.value,{top:G,left:J,bottom:Q}=ne(A);return{"--n-bezier":q,"--n-border-radius":h,"--n-color":r,"--n-color-modal":l,"--n-color-popover":V,"--n-color-embedded":L,"--n-color-embedded-modal":N,"--n-color-embedded-popover":W,"--n-color-target":C,"--n-text-color":p,"--n-line-height":P,"--n-action-color":w,"--n-title-text-color":S,"--n-title-font-weight":y,"--n-close-icon-color":T,"--n-close-icon-color-hover":R,"--n-close-icon-color-pressed":B,"--n-close-color-hover":_,"--n-close-color-pressed":j,"--n-border-color":k,"--n-box-shadow":I,"--n-padding-top":G,"--n-padding-bottom":Q,"--n-padding-left":J,"--n-font-size":D,"--n-title-font-size":K,"--n-close-size":H,"--n-close-icon-size":O,"--n-close-border-radius":M}}),d=g?de("card",E(()=>o.size[0]),f,o):void 0;return{rtlEnabled:x,mergedClsPrefix:e,mergedTheme:b,handleCloseClick:u,cssVars:g?void 0:f,themeClass:d?.themeClass,onRender:d?.onRender}},render(){const{segmented:o,bordered:u,hoverable:g,mergedClsPrefix:e,rtlEnabled:c,onRender:b,embedded:x,tag:f,$slots:d}=this;return b?.(),s(f,{class:[`${e}-card`,this.themeClass,x&&`${e}-card--embedded`,{[`${e}-card--rtl`]:c,[`${e}-card--content${typeof o!="boolean"&&o.content==="soft"?"-soft":""}-segmented`]:o===!0||o!==!1&&o.content,[`${e}-card--footer${typeof o!="boolean"&&o.footer==="soft"?"-soft":""}-segmented`]:o===!0||o!==!1&&o.footer,[`${e}-card--action-segmented`]:o===!0||o!==!1&&o.action,[`${e}-card--bordered`]:u,[`${e}-card--hoverable`]:g}],style:this.cssVars,role:this.role},m(d.cover,t=>{const r=this.cover?v([this.cover()]):t;return r&&s("div",{class:`${e}-card-cover`,role:"none"},r)}),m(d.header,t=>{const{title:r}=this,l=r?v(typeof r=="function"?[r()]:[r]):t;return l||this.closable?s("div",{class:[`${e}-card-header`,this.headerClass],style:this.headerStyle,role:"heading"},s("div",{class:`${e}-card-header__main`,role:"heading"},l),m(d["header-extra"],C=>{const p=this.headerExtra?v([this.headerExtra()]):C;return p&&s("div",{class:[`${e}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},p)}),this.closable&&s(oe,{clsPrefix:e,class:`${e}-card-header__close`,onClick:this.handleCloseClick,absolute:!0})):null}),m(d.default,t=>{const{content:r}=this,l=r?v(typeof r=="function"?[r()]:[r]):t;return l&&s("div",{class:[`${e}-card__content`,this.contentClass],style:this.contentStyle,role:"none"},l)}),m(d.footer,t=>{const r=this.footer?v([this.footer()]):t;return r&&s("div",{class:[`${e}-card__footer`,this.footerClass],style:this.footerStyle,role:"none"},r)}),m(d.action,t=>{const r=this.action?v([this.action()]):t;return r&&s("div",{class:`${e}-card__action`,role:"none"},r)}))}});export{pe as N};

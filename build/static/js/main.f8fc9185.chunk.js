(this.webpackJsonpcovid19=this.webpackJsonpcovid19||[]).push([[0],{153:function(e,t,n){},154:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(47),l=n.n(o),c=n(48),i=n(49),s=n(5),u=n(51),m=n(53),f=n(19),h=n(30),d=n(18),p=n.n(d);String.prototype.format=function(){var e=0,t=arguments;return this.replace(/{}/g,(function(){return"undefined"!=typeof t[e]?t[e++]:""}))},Array.prototype.last=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return this[this.length-e]};var v={before:5,after:25,timeseries:"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_{}_global.csv"},g=function(e){return e.split("\n").map((function(e){return e.split(",")}))},b=function(e){for(var t=e[0].slice(4).map((function(e){return new Date(e)})).map((function(e){return p()(e)})).map((function(e){return e.format("YYYY-MM-DD")})),n=p()(new Date(e[0].last())),a=0;a<v.after;a++)n=n.add(1,"days"),t.push(n.format("YYYY-MM-DD"));e=e.slice(1),["China","US"].forEach((function(t){var n=e.filter((function(e){return e[1]===t})).reduce((function(e,t){var n=Object(h.a)(t);if(n[0]="SUMATORIA",0===e.length)return n;for(var a=4;a<t.length;a++)n[a]=parseInt(n[a])+parseInt(e[a]);return n}),[]);e.unshift(n)}));var r=e.filter((function(e){return["Spain","France","Italy","Germany","Portugal","Austria","Belgium","Netherlands"].includes(e[1])})).reduce((function(e,t){var n=Object(h.a)(t);if(0===e.length)return n;n[1]="UE - Parcial",n[0]="SUMATORIA";for(var a=4;a<t.length;a++)n[a]=parseInt(n[a])+parseInt(e[a]);return n}),[]);return e.unshift(r),{labels:t,values:e.map((function(e){return{label:e[1]+(e[0]?" / "+e[0]:""),checked:!1,last:e.last(),timeline:e.slice(4).map((function(e){return parseInt(e)}))}})).map((function(e){var t=e.timeline;return e.increment=t.map((function(e,n){return 0!==n?e-t[n-1]:0})),e}))}},E=function(e,t,n){t=t||function(){},n=n||function(e){console.warn("Error:",e)};var a={title:"TimeLine for "+e,url:v.timeseries.format(e)};fetch(a.url).then((function(e){return e.text()})).then((function(e){return g(e)})).then((function(e){return b(e)})).then((function(e){return Object(f.a)({},a,{},e)})).then(t).catch(n)},C=function(e){for(var t=e.map((function(e){return e})),n=t.length-v.before,a=0,r=n;r<t.length;r++){a+=t[r]-t[r-1]}a/=v.before;for(var o=0;o<n;o++)t[o]=void 0;for(var l=e.last(),c=t.length-1,i=0;i<v.after;i++)t[c-i]=l-a*i,t[c+i]=l+a*i;return t=t.map((function(e){return e<0?void 0:e}))},k=function(e,t,n){var a=e.length;console.log("=",t,a,n);for(var r=0,o=[],l=[],c=t;c<a;++c)o.push(r++),l.push(e[c]);for(var i=new n(o,l),s=e.map((function(e){return e})),u=s.length-1,m=0;m<t;m++)s[m]=void 0;for(var f=0;f<v.after;f++)s[u+f]=i.predict(r+f),s[u-f]=i.predict(r-f);return s=s.map((function(e){return e<0?void 0:e}))},y=function(e){var t=window.xML,n=e.length-v.before;return k(e,n,t.SimpleLinearRegression)},N=function(e){var t=window.xML,n=e.findIndex((function(e){return e>0}));return k(e,n,t.ExponentialRegression)},S=n(52);var w=function(e){var t=e.countries,n=e.times,o=e.config,l=e.onChangeConfig,c=e.onChangeCheck,i=e.onClickReset,s=Object(a.useState)(""),u=Object(S.a)(s,2),m=u[0],f=u[1],h=t||[];return m&&(h=h.filter((function(e){var t=e.label||"";return(t=t.toUpperCase()).includes(m.toUpperCase())}))),r.a.createElement("div",{className:"list-group"},r.a.createElement("table",{className:"table table-responsive table-sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Mode"),r.a.createElement("th",{colSpan:"2"},r.a.createElement("select",{name:"type",className:"form-control form-control-sm",defaultValue:o.type,onChange:l},r.a.createElement("option",{value:"confirmed"},"Confirmed"),r.a.createElement("option",{value:"deaths"},"Deaths")))),r.a.createElement("tr",null,r.a.createElement("th",null,"From"),r.a.createElement("th",{colSpan:"2"},r.a.createElement("div",{className:"input-group"},r.a.createElement("select",{name:"from",className:"form-control form-control-sm",value:o.from,onChange:l},n.map((function(e,t){return r.a.createElement("option",{key:t,value:e},e)}))),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{name:"from",className:"btn btn-sm btn-danger",type:"button",onClick:function(e){e.currentTarget.value=n[0],l(e)}},"Clear"))))),r.a.createElement("tr",null,r.a.createElement("th",null,"To"),r.a.createElement("th",{colSpan:"2"},r.a.createElement("div",{className:"input-group"},r.a.createElement("select",{name:"to",className:"form-control form-control-sm",value:o.to,onChange:l},n.map((function(e,t){return r.a.createElement("option",{key:t,value:e},e)}))),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{name:"to",className:"btn btn-sm btn-danger",type:"button",onClick:function(e){e.currentTarget.value=n.last(),l(e)}},"Clear"))))),r.a.createElement("tr",null,r.a.createElement("th",null,"View"),r.a.createElement("th",{colSpan:"2"},r.a.createElement("div",{className:"input-group"},r.a.createElement("input",{name:"filter",className:"form-control form-control-sm",type:"text",defaultValue:m,onChange:function(e){f(e.currentTarget.value)}}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{className:"btn btn-sm btn-danger",type:"button",onClick:i},"Clear")))))),r.a.createElement("tbody",null,h.map((function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("th",null,r.a.createElement("input",{name:e.label,type:"checkbox",checked:e.checked,onChange:c})),r.a.createElement("td",null,e.label),r.a.createElement("td",null,r.a.createElement("span",{className:"badge badge-danger"},e.last)))})))))},O=n(29),x=["#FF6384","#36A2EB","#FFCE56","#b29dd9","#85a8ba","#ff0000","#00ff00","#0000ff","#fe6b64"],j=function(e,t,n){return console.log("***",e),e[t]&&0!==e[t].length||(e[t]=n(e.timeline)),e},D=function(e,t,n,a,r,o,l){var c=t[a];c||(c=[]),c.slice&&(c=c.slice(r,o));var i=e&&e.includes("-");return{label:t.label+e,data:c,fill:!1,pointRadius:i?1:3,borderDash:i?[5,5]:[],borderWidth:i?2:3,borderColor:x[n%x.length],backgroundColor:x[n%x.length],type:l}};var I=function(e){var t=e.values,n=e.times,a=e.from,o=e.to,l=0,c=t.length;a&&(l=n.indexOf(a)),o&&(c=n.indexOf(o));var i={labels:n.slice(l,c),datasets:[]},s={labels:n.slice(l,c),datasets:[]};return t.filter((function(e){return e.checked})).map((function(e){return e=j(e,"timeline1",C),e=j(e,"timeline2",y),e=j(e,"timeline3",N)})).forEach((function(e,t){s.datasets.push(D("",e,t,"timeline",l,c,"radar")),s.datasets.push(D("-Week",e,10+t,"timeline1",l,c,"radar")),s.datasets.push(D("-Linear",e,20+t,"timeline2",l,c,"radar")),s.datasets.push(D("-Expo",e,30+t,"timeline3",l,c,"radar")),i.datasets.push(D(" Bar",e,t,"increment",l,c,"bar")),i.datasets.push(D(" Point",e,t,"timeline",l,c,"bubble")),i.datasets.push(D("-Week",e,10+t,"timeline1",l,c,"line")),i.datasets.push(D("-Linear",e,20+t,"timeline2",l,c,"line")),i.datasets.push(D("-Expo",e,30+t,"timeline3",l,c,"line"))})),r.a.createElement("div",null,r.a.createElement(O.a,{data:i}),r.a.createElement(O.b,{data:s}))},M=(n(153),function(e){Object(m.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={config:{type:"confirmed",from:"2020-01-01",to:"2020-03-30"},times:["01","02","03","04","05"],countries:[{label:"line 1",checked:!0,timeline:[5,15,2,30,5],increment:[0,0,10,20,30]},{label:"line 2",checked:!0,timeline:[50,5,20,30,50],increment:[0,0,10,20,30]}]},a.onChangeCheck=a.onChangeCheck.bind(Object(s.a)(a)),a.onChangeConfig=a.onChangeConfig.bind(Object(s.a)(a)),a.onClickReset=a.onClickReset.bind(Object(s.a)(a)),a.reloadGraph=a.reloadGraph.bind(Object(s.a)(a)),a}return Object(i.a)(n,[{key:"onChangeConfig",value:function(e){var t=e.currentTarget,n=t.value,a=t.name,r=this.state.config;r[a]=n,this.setState({config:r}),console.log("config",r),"type"===a&&this.reloadGraph()}},{key:"onChangeCheck",value:function(e){var t=this.state.countries,n=e.currentTarget;t.filter((function(e){return e.label===n.name})).forEach((function(e){return e.checked=n.checked})),this.setState({countries:t})}},{key:"onClickReset",value:function(){var e=this.state.countries;e.forEach((function(e){e.checked=!1})),this.setState({countries:e})}},{key:"componentDidMount",value:function(){var e=this,t=this.state;E(t.config.type,(function(n){t.times=n.labels,t.countries=n.values,t.config.from="2020-03-10",t.config.to=t.times.last(22),t.countries.filter((function(e){return"Bolivia"===e.label})).forEach((function(e){e.checked=!0})),console.log("--\x3e",t),e.setState(t)}))}},{key:"componentDidUpdate",value:function(){}},{key:"reloadGraph",value:function(){var e=this,t=this.state;E(t.config.type,(function(n){t.times=n.labels,t.countries=n.values,e.setState(t),e.forceUpdate()}))}},{key:"render",value:function(){var e=this.state,t=e.countries,n=e.config,a=e.times;return r.a.createElement("div",{className:"container-fluid"},r.a.createElement("h3",null,"COVID-19 TimeLine"),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12 col-sm-12 col-md-12 col-lg-9 col-xl-10"},r.a.createElement(I,{values:t,times:a,from:n.from,to:n.to})),r.a.createElement("div",{className:"col-12 col-sm-12 col-md-12 col-lg-3 col-xl-2"},r.a.createElement(w,{countries:t,times:a,config:n,onChangeConfig:this.onChangeConfig,onChangeCheck:this.onChangeCheck,onClickReset:this.onClickReset}))))}}]),n}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},54:function(e,t,n){e.exports=n(154)}},[[54,1,2]]]);
//# sourceMappingURL=main.f8fc9185.chunk.js.map
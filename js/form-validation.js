!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t){e.exports=angular},function(e,t){!function(){if("function"==typeof window.CustomEvent)return!1;function e(e,t){var r=document.createEvent("CustomEvent");return t=t||{bubbles:!1,cancelable:!1,detail:void 0},r.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),r}e.prototype=window.Event.prototype,window.CustomEvent=e}()},function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n);r(1);function o(e){return{restrict:"E",link:function(t,r){var n=r[0];n.addEventListener("submit",function(){var t,r,a,o=n.querySelectorAll("[tw-validation].ng-invalid, tw-telephone.ng-invalid-required, tw-telephone.ng-invalid-pattern");return!o.forEach||(o.forEach(function(n){t=e.getClosestParentByClassName(n,"form-group"),a=e.getClosestParentByClassName(n,"radio"),r=e.getClosestParentByClassName(n,"checkbox"),t&&t.classList.add("has-error"),a&&a.classList.add("has-error"),r&&r.classList.add("has-error")}),!0)})}}}o.$inject=["TwDomService"];var i=o;var s=function(){this.getClosestParentByTagName=function(e,t){for(var r=t.toUpperCase(),n=e;n;)if((n=n.parentNode)&&n.tagName&&n.tagName.toUpperCase()===r)return n;return null},this.getClosestParentByClassName=function(e,t){for(var r=e;r;)if((r=r.parentNode)&&r.classList&&r.classList.contains(t))return r;return null},this.getPreviousSiblingWithClassName=function(e,t){for(var r=e.previousElementSibling;r;){if(r.classList.contains(t))return r;r=r.previousElementSibling}return null},this.getNextSiblingWithClassName=function(e,t){for(var r=e.nextElementSibling;r;){if(r.classList.contains(t))return r;r=r.nextElementSibling}return null}},l=a.a.module("tw.styleguide.services.dom",[]).service("TwDomService",s).name,u=a.a.module("tw.styleguide.validation.form",[l]).directive("form",i).name;var c=function e(t,r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var a=r[0],o=n.getClosestParentByClassName(a,"form-group"),i=r.controller("ngModel");a.addEventListener("invalid",function(e){e.preventDefault()}),i.$validators.validation=function(){return t.$evalAsync(function(){f(i,o,a)}),!0};a.addEventListener("blur",function(){t.$evalAsync(function(){f(i,o,a)})})};function f(e,t,r){if(e.$valid)return t&&t.classList.remove("has-error"),void r.removeAttribute("aria-invalid");e.$touched&&e.$dirty&&(t&&t.classList.add("has-error"),r.setAttribute("aria-invalid","true"))}c.$inject=["$scope","$element","TwDomService"];var d=c;var p=function(){return{restrict:"A",require:{$ngModel:"ngModel"},controller:d}},g=a.a.module("tw.stylguide.validation.control",[l]).directive("twValidation",p).name,h=a.a.module("tw.styleguide.validation",[u,g]).name;function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function v(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function y(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var b=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseUrl="",this.headers={}}var t,r,n;return t=e,(r=[{key:"setBaseUrl",value:function(e){this.baseUrl=e}},{key:"setHeader",value:function(e,t){this.headers[e]=t}},{key:"extendHttpOptions",value:function(e){var t=angular.copy(e);return t.headers=t.headers?function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach(function(t){v(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},t.headers,{},this.headers):this.headers,t.url&&(t.url="".concat(this.baseUrl).concat(t.url)),t}}])&&y(t.prototype,r),n&&y(t,n),e}(),w=a.a.module("tw.styleguide.services.async-tasks-config",[]).service("AsyncTasksConfig",b).name;function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==s.return||s.return()}finally{if(a)throw o}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return T(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return T(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var D=function(){var e=this;function t(e,t,r){var n,a=l(t);return d[a]&&(n=d[a][e]),n?"short"===r?n.substr(0,3):"narrow"===r?n.substr(0,1):n:null}function r(e,t,r){var n=l(t);return n&&f[n]&&("short"!==r||"ja"===n)?f[n][e]:null}function n(e,t){var r=l(t),n=c(p,e,r)||"";return"".concat(e).concat(n)}function a(e,t){var r=l(t),n=c(g,e,r);return"".concat(e).concat(n)}function o(e,t,r){if(!e.toLocaleDateString)return null;var n=e.toLocaleDateString(t,r);return function(e){if(!e)return!0;if("ja"===l(e))return!1;return!0}(t)&&(n=n.replace(/[0-9]|\s|,|\./g,"")),n[0].toUpperCase()+n.substring(1)}function i(e){return!e||["narrow","short","long"].indexOf(e)<0?"long":e}function s(e){return function(e){try{return window.Intl.DateTimeFormat.supportedLocalesOf([e]).length>0}catch(e){return!1}}(e)?e:"en-GB"}function l(e){return e?e.substring(0,2):"en"}function u(e){return void 0!==h[e]?h[e]:" "}function c(e,t,r){return e[r]?e[r].exactMatch&&e[r].exactMatch[t]?e[r].exactMatch[t]:e[r].endsWith&&e[r].endsWith[t%10]?e[r].endsWith[t%10]:e[r].default:""}this.getLocaleDate=function(e){return e||(e=new Date),e.getDate()},this.getLocaleMonth=function(e){return e||(e=new Date),e.getMonth()},this.getLocaleFullYear=function(e){return e||(e=new Date),e.getFullYear()},this.getLocaleToday=function(){var t=new Date;return e.getUTCDateFromParts(e.getLocaleFullYear(t),e.getLocaleMonth(t),e.getLocaleDate(t))},this.getUTCDate=function(e){return e||(e=new Date),e.getUTCDate()},this.getUTCMonth=function(e){return e||(e=new Date),e.getUTCMonth()},this.getUTCFullYear=function(e){return e||(e=new Date),e.getUTCFullYear()},this.getUTCToday=function(){var t=new Date;return e.getUTCDateFromParts(e.getUTCFullYear(t),e.getUTCMonth(t),e.getUTCDate(t))},this.getLastDayOfMonth=function(t,r){return e.getUTCDateFromParts(t,r+1,0).getUTCDate()},this.getUTCDateFromParts=function(e,t,r,n,a,o){var i=new Date;return i.setUTCFullYear(e,t,r),i.setUTCHours(n||0),i.setUTCMinutes(a||0),i.setUTCSeconds(o||0),i.setUTCMilliseconds(0),i},this.getLocaleDateFromParts=function(e,t,r,n,a,o){var i=new Date;return i.setFullYear(e,t,r),i.setHours(n||0),i.setMinutes(a||0),i.setSeconds(o||0),i.setMilliseconds(0),i},this.getDatePartsFromIso=function(e){var t=0,r=0,n=parseInt(e.substr(0,4),10),a=parseInt(e.substr(5,2),10)-1,o=parseInt(e.substr(8,2),10),i=parseInt(e.substr(11,2),10)||0,s=parseInt(e.substr(14,2),10)||0,l=parseInt(e.substr(17,2),10)||0,u=e.substring(10).match("[+-]{1}[0-9]{2}(:[0-9]{2})?$");return u&&(t=parseInt(u[0].substr(1,2),10)||0,r=parseInt(u[0].substr(4,2),10)||0,"-"===u[0].substr(0,1)&&(t*=-1,r*=-1)),[n,a,o,i,s,l,t,r]},this.isIsoStringValid=function(e){return new RegExp("^".concat("[0-9]{4}-[0-9]{2}-[0-9]{2}","(").concat("T[0-9]{2}:[0-9]{2}:[0-9]{2}").concat("(.[0-9]{3})?").concat("(Z|[+,-][0-9]{2}(:[0-9]{2})?)",")?$")).test(e)},this.getUTCDateFromIso=function(t){if(!e.isIsoStringValid(t))return null;var r=C(e.getDatePartsFromIso(t),8),n=r[0],a=r[1],o=r[2],i=r[3],s=r[4],l=r[5],u=r[6],c=r[7];return e.getUTCDateFromParts(n,a,o,i+u,s+c,l)},this.getDayNamesForLocale=function(t,r){for(var n=[],a=i(r),o=0;o<7;o++)n.push(e.getDayNameForLocale(o,t,a));return n},this.getDayNameForLocale=function(r,n,a){var l=t(r,n,a);if(l)return l;var u=s(n),c=i(a);return o(e.getUTCDateFromParts(2006,0,r+1),u,{weekday:"long"})||t(r,"en-GB",c)},this.getMonthNamesForLocale=function(t,r){for(var n=[],a=i(r),o=0;o<12;o++)n.push(e.getMonthNameForLocale(o,t,a));return n},this.getMonthNameForLocale=function(t,n,a){var l=r(t,n,a);if(l)return l;var u=s(n),c=i(a),f=e.getUTCDateFromParts(2e3,t,15);return"short"===a?(t=o(f,u,{month:"long"})).length>4?t.slice(0,3):t:o(f,u,{month:"long"})||r(t,"en-GB",c)},this.getWeekday=function(t,r,n){return e.getUTCDateFromParts(t,r,n).getUTCDay()},this.isMonthBeforeDay=function(e){return"ja"===l(e)||e&&-1!==e.indexOf("US",e.length-2)},this.isYearBeforeMonth=function(e){return"ja"===l(e)},this.addYears=function(t,r){return e.addToDate(t,r,0,0)},this.addMonths=function(t,r){return e.addToDate(t,0,r,0)},this.addDays=function(t,r){return e.addToDate(t,0,0,r)},this.addToDate=function(t,r,n,a){return e.getUTCDateFromParts(t.getUTCFullYear()+r,t.getUTCMonth()+n,t.getUTCDate()+a)},this.getLocaleTimeString=function(t,r){return e.getTimeString(t.getHours(),t.getMinutes(),t.getSeconds(),r)},this.getTimeString=function(e,t,r,n){var a=l(n);if(e<10&&(e="0".concat(e)),t<10&&(t="0".concat(t)),"en"===a){var o=e>=12?"pm":"am";return 0===(e%=12)&&(e=12),"00"===t?"".concat(e).concat(o):"".concat(e,":").concat(t).concat(o)}return"".concat(e,":").concat(t)},this.getYearAndMonthPresentation=function(t,r,n,o){var i=a(t,n),s=e.getMonthNameForLocale(r,n,o||"long"),c=u(l(n));return e.isYearBeforeMonth(n)?[i,s].join(c):[s,i].join(c)},this.getYearMonthDatePresentation=function(t,r,o,i,s){var c=a(t,i),f=e.getMonthNameForLocale(r,i,s||"long"),d=n(o,i),p=u(l(i));if(e.isYearBeforeMonth(i))return[c,f,d].join(p);if(e.isMonthBeforeDay(i)){var g=[f,d].join(p);return"".concat(g,", ").concat(c)}return[d,f,c].join(p)},this.getLocaleNow=function(){return new Date},this.getUTCNow=function(){var t=new Date;return e.getUTCDateFromParts(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds())},this.getLocaleDateString=function(t,r,n){if(!t.getFullYear)return t;var a=e.getLocaleNow();return e.getDateString(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getDay(),r,t-a,a.getFullYear(),n)},this.getUTCDateString=function(t,r,n){if(!t)return t;var a=e.getUTCNow();return e.getDateString(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds(),t.getUTCDay(),r,t-a,a.getUTCFullYear(),n)},this.getDateString=function(t,r,o,i,s,l,u,c,f,d,p){var g=Math.abs(f)<5184e5&&"long"!==p,h=!g,m=Math.abs(f)<6912e5||"long"===p,v=!m||"long"===p,y=!m&&d!==t||"long"===p?a(t,c):"",b=v?e.getMonthNameForLocale(r,c,"short"===p?"short":"long"):"",w=h?n(o,c):"",C=m?e.getDayNameForLocale(u,c,"short"===p?"short":"long"):"",T=g?e.getTimeString(i,s,l,c):"";return e.combineDateParts(y,b,w,T,C,c)},this.combineDateParts=function(t,r,n,a,o,i){var s,c=l(i),f=u(c);if(e.isYearBeforeMonth(i)?s=[t,r,n].join(f).trim():e.isMonthBeforeDay(i)?(s=[r,n].join(f).trim(),t&&(s+=", ".concat(t))):s=[n,r,t].join(f).trim(),o){if("ja"===c)return"".concat(s," ").concat(a," (").concat(o,")").trim();s=r||t?"".concat(o,", ").concat(s).trim():"".concat(o," ").concat(s).trim()}return(s="".concat(s," ").concat(a)).trim()};var f={en:["January","February","March","April","May","June","July","August","September","October","November","December"],ja:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]},d={en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ja:["日","月","火","水","木","金","土"]},p={en:{exactMatch:{11:"th",12:"th",13:"th"},endsWith:{1:"st",2:"nd",3:"rd"},default:"th"},de:{default:"."},fi:{default:"."},ja:{default:"日"}},g={ja:{default:"年"}},h={ja:""}},M=a.a.module("tw.styleguide.services.date",[]).service("TwDateService",D).name;var U=function(){var e={BIF:0,BYR:0,CLP:0,DJF:0,GNF:0,JPY:0,KMF:0,KRW:0,MGA:0,PYG:0,RWF:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,HUF:0,BHD:3,JOD:3,KWD:3,OMR:3,TND:3};this.getDecimals=function(t){return t&&t.toUpperCase&&void 0!==e[t.toUpperCase()]?e[t.toUpperCase()]:2}},x=a.a.module("tw.styleguide.services.currency",[]).service("TwCurrencyService",U).name;var F=function(){var e=this;this.locale="en-GB",this.regex=/^[a-z]{2}(-[A-Z][A-Z])?$/,this.lowerCaseCountry=/^[a-z]{2}(-[a-z][a-z])?$/,this.getCurrent=function(){return e.locale},this.setCurrent=function(t){return e.isValid(t)?(e.locale=t,e.locale):e.lowerCaseCountry.test(t)?(e.locale=(r=t).slice(0,3)+r.slice(3,5).toUpperCase(),e.locale):(console&&console.warn&&console.warn("Incorrect locale: ".concat(t)),e.locale="en-GB",e.locale);var r},this.isValid=function(t){return e.regex.test(t)},this.getCountryFromLocale=function(t){return e.isValid(t)&&t.slice(3,5)}},L=a.a.module("tw.styleguide.services.locale",[]).service("TwLocaleService",F).name;function P(e){var t=this;function r(e){if(e instanceof Array){var t=[];return e.forEach(function(e){e.fields?t=t.concat(n(e,e.fields)):e.group?t=t.concat(n(e,e.group)):t.push(e)}),t}return e}function n(e,t){return e.name&&t.length&&!t[0].name&&(t[0].name=e.name),e.width&&t.length&&!t[0].width&&(t[0].width=e.width),e.tooltip&&t.length&&!t[0].helpText&&(t[0].helpText=e.tooltip),e.info&&t.length&&!t[0].helpText&&(t[0].helpText=e.info),2===t.length&&t.forEach(function(e){e.width="md"}),3===t.length&&(t[0].width="md",t[1].width="md"),t}function a(e){return!e.label&&e.title&&(e.label=e.title,delete e.title),!e.label&&e.name&&(e.label=e.name,delete e.name),!e.value&&e.code&&(e.value=e.code,delete e.code),!e.value&&e.key&&(e.value=e.key,delete e.key),e}this.prepRequirements=function(e){if(!e||!e.length)return[];var r=O(e);return r.forEach(function(e){e.prepared||(t.prepLegacyAlternatives(e),e.properties=t.prepFields(e.properties||e.fields),e.type&&"object"!==e.type&&!e.types&&(e.properties.type={type:"string",enum:[e.type],required:!0,hidden:!0},e.type="object"),e.prepared=!0)}),r},this.prepFields=function(e,n,a){if(!e)return{};var o=O(e);return o=function(e){if(e instanceof Array)throw new Error("Expecting a map of fields, not an array");var t={};return Object.keys(e).forEach(function(r){if(r.indexOf(".")>0){var n=r.split("."),a=n[0];t[a]||(t[a]={type:"object",properties:{}}),t[a].properties[n[1]]=e[r]}else t[r]=e[r]}),t}(o=function(e){if(e instanceof Array){var t={};return e.forEach(function(e){var r=e.key||e.name;delete e.key,t[r]=O(e)}),t}return e}(o=r(o))),Object.keys(o).forEach(function(e){o[e]=t.prepField(o[e],n,a)}),o},this.prepField=function(e,r,n){var a=O(e);return t.prepLegacyProps(a),t.prepType(a),t.prepPattern(a),t.prepValuesAsync(a,r),t.prepValidationMessages(a,n),t.prepHelp(a),t.prepCameraGuidelines(a),a},this.prepType=function(e){switch(e.type&&e.type.toLowerCase&&e.type.toLowerCase()){case"text":e.type="string";break;case"date":e.type="string",e.format="date";break;case"password":e.type="string",e.control="password";break;case"checkbox":e.type="boolean";break;case"select":e.control||(e.control="select"),delete e.type;break;case"radio":e.control="radio",delete e.type;break;case"upload":e.type="string",e.format="base64url";break;case"tel":e.type="string",e.format="phone";break;case"textarea":e.type="string",e.control="textarea"}e.control||"object"===e.type||(e.control=t.getControlType(e))},this.prepLegacyAlternatives=function(e){!e.title&&e.label&&(e.title=e.label),e.title||(e.title=function(e){if(e&&e.length>0){var t=e.toLowerCase().split("_").join(" ");return t.charAt(0).toUpperCase()+t.slice(1)}return""}(e.type)),!e.type&&e.name&&(e.type=e.name),!e.description&&e.tooltip&&(e.description=e.tooltip),e.fieldGroups&&!e.fields&&(e.fields=r(e.fieldGroups),delete e.fieldGroups)},this.prepLegacyProps=function(e){e.name&&!e.title&&(e.title=e.name,delete e.name),e.validationRegexp&&(e.pattern=e.validationRegexp,delete e.validationRegexp),e.min&&(e.minimum=e.min,delete e.min),e.max&&(e.maximum=e.max,delete e.max),e.example&&!e.placeholder&&(e.placeholder=e.example,delete e.example),e.tooltip&&!e.helpText&&(e.helpText=e.tooltip,delete e.tooltip),e.valuesAllowed&&!e.values&&(e.values=e.valuesAllowed,delete e.valuesAllowed),e.values&&e.values.map&&(e.values=t.prepLegacyValues(e.values)),e.value&&!e.default&&(e.default=e.value,delete e.value),e.values&&e.values&&e.values.length&&e.values[0]&&!e.values[0].value&&e.values[0].label&&!e.placeholder&&(e.placeholder=e.values[0].label,e.values=e.values.slice(1))},this.prepLegacyValues=function(e){return e.map(a)},this.prepPattern=function(e){if(e.pattern)try{RegExp(e.pattern)}catch(t){console.warn("API regexp is invalid"),delete e.pattern}else delete e.pattern},this.prepValuesAsync=function(e,r){if(e.valuesAsync){var n={};e.valuesAsync.params&&e.valuesAsync.params.length&&(n=t.getParamValuesFromModel(r,e.valuesAsync.params)),t.fetchValuesAsync(e,n).catch(function(){return t.fetchValuesAsync(e,n)})}},this.fetchValuesAsync=function(r,n){return e({method:r.valuesAsync.method||"GET",url:r.valuesAsync.url,data:n||{}}).then(function(e){r.values=t.prepLegacyValues(e.data)})},this.getParamValuesFromModel=function(e,t){var r={};return t.forEach(function(t){e[t.key]?r[t.parameterName]=e[t.key]:t.required}),r},this.prepValidationMessages=function(e){e.validationMessages&&e.validationMessages.minimum&&(e.validationMessages.min=e.validationMessages.minimum,delete e.validationMessages.minimum),e.validationMessages&&e.validationMessages.maximum&&(e.validationMessages.max=e.validationMessages.maximum,delete e.validationMessages.maximum)},this.prepHelp=function(e){!e.help&&(e.helpText||e.helpImage||e.helpList||e.uploadPlaceholderImage)&&(e.help={}),e.helpText&&(e.help.message=e.helpText,delete e.helpText),e.helpImage&&(e.help.image=e.helpImage,delete e.helpImage),e.uploadPlaceholderImage&&(e.help.image=e.uploadPlaceholderImage,delete e.uploadPlaceholderImage),e.list&&(e.help.list=e.helpList,delete e.helpList)},this.prepCameraGuidelines=function(e){e.camera&&e.camera.overlay&&!e.camera.outline&&(e.camera.outline=e.camera.overlay,delete e.camera.overlay)},this.getRequiredFields=j,this.getControlType=S}function j(e){if(Array.isArray(e))throw new Error("Expected field map");return Object.keys(e).filter(function(t){return e[t].required})}function S(e){if(e.control)return"select"===e.control&&"CHECKBOX"===e.selectType?"checkbox-group":e.control.toLowerCase();if(e.hidden)return"hidden";if(e.valuesAsync)return"select";if(e.values&&e.values.length)return function(e){if(e.control)return e.control;if("select"===e.type)return"select";if("radio"===e.type)return"radio";var t=e.enum||e.values;if(t)return t.length>3?"select":"radio";return"select"}(e);switch(e.type){case"string":return function(e){switch(e){case"date":return"date";case"base64url":return"file";case"password":return"password";case"uri":case"email":return"text";case"phone":return"tel";default:return"text"}}(e.format);case"number":case"integer":return"number";case"boolean":return"checkbox";default:return"text"}}function O(e){return JSON.parse(JSON.stringify(e))}P.$inject=["$http"];var A=P,E=a.a.module("tw.styleguide.services.requirements",[]).service("TwRequirementsService",A).name,N=a.a.module("tw.styleguide.services",[w,M,x,L,l,E]).name;t.default=a.a.module("tw.form-validation",[h,N]).name}]);
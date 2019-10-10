!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t){e.exports=angular},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(r(0)),a=o(r(7));function o(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.module("tw.styleguide.services.dom",[]).service("TwDomService",a.default).name},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(r(0));r(3);var a=i(r(4)),o=i(r(11));function i(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.module("tw.form-validation",[a.default,o.default]).name},function(e,t,r){"use strict";!function(){if("function"==typeof window.CustomEvent)return!1;function e(e,t){var r=document.createEvent("CustomEvent");return t=t||{bubbles:!1,cancelable:!1,detail:void 0},r.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),r}e.prototype=window.Event.prototype,window.CustomEvent=e}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(r(0)),a=i(r(5)),o=i(r(8));function i(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.module("tw.styleguide.validation",[a.default,o.default]).name},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(r(0)),a=i(r(6)),o=i(r(1));function i(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.module("tw.styleguide.validation.form",[o.default]).directive("form",a.default).name},function(e,t,r){"use strict";function n(e){return{restrict:"E",link:function(t,r){var n=r[0];n.addEventListener("submit",function(){var t=void 0,r=void 0,a=void 0,o=n.querySelectorAll("[tw-validation].ng-invalid, tw-telephone.ng-invalid-required, tw-telephone.ng-invalid-pattern");return!o.forEach||(o.forEach(function(n){t=e.getClosestParentByClassName(n,"form-group"),a=e.getClosestParentByClassName(n,"radio"),r=e.getClosestParentByClassName(n,"checkbox"),t&&t.classList.add("has-error"),a&&a.classList.add("has-error"),r&&r.classList.add("has-error")}),!0)})}}}Object.defineProperty(t,"__esModule",{value:!0}),n.$inject=["TwDomService"],t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){this.getClosestParentByTagName=function(e,t){for(var r=t.toUpperCase(),n=e;n;)if((n=n.parentNode)&&n.tagName&&n.tagName.toUpperCase()===r)return n;return null},this.getClosestParentByClassName=function(e,t){for(var r=e;r;)if((r=r.parentNode)&&r.classList&&r.classList.contains(t))return r;return null},this.getPreviousSiblingWithClassName=function(e,t){for(var r=e.previousElementSibling;r;){if(r.classList.contains(t))return r;r=r.previousElementSibling}return null},this.getNextSiblingWithClassName=function(e,t){for(var r=e.nextElementSibling;r;){if(r.classList.contains(t))return r;r=r.nextElementSibling}return null}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(r(0)),a=i(r(9)),o=i(r(1));function i(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.module("tw.stylguide.validation.control",[o.default]).directive("twValidation",a.default).name},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,a=r(10),o=(n=a)&&n.__esModule?n:{default:n};t.default=function(){return{restrict:"A",require:{$ngModel:"ngModel"},controller:o.default}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function e(t,r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var o=r[0],i=n.getClosestParentByClassName(o,"form-group"),u=r.controller("ngModel");o.addEventListener("invalid",function(e){e.preventDefault()}),u.$validators.validation=function(){return t.$evalAsync(function(){a(u,i,o)}),!0};o.addEventListener("blur",function(){t.$evalAsync(function(){a(u,i,o)})})};function a(e,t,r){if(e.$valid)return t&&t.classList.remove("has-error"),void r.removeAttribute("aria-invalid");e.$touched&&e.$dirty&&(t&&t.classList.add("has-error"),r.setAttribute("aria-invalid","true"))}n.$inject=["$scope","$element","TwDomService"],t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(r(0)),a=s(r(12)),o=s(r(14)),i=s(r(16)),u=s(r(1)),l=s(r(18));function s(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.module("tw.styleguide.services",[a.default,o.default,i.default,u.default,l.default]).name},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(r(0)),a=o(r(13));function o(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.module("tw.styleguide.services.date",[]).service("TwDateService",a.default).name},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{!n&&u.return&&u.return()}finally{if(a)throw o}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.default=function(){var e=this;function t(e,t,r){var n=void 0,a=s(t);return p[a]&&(n=p[a][e]),n?"short"===r?n.substr(0,3):"narrow"===r?n.substr(0,1):n:null}function r(e,t,r){var n=s(t);return n&&f[n]&&("short"!==r||"ja"===n)?f[n][e]:null}function a(e,t){var r=s(t);return""+e+(d(g,e,r)||"")}function o(e,t){var r=s(t);return""+e+d(h,e,r)}function i(e,t,r){if(!e.toLocaleDateString)return null;var n=e.toLocaleDateString(t,r);return function(e){if(!e)return!0;if("ja"===s(e))return!1;return!0}(t)&&(n=n.replace(/[0-9]|\s|,|\./g,"")),n[0].toUpperCase()+n.substring(1)}function u(e){return!e||["narrow","short","long"].indexOf(e)<0?"long":e}function l(e){return function(e){try{return window.Intl.DateTimeFormat.supportedLocalesOf([e]).length>0}catch(e){return!1}}(e)?e:"en-GB"}function s(e){return e?e.substring(0,2):"en"}function c(e){return void 0!==v[e]?v[e]:" "}function d(e,t,r){return e[r]?e[r].exactMatch&&e[r].exactMatch[t]?e[r].exactMatch[t]:e[r].endsWith&&e[r].endsWith[t%10]?e[r].endsWith[t%10]:e[r].default:""}this.getLocaleDate=function(e){return e||(e=new Date),e.getDate()},this.getLocaleMonth=function(e){return e||(e=new Date),e.getMonth()},this.getLocaleFullYear=function(e){return e||(e=new Date),e.getFullYear()},this.getLocaleToday=function(){var t=new Date;return e.getUTCDateFromParts(e.getLocaleFullYear(t),e.getLocaleMonth(t),e.getLocaleDate(t))},this.getUTCDate=function(e){return e||(e=new Date),e.getUTCDate()},this.getUTCMonth=function(e){return e||(e=new Date),e.getUTCMonth()},this.getUTCFullYear=function(e){return e||(e=new Date),e.getUTCFullYear()},this.getUTCToday=function(){var t=new Date;return e.getUTCDateFromParts(e.getUTCFullYear(t),e.getUTCMonth(t),e.getUTCDate(t))},this.getLastDayOfMonth=function(t,r){return e.getUTCDateFromParts(t,r+1,0).getUTCDate()},this.getUTCDateFromParts=function(e,t,r,n,a,o){var i=new Date;return i.setUTCFullYear(e,t,r),i.setUTCHours(n||0),i.setUTCMinutes(a||0),i.setUTCSeconds(o||0),i.setUTCMilliseconds(0),i},this.getLocaleDateFromParts=function(e,t,r,n,a,o){var i=new Date;return i.setFullYear(e,t,r),i.setHours(n||0),i.setMinutes(a||0),i.setSeconds(o||0),i.setMilliseconds(0),i},this.getDatePartsFromIso=function(e){var t=0,r=0,n=parseInt(e.substr(0,4),10),a=parseInt(e.substr(5,2),10)-1,o=parseInt(e.substr(8,2),10),i=parseInt(e.substr(11,2),10)||0,u=parseInt(e.substr(14,2),10)||0,l=parseInt(e.substr(17,2),10)||0,s=e.substring(10).match("[+-]{1}[0-9]{2}(:[0-9]{2})?$");return s&&(t=parseInt(s[0].substr(1,2),10)||0,r=parseInt(s[0].substr(4,2),10)||0,"-"===s[0].substr(0,1)&&(t*=-1,r*=-1)),[n,a,o,i,u,l,t,r]},this.isIsoStringValid=function(e){return new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2}(.[0-9]{3})?(Z|[+,-][0-9]{2}(:[0-9]{2})?))?$").test(e)},this.getUTCDateFromIso=function(t){if(!e.isIsoStringValid(t))return null;var r=e.getDatePartsFromIso(t),a=n(r,8),o=a[0],i=a[1],u=a[2],l=a[3],s=a[4],c=a[5],d=a[6],f=a[7];return e.getUTCDateFromParts(o,i,u,l+d,s+f,c)},this.getDayNamesForLocale=function(t,r){for(var n=[],a=u(r),o=0;o<7;o++)n.push(e.getDayNameForLocale(o,t,a));return n},this.getDayNameForLocale=function(r,n,a){var o=t(r,n,a);if(o)return o;var s=l(n),c=u(a);return i(e.getUTCDateFromParts(2006,0,r+1),s,{weekday:"long"})||t(r,"en-GB",c)},this.getMonthNamesForLocale=function(t,r){for(var n=[],a=u(r),o=0;o<12;o++)n.push(e.getMonthNameForLocale(o,t,a));return n},this.getMonthNameForLocale=function(t,n,a){var o=r(t,n,a);if(o)return o;var s=l(n),c=u(a),d=e.getUTCDateFromParts(2e3,t,15);return"short"===a?(t=i(d,s,{month:"long"})).length>4?t.slice(0,3):t:i(d,s,{month:"long"})||r(t,"en-GB",c)},this.getWeekday=function(t,r,n){return e.getUTCDateFromParts(t,r,n).getUTCDay()},this.isMonthBeforeDay=function(e){return"ja"===s(e)||e&&-1!==e.indexOf("US",e.length-2)},this.isYearBeforeMonth=function(e){return"ja"===s(e)},this.addYears=function(t,r){return e.addToDate(t,r,0,0)},this.addMonths=function(t,r){return e.addToDate(t,0,r,0)},this.addDays=function(t,r){return e.addToDate(t,0,0,r)},this.addToDate=function(t,r,n,a){return e.getUTCDateFromParts(t.getUTCFullYear()+r,t.getUTCMonth()+n,t.getUTCDate()+a)},this.getLocaleTimeString=function(t,r){return e.getTimeString(t.getHours(),t.getMinutes(),t.getSeconds(),r)},this.getTimeString=function(e,t,r,n){if(e<10&&(e="0"+e),t<10&&(t="0"+t),"en"===s(n)){var a=e>=12?"pm":"am";return 0===(e%=12)&&(e=12),"00"===t?""+e+a:e+":"+t+a}return e+":"+t},this.getYearAndMonthPresentation=function(t,r,n,a){var i=o(t,n),u=e.getMonthNameForLocale(r,n,a||"long"),l=c(s(n));return e.isYearBeforeMonth(n)?[i,u].join(l):[u,i].join(l)},this.getYearMonthDatePresentation=function(t,r,n,i,u){var l=o(t,i),d=e.getMonthNameForLocale(r,i,u||"long"),f=a(n,i),p=c(s(i));return e.isYearBeforeMonth(i)?[l,d,f].join(p):e.isMonthBeforeDay(i)?[d,f].join(p)+", "+l:[f,d,l].join(p)},this.getLocaleNow=function(){return new Date},this.getUTCNow=function(){var t=new Date;return e.getUTCDateFromParts(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds())},this.getLocaleDateString=function(t,r,n){if(!t.getFullYear)return t;var a=e.getLocaleNow();return e.getDateString(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getDay(),r,t-a,a.getFullYear(),n)},this.getUTCDateString=function(t,r,n){if(!t)return t;var a=e.getUTCNow();return e.getDateString(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds(),t.getUTCDay(),r,t-a,a.getUTCFullYear(),n)},this.getDateString=function(t,r,n,i,u,l,s,c,d,f,p){var g=Math.abs(d)<5184e5&&"long"!==p,h=!g,v=Math.abs(d)<6912e5||"long"===p,m=!v||"long"===p,y=!v&&f!==t||"long"===p?o(t,c):"",b=m?e.getMonthNameForLocale(r,c,"short"===p?"short":"long"):"",M=h?a(n,c):"",T=v?e.getDayNameForLocale(s,c,"short"===p?"short":"long"):"",C=g?e.getTimeString(i,u,l,c):"";return e.combineDateParts(y,b,M,C,T,c)},this.combineDateParts=function(t,r,n,a,o,i){var u=s(i),l=c(u),d=void 0;if(e.isYearBeforeMonth(i)?d=[t,r,n].join(l).trim():e.isMonthBeforeDay(i)?(d=[r,n].join(l).trim(),t&&(d+=", "+t)):d=[n,r,t].join(l).trim(),o){if("ja"===u)return(d+" "+a+" ("+o+")").trim();d=r||t?(o+", "+d).trim():(o+" "+d).trim()}return(d=d+" "+a).trim()};var f={en:["January","February","March","April","May","June","July","August","September","October","November","December"],ja:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]},p={en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ja:["日","月","火","水","木","金","土"]},g={en:{exactMatch:{11:"th",12:"th",13:"th"},endsWith:{1:"st",2:"nd",3:"rd"},default:"th"},de:{default:"."},fi:{default:"."},ja:{default:"日"}},h={ja:{default:"年"}},v={ja:""}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(r(0)),a=o(r(15));function o(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.module("tw.styleguide.services.currency",[]).service("TwCurrencyService",a.default).name},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e={BIF:0,BYR:0,CLP:0,DJF:0,GNF:0,JPY:0,KMF:0,KRW:0,MGA:0,PYG:0,RWF:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,HUF:0,BHD:3,JOD:3,KWD:3,OMR:3,TND:3};this.getDecimals=function(t){return t&&t.toUpperCase&&void 0!==e[t.toUpperCase()]?e[t.toUpperCase()]:2}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(r(0)),a=o(r(17));function o(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.module("tw.styleguide.services.locale",[]).service("TwLocaleService",a.default).name},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=this;this.locale="en-GB",this.regex=/^[a-z]{2}(-[A-Z][A-Z])?$/,this.lowerCaseCountry=/^[a-z]{2}(-[a-z][a-z])?$/,this.getCurrent=function(){return e.locale},this.setCurrent=function(t){return e.isValid(t)?(e.locale=t,e.locale):e.lowerCaseCountry.test(t)?(e.locale=(r=t).slice(0,3)+r.slice(3,5).toUpperCase(),e.locale):(console&&console.warn&&console.warn("Incorrect locale: "+t),e.locale="en-GB",e.locale);var r},this.isValid=function(t){return e.regex.test(t)},this.getCountryFromLocale=function(t){return e.isValid(t)&&t.slice(3,5)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(r(0)),a=o(r(19));function o(e){return e&&e.__esModule?e:{default:e}}t.default=n.default.module("tw.styleguide.services.requirements",[]).service("TwRequirementsService",a.default).name},function(e,t,r){"use strict";function n(e){var t=this;function r(e){if(e instanceof Array){var t=[];return e.forEach(function(e){e.fields?t=t.concat(n(e,e.fields)):e.group?t=t.concat(n(e,e.group)):t.push(e)}),t}return e}function n(e,t){return e.name&&t.length&&!t[0].name&&(t[0].name=e.name),e.width&&t.length&&!t[0].width&&(t[0].width=e.width),e.tooltip&&t.length&&!t[0].helpText&&(t[0].helpText=e.tooltip),e.info&&t.length&&!t[0].helpText&&(t[0].helpText=e.info),2===t.length&&t.forEach(function(e){e.width="md"}),3===t.length&&(t[0].width="md",t[1].width="md"),t}function u(e){return!e.label&&e.title&&(e.label=e.title,delete e.title),!e.label&&e.name&&(e.label=e.name,delete e.name),!e.value&&e.code&&(e.value=e.code,delete e.code),!e.value&&e.key&&(e.value=e.key,delete e.key),e}this.prepRequirements=function(e){if(!e||!e.length)return[];var r=i(e);return r.forEach(function(e){e.prepared||(t.prepLegacyAlternatives(e),e.properties=t.prepFields(e.properties||e.fields),e.type&&"object"!==e.type&&!e.types&&(e.properties.type={type:"string",enum:[e.type],required:!0,hidden:!0},e.type="object"),e.prepared=!0)}),r},this.prepFields=function(e,n,a){if(!e)return{};var o=i(e);return o=function(e){if(e instanceof Array)throw new Error("Expecting a map of fields, not an array");var t={};return Object.keys(e).forEach(function(r){if(r.indexOf(".")>0){var n=r.split("."),a=n[0];t[a]||(t[a]={type:"object",properties:{}}),t[a].properties[n[1]]=e[r]}else t[r]=e[r]}),t}(o=function(e){if(e instanceof Array){var t={};return e.forEach(function(e){var r=e.key||e.name;delete e.key,t[r]=i(e)}),t}return e}(o=r(o))),Object.keys(o).forEach(function(e){o[e]=t.prepField(o[e],n,a)}),o},this.prepField=function(e,r,n){var a=i(e);return t.prepLegacyProps(a),t.prepType(a),t.prepPattern(a),t.prepValuesAsync(a,r),t.prepValidationMessages(a,n),t.prepHelp(a),a},this.prepType=function(e){switch(e.type&&e.type.toLowerCase&&e.type.toLowerCase()){case"text":e.type="string";break;case"date":e.type="string",e.format="date";break;case"password":e.type="string",e.control="password";break;case"checkbox":e.type="boolean";break;case"select":e.control||(e.control="select"),delete e.type;break;case"radio":e.control="radio",delete e.type;break;case"upload":e.type="string",e.format="base64url";break;case"tel":e.type="string",e.format="phone";break;case"textarea":e.type="string",e.control="textarea"}e.control||"object"===e.type||(e.control=t.getControlType(e))},this.prepLegacyAlternatives=function(e){!e.title&&e.label&&(e.title=e.label),e.title||(e.title=function(e){if(e&&e.length>0){var t=e.toLowerCase().split("_").join(" ");return t.charAt(0).toUpperCase()+t.slice(1)}return""}(e.type)),!e.type&&e.name&&(e.type=e.name),!e.description&&e.tooltip&&(e.description=e.tooltip),e.fieldGroups&&!e.fields&&(e.fields=r(e.fieldGroups),delete e.fieldGroups)},this.prepLegacyProps=function(e){e.name&&!e.title&&(e.title=e.name,delete e.name),e.validationRegexp&&(e.pattern=e.validationRegexp,delete e.validationRegexp),e.min&&(e.minimum=e.min,delete e.min),e.max&&(e.maximum=e.max,delete e.max),e.example&&!e.placeholder&&(e.placeholder=e.example,delete e.example),e.tooltip&&!e.helpText&&(e.helpText=e.tooltip,delete e.tooltip),e.valuesAllowed&&!e.values&&(e.values=e.valuesAllowed,delete e.valuesAllowed),e.values&&e.values.map&&(e.values=t.prepLegacyValues(e.values)),e.value&&!e.default&&(e.default=e.value,delete e.value),e.values&&e.values&&e.values.length&&e.values[0]&&!e.values[0].value&&e.values[0].label&&!e.placeholder&&(e.placeholder=e.values[0].label,e.values=e.values.slice(1))},this.prepLegacyValues=function(e){return e.map(u)},this.prepPattern=function(e){if(e.pattern)try{RegExp(e.pattern)}catch(t){console.warn("API regexp is invalid"),delete e.pattern}else delete e.pattern},this.prepValuesAsync=function(e,r){if(e.valuesAsync){var n={};e.valuesAsync.params&&e.valuesAsync.params.length&&(n=t.getParamValuesFromModel(r,e.valuesAsync.params)),t.fetchValuesAsync(e,n).catch(function(){return t.fetchValuesAsync(e,n)})}},this.fetchValuesAsync=function(r,n){return e({method:r.valuesAsync.method||"GET",url:r.valuesAsync.url,data:n||{}}).then(function(e){r.values=t.prepLegacyValues(e.data)})},this.getParamValuesFromModel=function(e,t){var r={};return t.forEach(function(t){e[t.key]?r[t.parameterName]=e[t.key]:t.required}),r},this.prepValidationMessages=function(e){e.validationMessages&&e.validationMessages.minimum&&(e.validationMessages.min=e.validationMessages.minimum,delete e.validationMessages.minimum),e.validationMessages&&e.validationMessages.maximum&&(e.validationMessages.max=e.validationMessages.maximum,delete e.validationMessages.maximum)},this.prepHelp=function(e){!e.help&&(e.helpText||e.helpImage||e.helpList||e.uploadPlaceholderImage)&&(e.help={}),e.helpText&&(e.help.message=e.helpText,delete e.helpText),e.helpImage&&(e.help.image=e.helpImage,delete e.helpImage),e.uploadPlaceholderImage&&(e.help.image=e.uploadPlaceholderImage,delete e.uploadPlaceholderImage),e.list&&(e.help.list=e.helpList,delete e.helpList)},this.getRequiredFields=a,this.getControlType=o}function a(e){if(Array.isArray(e))throw new Error("Expected field map");return Object.keys(e).filter(function(t){return e[t].required})}function o(e){if(e.control)return e.control.toLowerCase();if(e.hidden)return"hidden";if(e.valuesAsync)return"select";if(e.values&&e.values.length)return function(e){if(e.control)return e.control;if("select"===e.type)return"select";if("radio"===e.type)return"radio";var t=e.enum||e.values;if(t)return t.length>3?"select":"radio";return"select"}(e);switch(e.type){case"string":return function(e){switch(e){case"date":return"date";case"base64url":return"file";case"password":return"password";case"uri":case"email":return"text";case"phone":return"tel";default:return"text"}}(e.format);case"number":case"integer":return"number";case"boolean":return"checkbox";default:return"text"}}function i(e){return JSON.parse(JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0}),n.$inject=["$http"],t.default=n}]);
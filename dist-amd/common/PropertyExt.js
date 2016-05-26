(function(e,t){typeof define=="function"&&define.amd?define(["./Class"],t):e.common_PropertyExt=t(e.common_Class)})(this,function(e){function s(e){return e.indexOf(t)===0}function o(e,t){return e[n+t]}function u(e,t,n,r,i,s){s=s||{},this.id=e,this.type=n,this.origDefaultValue=t,this.defaultValue=s.optional&&t===null?undefined:t,this.description=r,this.set=i,this.ext=s;switch(n){case"set":this.checkedAssign=function(t){var r=typeof i=="function"?i.call(this):i;return(!r||r.indexOf(t)<0)&&console.error("Invalid value for '"+e+"':  "+t+" expected "+n),t};break;case"html-color":this.checkedAssign=function(t){if(window.__hpcc_debug&&t&&t!=="red"){var r="red",i=document.createElement("div");i.style.color=r,i.style.color=t,(i.style.color===r||i.style.color==="")&&console.error("Invalid value for '"+e+"':  "+t+" expected "+n)}return t};break;case"boolean":this.checkedAssign=function(e){return typeof e=="string"&&["false","off","0"].indexOf(e.toLowerCase())>=0?!1:Boolean(e)};break;case"number":this.checkedAssign=function(e){return Number(e)};break;case"string":this.checkedAssign=function(e){return String(e)};break;case"array":this.checkedAssign=function(t){return t instanceof Array||console.error("Invalid value for '"+e+"':  "+t+" expected "+n),t};break;case"object":this.checkedAssign=function(t){return t instanceof Object||console.error("Invalid value for '"+e+"':  "+t+" expected "+n),t};break;case"widget":this.checkedAssign=function(t){return(!t._class||t._class.indexOf("common_PropertyExt")<0)&&console.error("Invalid value for '"+e+"':  "+t+" expected "+n),t};break;case"widgetArray":this.checkedAssign=function(t){return t.some(function(e){return!e._class||e._class.indexOf("common_Widget")<0})&&console.error("Invalid value for '"+e+"':  "+t+" expected "+n),t};break;case"propertyArray":this.checkedAssign=function(t){return t.some(function(e){return!e.publishedProperties})&&console.log("Invalid value for '"+e+"':  "+t+" expected "+n),t};break;default:this.checkedAssign=function(t){return window.__hpcc_debug&&console.error("Unchecked property type for '"+e+"':  "+t+" expected "+n),t}}}function a(e,t,n,r,i){this.id=e,this.type="proxy",this.proxy=t,this.method=n,this.defaultValue=r,this.ext=i||{}}function l(){e.call(this),this._id="_pe"+ ++f,this._watchArr=[],this.publishedProperties(!0).forEach(function(e){switch(e.type){case"array":case"widgetArray":case"propertyArray":this[e.id+"_reset"]()}},this)}var t="__meta_",n="__private_",r="__prop_",i="__default_",f=0;return l.prototype=Object.create(e.prototype),l.prototype._class+=" common_PropertyExt",l.prototype.id=function(){return this._id},l.prototype.publishedProperties=function(e){var t=[];for(var n in this)s(n)&&(e||!o(this,n))&&t.push(this[n]);return t},l.prototype.publishedProperty=function(e){return this[t+e]},l.prototype.publishedModified=function(e){return this.publishedProperties().some(function(e){return this[e.id+"_modified"]()},this)},l.prototype.publishReset=function(e,r){e=(e||[]).map(function(e){return t+e}),r=(r||[]).map(function(e){return t+e});for(var i in this)if(s(i)){var o=!e.length||e.length&&e.indexOf(i)>=0,u=r.indexOf(i)>=0;o&&!u&&(this[n+i]=!0)}},l.prototype.publish=function(e,s,o,a,f,l){l=l||{};if(this[t+e]!==undefined&&!l.override)throw e+" is already published.";var c=this[t+e]=new u(e,s,o,a,f,l);c.ext.internal&&(this[n+e]=!0),this[e]=function(t){return arguments.length?(t===""&&c.ext.optional?t=null:t!==null&&(t=c.checkedAssign.call(this,t)),this.broadcast(e,t,this[r+e]),t===null?delete this[r+e]:this[r+e]=t,this):this[e+"_disabled"]()?this[e+"_default"]():this[r+e]!==undefined?this[r+e]:this[e+"_default"]()},this[e+"_disabled"]=function(){return l&&l.disable?l.disable(this):!1},this[e+"_modified"]=function(){return this[r+e]!==undefined},this[e+"_exists"]=function(){return this[r+e]!==undefined||this[e+"_default"]()!==undefined},this[e+"_default"]=function(t){return arguments.length?(t===""&&(t=null),t===null?delete this[i+e]:this[i+e]=t,this):this[i+e]!==undefined?this[i+e]:c.defaultValue},this[e+"_reset"]=function(){switch(o){case"widget":this[r+e]&&this[r+e].target(null);break;case"widgetArray":this[r+e]&&this[r+e].forEach(function(e){e.target(null)})}switch(o){case"array":case"widgetArray":case"propertyArray":this[i+e]=this[e+"_default"]().map(function(e){return e})}return delete this[r+e],this},this[e+"_options"]=function(){if(typeof f=="function"){var e=c.ext.optional?[null]:[];return e.concat(f.apply(this,arguments))}return f}},l.prototype.publishWidget=function(e,t,n){for(var i in t.prototype)if(i.indexOf("__meta")===0){var s=t.prototype[i];this.publishProxy(e+r+s.id,n,s.method||s.id)}},l.prototype.publishProxy=function(e,n,r,i){r=r||e;if(this[t+e]!==undefined)throw e+" is already published.";this[t+e]=new a(e,n,r,i),this[e]=function(t){return arguments.length?(i!==undefined&&t===i?this[n][r+"_reset"]():this[n][r](t),this):i===undefined||this[e+"_modified"]()?this[n][r]():i},this[e+"_disabled"]=function(){return this[n][r+"_disabled"]()},this[e+"_modified"]=function(){return this[n][r+"_modified"]()&&(i===undefined||this[n][r]()!==i)},this[e+"_exists"]=function(){return this[n][r+"_exists"]()},this[e+"_default"]=function(e){return arguments.length?(this[n][r+"_default"](e),this):this[n][r+"_default"]()},this[e+"_reset"]=function(){return this[n][r+"_reset"](),this},this[e+"_options"]=function(){return this[n][r+"_options"]()}},l.prototype._monitorProperty=function(e,t){var n=this,r=this._watchArr.push({propertyID:e,callback:t})-1;return{remove:function(){delete n._watchArr[r]}}},l.prototype.monitor=function(e){var t=this;return this._watchArr.length===0&&this.publishedProperties().forEach(function(e){switch(e.type){case"proxy":this[e.proxy]&&this[e.proxy]._monitorProperty(e.id,function(e,n,r){t.broadcast(e,n,r)})}},this),this._monitorProperty(undefined,e)},l.prototype.broadcast=function(e,t,n,r){r=r||this,this._watchArr.length&&t!==n&&this._watchArr.forEach(function(i){(i.propertyID===undefined||i.propertyID===e)&&i.callback&&setTimeout(function(){i.callback(e,t,n,r)},0)})},l.prototype.applyTheme=function(e){if(!e)return;var t=this._class.split(" ");for(var n in t)if(e[t[n]])for(var r in e[t[n]]){if(r==="overrideTags"&&e[t[n]][r]instanceof Object){for(var i in e[t[n]][r])this.publishedProperty(r).ext&&(this.publishedProperty(r).ext.tags=e[t[n]][r][i]);continue}this.publishedProperty(r)&&(this.publishedProperty(r).defaultValue=e[t[n]][r])}},l});
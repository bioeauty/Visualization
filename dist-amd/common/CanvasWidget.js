(function(e,t){typeof define=="function"&&define.amd?define(["d3","./Widget"],t):e.common_CanvasWidget=t(e.d3,e.common_Widget)})(this,function(e,t){function n(){t.call(this),this._tag="canvas"}return n.prototype=Object.create(t.prototype),n.prototype.constructor=n,n.prototype._class+=" common_CanvasWidget",n.prototype.resize=function(e){var n=t.prototype.resize.apply(this,arguments);return this._parentElement.style("width",this._size.width+"px").style("height",this._size.height+"px"),this._element.attr("width",this._size.width),this._element.attr("height",this._size.height),n},n.prototype.target=function(t){if(!arguments.length)return this._target;if(this._target&&t)throw"Target can only be assigned once.";this._target=t;if(typeof this._target=="string"||this._target instanceof String)this._target=document.getElementById(this._target);if(this._target){this._parentElement=e.select(this._target);if(!this._size.width&&!this._size.height){var n=parseFloat(this._parentElement.style("width")),r=parseFloat(this._parentElement.style("height"));this.size({width:n,height:r}),this.resize(this._size)}}else this.exit();return this},n.prototype.exit=function(){this._parentElement&&this._parentElement.remove(),t.prototype.exit.apply(this,arguments)},n});
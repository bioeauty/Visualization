!function(t,o){"function"==typeof define&&define.amd?define(["d3","topojson","./Choropleth","./countries"],o):t.map_ChoroplethCountries=o(t.d3,t.topojson,t.map_Choropleth,t.map_countries)}(this,function(t,o,e,i){function a(){e.call(this),this._choroTopology=i.topology,this._choroTopologyObjects=i.topology.objects.countries}var r=o.feature(i.topology,i.topology.objects.countries).features,n={};for(var s in r)r[s].id&&i.countryNames[r[s].id]&&(n[i.countryNames[r[s].id].name]=r[s]);return a.prototype=Object.create(e.prototype),a.prototype.constructor=a,a.prototype._class+=" map_ChoroplethCountries",a.prototype.layerEnter=function(o,i,a){e.prototype.layerEnter.apply(this,arguments),this._selection.widgetElement(this._choroplethData),this.choroPaths=t.select(null);var r=this;this.tooltipHTML(function(t){return r.tooltipFormat({label:t[0],value:t[1]})})},a.prototype.layerUpdate=function(t){e.prototype.layerUpdate.apply(this,arguments),this.choroPaths=this._choroplethData.selectAll(".data").data(this.visible()?this.data():[],function(t){return t[0]});var o=this;this.choroPaths.enter().append("path").attr("class","data").call(this._selection.enter.bind(this._selection)).on("click",function(t){o._dataMap[t[0]]&&o.click(o.rowToObj(o._dataMap[t[0]]),"weight",o._selection.selected(this))}).on("mouseout.tooltip",this.tooltip.hide).on("mousemove.tooltip",this.tooltip.show),this.choroPaths.attr("d",function(o){var e=t._d3GeoPath(n[o[0]]);return e||console.log("Unknown Country:  "+o),e}).style("fill",function(t){var e=o._palette(t[1],o._dataMinWeight,o._dataMaxWeight);return e}),this.choroPaths.exit().remove()},a});
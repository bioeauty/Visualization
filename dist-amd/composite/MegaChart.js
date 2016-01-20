(function(e,t){typeof define=="function"&&define.amd?define(["../layout/Border","../chart/MultiChart","../common/Text","../other/Legend","../other/Toolbar","../form/Select"],t):e.composite_MegaChart=t(e.layout_Border,e.chart_MultiChart,e.common_Text,e.other_Legend,e.other_Toolbar,e.form_Select)})(this,function(e,t,n,r,i,s){function o(){e.call(this),this._tag="div",this._chart=new t;var r=this;this._chart.click=function(){r.click.apply(this,arguments)},this._toolbar=new i,this._valueTitle=new n,this._domainTitle=new n}return o.prototype=Object.create(e.prototype),o.prototype.constructor=o,o.prototype._class+=" composite_MegaChart",o.prototype._1DChartTypes=t.prototype._1DChartTypes,o.prototype._2DChartTypes=t.prototype._2DChartTypes,o.prototype._NDChartTypes=t.prototype._NDChartTypes,o.prototype._anyChartTypes=t.prototype._anyChartTypes,o.prototype._allChartTypes=t.prototype._allChartTypes,o.prototype.publishProxy("valueAxisTitle","_valueTitle","text"),o.prototype.publishProxy("domainAxisTitle","_domainTitle","text"),o.prototype.publish("legendPosition","right","set","Position of the Legend widget",["none","top","right","bottom","left"],{tags:["Basic"]}),o.prototype.publish("showToolbar",!0,"boolean","Enable/Disable Toolbar widget",null,{tags:["Basic"]}),o.prototype.publish("showChartSelect",!0,"boolean","Show/Hide the chartType dropdown in the toolbar",null,{tags:["Basic"]}),o.prototype.publishProxy("chartType","_chart","chartType"),o.prototype.publishProxy("title","_toolbar","title"),o.prototype.publishProxy("toolbarWidgets","_toolbar","widgets"),o.prototype.chartTypeProperties=function(e){return arguments.length?(this._chart.chartTypeProperties(e),this):this._chart.chartTypeProperties()},o.prototype.enter=function(t,n){e.prototype.enter.apply(this,arguments);var i=this;this.setContent("center",this._chart),this._legend=(new r).fixedSize(!0).targetWidget(this._chart),this._legend.orientation(["top","bottom"].indexOf(this.legendPosition())!==-1?"horizontal":"vertical"),this._prevLegendPosition=this.legendPosition(),this.valueAxisTitle()&&this.setContent("left",this._valueTitle.rotation(-90)).leftShrinkWrap(!0),this.domainAxisTitle()&&this.setContent("bottom",this._domainTitle).bottomShrinkWrap(!0);if(this.showToolbar()){this.topShrinkWrap(!1).topPercentage(0).topSize(30);var o=(new s).selectOptions(this._allChartTypes.map(function(e){return[e.id,e.display]})).value(this.chartType());o.change=function(e){i.chartType(e.value()).render()},this.toolbarWidgets([o]),this.setContent("top",this._toolbar)}this.legendPosition()!=="none"&&this.setContent(this.legendPosition(),this._legend)[this.legendPosition()+"ShrinkWrap"](!0)},o.prototype.update=function(t,n){this._chart.columns(this.columns()).data(this.data()),this._chart.chartType()!==this.chartType()&&this._chart.chartType(this.chartType()),this._prevLegendPosition!==this.legendPosition()&&(this._prevLegendPosition!=="none"&&this.clearContent(this._prevLegendPosition),this._prevLegendPosition=this.legendPosition(),this.legendPosition()!=="none"&&(this._legend=(new r).fixedSize(!0).targetWidget(this.getContent("center")),this.setContent(this.legendPosition(),this._legend),this._legend.orientation(["top","bottom"].indexOf(this.legendPosition())!==-1?"horizontal":"vertical"))),this._contentClasses=this.getContentClasses(),this.valueAxisTitle()&&this._contentClasses.left!=="common_Text"&&this.legendPosition()!=="left"&&this.setContent("left",this._valueTitle.rotation(-90)),this.domainAxisTitle()&&this._contentClasses.bottom!=="common_Text"&&this.legendPosition()!=="bottom"&&this.setContent("bottom",this._domainTitle).bottomShrinkWrap(!0),this.domainAxisTitle()&&this._contentClasses.top!=="other_Toolbar"&&this.legendPosition()!=="top"&&this.setContent("top",this._toolbar).topShrinkWrap(!1),this._legend.dataFamily(this._chart.getChartDataFamily()),e.prototype.update.apply(this,arguments)},o.prototype.exit=function(t,n){e.prototype.exit.apply(this,arguments)},o.prototype.getContentClasses=function(){var e={},t=this.getContent("top"),n=this.getContent("right"),r=this.getContent("bottom"),i=this.getContent("left");return e.top=t!==null?t.classID():undefined,e.right=n!==null?n.classID():undefined,e.bottom=r!==null?r.classID():undefined,e.left=i!==null?i.classID():undefined,e},o});
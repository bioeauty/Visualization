(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/HTMLWidget","amcharts.serial","require","../common/Utility","./SerialAxis"],t):e.amchart_CommonSerial=t(e.d3,e.common_HTMLWidget,e.AmCharts,e.require,e.common_Utility,e.amchart_SerialAxis)})(this,function(e,t,n,r,i,s){function o(){t.call(this),this._tag="div",this._chart={},this._selected=null,this._selections=[],this._dataUpdated=0,this._prevDataUpdated=-1,this._columnsUpdated=0,this._prevColumnsUpdated=-1,this._dateParserData=e.time.format("%Y-%m-%d").parse,this._dateParserValue=e.time.format("%Y-%m-%d").parse,this._colorObj={},this._selectionObj={}}o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.prototype._class+=" amchart_CommonSerial",o.prototype.publish("xAxes",[],"propertyArray","xAxis",null,{max:1,tags:["Basic"]}),o.prototype.publish("yAxes",[],"propertyArray","yAxis",null,{tags:["Basic"]}),o.prototype.publish("fontSize",11,"number","Font Size",null,{tags:["Basic","Shared"]}),o.prototype.publish("fontFamily","Verdana","string","Font Name",null,{tags:["Basic","Shared","Shared"]}),o.prototype.publish("fontColor","#000000","html-color","Font Color",null,{tags:["Basic","Shared"]}),o.prototype.publish("lineWidth",1,"number","Line Thickness",null,{min:0,max:10,step:1,inputType:"range",tags:["Basic","Shared"]}),o.prototype.publish("lineColor",null,"html-color","Color of the data/content lines",null,{tags:["Basic","Shared"]}),o.prototype.publish("lineOpacity",1,"number","Line Opacity",null,{min:0,max:1,step:.001,inputType:"range",tags:["Basic","Shared"]}),o.prototype.publish("dashedLineStyle",0,"number","Length of Dashed Line. 0 = none",null,{tags:["Advanced","Shared"]}),o.prototype.publish("marginLeft",null,"number","Margin (Left)",null,{tags:["Intermediate"]}),o.prototype.publish("marginRight",null,"number","Margin (Right)",null,{tags:["Intermediate"]}),o.prototype.publish("marginTop",null,"number","Margin (Top)",null,{tags:["Intermediate"]}),o.prototype.publish("marginBottom",null,"number","Margin (Bottom)",null,{tags:["Intermediate"]}),o.prototype.publish("showScrollbar",!1,"boolean","Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]}),o.prototype.publish("orientation","horizontal","set","Orientation",["horizontal","vertical"],{tags:["Intermediate"]}),o.prototype.publish("startDuration",.3,"number","Start Duration (sec)",null,{tags:["Private"]}),o.prototype.publish("useImgPatterns",!1,"boolean","Enable Image Pattern backgrounds",null,{tags:["Private"]}),o.prototype.publish("imgPatternArr",'["../ampatterns/black/pattern2.png"]',"string","Background Pattern Images (Not used if '[]')",null,{inputType:"textarea",tags:["Private"]}),o.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),o.prototype.publish("yAxisTickFormat","s","string","Y-Axis Tick Format"),o.prototype.publish("sortDates",!1,"boolean","Sort date field for timeseries data"),o.prototype.publish("axisMinPeriod","MM","string","Minimum period when parsing dates"),o.prototype.publish("selectionColor","#f00","html-color","Font Color",null,{tags:["Basic"]}),o.prototype.publish("selectionMode","simple","set","Selection Mode",["simple","multi"],{tags:["Intermediate"]}),o.prototype.publish("showCursor",!1,"boolean","Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]}),o.prototype.publish("showFirstLabel",!0,"boolean","Show first label",null,{tags:["Intermediate","Shared"]}),o.prototype.publish("showLastLabel",!0,"boolean","Show last label",null,{tags:["Intermediate","Shared"]}),o.prototype.publish("equalSpacing",!1,"boolean","Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]}),o.prototype.publish("paletteGrouping","By Column","set","Palette Grouping",["By Category","By Column"],{tags:["Basic"]}),o.prototype.publish("y2",[],"array","Columns to associate with second Y-Axis");var u=o.prototype.xAxes,a=o.prototype.yAxes;return o.prototype.Axes=function(e,t){var n=e==="x"?u:a;if(t===undefined){var r=this,i=n.call(this);return i.forEach(function(e){e._context=r}),i}var o;o=n.call(this)[t];if(o)return o._context=this,o;o=new s;var f=n.call(this);return o._context=this,f.push(o),n.call(this,f),o},o.prototype.xAxis=function(e){return this.Axes("x",e)},o.prototype.yAxis=function(e){return this.Axes("y",e)},o.prototype.formatData=function(e){switch(this.xAxis()[0].axisType()){case"time":return this.xAxis()[0]._parser(typeof e=="number"?e.toString():e);default:return e}},o.prototype.formatValue=function(e){if(!e)return e;if(e instanceof Array)return e.map(function(e){return this.formatValue(e)},this);switch(this.yAxis()[0].axisType()){case"time":return this.yAxis()[0]._parser(typeof e=="number"?e.toString():e);default:if(typeof e=="string")return+e;return e}},o.prototype.amFormatData=function(e){this._rangeType=null;var t=[],n=this;e.forEach(function(e){var r={};e.forEach(function(e,t){var i=n.columns()[t];if(e instanceof Array){var s=t-1;e.length===2?(r["openField"+s]=n.formatValue(e[0]),r["valueField"+s]=n.formatValue(e[1]),n._rangeType="normal"):(r["lowField"+s]=n.formatValue(e[0]),r["openField"+s]=n.formatValue(e[1]),r["closeField"+s]=n.formatValue(e[2]),r["highField"+s]=n.formatValue(e[3]),n._rangeType="candle-ohlc")}else t===0?r[i]=n.formatData(e):t>=n.columns().length?r[i]=e:r[i]=n.formatValue(e)}),t.push(r)});if(this.sortDates()){var r=n.columns()[0];t.sort(function(e,t){return e[r]-t[r]})}return t},o.prototype.updateChartOptions=function(){this._chart.type="serial",this._chart.startDuration=this.startDuration(),this._chart.rotate=this.orientation()==="vertical",this._chart.color=this.fontColor(),this._chart.fontSize=this.fontSize(),this._chart.fontFamily=this.fontFamily(),this._chart.categoryAxis={};var t=this.xAxis()[0];t.type("x"),this._chart.categoryAxis.position=t.position()?t.position():"bottom",this._chart.categoryAxis.autoGridCount=t.axisAutoGridCount(),this._chart.categoryAxis.gridPosition=t.axisGridPosition(),this._chart.categoryAxis.axisAlpha=t.axisAlpha(),this._chart.categoryAxis.gridAlpha=t.axisGridAlpha(),this._chart.categoryAxis.startOnAxis=t.startOnAxis(),this._chart.categoryAxis.labelRotation=t.axisLabelRotation(),this._chart.categoryAxis.title=t.axisTitle(),this._chart.categoryAxis.axisColor=t.axisBaselineColor(),this._chart.categoryAxis.axisThickness=t.axisLineWidth(),this._chart.categoryAxis.boldPeriodBeginning=t.axisBoldPeriodBeginning(),this._chart.categoryAxis.dashLength=t.axisDashLength(),this._chart.categoryAxis.fillAlpha=t.axisFillAlpha(),this._chart.categoryAxis.fillColor=t.axisFillColor(),this._chart.categoryAxis.fontSize=t.axisFontSize(),this._chart.categoryAxis.color=t.axisFontColor(),this._chart.categoryAxis.titleColor=t.axisTitleFontColor(),this._chart.categoryAxis.titleFontSize=t.axisTitleFontSize(),this._chart.categoryAxis.showFirstLabel=this.showFirstLabel(),this._chart.categoryAxis.showLastLabel=this.showLastLabel(),this._chart.categoryAxis.equalSpacing=this.equalSpacing();switch(t.axisType()){case"time":this._chart.categoryAxis.parseDates=!0,this._chart.categoryAxis.minPeriod=this.axisMinPeriod()?this.axisMinPeriod():undefined,this._chart.categoryAxis.logarithmic=!1,t.axisTickFormat()?this.dataFormatter=e.time.format(t.axisTickFormat()):t.axisTypeTimePattern()?this.dataFormatter=e.time.format(t.axisTypeTimePattern()):this.dataFormatter=function(e){return e};break;case"log":this._chart.categoryAxis.parseDates=!1,this._chart.categoryAxis.logarithmic=!0,this.dataFormatter=t.axisTickFormat()?e.format(t.axisTickFormat()):function(e){return e};break;case"linear":default:this._chart.categoryAxis.parseDates=!1,this._chart.categoryAxis.logarithmic=!1,this.dataFormatter=t.axisTickFormat()?e.format(t.axisTickFormat()):function(e){return e}}var r=this;this._chart.categoryAxis.labelFunction=function(e,n,i){switch(t.axisType()){case"time":return r.dataFormatter(t.axisTickFormat()||t.axisTypeTimePattern()?new Date(n):n);default:return r.dataFormatter(e)}};for(var i=0;i<this.yAxes().length;i++){var s=this.yAxis()[i];s.type("y"),this._chart.valueAxes[i]||this._chart.valueAxes.push(new n.ValueAxis),this._chart.valueAxes[i].id="v"+i,this._chart.valueAxes[i].position=s.position()?s.position():"left",this._chart.valueAxes[i].title=s.axisTitle(),this._chart.valueAxes[i].titleColor=s.axisTitleFontColor(),this._chart.valueAxes[i].titleFontSize=s.axisTitleFontSize(),this._chart.valueAxes[i].axisThickness=s.axisLineWidth(),this._chart.valueAxes[i].color=s.axisFontColor(),this._chart.valueAxes[i].fontSize=s.axisFontSize(),this._chart.valueAxes[i].axisColor=s.axisBaselineColor(),this._chart.valueAxes[i].axisAlpha=s.axisAlpha(),this._chart.valueAxes[i].fillColor=s.axisFillColor(),this._chart.valueAxes[i].fillAlpha=s.axisFillAlpha(),this._chart.valueAxes[i].gridAlpha=s.axisGridAlpha(),this._chart.valueAxes[i].dashLength=s.axisDashLength(),this._chart.valueAxes[i].boldPeriodBeginning=s.axisBoldPeriodBeginning();switch(s.axisType()){case"time":this._chart.valueAxes[i].type="date",this._chart.valueAxes[i].parseDates=!0,this._chart.valueAxes[i].minPeriod=this.axisMinPeriod()?this.axisMinPeriod():undefined,this._chart.valueAxes[i].logarithmic=!1,s.axisTickFormat()?this.valueFormatter=e.time.format(s.axisTickFormat()):s.axisTypeTimePattern()?this.valueFormatter=e.time.format(s.axisTypeTimePattern()):this.valueFormatter=function(e){return e};break;case"log":this._chart.valueAxes[i].parseDates=!1,this._chart.valueAxes[i].logarithmic=!0,this._chart.valueAxes[i].type="numeric",this.valueFormatter=s.axisTickFormat()?e.format(s.axisTickFormat()):function(e){return e};break;case"linear":default:this._chart.valueAxes[i].parseDates=!1,this._chart.valueAxes[i].type="numeric",this._chart.valueAxes[i].logarithmic=!1,this.valueFormatter=s.axisTickFormat()?e.format(s.axisTickFormat()):function(e){return e}}this._chart.valueAxes[i].labelFunction=function(e,t,n){switch(s.axisType()){case"time":return r.valueFormatter(s.axisTickFormat()||s.axisTypeTimePattern()?new Date(t):t);default:return r.valueFormatter(e)}}}this.showScrollbar()?this._chart.chartScrollbar.enabled=!0:this._chart.chartScrollbar.enabled=!1,this.showCursor()?(this._chart.chartCursor.enabled=!0,this._chart.chartCursor.valueLineEnabled=!0,this._chart.chartCursor.valueLineBalloonEnabled=!0,this._chart.chartCursor.categoryBalloonEnabled=!0):(this._chart.chartCursor.enabled=!1,this._chart.chartCursor.valueLineEnabled=!1,this._chart.chartCursor.valueLineBalloonEnabled=!1,this._chart.chartCursor.categoryBalloonEnabled=!1),this._currXAxisTypes=this.xAxes().map(function(e){return e.axisType()}).toString(),this._currYAxisTypes=this.yAxes().map(function(e){return e.axisType()}).toString(),this._currXAxisTypeTimePatterns=this.xAxes().map(function(e){return e.axisTypeTimePattern()}).toString(),this._currYAxisTypeTimePatterns=this.yAxes().map(function(e){return e.axisTypeTimePattern()}).toString();if(this._dataUpdated>this._prevDataUpdated||this._prevYAxisType!==this._currYAxisTypes||this._prevXAxisType!==this._currXAxisTypes||this._prevXAxisTypeTimePattern!==this._currXAxisTypeTimePatterns||this._prevYAxisTypeTimePattern!==this._currYAxisTypeTimePatterns||this.paletteGrouping&&this._prevPaletteGrouping!==this.paletteGrouping()||this._columnsUpdated>this._prevColumnsUpdated)this._chart.dataProvider=this.amFormatData(this.data());this._chart.dataProvider=this.amFormatData(this.data()),this._prevDataUpdated=this._dataUpdated,this._prevColumnsUpdated=this._columnsUpdated,this._prevXAxisTypes=this._currXAxisTypes,this._prevYAxisTypes=this._currYAxisTypes,this._prevXAxisTypeTimePatterns=this._currXAxisTypeTimePatterns,this._prevYAxisTypeTimePatterns=this._currXAxisTypeTimePatterns,this.paletteGrouping&&(this._prevPaletteGrouping=this.paletteGrouping()),this.amFormatColumns();var o,u;return this._chart.colors=[],r._class.indexOf("amchart_Area")!==-1&&(u="Area"),this._chart.dataProvider.forEach(function(e,t){r.columns().filter(function(e,t){return t>0}).forEach(function(e,n){r.paletteGrouping()==="By Category"?o=r._palette(t):o=r._palette(e),r._chart.colors.push(o),r._chart.dataProvider[t]["color"+n]=o,u!=="Area"&&(r._chart.dataProvider[t]["linecolor"+n]=r.lineColor()?r.lineColor():o),r._colorObj[t]===undefined&&(r._colorObj[t]={}),r._colorObj[t][n]={color:o,lineColor:r.lineColor()?r.lineColor():o}})}),this._chart},o.prototype.buildGraphObj=function(e,t){var n=this,r={};r.id="g"+t,this.y2().indexOf(t)!==-1?r.valueAxis="v1":r.valueAxis="v0",r.balloonFunction=function(e){return e.graph.type==="line"?e.category+", "+n.columns()[e.graph.index+1]+": "+n.data()[e.index][e.graph.index+1]:e.category+", "+n.columns()[e.graph.columnIndex+1]+": "+n.data()[e.index][e.graph.columnIndex+1]},r.lineAlpha=n.lineOpacity(),r.lineColor=n.lineColor(),r.lineThickness=n.lineWidth(),r.dashLength=n.dashedLineStyle(),r.type=e,r.title="";var i=["value","open","close","high","low"];i.forEach(function(e){typeof n["_"+e+"Field"]!="undefined"&&typeof n["_"+e+"Field"][t]!="undefined"&&(r[e+"Field"]=n["_"+e+"Field"][t])});try{if(n.useImgPatterns()){var s=JSON.parse(n.imgPatternArr());typeof s[t]!="undefined"&&(r.pattern=s[t])}else r.pattern=""}catch(o){console.log("e:"),console.log(o)}return r.colorField="color"+t,r.lineColorField="linecolor"+t,r.fillColorsField="fillcolor"+t,r},o.prototype.amFormatColumns=function(e){return this._categoryField=this.columns()[0],this._chart.categoryField=this.columns()[0],this._openField=[],this._closeField=[],this._valueField=this.columns().slice(1),this},o.prototype.enter=function(e,i){t.prototype.enter.apply(this,arguments);var s=this,o={type:"serial",addClassNames:!0,chartScrollbar:{},chartCursor:{enabled:!1,valueLineEnabled:!1,valueLineBalloonEnabled:!1,categoryBalloonEnabled:!1,cursorAlpha:0,valueLineAlpha:.2,oneBalloonOnly:!0,balloonPointerOrientation:"vertical",valueBalloonsEnabled:!1}};typeof define=="function"&&define.amd&&(o.pathToImages=r.toUrl("amchartsImg")),this._chart=n.makeChart(e,o),this._chart.addListener("clickGraphItem",function(e){var t=e.graph,n=e.item.dataContext,r,i;s._gType==="column"?(r=t.fillColorsField,i=t.lineColorField):s._gType==="line"?r=t.colorField:s._gType==="area"&&(r=t.colorField),r&&(n[r]!==null&&n[r]!==undefined?(delete n[r],n[i]=s._colorObj[e.index][e.target.columnIndex].lineColor,s.selectionMode()==="simple"&&(s._selected!==null&&(delete s._selected.data[s._selected.field],s._selected.data[s._selected.field2]=s._colorObj[s._selected.dIdx][s._selected.cIdx].lineColor),s._selected=null)):(n[r]=s.selectionColor(),n[i]=s.selectionColor(),s.selectionMode()==="simple"&&(s._selected!==null&&(delete s._selected.data[s._selected.field],s._selected.data[s._selected.field2]=s._colorObj[s._selected.dIdx][s._selected.cIdx].lineColor),s._selected={field:r,field2:i,data:n,dIdx:e.index,cIdx:e.target.columnIndex},s._selections.push(s._selected))),e.chart.validateData()),s.click(s.rowToObj(s.data()[e.index]),s.columns()[e.target.columnIndex+1],s._selected!==null)})},o.prototype.update=function(e,n){t.prototype.update.apply(this,arguments),this.xAxis().length||this.xAxis(0),this.yAxis().length||this.yAxis(0),this.y2().length&&this.yAxis(1),e.style.width=this.size().width+"px",e.style.height=this.size().height+"px",this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id()))},o.prototype.render=function(e){return t.prototype.render.apply(this,arguments)},o.prototype.data=function(e){return arguments.length&&this._dataUpdated++,t.prototype.data.apply(this,arguments)},o.prototype.columns=function(e){return arguments.length&&this._columnsUpdated++,t.prototype.columns.apply(this,arguments)},o});
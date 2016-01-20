(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/HTMLWidget","./Cell","../common/TextBox","../common/Utility","css!./Grid"],t):e.layout_Grid=t(e.d3,e.common_HTMLWidget,e.layout_Cell,e.common_TextBox,e.common_Utility)})(this,function(e,t,n,r,i){function s(){t.call(this),this._tag="div",this._colCount=0,this._rowCount=0,this._colSize=0,this._rowSize=0,this._selectionBag=new i.Selection,this.content([])}return s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.prototype._class+=" layout_Grid",s.prototype.publish("designMode",!1,"boolean","Design Mode",null,{tags:["Basic"]}),s.prototype.publish("designModeOpacity",1,"number","Opacity of Cells and drag handles in Design Mode",null,{tags:["Basic"]}),s.prototype.publish("hideDragHandles",!1,"boolean","Hide Drag Handles in Design Mode",null,{tags:["Basic"]}),s.prototype.publish("hideDesignGrid",!1,"boolean","Hide Design Mode Grid",null,{tags:["Basic"]}),s.prototype.publish("disableCellSelection",!1,"boolean","Disable the ability to 'select' cells while in designMode",null,{tags:["Basic"]}),s.prototype.publish("restrictDraggingOut",!1,"boolean","Restrict Cell dragging to the bounds of the Grid",null,{tags:["Basic"]}),s.prototype.publish("gutter",4,"number","Gap Between Widgets",null,{tags:["Basic"]}),s.prototype.publish("fitTo","all","set","Sizing Strategy",["all","width"],{tags:["Basic"]}),s.prototype.publish("designGridColor","#dddddd","html-color","Color of grid lines in Design Mode",null,{tags:["Private"]}),s.prototype.publish("designGridColorExtra","#333333","html-color","Color of excess grid lines in Design Mode",null,{tags:["Private"]}),s.prototype.publish("surfacePadding",null,"string","Cell Padding (px)",null,{tags:["Intermediate"]}),s.prototype.publish("surfaceBorderWidth",1,"number","Width (px) of Cell Border",null,{tags:["Intermediate"]}),s.prototype.publish("extraDesignModeWidth",0,"number","Number of additional columns added when in Design Mode.",null,{tags:["Private"]}),s.prototype.publish("extraDesignModeHeight",0,"number","Number of additional rows added when in Design Mode.",null,{tags:["Private"]}),s.prototype.publish("cellDensity",3,"string","Increase the cell density with this multiplier (Ex: 3 results in 3 cols per col and 3 rows per row)",null,{tags:["Intermediate"]}),s.prototype.publish("content",[],"widgetArray","widgets",null,{tags:["Basic"]}),s.prototype.getDimensions=function(){var e={width:0,height:0};return this.content().forEach(function(t){e.width<t.gridCol()+t.gridColSpan()&&(e.width=t.gridCol()+t.gridColSpan()),e.height<t.gridRow()+t.gridRowSpan()&&(e.height=t.gridRow()+t.gridRowSpan())},this),e},s.prototype.clearContent=function(){this.content(this.content().filter(function(e){return e.target(null),!1}))},s.prototype.setContent=function(e,t,r,i,s,o){s=s||1,o=o||1,i=i||"";var u=this.cellDensity();this.content(this.content().filter(function(n){return n.gridRow()===e*u&&n.gridCol()===t*u?(n.target(null),!1):!0}));if(r){var a=(new n).gridRow(e*u).gridCol(t*u).widget(r).title(i).gridRowSpan(s*u).gridColSpan(o*u);this.prevDensity=u,this.content().push(a)}return this},s.prototype.getCell=function(e,t){var n=null;return this.content().some(function(r){return e>=r.gridRow()&&e<r.gridRow()+r.gridRowSpan()&&t>=r.gridCol()&&t<r.gridCol()+r.gridColSpan()?(n=r,!0):!1}),n},s.prototype.getWidgetCell=function(e){var t=null;return this.content().some(function(n){return n.widget()._id===e?(t=n,!0):!1}),t},s.prototype.getContent=function(e){var t=null;return this.content().some(function(n){return n.widget()._id===e?(t=n.widget(),!0):!1}),t},s.prototype.updateCellMultiples=function(){var e=this;this.prevDensity!==this.cellDensity()&&(this.content().forEach(function(t){if(e.prevDensity&&e.cellDensity()){var n=e.prevDensity,r=e.cellDensity();t.gridRow(Math.floor(t.gridRow()*r/n)),t.gridCol(Math.floor(t.gridCol()*r/n)),t.gridRowSpan(Math.floor(t.gridRowSpan()*r/n)),t.gridColSpan(Math.floor(t.gridColSpan()*r/n))}}),this.prevDensity=this.cellDensity())},s.prototype.childMoved=s.prototype.debounce(function(e,t){this.render()},250),s.prototype.enter=function(e,n){t.prototype.enter.apply(this,arguments),n.style("position","relative"),this.dropDiv=n.append("div"),this.contentDiv=n.append("div"),this._scrollBarWidth=this.getScrollbarWidth()},s.prototype.findCurrentLocation=function(e){this._currLoc=[Math.floor((e.clientX-this._offsetX)/this._colSize),Math.floor((e.clientY-this._offsetY)/this._rowSize)]},s.prototype.overHandle=function(e){var t="",n=this._dragCell.handleSize(),r=this._dragCell.gridRowSpan()===this._currLoc[1]-this._dragCell.gridRow()+1,i=this._dragCell.gridRow()===this._currLoc[1],s=this._dragCell.gridColSpan()===this._currLoc[0]-this._dragCell.gridCol()+1,o=this._dragCell.gridCol()===this._currLoc[0],u=this._offsetY+this._currLoc[1]*this._rowSize,a=this._offsetX+this._currLoc[0]*this._colSize,f=this._colSize-this.gutter(),l=this._rowSize-this.gutter();return Math.ceil(u+l)>=e.clientY&&Math.floor(u+l-n)<=e.clientY&&r?t="s":Math.floor(u)<=e.clientY&&Math.ceil(u+n)>=e.clientY&&i&&(t="n"),Math.ceil(a+f)>=e.clientX&&Math.floor(a+f-n)<=e.clientX&&s?t+="e":Math.floor(a)<=e.clientX&&Math.ceil(a+n)>=e.clientX&&o&&(t+="w"),t},s.prototype.createDropTarget=function(e,t){var n=e[0]-this._dragCellOffsetX,r=e[1]-this._dragCellOffsetY,i=this._dragCell.gridColSpan(),s=this._dragCell.gridRowSpan(),o=document.createElement("div");o.id="grid-drop-target"+this.id(),o.className="grid-drop-target grid-drag-handle-"+t,this._element.node().appendChild(o),this.updateDropTarget(n,r,i,s)},s.prototype.setGridOffsets=function(){this._offsetX=this._element.node().getBoundingClientRect().left+this.gutter()/2,this._offsetY=this._element.node().getBoundingClientRect().top+this.gutter()/2},s.prototype.updateDropTarget=function(e,t,n,r){if(this.restrictDraggingOut()){var i=t<0,s=e+n>this._colCount,o=t+r>this._rowCount,u=e<0;if(s){var a=e+n-this._colCount;e-=a}if(o){var f=t+r-this._rowCount;t-=f}u&&(e=0),i&&(t=0)}var l,c,h,p;l=this._offsetY+t*this._rowSize,c=this._offsetX+e*this._colSize,h=n*this._colSize-this.gutter(),p=r*this._rowSize-this.gutter();var d=document.getElementById("grid-drop-target"+this.id());d.style.top=l+"px",d.style.left=c+"px",d.style.width=h+"px",d.style.height=p+"px"},s.prototype.moveDropTarget=function(e){this.restrictDraggingOut()&&(e[0]=e[0]>this._colCount-1?this._colCount-1:e[0],e[0]=e[0]<0?0:e[0],e[1]=e[1]>this._rowCount-1?this._rowCount-1:e[1],e[1]=e[1]<0?0:e[1]);if(this._handle){var t=[];switch(this._handle){case"nw":t=[this._dragCell.gridCol()+this._dragCell.gridColSpan()-1,this._dragCell.gridRow()+this._dragCell.gridRowSpan()-1];break;case"n":case"ne":t=[this._dragCell.gridCol(),this._dragCell.gridRow()+this._dragCell.gridRowSpan()-1];break;case"e":case"se":case"s":t=[this._dragCell.gridCol(),this._dragCell.gridRow()];break;case"sw":case"w":t=[this._dragCell.gridCol()+this._dragCell.gridColSpan()-1,this._dragCell.gridRow()]}switch(this._handle){case"e":case"w":this._locY=t[1];break;default:this._locY=e[1]<=t[1]?e[1]:t[1]}switch(this._handle){case"n":case"s":this._locX=t[0];break;default:this._locX=e[0]<=t[0]?e[0]:t[0]}switch(this._handle){case"n":case"s":this._sizeX=this._dragCell.gridColSpan();break;default:this._sizeX=Math.abs(e[0]-t[0])+1}switch(this._handle){case"e":case"w":this._sizeY=this._dragCell.gridRowSpan();break;default:this._sizeY=Math.abs(e[1]-t[1])+1}}else if(document.getElementById("grid-drop-target"+this.id())!==null){var n=this.getCell(e[1],e[0]);n!==null&&this._dragCell._id!==n._id?(document.getElementById("grid-drop-target"+this.id()).className="grid-drop-target drop-target-over",this._locX=n.gridCol(),this._locY=n.gridRow(),this._sizeX=n.gridColSpan(),this._sizeY=n.gridRowSpan()):(document.getElementById("grid-drop-target"+this.id()).className="grid-drop-target",this._locX=e[0]-this._dragCellOffsetX,this._locY=e[1]-this._dragCellOffsetY,this._sizeX=this._dragCell.gridColSpan(),this._sizeY=this._dragCell.gridRowSpan())}this.updateDropTarget(this._locX,this._locY,this._sizeX,this._sizeY)},s.prototype.updateCells=function(t,n){var r=this;this.updateCellMultiples();var i=this.contentDiv.selectAll(".cell_."+this._id).data(this.content(),function(e){return e._id});i.enter().append("div").attr("class","cell_ "+this._id).style("position","absolute").each(function(e){e.target(this),e.__grid_watch=e.monitor(function(e,t,n){r._renderCount&&e.indexOf("grid")===0&&t!==n&&r.childMoved()})});var s=e.behavior.drag().on("dragstart",function(t){e.event.sourceEvent.stopPropagation(),r._dragCell=t,r.setGridOffsets(),r.findCurrentLocation(e.event.sourceEvent),r._startLoc=[r._currLoc[0],r._currLoc[1]],r._element.selectAll(".dragHandle").style("visibility","hidden"),r._handle=r.overHandle(e.event.sourceEvent),r._dragCell._dragHandles.indexOf(r._handle)===-1&&(r._handle=undefined),r._dragCellOffsetX=r._currLoc[0]-t.gridCol(),r._dragCellOffsetY=r._currLoc[1]-t.gridRow(),r.createDropTarget(r._currLoc,r._handle),setTimeout(function(){r.contentDiv.selectAll(".cell_."+r._id).classed("dragItem",function(e){return t._id===e._id}).classed("notDragItem",function(e){return t._id!==e._id})},0),r._initSelection=!0}).on("drag",function(t){r._initSelection=!1,r._dragCell=t,r.findCurrentLocation(e.event.sourceEvent);if(typeof r._currLocation=="undefined"||r._currLocation[0]!==r._currLoc[0]||r._currLocation[1]!==r._currLoc[1])r._currLocation=r._currLoc,r.moveDropTarget(r._currLoc)}).on("dragend",function(){e.event.sourceEvent.stopPropagation();if(r._initSelection||r._startLoc[0]===r._currLoc[0]||r._startLoc[1]===r._currLoc[1])r.disableCellSelection()||r.selectionBagClick(r.getCell(r._currLoc[1],r._currLoc[0]));r._element.selectAll(".dragHandle").style("visibility",null);if(r._handle)if(r.restrictDraggingOut()){var t=r._locY>0?r._locY:0,n=r._locX>0?r._locX:0;t=r._locY+r._sizeY<r._rowCount?r._locY:r._rowCount-r._sizeY,n=r._locX+r._sizeX<r._colCount?r._locX:r._colCount-r._sizeX,r._dragCell.gridRow(t),r._dragCell.gridRowSpan(r._sizeY),r._dragCell.gridCol(n),r._dragCell.gridColSpan(r._sizeX)}else r._dragCell.gridRow(r._locY),r._dragCell.gridRowSpan(r._sizeY),r._dragCell.gridCol(r._locX),r._dragCell.gridColSpan(r._sizeX);else{var i=r._currLoc[1],s=r._currLoc[0],o=r._dragCell.gridRowSpan(),u=r._dragCell.gridColSpan(),a=r.getCell(r._currLoc[1],r._currLoc[0]);a===r._dragCell&&(o=a.gridRowSpan(),u=a.gridColSpan(),a=null);var f,l;if(a)i=a.gridRow(),s=a.gridCol(),o=a.gridRowSpan(),u=a.gridColSpan(),a.gridCol(r._dragCell.gridCol()).gridColSpan(r._dragCell.gridColSpan()).gridRow(r._dragCell.gridRow()).gridRowSpan(r._dragCell.gridRowSpan()),f=s,l=i;else{f=s-r._dragCellOffsetX,l=i-r._dragCellOffsetY;if(r.restrictDraggingOut()){o=r._dragCell.gridRowSpan(),u=r._dragCell.gridColSpan();var c=f+u-r._colCount,h=l+o-r._rowCount;f-=c>0?c:0,l-=h>0?h:0,f=f>0?f:0,l=l>0?l:0}}r._dragCell.gridCol(f).gridRow(l).gridColSpan(u).gridRowSpan(o)}var p=document.getElementById("grid-drop-target"+r.id());p.parentNode.removeChild(p),setTimeout(function(){r.contentDiv.selectAll(".cell_."+r._id).classed("dragItem",!1).classed("notDragItem",!1)},0),r._dragCell=null});this.designMode()?(this.contentDiv.selectAll(".cell_."+this._id).call(s),e.select(r._target).on("click",function(){r._selectionBag.clear(),r.postSelectionChange()})):(this.contentDiv.selectAll(".cell_."+this._id).on(".drag",null),this._selectionBag.clear()),i.style("left",function(e){return e.gridCol()*t+r.gutter()/2+"px"}).style("top",function(e){return e.gridRow()*n+r.gutter()/2+"px"}).style("width",function(e){return e.gridColSpan()*t-r.gutter()+"px"}).style("height",function(e){return e.gridRowSpan()*n-r.gutter()+"px"}).each(function(e){e._parentElement.attr("draggable",r.designMode()).selectAll(".dragHandle").attr("draggable",r.designMode()),e.surfacePadding(r.surfacePadding()).surfaceBorderWidth(r.surfaceBorderWidth()).resize()}),i.exit().each(function(e){e.target(null),e.__grid_watch&&e.__grid_watch.remove()}).remove()},s.prototype.postSelectionChange=function(){},s.prototype.updateDropCells=function(e,t,n){function d(e){return parseInt(e)-.5}function v(e,t,n,r,i){u.beginPath(),u.strokeStyle=i,u.moveTo(e,n),u.lineTo(t,r),u.stroke()}function m(){var i=!1;return typeof r.prevDimensions=="undefined"?i=!0:r.prevDimensions.width!==e.width||r.prevDimensions.height!==e.height?i=!0:r.prevCellWidth!==t||r.prevCellHeight!==n?i=!0:r._target.style.backgroundImage===""&&r.designMode()&&!r.hideDesignGrid()?i=!0:r._target.style.backgroundImage!==""&&!r.designMode()?i=!0:r._target.style.backgroundImage!==""&&r.hideDesignGrid()&&(i=!0),i}var r=this;if(m())if(this.designMode()&&!this.hideDesignGrid()){var i=document.createElement("canvas");i.width=e.width*t,i.height=e.height*n;var s=(e.width-this.extraDesignModeWidth())*t,o=(e.height-this.extraDesignModeHeight())*n,u=i.getContext("2d"),a=0;for(var f=.5+t;f<i.width;f+=t)a++,a<e.width-this.extraDesignModeWidth()?v(d(f),d(f),0,o,this.designGridColor()):v(d(f),d(f),0,i.height,this.designGridColorExtra());var l=0;for(var c=.5+n;c<i.height;c+=n)l++,l<e.height-this.extraDesignModeHeight()?v(0,s,d(c),d(c),this.designGridColor()):v(0,i.width,d(c),d(c),this.designGridColorExtra());a=0;for(var h=.5+t;h<i.width;h+=t)a<e.width-this.extraDesignModeWidth()&&v(d(h),d(h),o,i.height,this.designGridColorExtra());l=0;for(var p=.5+n;p<i.height;p+=n)l<e.height-this.extraDesignModeHeight()&&v(s,i.width,d(p),d(p),this.designGridColorExtra());this._target&&(this._target.style.backgroundImage="url("+i.toDataURL()+")"),this.prevDimensions={width:e.width,height:e.height},this.prevCellWidth=t,this.prevCellHeight=n}else this._target.style.backgroundImage=""},s.prototype.update=function(e,n){t.prototype.update.apply(this,arguments),this._parentElement.style("overflow-x",this.fitTo()==="width"?"hidden":null),this._parentElement.style("overflow-y",this.fitTo()==="width"?"scroll":null);var r=this.getDimensions();this.designMode()&&(r.width+=this.extraDesignModeWidth(),r.height+=this.extraDesignModeHeight());var i=(this.width()-(this.fitTo()==="width"?this._scrollBarWidth:0))/r.width,s=this.fitTo()==="all"?this.height()/r.height:i;this._colCount=r.width,this._rowCount=r.height,this._colSize=i,this._rowSize=s,n.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=true]").style({opacity:this.designModeOpacity()}),n.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=true] > div > div.dragHandle").style({opacity:this.designModeOpacity()}),n.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=false]").style({opacity:1}),n.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=false] > div > div.dragHandle").style({opacity:1}),this.updateCells(i,s),this.updateDropCells(r,i,s),n.classed("hideHandles",this.hideDragHandles())},s.prototype.exit=function(e,n){t.prototype.exit.apply(this,arguments)},s.prototype._createSelectionObject=function(e){return{_id:e._id,element:function(){return e._element},widget:e}},s.prototype.selection=function(e){return arguments.length?(this._selectionBag.set(e.map(function(e){return this._createSelectionObject(e)},this)),this):this._selectionBag.get().map(function(e){return e._id})},s.prototype.selectionBagClick=function(t){if(t!==null){var n=this._createSelectionObject(t);e.event.sourceEvent.ctrlKey?this._selectionBag.isSelected(n)?(this._selectionBag.remove(n),this.postSelectionChange()):(this._selectionBag.append(n),this.postSelectionChange()):(this._selectionBag.set([n]),this.postSelectionChange())}},s});
﻿(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Choropleth", "topojson/topojson", "./us-states"], factory);
    } else {
        root.ChoroplethStates = factory(root.d3, root.Choropleth, root.topojson, root.usStates);
    }
}(this, function (d3, Choropleth, topojson, usStates) {
    function ChoroplethStates() {
        Choropleth.call(this);

        this._dataMap = {};
        this._dataMaxWeight = 0;
        this._dataMinWeight = 0;
    };
    ChoroplethStates.prototype = Object.create(Choropleth.prototype);

    ChoroplethStates.prototype.data = function (_) {
        var retVal = Choropleth.prototype.data.call(this, _);
        if (arguments.length) {
            this._dataMap = {};
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            var context = this;
            this._data.forEach(function (item) {
                context._dataMap[item.state] = item.weight;
                if (!context._dataMinWeight || item.weight < context._dataMinWeight) {
                    context._dataMinWeight = item.weight;
                }
                if (!context._dataMaxWeight || item.weight > context._dataMaxWeight) {
                    context._dataMaxWeight = item.weight;
                }
            });
        }
        return retVal;
    };

    ChoroplethStates.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.call(this, domNode, element);

        var context = this;

        var choroPaths = element.selectAll("path").data(topojson.feature(usStates.topology, usStates.topology.objects.states).features)

        //  Enter  ---
        choroPaths.enter().append("path")
            .attr("d", this.d3Path)
            .on("click", function (d) {
                context.click({ state: usStates.stateNames[d.id].code });
            })
            .attr("id", function (d) {
                return usStates.stateNames[d.id].code;
            })
            .append("title")
        ;

        //  Update  ---
        this.transition.apply(choroPaths)
            .style("fill", function (d) {
                var code = usStates.stateNames[d.id].code;
                var weight = context._dataMap[code];
                if (weight === undefined) {
                    return "url(#hash)";
                }
                return context.d3Color(context._dataMap[code]);
            })
        ;

        choroPaths.select("title")
            .text(function (d) {
                var code = usStates.stateNames[d.id].code;
                return usStates.stateNames[d.id].name + " (" + context._dataMap[code] + ")";
            })
        ;
    };

    return ChoroplethStates;
}));

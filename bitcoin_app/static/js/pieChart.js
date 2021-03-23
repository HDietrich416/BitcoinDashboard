d3.json("/api/main/marketcap").then(function(data) {

    var BTC_marketcap = parseFloat(data.BTC_Dominance[0]);
    var otherCrypto = 100- BTC_marketcap


        var data = [
            {label: "Bitcoin", "percentage": BTC_marketcap},
            {label: "Other Crypto", "percentage": otherCrypto}
        ]

        var svg = d3.select('#pie-chart')
            .attr("height", 500);    
            
        var radius = 150;      
            
        var g = svg.append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")") ;

        var color = d3.scaleOrdinal(["orange", "yellow"]);
        

        var pie = d3.pie().value(function(d) { 
            return d.percentage; 
        });

        var path = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);
        
        var arc = g.selectAll()
            .data(pie(data))
            .enter()
            .append("g");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.percentage); });
            
        var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);
                    
        arc.append("text")
            .attr("transform", function(d) { 
                return "translate(" + label.centroid(d) + ")"; 
            })
            .attr("text-anchor", "middle")
            .text(function(d) { return d.data.label + ": " + d.data.percentage + "%"; });    

        });
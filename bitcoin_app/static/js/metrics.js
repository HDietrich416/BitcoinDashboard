d3.json("/api/main/price").then(function(data) {

  var priceClose = data.map(d => d.price_Close)[0][1];
  var priceDate = data.map(d => d.price_Date)[0][1];
  var priceCloseOld = data.map(d => d.price_Close)[0][2];
  var volume = data.map(d => d.volume)[0][1];



  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  var formatter_percent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
  });

  var formatter_comma = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
  });

  document.getElementById("priceClose").innerText = formatter.format(priceClose)
  document.getElementById("priceDate").innerText = priceDate

    function percentageChange(Old, newer){
      var decreaseValue = newer - Old;
      return(decreaseValue/Old);
    }
    

  document.getElementById("perChange").innerText = formatter_percent.format(percentageChange(priceCloseOld, priceClose));

  document.getElementById("volume").innerText = formatter_comma.format(volume)

  
});

d3.json("/api/main/marketcap").then(function(mc_data) {

  var formatter_tr = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });

    var marketcap = mc_data.BTC_Market_Cap_T
    

    document.getElementById("marketCap").innerText = formatter_tr.format(marketcap)




  });

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
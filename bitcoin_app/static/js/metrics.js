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

    var marketcap = mc_data.BTC_Market_Cap_T
    console.log(marketcap)

    document.getElementById("marketCap").innerText = marketcap




  });
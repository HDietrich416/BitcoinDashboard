

d3.json("/api/main/price").then(function(data) {

  // pull latest closing price and date
  var priceClose = data.map(d => d.price_Close)[0][0];
  var priceDate = data.map(d => d.price_Date)[0][0];
  var priceCloseOld = data.map(d => d.price_Close)[0][1];
  var volume = data.map(d => d.volume)[0][0];
  console.log(priceClose)
  console.log(priceCloseOld)



  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  var formatter_percent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 0,
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
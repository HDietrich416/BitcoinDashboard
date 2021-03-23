    function init() {
        d3.json("/api/main/fbpredictions").then(function(data) {
           
            var priceClose = data.map(d => d.Price)[0];
            priceClose = priceClose.slice((priceClose.length -30), priceClose.length)
            var priceDate = data.map(d => d.Date)[0]
            priceDate = priceDate.slice((priceDate.length - 30), priceDate.length)
    
        //Closing Price line
            var trace1 = {
                type: "scatter",
                mode: "lines",
                name: "Closing Price",
                x: priceDate,
                y: priceClose,
                line: {
                    color: "#17BECF"
                    }
                };
      
    
            var plot_data = [trace1];
    
            var plot_layout = {
                title: `Bitcoin Price Prediction $USD`,
                height: 500,
                width: 600,
                xaxis: {
                type: "date",
                rangeselector: {
                    x: 0,
                    y: 1.2,
                    xanchor: 'left',
                    font: {size:8},
                }
                },
                yaxis: {
                autorange: true,
                type: "linear"
                }}
            
            
            
    
            var graphdiv = document.getElementById("plot");
    
            Plotly.newPlot(graphdiv, plot_data, plot_layout, {scrollZoom: false})
        });
    };
    init();

    
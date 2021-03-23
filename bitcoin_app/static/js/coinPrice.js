function init() {
    d3.json("/api/main/price").then(function(data) {
       
        var priceOpen = data.map(d => d.price_Open);
        var priceClose = data.map(d => d.price_Close);
        var priceHigh = data.map(d => d.price_High);
        var priceLow = data.map(d => d.price_Low);
        var priceDate = data.map(d => d.price_Date)
       
        // const startDate = "2020-01-02";
        // const endDate = "2021-01-29";

    //Closing Price line
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: "Closing Price",
            x: priceDate[0],
            y: priceClose[0],
            line: {
                color: "#17BECF"
                }
            };

    // Candlestick Trace
        var trace2 = {
            type: "candlestick",
            x: priceDate[0],
            high: priceHigh[0],
            low: priceLow[0],
            open: priceOpen[0],
            close: priceClose[0], 
            date: priceDate[0]
        };


        var plot_data = [trace1, trace2];

        var plot_layout = {
            title: `Bitcoin Price $ USD`,
            height: 500,
            // width: 1300,
            xaxis: {
            type: "date",
            rangeselector: {
                x: 0,
                y: 1.2,
                xanchor: 'left',
                font: {size:8},
                buttons: [{
                step: 'month',
                stepmode: 'backward',
                count: 1,
                label: '1 month'
                }, {
                step: 'month',
                stepmode: 'backward',
                count: 6,
                label: '6 months'
                    }, {
            step: 'all',
            label: 'All dates'
                    }]
            }
            },
            yaxis: {
            autorange: true,
            type: "linear"
            }}
        
        
        

        var graphdiv = document.getElementById("stockPlot");

        Plotly.newPlot(graphdiv, plot_data, plot_layout, {scrollZoom: false})
    });
};

init();
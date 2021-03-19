// Load in stock data (json)
// var stockData = "/api/main/price";

function init() {
    d3.json("/api/main/price").then(function(data) {
        //console.log(data)
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
            title: `Bitcoin Price`,
            height: 600,
            width: 1000,
            xaxis: {
            // range: [startDate, endDate],
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

        Plotly.newPlot(graphdiv, plot_data, plot_layout, {scrollZoom: true})
    });
};

// ------------------------------------------------------------------------------
// d3.selectAll("#selDataset").on("change", updatePlotly);

// function updatePlotly() {
//     d3.json(stockData).then( function (data) {

//         var dropdownMenu = d3.select("#selDataset");

//         var dataset = dropdownMenu.node().value;

//         var date = [];
//         var high = [];
//         var low = [];
//         var open = [];
//         var close = [];
//         const startDate = "2020-01-02";
//         const endDate = "2021-01-29";
//         var stockname = String(dataset).toUpperCase();

//     switch(dataset) {
//         case "zoom":
//             date = data.map(d => d.zoom_Date)[0]
//             high = data.map(d => d.zoom_High)[0];
//             low = data.map(d => d.zoom_Low)[0];
//             open = data.map(d => d.zoom_Open)[0];
//             close = data.map(d => d.zoom_Close)[0];
//         break;

//         case "slack":
//             date = data.map(d => d.slack_Date)[2];
//             high = data.map(d => d.slack_High)[2];
//             low = data.map(d => d.slack_Low)[2];
//             open = data.map(d => d.slack_Open)[2];
//             close = data.map(d => d.slack_Close)[2];
//         break;

//         case "cisco":
//             date = data.map(d => d.cisco_Date)[1];
//             high = data.map(d => d.cisco_High)[1];
//             low = data.map(d => d.cisco_Low)[1];
//             open = data.map(d => d.cisco_Open)[1];
//             close = data.map(d => d.cisco_Close)[1];
//         break;
        
//         case "shopify":
//             date = data.map(d => d.shopify_Date)[3];
//             high = data.map(d => d.shopify_High)[3];
//             low = data.map(d => d.shopify_Low)[3];
//             open = data.map(d => d.shopify_Open)[3];
//             close = data.map(d => d.shopify_Close)[3];
//         break;
//     };

//     var trace1 = {
//         type: "scatter",
//         mode: "lines",
//         name: "Closing Price",
//         x: date,
//         y: close,
//         line: {
//             color: "#17BECF"
//             }
//         };

//     var trace2 = {
//         type: "candlestick",
//         x: date,
//         high: high,
//         low: low,
//         open: open,
//         close: close
//         };
    
//     var plot_layout = {
//             title: `${stockname} Performance`,
//             height: 600,
//             width: 1000,
//             xaxis: {
//             range: [startDate, endDate],
//             type: "date",
//             rangeselector: {
//                 x: 0,
//                 y: 1.2,
//                 xanchor: 'left',
//                 font: {size:8},
//                 buttons: [{
//                 step: 'month',
//                 stepmode: 'backward',
//                 count: 1,
//                 label: '1 month'
//                 }, {
//                 step: 'month',
//                 stepmode: 'backward',
//                 count: 6,
//                 label: '6 months'
//                     }, {
//             step: 'all',
//             label: 'All dates'
//                     }]
//             }
//             },
//             yaxis: {
//                 autorange: true,
//                 type: "linear"
//                 }
//         }

//     var graphdiv = document.getElementById("stockPlot");

//     Plotly.restyle(graphdiv, "x", [date]);
//     Plotly.restyle(graphdiv, "high", [high]);
//     Plotly.restyle(graphdiv, "low", [low]);
//     Plotly.restyle(graphdiv, "open", [open]);
//     Plotly.restyle(graphdiv, "close", [close]);
//     Plotly.restyle(graphdiv, "y", [close]);
//     Plotly.relayout(graphdiv, plot_layout)
// })
// };

init();
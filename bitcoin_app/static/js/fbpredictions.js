    function init() {
        d3.json("/api/main/fbpredictions").then(function(data) {
           
            
            // var priceOpen = data.map(d => d.price_Open);
            var priceClose = data.map(d => d.Price)[0];
           
            priceClose = priceClose.slice((priceClose.length -30), priceClose.length)
            var priceDate = data.map(d => d.Date)[0]
            priceDate = priceDate.slice((priceDate.length - 30), priceDate.length)
            // console.log(priceDatefiltered)
            // console.log(priceDate.length)
            // console.log(priceDatefiltered.length)
            // var priceDay = data.map(d => d.Day)

            // var today = new Date();
            // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            // console.log(date)

            // var end = new Date();
            // var enddate = end.setDate(date()+29);

            

            // const startDate = date;
            // const endDate = enddate;
    
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
                // range: [startDate, endDate],
                type: "date",
                rangeselector: {
                    x: 0,
                    y: 1.2,
                    xanchor: 'left',
                    font: {size:8},
                //     buttons: [{
                //     step: 'month',
                //     stepmode: 'backward',
                //     count: 1,
                //     label: '1 month'
                //     }, {
                //     step: 'month',
                //     stepmode: 'backward',
                //     count: 6,
                //     label: '6 months'
                //         }, {
                // step: 'all',
                // label: 'All dates'
                //         }]
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

    // function dayPlot() {
    //     d3.json("/api/main/fbpredictionsday").then(function(data) {
           
    //         // var priceOpen = data.map(d => d.price_Open);
    //         var priceClose = data.map(d => d.Price);
    //         // var priceHigh = data.map(d => d.price_High);
    //         // var priceLow = data.map(d => d.price_Low);
    //         //var priceDate = data.map(d => d.Date)
    //         var priceDay = data.map(d => d.Day)

    //         // var today = new Date();
    //         // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //         // //console.log(date)

    //         // var end = new Date();
    //         // var enddate = end.setDate(date()+29);

            

    //         // const startDate = date;
    //         // const endDate = enddate;
    
    //     //Closing Price line
    //         var trace1 = {
    //             type: "scatter",
    //             mode: "lines",
    //             name: "Closing Price",
    //             x: priceDay[0],
    //             y: priceClose[0],
    //             line: {
    //                 color: "#17BECF"
    //                 }
    //             };
      
    
    //         var plot_data = [trace1];
    
    //         var plot_layout = {
    //             title: `Bitcoin Price by Day of the Week`,
    //             height: 600,
    //             width: 1000,
    //             xaxis: {
    //             // range: [startDate, endDate],
    //             type: "string",
    //             rangeselector: {
    //                 x: 0,
    //                 y: 1.2,
    //                 xanchor: 'left',
    //                 font: {size:8},
    //             //     buttons: [{
    //             //     step: 'month',
    //             //     stepmode: 'backward',
    //             //     count: 1,
    //             //     label: '1 month'
    //             //     }, {
    //             //     step: 'month',
    //             //     stepmode: 'backward',
    //             //     count: 6,
    //             //     label: '6 months'
    //             //         }, {
    //             // step: 'all',
    //             // label: 'All dates'
    //             //         }]
    //             }
    //             },
    //             yaxis: {
    //             autorange: true,
    //             type: "linear"
    //             }}
            
            
            
    
    //         var graphdiv = document.getElementById("Dayplot");
    
    //         Plotly.newPlot(graphdiv, plot_data, plot_layout, {scrollZoom: true})
    //     });
    // };
    // dayPlot();
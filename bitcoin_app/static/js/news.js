
var newsData = "api/main/news"

var tableBody = d3.select("#newsTable")



d3.json(newsData).then(function(data) {
    
    data.forEach(function (item){
        var row = tableBody.append("tr");
        Object.entries(item).forEach( function([key, value]){
            var cell = row.append("td");
            cell.text(value);

    }

    )
    //console.log(data)

  
 
  
  });

})
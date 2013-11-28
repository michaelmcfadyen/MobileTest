

$('.flagpage').click(function(){
	//$('.content').load('./assets/ajax/countries.html');
	flags();
});

$('.homepage').click(function(){
	$('.grid').empty();
});

$('.out').click(function(){
	$('body').load('./assets/ajax/login.html');
});

$('.chart').click(function(){
	$('grid').empty();
	donut();
});


/*******************************************************/
/* @flags adds flag img to <div class='[countryname]'>*/
/******************************************************/
function flags(){
	$('.grid').empty();
	var flags = getFlags();		

	for(var i = 0; i < flags.length; i++){
		var imageName = flags[i]["image"];
		var name = flags[i]["name"];
		$('.grid').append('<div class='+name+'>');
		$('.'+name).addClass("col-1-4 flag");
		$('.'+name).append("<a><img src=./imgs/flags/"+imageName+" alt="+name+" title="+name+" width=\"120\" height=\"80\"></a><p class='desc'>"+name+"</p>");
	}
}

/*******************************************************/
/* @getFlags returns countries obj from json obj       */
/******************************************************/
function getFlags(){
	var obj = null;

	$.ajax({url:"./athl_coun.json", 
	       async:false, 
	       dataType:"json",
               success:function(data){
	       		obj = data.countries;
	       }});
	return obj;	
}


function donut(){
	var width = 960;
    	     height = 500;
             radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
	    .range(["#ccac00","#CCCCCC","#5B391E","#FF0040"]);
	
	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(radius - 70);

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.won; });

	var svg = d3.select(".sidebar").append("svg")
    	.attr("width", width)
    	.attr("height", height)
    	.attr('viewBox','0 0 '+width+" "+height)
    	.attr('preserveAspectRatio','xMidYMid')
	    .attr("id","chart")
            .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	d3.csv("./assets/csv/medals.csv", function(error, data) {

  	data.forEach(function(d) {
   	 d.won = +d.won;
	console.log(d.won);
  	});

  	var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.medal); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.medal; });

});
var aspect = width / height,
    chart = $("#chart");
$(window).on("resize", function() {
    var targetWidth = chart.parent().width();
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);
});
}


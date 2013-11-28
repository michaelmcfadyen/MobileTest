

$('.flagpage').click(function(){
	//$('.content').load('./assets/ajax/countries.html');
	flags();
});

$('.out').click(function(){
	$('body').load('./assets/ajax/login.html');
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
		$('.'+name).append("<a><img src=./imgs/flags/"+imageName+" alt="+name+" title="+name+" width=\"120\" height=\"80\"></a>");
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


/*$(function(){
	$('body').load('./assets/ajax/login.html');
});*/

$('.flagpage').click(function(){
	$('.content').load('./assets/ajax/countries.html');
	flags();
});


/*******************************************************/
/* @flags adds flag img to <div class='[countryname]'>*/
/******************************************************/
function flags(){
	var flags = getFlags();

	for(var i = 0; i < flags.length; i++){
		var image = flags[i]["image"];
		var name = flags[i]["name"];
		var className = name + " flag span4";
		$('.flags').append('<div class='+className+' span4>');
		$('.'+name).append("<img src=./imgs/flags/"+image+" alt="+name+">");
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

/**********************************/
/**********************************/
/*Implement json checking in PHP!!*/
/**********************************/
/**********************************/
var currentUser = "no";	
console.log("INSIDE INDEX.JS");

$('.entrytext.log').click(function(){
	console.log("HERE");
	if($('.signin').is(':hidden')){
		$('.signin').slideDown("slow");
	}
	else{
		$('.signin').slideUp("slow");
	}
});
$('.entrytext.sign').click(function(){
	console.log("ANDHERE");
	if($('.signupform').is(':hidden')){
		$('.signupform').slideDown("slow");
	}
	else{
		$('.signupform').slideUp("slow");
	}
});
$('.signin').submit(function () {
	login();
        return false;
});

$('.signupform').submit(function(){
	signup();
	return false;
});

$('.signout').click(function(){
	$('.signout').css('display','none');
	$('.name').empty();
	$('.signin').show();
});

/*******************************************************/
/* @getUsers returns users obj from json obj           */
/******************************************************/
function getUsers(){
	var obj;
	$.ajax({url: "./users.json",
		async:false,
		dataType:"json",
		success:function(data){
			obj = data.users;
	}});
	return obj;
}
/************************************************************/
/* @checkUserPass returns true if username & password exist */
/************************************************************/		
function checkUserPass(username, password){
	var users = getUsers();
	for(var i = 0; i < users.length; i++){
		if(users[i]["username"] == username && users[i]["password"] == password)
			return true;
	}
	return false;
}
/*******************************************************/
/* @usernameExists returns true if username exists     */
/******************************************************/
function usernameExists(username){
	var users = getUsers();
	for(var i = 0; i < users.length; i++){
		var user = users[i];
		if(user["username"] == username)
			return true;
	}
	return false;
}

/*******************************************************/
/* @addToJSON  returns new JSON obj with new user added*/
/******************************************************/
function addToJSON(username, password){
	var obj = {"username":username,"password":password};
	var users = getUsers();
	users.push(obj);
	return users;
}

//check if user already exists
//check if the 2 passwords match
function signup(){
	var username = $('.signupform input[name=username]').val();
	var password = $('.signupform input[name=password]').val();
	var passagain = $('.signupform input[name=passwordagain]').val();
	var addNewUser = true;
	
	//checks if inputs are empty
	if(!username || !password || !passagain){
		if(!username){
			$('.signupform input[name=username]').val("Enter a username");
			$('.signupform input[name=username]').css('border-color','#FF0000');
		}
		if(!password){
			$('.signupform input[name=password]').css('border-color','#FF0000');
		}
		if(!passagain){
			$('.signupform input[name=passwordagain]').css('border-color','#FF0000');
		}
		addNewUser = false;
	}
	
	//checks if username is unique
	if(usernameExists(username)){
		//username already exists
		$('.errorusername').css("display","block");
		addNewUser = false;
	}
	else{
		$('.errorusername').css('display','none');
	}

	//checks if passwords match
	if(password != passagain){
		$('.errorpass').css("display",'block');
		$('.signupform input[name=passwordagain]').css('border-color','#FF0000');
		$('.signupform input[name=password]').css('border-color','#FF0000');
		addNewUser = false;
	}
	else{
		$('.errorpass').css('display','none');
	}

	//add username/password to users array
	if(addNewUser){
		var saveToFile = JSON.stringify(addToJSON(username,password));
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://www.michaelmcfadyen.com/saveToFile.php?q="+saveToFile, false);
		xhr.send();
		$('.signupform').css('display','none');
		$('.signup').append("Sign up Successful");
	}
	
	
}

function login(){
	var username = $('.signin input[name=username]').val();
	var password = $('.signin input[name=password]').val();
	if(!username || !password){
		if(!username){
			$('.signin input[name=username]').val("Please enter a username");
			$('.signin input[name=username]').css("border-color","#FF0000");
		}
		if(!password){
			$('.signin input[name=password]').css("border-color","#FF0000");
		}
		return;
	}
	if(checkUserPass(username, password)){
		$(".signin").css("display", "none");
		$(".incorrect").css("display","none");
		$(".name").append(username);
		currentUser = username;
		$('button').css('display','block');
		pageLoad(username);
		console.log("SUCCESS");
	}
	else{
		//username/password incorrect. Display error message
		$('.signin input[name=password]').val("");
		$('.signin input[name=username]').val("");
		$(".incorrect").css("display","block");

	}
}

function pageLoad(currentUser){
	$('body').load("./assets/ajax/home.html");
	$('.username').append(currentUser);
}

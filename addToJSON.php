<?php

/*TODO write overwrites file contents. FIXTHIS*/

//get the q parameter from URL
$q=$_GET["q"];
appendJSON($q);

function appendJSON($q){
	$username = substr($q,0,stripos($q,"<br>"));
	$q = substr($q, stripos($q, "<br>")+4);
	$password = $q;
	$json = file_get_contents("./users.json");
	$array = json_decode($json, true);
	$name["username"] = $username;
	$pass["password"] = $password;
	

	array_push($array['users'],$name,$pass);

	$result = file_put_contents("./users.json", json_encode($array));
	echo true;

}

?>

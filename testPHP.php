<?php
//get the q parameter from URL
$q=$_GET["q"];
if($q){
	userpass($q);
}

$checkuname = $_POST['user'];
if($checkuname){
	usernameexists($checkuname);
}


function userpass($q){
	$username = substr($q,0,stripos($q,"<br>"));
	$q = substr($q, stripos($q, "<br>")+4);
	$password = $q;

	$array = getJSON("./users.json");

	foreach($array['users'] as $user){
		if($user["username"] == $username && $user["password"] == $password){
			echo true;
			exit();
		}
	}
	echo false;
	exit();
}

function usernameexists($username){
	$array = getJSON("./users.json");

	foreach($array["users"] as $user){
		if($user['username'] == $username){
			echo true;
			exit();
		}
	}
	echo false;
	exit();	
}

function getJSON($file){
	$json = file_get_contents($file);
	$array = json_decode($json, true);
	return $array;
}

?>


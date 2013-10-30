<?php

$q=$_GET["q"];

file_put_contents("./users.json", "{\"users\":".$q."}");

?>

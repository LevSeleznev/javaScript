<?php
$strings = file('result.txt');
$results = array();
$position = 0;
for($i = 0; $i < count($strings); $i++)
{
	$string = explode('::', $strings[$i]);
	$arr['result'] = $string[0];
	$arr['name'] = $string[1];
	$results[] = $arr;
}
natsort($results);
echo json_encode($results);

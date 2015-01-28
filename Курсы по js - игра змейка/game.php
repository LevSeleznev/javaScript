<?php
	if(isset($_POST['name']) && isset($_POST['result']))
	{
		$name = $_POST['name'];
		$result = $_POST['result'];
	}
	
	if(($name != '') && ($result != ''))
	{
		$f = fopen('result.txt', 'a+');
		fwrite($f, $result . "::");
		fwrite($f, $name . "\n");
		fclose($f);
	}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html>
<head>
	<title>GAME</title>
	<link rel="stylesheet" href="style.css" type="text/css" media="screen" /> 	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script language="javascript" src="matrix.js"></script>
	<script language="javascript" src="snake.js"></script>
	<script language="javascript" src="smart_square.js"></script>
	<script language="javascript" src="barrier.js"></script>
	<script language="javascript" src="core.js"></script>
	<script language="javascript" src="jquery.js"></script>
	<script language="javascript" src="script.js"></script>
	<link type="text/css" href="css/ui-lightness/jquery-ui-1.10.4.custom.css" rel="Stylesheet" />	
	<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.10.4.custom.min.js"></script>
</head>
<body>
	<div id="matrix"></div>
	<div id="result">
		<h1>Уровень 1</h1>
		<p id="textResult"></p>
		<button value="start" id="start">Начать игру</button><br />
		<button value="get_result" id="get_result">Получить результаты</button>
		<p id="aresult">
		</p>
	</div>
	
	<div id="dialog">
		<form>
			<label for="name">Введите своё имя: </label>
			<input type="text" name="name" />
		</form>
	</div>
</body>
</html>

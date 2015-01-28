//
// Создание матрицы.
//
function createMatrix(rows, cols, containerId)
{
	this.containerId = containerId;
	this.rows = rows;
	this.cols = cols;
	this.matrix = $('#' + containerId);
	var that = this;
	var interval;
	var smartInterval;
	var fireInterval;
	var barrierInterval;
	this.name;
	
	this.setName = function(){
		if(that.name = prompt('Введите Ваше имя: '))
			(that.name == '') ? that.name = 'user' : that.name;
		else
			that.name = 'user';
	}
		
	this.create = function(){
		var n = that.rows * that.cols;	
		
		matrix.innerHtml = '';
		
		for (var i = 0; i < n; i++)
		{
			that.matrix.append('<div class="cell"></div>');
		}
	}
	
	
	//Создание фруктов
	this.setRandom = function(count){
		for(var i = 0; i <= count; i++){
			var randomRow = Math.floor(Math.random() * that.rows + 1);
			var randomCol = Math.floor(Math.random() * that.cols + 1);
			var background = Math.floor(Math.random() * 3 + 1);
			var id = (randomRow - 1) * that.cols + randomCol - 1;
			that.matrix.children('div:eq(' + id + ')').addClass('on').css('backgroundImage', 'url(img/' + background + '.jpg)');
		}
	}
	
	// Создание разных объектов, в зависимости от их класса;
	this.setCell = function(row, col, val, classObject)
	{
		// Функция принимает координаты ячейки
		// если val == true, закрашивает ячейку,
		// иначе убирает закраску.
		var num = (row - 1) * that.cols + col - 1;
		var matrixChild = that.matrix.children('div:eq(' + num + ')');
		var classObj;
		
		switch(classObject)
		{
			case 'active': //змейка
				classObj = 'active';
				break;
			case 'shot': //в меру умный квадрат 
				classObj = 'shot';
				break;
			case 'barrier': //глупые препятствия
				classObj = 'barrier';
				break;
			case 'smart': //в меру умный квадрат 
				classObj = 'smart';
				break;
			default:
				alert('Класс не передан');
				return;
		}
		
		(val) ? matrixChild.addClass(classObj) : matrixChild.removeClass(classObj);
	}
	
	
	
	this.result = 0;
	
	//Недоработанная функция, объекты реагируют только на змейку, друг с другом не взаимодействуют
	this.getSmartCell = function(row, col, elem)
	{
		var num = (row - 1) * that.cols + col - 1;
		var classObj = that.matrix.children('div:eq(' + num + ')').attr('class');
		if(elem == 'smart')
		{
			switch(classObj)
				{
					case 'cell active':
						alert('Вас съели');
						$.post("game.php", 
							{name: that.name, result: that.result},
							function(){
								location.reload();
							});	
						break;
				}
		}
		else if(elem == 'shot')
		{
			switch(classObj)
				{
					case 'cell active':
						alert('Вас застрелили');
						$.post("game.php", 
							{name: that.name, result: that.result},
							function(){
								location.reload();
							});		
						break;
				}
		}
		else if(elem == 'barrier')
		{
			switch(classObj)
				{
					case 'cell active':
						alert('Вас раздавило препятствие');
						$.post("game.php", 
							{name: that.name, result: that.result},
							function(){
								location.reload();
							});	
						break;
				}
		}
	}
	
	//Взаимодействие змейки с другими объектами
	this.getCell = function(row, col)
	{
		// Функция принимает координаты ячейки
		// должна вернуть true, если она закрашена,
		// false, если не закрашена.
		
		//var matrix = $('#' + containerId);
		$('#textResult').html(that.result);
		var num = (row - 1) * that.cols + col - 1;
		
		//Узнаём класс объекта
		var matrixChild = that.matrix.children('div:eq(' + num + ')').attr('class');
		
		switch(matrixChild)
		{
			case 'cell active':
				alert('Вы съели сами себя');
				$.post("game.php", 
					{name: that.name, result: that.result},
					function(){
						location.reload();
					});
				break;
			case 'cell on':
				that.result += 100;
				that.matrix.children('div:eq(' + num + ')').css('backgroundImage', 'none').removeClass('on');
				core.levelUp(that.result);
				return true;
			case 'cell barrier':
				alert('Вы наткнулись на препятствие');
				$.post("game.php", 
					{name: that.name, result: that.result},
					function(){
						location.reload();
					});	
				break;
			case 'cell smart':
				alert('Вас съели');
				$.post("game.php", 
					{name: that.name, result: that.result},
					function(){
						location.reload();
					});		
				break;
		}
						
	}
	
}
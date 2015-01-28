function Core()
{
	var interval;
	var smartInterval;
	var fireInterval;
	var barrierInterval;
	var that = this;
	/*Ядро игры, в котором выполняются все действия объектов, в классах объектов происходит только их создание*/
	
	/*Движение змейки*/
	this.snakeMove = function(){
		var pop;
		
		switch(snake.course){
			case 'left':
				snake.body.unshift(new Array(snake.body[0][0], snake.body[0][1] - 1));
				break;
			case 'up':
				snake.body.unshift(new Array(snake.body[0][0] - 1, snake.body[0][1]));
				break;
			case 'right':
				snake.body.unshift(new Array(snake.body[0][0], snake.body[0][1] + 1));
				break;
			case 'down':
				snake.body.unshift(new Array(snake.body[0][0] + 1, snake.body[0][1]));
				break;
		}

		if(!snake.eat){
			pop = snake.body.pop();
			matrix.setCell(pop[0], pop[1], false, 'active');
		}
		
		//Проверяем, не врезалась ли змейка в стену
		if(snake.body[0][0] == 0 || snake.body[0][1] == 0 || snake.body[0][0] == 21 || snake.body[0][1] == 21){
			that.interval(false, 1000);
			switch(snake.body[0][0])
			{
				case 0:
					snake.body[0][0] = 2;
					break;
				case 21:
					snake.body[0][0] = 20;
					break;
			}
			switch(snake.body[0][1])
			{
				case 0:
					snake.body[0][1] = 1;
					break;
				case 21:
					snake.body[0][1] = 20;
					break;
			}
			$.post("game.php", 
				{name: matrix.name, result: matrix.result},
				function(){
					alert('Вы наткнулись на препятствие');
					location.reload();
				});		
		}
		
		
		if(matrix.getCell(snake.body[0][0], snake.body[0][1], 'active')){
			snake.eat = true;
			matrix.setCell(snake.body[0][0], snake.body[0][1], false, 'active');
		}
		else{
			snake.eat = false;
		}
	
		matrix.setCell(snake.body[0][0], snake.body[0][1], true, 'active');
	}
	/*END*/
	
	/*Движение квадрата*/
	this.smartSquareMove = function()
	{
		smartSquare.SmartCourse();
		matrix.setCell(smartSquare.row, smartSquare.col, false, 'smart');
		switch(smartSquare.course){
			case 'left':
				smartSquare.col--;
				break;
			case 'up':
				smartSquare.row--;
				break;
			case 'right':
				smartSquare.col++;
				break;
			case 'down':
				smartSquare.row++;
				break;
		}
		
		if(smartSquare.col == 20){
			smartSquare.course = 'left';	
		}
		else if(smartSquare.col == 1){
			smartSquare.course = 'right';
		}
		else if(smartSquare.row == 1){
			smartSquare.course = 'down';
		}
		else if(smartSquare.col == 20){
			smartSquare.course = 'up';
		}
		
		matrix.getSmartCell(smartSquare.row, smartSquare.col, 'smart');
		matrix.setCell(smartSquare.row, smartSquare.col, true, 'smart');	
		smartSquare.snakeHead();
	}
	/*END*/
	
	
	/*Выстрел умного квадрата*/
	this.shot = function(row, col, course)
	{
		matrix.setCell(row, col, false, 'shot');
		switch(course)
		{
			case 'left':
				col--;
				break;
			case 'right':
				col++;
				break;
			case 'up':
				row--;
				break;
			case 'down':
				row++;
				break;
		}
		if(col == 0 || col == 21 || row == 0 || row == 21)
		{
			matrix.setCell(row, col, false, 'shot');
			clearTimeout(timeOut);
			return;
		}
		matrix.getSmartCell(row, col, 'shot');
		matrix.setCell(row, col, true, 'shot');	
		var timeOut = setTimeout(function(){that.shot(row, col, course)}, 1000);
	}
	/*END*/
	
	
	//Интервал для змейки
	this.interval = function(val, time)
	{
		(val) ? interval = setInterval(that.snakeMove, time) : clearInterval(interval);;		

	}
	
	//Интервал для стреляющего квадрата
	this.smartInterval = function(val, time){
		(val) ? smartInterval = setInterval(that.smartSquareMove, time) : clearInterval(smartInterval);
	}
	
	//Интервалы для барьеров
	var interval1;
	var interval2;
	var interval3;
	//Функция увеличения левела
	this.levelUp = function(result){
		switch(result){
			case 200:
				$('#result h1').html('Уровень 2');
				that.interval(false);
				that.interval(true, 400);
				barrier1.create();
				interval1 = setInterval(function(){barrier1.move()}, 1000);
				barrier2.create();
				interval2 = setInterval(function(){barrier2.move()}, 1000);
				barrier3.create();
				interval3 = setInterval(function(){barrier3.move()}, 1000);
				break;
			case 400:
				$('#result h1').html('Уровень 3');
				that.interval(false);
				that.interval(true, 300);
				clearInterval(interval1);
				clearInterval(interval2);
				clearInterval(interval3);
				smartSquare.create();
				smartInterval = that.smartInterval(true, 800);
				break;
			case 600:
				$('#result h1').html('Уровень 4');
				that.interval(false);
				that.interval(true, 200);
				matrix.setRandom(4);
				interval1 = setInterval(function(){barrier1.move('left')}, 1000);
				interval2 = setInterval(function(){barrier2.move('up')}, 1000);
				interval3 = setInterval(function(){barrier3.move('down')}, 1000);
				break;
			case 1000:
				$('#result h1').html('Вы победили');
				that.interval(false);
				clearInterval(interval1);
				clearInterval(interval2);
				clearInterval(interval3);
				$.post("game.php", 
					{name: that.name, result: that.result},
					function(){
						alert('Вы победили');
						location.reload();
					}, 'json');	
				break;
		}
	}
}
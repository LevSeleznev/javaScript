function SmartSquare(row, col, course)
{
	this.row = row;
	this.col = col;
	this.course = course
	var that = this;
	this.matrix = $('#matrix');
	
	
	this.create = function(){
		var num = (that.row - 1) * 20 + that.col - 1;
		matrix.setCell(that.row, that.col, true, 'smart');
	}
	
	//Выбор курса
	this.SmartCourse = function(){
		switch(snake.course){
			case 'left':
				if(snake.body[0][1] > that.col)
					that.course = 'right';
				else
					that.course = 'left';
				break;
			case 'right':
				if(snake.body[0][1] > that.col)
					that.course = 'right';
				else
					that.course = 'left';
				break;
			case 'up':
				if(snake.body[0][0] > that.row)
					that.course = 'down';
				else
					that.course = 'up';
				break;
			case 'down':
				if(snake.body[0][0] > that.row)
					that.course = 'down';
				else
					that.course = 'up';
				break;
		}
	}
	
	//Отслеживание головы змейки
	this.snakeHead = function()
	{
		if(snake.body[0][0] < that.row && that.col == snake.body[0][1]){
			core.shot(that.row, that.col, 'up');
		}
		else if(snake.body[0][0] > that.row && that.col == snake.body[0][1]){
			core.shot(that.row, that.col, 'down');
		}
		else if(snake.body[0][0] == that.row && that.col > snake.body[0][1]){
			core.shot(that.row, that.col, 'left');
		}
		else if(snake.body[0][0] == that.row && that.col < snake.body[0][1]){
			core.shot(that.row, that.col, 'right');
		}
		else{
			return;
		}
	}
}
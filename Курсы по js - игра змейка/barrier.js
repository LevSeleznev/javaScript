function Barrier(row, col, course)
{
	this.row = row;
	this.col = col;
	this.course = course;
	var that = this;
	this.create = function()
	{
		matrix.setCell(that.row, that.col, true, 'barrier');
	}
	this.move = function()
	{
		matrix.setCell(that.row, that.col, false, 'barrier');
		switch(that.course){
			case 'left':
				that.col--;
				break;
			case 'up':
				that.row--;
				break;
			case 'right':
				that.col++;
				break;
			case 'down':
				that.row++;
				break;
		}
		if(that.col == 20){
			that.course = 'left';
		}
		else if(that.col == 1){
			that.course = 'right';
		}
		else if(that.row == 1){
			that.course = 'down';
		}
		else if(that.col == 20){
			that.course = 'up';
		}
		matrix.getSmartCell(that.row, that.col, 'barrier');
		matrix.setCell(that.row, that.col, true, 'barrier');
	}
}
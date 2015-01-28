function Snake(row, col, course){
	this.body = [[row, col],[row, col - 1],[row, col - 2]];
	this.course = course;
	var that = this;
	this.result = 0;
	this.create = function(){
		matrix.setCell(that.body[0][0], that.body[0][1], true, 'active');
		matrix.setCell(that.body[1][0], that.body[1][1], true, 'active');
		matrix.setCell(that.body[2][0], that.body[2][1], true, 'active');
	}
	
	this.eat = false;
	var newCourse = this.course;
}	

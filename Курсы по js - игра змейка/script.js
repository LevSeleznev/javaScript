//
// Точка входа.
//
$(document).ready(function()
{
	//Создание матрицы
	matrix = new createMatrix(20, 20, 'matrix');
	matrix.create();
	
	//Создание ядра
	core = new Core;
	
	//Узнаём имя пользователя
	//matrix.setName();
	
	//Создание фруктов
	matrix.setRandom(10);
	
	//Создание змейки
	snake = new Snake(1, 5, 'right');
	snake.create();
	
	$('#start').removeAttr('disabled');
	
	$('#dialog').dialog({autoOpen: false, 
		buttons:[{text: 'OK', click: function(){
			core.interval(true, 500);
			$('#start').attr('disabled', "disabled");
			matrix.name = $('#name').val();
			$(this).dialog("close");
		}}]
		
		});
	
	//Запуск змейки
	$('#start').on('click', function(){
		$('#dialog').dialog("open");
		
	});
	
	//Создание барьеров
	barrier1 = new Barrier(10, 6, 'left');
	barrier2 = new Barrier(12, 4, 'up');
	barrier3 = new Barrier(13, 15, 'right');
	
	//Создание умного квадратика
	smartSquare = new SmartSquare(6, 7, 'right');
	
	$('#get_result').on('click', function(){
		var sum = 0;
		$.getJSON('load.php', function(json){
			$('#aresult').empty();
			var num = 0;
			$.each(json, function(index){
				var res = json[index]['result'];
				var info = 'Результат: ' + json[index]['result'] + ' - <b>' + json[index]['name'] + '</b><br />';
				$('#aresult').append(info);
			});
		});
	});
	
	$('input').change(function(){
		var val = $(this).val();
		$.post('load.php',{change: val}, function(){
			$('#aresult').load('change.php');
		});
	})
	
	//$('#form')
	
	//Обработка нажатия клавиш для управления змейкой
	$(document).on('keydown', function(e){
		var event = e || window.event;
		var keyCode = event.keyCode || event.which;
		
		switch(keyCode)
		{
			case 37:
				if(snake.course == 'right')
					return;
				snake.course = 'left';
				break;
			case 38:
				if(snake.course == 'down')
					return;
				snake.course = 'up';
				break;
			case 39:
				if(snake.course == 'left')
					return;
				snake.course = 'right';
				break;
			case 40:
				if(snake.course == 'up')
					return;
				snake.course = 'down';
				break;
		}
		
	});
});

	

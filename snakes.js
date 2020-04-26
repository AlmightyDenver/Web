
	//1 : Snake 2 : Apple
	var cvs = document.getElementById('canvas');
	var ctx = cvs.getContext('2d');


	var map = new Array(30);
	for(var i = 0; i<map.length; i++)
	{
		map[i] = new Array(30);
	}
	var snake = new Array(3);
	
	var dir = 'right'
	var playing = true;
	var x_apple = 0;
	var y_apple = 0;
	
	var score = 0;
	var lv = 0;
	var interval = 300;

	
	window.onload = function()
    {
		map = new Array(30);
		for(var i = 0; i<map.length; i++)
		{
			map[i] = new Array(30);
		}
                my_init_Game();
                my_start_Game();
				load_ranking();
                window.addEventListener('keydown',keyDownEvent);
    }

	function my_init_Game()
	{
		//========================  Init snake & apple position  =============================

		var x_snake = Math.round(Math.random() * 29)-5;
		var y_snake = Math.round(Math.random() * 29);
		
		for(var i = 0; i<snake.length; i++){
			snake[i] = {
				x : x_snake -i,
				y : y_snake
			};
			map[x_snake - i][y_snake] = '1';
		}
		
		
		my_create_Apple();



		
	}
	
	
	
	function my_start_Game(){
		ctx.clearRect(0,0,600,600);
		
		//=================================  Move   ====================================
		for (i = snake.length - 1; i >= 0; i--) {
			//============= Snake head =============//
			if (i == 0) {
				switch (dir) {
					case 'right':
						if (dir != 'left')
						{
						snake[0] = { x: snake[0].x + 1, y: snake[0].y }
						break;
						}
					case 'left':
						if (dir != 'right')
						{
						snake[0] = { x: snake[0].x - 1, y: snake[0].y }
						break;
						}
					case 'up':
						if (dir != 'down')
						{
						snake[0] = { x: snake[0].x, y: snake[0].y - 1 }
						break;
						}
					case 'down':
						if (dir != 'up')
						{
						snake[0] = { x: snake[0].x, y: snake[0].y + 1 }
						break;
						}
				}
				
				//Game over
				//	when the head goes out of range
				if(snake[0].x < 0 || snake[0].y < 0 || snake[0].x >= 30 || snake[0].y >= 30){
					my_end_Game();
					return;
				}
				
				//	when snake overlaps with its body
				if(map[snake[0].x][snake[0].y] == '1')
				{
					my_end_Game();
					return;
				}
				
				//when ate apple
				else if(map[snake[0].x][snake[0].y] == '2')
				{
					score += 10;
					lv++;
					if (lv < 3) interval -= 80;
					else if (lv < 5) interval -= (50 - (lv * 3));
					else if (lv < 9 && lv%2 == 0) interval -= (50 - (lv * 8));
					else if (lv < 15 && lv%3 == 0) interval -= (10 - lv);
					else if (lv < 20 && lv % 2 == 0) interval -= 3;
					else if (lv >= 20 && lv % 4 == 0) interval -= 2;
					
					map[x_apple][y_apple] = null;
					my_create_Apple();
					snake.push({
						x: snake[snake.length-1].x,
						y: snake[snake.length-1].y
					});
					map[snake[snake.length-1].x][snake[snake.length-1].y]  ='1';
				}
				
				map[snake[0].x][snake[0].y] = '1';
			}
			
			//============= Snake body =============//
			else {
				//erase tail
				if(i==(snake.length-1)){
					map[snake[i].x][snake[i].y]=null;
				}
				
				//move to front loc
				snake[i]={
					x: snake[i-1].x,
					y: snake[i-1].y
				};
				map[snake[i].x][snake[i].y] = '1';
			}
		}	
		
		//=================================  Draw Snake & Apple   ====================================
		for(var x = 0; x<map.length; x++){
			for(var y = 0; y<map[0].length; y++){
				if(map[x][y] == '1')
				{
					ctx.fillStyle = 'green';
					ctx.fillRect(x*20, y*20, 20, 20);
				}
				else if(map[x][y] == '2')
				{
					ctx.fillStyle = 'red';
					ctx.fillRect(x*20, y*20, 20, 20);
				}
			}
		}

		
		
		if(playing){
			
			setTimeout(my_start_Game, interval);
		}	
		
	}
	
	
	
	
	function my_create_Apple()
	{
		x_apple = Math.floor(Math.random() * 30);
		y_apple = Math.floor(Math.random()* 30) ;
		
		for(i = 0; i<snake.length; i++){
			if(x_apple == snake[i].x && y_apple == snake[i].y){
				my_create_Apple();
				break;
			}
		}
		map[x_apple][y_apple] = '2';
	}
	

	
	
function my_end_Game()
			{
				playing = false;
				save_ranking();
				
			
			}
			

		
	
	
	function keyDownEvent(e) 
	{
		if (e.keyCode == 37 && dir != 'right') 
		{
			dir = 'left';
		}
		else if (e.keyCode == 38 && dir != 'down')
		{
			dir = 'up';
		}
		else if (e.keyCode == 39 && dir != 'left') {
			dir = 'right';
		}
		else if (e.keyCode == 40 && dir != 'up')
		{
			dir = 'down';
		}
	}
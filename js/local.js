function Local(){
	var button1=document.getElementById('btn1');
	var button2=document.getElementById('btn2');
	var timer=null;
	var timeCount=0;
	var time=0;
	//游戏对象
	var game;
	//绑定键盘事件
	var bindKeyEvent=function(){
		document.onkeydown=function(e){
			if(e.keyCode==37){//left
				game.left();
			}else if(e.keyCode==39){//right
				game.right();
			}else if(e.keyCode==40){//down
				game.down();
			}else if(e.keyCode==32){//space
				e.preventDefault();
				game.fall();
			}else if(e.keyCode==38){//旋转
				game.rotate();
			}else if(e.keyCode==113){
				pause();
			}
		}
	}

	var unbindKeyEvent=function(){
			document.onkeydown=function(e){
				if(e.keyCode==37){//left
				
				}else if(e.keyCode==39){//right
				
				}else if(e.keyCode==40){//down
				
				}else if(e.keyCode==32){//space
					e.preventDefault();
				
				}else if(e.keyCode==38){//旋转
					
				}else if(e.keyCode==113){
					
				}
			}
		}

	var listenClick=function(doms){
		button1.onclick=function(){
			clearInterval(timer);
			startmove();
		}
		button2.onclick=function(){
			pause();
		}
		$('.gameover button').on('click',function(){
			restart();
		})
		$('button').on('mouseenter',function(){
			$('.hover').get(0).play();
		})

	}

	//重新开始
	var restart=function(){
		start();
		timeCount=0;
		time=0;
		$('#score').text('0');
		$('#time').text('0');
		$('#result').text('');
		$('.gameover').hide();
	}

	//移动
	
	var move=function(){
		timeFunc();
		if(!game.down()){
			game.fixed();
			var line=game.checkClear();
			if(line){
				game.addScore(line);
			}
			if(game.checkGameover()){
				game.gameover(false);
				$(".over").get(0).play();
				pause();
			}else{
				game.createNext(generateType(),generateDir());
			}
		}
	}

	//计时函数
	var timeFunc=function(){
		timeCount++;
		if(timeCount==2){
			timeCount=0;
			time++;
			game.setTime(time);
		}
	}

	//随机生成方块种类
	var generateType=function(){
		return Math.floor(Math.random()*7+1);
	}
	//随机生成方块方向
	var generateDir=function(){
		return Math.floor(Math.random()*4)
	}
	//暂停
	var pause=function(){
		clearInterval(timer);
		timer=null;
		unbindKeyEvent();
		$(".background").get(0).pause();
	}
	var listen;
	//开始移动
	var startmove=function(){
		timer=setInterval(move,500)
		bindKeyEvent();
		$(".background").get(0).play();
	}

	//开始
	var start=function(){
		var doms={
			gameDiv:document.getElementById('game'),
			nextDiv:document.getElementById('next'),
			timeDiv:document.getElementById('time'),
			scoreDiv:document.getElementById('score'),
			resultDiv:document.getElementById('result')
		}
		game=new Game();
		game.init(doms,generateType(),generateDir());
		game.createNext(generateType(),generateDir());
		
		listenClick();
	}
	//导出API
	this.start=start;
}
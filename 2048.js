var game={
	data:null,
	RN:4,
	CN:4,
	start(){
		//游戏启动
		this.data = [];
		for(var r=0;r<this.RN;r++){
			this.data[r]=[];
			for(var c=0;c<this.CN;c++){
				this.data[r][c]=0;
			}
		}
		this.randomNum();
		this.randomNum();
		this.updataView();
		//console.log(this.data.join("\n"));
		document.onkeydown = function(e){
			switch(e.keyCode){
				case 37:
					this.moveLeft();
					break;
				case 38:
					this.moveTop();
					break;
				case 39:
					this.moveRight();
					break;
				case 40:
					this.moveBottom();
					break;
			}
		}.bind(this);

		document.ontouchstart = function(e1){
			var startX = e1.touches[0].pageX;
			var startY = e1.touches[0].pageY;
			var throttle;
			document.ontouchmove = function(e2){
				if(throttle){
					window.clearTimeout(throttle);
					throttle = setTimeout(this.touchMove.bind(this,e2,startX,startY),100);
				}else{
					throttle = setTimeout(this.touchMove.bind(this,e2,startX,startY),100);
				}
			}.bind(this);
		}.bind(this);
 	},
 	touchMove(e2,startX,startY){
 		var endX = e2.touches[0].pageX;
 		var endY = e2.touches[0].pageY;
 		var moveX ={};
 		var moveY ={};
 		if(endX>startX){
 			moveX.a = endX - startX;
 			moveX.dir = this.moveRight.bind(this);
 		}else{
 			moveX.a = startX - endX;
 			moveX.dir = this.moveLeft.bind(this);
 		}
 		if(endY>startY){
 			moveY.a = endY - startY;
 			moveY.dir = this.moveBottom.bind(this);
 		}else{
 			moveY.a = startY - endY;
 			moveY.dir = this.moveTop.bind(this);
 		}
 		if(moveX.a>moveY.a){
 			moveX.dir()
 		}else{
 			moveY.dir()
 		}
 		//console.log(moveX,moveY)
 	},
 	updataView(){
 		for(var r=0;r<this.RN;r++){
 			for(var c=0;c<this.CN;c++){
 				var n = this.data[r][c];
 				var div = document.getElementById("c"+r+c);
 				if(n!=0){
 					div.innerHTML = n;
 					div.className = "cell n" + n;
 				}else{
 					div.innerHTML = "";
 					div.className = "cell";
 				}
 			}
 		}
 	},
 	randomNum(){
 		/*var r = Math.floor(Math.random()*this.RN);
 		var c = Math.floor(Math.random()*this.CN);
 		if(this.data[r][c]==0){
 			if(Math.random()<0.5){
 				this.data[r][c] = 2;
 			}else{
 				this.data[r][c] = 4;
 			}
 		}else{
 			arguments.callee();//严格模式不推荐使用
 		}*/
 		while(true){
 			var r = Math.floor(Math.random()*this.RN);
	 		var c = Math.floor(Math.random()*this.CN);
	 		if(this.data[r][c]==0){
	 			if(Math.random()<0.5){
	 				this.data[r][c] = 2;
	 			}else{
	 				this.data[r][c] = 4;
	 			}
	 			break;
	 		}
 		}
 	},
 	moveLeft(){
 		var before = this.data.toString();
 		for(var r=0;r<this.RN;r++){
 			this.moveLeftInRow(r);
 		}
 		var after = this.data.toString();
 		if(before!=after){
 			this.randomNum();
 		}

 		this.updataView();
  	},
  	moveRight(){
 		var before = this.data.toString();
 		for(var r=0;r<this.RN;r++){
 			this.moveRightInRow(r);
 		}
 		var after = this.data.toString();
 		if(before!=after){
 			this.randomNum();
 		}

 		this.updataView();
  	},
 	moveLeftInRow(r){
 		for(var c=0;c<this.CN-1;c++){
 			var nextc = this.getNextInRow(r,c+1);
 			if(nextc==-1){break;}
 			if(this.data[r][c]==0){
 				this.data[r][c]=this.data[r][nextc];
 				this.data[r][nextc]=0;
 				c--;
 			}else if(this.data[r][c]==this.data[r][nextc]){
 				this.data[r][c] *= 2;
 				this.data[r][nextc] = 0;
 			}
 		}
 	},
 	moveRightInRow(r){
 		for(var c=this.CN-1;c>0;c--){
 			var prevc = this.getPrevInRow(r,c-1);
 			if(prevc==-1){break;}
 			if(this.data[r][c]==0){
 				this.data[r][c]=this.data[r][prevc];
 				this.data[r][prevc]=0;
 				c++;
 			}else if(this.data[r][c]==this.data[r][prevc]){
 				this.data[r][c] *= 2;
 				this.data[r][prevc] = 0;
 			}
 		}
 	},
 	getNextInRow(r,c){
 		var row = this.data[r];
 		for(c;c<this.CN;c++){
 			if(row[c]!=0){
 				return c;
 			}
 		}
 		return -1;
 	},
 	getPrevInRow(r,c){
 		var row = this.data[r];
 		for(c;c>=0;c--){
 			if(row[c]!=0){
 				return c;
 			}
 		}
 		return -1;
 	},
 	moveTop(){
 		var before = this.data.toString();
 		for(var c=0;c<this.RN;c++){
 			this.moveTopInColumn(c);
 		}
 		var after = this.data.toString();
 		if(before!=after){
 			this.randomNum();
 		}

 		this.updataView();
  	},
  	moveTopInColumn(c){
 		for(var r=0;r<this.RN-1;r++){
 			var nextr = this.getNextInColumn(c,r+1);
 			if(nextr==-1){break;}
 			if(this.data[r][c]==0){
 				this.data[r][c]=this.data[nextr][c];
 				this.data[nextr][c]=0;
 				r--;
 			}else if(this.data[r][c]==this.data[nextr][c]){
 				this.data[r][c] *= 2;
 				this.data[nextr][c] = 0;
 			}
 		}
 	},
 	getNextInColumn(c,r){
 		for(r;r<this.RN;r++){
 			if(this.data[r][c]!=0){
 				return r;
 			}
 		}
 		return -1;
 	},
 	moveBottom(){
 		var before = this.data.toString();
 		for(var c=0;c<this.RN;c++){
 			this.moveBottomInColumn(c);
 		}
 		var after = this.data.toString();
 		if(before!=after){
 			this.randomNum();
 		}

 		this.updataView();
  	},
  	moveBottomInColumn(c){
 		for(var r=this.RN-1;r>0;r--){
 			var prevr = this.getPrevInColumn(c,r-1);
 			if(prevr==-1){break;}
 			if(this.data[r][c]==0){
 				this.data[r][c]=this.data[prevr][c];
 				this.data[prevr][c]=0;
 				r++;
 			}else if(this.data[r][c]==this.data[prevr][c]){
 				this.data[r][c] *= 2;
 				this.data[prevr][c] = 0;
 			}
 		}
 	},
 	getPrevInColumn(c,r){
 		for(r;r>=0;r--){
 			if(this.data[r][c]!=0){
 				return r;
 			}
 		}
 		return -1;
 	},
}
game.start();
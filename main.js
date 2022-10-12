    const canvas = document.getElementById('myCan');
    //    //getting canvas as 2D to paint it
    //    //line via line
         const ctx = canvas.getContext("2d"); 
        
    //     // ctx.beginPath();
    //     // ctx.rect(40,40,50,50); //rect takes x:y axis for postion 
    //     //                        //and l:b for size as arguments
    //     // ctx.fillStyle = "#FF0000";
    //     // ctx.fill();
    //     // ctx.closePath();
        
    //     // Code for circle paint

    //     // ctx.beginPath();
    //     // ctx.arc(240,160,100,0,Math.PI*2,false);
    //     // // ctx.fillStyle = "#000000";
    //     // // ctx.fill();
    //     // ctx.strokeStyle = "#000000";
    //     // ctx.stroke();
    //     // ctx.closePath();

        let x = canvas.width/2;
        let y = canvas.height-30;
        let dx = 2;
        let dy = -2;
        
        
        
        
        const ballRadius = 10;
        

        // Paddle 

        // for paddle draw
        const paddleHeight = 10;
        const paddleWidth = 75;
        // paddle location
        let paddleX = (canvas.width - paddleWidth)/2; 
        let rightPress = false;
        let leftPress =  false;

        // bricks frame

        const brickRowCount = 3;

        const brickColumnCount = 5;
        const brickWidth = 75;
        const brickHeight = 20;
        const brickPadding =  10;
        const brickOffsetTop = 30;
        const brickOffsetLeft = 30;

        let score = 0;
        let lives = 3;

        //declaring bricks
        const bricks = [];
        for(let c = 0; c < brickColumnCount;c++){
            bricks[c] = [];
            for(let r = 0 ; r < brickRowCount;r++){
                bricks[c][r] = { x:0,y:0,status:1};
            }
        }

    
        //key controls
        document.addEventListener("keydown",keyDownHandler,false);
        document.addEventListener("keyup",keyUpHandler,false);
        
        //mouse controls

        document.addEventListener("mousemove",mouseMoveHandler,false);

        function keyDownHandler(e){
        if(e.key === "Right" || e.key === "ArrowRight"){
            rightPress = true;}
         else if(e.key === "Left" || e.key === "ArrowLeft"){
            leftPress = true;}
        }

        function keyUpHandler(e){
        if(e.key === "Right" || e.key === "ArrowRight"){
            rightPress = false;}
         else if(e.key === "Left" || e.key === "ArrowLeft"){
            leftPress = false;}
        }

        function mouseMoveHandler(e){
            const relativeX = e.clientX - canvas.offsetLeft;
            if(relativeX > 0 && relativeX < canvas.width){
                paddleX = relativeX - paddleWidth/2;
            }
        }
        //collision detection for bricks
        function collisionDetection(){
            for(let c = 0 ; c < brickColumnCount;c++){
                for(let r = 0 ; r < brickRowCount;r++){
                    const b = bricks[c][r];
                    if(x > b.x && x < b.x+brickWidth
                     && y > b.y && y < b.y+brickHeight){
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score === brickColumnCount * brickRowCount){
                            alert("YOU ARE A PRO!");
                            document.location.reload();
                            clearInterval(interval);
                        }
                     }
                }
            }
        }

        //All drawings
        //Ball
        function drawBall(){
        ctx.beginPath();
        ctx.arc(x,y,ballRadius,0,Math.PI*2,false);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
        }

        function drawPaddle(){
            ctx.beginPath();
            ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks(){
            for(let c = 0 ; c < brickColumnCount;c++){
                for(let r = 0 ; r < brickRowCount;r++){
                    if(bricks[c][r].status === 1){
                    const brickX = (c*( brickWidth+brickPadding)) + brickOffsetLeft;
                    const brickY = (r*(brickWidth+brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX,brickY,brickWidth,brickHeight);
                    ctx.fillStyle = "#ffffff";
                    ctx.fill();
                    ctx.closePath();
                    }
                }
            }
        }

        function drawScore(){
            ctx.font = "16px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`Score: ${score}`,8,20) //drawing text area
        }
        function drawLives(){
            ctx.font = "16px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`Lives: ${lives}`,canvas.width-65,20);
        }
        function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        //simple collision detection for ball with wall
        if(x+dx > canvas.width-ballRadius || x+dx  < ballRadius){
            dx = -dx;
        }
        if( y+dy < ballRadius){
            dy = -dy;
        } else if(y+ dy > canvas.height-ballRadius){
            if(x > paddleX && x < paddleX + paddleWidth){
                dy = -dy;
            } else{
            lives--;
            if(!lives){
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);}
            else{
                //place it in inital position
                x =  canvas.width/2;
                y = canvas.height -30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }

    }  
        //move paddle
        if(rightPress){
            paddleX = Math.min(paddleX+7,canvas.width-paddleWidth);
        } else if(leftPress){
            paddleX = Math.max(paddleX-7,0);
        }
         
        //changing position
        x +=dx;
        y +=dy;
        requestAnimationFrame(draw);
    }
//key allocation
//  const interval = setInterval(draw,10);
draw();
// Canvas and context
let c = document.querySelector(`#pong`)
let ctx = c.getContext(`2d`)

// Timer to make the game run at 60fps
let timer = setInterval(main, 1000/60)

// Global friction variable
let fy = .97

// Player 1 (p1) setup
let p1 = new Box();
p1.w = 20
p1.h = 150
p1.x = 0 + p1.w/2
//flip the side of p2 to the right side of the canvas
let p2 = new Box();
p2.w = 20
p2.h = 150
p2.x = c.width - p2.w/2
p2.y = c.height/2
p2.color = `lightblue`



// Ball setup
let ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`


//scoreboard setup
let score1 = 0
let score2 = 0


function main()
{
    // Erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    // p1 accelerates when key is pressed 
    if(keys[`w`])
    {
       p1.vy += -p1.force
    }

    if(keys[`s`])
    {
        p1.vy += p1.force
    }
    
    if(keys[`ArrowUp`])
    {
        p2.vy += -p2.force
    }

    if(keys[`ArrowDown`])
    {
        p2.vy += p2.force
    }

    // Applies friction
    p1.vy *= fy
    p2.vy *= fy
    // Player movement
    p1.move();
    p2.move();

    // Ball movement
    ball.move()

    // p1 collision
    if (p1.y < 0+p1.h/2)
    {
        p1.y = 0+p1.h/2
    }
    if (p1.y > c.height-p1.h/2)
    {
        p1.y = c.height-p1.h/2
    }

    // p2 collision
    if (p2.y < 0+p2.h/2)
    {
        p2.y = 0+p2.h/2
    }
    if (p2.y > c.height-p2.h/2)
    {
        p2.y = c.height-p2.h/2
    }


    // Ball collision 
    if (ball.x < 0)
    {
        ball.x = c.width/2
        ball.y = c.height/2
        ball.vx = 2
        ball.vy = 2
        score2++
    }
    if (ball.x > c.width)
    {
        ball.x = c.width/2
        ball.y = c.height/2
        ball.vx = -2
        ball.vy = -2
        score1++
    }
    if (ball.y < 0)
    {
        ball.y = 0
        ball.vy = -ball.vy * 1.5
    }
    if (ball.y > c.height)
    {
        ball.y = c.height
        ball.vy = -ball.vy * 1.5
    }

    // p1 with ball collision
    if (ball.collide(p1))
    {
        ball.x = p1.x + p1.w/2 + ball.w/2
        ball.vx = -ball.vx * 1.5
    }

    // p2 with ball collision
    if (ball.collide(p2))
    {
        ball.x = p2.x - p2.w/2 - ball.w/2
        ball.vx = -ball.vx * 1.5
    }

    // Draw the objects
    p1.draw()
    p2.draw()
    ball.draw()
    // Draw the scoreboard
    ctx.fillStyle = `black`
    ctx.font = `30px Arial`
    ctx.fillText(score1, c.width/4, 50)
    ctx.fillText(score2, 3*c.width/4, 50)
    ctx.fillText(`Scoreboard`, c.width/2 - 80, 50)
}


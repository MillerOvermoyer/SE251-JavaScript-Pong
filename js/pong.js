// Canvas and context
let c = document.querySelector(`#pong`)
let ctx = c.getContext(`2d`)

// Timer to make the game run at 60fps
let timer = setInterval(main, 1000/60)

// Global friction variable
let fy = .97

let players = []
let paddle1 = new Box()
let paddle2 = new Box()

scoreboardScores = document.querySelectorAll(`#Score div`)

paddle1.w = 20
paddle1.h = 150
paddle1.x = paddle1.w/2
paddle1.y = c.height/2
paddle1.color = `lightred`

paddle2.w = 20
paddle2.h = 150
paddle2.x = c.width - paddle2.w/2
paddle2.y = c.height/2
paddle2.color = `lightblue`

let player1 = new Player('Player 1', paddle1)
let player2 = new Player('Player 2', paddle2)

players[0] = player1
players[1] = player2


let pads = []

pads[0] = players[0].pad;
pads[1] = players[1].pad;

//Player 1 (p1) setup

//flip the side of p2 to the right side of the canvas


players[0].pad = pads[0]
players[1].pad = pads[1]
// Ball setup
let ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`


//scoreboard setup
players[0].score = 0
players[1].score = 0


function main()
{
    // Erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    
    // p1 accelerates when key is pressed 
    if(keys[`w`])
    {
       pads[0].vy += -pads[0].force
    }

    if(keys[`s`])
    {
        pads[0].vy += pads[0].force
    }
    
    if(keys[`ArrowUp`])
    {
        pads[1].vy += -pads[1].force
    }

    if(keys[`ArrowDown`])
    {
        pads[1].vy += pads[1].force
    }

    for (let i = 0; i < pads.length; i++){
        pads[i].vy *= fy
        
        pads[i].move()
        // pads collision with top and bottom of canvas
        if (pads[i].y > c.height-pads[i].h/2)
        {
            pads[i].y = c.height-pads[i].h/2
        }
        if (pads[i].y < 0+pads[i].h/2)
        {
            pads[i].y = 0+pads[i].h/2
        }
    }

    // Ball movement
    ball.move()

    
    // Ball collision 
    if (ball.x < 0)
    {
        ball.x = c.width/2
        ball.y = c.height/2
        ball.vx = 2
        ball.vy = 2
        players[1].score++
    }
    if (ball.x > c.width)
    {
        ball.x = c.width/2
        ball.y = c.height/2
        ball.vx = -2
        ball.vy = -2
        players[0].score++
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

    for (let i = 0; i < pads.length; i++){
        if (ball.collide(pads[i]))
        {
            ball.vx = -ball.vx * 1.5
            ball.vy = -ball.vy * 1.5
        }

    }
    

    for (let i = 0; i < players.length; i++)
    {
        if(players[i].score > players[i].highscore)
        {
            players[i].highscore = players[i].score
        }
    }
    // for (let i = 0; i < players.length; i++)
    // {
    //     scoreboardScores[i].innerHTML = players[i].name + `: ` + players[i].score;
    // }

    // Draw the objects
    for (let i = 0; i < pads.length; i++){
        pads[i].draw()
    }
    ball.draw()
    // Draw the scoreboard
    ctx.fillStyle = `black`
    ctx.font = `30px Arial`
    ctx.fillText(players[0].score, c.width/4, 50)
    ctx.fillText(players[1].score, 3*c.width/4, 50)
    ctx.fillText(`Scoreboard`, c.width/2 - 80, 50)
    console.log(players)
    console.log(pads)
    console.log(players[0].score + " | " + players[1].score)
}


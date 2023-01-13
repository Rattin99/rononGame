

kaboom({
    global: true,
    scale:1,
    debug: true,
    clearColor: [0,0,0,1],
    orientation: true,
})

loadSprite("pc","sprites/Cam.png")

function spawnObs(score, time) {

    if(score < 100 && time % 300 === 0){
        add([
            rect(48,rand(24,64)),
            area(),
            outline(4),
            pos(width(),height() - 48),
            origin("botleft"),
            move(LEFT,240),
            color(255,180,255),
            "obs",
            cleanup()
        ])
    }

    if(score < 300 && score > 100 && time % 200 === 0){
        add([
            rect(48,rand(24,64)),
            area(),
            outline(4),
            pos(width(),height() - 48),
            origin("botleft"),
            move(LEFT,240),
            color(255,180,255),
            "obs",
            cleanup()
        ])
    }

    if(score < 500 && score > 300 && time % 100 === 0){
         add([
            rect(48,rand(24,64)),
            area(),
            outline(4),
            pos(width(),height() - 48),
            origin("botleft"),
            move(LEFT,240),
            color(255,180,255),
            "obs",
            cleanup()
        ])
    }

    if(score > 500 && time % 50 === 0) {
        add([
            rect(48,rand(24,64)),
            area(),
            outline(4),
            pos(width(),height() - 48),
            origin("botleft"),
            move(LEFT,240),
            color(255,180,255),
            "obs",
            cleanup()
        ])
    }

   
}

scene("game",()=> {

const pc = add([
    sprite("pc"),
    pos(300,300),
    scale(0.03),
    color(0,0,255),
    area(),
    body()
])


onKeyPress("space", () => {
    if(pc.isGrounded()){
        pc.jump();
    }
})

add([
    rect(width(),48),
    pos(0,height() - 48),
    outline(4),
    area(),
    solid(),
    color(127,200,255)
])

pc.onCollide("obs",() => {
    addKaboom(pc.pos);
    shake();
    go("lose")    
})

let score = 0;
let time = 0;
const scoreLabel = add([
    text(score),
    pos(24,24)
])

onUpdate(()=>{
    score += 0.1;
    time++;
    const score_floor = Math.floor(score);
    scoreLabel.text = score_floor;

    spawnObs(score_floor,time)
})



})

scene("lose",()=> {
    add([
        text("Game Over"),
        pos(center()),
        origin("center")
    ])
})

go("game")
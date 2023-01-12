kaboom({
    global: true,
    fullscreen:true,
    scale:1,
    debug: true,
    clearColor: [0,0,0,1]
})

loadSprite("pc","sprites/Cam.png")

function spawnTree() {
    add([
        rect(48,rand(24,64)),
        area(),
        outline(4),
        pos(width(),height() - 48),
        origin("botleft"),
        move(LEFT,240),
        color(255,180,255),
        "obs"
    ])
    wait(rand(1.5,2.5), () => {
        spawnTree();
    })
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
const scoreLabel = add([
    text(score),
    pos(24,24)
])

onUpdate(()=>{
    score += 0.1;
    scoreLabel.text = Math.floor(score);
})


spawnTree()
})

scene("lose",()=> {
    add([
        text("Game Over"),
        pos(center()),
        origin("center")
    ])
})

go("game")
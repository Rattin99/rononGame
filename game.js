const height = window.innerHeight;
const width = window.innerWidth;

var config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    // this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('nongar',"sprites/nongar.jpg")
    this.load.image('chess',"sprites/chess.jpg")

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('ground', 'http://labs.phaser.io/assets/sprites/platform.png');
    this.load.image('red', 'assets/particles/red.png');
}

let platforms;

function create ()
{
    


   const nongar =  this.add.image(400, 300, 'nongar');

   nongar.setScale(0.5)

    var chess = this.physics.add.image(400, 100, 'chess');

    platforms = this.physics.add.staticGroup();

    platforms.create(400,568,'ground').setScale(2).refreshBody();


    chess.setScale(0.1)

    chess.setVelocity(100, 200);
    chess.setBounce(1, 1);
    chess.setCollideWorldBounds(true);

    this.physics.add.collider(chess,platforms)
}
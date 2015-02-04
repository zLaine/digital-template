window.onload = function() 
{
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    var girl;
    var brick;
    var walkSpeed = 150;
    var reunited;
    var map;
    var tiles;
    var background;
    var platforms;
    var collision;
    
    function preload() 
    {
        game.load.spritesheet('girlChar', 'assets/ExGirl.png', 40, 40, 12 );
        game.load.image('plainBrick', 'assets/brickPlatform.png');
        game.load.image('foggySky', 'assets/foggyBackground.png');
        game.load.image('brick', 'assets/Brick.png');
        game.load.tilemap('map', 'assets/iKnowYou.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.audio('reunited', 'assets/Reunited1.mp3');
    }
    
    
    function create() 
    {
        game.world.setBounds(0, 0, 3200, 1824);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //setting up the images used in the tilemap
        map = game.add.tilemap('map');
        map.addTilesetImage('Brick', 'brick');
        map.addTilesetImage('Sky', 'foggySky');
        
        map.setCollisionBetween(0, 8);
        map.setCollisionBetween(20, 25);
        map.setCollisionBetween(27, 29);
        map.setCollision(40);
        
        //sets up the layers of the filemap
    //    background = map.createLayer('Background');
    //    background.resizeWorld();
        platforms = map.createLayer('Platforms');
        platforms.debug = true;
        platforms.resizeWorld();
    //    collision = map.createLayer('Collision');
    //    collision.resizeWorld(); */
        
        reunited = game.add.audio('reunited');
        reunited.loop = true;
        reunited.play();
        
    //    game.add.sprite(0,0, 'foggySky');
    //    game.stage.backgroundColor = '#2d2d2d';
        
        /*platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0,game.world.height - 64, 'plainBrick');
        ground.scale.setTo(.5,.5);
        ground.body.immovable = true;
        
        var ledge = platforms.create(400, 400, 'plainBrick');
        ledge.scale.setTo(.25,.25);
        ledge.body.immovable = true;*/
        
        girl = game.add.sprite(32, game.world.height - 150, 'girlChar');
        game.physics.arcade.enable(girl);
        girl.body.bounce.y = 0.2;
        girl.body.gravity.y = 400;
        girl.body.collideWorldBounds = true;
        //girl.scale.set(2);
        
        girl.animations.add('left', [0, 1, 2], 10, true);
        girl.animations.add('down', [3, 4, 5], 10, true);
        girl.animations.add('up', [6, 7, 8], 10, true);
        girl.animations.add('right', [9, 10, 11], 10, true); 
        
       // walkRight.onStart.add(animationStarted, this);
       // walkRight.onLoop.add(animationLooped, this);
       //girl.animations.play('right', 10, true);

      //  girl.body.gravity.y = 300;
       // cursors = game.input.keyboard.createCursorKeys();
        
        girl.anchor.setTo(.5, .5);
        game.camera.follow(girl);
        //girl.anchor.setTo(.5, .5);

        //game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
    }

    
    function update() 
    {
        game.physics.arcade.collide(girl, platforms);
        
        // girl.body.gravity.y = 300; 
        girl.body.velocity.x = 0;
         
         
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
         {
        //  Move to the left
             girl.body.velocity.x = (0 - walkSpeed);
             girl.animations.play('left');
             
         }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            //  Move to the right
            girl.body.velocity.x = walkSpeed;
            girl.animations.play('right');
        }
        else
        {
            //  Stand still
            girl.animations.stop();
            girl.frame = 4;
        } 
      /*  if(jump.isDown && player.body.touching.down)
        {
            girl.body.velocity.y = -300;
        } */
        
        //  Allow the player to jump if they are touching the ground.
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) /*&& girl.body.touching.down*/)
        {
            girl.body.velocity.y = -350;
        } 
             
     }
     
    function render() 
    {
        var zone = game.camera.deadzone;
    
        game.context.fillStyle = 'rgba(255,0,0,0.6)';
        game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
    
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(girl, 32, 500);
    } 
};

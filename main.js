var WIDTH = screen.width * window.devicePixelRatio,
    HEIGHT = screen.height * window.devicePixelRatio;
var renderer = PIXI.autoDetectRenderer( HEIGHT, WIDTH, {backgroundColor : 0xD0D0D0, antialiase:true});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var farBackground, farDistortedBackground, texture;
var setupBackground = function(resources, stage){
    console.log(resources);

    texture = resources.farBackground.texture;
    farBackground = new PIXI.extras.TilingSprite(texture, HEIGHT, WIDTH );
    farBackground.position.x = 0;
    farBackground.position.y = 0;
    farBackground.tilePosition.x = 0;
    farBackground.tilePosition.y = 0;

    // console.log(farBackground.height);

    farDistortedBackground = new PIXI.mesh.Mesh(texture,
        new Float32Array(
            [0, 0,
            0, farBackground.width,
            farBackground.height, 0,
            farBackground.width, farBackground.height]), // Vertices
        new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), // UV Mapping Coords
        new Uint16Array([0, 1, 2, 3]) // Vertex indices
    ); 
    stage.addChild(farDistortedBackground);
}

var animation;
var setupAnimation = function(resources, stage){
    animation = new PIXI.spine.Spine(resources.femaleAthlete.spineData);
    animation.interactive = true;

    animation.skeleton.setSkinByName('SPEED SUIT');

    var delay = 0;
    animation.state.setAnimationByName(0, 'get set', false, 0);
    animation.state.addAnimationByName(0, 'block start', false, 0);
    animation.state.addAnimationByName(0, 'starting run', false, 0);
    animation.state.addAnimationByName(0, 'run', true, 0);

    animation.scale.set(0.23, 0.23);
    animation.x = 960;
    animation.y = 450;
    stage.addChild(animation);
}

var update = function(){

}

function animate() {
    requestAnimationFrame(animate);

    farDistortedBackground.position.x += 0.128;
    // render the root container
    renderer.render(stage);
}

PIXI.loader
    .add('farBackground', "/assets/far-background.jpg")
    .add('femaleAthlete', './assets/skeleton.json')
    .once("complete", function(loader, resources){
        setupBackground(resources, stage);
        setupAnimation(resources, stage);
        animate();
    }).load();



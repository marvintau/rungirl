console.log(window.devicePixelRatio);
var renderer = PIXI.autoDetectRenderer( screen.height*window.devicePixelRatio,
                                        screen.width*window.devicePixelRatio,
                                        {backgroundColor : 0xD0D0D0}
                );
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var replay = function(animation){
    animation.state.setAnimationByName(0, 'get set', false, 0);
    animation.state.addAnimationByName(0, 'block start', false, 0);
    animation.state.addAnimationByName(0, 'starting run', false, 0);
    animation.state.addAnimationByName(0, 'run', true, 0);
}

PIXI.loader.add('sportyGirl', './assets/skeleton.json')
    .load(function(loader, resources){
        animation = new PIXI.spine.Spine(resources.sportyGirl.spineData);
        animation.interactive = true;
        animation.on('mousedown', replay(animation))
                 .on('touchstart', replay(animation));

        animation.skeleton.setSkinByName('SPEED SUIT');

        var delay = 0;
        animation.state.setAnimationByName(0, 'get set', false, 0);
        animation.state.addAnimationByName(0, 'block start', false, 0);
        animation.state.addAnimationByName(0, 'starting run', false, 0);
        animation.state.addAnimationByName(0, 'run', true, 0);


        animation.scale.set(0.23, 0.23);
        animation.x = 960;
        animation.y = 450;
        // animation.rotation = Math.PI/2;
        stage.addChild(animation);
    });


animate();

function animate() {
    requestAnimationFrame(animate);

    // render the root container
    renderer.render(stage);
}

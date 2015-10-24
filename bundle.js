/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var WIDTH = screen.width * window.devicePixelRatio,
	    HEIGHT = screen.height * window.devicePixelRatio,
	    ASPECTRATIO = HEIGHT/WIDTH;
	var renderer = PIXI.autoDetectRenderer( HEIGHT, WIDTH, {backgroundColor : 0xD0D0D0, antialiase:true});
	document.body.appendChild(renderer.view);

	// create the root of the scene graph
	var stage = new PIXI.Container();

	var farTilingSprite, farDistortedBackground, texture;
	var setupBackground = function(resources, stage){
	    console.log(resources);

	    imageTexture = resources.farTilingSprite.texture;
	    farTilingSprite = new PIXI.extras.TilingSprite(imageTexture, HEIGHT, WIDTH );
	    farTilingSprite.position.x = 0;
	    farTilingSprite.position.y = 0;
	    farTilingSprite.tilePosition.x = 0;
	    farTilingSprite.tilePosition.y = -(screen.width - imageTexture.height)/2;

	    textureRenderer = new PIXI.CanvasRenderer(HEIGHT, WIDTH);
	    texture = new PIXI.RenderTexture(textureRenderer, HEIGHT, WIDTH);
	    texture.render(farTilingSprite);


	    farDistortedBackground = new PIXI.mesh.Mesh(texture,
	        new Float32Array(
	            [0, 0,
	            0, HEIGHT,
	            WIDTH, 0,
	            WIDTH, HEIGHT]), // Vertices
	        new Float32Array([
	                0, 0, 0, 1, 1, 0, 1, 1
	            ]), // UV Mapping Coords
	        new Uint16Array([0, 1, 2, 3]) // Vertex indices
	    ); 
	    farDistortedBackground.width = HEIGHT;
	    farDistortedBackground.height = WIDTH;
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

	function animate() {
	    requestAnimationFrame(animate);

	    farTilingSprite.tilePosition.x -= 0.512;
	    texture.render(farTilingSprite);
	    farDistortedBackground.texture.update();
	    // render the root container
	    renderer.render(stage);
	}

	PIXI.loader
	    .add('farTilingSprite', "/assets/far-background.jpg")
	    .add('femaleAthlete', './assets/skeleton.json')
	    .once("complete", function(loader, resources){
	        setupBackground(resources, stage);
	        setupAnimation(resources, stage);
	        animate();
	    }).load();




/***/ }
/******/ ]);
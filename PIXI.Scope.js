module.exports = (function(){

	var initialPoint, finalPoint;

	var container = new PIXI.Container();
		container.interactive = true;

	var drawable, renderer, stage;

	var animationCountDown = 0, isAnimating = false;

	var init = function(theDrawable, theRenderer, theStage){

		drawable = theDrawable;
		renderer = theRenderer;
		stage = theStage;

		drawable.init(renderer);

		container.addChild( drawable.render() );
		stage.addChild(container);

		container.touchstart = function (interaction) {
			initialPoint = interaction.data.getLocalPosition(this.parent);
		};

		container.touchend = container.touchendoutside = function (interaction) {
			finalPoint = interaction.data.getLocalPosition(this.parent);
			var xAbs = Math.abs(initialPoint.x - finalPoint.x);
			var yAbs = Math.abs(initialPoint.y - finalPoint.y);

			if (xAbs > yAbs) {
				if (finalPoint.x < initialPoint.x)
					setUpdate("next");
				else
					setUpdate("prev");
			}
		};

	}

	var setUpdate = function(which){
		isAnimating = true;
		isFromLeft = (which==="next") ? 1 : -1;
		animationCountDown = 1;
		container.addChild( drawable.turn(which) );
	}

	var update = function(){
		if(isAnimating){
			if (animationCountDown > 0 ){
				animationCountDown -= 0.04;
				container.getChildAt(1).x = isFromLeft * animationCountDown * animationCountDown * animationCountDown * renderer.width;
			} else {
				isAnimating = false;
				animationCountDown = 0;
				container.swapChildren(container.getChildAt(0), container.getChildAt(1));
				container.removeChildAt(1);
			}	
		}	
	}

	return {
		init : init,
		update : update
	}
})();
var calendar = require('./calendar.js');

module.exports = (function(){

	var color = {
		background : '#277455',
		dimmed : "#999999",
		foreground : "#93BC9C",
		stroke : "#0E573A",
		shadow : "#003A23",
		today : "#FC6952"
	}

	var title, grid;
	var width, height;

	var init = function(renderer){
		width = renderer.width;
		height = renderer.height * 0.4;

		title = {};
		title.margin = 40;
		title.fontWeight = "100";
		title.fontFace = "Helvetica Neue";
		title.fontSize = 120;
		title.font = title.fontWeight+" "+title.fontSize+"px "+title.fontFace;
		title.height = title.margin + title.fontSize;
		
		grid = {};
		grid.gap 			= 10;
		grid.widthOffset	= (width - grid.gap)/7;
		grid.width 			= grid.widthOffset - grid.gap;
		grid.heightOffset 	= (height - grid.gap)/6;
		grid.height 		= grid.heightOffset - grid.gap;
		grid.fontWeight 	= "200";
		grid.fontSize		= title.fontSize * 0.6;
		grid.font 			= grid.fontWeight + " " + grid.fontSize+"px "+title.fontFace;
	}

	var render = function(){
		var page = calendar.page();
		var monthName = calendar.monthName();

		var container = new PIXI.Container();
			container.cachedAsBitmap = true;

		var graphics = new PIXI.Graphics();
			graphics.lineStyle(0);
			graphics.beginFill(parseInt(color.background.substr(1), 16));
			graphics.drawRect(0, 0, width, title.height);
			graphics.endFill();

		var i, colWidthOffset, rowHeightOffset;


		for (i = 0; i < 42; i++){
			colWidthOffset = (i % 7)*grid.widthOffset;
			rowHeightOffset= Math.floor(i / 7)*grid.heightOffset;

			if(page[i].display === "today")
				graphics.beginFill(parseInt(color.today.substr(1), 16));
			else
				graphics.beginFill(parseInt(color.foreground.substr(1), 16));

			graphics.drawRect(
				colWidthOffset + grid.gap,
				title.height + rowHeightOffset + grid.gap,
				grid.width,
				grid.height
			);

			graphics.endFill();
		}

		graphics.endFill();

		container.addChild(graphics);

		var text = new PIXI.Text(monthName, {
			font: title.font,
			fill: color.foreground,
			stroke : color.stroke,
			strokeThickness : 10
		});
		text.x = 30;

		container.addChild(text);

		for (i = 0; i < 42; i++){
			colWidthOffset = (i % 7)*grid.widthOffset;
			rowHeightOffset= Math.floor(i / 7)*grid.heightOffset;

			text = new PIXI.Text(page[i].day.toString(), {
				font : grid.font,
				fill : (page[i].type=="curr") ? color.background : color.dimmed
			});

			text.x = colWidthOffset + 5 + grid.widthOffset * 0.5 - text.width/2;
			text.y = title.height + rowHeightOffset + 30;
			container.addChild(text);
		}

		return container;
	};

	var turn = function(which){
		calendar.turnPage(which);
		return render();
	};

	return {
		init : init,
		turn : turn,
		render : render
	}
})();

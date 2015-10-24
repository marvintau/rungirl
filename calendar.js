var data = [
	{
		month : 7,
		date  : 20,
		year  : 2015
	},
	{
		month : 7,
		date  : 21,
		year  : 2015
	},
	{
		month : 7,
		date  : 22,
		year  : 2015
	}
]

module.exports = (function(){

	/**
	 * Javascript date object that records current date
	 * @type {Date}
	 */
	var date = new Date();

	/**
	 * page records the number of date shown on the current calendar page
	 * always have a length of 42 (6 weeks)
	 * @type {Array}
	 */
	var page = [];

	/**
	 * Month name, a string
	 * @type {String}
	 */
	var monthName = "";

	/**
	 * Calculate whether the given year is a leap year. Returns 1 if true,
	 * 0 otherwise.
	 * @param  {Number} year given full year
	 * @return {Number}      0 or 1
	 */
	var leap = function(year){
		if (Math.ceil(year % 400) == 0){
			return 1
		} else if (Math.ceil(year % 100) != 0 && Math.ceil(year % 4) == 0){
			return 1
		} else
			return 0
	}

	/**
	 * Calculates how many days are there in given month and year
	 * @param  {Number} month
	 * @param  {Number} year
	 * @return {Number} number of days
	 */
	var getDaysOfMonth = function(month, year){
		return [
			{month: "Janurary", days: 31},
			{month: "Feburary", days: 28 + leap(year)},
			{month: "March", days: 31},
			{month: "April", days: 30},
			{month: "May", days: 31},
			{month: "June", days: 30},
			{month: "July", days: 31},
			{month: "August", days: 31},
			{month: "September", days: 30},
			{month: "October", days: 31},
			{month: "November", days: 30},
			{month: "December", days: 31}
		][month];
	}

	/**
	 * Calculates how many days are there before the 1st day of
	 * the month on the page
	 * @param  {Number} month
	 * @param  {Number} year
	 * @return {Number} number of days
	 */
	var getInitialDays = function(month, year){
		var date = new Date();
			date.setFullYear(year);
			date.setMonth(month);
			date.setDate(1);

		return date.getDay();
	}

	/**
	 * fill the page string with current date object
	 */
	var setPage = function(records){
		var month = date.getMonth(),
			year = date.getFullYear();

		var days = getDaysOfMonth(month, year).days,
			prevMonthDays = (month === 1) ? getDaysOfMonth(11, year-1).days : getDaysOfMonth(month, year).days,
			initialDays = getInitialDays(month, year);

		monthName = getDaysOfMonth(month, year).month;

		page = [];

		var i;
		for (i = 0; i < initialDays; i++){
			page[i] = {type: "prev", day: (prevMonthDays - initialDays + i + 1)} ;
		}

		for (; i < days + initialDays; i++){
			page[i] = {type: "curr", day: (i - initialDays + 1)};
		}

		for (; i < 42; i++){
			page[i] = {type: "next", day: (i - days - initialDays + 1)};
		}

		var today = new Date();
		if (month == today.getMonth()){
			page[initialDays+today.getDate()-1].display = "today";
		}
	};

	setPage();

	return {

		page : function(){
			return page;
		},

		monthName : function(){
			return monthName;
		},

		/**
		 * turn calendar pages back and forth
		 * @param  {Stirng} direction "prev" or "next"
		 * @return nothing
		 */
		turnPage : function(direction){
			if (direction === "next"){
				date.setMonth(date.getMonth()+1);
			} else if (direction === "prev"){
				date.setMonth(date.getMonth()-1);
			};
			setPage();
		},
	}
})();
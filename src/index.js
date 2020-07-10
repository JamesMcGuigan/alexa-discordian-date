require('datejs');
require('datejs/src/i18n/en-GB.js');
const alexa = require('alexa-app');
const { discordianDate, nextHolyday, lastHolyday, discordianDateParts: discordianDateJson } = require('./discordianDate');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('alexa-discordian-date');
app.dateFormat = 'dddd ddS MMMM yyyy'; // 'Monday 17th April 2017'

app.launch(function(request, response) {
	response.say("Ask Discordian Date for today, yesterday or even May 3rd 2034, which date would you like the discordian for?");
	response.shouldEndSession(false, "Pick a date, any date. Discordian Date will do the rest.");
});
app.intent('DiscordianDateTodayIntent',
	{
		"utterances":[
			"{for|when|what|} {was|is|to|will be|} {the|} {current|} {discordian|} {today|now|day|current|stardate} {is it|}",
			"what day {is|} {it|} {today|}",
		]
	},
	function(request, response) {
		var date = Date.today();
		var gregorian = Date.parse(date).toString(app.dateFormat);
		response.say(gregorian + "is..." + discordianDate(date));
		response.card({
			"type":    "Simple",
			"title":   discordianDate(),
			"content": gregorian
		})
	}
);
app.intent('DiscordianDateIntent',
	{
		"slots": {
			"Date": "AMAZON.DATE"
		},
		"utterances": [
			"{for|when|what|} {was|is|to|will be|} {the|} {tomorrow|yesterday|-|Date}",
			"{for|when|what|} {was|is|to|will be|} {the|} {discordian|} {date|} {in|} {-|Date}",
			"{for|when|what|} {was|is|to|will be|} {the|} {discordian|} {date|} {in|on|} {-|Date}"
		]
	},
  function(request, response) {
		var date = Date.parse(request.slot('Date'));
		if( !date ) {
			response.say("Fnord!");
			return;
		}
		var gregorian = Date.parse(date).toString(app.dateFormat);
		response.say(gregorian + "is..." + discordianDate(date));
		response.card({
			"type":    "Simple",
			"title":   discordianDate(),
			"content": gregorian
		})
	}
);
app.intent('NextHolydayIntent',
	{
		"utterances": [
			"{for|when|what|} {the|is|to|will be|} {next|} {discordian|} {holiday|party|celebration|saint|saints|apostle} {day|}",
		]
	},
	function(request, response) {
		let holyday = nextHolyday();
		response.say(holyday);
		response.card({
			"type":    "Simple",
			"title":   "Next Discordian Holyday",
			"content": holyday
		})
	}
);
app.intent('LastHolydayIntent',
	{
		"utterances": [
			"{for|when|what|} {was|is|to|} {the|a|} last {discordian|} {holiday|party|celebration|saint|saints|apostle} {day|} {is it|}",
		]
	},
	function(request, response) {
		let holyday = nextHolyday();
		response.say(holyday);
		response.card({
			"type":    "Simple",
			"title":   "Last Discordian Holyday",
			"content": holyday
		})
	}
);
app.intent('SeasonIntent',
	{
		"utterances": [
			"{for|when|what|} {was|is|to|} {the|a|} {current|} {discordian|} {month|season|time of year} {is it|now|}",
		]
	},
	function(request, response) {
		let discordian = discordianDateJson();
		response.say(discordian.season);
		response.card({
			"type":    "Simple",
			"title":   "Discordian Season",
			"content": discordian.season
		})
	}
);

app.intent('YearIntent',
	{
		"utterances": [
			"{for|when|what|} {was|is|to|} {the|a|} {current|} {discordian|} {year|orbit} {is it|}",
		]
	},
	function(request, response) {
		let discordian = discordianDateJson();
		response.say('This is the YOLD ' + discordian.yold);
		response.card({
			"type":    "Simple",
			"title":   "Discordian Year",
			"content": discordian.yold
		})
	}
);

app.intent('AMAZON.SinkIntent', {
	"utterances": [
		"sink!"
	]
}, function(request, response) {
	response.say("I sunk Columbus, Ohio!");
});


app.intent('AMAZON.HelpIntent', {}, function(request, response) {
	response.say("Ask Discordian Date for the year, season, next holyday or any date such as tomorrow or May 3rd 2034." +
		"which date would you like the discordian for?");
	response.shouldEndSession(false, "Pick a date, any date. Discordian Date will do the rest.");
});
app.intent('AMAZON.StopIntent', {}, function(request, response) {
	response.say("Fnord!");
});
app.intent('AMAZON.CancelIntent', {}, function(request, response) {
	response.say("Fnord!");
});


module.exports = app;

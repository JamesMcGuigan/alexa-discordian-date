require('datejs');
require('datejs/src/i18n/en-GB.js');
var alexa = require('alexa-app');
var discordianDate = require('./discordianDate');

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
			"{for|} {the|} {discordian|} {date|}"
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
      "Date":     "AMAZON.DATE"
		},
		"utterances":[
			"{for|} {the|} {discordian|} {date|} {-|Date}"
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
app.intent('AMAZON.HelpIntent', {}, function(request, response) {
	response.say("Ask Discordian Date for today, yesterday or even May 3rd 2034, which date would you like the discordian for?");
	response.shouldEndSession(false, "Pick a date, any date. Discordian Date will do the rest.");
});
app.intent('AMAZON.StopIntent', {}, function(request, response) {
	response.say("Fnord!");
});
app.intent('AMAZON.CancelIntent', {}, function(request, response) {
	response.say("Fnord!");
});


module.exports = app;

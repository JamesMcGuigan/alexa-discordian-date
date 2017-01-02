require('datejs');
var alexa = require('alexa-app');
var discordianDate = require('./discordianDate');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('alexa-discordian-date');


app.launch(function(request, response) {
	response.say("Today is, " + discordianDate(date));
});
app.intent('DiscordianDateTodayIntent',
	{
		"utterances":[
			"for the {discordian|} date"
		]
	},
	function(request, response) {
		response.say("Today is, " + discordianDate(date));
	}
);
app.intent('DiscordianDateIntent',
  {
		"slots": {
      "Date":     "AMAZON.DATE"
		},
		"utterances":[
			"{for|the|} {discordian date|} {Date}"
		]
	},
  function(request, response) {
		var date = Date.parse(request.slot('Date'));

		if( !date ) {
			response.say("Fnord!");
			return;
		}
		if( date.same().day(Date.today()) ) {
			response.say("Today is ");
		} else {
			response.say(request.slot('Date') + " is ");
		}
		response.say(discordianDate(date));
	}
);
module.exports = app;

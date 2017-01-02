'use strict';
var APP_ID = "amzn1.ask.skill.3956afb2-ceb8-46d2-bd6e-16f50055b932";
var AlexaSkill = require('./AlexaSkill');
var discordianDate = require('./discordianDate');

var DiscordianDateService = function() {
  AlexaSkill.call(this, APP_ID);
};
DiscordianDateService.prototype = Object.create(AlexaSkill.prototype);

DiscordianDateService.prototype.intentHandlers = {
  'DiscordianDateIntent': function(intent, session, response) {
    response.tell(discordianDate());
  }
};
DiscordianDateService.prototype.eventHandlers.onLaunch = DiscordianDateService.prototype.intentHandlers['DiscordianDateIntent'];

exports.handler = function(event, context) {
  var discordianDateService = new DiscordianDateService();
  discordianDateService.execute(event, context);
};

Alexa Discordian Date
=====================

## Install 

### Development Build
```
git clone https://github.com/JamesMcGuigan/alexa-discordian-date
npm install
npm run build # zip -r ./DiscordianDateLambda.zip *
```

### Run AlexaAppServer Locally

```
node ./server.js
open http://localhost:8080/alexa/alexa-discordian-date
```

### Uploading to AWS

- Upload DiscordianDateLambda.zip to Amazon Lambda Console - [https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/DiscordianDate?tab=code]()
- Upload Schema Files to Alexa Developer Console: [https://developer.amazon.com/edw/home.html#/skill/amzn1.ask.skill.3956afb2-ceb8-46d2-bd6e-16f50055b932/en_US/info]()   
- BUG: Unpublished Skills don't seem to work on my physical hardware but do work via [https://echosim.io/]() 

### Alexa Tutorials
- [https://www.youtube.com/watch?v=QxgdPI1B7rg&list=PL2KJmkHeYQTO6ci5KF08mvHYdAZu2jgkJ]()
- [https://github.com/bignerdranch/developing-alexa-skills-solutions/blob/master/coursebook/coursebook.pdf]()


## Schema

### Sample Utterances
```
DiscordianDateTodayIntent	for the discordian date
DiscordianDateTodayIntent	for the date
DiscordianDateIntent	for the discordian date {Date}
DiscordianDateIntent	the discordian date {Date}
DiscordianDateIntent	for discordian date {Date}
DiscordianDateIntent	discordian date {Date}
DiscordianDateIntent	for the date {Date}
DiscordianDateIntent	the date {Date}
DiscordianDateIntent	for date {Date}
DiscordianDateIntent	date {Date}
DiscordianDateIntent	for the discordian {Date}
DiscordianDateIntent	the discordian {Date}
DiscordianDateIntent	for discordian {Date}
DiscordianDateIntent	discordian {Date}
DiscordianDateIntent	for the {Date}
DiscordianDateIntent	the {Date}
DiscordianDateIntent	for {Date}
DiscordianDateIntent	{Date}
```

### Intent Schema
```
{
  "intents": [
    {
      "intent": "DiscordianDateTodayIntent",
      "slots": []
    },
    {
      "intent": "DiscordianDateIntent",
      "slots": [
        {
          "name": "Date",
          "type": "AMAZON.DATE"
        }
      ]
    }
  ]
}
```

## Test Event
```
{
  "version": "1.0",
  "session": {
    "new": false,
    "sessionId": "amzn1.echo-api.session.abeee1a7-aee0-41e6-8192-e6faaed9f5ef",
    "application": {
      "applicationId": "amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.account.AM3B227HF3FAM1B261HK7FFM3A2"
    }
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "amzn1.echo-api.request.6919844a-733e-4e89-893a-fdcb77e2ef0d",
    "timestamp": "2015-05-13T12:34:56Z",
    "intent": {
      "name": "DiscordianDateIntent",
      "slots": {
        "Date": {
          "value": "tomorrow",
          "name": "Date"
        }
      }
    }
  }
}
```

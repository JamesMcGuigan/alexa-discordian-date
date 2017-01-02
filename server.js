var AlexaAppServer = require("alexa-app-server");
AlexaAppServer.start({
	port: 8080,
	app_dir: __dirname + "/../",
	public_html: "node_modules/alexa-app-server/examples/public_html/",
	server_dir:  "node_modules/alexa-app-server/examples/server/"
});

"use strict"

const fs = require('fs');
const contentType = "application/json; charset=utf-8";
const request = require('request');
const moment = require('moment');
const user = process.env.user;


module.exports = (event, context) => {

    // Check if lunch req
    if(event.body.request.type == "LaunchRequest") {
        return launchRequest(context);
    }

    // Other request
    fs.readFile("./function/response.json", "utf8", (err, val) => {

	if(err) {
	    return context.fail(err);
	}
    
	if(event.body.request.intent && event.body.request.intent.name == "flatter") {
		
		let url = process.env.flatter_list;
		console.log("Flatter List: " + url)
		const response = JSON.parse(val);

		if(!url.length)  {
		        response.response.outputSpeech.text = user + "... Seems like I haven't told any lines to Flatter. Chah!";        
		        return context
		             .status(200)
		             .headers({"Content-Type": contentType})
		             .succeed(response);
		}

		const req = {
			uri: url,
		};

		request.get(req, (err, res, body) => {
			
			if(err) {
				response.response.outputSpeech.text = user + "... I'm having trouble remembering the flatter lines. Chah! ..." + err;
				return context
				      .status(200)
		                      .headers({"Content-Type": contentType})
		                      .succeed(response);
			}

			const lines = JSON.parse(body);

			// get a random flatter line
			let index = getRandomInt(lines.length);
			response.response.outputSpeech.text = user + "... " + lines[index];

			return context
				.status(200)
				.headers({"Content-Type": contentType})
				.succeed(response);
		});

	} else if (event.body.request.intent && event.body.request.intent.name == "remind") {
		let url = process.env.remind_list;
		console.log("Remind List: " + url)
		const response = JSON.parse(val);

		if(!url.length)  {
		        response.response.outputSpeech.text = user + "... Seems like I haven't told any thing to Remind. Chah!";        
		        return context
		             .status(200)
		             .headers({"Content-Type": contentType})
		             .succeed(response);
		}

		const req = {
			uri: url,
		};

		request.get(req, (err, res, body) => {
			
			if(err) {
				response.response.outputSpeech.text = user + "... I'm having trouble remembering our memories. Chah! ..." + err;
				return context
				      .status(200)
		                      .headers({"Content-Type": contentType})
		                      .succeed(response);
			}
			
			const lines = JSON.parse(body);

			// get a random  line
			let index = getRandomInt(lines.length);
			response.response.outputSpeech.text = user +  "... Do you remember ?" + lines[index];

			return context
				.status(200)
				.headers({"Content-Type": contentType})
				.succeed(response);
		});

	} else if (event.body.request.intent && event.body.request.intent.name == "todo") {
		
		let url = process.env.todo_list;
		console.log("Todo List: " + url)
		const response = JSON.parse(val);

		if(!url.length)  {
		        response.response.outputSpeech.text = user + "... Seems like I haven't told any thing to Remind. Chah!";        
		        return context
		             .status(200)
		             .headers({"Content-Type": contentType})
		             .succeed(response);
		}

		const req = {
			uri: url,
		};

		request.get(req, (err, res, body) => {
			
			if(err) {
				response.response.outputSpeech.text = user + "... I'm having trouble remembering our memories. Chah! ..." + err;
				return context
				      .status(200)
		                      .headers({"Content-Type": contentType})
		                      .succeed(response);
			}
			
			const lines = JSON.parse(body);
			

			let responsetext = user +  "... you have " + lines.length + " items in your todo : ";
			for(var index=0; index<lines.length; index++){
				responsetext = responsetext + ", .... " + (index+1) + " .. " +   lines[index];
			}

			response.response.outputSpeech.text = responsetext;

			return context
				.status(200)
				.headers({"Content-Type": contentType})
				.succeed(response);
		});

	}  else {

		const response = JSON.parse(val);
		response.response.outputSpeech.text = user + "... I dont know what you just said, you can say flatter me, remind me or tell me todo !"; 
		context
		    .status(200)
		    .headers({"Content-Type": contentType})
		    .succeed(response);
	}
    });
}

let launchRequest = (context) => {
    fs.readFile("./function/response.json", "utf8", (err, val) => {
        if(err) {
            return context.fail(err);
        }
    
        const response = JSON.parse(val);
        response.response.outputSpeech.text = "Hi " + user + "!"
        response.response.shouldEndSession = false;

        context
            .status(200)
            .headers({"Content-Type": contentType})
            .succeed(response);
    });
};

function getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
}

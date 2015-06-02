/*
// LEAN-MDN is a node application that gets data from MDN website via JSON requests
// and formats it into a new, more lean JSON structure.
// Type 'node app' to run the application.
// Generated documents are located in /json
*/

var fs 		= require("fs");
var request	= require("request");

//File names for output
var MDN_CSS_DOC_FILENAME = "mdnCssDocs";
var MDN_HTML_DOC_FILENAME = "mdnHtmlDocs";

//Links to MDN pages
var MDN_URL = "https://developer.mozilla.org/en-US/";
var MDN_HTML_DOC_URL = "https://developer.mozilla.org/en-US/docs/Web/HTML/Element$children?expand";
var MDN_HTML_DOC_URL = "https://developer.mozilla.org/en-US/docs/Web/CSS$children?expand";

//JSON object to put newly constructed data
var mdnHtmlDocs = {}, mdnCssDocs = {};

function generate(url, doc, filename) {
	console.log("Fetching and constructing " + filename + " documentation...");
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var rawData = JSON.parse(body).subpages;

			for(var i = 0; i < rawData.length; i++) {
				var obj = rawData[i];
				
				doc[obj.title] = {
					"URL": obj.url,
					"SUMMARY": obj.summary
				};
			}
		}
		fs.writeFile("json/" + filename + ".json", JSON.stringify(mdnHtmlDocs, null, 0), function(err){
			console.log("json/" + filename + ".json has been written.")
		});
	});
}

generate(MDN_HTML_DOC_URL, mdnHtmlDocs, "mdnHtmlDocs");
generate(MDN_HTML_DOC_URL, mdnCssDocs, "mdnCssDocs");

/* http://github.com/AngeloG/Chatzilla-Plugins
 * Copyright (c) Angelo Geels, 2011
 */

plugin.id = "f7u12";

plugin.init = function(glob)
{
	plugin.version = "1.1";
	plugin.description = "Gives you extra smilies from /r/fffffffuuuuuuuuuuuu.";
	
	return "OK";
}

plugin.enable = function()
{
	var aliases = {
		"trollface": "troll",
		"fffffffuuuuuuuuuuuu": "fu",
		"ffuuu": "fu",
		"pickle": "pickletime",
		"okayface": "okay",
		"fuckthatbitch": "fuckthatshit",
		"yay": "foreveralonelaugh"
	};
	
	var rageFaces = [
		"megusta", "milk", "perfect", "harpdarp", "fuckthatshit", "wtf",
		"challengeaccepted", "wayevil", "yuno", "fuckyeah", "awman", "okay",
		"melvin", "omg", "lol", "yup", "foreveralone", "foreveralonelaugh",
		"gtfo", "ohno", "jackie", "sweetjesus", "awyea", "actually",
		"pickletime", "pokerface", "sadtroll", "disappoint", "stare",
		"seriously", "badpokerface", "trolldad", "omfg", "dude", "fu",
		"heh", "meep", "megustaperfect", "angered", "argh", "troll",
		"betterthanexpected", "fff", "hmm", "sad"
	];
	
	for(alias in aliases){
		if(rageFaces.indexOf(alias) == -1)
			rageFaces.push(alias);
	}
	
	var regex = "(\\[(" + rageFaces.join("|") + ")\\])";
	client.munger.addRule("f7u12", new RegExp(regex), function(matchText, containerTag, eventData){
		var imageText = matchText.replace(/(\[|\])/g, "");
		
		if(aliases[imageText] != null)
			imageText = aliases[imageText];
		
		var newImage = document.createElementNS(XHTML_NS, "html:img");
		newImage.setAttribute("src", plugin.cwd + imageText + ".png");
		newImage.setAttribute("style", "max-width:200px;max-height:200px;");
		newImage.setAttribute("title", imageText);
		
		containerTag.appendChild(newImage);
	}, 10, 10);
	
	client.commandManager.defineCommand("f7u12", function(){
		display("Do you really need help with this plugin? [omg]");
		display("Fine. You type [name] where you replace \"name\" with one of the following:");
		var list = "";
		for(i in rageFaces){
			list += rageFaces[i] + " ";
		}
		display(list.trim());
	});
	
	return true;
}

plugin.disable = function()
{
	client.munger.delRule("f7u12");
	client.commandManager.removeCommand("f7u12");
	
	return true;
}
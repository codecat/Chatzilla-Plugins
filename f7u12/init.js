/* http://github.com/AngeloG/Chatzilla-Plugins
 * Copyright (c) Angelo Geels, 2011
 */

plugin.id = "f7u12";

plugin.init = function(glob)
{
	plugin.version = "1.0";
	plugin.description = "Gives you extra smilies from /r/fffffffuuuuuuuuuuuu.";
	
	return "OK";
}

plugin.enable = function()
{
	client.munger.addRule("f7u12",  /(\[(troll|fu|megusta|milk|perfect|harpdarp|fuckthatshit|wtf|challengeaccepted|wayevil|yuno|fuckyeah|awman|okay|melvin)\])/, function(matchText, containerTag, eventData){
		var newImage = document.createElementNS(XHTML_NS, "html:img");
		newImage.setAttribute("src", plugin.cwd + matchText.replace(/(\[|\])/g, "")+".png");
		newImage.setAttribute("style", "max-width:200px;max-height:200px;");
		
		insertText("", newImage, eventData);
		containerTag.appendChild(newImage);
	}, 10, 10);
	
	return true;
}

plugin.disable = function()
{
	client.munger.delRule("f7u12");
	
	return true;
}
/* http://github.com/AngeloG/Chatzilla-Plugins
 * Copyright (c) Angelo Geels, 2011
 */

plugin.id = "subreddit-links";

plugin.init = function(glob)
{
	plugin.version = "1.0";
	plugin.description = "Turns incoming /r/subreddit and /user/username text into a link.";
	plugin.glob = glob;
	
	return "OK";
}

plugin.enable = function()
{
	client.munger.addRule("subreddit-links", /(\/(r|user)\/([A-Za-z0-9]{3,}))/, function(matchText, containerTag, eventData, mungerEntry){
		var newLink = document.createElementNS(XHTML_NS, "html:a");
		newLink.setAttribute("href", "http://www.reddit.com/" + matchText.substr(1));
		newLink.setAttribute("location", "_blank");
		newLink.appendChild(document.createTextNode(matchText));
		containerTag.appendChild(newLink);
	}, 10, 10);
	
	return true;
}

plugin.disable = function()
{
	client.munger.delRule("subreddit-links");
	
	return true;
}
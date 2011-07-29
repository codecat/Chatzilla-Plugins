/* http://github.com/AngeloG/Chatzilla-Plugins
 * Copyright (c) Angelo Geels, 2011
 */

plugin.id = "inline-youtube";

plugin.init = function(glob)
{
	plugin.version = "1.1";
	plugin.description = "Inline YouTube player for YouTube links.";
	
	return "OK";
}

plugin.enable = function()
{
	client.munger.addRule("inline-youtube",  /(http:\/\/([a-z]{2,}\.|)youtube.com\/watch\?v=([A-Za-z0-9\-\_]{11}))/, function(matchText, containerTag, eventData){
		if(!("dontLogURLs" in eventData)){
			var videoID = matchText.match(/watch\?v=([A-Za-z0-9\-\_]{11})/)[1];
			
			var newIframe = document.createElementNS(XHTML_NS, "html:iframe");
			newIframe.setAttribute("src", "http://www.youtube.com/embed/" + videoID);
			newIframe.setAttribute("width", "560");
			newIframe.setAttribute("height", "349");
			newIframe.setAttribute("frameborder", "0");
			newIframe.setAttribute("allowfullscreen", "1");
			
			insertText("", newIframe, eventData);
			
			var newYouTubeLink = document.createElementNS(XHTML_NS, "html:a");
			newYouTubeLink.setAttribute("href", matchText);
			newYouTubeLink.appendChild(document.createTextNode(matchText));
			
			containerTag.appendChild(document.createElementNS(XHTML_NS, "html:br"));
			containerTag.appendChild(document.createTextNode("YouTube video: "));
			containerTag.appendChild(newYouTubeLink);
			containerTag.appendChild(document.createElementNS(XHTML_NS, "html:br"));
			containerTag.appendChild(newIframe);
			containerTag.appendChild(document.createElementNS(XHTML_NS, "html:br"));
		}else{
			//insertLink function doesn't work properly.
			//TODO: Find a way to do this better
			var newLink = document.createElementNS(XHTML_NS, "html:a");
			newLink.setAttribute("href", matchText);
			newLink.setAttribute("location", "_blank");
			newLink.appendChild(document.createTextNode(matchText));
			containerTag.appendChild(newLink);
		}
	}, 10, 10);
	
	return true;
}

plugin.disable = function()
{
	client.munger.delRule("inline-youtube");
	
	return true;
}
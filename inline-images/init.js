/* http://github.com/AngeloG/Chatzilla-Plugins
 * Copyright (c) Angelo Geels, 2011
 */

plugin.id = "inline-images";

plugin.init = function(glob)
{
	plugin.version = "1.1";
	plugin.description = "Turns incoming image links (like imgur) into inline images.";
	plugin.glob = glob;
	
	return "OK";
}

plugin.enable = function()
{
	client.munger.addRule("inline-images", new RegExp("(http://([a-z0-9\\-]+\\.)+([a-z]{2,})([A-Za-z0-9\\_\\-/]*)[A-Za-z0-9\\_\\-]{5,}.(jpg|jpeg|png|gif|bmp))"), function(matchText, containerTag, eventData, mungerEntry){
		if(!("dontLogURLs" in eventData)){
			var newLink = document.createElementNS(XHTML_NS, "html:a");
			newLink.setAttribute("href", matchText);
			newLink.setAttribute("location", "_blank");
			newLink.setAttribute("style", "text-decoration:none;");
			
			var newImage = document.createElementNS(XHTML_NS, "html:img");
			newImage.setAttribute("src", matchText);
			newImage.setAttribute("style", "max-width:200px;max-height:200px;");
			newLink.appendChild(newImage);
			
			var extraSpace = document.createElementNS(XHTML_NS, "html:span");
			extraSpace.setAttribute("style", "font-size:1px;");
			extraSpace.appendChild(document.createTextNode(" "));
			containerTag.appendChild(extraSpace);
			
			containerTag.appendChild(newLink);
		}else{
			//insertLink function doesn't work properly.
			//TODO: Find a way to do this better
			var newLink = document.createElementNS(XHTML_NS, "html:a");
			newLink.setAttribute("href", matchText);
			newLink.setAttribute("location", "_blank");
			newLink.appendChild(document.createTextNode(matchText));
			containerTag.appendChild(newLink);
		}
	}, 15, 10);
	
	return true;
}

plugin.disable = function()
{
	client.munger.delRule("inline-images");
	
	return true;
}
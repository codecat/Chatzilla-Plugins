/* http://github.com/AngeloG/Chatzilla-Plugins
 * Copyright (c) Angelo Geels, 2011
 */

plugin.id = "spoiler-tags";

plugin.init = function(glob)
{
	plugin.version = "1.0";
	plugin.description = "Turns [spoiler]Text here[/spoiler] into a spoiler tag.";
	
	return "OK";
}

plugin.enable = function()
{
	client.munger.addRule("spoiler-tags",  /(\[spoiler\](.*)\[\/spoiler\])/, function(matchText, containerTag, eventData){
		var spoiler = matchText.match(/\[spoiler\](.*)\[\/spoiler\]/)[1];
		
		var newText = document.createElementNS(XHTML_NS, "html:span");
		newText.setAttribute("style", "background:#000;color:#000;");
		newText.setAttribute("title", "Select the black area to reveal the spoiler.");
		
		var newTempText = document.createElementNS(XHTML_NS, "html:span");
		newTempText.setAttribute("style", "color:#f00;background:#000;font-size:9px;");
		newTempText.appendChild(document.createTextNode("SPOILER "));
		newText.appendChild(newTempText);
		
		insertText(spoiler, newText, eventData);
		containerTag.appendChild(newText);
	}, 10, 10);
	
	return true;
}

plugin.disable = function()
{
	client.munger.delRule("spoiler-tags");
	
	return true;
}
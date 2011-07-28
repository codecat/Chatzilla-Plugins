plugin.id = "inline-imgur";

plugin.init = function(glob)
{
	plugin.version = "1.0";
	plugin.description = "Turns incoming imgur links into inline images.";
	
	return "OK";
}

plugin.enable = function()
{
	alert("Enabled");
	
	return true;
}

plugin.disable = function()
{
	//client.commandManager.removeHook("say", "lod-hook", true);
	
	return true;
}
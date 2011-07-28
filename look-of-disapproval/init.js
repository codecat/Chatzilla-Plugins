plugin.id = "look-of-disapproval";

plugin.init = function(glob)
{
	plugin.version = "1.1";
	plugin.description = "Replaces ;lod; in the input box to a look of disapproval as you type it in.";
	
	return "OK";
}

plugin.enable = function()
{
	document.getElementById("input").onkeyup = function(){
		document.getElementById("input").value = document.getElementById("input").value.replace(/;lod;/g, "\u0ca0_\u0ca0");
	};
	
	return true;
}

plugin.disable = function()
{
	return true;
}
// vim: sw=2:et

plugin.id = "look-of-disapproval";

plugin.init = function(glob) {
	plugin.version = "1.0";
	plugin.description = "Replaces [lod] in a sent message with a look of disapproval";
	
	return "OK";
}

plugin.enable = function() {
	client.commandManager.addHook("say", function(a){
		alert("You said something! WOOOHOOO!!");
		alert(a);
	}, "lod-hook", true);
	
	return true;
}

plugin.disable = function() {
	client.commandManager.removeHook("say", "lod-hook", true);
	
	return true;
}
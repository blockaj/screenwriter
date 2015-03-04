var gui = require('nw.gui'),
	fs = require('fs'),
	fdialogs = require('node-webkit-fdialogs');

//Get the Mac OS X native menubar
var win = gui.Window.get();
var nativeMenuBar = new gui.Menu({ type: "menubar" });
nativeMenuBar.createMacBuiltin("Screenwriter");

var fileItem = new gui.MenuItem({
	type: 'normal',
	label: 'File'
});
nativeMenuBar.append(fileItem);

win.menu = nativeMenuBar;

$(function(){
	$('#save_button').click(function(){
		var contentString = $('textarea').val(),
			content = new Buffer(contentString, 'utf-8');
			console.log(contentString);
		fdialogs.saveFile(content, function(err, path){
			console.log("File saved in ", path);
		});
	});
	$("#open_button").click(function(){
		fdialogs.readFile(function(err, data, path){
			$("textarea").text(data);
		});
	});
});

function save(file, savePath) {
}

function open(fileWithPath) {

}

function getUnsavedContent() {
	var content;
	return content;
}
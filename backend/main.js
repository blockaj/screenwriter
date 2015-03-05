var gui = require('nw.gui'),
	fs = require('fs'),
	fdialogs = require('node-webkit-fdialogs');

$(function(){
	var win = gui.Window.get();
	var menubar = new gui.Menu({ type: 'menubar' });
	win.showDevTools();
	console.log(win);
	menubar.createMacBuiltin('Screenwriter');
	var file = new gui.MenuItem({ label: 'File' });

	var fileMenu = new gui.Menu({ type: 'contextmenu' });
	file.submenu = fileMenu;
	fileMenu.append(new gui.MenuItem({ label: 'New' }));
	fileMenu.append(new gui.MenuItem({ label: 'Save as...' }));
	fileMenu.append(new gui.MenuItem({ label: 'Save' }));

	menubar.insert(file, 1);
	win.menu = menubar;
	console.log(menubar.items);

	var saveDialog = new fdialogs.FDialog({
		type: 'save', 
		accept: ['.sw']
	}),
		openDialog = new fdialogs.FDialog({
			type: 'open',
			accept: ['.sw']
	});

	$('#save_button').click(function(){
		var content = getUnsavedContent()
		saveDialog.saveFile(content, function(err, path){
			if (err) {
				console.log(err);
			}
		});
	});
	$("#open_button").click(function(){
		openDialog.readFile(function(err, data, path){
			$("textarea").text(data);
		});
	});
});
function saveAs() {

}
function save(file, savePath) {
}

function open(fileWithPath) {

}

function getUnsavedContent() {
	var content;
	content = $('textarea').val();
	contentBuffer = new Buffer(content, 'utf-8');
	return contentBuffer;
}
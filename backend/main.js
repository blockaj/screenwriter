var gui = require('nw.gui'),
	fs = require('fs'),
	fdialogs = require('node-webkit-fdialogs');
var saveDialog = new fdialogs.FDialog({
	type: 'save', 
	accept: ['.sw']
}),
	openDialog = new fdialogs.FDialog({
		type: 'open',
		accept: ['.sw']
});

$(function(){
	menu();

});
function saveAs() {
	var content = getUnsavedContent();
	saveDialog.saveFile(content, function(err, path){
		if (err) {
			console.log(err);
		}
	});
}
function save(file, savePath) {
}

function open() {
	openDialog.readFile(function(err, data, path){
		$("textarea").text(data);
	});
}

function getUnsavedContent() {
	var content;
	content = $('textarea').val();
	contentBuffer = new Buffer(content, 'utf-8');
	return contentBuffer;
}

function menu(){
	var win = gui.Window.get();
	var menubar = new gui.Menu({ type: 'menubar' });
	win.showDevTools();
	menubar.createMacBuiltin('Screenwriter');
	var file = new gui.MenuItem({ label: 'File' });

	var fileMenu = new gui.Menu({ type: 'contextmenu' });
	file.submenu = fileMenu;
	fileMenu.append(new gui.MenuItem({ label: 'New',
										key: 'n',
										modifiers: 'cmd' 
									}));
	fileMenu.append(new gui.MenuItem({ label: 'Save as...',
									   key: 's',
									   modifiers: 'cmd shift',
									   click: function(){
									   	saveAs();  
									   }
									}));
	fileMenu.append(new gui.MenuItem({ label: 'Save',
										key: 's',
										modifiers: 'cmd'
									}));
	fileMenu.append(new gui.MenuItem({ label: 'Open',
										key: 'o',
										modifiers: 'cmd',
										click: function() {
											open();
										}
									}));

	menubar.insert(file, 1);
	win.menu = menubar;
}
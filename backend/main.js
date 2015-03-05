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

var currentDocument = {
	title: 'Untitled',
	path: '~/',
	pathAndTitle: '~/Untitled.sw',
	savedAs: false
};

var lineFormat;

$(function(){
	lineFormat = 'sh';
	menu();
	document.title = currentDocument.title;
	formatText();
});
function saveAs() {
	var content = getUnsavedContent();
	saveDialog.saveFile(content, function(err, path){
		if (err) {
			console.log(err);
		}
		currentDocument.pathAndTitle = path;
		currentDocument.title = getDocumentName(path)[0];
		currentDocument.savedAs = true;
		console.log(getDocumentName(path)[0]);
		document.title = currentDocument.title;
	});
}
	
function save(file) {
	if (currentDocument.savedAs){
		fs.writeFile(file, getUnsavedContent(), function(err){
			if (err) {
				console.log(err);
			}
		});		
	} else {
		saveAs();
	}

}

function open() {
	openDialog.readFile(function(err, data, path){
		$(".inner-page").text(data);
	});
}
function newDoc() {
	var newWin = gui.Window.open('../frontend/main.html');
}
function getUnsavedContent() {
	var content;
	content = $('.inner-page').html();
	console.log(content);
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
										modifiers: 'cmd',
										click: function() {
											newDoc();
										}
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
										modifiers: 'cmd',
										click: function(){
											save(currentDocument.pathAndTitle);
										}
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
function getDocumentName(filePath) {
	var fileName;
	var fileNameWithExtension;
	for (i = filePath.length - 1; i > 0; i--) {
		var currentCharacter = filePath[i];
		if (currentCharacter == '/') {
			fileNameWithExtension = filePath.substring(i+1, filePath.length);
			break;
		}
	}
	for (i = 0; i < fileNameWithExtension.length; i++) {
		var currentCharacter = fileNameWithExtension[i];
		if (currentCharacter == '.') {
			fileName = fileNameWithExtension.substring(0, i);
		}
	}
	return [fileName, fileNameWithExtension];
}

function isOverflowed(element) {
	return element.scrollHeight > element.clientHeight;
}

function formatText() {
	var sceneHeading = $('.scene-heading').text();
	sceneHeading = sceneHeading.toUpperCase();
	$('.scene-heading').text(sceneHeading);

	var character = $('.character').text();
	character = character.toUpperCase();
	$('.character').text(character);

	$('.parenthetical').prepend('(');
	$('.parenthetical').append(')');
}
function formatToJSON() {
	
}
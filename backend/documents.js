var currentDocument = {
	title: 'Untitled',
	path: '~/',
	pathAndTitle: '~/Untitled.sw',
	savedAs: false
};

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
		data = data.toString();
		htmlData = formatToHTML(data);
		console.log(htmlData);
		$(".inner-page").html(htmlData);
		document.title = getDocumentName(path)[0];
	});
}
function newDoc() {
	var newWin = gui.Window.open('../frontend/main.html');
}
function getUnsavedContent() {
	var content;
	content = JSON.stringify(formatToJSON());
	contentBuffer = new Buffer(content, 'utf-8');
	return contentBuffer;
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
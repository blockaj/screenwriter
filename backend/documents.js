var currentDocument = {
	title: 'Untitled',
	path: '~/',
	pathAndTitle: '~/Untitled.sw',
	savedAs: false
};



//Saves file with dialog for name and directory
function saveAs() {
	var content = getUnsavedContent();
	saveDialog.saveFile(content, function(err, path){
		if (err) {
			console.log(err);
		}
		currentDocument.pathAndTitle = path;
		currentDocument.title = getDocumentName(path).fileName;
		currentDocument.savedAs = true;
		document.title = currentDocument.title;
	});
}


//Save file
function save(file) {

	//If the documents has already been saved and 
	//has been given a file name and path
	if (currentDocument.savedAs){

		fs.writeFile(file, createContentBuffer(), function(err){
			if (err) {
				console.log(err);
			}
		});	
	} 

	else {
		saveAs();
	}
}


//Open file
function open() {
	openDialog.readFile(function(err, data, path){
		data = data.toString();
		htmlData = formatToHTML(data)[0];
		titleData = formatToHTML(data)[1];

		//.inner-page is the div where all of the text is stored so we will place
		//the formated html of the document there
		$(".inner-page").html(htmlData);
		$(".title-page").html(titleData);

		//Reset the title of the window to be the title of the document
		document.title = getDocumentName(path).fileName;
		currentDocument.title = getDocumentName(path).fileName;
		currentDocument.pathAndTitle = path;

		//Prevents the Screenwriter from bringing up the save dialogue 
		//everytime the document is saved 
		currentDocument.savedAs = true;
	});
}


//New document window
function newDoc() {
	var newWin = gui.Window.open('../frontend/main.html');
}


//Returns content of the page to a buffer for saving
function getUnsavedContent() {
	var innerPage = $('.inner-page');
	var titlePage = $('.title-page');
	console.log(titlePage);
	titlePage = titlePage[0];
	innerPage = innerPage[0];
	return [innerPage.children, titlePage.children];
}



function createContentBuffer() {
	var content;
	content = JSON.stringify(formatToJSON());
	contentBuffer = new Buffer(content, 'utf-8');
	return contentBuffer;
}


//Returns document object with fileName and fileNameWithExtension
function getDocumentName(filePath) {
	var fileName;
	var fileNameWithExtension;

	//Tracks backwards through entire file path until the first '/'
	//at which point it creates a substring starting right after the first '/'
	//it finds
	for (i = filePath.length - 1; i > 0; i--) {
		var currentCharacter = filePath[i];
		if (currentCharacter == '/') {
			fileNameWithExtension = filePath.substring(i+1, filePath.length);
			break;
		}
	}

	//Takes out the '.sw' extension of the file name by looking for the 
	//'.' and creating a subsring that ends right before the '.' 
	for (i = 0; i < fileNameWithExtension.length; i++) {
		var currentCharacter = fileNameWithExtension[i];

		if (currentCharacter == '.') {
			fileName = fileNameWithExtension.substring(0, i);
		}
	}


	return {fileName: fileName, fileNameWithExtension: fileNameWithExtension};
}

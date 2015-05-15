function formatToJSON() {
	var file = {};
	file.title = [];
	file.scenes = [];

	innerPage = getUnsavedContent()[0];
	titlePage = getUnsavedContent()[1];

	_.forEach(titlePage, function(el) {
		var className = el.className;
		var newItem = {
			'type': className,
			'text': el.innerText
		};

		file.title.push(newItem);
	});	

	//Loop through every p-tag in inner-page class
	_.forEach(innerPage, function(p){
		var className = p.className;
		var index = p.dataset.index;
		var jsonClass = htmlClassToJSON(className);
		
		//JSON object holding one line in the screenplay
		var newItem = {
			'type': jsonClass,
			'text': p.innerText,
			'index': index
		};

		file.scenes.push(newItem);
	});
	return file;
}



function formatToHTML(file) {
	var characterList = [];
	var mainPage = "";
	var titlePage = "";
	try {
		file = JSON.parse(file);
	}
	catch(e) {
		console.trace(e);
	}
	_.forEach(file.title, function(line) {
		if (line.type == 'title') {
			titlePage = titlePage.concat('<h1 class="title">' + line.text + '</h1>');
		} else {
			titlePage = titlePage.concat('<p class="' + line.type + '">' + line.text + '</p>');
		}
	});
	_.forEach(file.scenes, function(line){
		if(line.type == 'sceneHeading') {
			mainPage = mainPage.concat('<p class="scene-heading" data-index="' + line.index + '">' + line.text + '</p>');
		} 
		if (line.type == 'action') {
			mainPage = mainPage.concat('<p class="action" data-index="' + line.index + '">' + line.text + '</p>');
		} 
		if (line.type == 'character') {
			mainPage = mainPage.concat('<p class="character" data-index="' + line.index + '">' + line.text + '</p>');
			var characterExists = false;
		}
		if (line.type == 'paranthetical') {
			mainPage = mainPage.concat('<p class="parenthetical" data-index="' + line.index + '">' + line.text + '</p>');
		}
		if (line.type == 'speech') {
			mainPage = mainPage.concat('<p class="speech" data-index="' + line.index + '">' + line.text + '</p>');
		}
	});
	return [mainPage, titlePage];
}



function htmlClassToJSON(htmlClass) {
	var jsonClass;
	//Reassigns name appropriate for JSON according to element class
	switch(htmlClass) {
		case 'scene-heading':
			jsonClass = 'sceneHeading';
			break;
		case 'action':
			jsonClass = 'action';
			break;
		case 'character':
			jsonClass = 'character';
			break;
		case 'parenthetical':
			jsonClass = 'parenthetical';
			break;
		case 'speech':
			jsonClass = 'speech';
			break;
	}
	return jsonClass;
}


function formatToJSON() {
	var file = {};
	file.scenes = [];
	var innerPage = $('.inner-page');
	innerPage = innerPage[0].children;

	//Loop through every p-tag in inner-page class
	_.forEach(innerPage, function(p){
		var className = p.className;
		console.log(className);
		var index = p.dataset.index;
		var jsonClass = htmlClassToJSON(className);
		console.log(jsonClass);
		//JSON object holding one line in the screenplay
		var newItem = {
			'type': jsonClass,
			'text': p.innerText,
			'index': index
		};

		file.scenes.push(newItem);
	});
	console.log(file);
	return file;
}

function formatToHTML(file) {
	var characterList = [];
	var htmlFile = "";
	try {
		file = JSON.parse(file);
	}
	catch(e) {
		console.trace(e);
	}
	_.forEach(file.scenes, function(line){
		console.log(line);
		if(line.type == 'sceneHeading') {
			htmlFile = htmlFile.concat('<p class="scene-heading" data-index="' + line.index + '">' + line.text + '</p>');
		} 
		if (line.type == 'action') {
			htmlFile = htmlFile.concat('<p class="action" data-index="' + line.index + '">' + line.text + '</p>');
		} 
		if (line.type == 'character') {
			htmlFile = htmlFile.concat('<p class="character" data-index="' + line.index + '">' + line.text + '</p>');
			var characterExists = false;
		}
		if (line.type == 'paranthetical') {
			htmlFile = htmlFile.concat('<p class="parenthetical" data-index="' + line.index + '">' + line.text + '</p>');
		}
		if (line.type == 'speech') {
			htmlFile = htmlFile.concat('<p class="speech" data-index="' + line.index + '">' + line.text + '</p>');
		}
	});
	return htmlFile;
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
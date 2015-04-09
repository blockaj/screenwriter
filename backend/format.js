function formatToJSON() {
	var file = {};
	file.scenes = [];
	scenes = file.scenes;
	var innerPage = $('.inner-page');
	innerPage = innerPage[0].children;

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

		scenes.push(newItem);
	});
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
	_.forEach(file.scenes, function(scene){
		console.log(scene);
		if(scene.type == 'sceneHeading') {
			htmlFile = htmlFile.concat('<p class="scene-heading" data-index="' + scene.index + '">' + scene.text + '</p>');
		} 
		if (scene.type == 'action') {
			htmlFile = htmlFile.concat('<p class="action">' + scene.text + '</p>');
		} 
		if (scene.type == 'character') {
			htmlFile = htmlFile.concat('<p class="dialogue character">' + scene.text + '</p>');
			var characterExists = false;
			_.forEach(characterList, function(character){	
				if (scene.text == character) {
					characterExists = true;
				}
			});
			if (!characterExists) {
				characterList.push(scene.text);
			}
		}
		if (scene.type == 'paranthetical') {
			htmlFile = htmlFile.concat('<p class="dialogue parenthetical">' + scene.text + '</p>');
		}
		if (scene.type == 'speech') {
			htmlFile = htmlFile.concat('<p class="dialogue speech">' + scene.text + '</p>');
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
		case 'dialogue character':
			jsonClass = 'character';
			break;
		case 'dialogue parenthetical':
			jsonClass = 'parenthetical';
			break;
		case 'dialogue speech':
			jsonClass = 'speech';
			break;
	}
	return jsonClass;
}
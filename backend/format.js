function formatText() {
	var lineFormat;
	var innerPage = $('.inner-page');
	var selStart = '<p class="scene-heading"></p>'.indexOf('>');

	$('.parenthetical').prepend('(');
	$('.parenthetical').append(')');
	if (!lineFormat) {
		lineFormat = 'scene-heading';
	}
	innerPage.keypress(function(e){
		console.log('finding ');
		if (e.keyCode == 13) {
			e.preventDefault();
			if (lineFormat == 'scene-heading') {
				lineFormat = 'action';
			} else if (lineFormat == 'action') {
				if ($('.action').text() == '') {
					lineFormat = 'scene-heading';
				}
				console.log(lineFormat);
			} else if (lineFormat == 'character') {
				lineFormat = 'speech';
			} else if (lineFormat == 'speech') {
				lineFormat = 'character';
			}
			createNewElementWithFormat(lineFormat);
		}
		console.log('Key pressed:', e.keyCode);

	});
	innerPage.keydown(function(e){
		if (e.keyCode == 9) {
			e.preventDefault();
			console.log('Tab key');
			if (lineFormat == 'speech') {
				lineFormat = 'parenthetical';
			}
			if (lineFormat == 'action') {
				lineFormat = 'character';
			}
			createNewElementWithFormat(lineFormat);
		}
	});
	innerPage.append('<p class="' + lineFormat + '"><br></p>');
	console.log('<p class="' + lineFormat + '"><br></p>');
}
function createNewElementWithFormat(inputFormat) {
	var innerPage = $('.innerPage');
	innerPage.append('<p class="' + inputFormat + '"><br></p>');
	var lineSelector = '.' + inputFormat;
	var nodeContents = $(lineSelector).last()[0];
	var range = document.createRange();
	range.selectNodeContents(nodeContents);
	range.collapse(true);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
}
function formatToJSON() {
	var file = {};
	file.scenes = [];
	scenes = file.scenes;
	var innerPage = $('.inner-page');
	innerPage = innerPage[0].children;
	_.forEach(innerPage, function(p){
		className = p.className;
		if (className == 'scene-heading') {
			var newItem = {
				'type': 'sceneHeading',
				'text': p.innerText
			};
			scenes.push(newItem);
		} else if (className == 'action') {
			var newItem = {
				'type': 'action',
				'text': p.innerText
			};
			scenes.push(newItem);
		} else if (className == 'dialogue character') {
			var newItem = {
				'type': 'character',
				'text': p.innerText
			};
			scenes.push(newItem);
		} else if (className == 'dialogue parenthetical') {
			var newItem = {
				'type': 'parenthetical',
				'text': p.innerText
			};
			scenes.push(newItem);
		} else if (className == 'dialogue speech') {
			var newItem = {
				'type': 'speech',
				'text': p.innerText
			};
			scenes.push(newItem);
		}
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
			htmlFile = htmlFile.concat('<p class="scene-heading">' + scene.text + '</p>');
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
function formatInApp() {

	return lineFormat;
}
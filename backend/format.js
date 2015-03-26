function formatText() {
	var index = 0;
	var lineFormat;
	var innerPage = $('.inner-page');
	$('.parenthetical').prepend('(');
	$('.parenthetical').append(')');
	if (!lineFormat) {
		lineFormat = 'scene-heading';
	}
	innerPage.click(function(){
		currentElement();
	});
	innerPage.keypress(function(e){
		if (e.keyCode == 13) {
			e.preventDefault();
			if (lineFormat == 'scene-heading') {
				lineFormat = 'action';
			} else if (lineFormat == 'action') {
				if ($('.action').text() === '') {
					lineFormat = 'scene-heading';
				}
			} else if (lineFormat == 'character') {
				console.log($('.character[data-index="' + index + '"]').text());
				if ($('.character[data-index="' + index + '"]').text() === '') {
					lineFormat = 'action';
				} else {
					console.log($('.character[data-index="' + index + '"]').text());
					lineFormat = 'speech';
				}
			} else if (lineFormat == 'speech') {
				lineFormat = 'character';
			}
			console.log(index);
			index = createNewElementWithFormat(lineFormat, index);
		}
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
			console.log(index);
			index = createNewElementWithFormat(lineFormat, index);
		}
	});
	innerPage.append('<p data-index=' + index + ' class="' + lineFormat + '"><br></p>');
	console.log('<p class="' + lineFormat + '"><br></p>');
}
function createNewElementWithFormat(inputFormat, dataIndex) {
	var innerPage = $('.inner-page');
	var prevTag = currentElement();
	console.log(prevTag);
	dataIndex++;
	prevTag.after('<p data-index=' + dataIndex + ' class="' + inputFormat + '"><br></p>');
	var nodeContents = innerPage.find('[data-index="' + dataIndex + '"]')[0];
	var range = document.createRange();
	range.selectNodeContents(nodeContents);
	range.collapse(true);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
	currentElement();
	return dataIndex;
}

function currentElement() {
	var innerPage = $('inner-page');
	var sel = window.getSelection();
	console.log(sel);
	var node = sel.anchorNode.parentNode;
	console.log(node);
	var jObject = $('[data-index="' + node.dataset.index + '"]');
	return jObject;
}

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
		var jsonClass;

		//Reassigns name appropriate for JSON according to element class
		switch(className) {
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
function formatInApp() {

	return lineFormat;
}
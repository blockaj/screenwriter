function formatText() {
	var lineFormat;
	var innerPage = $('.inner-page');
	var selStart = '<p class="scene-heading"></p>'.indexOf('>');
	window.selectionStart = selStart + 1;
	window.selectionEnd = window.selectionStart + 1;
	$('.parenthetical').prepend('(');
	$('.parenthetical').append(')');
	if (!lineFormat) {
		lineFormat = 'scene-heading';
	}
	innerPage.keypress(function(e){
		console.log('finding ');
		if (e.keyCode == 13) {
			if (lineFormat == 'scene-heading') {
				lineFormat = 'action';
			} else if (lineFormat == 'action') {
				lineFormat = 'scene-heading';
				console.log(lineFormat);
			} else if (lineFormat == 'character') {
				lineFormat = 'speech';
			}
		}
		console.log('Key pressed:', e.keyCode);
		if (e.keyCode == 9) {
			e.preventDefault();
			console.log('Tab key');
			if (lineFormat == 'speech') {
				lineFormat = 'parenthetical';
			}
			if (lineFormat == 'action') {
				lineFormat = 'character';
			}
		}
	});
	console.log('<p class="' + lineFormat + '"><br></p>');
	innerPage.append('<p class="' + lineFormat + '"><br></p>');

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
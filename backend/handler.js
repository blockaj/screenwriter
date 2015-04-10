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
		lineFormat = currentElement()[0].className;
		console.log(lineFormat);
	});

	innerPage.keypress(function(e){

		if (e.keyCode == 13) {

			e.preventDefault();

			if (lineFormat == 'scene-heading') {
				lineFormat = 'action';
			} 

			else if (lineFormat == 'action') {
				if ($('.action').text() === '') {
					lineFormat = 'scene-heading';
				}
			} 

			else if (lineFormat == 'character') {
				console.log($('.character[data-index="' + index + '"]').text());
				if ($('.character[data-index="' + index + '"]').text() === '') {
					lineFormat = 'action';
				} else {
					console.log($('.character[data-index="' + index + '"]').text());
					lineFormat = 'speech';
				}
			} 

			else if (lineFormat == 'speech') {
				lineFormat = 'character';
			}
			
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
			convertElementToFormat('character');
			//index = createNewElementWithFormat(lineFormat, index);
		}
	});

	innerPage.append('<p data-index=' + index + ' class="' + lineFormat + '"><br></p>');

	console.log('<p class="' + lineFormat + '"><br></p>');
}
function createNewElementWithFormat(inputFormat, dataIndex) {
	var innerPage = $('.inner-page');
	var prevTag = currentElement();
	dataIndex++;
	prevTag.after('<p data-index="' + dataIndex + '" class="' + inputFormat + '"><br></p>');
	console.log('Appended tag with index: ' + dataIndex);
	moveCursor(dataIndex);
	return dataIndex;
}
function convertElementToFormat(inputFormat) {
	var currentTag = currentElement();
	var currentClass = currentTag.attr('class');
	console.log(currentClass);
	currentTag.removeClass(currentClass);
	currentTag.addClass(inputFormat);
}

function moveCursor(index) {
	console.log('Move cursor to index: ' + index);
	var innerPage = $('.inner-page');
	var nodeContents = innerPage.find('p[data-index="' + index + '"]')[0];
	console.log(nodeContents);
	var range = document.createRange();
	range.selectNodeContents(nodeContents);
	range.collapse(true);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
}

function currentElement() {
	var sel = window.getSelection();
	var	node = sel.anchorNode;
	if (node.textContent !== "") {
		node = sel.anchorNode.parentElement;
		console.log(node);
	}
	//Return jQuery object so it can be used with jQuery .after() 
	var jObject = $('[data-index="' + node.dataset.index + '"]');
	return jObject;
}

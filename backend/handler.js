//Handles the line formatting based on cursor position
//and buttons pressed
function formatText() {
	var index = 0;

	var lineFormat;

	var innerPage = $('.inner-page');
	
	$('.parenthetical').prepend('(');

	$('.parenthetical').append(')');

	if (!lineFormat) {
		lineFormat = 'scene-heading';
	}


	//Set lineFormat in footer on start-up
	$('.footer').text(lineFormat);
	innerPage.click(function(){
		lineFormat = jQueryToElement(currentElement()).className;
		index = jQueryToElement(currentElement()).dataset.index;
		$('.footer').text(lineFormat);
	});

	innerPage.keypress(function(e){

		if (e.keyCode == 13) {
			e.preventDefault();

			if (lineFormat == 'scene-heading') {
				lineFormat = 'action';
			} 

			else if (lineFormat == 'action') {
				if ($('[data-index="' + index + '"]').text() === '') {
					lineFormat = 'scene-heading';
				}
			} 

			else if (lineFormat == 'character') {
				if ($('.character[data-index="' + index + '"]').text() === '') {
					lineFormat = 'action';
					convertElementToFormat(lineFormat);
					return "";
				} else {
					lineFormat = 'speech';
				}
			} 

			else if (lineFormat == 'speech') {
				if ($('.speech[data-index="' + index + '"]').text() === '') {
					lineFormat = 'action';
				} else {
					lineFormat = 'character';
				}
			}
			
			index = createNewElementWithFormat(lineFormat, index);
			$('.footer').text(lineFormat);
		}
	});


	innerPage.keydown(function(e){

		if (e.keyCode == 9) {
			e.preventDefault();

			if (lineFormat == 'speech') {
				lineFormat = 'parenthetical';
			}

			if (lineFormat == 'action') {
				lineFormat = 'character';
			}

			//On tab click the current line should be converted to a new format
			//A new element should NOT be created 
			convertElementToFormat('character');
			$('.footer').text(lineFormat);
		}
	});

	//The first line of every document
	innerPage.append('<p data-index=' + index + ' class="' + lineFormat + '"><br></p>');
}



//Add a line right after the index with the specified input format
//both provided as an argument
function createNewElementWithFormat(inputFormat, dataIndex) {
	var innerPage = $('.inner-page');
	var prevTag = currentElement();
	dataIndex++;
	prevTag.after('<p contenteditable="true" data-index="' + dataIndex + '" class="' + inputFormat + '"><br></p>');
	moveCursor(dataIndex);
	if (inputFormat == 'character') {
		giveCharacterSuggestions(currentElement());
	}
	return dataIndex;
}



//Convert the element of the current line to the format
//provided as an argument
function convertElementToFormat(inputFormat) {
	var currentTag = currentElement();
	var currentClass = currentTag.attr('class');
	currentTag.removeClass(currentClass);
	currentTag.addClass(inputFormat);
}



//Moves the cursor to a certain element inside the page
//based on their index provided as an agrument
function moveCursor(index) {
	var innerPage = $('.inner-page');
	var nodeContents = innerPage.find('p[data-index="' + index + '"]');
	var range = document.createRange();
	range.selectNodeContents(nodeContents[0]);
	range.collapse(true);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
	$('.footer').text(lineFormat);
}



//Returns the element that the cursor is in 
//in a jQuery object
function currentElement() {
	var sel = window.getSelection();
	console.log(sel);
	var	node = sel.anchorNode;
	if (!node) {
		return null;
	}
	if (node.textContent !== "") {
		node = sel.anchorNode.parentElement;
	}

	//Return jQuery object so it can be used with jQuery .after() 
	var jObject = $('[data-index="' + node.dataset.index + '"]');
	return jObject;
}



//Returns the element version of the provided 
//jQuery object
function jQueryToElement(jQueryObject) {
	return jQueryObject[0];
}
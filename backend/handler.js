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
				} 

				else {
					lineFormat = 'speech';
				}
			} 

			else if (lineFormat == 'speech') {
				lineFormat = 'character';
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
			convertElementToFormat('character');
			$('.footer').text(lineFormat);
		}
	});

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
	console.log(innerPage);
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
	var	node = sel.anchorNode;

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



//Set the innerPage variable to the last page
function setInnerPage() {
	var lastPage = $('.page').last();
	var innerPage = lastPage.find('.inner-page');
	return innerPage;
}



function elementCreated(lineFormat) {
	if (lineF)
}

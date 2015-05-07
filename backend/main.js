var gui = require('nw.gui'),
	fs = require('fs'),
	fdialogs = require('node-webkit-fdialogs'),
	_ = require('lodash'),
	VerEx = require('verbal-expressions');
var endOfClass = VerEx().find('class="').anything().then('">');
var lineFormat;

var saveDialog = new fdialogs.FDialog({
	type: 'save', 
	accept: ['.sw']
}),
	openDialog = new fdialogs.FDialog({
		type: 'open',
		accept: ['.sw']
});


$(function(){
	$('.character').autocomplete({
		source: ['Arnie', 'Alvin']
	});
	menu();
	document.title = currentDocument.title;
	formatToJSON();
	formatText();
});

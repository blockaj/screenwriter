function giveCharacterSuggestions(characterElement) {
	console.log('Giving suggestions for:', characterElement.data('index'));
	var availableTags = [
		'Aaron',
		'Alvin'
	];

	console.log(getSuggestions(currentElement(), availableTags));

}



function getSuggestions(el, availableTags) {
	var suggestions = [];
	console.log(currentElement());
	currentElement().keypress(function() {
		var content = el.text();
		console.log(content);
		_.forEach(availableTags, function(tag) {
			var suggest = tag.indexOf(content) != -1;
			console.log(suggest);
			if (suggest) {
				suggestions.push(tag);
			}
		});
	});
	console.log(suggestions);
	return suggestions;
}



function giveSceneHeadingSuggestions(shElement) {
	shElement.autocomplete({
		source: [
			'int.',
			'ext.',
		]
	});
}




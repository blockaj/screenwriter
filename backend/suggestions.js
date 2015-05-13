function giveCharacterSuggestions(characterElement) {
	console.log('Giving suggestions for:', characterElement.data('index'));
	var availableTags = [
		'Aaron',
		'Alvin'
	];


}



function getSuggestions(el, availableTags) {
	var suggestions = [];
	console.log(currentElement());
	$('.inner-page').keypress(function() {
		var content = el.text();
		console.log(content);
		_.forEach(availableTags, function(tag) {
			tag = tag.toLowerCase();
			content = content.toLowerCase();
			var suggest = tag.indexOf(content) != -1;
			console.log(suggest);
			if (suggest) {
				var doesNotAlreadyExist = suggestions.indexOf(tag) == -1;
				if (doesNotAlreadyExist) {
					suggestions.push(tag);
				}
				console.log(suggestions);
			} else {
				var alreadyExists = suggestions.indexOf(tag) != -1;
				if (alreadyExists) {
					var index = suggestions.indexOf(tag);
					suggestions.splice(index, 1);
				}
			}
		});
	});
}


function allCharacters(doc) {
	
}


function giveSceneHeadingSuggestions(shElement) {
	shElement.autocomplete({
		source: [
			'int.',
			'ext.',
		]
	});
}




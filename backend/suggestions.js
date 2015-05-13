function giveCharacterSuggestions(characterElement) {
	console.log('Giving suggestions for:', characterElement.data('index'));
	var availableTags = [
		'Aaron',
		'Alvin'
	];

	$('.inner-page').keypress(function() {
		console.log(getSuggestions(currentElement(), availableTags));
	});
}



function getSuggestions(el, availableTags) {
	var suggestions = [];
	var content = el.text();

	_.forEach(availableTags, function(tag) {

		//Suggestions should be case-insensitive
		tag = tag.toLowerCase();
		content = content.toLowerCase();

		//Check if the suggestion is in the current string
		var suggest = tag.indexOf(content) != -1;
		if (suggest) {

			//If it does not already exist in the array of suggestions
			//add it to the array of suggestions 
			var doesNotAlreadyExist = suggestions.indexOf(tag) == -1;
			if (doesNotAlreadyExist) {
				suggestions.push(tag);
			}
			console.log(suggestions);


		} else {

			//If a suggestion is no longer valid but is in the array
			//of suggestions, remember to take that suggestion out
			var alreadyExists = suggestions.indexOf(tag) != -1;
			if (alreadyExists) {
				var index = suggestions.indexOf(tag);
				suggestions.splice(index, 1);
			}
		}
	});
}



function suggestionBox(suggestions) {
	_.forEach(suggestions, function(suggestion){
		
	});
}	


function giveSceneHeadingSuggestions(shElement) {
	shElement.autocomplete({
		source: [
			'int.',
			'ext.',
		]
	});
}




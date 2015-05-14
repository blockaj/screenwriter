var pdf = require('html-pdf');

function exportPDF() {
	chooseFile('#fileDialog');
}

function chooseFile(name) {
	var chooser = document.querySelector(name);
	chooser.addEventListener('change', function(evt) {
		var pdfDocument = this.value.pdfName();
		var html = getPageContent();
		var options = { 
			filename: pdfDocument, 
			format: 'Letter',  
			"border": {
 				"top": "1in",            // default is 0, units: mm, cm, in, px 
    			"right": "1in",
    			"bottom": "1in",
    			"left": "1.5in"
  			}
  		};
		pdf.create(html, options).toFile(pdfDocument, function(err, res){
			if (err) return console.trace(err);
		});
		addCSS();
	}, false);
	chooser.click();
	
}

function addCSS() {
	var css; 
	try {
		css = fs.readFileSync('backend/export/export.css', 'utf8');
	} catch(e) {
		console.trace(e);
	}
	return css;
}
 
function getPageContent() {
	var css = addCSS();
	var page = $('.inner-page').html();
	var a = String(page);

	var returnValue = '<style>' + css + '</style>' + a;
	return returnValue;
}


String.prototype.pdfName = function() {
	return this + '.pdf';
};






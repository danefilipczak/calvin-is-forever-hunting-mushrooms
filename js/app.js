// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
specimenData = [
		{
			species:'Fuligo septica',
			loc: {lat: 0, lng:0},
			notes: "Found in the cemetary, by the big tree."
		},{
			species:'Amanita muscaria',
			loc: {lat: 0, lng:0},
			notes: "Found by the river, in a largish box of pinecones"
		}
	]







function ViewModel() {
	var self = this;

	this.specimens = ko.observableArray([]);

	specimenData.forEach(function(sData){
		self.specimens.push(new Specimen(sData));
	})

    this.currentSpecimen = ko.observable(self.specimens()[0]);

    this.cameraButtonState = ko.observable('&#128247')
    this.togglePic = function(){
    	if(self.cameraButtonState() == '&#128247'){
    		//this redundent line takes care of asynchonous loading of the url paths
    		self.currentSpecimen(self.currentSpecimen())

    		self.cameraButtonState('&#9940;')
    		//show picture
    		$('#pic').animate({width:window.innerWidth}, 618);
    	} else {
    		self.cameraButtonState('&#128247')
    		$('#pic').animate({width:0}, 618);
    	}
    }

    //this.picSrc = ko.observable("")

    
    
   
}

// Activates knockout.js
app = new ViewModel()
ko.applyBindings(app);




// $.ajax('https://en.wikipedia.org/w/api.php?action=query')

// function getSpeciesByCountry(country){
// 	var url = 'http://apiv3.iucnredlist.org/api/v3/country/getspecies/'
// 	+ country 
// 	+ '?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee';
// 	$.ajax({
// 		url: url,
// 		// dataType: "jsonP",
// 		success: function(response){
// 			var filtered = response.result.filter(function (a) {
// 			    return a.category === 'EN';
// 			});
// 			console.log(filtered);
// 		}
// 	});

// }


// function wikiSpecies(speciesStr){
// 	var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" 
// 	+ speciesStr 
// 	+ "&format=json&callback=wikiCallback";

// 	$.ajax({
// 		url: wikiUrl,
// 		dataType: "jsonP",
// 		success: function(response){
// 			console.log(response);
// 			app.wikiList.removeAll()
// 			response[1].forEach(function(s){
// 				app.wikiList.push({
// 					name: s,
// 					url: 'https://en.wikipedia.org/wiki/' + s
// 				});
// 			});
// 		}
// 	});
// };

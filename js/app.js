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
		},{
			species:'Sarcoscypha coccinea',
			loc: {lat: 0, lng:0},
			notes: "Found across from the churchyard, where love and anxiety meet"
		},{
			species:'Fungi imperfecti',
			loc: {lat: 0, lng:0},
			notes: "Found by the overpass, had to fight a bear for it. "
		},
		{
			species:'Fungi imperfecti',
			loc: {lat: 0, lng:0},
			notes: "Found by the overpass OF THE BAY, had to fight a bear for it. "
		}
	]







function ViewModel() {
	var self = this;

	this.specimens = ko.observableArray([]);

	specimenData.forEach(function(sData){
		self.specimens.push(new Specimen(sData));
	})




    
	//----------------------picture stuff
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



    //current specimen stuff
    this.currentSpecimen = ko.observable();

    this.setCurrentSpecimen = function(spec){
    	if(self.currentSpecimen()){self.currentSpecimen().isSelected(false)};
    	self.currentSpecimen(spec);
    	self.currentSpecimen().isSelected(true);
    }

    this.setCurrentSpecimen(self.specimens()[0]);
    //this.picSrc = ko.observable("")





    //get an array of unique species identifiers 
    this.species = [];
    this.specimens().forEach(function(s){
    	self.species.push(s.species)
    })
    this.species = this.species.filter(function (e, i, arr) {
	    return arr.lastIndexOf(e) === i;
	});

	

	var temp = [];
	for(var i = 0; i<this.species.length; i++){
		temp.push(new Species(this.species[i]));
	}
	this.species = temp;


	this.currentSpecies = ko.observable();
	this.setCurrentSpecies = function(s){
		if(self.currentSpecies() instanceof Species){self.currentSpecies().isSelected(false)};
		self.currentSpecies(s);
		self.currentSpecies().isSelected(true);
		self.revealSpecies();

	}

	

    this.revealSpecies = function(){
    	console.log('reveal')
    }


    var all = new Species('All');
	this.species.push(all);
	this.setCurrentSpecies(this.species[this.species.length-1]);
	this.species.reverse();
    
   
}

// Activates knockout.js
app = new ViewModel()
ko.applyBindings(app);


//helper function 
function filterList() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}



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

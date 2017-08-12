// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI




function ViewModel() {
	var self = this;

	this.specimens = ko.observableArray([]);

	specimenData.forEach(function(sData){
		self.specimens.push(new Specimen(sData));
	})




    
	//----------------------picture 
    this.cameraButtonState = ko.observable('&#x1F50D')
    this.togglePic = function(){
    	if(self.cameraButtonState() == '&#x1F50D'){
    		//this redundent line takes care of asynchonous loading of the url paths
    		self.currentSpecimen(self.currentSpecimen())

    		self.cameraButtonState('&#9940;')
    		//show picture
    		$('#pic').animate({width:window.innerWidth}, 700);
    		$('#species').show(1000)
    		$('#species').scrollTop(0);
    		$('#camera').animate({marginLeft:0}, 1000);
    		$('.speciesThumbnail').hide(700)
    	} else {
    		self.cameraButtonState('&#x1F50D')
    		$('#pic').animate({width:0}, 1000);
    		$('#species').hide(500)
    		var margin = window.innerWidth*0.25;
    		$('#camera').animate({marginLeft: margin }, 1000);
    		$('.speciesThumbnail').show(1300)
    	}
    }



    //------------------------current specimen 
    this.currentSpecimen = ko.observable();

    this.setCurrentSpecimen = function(spec){
    	if(self.currentSpecimen()){self.currentSpecimen().isSelected(false)};
    	self.currentSpecimen(spec);
    	self.currentSpecimen().isSelected(true);
    }

    this.setCurrentSpecimen(self.specimens()[0]);



    this.setCurrentSpecimenFromId = function(id){
		self.currentSpecimen().isSelected(false)

		var found;
		self.specimens().forEach(function(s){
			if(s.id == id){
				found = s;
			}
		});

		self.currentSpecimen(found);
		self.currentSpecimen().isSelected(true);
	}
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
		self.revealSpecies(s.name);

	}

	this.setCurrentSpeciesFromString = function(string){
		self.currentSpecies().isSelected(false)

		var found;
		self.species.forEach(function(s){
			if(s.name == string){
				found = s;
			}
		});

		self.currentSpecies(found);
		self.currentSpecies().isSelected(true);
	}

	

    this.revealSpecies = function(speciesString){
    	console.log('reveal'+speciesString)
    	
    	markers.forEach(function(m){
    		if(speciesString !== 'All'){
	    		if(m.species == speciesString){
	    			m.marker.setMap(map);
	    			m.marker.setAnimation(google.maps.Animation.DROP);
	    		} else {
	    			m.marker.setMap(null);
	    		}
	    	} else {
	    		m.marker.setMap(map);
	    		m.marker.setAnimation(google.maps.Animation.DROP);
	    	}
    	})

    	//close all the infoWindows
    	markers.forEach(function(m){
    		m.infoWindow.close();
    	})

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




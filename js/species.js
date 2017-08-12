globalSpecimenCounter = 0;


function Species(name){
		this.name = name;
		this.isSelected = ko.observable(false);
		this.path;
		this.excerpt;

		if(this.name!= 'All'){
			this.getWikiImgSrc();
			this.getWikiExcerpt(this.name);
		} else {
			this.getWikiExcerpt('Fungus')
		}
		
}

Species.prototype.getWikiExcerpt = function(article){
	var self = this;
	//var articleName = this.name;
	var url = 'https://en.wikipedia.org/w/api.php?&format=json&action=query&prop=extracts&exintro=&explaintext=&titles='
	+ article;
	$.ajax({
		url: url,
		dataType: "jsonp",
		success: function(r){
			var pageId = r.query.pages;
	        pageId = Object.keys(pageId)[0];
	        var excerpt = r.query.pages[pageId].extract;
			
			self.excerpt = excerpt;
		}
	})
}

Species.prototype.getWikiImgSrc = function(articleName){
	var self = this;
	var articleName = this.name;
//a multi-step process; first, query the page name and get a list of images, then make a second request to obtain the actual url of that image
	var url1 = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + articleName + '&prop=pageimages&format=json';
	$.ajax({
	    url: url1,
	    dataType: "jsonp",
	    success: function(r){
	        
	        //extract the page ID from the reponse
	        var pageId = r.query.pages;
	        pageId = Object.keys(pageId)[0];
	        

	        //then use it to get the img location
	        var imgFile = r.query.pages[pageId].pageimage;
	        var url2 = "https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + imgFile + "&prop=imageinfo&iiprop=url&format=json"
	        $.ajax({
	        	url: url2, 
	        	dataType: "jsonp",
	        	success: function(res){
	        		var pageId = res.query.pages;
	        		pageId = Object.keys(pageId)[0];
	        		var path = res.query.pages[pageId].imageinfo[0].url;
	        		self.path = path;
	        	}
	        });
	    	}
	    }
	)
};

function Specimen(data) {
	var self = this;
	this.species = data.species || 'fungus amungus';
	this.loc = data.loc || {lat: 334322, lng: 42222};

	this.notes = data.notes;

	//asign each specimen a unique id integer in case there are duplicate instances of the same species
	this.id = globalSpecimenCounter++;

	//makes an ajax call to wikipedia to locate an image of this species
	this.path = '';

	this.isSelected = ko.observable(false);



	this.getWikiImgSrc();
}



Specimen.prototype.getWikiImgSrc = function(articleName){
	var self = this;
	articleName = this.species;
//a multi-step process; first, query the page name and get a list of images, then make a second request to obtain the actual url of that image
	var url1 = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + articleName + '&prop=pageimages&format=json';
	$.ajax({
	    url: url1,
	    dataType: "jsonp",
	    success: function(r){
	        
	        //extract the page ID from the reponse
	        var pageId = r.query.pages;
	        pageId = Object.keys(pageId)[0];
	        //console.log(pageId)

	        //then use it to get the img location
	        var imgFile = r.query.pages[pageId].pageimage;
	        // console.log(imgFile);
	        // var url2 = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + imgFile + '&prop=imageinfo&iiprop=url&format=json'
	        var url2 = "https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + imgFile + "&prop=imageinfo&iiprop=url&format=json"
	        $.ajax({
	        	url: url2, 
	        	dataType: "jsonp",
	        	success: function(res){
	        		var pageId = res.query.pages;
	        		pageId = Object.keys(pageId)[0];
	        		var path = res.query.pages[pageId].imageinfo[0].url;
	        		// console.log(path)
	        		// console.log(res)
	        		self.path = path;
	        	}
	        });
	    	}
	    }
	)
};



// function Species(species){
// 	this.species = species;
// }




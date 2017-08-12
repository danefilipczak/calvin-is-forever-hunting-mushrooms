var map;
var markers = [];




styles = 


[
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0F0919"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                // "color": "#002FA7"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#E60003"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#465127"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#FFED00"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#D41C1D"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#BF0000"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                // "saturation": 100,
                "visibility": "off"
            }
        ]
    }
]

function mapObject(s){
	var self = this;

	this.id = s.id;
	this.species = s.species;

	var content = '<span style = "background-color:black; color:white; padding:10px; font-family:helvetica; font-size:20px">' 
	+ 'latitude: '
	+ s.loc.lat 
	+ '  ' + ' longitude: '
	+ s.loc.lng
	+'</span>'

	this.marker = new google.maps.Marker({
		position: s.loc,
		map: map,
		animation: google.maps.Animation.DROP,
  			icon:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
	});
	this.infoWindow = new google.maps.InfoWindow({
		content: content
	})
	this.marker.addListener('click', function(){
		markers.forEach(function(m){
			m.infoWindow.close();
		})
		self.infoWindow.open(map, self.marker);
		app.setCurrentSpeciesFromString(self.species);
		app.setCurrentSpecimenFromId(self.id)
	})

}

function initMap() {
	


    map = new google.maps.Map(document.getElementById('map'), {
  
      center: {lat: 40.4443, lng: -79.9532},
      styles: styles,
      zoom: 13,
      mapTypeControl:false
    });

    app.specimens().forEach(function(s){
    	markers.push(new mapObject(s));
    })
    
		 map.controls[google.maps.ControlPosition.TOP_CENTER].push($('.main')[0]);
}


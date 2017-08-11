var map;
var markers = [];

// function initMap(){
// 	$('#map')[0]
// 	map = new google.maps.Map(document.getElementById('map'), {
// 		center: {lat: 40.8674958, lng: -73.8374625},
// 		zoom: 13
// 	});
// 	console.log('h')

// }


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


function initMap() {
	


    map = new google.maps.Map(document.getElementById('map'), {
    	mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.BOTTOM_CENTER
       },
      center: {lat: 40.4443, lng: -79.9532},
      styles: styles,
      zoom: 13
    });

    app.specimens().forEach(function(s){
    	markers.push({
    		id: s.id,
    		marker: new google.maps.Marker({
    			position: s.loc,
    			map: map,
    			animation: google.maps.Animation.DROP
    		})
    	})
    })
    



//     var centerControlDiv = $('.main')[0];
		// var centerControl = new google.CenterControl(centerControlDiv, map);

		// centerControlDiv.index = 1;
		 map.controls[google.maps.ControlPosition.TOP_CENTER].push($('.main')[0]);
}


// $( "#species" ).mouseleave(function() {
//   $( "#map" )[0].focus();
//   console.log('speciesleave')
//   $('#pic').animate({width:0}, 618)
// });


// $( "#species" ).mouseenter(function() {
//   $( "#map" )[0].focus();
//   console.log('speciesover')
//   width = window.innerWidth;
//   $('#pic').animate({width:width}, 618);

// });
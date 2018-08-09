//create map

var apiKey = "pk.eyJ1IjoidHVuZ2siLCJhIjoiY2ppZHo4OXIwMGd0NDNrcGkzZDV0ZXE2eCJ9.t1Xpklyzo_R5_G8bJ_ygxg";

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: apiKey
});

var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-satellite",
  accessToken: apiKey
});

var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: apiKey
});

// We then create the map object with options. Adding the tile layers we just
// created to an array of layers.
var map = L.map("mapid", {
  center: [40.7, -94.5],
  zoom: 3,
  layers: [darkmap, satellitemap, outdoormap]
});

// Adding our 'graymap' tile layer to the map.
darkmap.addTo(map);



// We create the layers for our two different sets of data, earthquakes and tectonicplates.
var tectonicplates = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

// Defining an object that contains all of our different map choices. Only one
// of these maps will be visible at a time!
var baseMaps = {
  Satellite: satellitemap,
  Darkmap: darkmap,
  Outdoors: outdoormap
};

// We define an object that contains all of our overlays. Any combination of
// these overlays may be visible at the same time!
var overlayMaps = {
  "Tectonic Plates": tectonicplates,
  Earthquakes: earthquakes
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control
  .layers(baseMaps, overlayMaps)
  .addTo(map);


/*********************
  
//first data query url 
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

//second data Tectonic plates url
var TectonicPlatesUrl = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_plates.json"

//GET requests to query URL
ds.json(queryUrl, function(data){
    //send data.Features object to the function
    createfeatures(data.features);
});

function createFeatures(earthquakeData){
    var earthquakes = L.geoJson(earthquakeData, {
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3>"+ feature.properties.place + "<br> Magnitude: "+ feature.properties.mag + "</h3><hr><p>"
                        + new DAte(feature.properties.time) + "</p>")
        },
        pointToLayer: function(feature, lating){
            return new L.circle(latlng,
                {radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.properties.mag),
                fillOpacity: .7,
                stroke: true,
                color:"black",
                weight: .5
                })
        }
    }
  };

//sending earthquakes layer to createMap function
    createMap(earthquakes)
}


function createMap(earthquakes){

    var apiKey = "pk.eyJ1IjoidHVuZ2siLCJhIjoiY2ppZHo4OXIwMGd0NDNrcGkzZDV0ZXE2eCJ9.t1Xpklyzo_R5_G8bJ_ygxg";

    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  	attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery � <a href='https://www.mapbox.com/'>Mapbox</a>",
  	maxZoom: 18,
  	id: "mapbox.streets-satellite",
  	accessToken: apiKey
	});

    //streetmap and darkmap layers
    var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  	attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery � <a href='https://www.mapbox.com/'>Mapbox</a>",
  	maxZoom: 18,
  	id: "mapbox.outdoors",
  	accessToken: apiKey
	});

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  	attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery � <a href='https://www.mapbox.com/'>Mapbox</a>",
  	maxZoom: 18,
  	id: "mapbox.light",
  	accessToken: apiKey
	});

    // Define a basemap object to hold our base layers
  var basemap = {
    "Satellite Map": satellitemap,
    "Outdoor Map": outdoormap,
    "Dark Map": darkmap
  }; 

  // Create our map, giving it the basetmap and earthquakes layers to display on load
    var map = L.map("mapid", {
  	center: [37.09, -94.71],
  	zoom: 3,
  	layers: [darkmap, satellitemap, outdoormap]
     });
  
   // Add a tectonic plate layer
  var tectonicPlates = new L.LayerGroup();

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    "Tectonic Plates": tectonicPlates
  };

  d3.json(TectonicPlatesUrl, function(plateData){
      .addTo(tectonicPlates);
  });
  
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

}; 

//Create legend
var legend = L. control({position:'bottomright'});
  legend.onAdd = function (map){
    var div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1, 2, 3, 4, 5], 
              labels = [];

  //loop thru intervals and create label
    for (var i=0; i<grades.length; i++){
      div.innerHTML +=
      '<i style="background:' + getColor(grades[i] +1) + "></i>" +
      grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>': '+');
    }
    return div;
  };

  legend.addTo(map);
  //color of marker based on magnitude of the earthquake
  getColor(mag){
    switch (true){
    case mag > 5:
      return "FF3300";
    case mag > 4:
      return "FF9900";
    case mag > 3:
      return "FFCC00";
    case mag > 2:
      return "FFFF00";
    case mag > 1:
      return "FFFF99";
    default:
      return "FF6600"
    }
  }

  //returns radius of the earthquake marker based on its magnitude
function getRadius(mag){
  if (mag == 0){
    return 1;
  }
  return mag*4;
}
**************/
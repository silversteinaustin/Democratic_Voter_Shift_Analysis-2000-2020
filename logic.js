// Importing the API key
import { config } from "../../Config.js";

// Declaring three overlay groups
var PartiesLayer = new L.layerGroup();
var MarriageRateLayer = new L.layerGroup();
var DivorceRateLayer = new L.layerGroup();

var overlays = {
  "Percent Change in Democratic Votes": PartiesLayer,
  "Marriage Rate Percent Change": MarriageRateLayer,
  "Divorce Rate Percent Change": DivorceRateLayer
};

// Adding the tile layers
var geoLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Base layers
var baseLayers = {
  US_Map: geoLayer
};

// Creating the map object
var myMap = L.map("map", {
  center: [37.6000, -95.6650],
  zoom: 2.5,
  layers: [geoLayer, PartiesLayer, MarriageRateLayer, DivorceRateLayer]
});

// Layer control
L.control.layers(baseLayers, overlays, {
  collapsed: false
}).addTo(myMap);

// Define a getColor function based on the layer name
function getColor(layerName, depth) {
  if (layerName === 'MarriageRateLayer') {
    // Define color ranges for positive values
    return depth >= 2.0 ? "#4B0082" : // Darkest purple for changes >= 2.0
        depth < 2.0 && depth >= 1.75 ? "#6A0DAD" :
        depth < 1.75 && depth >= 1.5 ? "#7B1FA2" :
        depth < 1.5 && depth >= 1.25 ? "#8A2BE2" :
        depth < 1.25 && depth >= 1.0 ? "#9932CC" :
        depth < 1.0 && depth >= 0.75 ? "#BA55D3" :
        depth < 0.75 && depth >= 0.5 ? "#DA70D6" :
        depth < 0.5 && depth >= 0.25 ? "#DDA0DD" :
        depth < 0.25 && depth >= 0 ? "#EE82EE" :
        depth < 0 && depth >= -0.5 ? "#F8B8FF" :
        depth < -0.5 && depth >= -1.0 ? "#FFC0CB" : // Lightest purple for changes -0.5 to -1.0
        '#FFFFFF';

  

  } else if (layerName === 'DivorceRateLayer') {
    return depth >= 0.8 ? "#FF0000" : // Darkest red for the highest positive changes
        depth < 0.8 && depth >= 0.6 ? "#FF1919" :
        depth < 0.6 && depth >= 0.4 ? "#B22222" :
        depth < 0.4 && depth >= 0.2 ? "#FF3232" :
        depth < 0.2 && depth >= 0 ? "#FF4B4B" : // Light red for positive changes close to zero
        // Use lighter reds/pinks for negative percent changes
        depth < 0 && depth >= -0.2 ? "#FF6464" : // Light pink for negative changes close to zero
        depth < -0.2 && depth >= -0.4 ? "#FF7D7D" :
        depth < -0.4 && depth >= -0.6 ? "#FF9696" :
        depth < -0.6 && depth >= -0.8 ? "#FFAFAF" :
        depth < -0.8 ? "#FFC8C8" : // Lightest pink for negative changes
        '#FFFFFF'; // Fallback color for no data
      

  } else if (layerName === 'PartiesLayer') {
    return depth >= 0.1 ? "#0015BC" : // Darkest blue for the highest positive changes
        depth < 0.1 && depth >= 0.05 ? "#0033DA" :
        depth < 0.05 && depth >= 0.01 ? "#3366FF" :
        depth < 0.01 && depth >= 0 ? "#6699FF" : // Lighter blue for positive changes close to zero
        // Use a very faint blue for negative percent changes
        depth < 0 ? "#CCDDFF" : // Very faint blue for negative changes
        '#FFFFFF'; // Fallback color for no data or an error in the data
}
}
function styleMarriageRate(feature) {
  let depth = feature.properties.PercentChange;
  return {
    fillColor: getColor('MarriageRateLayer', depth),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

function styleDivorceRate(feature) {
  let depth = feature.properties.PercentChange;
  return {
    fillColor: getColor('DivorceRateLayer', depth),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

function styleParties(feature) {
  let depth = feature.properties.PercentChange;
  return {
    fillColor: getColor('PartiesLayer', depth),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}
// Custom Info Control
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); 
    this.update();
    return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>20 Year Percent Change (Elections Years: 2000-2020) </h4>' +  (props ?
      '<b>' + props.State + '</b> <br />' + (props.PercentChange * 100 ).toFixed(2) + ' % Change'
      : 'Hover over a state for more information on each states % change');
};

info.addTo(myMap);

// Modified listeners for updating the info control
function highlightFeature(e) {
  var layer = e.target;

  // Example of highlight logic: change style of the feature
  layer.setStyle({
      weight: 5,      
      color: '#666',    
      dashArray: '',    
      fillOpacity: 0.7  
  });

  // This ensures that the border highlight doesn't get lost behind other layers
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }

  // Update the info control based on the properties of the hovered feature
  info.update(layer.feature.properties);
}

// Global variables to store references to L.GeoJSON layers
var marriageRateGeoJsonLayer, divorceRateGeoJsonLayer, partiesGeoJsonLayer;

function resetHighlight(e) {
  var layer = e.target;

  // Determine which GeoJSON layer to use based on the layer group
  if (layer.feature.properties.layerType === 'MarriageRateLayer') {
    marriageRateGeoJsonLayer.resetStyle(layer);
  } else if (layer.feature.properties.layerType === 'DivorceRateLayer') {
    divorceRateGeoJsonLayer.resetStyle(layer);
  } else if (layer.feature.properties.layerType === 'PartiesLayer') {
    partiesGeoJsonLayer.resetStyle(layer);
  }

  // Update the info control to remove feature-specific information
  info.update();
}

function processGeoJSONData(data, layer) {
  var geoJsonLayer = L.geoJSON(data, {
    style: function (feature) {
      // Assign layerType property to each feature for later reference
      feature.properties.layerType = layer === MarriageRateLayer ? 'MarriageRateLayer' :
                                     layer === DivorceRateLayer ? 'DivorceRateLayer' :
                                     'PartiesLayer';
      return layer === MarriageRateLayer ? styleMarriageRate(feature) :
             layer === DivorceRateLayer ? styleDivorceRate(feature) :
             styleParties(feature);
    },
    onEachFeature: function (feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
      });
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
      }
    }
  }).addTo(layer); 

  // Store reference to the GeoJSON layer
  if (layer === MarriageRateLayer) {
    marriageRateGeoJsonLayer = geoJsonLayer;
  } else if (layer === DivorceRateLayer) {
    divorceRateGeoJsonLayer = geoJsonLayer;
  } else if (layer === PartiesLayer) {
    partiesGeoJsonLayer = geoJsonLayer;
  }
}


// Function to fetch GeoJSON data
const fetchGeoJSON = async function(url, layer) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch GeoJSON data (HTTP ${response.status})`);
    }
    const data = await response.json();
    processGeoJSONData(data, layer);
  } catch (error) {
    console.error(error);
  }
}

// Fetching GeoJSON for different layers
fetchGeoJSON('../Marriage.geojson', MarriageRateLayer);
fetchGeoJSON('../Divorce.geojson', DivorceRateLayer);
fetchGeoJSON('../Parties.geojson', PartiesLayer);

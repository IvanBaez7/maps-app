// Leaflet Map Initialization
const map = L.map('map', {
  zoomControl: true,
  scrollWheelZoom: true,
}).setView([37.5, -95], 4.5);

import config from './map.prod.js';

// Thunderforest Tile URLs
const thunderforestTiles = {
  Outdoors: `https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=${config.apiKey}`,
  Cycle: `https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${config.apiKey}`,
  Landscape: `https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${config.apiKey}`,
  Transport: `https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=${config.apiKey}`,
  TransportDark: `https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=${config.apiKey}`,
  Pioneer: `https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${config.apiKey}`,
  MobileAtlas: `https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=${config.apiKey}`,
  Neighbourhood: `https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${config.apiKey}`,
  SpinalMap: `https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=${config.apiKey}`,
};

// Export the modified tile URLs
export { thunderforestTiles };

// Default Thunderforest Outdoors Layer
const defaultLayer = L.tileLayer(thunderforestTiles.Outdoors, {
  attribution:
    'Tiles by <a href="http://www.thunderforest.com/">Thunderforest</a>',
}).addTo(map);

// Thunderforest Layers Object
const thunderforestLayers = {
  Outdoors: L.tileLayer(thunderforestTiles.Outdoors, {
    attribution:
      'Tiles by <a href="http://www.thunderforest.com/">Thunderforest</a>',
  }),
  Cycle: L.tileLayer(thunderforestTiles.Cycle, {
    attribution:
      'Tiles by <a href="http://www.thunderforest.com/">Thunderforest</a>',
  }),
  Landscape: L.tileLayer(thunderforestTiles.Landscape, {
    attribution:
      'Tiles by <a href="http://www.thunderforest.com/">Thunderforest</a>',
  }),
  Transport: L.tileLayer(thunderforestTiles.Transport, {
    attribution:
      'Tiles by <a href="http://www.thunderforest.com/">Thunderforest</a>',
  }),
  TransportDark: L.tileLayer(thunderforestTiles.TransportDark, {
    attribution:
      'Tiles by <a href="http://www.thunderforest.com/">Thunderforest</a>',
  }),
  Pioneer: L.tileLayer(thunderforestTiles.Pioneer, {
    attribution:
      'Tiles by <a href="http://www.thunderforest.com/">Thunderforest</a>',
  }),
  MobileAtlas: L.tileLayer(thunderforestTiles.MobileAtlas, {
    attribution:
      'Tiles by <a href="http://www.thunderforest.com/">Thunderforest</a>',
  }),
  Neighbourhood: L.tileLayer(thunderforestTiles.Neighbourhood, {
    attribution:
      'Tiles by <a href="http://www.thunderforest.com/">Thunderforest</a>',
  }),
  SpinalMap: L.tileLayer(thunderforestTiles.SpinalMap, {
    attribution:
      'Tiles by <a href="http://www.thunderforest.com/">Thunderforest</a>',
  }),
};

// Layer Control to Switch Between Thunderforest Layers
L.control.layers(thunderforestLayers).addTo(map);

// Scale Control
L.control.scale().addTo(map);

// Geolocation Control
L.control
  .locate({
    position: 'topright',
    strings: {
      title: 'Show me where I am',
    },
    locateOptions: {
      enableHighAccuracy: true,
    },
    setView: 'once',
  })
  .addTo(map);

let markers = []; // Array to hold draggable markers

// Function to initialize a draggable marker at a specific geographic point on the map
function initializeDraggableMarker(latlng) {
  const customIcon = L.divIcon({
    className: 'custom-pin',
    html: '📍', // Customize marker appearance as emoji or HTML
    iconAnchor: [12, 24], // Adjust the anchor point if needed
  });

  // Create a new draggable marker
  const marker = L.marker(latlng, {
    icon: customIcon,
    draggable: true,
  }).addTo(map);

  // Add click event listener to remove the marker when clicked
  marker.on('click', function () {
    map.removeLayer(marker); // Remove the clicked marker from the map
    markers = markers.filter((m) => m !== marker); // Remove the marker from the markers array
  });

  // Add dragend event listener to update marker's position after dragging
  marker.on('dragend', function (event) {
    const updatedMarker = event.target;
    const newPosition = updatedMarker.getLatLng(); // Get updated marker position
    initializeDraggableMarker(newPosition); // Reinitialize marker at the new position
  });

  // Add the marker to the markers array
  markers.push(marker);
}

// Event listener for map click to place a new draggable marker
map.on('click', function (event) {
  const { lat, lng } = event.latlng;
  const clickedLatLng = L.latLng(lat, lng);

  // Initialize a new draggable marker at the clicked location
  initializeDraggableMarker(clickedLatLng);
});

// Handle Location Found Event
map.on('locationfound', (e) => {
  const { lat, lng } = e.latlng;
  const locationLatLng = L.latLng(lat, lng);
});

// Handle Location Error Event
map.on('locationerror', (e) => {
  alert(`Error finding your location: ${e.message}`);
});

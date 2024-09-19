// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Set up a custom icon for the vehicle marker
// const vehicleIcon = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png', // Example vehicle icon
//   iconSize: [25, 25], // Adjust size as necessary
//   iconAnchor: [12.5, 12.5]
// });

// const center = [17.385044, 78.486671];

// const Map = () => {
//   const [vehiclePosition, setVehiclePosition] = useState(center);
//   const [path, setPath] = useState([center]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetch('http://localhost:5000/api/vehicle') // Fetch from the backend
//         .then((response) => response.json())
//         .then((data) => {
//           const newPosition = [data.latitude, data.longitude];
//           setVehiclePosition(newPosition);
//           setPath((prevPath) => [...prevPath, newPosition]);
//         });
//     }, 5000); // Update every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <MapContainer center={vehiclePosition} zoom={15} style={{ height: '400px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={vehiclePosition} icon={vehicleIcon} />
//       <Polyline 
//         positions={path} 
//         color="#4B0082"  // Deep wine color
//         weight={4}       // Thickness of the polyline
//         opacity={0.8}    // Opacity of the polyline
//       />
//     </MapContainer>
//   );
// };

// export default Map;


import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Set up a custom icon for the vehicle marker
const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png', // Example vehicle icon
  iconSize: [25, 25], // Adjust size as necessary
  iconAnchor: [12.5, 12.5]
});

const center = [17.385044, 78.486671];

const Map = () => {
  const [vehiclePosition, setVehiclePosition] = useState(center);
  const [path, setPath] = useState([center]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:5000/api/vehicle') // Fetch from the backend
        .then((response) => response.json())
        .then((data) => {
          const newPosition = [data.latitude, data.longitude];
          setVehiclePosition(newPosition);
          setPath((prevPath) => [...prevPath, newPosition]);
        });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch locations data
    fetch('http://localhost:5000/api/locations')
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <MapContainer center={vehiclePosition} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={vehiclePosition} icon={vehicleIcon} />
      <Polyline 
  positions={path} 
  color="#FF6347"  // Tomato color for better visibility
  weight={4}       // Thickness of the polyline
  opacity={0.8}    // Opacity of the polyline
/>
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.latitude, loc.longitude]}>
          <Popup>{loc.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

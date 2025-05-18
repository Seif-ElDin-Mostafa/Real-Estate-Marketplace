import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

function Sale() {
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [furnished, setFurnished] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [position, setPosition] = useState([51.505, -0.09]); // الموقع الافتراضي (لندن)
  const [sellerId, setSellerId] = useState(''); // إضافة sellerId
  const [isSold, setIsSold] = useState(false); // إضافة isSold

  // دالة لمعالجة النقر على الخريطة
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return position === null ? null : <Marker position={position} />;
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImages([file]); 
    setPreviewImages([URL.createObjectURL(file)]);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
     const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const base64Image = images[0] ? await convertToBase64(images[0]) : '';
  const propertyData = {
  price,
  address: location,  
  beds: bedrooms,
  baths: bathrooms,
  sellerId,
  isSold,
  image: base64Image
  }; 
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MWUwODJkNTBmMWZlMzE4YTQzYzBhNyIsInVzZXJuYW1lIjoiYWRtaW5Vc2VyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ2ODAxNjMyfQ.8KDt3-7MpcISA_FjsCwcADGHuZucBcJL9osVTsxCqbo"
    const res = await fetch("http://localhost:3000/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(propertyData)
    }); 

    const result = await res.json();
    console.log('Response:', result);
    alert("Property listed successfully!");
    // Reset
    setLocation('');
    setBedrooms('');
    setBathrooms('');
    setPrice('');
    setImages([]);
    setFurnished(false);
    setPreviewImages([]);
    setPosition([51.505, -0.09]);
    setSellerId('');
    setIsSold(false);
  } catch (error) {
    console.error("Error submitting property:", error);
    alert("Something went wrong.");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">RealEstate</h1>
        <div className="flex items-center space-x-2">
          <Link to="/">
            <button className="bg-blue-500 text-white px-2 py-1 rounded">Back to Home</button>
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-6">
        <h2 className="text-2xl font-bold mb-4">List Your Property for Sale</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter property location"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Map */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Select Location on Map</label>
            <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
            <p className="text-gray-600 mt-2">
              Selected Coordinates: Lat: {position[0]}, Lng: {position[1]}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Number of Bedrooms</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              placeholder="Enter number of bedrooms"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Number of Bathrooms</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              placeholder="Enter number of bathrooms"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Seller ID</label>
            <input
              type="text"
              value={sellerId}
              onChange={(e) => setSellerId(e.target.value)}
              placeholder="Enter seller ID"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSold}
              onChange={(e) => setIsSold(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Property is Sold</label>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex space-x-2 mt-2">
              {previewImages.map((preview, index) => (
                <img key={index} src={preview} alt="Preview" className="w-20 h-20 object-cover rounded" />
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={furnished}
              onChange={(e) => setFurnished(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Furnished</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            List Property
          </button>
        </form>

        {location && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="text-xl font-semibold mb-2">Property Preview</h3>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Coordinates:</strong> Lat: {position[0]}, Lng: {position[1]}</p>
            <p><strong>Bedrooms:</strong> {bedrooms}</p>
            <p><strong>Bathrooms:</strong> {bathrooms}</p>
            <p><strong>Price:</strong> ${price.toLocaleString()}</p>
            <p><strong>Seller ID:</strong> {sellerId}</p>
            <p><strong>Is Sold:</strong> {isSold ? 'Yes' : 'No'}</p>
            <p><strong>Furnished:</strong> {furnished ? 'Yes' : 'No'}</p>
            <div className="flex space-x-2 mt-2">
              {previewImages.map((preview, index) => (
                <img key={index} src={preview} alt="Preview" className="w-20 h-20 object-cover rounded" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sale;
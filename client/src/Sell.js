import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Sale() {
  const [address, setLocation] = useState('');
  const [beds, setBedrooms] = useState('');
  const [baths, setBathrooms] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [furnished, setFurnished] = useState(false);
  const [previewImages, setPreviewImages] = useState([]); // الموقع الافتراضي (لندن)
  const [sellerId, setSellerId] = useState(''); // إضافة sellerId
  const [isSold, setIsSold] = useState(false); // إضافة isSold

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
  address: address,  
  beds: beds,
  baths: baths,
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
              value={address}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter property location"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

         

          <div>
            <label className="block text-gray-700 font-medium mb-1">Number of Bedrooms</label>
            <input
              type="number"
              value={beds}
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
              value={baths}
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

          

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            List Property
          </button>
        </form>

        {address && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="text-xl font-semibold mb-2">Property Preview</h3>
             <p><strong>Price:</strong> ${price}</p>
            <p><strong>address:</strong> {address}</p>
            <p><strong>Bedrooms:</strong> {beds}</p>
            <p><strong>Bathrooms:</strong> {baths}</p>          
            <p><strong>Seller ID:</strong> {sellerId}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sale;
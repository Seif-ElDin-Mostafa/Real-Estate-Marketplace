import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

async function fetchProperties() {
  const response = await axios.get('http://localhost:5000/property/');
  return response.data;
}

function Buy() {
  // حالة الفلاتر (لسه موجودة بس مش هتأثر)
  const [propertyType, setPropertyType] = useState('All Types');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [areaRange, setAreaRange] = useState('');
  
  const properties = fetchProperties();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">RealEstate</h1>
        <div className="flex items-center space-x-2">
            <input
            type="text"
            placeholder="Search..."
            className="border p-1 rounded"
          />
          <button className="bg-blue-500 text-white px-2 py-1 rounded">Search</button>
          <Link to="/">
            <button className="bg-blue-500 text-white px-2 py-1 rounded">Back to Home</button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap space-x-2 mb-4">
        {/* فلتر نوع العقار */}
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          <option>All Types</option>
          <option>Apartment</option>
          <option>House</option>
          <option>Villa</option>
        </select>

        {/* فلتر عدد الغرف */}
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          <option value="">All Bedrooms</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>

        {/* فلتر السعر */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          <option value="">All Prices</option>
          <option value="0-5000000">Up to $5M</option>
          <option value="5000001-10000000">$5M - $10M</option>
          <option value="10000001-20000000">$10M - $20M</option>
          <option value="20000001">Above $20M</option>
        </select>

        {/* فلتر المساحة */}
        <select
          value={areaRange}
          onChange={(e) => setAreaRange(e.target.value)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          <option value="">All Areas</option>
          <option value="0-100">Up to 100 m²</option>
          <option value="101-150">101 - 150 m²</option>
          <option value="151-200">151 - 200 m²</option>
          <option value="201">Above 200 m²</option>
        </select>

        {/* فلتر عدد الحمامات */}
        <select
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          <option value="">All Bathrooms</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="bg-white p-4 rounded shadow">
            <img
              src={property.image}
              alt={property.type}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{property.type} to Buy</h3>
            <p className="text-gray-600">
              {property.beds} Beds | {property.baths} Baths | {property.area} m²
            </p>
            <p className="text-green-600 font-bold mt-2">${property.price.toLocaleString()}</p>
            <div className="flex space-x-2 mt-2 justify-center">
              <button className="bg-green-500 text-white px-2 py-1 rounded">Call</button>
              <button className="bg-blue-500 text-white px-2 py-1 rounded">Chat</button>
              <button className="bg-blue-500 text-white px-12 py-1 rounded w-60 ">Buy</button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buy;
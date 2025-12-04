import React, { useEffect, useState } from "react";
import {
  getRentals,
  createRental,
  updateRental,
  deleteRental,
} from "../services/api";

export default function AdminRentals() {
  const [rentals, setRentals] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // For edit preview

  const [form, setForm] = useState({
    vehicleName: "",
    vehicleType: "",
    seats: "",
    fuel: "",
    description: "",
    image: null, // File object
    features: "",
    available: true,
  });

  // Backend URL for images (FIX: Strip /api from API_URL for static files)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const BASE_URL = API_URL.replace('/api', ''); // e.g., 'http://localhost:5000'
  const getImageUrl = (imagePath) => {
    const url = imagePath ? `${BASE_URL}${imagePath}` : '/placeholder.jpg';
    console.log("Image URL for", imagePath, ":", url); // Debug: Check console for correct URLs
    return url;
  };

  // Load rentals
  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    try {
      console.log("Fetching rentals..."); // Debug
      const res = await getRentals();
      console.log("Rentals fetched:", res.data); // Debug
      setRentals(res.data || []);
    } catch (error) {
      console.error("Error loading rentals:", error); // Debug
      alert("Error loading rentals: " + (error.response?.data?.message || error.message));
      // Retry once
      setTimeout(loadRentals, 2000);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    let value = e.target.name === "available" ? e.target.checked : e.target.value;

    if (e.target.name === "image") {
      value = e.target.files[0];
      if (value) {
        const reader = new FileReader();
        reader.onload = (e) => setCurrentImage(e.target.result); // Preview
        reader.readAsDataURL(value);
      } else {
        setCurrentImage(""); // Clear preview
      }
    }

    setForm({ ...form, [e.target.name]: value });
  };

  // Save or update rental
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form); // Debug

    // Frontend validation for numbers
    const seatsNum = Number(form.seats);
    if (isNaN(seatsNum) || seatsNum < 1) {
      alert("Seats must be a valid number greater than 0!");
      return;
    }

    if (!form.image && !editingId) {
      alert("Please select an image!");
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("vehicleName", form.vehicleName);
    formData.append("vehicleType", form.vehicleType);
    formData.append("seats", seatsNum.toString()); // Ensure valid number
    formData.append("fuel", form.fuel);
    formData.append("description", form.description);
    formData.append("features", form.features);
    formData.append("available", form.available.toString());

    if (form.image && form.image.size > 0) {
      formData.append("image", form.image);
    }

    try {
      if (editingId) {
        await updateRental(editingId, formData);
        alert("Rental updated!");
      } else {
        await createRental(formData);
        alert("Rental created!");
      }

      // Reset
      setForm({
        vehicleName: "",
        vehicleType: "",
        seats: "",
        fuel: "",
        description: "",
        image: null,
        features: "",
        available: true,
      });
      setCurrentImage("");
      setEditingId(null);
      loadRentals(); // Refresh list
    } catch (error) {
      console.error("Submit error:", error); // Debug
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  // Edit rental
  const handleEdit = (r) => {
    setEditingId(r._id);
    setCurrentImage(getImageUrl(r.image)); // Set preview

    setForm({
      vehicleName: r.vehicleName,
      vehicleType: r.vehicleType,
      seats: r.seats,
      fuel: r.fuel,
      description: r.description,
      image: null, // User can upload new
      features: r.features.join(", "),
      available: r.available,
    });
  };

  // Delete rental
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this rental?")) return;

    try {
      await deleteRental(id);
      loadRentals();
    } catch (error) {
      console.error("Delete error:", error); // Debug
      alert("Error deleting: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Manage Rentals</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-12 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          {editingId ? "Edit Rental" : "Add New Rental"}
        </h2>

        {currentImage && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <img src={currentImage} alt="Preview" className="w-48 h-48 object-cover rounded-lg mx-auto" />
            <p className="text-sm text-gray-500 text-center mt-2">Current image (upload new to replace)</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              placeholder="e.g., Toyota Prado"
              value={form.vehicleName}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
            <input
              type="text"
              name="vehicleType"
              placeholder="SUV, Van, Jeep..."
              value={form.vehicleType}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
            <input
              type="number"
              name="seats"
              placeholder="e.g., 5"
              value={form.seats}
              onChange={handleChange}
              min="1" // Browser prevents 0/negative/empty submit
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
            <input
              type="text"
              name="fuel"
              placeholder="Petrol, Diesel..."
              value={form.fuel}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required={!editingId && !currentImage}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
            <input
              type="text"
              name="features"
              placeholder="e.g., AC, GPS, WiFi"
              value={form.features}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Brief description of the vehicle..."
              value={form.description}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          <div className="md:col-span-2 flex items-center">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Available for Rental
            </label>
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {editingId ? "Update Rental" : "Add Rental"}
          </button>
        </form>
      </div>

      {/* ================= RENTALS LIST ================= */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">All Rentals ({rentals.length})</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your vehicle fleet</p>
        </div>

        {rentals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No rentals added yet.</p>
            <p className="text-sm text-gray-400 mt-1">Start by adding your first vehicle above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {rentals.map((r) => (
              <div 
                key={r._id} 
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                {/* Image with overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(r.image)}
                    alt={r.vehicleName}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      r.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {r.available ? 'Available' : 'Booked'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{r.vehicleName}</h3>
                  <p className="text-sm text-gray-600 mb-4">{r.vehicleType}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {r.seats} seats • {r.fuel}
                    </p>
                    {r.features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {r.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                        {r.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">+{r.features.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-6 line-clamp-2">{r.description}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(r)}
                      className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-xl hover:bg-yellow-600 font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(r._id)}
                      className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
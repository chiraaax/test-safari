import React, { useEffect, useState } from "react";
import {
  getTours,
  createTour,
  updateTour,
  deleteTour,
} from "../services/api";

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // For edit preview

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    maxParticipants: "",
    includes: "",
    image: null, // File object
  });

  // apply theme from root/localStorage (no toggle here — navbar handles toggling)
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    if (initial === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  // Backend URL for images (Strip /api from API_URL for static files)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const BASE_URL = API_URL.replace('/api', ''); // e.g., 'http://localhost:5000'
  const getImageUrl = (imagePath) => {
    return imagePath ? `${BASE_URL}${imagePath}` : 'https://via.placeholder.com/400x256?text=No+Image';
  };

  // Load tours
  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      const res = await getTours();
      setTours(res.data || []);
    } catch (error) {
      console.error("Error loading tours:", error);
      alert("Error loading tours: " + (error.response?.data?.message || error.message));
      setTimeout(loadTours, 2000);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "image") {
      value = e.target.files[0];
      if (value) {
        const reader = new FileReader();
        reader.onload = (ev) => setCurrentImage(ev.target.result); // Preview
        reader.readAsDataURL(value);
      } else {
        setCurrentImage(""); // Clear preview
      }
    }

    setForm({ ...form, [e.target.name]: value });
  };

  // Save or update tour
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation for numbers
    const priceNum = Number(form.price);
    const maxParticipantsNum = Number(form.maxParticipants);
    if (isNaN(priceNum) || priceNum < 0) {
      alert("Price must be a valid positive number!");
      return;
    }
    if (isNaN(maxParticipantsNum) || maxParticipantsNum < 1) {
      alert("Max Participants must be a valid number greater than 0!");
      return;
    }

    if (!form.image && !editingId) {
      alert("Please select an image!");
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("duration", form.duration);
    formData.append("price", priceNum.toString());
    formData.append("maxParticipants", maxParticipantsNum.toString());
    formData.append("includes", form.includes || "");

    if (form.image && form.image.size > 0) {
      formData.append("image", form.image);
    }

    try {
      if (editingId) {
        await updateTour(editingId, formData);
        alert("Tour updated!");
      } else {
        await createTour(formData);
        alert("Tour created!");
      }

      // Reset
      setForm({
        title: "",
        description: "",
        duration: "",
        price: "",
        maxParticipants: "",
        includes: "",
        image: null,
      });
      setCurrentImage("");
      setEditingId(null);
      loadTours(); // Refresh list
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  // Edit tour
  const handleEdit = (t) => {
    setEditingId(t._id);
    setCurrentImage(getImageUrl(t.image)); // Set preview

    setForm({
      title: t.title || "",
      description: t.description || "",
      duration: t.duration || "",
      price: t.price || "",
      maxParticipants: t.maxParticipants || "",
      includes: Array.isArray(t.includes) ? t.includes.join(", ") : (t.includes || ""),
      image: null, // User can upload new
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete tour
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour?")) return;

    try {
      await deleteTour(id);
      loadTours();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Manage Tours</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-12 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
          {editingId ? "Edit Tour" : "Add New Tour"}
        </h2>

        {currentImage && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <img src={currentImage} alt="Preview" className="w-48 h-48 object-cover rounded-lg mx-auto" />
            <p className="text-sm text-gray-500 dark:text-gray-300 text-center mt-2">Current image (upload new to replace)</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Yala Safari Adventure"
              value={form.title}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              placeholder="e.g., 3 Days / 2 Nights"
              value={form.duration}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Price (LKR)</label>
            <input
              type="number"
              name="price"
              placeholder="e.g., 25000"
              value={form.price}
              onChange={handleChange}
              min="0"
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Max Participants</label>
            <input
              type="number"
              name="maxParticipants"
              placeholder="e.g., 10"
              value={form.maxParticipants}
              onChange={handleChange}
              min="1"
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Upload Image (Vehicle Pic)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-200 hover:file:bg-blue-100"
              required={!editingId && !currentImage}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Brief description of the tour..."
              value={form.description}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Includes (comma separated, optional)</label>
            <input
              type="text"
              name="includes"
              placeholder="e.g., Accommodation, Meals, Guide"
              value={form.includes}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {editingId ? "Update Tour" : "Add Tour"}
          </button>
        </form>
      </div>

      {/* ================= TOURS LIST ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-transparent dark:border-gray-700">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">All Tours ({tours.length})</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Manage your tour packages</p>
        </div>

        {tours.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-300 text-lg">No tours added yet.</p>
            <p className="text-sm text-gray-400 dark:text-gray-400 mt-1">Start by adding your first tour above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {tours.map((t) => (
              <div
                key={t._id}
                className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200"
              >
                {/* Image with overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(t.image)}
                    alt={t.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x256?text=No+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 transition-colors">{t.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Duration: {t.duration}</p>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                      <span className="mr-2">👥</span> Max: {t.maxParticipants} | Price: LKR {t.price}
                    </p>

                    {Array.isArray(t.includes) && t.includes.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {t.includes.slice(0, 3).map((inc, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                            {inc}
                          </span>
                        ))}
                        {t.includes.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            +{t.includes.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 dark:text-gray-400">No extras listed</p>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">{t.description}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(t)}
                      className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-xl hover:bg-yellow-600 font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(t._id)}
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
import React, { useState, useEffect } from "react";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../services/api";

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // For edit preview
  const [isUploading, setIsUploading] = useState(false); // Loading state for upload

  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    destinations: "",
    category: "",
    includes: "",
    highlights: "",
    image: null, // File object for upload
  });

  // Backend URL for images (construct full URL for display)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const getImageUrl = (imagePath) => {
    return imagePath ? `${API_URL}${imagePath}` : 'https://via.placeholder.com/150x150?text=No+Image';
  };

  // Theme handling for this page (uses document root class 'dark')
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    if (initial === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    loadPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPackages = async () => {
    const res = await getPackages();
    setPackages(res.data || []);
  };

  const handleChange = (e) => {
    let value = e.target.value;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Frontend validation
    if (!form.name.trim()) {
      alert("Package name is required!");
      setIsUploading(false);
      return;
    }

    const priceNum = Number(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      alert("Price must be a valid non-negative number!");
      setIsUploading(false);
      return;
    }

    if (!form.image && !editingId) {
      alert("Please select an image!");
      setIsUploading(false);
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());
    formData.append("duration", form.duration.trim());
    formData.append("price", priceNum.toString());
    formData.append("destinations", form.destinations.trim());
    formData.append("category", form.category.trim());
    formData.append("includes", form.includes.trim());
    formData.append("highlights", form.highlights.trim());

    if (form.image && form.image.size > 0) {
      formData.append("image", form.image);
    }

    try {
      if (editingId) {
        await updatePackage(editingId, formData);
        alert("Package updated!");
      } else {
        await createPackage(formData);
        alert("Package created!");
      }

      // Reset form
      setForm({
        name: "",
        description: "",
        duration: "",
        price: "",
        destinations: "",
        category: "",
        includes: "",
        highlights: "",
        image: null,
      });
      setCurrentImage("");
      setEditingId(null);
      loadPackages();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg._id);
    setCurrentImage(getImageUrl(pkg.image)); // Set preview

    setForm({
      name: pkg.name || "",
      description: pkg.description || "",
      duration: pkg.duration || "",
      price: pkg.price || "",
      destinations: (pkg.destinations || []).join(", "),
      category: pkg.category || "",
      includes: (pkg.includes || []).join(", "),
      highlights: (pkg.highlights || []).join(", "),
      image: null, // Reset to allow new upload
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    await deletePackage(id);
    loadPackages();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Manage Packages</h1>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <input
          type="text"
          name="name"
          placeholder="Package Name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-3 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="p-3 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
          className="p-3 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          min="0"
          required
          className="p-3 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />

        <input
          type="text"
          name="destinations"
          placeholder="Destinations (comma separated)"
          value={form.destinations}
          onChange={handleChange}
          className="p-3 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />

        <input
          type="text"
          name="includes"
          placeholder="Includes (comma separated)"
          value={form.includes}
          onChange={handleChange}
          className="p-3 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />

        <input
          type="text"
          name="highlights"
          placeholder="Highlights (comma separated)"
          value={form.highlights}
          onChange={handleChange}
          className="p-3 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required={!editingId}
          />
          {currentImage && (
            <div className="mt-2">
              <img src={currentImage} alt="Preview" className="w-32 h-32 object-cover rounded mx-auto" />
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">Preview (upload new to replace)</p>
            </div>
          )}
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-3 border rounded md:col-span-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          rows={3}
        />

        <button
          type="submit"
          disabled={isUploading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg col-span-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : (editingId ? "Update Package" : "Add Package")}
        </button>
      </form>

      {/* PACKAGES LIST */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">All Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map(pkg => (
          <div
            key={pkg._id}
            className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex gap-4 border border-transparent dark:border-gray-700"
          >
            <img
              src={getImageUrl(pkg.image)}
              alt={pkg.name}
              className="w-32 h-32 object-cover rounded bg-gray-100 dark:bg-gray-700"
              onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150x150?text=No+Image")}
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{pkg.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Category: {pkg.category}</p>
              <p className="font-semibold mt-1 text-gray-900 dark:text-gray-100">Rs {pkg.price} / package</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="px-3 py-2 bg-yellow-500 text-white rounded hover:brightness-95 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:brightness-90 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
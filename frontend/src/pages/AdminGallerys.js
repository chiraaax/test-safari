import React, { useState, useEffect } from "react";
import {
  getGallerys,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../services/api";

export default function AdminGallerys() {
  const [gallerys, setGallerys] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    image: null,
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const getImageUrl = (imagePath) => {
    return imagePath ? `${API_URL}${imagePath}` : 'https://via.placeholder.com/150x150?text=No+Image';
  };

  useEffect(() => {
    loadGallerys();
  }, []);

  const loadGallerys = async () => {
    try {
      console.log('Loading gallery items...'); // Debug
      const res = await getGallerys();
      console.log('Gallery items loaded:', res.data); // Debug
      setGallerys(res.data || []);
    } catch (error) {
      console.error('Error loading gallery items:', error); // Debug
      alert("Failed to load gallery items. Please try again.");
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "image") {
      value = e.target.files[0];
      if (value) {
        const reader = new FileReader();
        reader.onload = (e) => setCurrentImage(e.target.result);
        reader.readAsDataURL(value);
      } else {
        setCurrentImage("");
      }
    }

    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const trimmedTitle = form.title.trim();
    const trimmedType = form.type.trim();
    const trimmedDescription = form.description.trim();
    if (!trimmedTitle) {
      alert("Title is required!");
      setIsUploading(false);
      return;
    }
    if (!trimmedType) {
      alert("Type is required!");
      setIsUploading(false);
      return;
    }
    if (!trimmedDescription) {
      alert("Description is required!");
      setIsUploading(false);
      return;
    }
    if (!form.image && !editingId) {
      alert("Please select an image!");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", trimmedTitle);
    formData.append("type", trimmedType);
    formData.append("description", trimmedDescription);

    if (form.image && form.image.size > 0) {
      formData.append("image", form.image);
    }

    // Debug: Log FormData contents
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]); // Logs title, type, description, image file
    }

    try {
      console.log('Submitting to', editingId ? 'PUT' : 'POST', `/api/gallery${editingId ? `/${editingId}` : ''}`); // Debug
      if (editingId) {
        await updateGallery(editingId, formData);
        alert("Gallery item updated!");
      } else {
        await createGallery(formData);
        alert("Gallery item added!");
      }

      setForm({
        title: "",
        type: "",
        description: "",
        image: null,
      });
      setCurrentImage("");
      setEditingId(null);
      loadGallerys();
    } catch (error) {
      console.error("Save error details:", error.response || error); // Debug full error
      alert("Failed to save: " + (error.response?.data?.message || error.message));
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setCurrentImage(getImageUrl(item.image));

    setForm({
      title: item.title || "",
      type: item.type || "",
      description: item.description || "",
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteGallery(id);
      loadGallerys();
    } catch (error) {
      console.error("Delete error:", error); // Debug
      alert("Failed to delete: " + error.message);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Manage Gallery</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <input
          type="text"
          name="title"
          placeholder="Title *"
          value={form.title}
          onChange={handleChange}
          className="p-3 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          name="type"
          placeholder="Type (e.g., Safari) *"
          value={form.type}
          onChange={handleChange}
          className="p-3 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Image *</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
          {currentImage && <img src={currentImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded mx-auto" />}
        </div>
        <textarea
          name="description"
          placeholder="Description *"
          value={form.description}
          onChange={handleChange}
          className="p-3 border rounded md:col-span-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={4}
        />
        <button
          type="submit"
          disabled={isUploading}
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isUploading ? "Saving..." : editingId ? "Update" : "Add Item"}
        </button>
      </form>

      {/* List */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Gallery Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallerys.map((item) => (
          <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type: {item.type}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
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

  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    duration: "",
    price: "",
    destinations: "",
    category: "",
    includes: "",
    highlights: "",
  });

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    const res = await getPackages();
    setPackages(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      destinations: form.destinations.split(",").map(d => d.trim()),
      includes: form.includes.split(",").map(i => i.trim()),
      highlights: form.highlights.split(",").map(h => h.trim()),
    };

    if (editingId) {
      await updatePackage(editingId, payload);
      alert("Package updated!");
    } else {
      await createPackage(payload);
      alert("Package created!");
    }

    setForm({
      name: "",
      image: "",
      description: "",
      duration: "",
      price: "",
      destinations: "",
      category: "",
      includes: "",
      highlights: "",
    });

    setEditingId(null);
    loadPackages();
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg._id);
    setForm({
      name: pkg.name,
      image: pkg.image,
      description: pkg.description,
      duration: pkg.duration,
      price: pkg.price,
      destinations: pkg.destinations.join(", "),
      category: pkg.category,
      includes: pkg.includes.join(", "),
      highlights: pkg.highlights.join(", "),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    await deletePackage(id);
    loadPackages();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Packages</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <input type="text" name="name" placeholder="Package Name" value={form.name} onChange={handleChange} required className="p-3 border rounded" />
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="p-3 border rounded" />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="p-3 border rounded" />
        <input type="text" name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} className="p-3 border rounded" />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="p-3 border rounded" required />
        <input type="text" name="destinations" placeholder="Destinations (comma separated)" value={form.destinations} onChange={handleChange} className="p-3 border rounded" />
        <input type="text" name="includes" placeholder="Includes (comma separated)" value={form.includes} onChange={handleChange} className="p-3 border rounded" />
        <input type="text" name="highlights" placeholder="Highlights (comma separated)" value={form.highlights} onChange={handleChange} className="p-3 border rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-3 border rounded md:col-span-2" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg col-span-2 hover:bg-blue-700">
          {editingId ? "Update Package" : "Add Package"}
        </button>
      </form>

      {/* PACKAGES LIST */}
      <h2 className="text-2xl font-semibold mb-4">All Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map(pkg => (
          <div key={pkg._id} className="bg-white shadow rounded-xl p-4 flex gap-4">
            <img src={pkg.image} alt={pkg.name} className="w-32 h-32 object-cover rounded" />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <p className="text-sm text-gray-600">Category: {pkg.category}</p>
              <p className="font-semibold mt-1">Rs {pkg.price} / package</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(pkg)} className="px-3 py-2 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(pkg._id)} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

  const [form, setForm] = useState({
    vehicleName: "",
    vehicleType: "",
    pricePerDay: "",
    capacity: "",
    fuel: "",
    description: "",
    image: "",
    features: "",
    available: true,
  });

  // Load rentals
  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    const res = await getRentals();
    setRentals(res.data);
  };

  // Handle form input
  const handleChange = (e) => {
    let value =
      e.target.name === "available" ? e.target.checked : e.target.value;

    setForm({ ...form, [e.target.name]: value });
  };

  // Save or update rental
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      pricePerDay: Number(form.pricePerDay),
      capacity: Number(form.capacity),
      features: form.features.split(",").map((f) => f.trim()),
    };

    if (editingId) {
      await updateRental(editingId, payload);
      alert("Rental updated!");
    } else {
      await createRental(payload);
      alert("Rental created!");
    }

    setForm({
      vehicleName: "",
      vehicleType: "",
      pricePerDay: "",
      capacity: "",
      fuel: "",
      description: "",
      image: "",
      features: "",
      available: true,
    });

    setEditingId(null);
    loadRentals();
  };

  // Edit rental
  const handleEdit = (r) => {
    setEditingId(r._id);

    setForm({
      vehicleName: r.vehicleName,
      vehicleType: r.vehicleType,
      pricePerDay: r.pricePerDay,
      capacity: r.capacity,
      fuel: r.fuel,
      description: r.description,
      image: r.image,
      features: r.features.join(", "),
      available: r.available,
    });
  };

  // Delete rental
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this rental?")) return;

    await deleteRental(id);
    loadRentals();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Rentals</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Rental" : "Add Rental"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="vehicleName"
            placeholder="Vehicle Name"
            value={form.vehicleName}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="text"
            name="vehicleType"
            placeholder="Vehicle Type (SUV, Van, Jeep...)"
            value={form.vehicleType}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="number"
            name="pricePerDay"
            placeholder="Price Per Day"
            value={form.pricePerDay}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity (Seats)"
            value={form.capacity}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="text"
            name="fuel"
            placeholder="Fuel Type"
            value={form.fuel}
            onChange={handleChange}
            className="p-3 border rounded"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="p-3 border rounded"
          />

          <input
            type="text"
            name="features"
            placeholder="Features (comma separated)"
            value={form.features}
            onChange={handleChange}
            className="p-3 border rounded col-span-2"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="p-3 border rounded col-span-2"
            required
          />

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
            Available
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg col-span-2 hover:bg-blue-700"
          >
            {editingId ? "Update Rental" : "Add Rental"}
          </button>
        </form>
      </div>

      {/* ================= RENTALS LIST ================= */}
      <h2 className="text-2xl font-semibold mb-4">All Rentals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rentals.map((r) => (
          <div key={r._id} className="bg-white shadow rounded-xl p-4 flex gap-4">
            <img
              src={r.image}
              alt={r.vehicleName}
              className="w-32 h-32 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="text-xl font-bold">{r.vehicleName}</h3>
              <p className="text-sm text-gray-600">{r.vehicleType}</p>
              <p className="font-semibold mt-1">Rs {r.pricePerDay} / day</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(r)}
                  className="px-3 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(r._id)}
                  className="px-3 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rentals.length === 0 && (
        <p className="text-gray-500 mt-6">No rentals added yet.</p>
      )}
    </div>
  );
}

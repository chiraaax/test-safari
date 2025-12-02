import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
    duration: "",
    price: "",
    location: "",
    difficulty: "",
    maxParticipants: "",
    includes: "",
    bestTime: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const res = await axios.get("http://localhost:5000/api/tours");
    setTours(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      includes: form.includes.split(",").map((i) => i.trim()),
    };

    await axios.post("http://localhost:5000/api/tours", payload);
    fetchTours();
  };

  const deleteTour = async (id) => {
    await axios.delete(`http://localhost:5000/api/tours/${id}`);
    fetchTours();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Tours</h1>

      {/* Add Tour Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-10">
        <input className="border p-2" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="border p-2" placeholder="Image URL" onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <textarea className="border p-2 col-span-2" placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="border p-2" placeholder="Duration" onChange={(e) => setForm({ ...form, duration: e.target.value })} />
        <input className="border p-2" placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="border p-2" placeholder="Location" onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input className="border p-2" placeholder="Difficulty" onChange={(e) => setForm({ ...form, difficulty: e.target.value })} />
        <input className="border p-2" placeholder="Max Participants" onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })} />
        <input className="border p-2 col-span-2" placeholder="Includes (comma separated)" onChange={(e) => setForm({ ...form, includes: e.target.value })} />
        <button className="bg-green-600 text-white p-3 rounded col-span-2">Add Tour</button>
      </form>

      {/* List All Tours */}
      <div className="grid grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour._id} className="border p-4 rounded shadow">
            <img src={tour.image} alt={tour.title} className="h-40 w-full object-cover rounded"  /> 
            <h2 className="font-bold mt-2">{tour.title}</h2>
            <p className="text-sm">{tour.location}</p>
            <p className="text-sm">{tour.price} LKR</p>

            <button onClick={() => deleteTour(tour._id)} className="bg-red-500 text-white px-4 py-2 rounded mt-3">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
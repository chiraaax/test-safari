import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Package, Car, Map } from "lucide-react";

export default function AdminDashboard() {
  const [sections] = useState([
    {
      title: "Manage Tours",
      description: "Create, update, and delete tour listings.",
      icon: Map,
      link: "/admin/tours",
    },
    {
      title: "Manage Rentals",
      description: "Manage vehicle rental listings for customers.",
      icon: Car,
      link: "/admin/rentals",
    },
    {
      title: "Manage Packages",
      description: "Edit curated travel packages and deals.",
      icon: Package,
      link: "/admin/packages",
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8" />
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <Icon className="w-12 h-12 text-gray-800" />
                  <h2 className="text-xl font-semibold">{sec.title}</h2>
                  <p className="text-gray-600 text-sm">{sec.description}</p>
                  <Link
                    to={sec.link}
                    className="w-full bg-blue-600 text-white text-center py-3 rounded-xl mt-3 font-medium hover:bg-blue-700 transition"
                  >
                    Open
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

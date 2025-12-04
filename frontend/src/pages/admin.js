import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Package, Car, MapPin, Image } from "lucide-react";

export default function AdminDashboard() {
  const [sections] = useState([
    {
      title: "Manage Tours",
      description: "Create, update, and delete tour listings.",
      icon: MapPin,
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
    {
      title: "Manage Gallery",
      description: "Upload and manage tour photos and videos.",
      icon: Image,
      link: "/admin/gallery",
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  // Theme (light / dark) handling
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    // initialize theme from localStorage or OS preference
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-gray-800 dark:text-gray-100" />
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 dark:border-gray-700 border border-transparent p-6 rounded-2xl shadow hover:shadow-xl transition hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <Icon className="w-12 h-12 text-gray-800 dark:text-gray-100" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{sec.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{sec.description}</p>
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
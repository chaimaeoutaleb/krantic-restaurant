import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const SpecialsMenu = () => {
  const [favorites, setFavorites] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/menu");
        console.log("API Response:", response.data);

        // Transform the data to ensure it's an array
        const data = response.data;
        let transformedData = [];

        // If data is an object with categories, flatten it
        if (data && typeof data === "object" && !Array.isArray(data)) {
          transformedData = Object.values(data).flat();
        }
        // If data is already an array, use it directly
        else if (Array.isArray(data)) {
          transformedData = data;
        }

        // Take only the first 5 items
        transformedData = transformedData.slice(0, 5);

        console.log("Transformed Data:", transformedData);
        setMenuItems(transformedData);
        setLoading(false);
      } catch (err) {
        console.error("Error details:", err);
        setError("Failed to fetch menu items");
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const getImageUrl = (imageName) => {
    if (imageName.startsWith("http")) {
      return imageName;
    }
    return `http://localhost:8000/storage/${imageName}`;
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading menu items...</p>
        </div>
              </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">{error}</p>
        </div>
            </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-4">
            TASTE THE BEST THAT SURPRISE YOU
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Specials Menu
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            For whatever matters most, make it easier for potential customers to
            find your business with adline Ads.
          </p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems && menuItems.length > 0 ? (
            menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-64">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(item.id)
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">
                    ${item.price}
                  </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No menu items available</p>
            </div>
          )}
        </div>

        {/* Show More Button */}
          <div className="text-center mt-12">
            <button className="bg-amber-200 hover:bg-amber-300 text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors">
              <Link to="/menu">View Full Menu</Link>
            </button>
          </div>
      </div>
    </div>
  );
};

export default SpecialsMenu;

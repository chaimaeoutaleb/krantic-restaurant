import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Star, Heart } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import KranticFooter from "../Components/KranticFooter";
import CartIcon from "../Components/CartIcon";
import axios from "axios";

const categories = [
  { id: "all", name: "All Dishes" },
  { id: "starters", name: "Starters" },
  { id: "main", name: "Main Course" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
];

const MenuPage = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/menu");
        setMenuItems(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch menu items. Please try again later.");
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleOrderNow = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  const getImageUrl = (imageName) => {
    if (imageName.startsWith("http")) {
      return imageName;
    }
    return `http://localhost:8000/storage/${imageName}`;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Restaurant Name */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-all duration-300 cursor-pointer">
                  Krantic
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-900 hover:text-amber-600 font-medium transition-colors duration-300"
              >
                HOME
              </Link>

              <Link
                to="/menu"
                className="text-amber-600 border-b-2 border-amber-600 font-medium transition-colors duration-300"
              >
                OUR MENU
              </Link>

              <Link
                to="/about"
                className="text-gray-900 hover:text-amber-600 font-medium transition-colors duration-300"
              >
                ABOUT US
              </Link>

              <Link
                to="/contact"
                className="text-gray-900 hover:text-amber-600 font-medium transition-colors duration-300"
              >
                CONTACT US
              </Link>
            </div>

            {/* Desktop Auth Buttons and Cart */}
            <div className="hidden md:flex items-center space-x-4">
              <CartIcon />
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="px-4 py-1.5 text-sm text-gray-900 font-medium rounded-md border border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50">
                      Log In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-4 py-1.5 text-sm text-white font-medium rounded-md bg-gray-800 hover:bg-gray-900 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50">
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-900 font-medium">
                    Welcome, {user?.firstName || "User"}
                  </span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <CartIcon />
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          } bg-white border-t`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300"
            >
              HOME
            </Link>
            <Link
              to="/menu"
              className="block px-3 py-2 rounded-md text-sm font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 transition-all duration-300"
            >
              OUR MENU
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300"
            >
              ABOUT US
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300"
            >
              CONTACT US
            </Link>
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300">
                    Log In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            ) : (
              <div className="px-3 py-2">
                <span className="block text-sm font-medium text-gray-900 mb-2">
                  Welcome, {user?.firstName || "User"}
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1920&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D"
            alt="Restaurant Food"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide text-white">
            Our Menu
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-white opacity-90 leading-relaxed">
            Discover our carefully crafted dishes, prepared with the finest
            ingredients and served with passion
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
              <p className="mt-4 text-gray-600">Loading menu items...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Menu Items Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />
                    {item.isSpecial && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Special
                      </div>
                    )}

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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <span className="text-lg font-medium text-gray-900">
                        ${item.price}
                      </span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="mt-4">
                      <button
                        onClick={() => handleOrderNow(item.id)}
                        className="bg-amber-200 hover:bg-amber-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <KranticFooter />
    </div>
  );
};

export default MenuPage;

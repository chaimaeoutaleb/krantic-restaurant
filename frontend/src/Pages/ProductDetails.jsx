import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Menu, X, Heart, ShoppingCart } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import CartIcon from "../Components/CartIcon";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/menu/${id}`
        );
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (product) {
        try {
          const response = await axios.get("http://localhost:8000/api/menu");
          const related = response.data
            .filter(
              (item) =>
                item.category === product.category && item.id !== product.id
            )
            .slice(0, 3); // Get up to 3 related products
          setRelatedProducts(related);
        } catch (err) {
          console.error("Error fetching related products:", err);
        }
      }
    };

    fetchRelatedProducts();
  }, [product]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000); // Hide message after 2 seconds
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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

      {/* Product Details Section */}
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
              <p className="mt-4 text-gray-600">Loading product details...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
      </div>
          ) : product ? (
            <>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
                <div className="md:flex">
                  <div className="md:w-1/2">
              <img
                src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {product.name}
                      </h1>
              <button
                onClick={toggleFavorite}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart
                          className={`w-6 h-6 ${
                            isFavorite
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                  }`}
                />
              </button>
            </div>
                    <p className="text-2xl font-semibold text-gray-900 mb-4">
                      ${product.price}
                    </p>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <div className="flex items-center space-x-4 mb-6">
                      <label
                        htmlFor="quantity"
                        className="text-gray-700 font-medium"
                      >
                        Quantity:
                      </label>
                      <select
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
              </div>
                    <div className="relative">
                  <button
                        onClick={handleAddToCart}
                        className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2"
                  >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                  </button>
                      {showAddedMessage && (
                        <div className="absolute -top-12 left-0 right-0 bg-green-500 text-white py-2 px-4 rounded-lg text-center animate-fade-in">
                          Item added to cart!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Products Section */}
              {relatedProducts.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    You May Also Like
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedProducts.map((item) => (
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
                            <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Special
                            </div>
                          )}
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
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {item.description}
                          </p>
              <button
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="w-full bg-amber-200 hover:bg-amber-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                            View Details
              </button>
            </div>
          </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

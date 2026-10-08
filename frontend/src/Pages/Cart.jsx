import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";
import CartIcon from "../Components/CartIcon";

const Cart = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } =
    useCart();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

      {/* Cart Section */}
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/menu"
                className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center p-6 border-b last:border-b-0"
                    >
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/100x100?text=No+Image";
                        }}
                      />
                      <div className="ml-6 flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">${item.price}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 rounded-full hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="mx-3 text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="ml-6 flex flex-col items-end">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Total</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!isSignedIn) {
                          // Show sign in modal
                          return;
                        }
                        navigate("/checkout");
                      }}
                      className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                    >
                      {isSignedIn ? "Proceed to Checkout" : "Sign in to Checkout"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

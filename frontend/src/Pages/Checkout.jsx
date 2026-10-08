import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, CreditCard, Wallet } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";
import CartIcon from "../Components/CartIcon";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../utils/axios";

const Checkout = () => {
  const { isSignedIn, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod or paypal
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    notes: "",
  });
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();

  // Fetch CSRF token when component mounts
  useEffect(() => {
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        console.log("CSRF token fetched successfully");
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
      });
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const orderData = {
        ...formData,
        payment_method: paymentMethod,
        total_amount: getTotalPrice(),
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post("/api/orders", orderData);

      if (paymentMethod === "cod") {
        alert("Order placed successfully! You will pay on delivery.");
        clearCart();
        navigate("/");
      }
    } catch (err) {
      console.error("Order error:", err);
      setError(
        err.response?.data?.message || "Error placing order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: getTotalPrice().toFixed(2),
            currency_code: "USD",
          },
          description: "Krantic Restaurant Order",
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();

      // Update order payment status
      await axios.patch(`/api/orders/${order.id}/payment`, {
        payment_id: order.id,
        status: "completed",
      });

      alert("Payment successful! Your order has been placed.");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Payment error:", err);
      setError("Error processing payment. Please try again.");
    }
  };

  const onError = (err) => {
    console.error("PayPal error:", err);
    setError("There was an error processing your payment. Please try again.");
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Please sign in to continue with checkout
            </h2>
            <div className="space-x-4">
              <SignInButton mode="modal">
                <button className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Restaurant Name */}
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Krantic
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                className="text-gray-900 hover:text-amber-600 font-medium"
              >
                HOME
              </a>
              <a
                href="/menu"
                className="text-amber-600 border-b-2 border-amber-600 font-medium"
              >
                OUR MENU
              </a>
              <a
                href="/about"
                className="text-gray-900 hover:text-amber-600 font-medium"
              >
                ABOUT US
              </a>
              <a
                href="/contact"
                className="text-gray-900 hover:text-amber-600 font-medium"
              >
                CONTACT US
              </a>
            </div>

            {/* Desktop Auth and Cart */}
            <div className="hidden md:flex items-center space-x-4">
              <CartIcon />
              <div className="flex items-center space-x-4">
                <span className="text-gray-900 font-medium">
                  Welcome, {user?.firstName || "User"}
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <CartIcon />
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-900 hover:bg-amber-50"
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
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              HOME
            </a>
            <a
              href="/menu"
              className="block px-3 py-2 rounded-md text-sm font-medium text-amber-600 bg-amber-50"
            >
              OUR MENU
            </a>
            <a
              href="/about"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              ABOUT US
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </nav>

      {/* Checkout Section */}
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Delivery Information Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Delivery Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Any special instructions for delivery?"
                  ></textarea>
                </div>

                {/* Payment Method Selection */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Payment Method
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-gray-700">Cash on Delivery</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-gray-700">PayPal</span>
                    </label>
                  </div>
                </div>

                {paymentMethod === "paypal" && (
                  <div className="mt-6">
                    <PayPalScriptProvider
                      options={{
                        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                        currency: "USD",
                      }}
                    >
                      <PayPalButtons
                        style={{
                          layout: "vertical",
                          color: "gold",
                          shape: "rect",
                          label: "pay",
                        }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}

                {/* Place Order Button (only show for COD) */}
                {paymentMethod === "cod" && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-amber-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-600 transition-colors mt-6 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </button>
                )}
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-gray-900 font-medium">
                            {item.title}
                          </h3>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-gray-900 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">
                        Total
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  User,
  Loader2,
} from "lucide-react";

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
    special_requests: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setIsLoading(true);

    try {
      // Get CSRF token
      console.log("Step 1: Getting CSRF token...");
      const csrfResponse = await fetch(
        "http://localhost:8000/sanctum/csrf-cookie",
        {
          credentials: "include",
        }
      );

      console.log("CSRF Response status:", csrfResponse.status);
      if (!csrfResponse.ok) {
        console.error("Failed to get CSRF token. Status:", csrfResponse.status);
        throw new Error("Failed to get CSRF token");
      }

      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      console.log("Step 2: CSRF Token obtained:", csrfToken ? "Yes" : "No");

      // Prepare the request data
      const requestData = {
        ...formData,
        guests: parseInt(formData.guests, 10), // Convert to number
      };

      console.log("Step 3: Preparing request data:", requestData);

      console.log("Step 4: Sending request to backend...");
      const response = await fetch("http://localhost:8000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken || ""),
        },
        credentials: "include",
        body: JSON.stringify(requestData),
      });

      console.log("Step 5: Response received. Status:", response.status);
      const data = await response.json();
      console.log("Step 6: Response data:", data);

      if (response.ok) {
        console.log("Step 7: Request successful");
        showNotification(
          "success",
          "Your table reservation request has been submitted! We will confirm your booking shortly."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: "",
          date: "",
          time: "",
          special_requests: "",
        });
      } else {
        console.error("Step 7: Request failed with status:", response.status);
        const errorMessage =
          data.message ||
          data.errors?.[0] ||
          "Failed to submit reservation. Please try again.";
        console.error("Error message:", errorMessage);
        showNotification("error", errorMessage);
      }
    } catch (error) {
      console.error("Step 8: Error caught:", error);
      console.error("Error stack:", error.stack);
      showNotification(
        "error",
        "Could not connect to the server. Please try again later."
      );
    } finally {
      console.log("Step 9: Request process completed");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="Your full name"
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="(555) 123-4567"
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Guests *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                required
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                disabled={isLoading}
              >
                <option value="">Select guests</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                disabled={isLoading}
              >
                <option value="">Select time</option>
                {[
                  "5:00 PM",
                  "5:30 PM",
                  "6:00 PM",
                  "6:30 PM",
                  "7:00 PM",
                  "7:30 PM",
                  "8:00 PM",
                  "8:30 PM",
                  "9:00 PM",
                  "9:30 PM",
                ].map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests
          </label>
          <textarea
            name="special_requests"
            value={formData.special_requests}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
            placeholder="Any dietary restrictions, special occasions, or other requests..."
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-amber-600 text-white py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 font-medium text-lg ${
            isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-amber-700"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5" />
              <span>Book Your Table</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

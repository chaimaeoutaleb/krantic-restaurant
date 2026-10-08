import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const OpeningHoursBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    arrivalTime: "",
    amountOfPeople: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: "", message: "" }), 5000);
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
        name: formData.email.split("@")[0], // Using email username as name
        email: formData.email,
        phone: formData.phone,
        guests: parseInt(formData.amountOfPeople, 10),
        date: formData.date,
        time: formData.arrivalTime,
        special_requests: "",
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
          email: "",
          phone: "",
          arrivalTime: "",
          amountOfPeople: "",
          date: "",
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
    <div className="bg-gray-50 py-16 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl font-bold text-gray-400 transform rotate-12">
          HOURS
        </div>
        <div className="absolute bottom-20 right-20 text-8xl font-bold text-gray-400 transform -rotate-12">
          BOOK
        </div>
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="text-gray-300"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="20"
              x2="100"
              y2="40"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="100"
              y1="160"
              x2="100"
              y2="180"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="20"
              y1="100"
              x2="40"
              y2="100"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="160"
              y1="100"
              x2="180"
              y2="100"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Opening Hours */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                OPENING TIME HOURS
              </h2>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  <span className="font-medium min-w-32">
                    Monday - Friday :
                  </span>
                  <span className="ml-2">7:00 am - 22:00 pm</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium min-w-32">Saturday:</span>
                  <span className="ml-2">8:00 am - 23:00 pm</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium min-w-32">Sunday:</span>
                  <span className="ml-2">6:30 pm - 23:00 pm</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium min-w-32">Holidays:</span>
                  <span className="ml-2 text-red-600">Closed</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  BREAKFAST
                </h3>
                <div className="text-gray-700">
                  <div className="flex items-center mb-2">
                    <span className="font-medium">Monday - Friday :</span>
                  </div>
                  <div className="ml-4">7:00 am - 22:00 pm</div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  LUNCH AND DINNER
                </h3>
                <div className="text-gray-700">
                  <div className="flex items-center mb-2">
                    <span className="font-medium">Monday - Friday :</span>
                  </div>
                  <div className="ml-4">7:00 am - 22:00 pm</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-600 italic">
                "On holidays is a special day, we will open and with special
                offer, we will announce"
              </p>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                BOOK A TABLE
              </h3>
              <p className="text-gray-600 leading-relaxed">
                After booking we will call the customer to confirm, so please
                enter your name and phone number is required, thank you!
              </p>
            </div>

            {/* Notification */}
            {notification.message && (
              <div
                className={`mb-4 p-4 rounded-md ${
                  notification.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {notification.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
                <input
                  type="number"
                  name="amountOfPeople"
                  placeholder="Number of People"
                  value={formData.amountOfPeople}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
                <input
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors ${
                  isLoading
                    ? "bg-amber-500 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Book Your Table"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningHoursBooking;

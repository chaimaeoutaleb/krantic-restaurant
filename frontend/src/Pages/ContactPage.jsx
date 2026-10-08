import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Menu, X } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import KranticFooter from "../Components/KranticFooter";
import ReservationForm from "../Components/ReservationForm";

export default function ContactPage() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
                className="text-gray-900 hover:text-amber-600 font-medium transition-colors duration-300"
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

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
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
            <div className="md:hidden">
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
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300"
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
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521917441209-e886f0404a7b?w=1920&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHJlc3RhdXJhbnR8ZW58MHwwfDB8fHww"
            alt="Restaurant Interior"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
            loading="eager"
            fetchpriority="high"
          />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide text-white">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-white opacity-90 leading-relaxed">
            We'd love to hear from you. Reach out for reservations, inquiries,
            or just to share your dining experience with us.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
              <h2 className="text-4xl font-light text-gray-800 mb-8">
                Visit Our Restaurant
              </h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-600 uppercase tracking-wide mb-2">
                      Address
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      123 Culinary Street
                      <br />
                      Downtown District
                      <br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.097156418534!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Krantic Restaurant Location"
                    className="w-full h-[400px]"
                  ></iframe>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-600 uppercase tracking-wide mb-2">
                      Phone
                    </h3>
                    <p className="text-gray-700 text-lg">(406) 555-5555</p>
                    <p className="text-gray-600">
                      Available 24/7 for reservations
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-600 uppercase tracking-wide mb-2">
                      Email
                    </h3>
                    <p className="text-gray-700 text-lg">
                      hello@kranticrestaurant.com
                    </p>
                    <p className="text-gray-600">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-600 uppercase tracking-wide mb-2">
                      Hours
                    </h3>
                    <div className="text-gray-700 space-y-1">
                      <p>
                        <span className="font-medium">Monday - Thursday:</span>{" "}
                        5:00 PM - 10:00 PM
                      </p>
                      <p>
                        <span className="font-medium">Friday - Saturday:</span>{" "}
                        5:00 PM - 11:00 PM
                      </p>
                      <p>
                        <span className="font-medium">Sunday:</span> 4:00 PM -
                        9:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
              <h2 className="text-4xl font-light text-gray-800 mb-8">
                Book Your Table
              </h2>
              <ReservationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <KranticFooter />
    </div>
  );
}

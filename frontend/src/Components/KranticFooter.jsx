import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

export default function KranticFooter() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email) {
      console.log("Newsletter signup:", email);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 border border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-36 h-36 border border-white rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border border-white rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Krantic</h2>
            <p className="text-gray-300 leading-relaxed">
              Whether you're here for a quick bite or a long, cozy dinner, our
              space is designed for good vibes, great conversations, and
              unforgettable meals. Come in, take a seat, and enjoy the moment.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Voucher Details
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog Details
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Favorite
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Music Amenities
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Opening Hours</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-300 font-medium">Sunday - Thursday</p>
                <p className="text-orange-400 font-semibold">
                  08:00 am - 09:00pm
                </p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Only Friday</p>
                <p className="text-orange-400 font-semibold">
                  03:00 pm - 09:00pm
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-gray-300 text-sm">Email Address</p>
                  <p className="text-white">demo123@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-gray-300 text-sm">Location</p>
                  <p className="text-white">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">News Letter</h4>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white text-gray-900 placeholder-gray-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-orange-400 text-white rounded-r-lg hover:bg-orange-500 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © Copyright 2025 . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from "react";
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Award,
  Leaf,
  ChefHat,
  Star,
  ArrowUp,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import KranticFooter from "../Components/KranticFooter";

export default function KranticAboutPage() {
  const [activeTab, setActiveTab] = useState("story");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const stats = [
    { icon: Users, number: "10K+", label: "Happy Customers" },
    { icon: Award, number: "25+", label: "Awards Won" },
    { icon: ChefHat, number: "15+", label: "Expert Chefs" },
    { icon: Star, number: "4.9", label: "Rating" },
  ];

  const teamMembers = [
    {
      name: "Chef Marcus Chen",
      role: "Executive Chef",
      experience: "15 years",
      specialty: "Asian Fusion",
    },
    {
      name: "Sarah Williams",
      role: "Pastry Chef",
      experience: "12 years",
      specialty: "Desserts & Pastries",
    },
    {
      name: "David Kumar",
      role: "Sous Chef",
      experience: "8 years",
      specialty: "International Cuisine",
    },
    {
      name: "Maria Rodriguez",
      role: "Head Sommelier",
      experience: "10 years",
      specialty: "Wine Pairing",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div>
        {/* Navigation Bar */}
        <nav className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
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
      </div>

      {/* Main About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfDF8MHx8fDA%3D"
                  alt="Restaurant interior"
                  className="w-full h-[500px] object-cover object-center rounded-lg"
                />
              </div>
            </div>

            {/* Content Section */}
            <div>
              <p className="text-orange-500 font-medium mb-4 tracking-wider">
                ABOUT RESTAURANT
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                ENJOY AN EXCEPTIONAL
                <br />
                JOURNEY OF TASTE
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Our buzzy food-hall style concept is inspired by international
                  dining styles, especially in Asia. Explore the following
                  fast-action food stations as busy chefs perform.
                </p>
                <p>
                  Enjoy a verdant Garden to Glass experience. It's in the view,
                  it's reflected in the design, and it infuses many drinks. In
                  fact, all our delicious fresh ingredients are sustainably
                  picked from our Jemima's Kitchen Garden. Our flourishing range
                  of cocktails, spirits, beers and wines are all made with
                  integrity and offer something for every guest.
                </p>
              </div>

              <div className="flex items-center space-x-8 mt-8">
                <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-colors">
                  READ MORE ABOUT US
                </button>
                <div className="flex items-center space-x-2 text-gray-900">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">+(406) 555-5555</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="flex space-x-8 border-b border-gray-200">
              {[
                { id: "story", label: "Our Story" },
                { id: "mission", label: "Our Mission" },
                { id: "values", label: "Our Values" },
                { id: "team", label: "Our Team" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-orange-400 text-orange-500"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === "story" && (
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-6">The Krantic Story</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Founded in 2015, Krantic began as a dream to create a dining
                  experience that celebrates the rich tapestry of Asian cuisine
                  while embracing international flavors. Our journey started
                  with a simple belief: food should tell a story, create
                  memories, and bring people together.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  From our humble beginnings as a small family restaurant to
                  becoming a renowned culinary destination, we have remained
                  committed to authenticity, quality, and innovation. Every dish
                  we serve carries the passion and dedication of our culinary
                  team.
                </p>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  To create an exceptional dining experience that celebrates the
                  art of cooking, the joy of sharing, and the beauty of diverse
                  culinary traditions. We strive to source the finest
                  ingredients, support local communities, and provide our guests
                  with unforgettable moments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="text-center">
                    <Leaf className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Sustainability</h4>
                    <p className="text-sm text-gray-600">
                      Committed to eco-friendly practices and local sourcing
                    </p>
                  </div>
                  <div className="text-center">
                    <Award className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Excellence</h4>
                    <p className="text-sm text-gray-600">
                      Pursuing culinary perfection in every dish we serve
                    </p>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Community</h4>
                    <p className="text-sm text-gray-600">
                      Building connections through shared dining experiences
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-6">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-xl mb-3 text-orange-500">
                      Authenticity
                    </h4>
                    <p className="text-gray-600">
                      We honor traditional cooking methods while embracing
                      innovation, ensuring every dish tells an authentic story.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-xl mb-3 text-orange-500">
                      Quality
                    </h4>
                    <p className="text-gray-600">
                      From ingredient selection to final presentation, we
                      maintain the highest standards in everything we do.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-xl mb-3 text-orange-500">
                      Hospitality
                    </h4>
                    <p className="text-gray-600">
                      We believe in creating warm, welcoming experiences that
                      make every guest feel like family.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-xl mb-3 text-orange-500">
                      Innovation
                    </h4>
                    <p className="text-gray-600">
                      We continuously evolve our menu and techniques while
                      respecting culinary traditions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div>
                <h3 className="text-3xl font-bold mb-8 text-center">
                  Meet Our Team
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm text-center"
                    >
                      <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <ChefHat className="w-10 h-10 text-orange-500" />
                      </div>
                      <h4 className="font-bold text-xl mb-2">{member.name}</h4>
                      <p className="text-orange-500 font-medium mb-1">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        {member.experience} experience
                      </p>
                      <p className="text-gray-500 text-sm">
                        Specializes in {member.specialty}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Experience Krantic?
          </h3>
          <p className="text-gray-600 mb-8">
            Join us for an unforgettable culinary journey. Reserve your table
            today and discover what makes Krantic a truly exceptional dining
            destination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-orange-400 text-white px-8 py-3 rounded-lg hover:bg-orange-500 transition-colors font-semibold">
              <Link to="/contact">MAKE RESERVATION</Link>
            </button>
            <div className="flex items-center space-x-2 text-gray-700">
              <Phone className="w-5 h-5" />
              <span>+(406) 555-5555</span>
            </div>
          </div>
        </div>
      </section>
      <KranticFooter />
    </div>
  );
}

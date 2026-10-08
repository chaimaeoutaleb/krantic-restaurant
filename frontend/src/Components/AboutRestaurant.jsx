import React, { useState, useEffect } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const AboutRestaurant = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gray-50 py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src="https://themes.creativehunk.com/krantic/assets/images/common/about-bg.png"
                alt="Restaurant interior"
                className="w-full h-[500px] object-cover object-center"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-4">
                ABOUT RESTAURANT
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                ENJOY AN EXCEPTIONAL
                <br />
                JOURNEY OF TASTE
              </h2>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Our buzzy food-hall style concept is inspired by international
                dining styles, especially in Asia. Explore the following
                fast-action food stations as busy chefs perform.
              </p>
              <p>
                Enjoy a verdant Garden to Glass experience. It's in the view,
                it's reflected in the design, and it infuses many drinks. In
                fact, all our delicious fresh ingredients are sustainably picked
                from our Jemima's Kitchen Garden. Our flourishing range of
                cocktails, spirits, beers and wines are all made with integrity
                and offer something for every guest.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8">
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-colors duration-300 font-medium">
                <Link to="/about">READ MORE ABOUT US</Link>
              </button>

              <div className="flex items-center gap-3 text-gray-900">
                <Phone className="h-5 w-5" />
                <span className="font-medium">+(406) 555-5555</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-800 hover:bg-gray-900 p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4 text-white" />
        </button>
      )}
    </div>
  );
};

export default AboutRestaurant;

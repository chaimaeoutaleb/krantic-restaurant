import React from "react";

const VideoSection = () => {
  return (
    <div className="relative py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience Our Kitchen
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Watch our talented chefs create culinary masterpieces in our
            state-of-the-art kitchen
          </p>
        </div>

        <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/WW0SLuX8HsI?autoplay=1&mute=1&loop=1&playlist=WW0SLuX8HsI&controls=1&rel=0&modestbranding=1&showinfo=0"
            title="Restaurant Kitchen Experience"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSection;

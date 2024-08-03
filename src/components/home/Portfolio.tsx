"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { MoonLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioItem {
  id: string;
  image: string;
  clientName: string;
  shortDescription: string;
  category: string;
}

const categories = [
  "All",
  "Logo Design",
  "Social Media Post",
  "Stream Graphics",
  "Stationary",
  "Motion Graphics & Animation",
];

const formatCategory = (category: string) => {
  return category
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Portfolio: React.FC = () => {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<PortfolioItem[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get("/api/portfolio");
        setPortfolios(response.data);
        setFilteredPortfolios(response.data);
      } catch (err) {
        setError("Failed to load portfolios");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPortfolios(portfolios);
    } else {
      setFilteredPortfolios(
        portfolios.filter(
          (portfolio) => formatCategory(portfolio.category) === selectedCategory
        )
      );
    }
  }, [selectedCategory, portfolios]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsImageLoading(false);
  };

  const handleImageLoadStart = () => {
    setIsImageLoading(true);
  };

  const handleImageLoadEnd = () => {
    setIsImageLoading(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <MoonLoader color="#ffcc00" />
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="p-10 bg-section-gradient">
      <div className="my-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Projects I&apos;ve Recently Completed
        </h1>
        <p className="text-center mb-4">
          The convention represents the major annual event for professionals in
          design.
        </p>

        {/* Dropdown for small screens */}
        <div className="md:hidden my-5 flex justify-center">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="py-2 px-4 rounded-full bg-gray-800 text-gray-400"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Button group for larger screens */}
        <div className="hidden md:flex justify-center mb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`py-2 px-4 rounded-md ${
                  selectedCategory === category
                    ? "bg-yellow text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredPortfolios.length > 0 ? (
            filteredPortfolios.map((portfolio) => (
              <motion.div
                key={portfolio.id}
                className="card rounded-md bg-gray-900 shadow-sm p-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={portfolio.image}
                  alt={portfolio.clientName}
                  width={1000}
                  height={800}
                  className="w-full h-auto rounded-md mb-2 cursor-pointer"
                  objectFit="cover"
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="overlay relative">
                  <h2 className="capitalize text-xl text-gray-200 font-semibold ml-5 my-2">
                    {portfolio.clientName}
                  </h2>
                  <p className="capitalize text-gray-500 ml-5 my-2">
                    {portfolio.shortDescription}
                  </p>
                  <p className="capitalize text-gray-400 ml-5 my-2">
                    {formatCategory(portfolio.category)}
                  </p>
                  <button
                    onClick={() => handleImageClick(portfolio.image)}
                    className="absolute bottom-4 right-4 py-2 px-4 bg-yellow text-white rounded-md"
                  >
                    View Image
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full col-span-full">
              <p className="text-center text-2xl font-bold">
                <span className="text-red-800">OOPS !</span> No portfolio
                available for the selected category...
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal for image view */}
      {selectedImage && (
        <dialog
          open
          className="fixed inset-0 h-full w-full flex items-center justify-center bg-black shadow-md rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 z-50"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div className="relative w-full max-w-4xl bg-gray-900 p-2 rounded-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-4xl"
            >
              &times;
            </button>
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                <MoonLoader color="#ffcc00" />
              </div>
            )}
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={1500}
              height={1200}
              className="w-full h-auto rounded-lg"
              objectFit="contain"
              quality={90}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, 50vw"
              onLoadingComplete={handleImageLoadEnd}
              onError={handleImageLoadEnd}
              onLoadStart={handleImageLoadStart}
            />
          </div>
        </dialog>
      )}
    </section>
  );
};

export default Portfolio;

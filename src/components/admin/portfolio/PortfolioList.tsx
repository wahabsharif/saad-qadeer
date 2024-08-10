"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { AddPortfolioButton } from "./AddPortfolioButton";
import { MoonLoader } from "react-spinners";

interface PortfolioItem {
  _id: string; // Make sure to use '_id' here to match MongoDB
  image: string;
  clientName: string;
  shortDescription: string;
  category:
    | "Logo Design"
    | "Social Media Post"
    | "Stream Graphics"
    | "Stationary"
    | "Motion Graphics & Animation";
}

const PortfolioList: React.FC = () => {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get("/api/portfolio");
        setPortfolios(response.data);
      } catch (err) {
        setError("Failed to load portfolios");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("No ID provided for delete operation");
      return;
    }
    try {
      await axios.delete(`/api/portfolio/${id}`);
      setPortfolios(
        (prevPortfolios) =>
          prevPortfolios.filter((portfolio) => portfolio._id !== id) // Use '_id' to filter
      );
    } catch (err) {
      console.error("Failed to delete portfolio:", err);
      setError("Failed to delete portfolio");
    }
  };

  const formatCategory = (category: string) => {
    return category
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <MoonLoader color="#0096ff" size={100} />
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="overflow-x-auto my-6 p-5">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-4xl font-bold text-center flex-grow">
          Portfolio List
        </h1>
        <AddPortfolioButton />
      </div>
      {portfolios.length > 0 ? (
        <table className="w-full shadow-sm">
          <thead className="">
            <tr>
              <th className="py-2 px-4 border-b text-left">Image</th>
              <th className="py-2 px-4 border-b text-left">Client Name</th>
              <th className="py-2 px-4 border-b text-left">
                Short Description
              </th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((portfolio) => (
              <tr key={portfolio._id}>
                {" "}
                {/* Use '_id' here */}
                <td className="py-2 px-4 border-b">
                  <Image
                    src={portfolio.image}
                    alt={portfolio.clientName}
                    width={100}
                    height={75}
                    className="w-auto h-auto rounded-md"
                  />
                </td>
                <td className="py-2 px-4 border-b capitalize">
                  {portfolio.clientName}
                </td>
                <td className="py-2 px-4 border-b capitalize">
                  {portfolio.shortDescription}
                </td>
                <td className="py-2 px-4 border-b capitalize">
                  {formatCategory(portfolio.category)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(portfolio._id)} // Pass '_id' here
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>No portfolios available</p>
        </div>
      )}
    </section>
  );
};

export default PortfolioList;

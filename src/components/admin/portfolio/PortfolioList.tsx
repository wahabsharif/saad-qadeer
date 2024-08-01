// components/PortfolioList.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { AddPortfolioButton } from "./AddPortfolioButton";

interface PortfolioItem {
  id: string;
  image: string;
  clientName: string;
  shortDescription: string;
  category: string;
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/portfolio/${id}`);
      // Remove the deleted portfolio from the state
      setPortfolios((prevPortfolios) =>
        prevPortfolios.filter((portfolio) => portfolio.id !== id)
      );
    } catch (err) {
      setError("Failed to delete portfolio");
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
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
              <tr key={portfolio.id}>
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
                  {portfolio.category}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(portfolio.id)}
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

// components/PortfolioList.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="overflow-x-auto my-6 p-5">
      <h1 className="my-8 text-4xl font-bold text-center">Portfolio List.</h1>
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
                <td className="py-2 px-4 border-b">{portfolio.clientName}</td>
                <td className="py-2 px-4 border-b">
                  {portfolio.shortDescription}
                </td>
                <td className="py-2 px-4 border-b">{portfolio.category}</td>
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

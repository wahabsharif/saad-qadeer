"use client";

import React, { useState } from "react";
import axios from "axios";

const AddPortfolioForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [clientName, setClientName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !clientName || !shortDescription || !category) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", image);

      const uploadResponse = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: process.env.NEXT_PUBLIC_IMGBB_API_KEY, // Ensure this is loaded properly
          },
        }
      );

      const imageUrl = uploadResponse.data.data.url;

      // Create portfolio item
      await axios.post("/api/portfolio/create", {
        image: imageUrl,
        clientName,
        shortDescription,
        category,
      });

      // Clear form fields
      setImage(null);
      setClientName("");
      setShortDescription("");
      setCategory("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          `Image upload failed: ${err.response?.data?.error || err.message}`
        );
      } else {
        setError("An unexpected error occurred.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Client Name
        </label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Short Description
        </label>
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`mt-4 px-4 py-2 text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } rounded-md`}
      >
        {loading ? "Adding..." : "Add Portfolio"}
      </button>
    </form>
  );
};

export default AddPortfolioForm;

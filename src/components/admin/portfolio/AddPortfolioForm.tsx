"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AddPortfolioForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const categories = [
    "LOGO_DESIGN",
    "SOCIAL_MEDIA_POST",
    "FLYER_DESIGN",
    "STATIONARY",
    "MOTION_GRAPHICS_ANIMATION",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(selectedImage);
      setImagePreviewUrl(previewUrl);
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
      await axios.post("/api/portfolio", {
        image: imageUrl,
        clientName,
        shortDescription,
        category,
      });

      // Clear form fields
      setImage(null);
      setImagePreviewUrl(null);
      setClientName("");
      setShortDescription("");
      setCategory("");

      // Redirect to the portfolio admin page
      router.push("/admin/portfolio");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          `Image upload failed: ${err.response?.data?.error || err.message}`
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-5">
      <div>
        <h1 className="my-8 text-4xl font-bold text-center">Add Portfolio</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-200">
              Client Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="mt-1 block w-full p-2 text-gray-800 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-200">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full p-2 text-gray-800 border border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-200">
            Short Description
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={5}
            className="mt-1 block w-full border text-gray-800 p-2 border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-200">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-gray-400 cursor-pointer"
          />
          {imagePreviewUrl && (
            <Image
              src={imagePreviewUrl}
              alt="Image preview"
              className="mt-2 max-w-full h-auto rounded-xl"
              objectFit="cover"
              width={500}
              height={500}
            />
          )}
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
    </section>
  );
};

export default AddPortfolioForm;

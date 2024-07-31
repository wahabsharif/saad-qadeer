//services/portfolioService.ts

import prisma from "@/lib/prisma";
import { uploadImageToImgbb } from "../lib/imgbb";

export const createPortfolio = async (data: {
  image: string;
  clientName: string;
  shortDescription: string;
  category: string;
}) => {
  console.log("Creating portfolio with data:", data);
  try {
    return await prisma.portfolio.create({
      data: {
        image: data.image,
        clientName: data.clientName,
        shortDescription: data.shortDescription,
        category: data.category,
      },
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      console.error("Database error:", error);
      throw new Error(`Database error: ${error.message}`);
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getPortfolioById = async (id: number) => {
  try {
    return await prisma.portfolio.findUnique({
      where: { id },
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      console.error("Database error:", error);
      throw new Error(`Database error: ${error.message}`);
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAllPortfolios = async () => {
  try {
    return await prisma.portfolio.findMany();
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      console.error("Database error:", error);
      throw new Error(`Database error: ${error.message}`);
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updatePortfolio = async (
  id: number,
  data: Partial<{
    image: Buffer | string;
    clientName: string;
    shortDescription: string;
    category: string;
  }>
) => {
  const updatedData: Partial<{
    image: string;
    clientName: string;
    shortDescription: string;
    category: string;
  }> = {};

  try {
    if (data.image) {
      // Ensure the image is uploaded to imgbb
      updatedData.image = await uploadImageToImgbb(data.image);
    }
    if (data.clientName) updatedData.clientName = data.clientName;
    if (data.shortDescription)
      updatedData.shortDescription = data.shortDescription;
    if (data.category) updatedData.category = data.category;

    return await prisma.portfolio.update({
      where: { id },
      data: updatedData,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      console.error("Database error:", error);
      throw new Error(`Database error: ${error.message}`);
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deletePortfolio = async (id: number) => {
  try {
    return await prisma.portfolio.delete({
      where: { id },
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      console.error("Database error:", error);
      throw new Error(`Database error: ${error.message}`);
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

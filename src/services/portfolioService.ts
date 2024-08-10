import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { uploadImageToImgbb } from "@/lib/imgbb";

// Define a TypeScript interface for the Portfolio
interface PortfolioData {
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

const COLLECTION_NAME = "portfolio";

export async function createPortfolio(data: PortfolioData) {
  try {
    const client = await clientPromise;
    const db = client.db("SaadDatabase");

    let imageUrl = "";
    if (data.image) {
      // Handle image upload if provided
      imageUrl = await uploadImageToImgbb(data.image);
    }

    const portfolioData = {
      ...data,
      image: imageUrl,
    };

    const result = await db
      .collection(COLLECTION_NAME)
      .insertOne(portfolioData);
    return result;
  } catch (error) {
    console.error("Failed to create portfolio:", error);
    throw new Error("Failed to create portfolio");
  }
}

export async function updatePortfolio(id: string, data: PortfolioData) {
  try {
    const client = await clientPromise;
    const db = client.db("SaadDatabase");

    let imageUrl = data.image;
    if (data.image && typeof data.image !== "string") {
      // Handle image upload if provided as a new image
      imageUrl = await uploadImageToImgbb(data.image);
    }

    const updateData = {
      ...data,
      image: imageUrl,
    };

    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      throw new Error("No document matched the provided ID");
    }

    return result;
  } catch (error) {
    console.error("Failed to update portfolio:", error);
    throw new Error("Failed to update portfolio");
  }
}

export async function getPortfolios() {
  try {
    const client = await clientPromise;
    const db = client.db("SaadDatabase");
    const portfolios = await db.collection(COLLECTION_NAME).find({}).toArray();
    return portfolios;
  } catch (error) {
    console.error("Failed to fetch portfolios:", error);
    throw new Error("Failed to fetch portfolios");
  }
}

export async function getPortfolioById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("SaadDatabase");
    const portfolio = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    return portfolio;
  } catch (error) {
    console.error("Failed to fetch portfolio by ID:", error);
    throw new Error("Failed to fetch portfolio by ID");
  }
}

export async function deletePortfolio(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("SaadDatabase");
    const result = await db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error("No document matched the provided ID");
    }

    return result;
  } catch (error) {
    console.error("Failed to delete portfolio:", error);
    throw new Error("Failed to delete portfolio");
  }
}

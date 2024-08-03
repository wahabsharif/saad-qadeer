import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { uploadImageToImgbb } from "@/lib/imgbb";

const COLLECTION_NAME = "portfolio";

export async function createPortfolio(data: any) {
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

  return db.collection(COLLECTION_NAME).insertOne(portfolioData);
}

export async function updatePortfolio(id: string, data: any) {
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

  return db
    .collection(COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
}

export async function getPortfolios() {
  const client = await clientPromise;
  const db = client.db("SaadDatabase");
  return db.collection(COLLECTION_NAME).find({}).toArray();
}

export async function getPortfolioById(id: string) {
  const client = await clientPromise;
  const db = client.db("SaadDatabase");
  return db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
}

export async function deletePortfolio(id: string) {
  const client = await clientPromise;
  const db = client.db("SaadDatabase");
  return db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
}

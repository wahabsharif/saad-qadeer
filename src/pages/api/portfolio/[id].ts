import type { NextApiRequest, NextApiResponse } from "next";
import {
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from "@/services/portfolioService";
import { uploadImageToImgbb } from "@/lib/imgbb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "GET") {
    try {
      const portfolio = await getPortfolioById(id);
      if (portfolio) {
        res.status(200).json(portfolio);
      } else {
        res.status(404).json({ error: "Portfolio not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio" });
    }
  } else if (req.method === "PUT") {
    try {
      const { image, ...rest } = req.body;
      let imageUrl = "";

      if (image) {
        // Handle image upload if provided
        imageUrl = await uploadImageToImgbb(image);
      }

      const result = await updatePortfolio(id, { ...rest, image: imageUrl });

      if (result.matchedCount > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "Portfolio not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Failed to update portfolio" });
    }
  } else if (req.method === "DELETE") {
    try {
      const result = await deletePortfolio(id);
      if (result.deletedCount > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Portfolio not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete portfolio" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

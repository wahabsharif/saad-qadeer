// src/pages/api/portfolio/create.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createPortfolio } from "@/services/portfolioService";
import { cors } from "@/lib/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res); // Apply CORS middleware

  if (req.method === "POST") {
    try {
      console.log("Request body:", req.body);
      const { image, clientName, shortDescription, category } = req.body;

      if (!image || !clientName || !shortDescription || !category) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const validCategories = [
        "LOGO_DESIGN",
        "SOCIAL_MEDIA_POST",
        "FLYER_DESIGN",
        "STATIONARY",
        "MOTION_GRAPHICS_ANIMATION",
      ];

      if (!validCategories.includes(category)) {
        return res.status(400).json({ error: "Invalid category" });
      }

      const portfolio = await createPortfolio({
        image,
        clientName,
        shortDescription,
        category,
      });

      res.status(201).json(portfolio);
    } catch (error) {
      console.error("Error creating portfolio:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = `Unable to create portfolio: ${error.message}`;
      }
      res.status(500).json({ error: errorMessage });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { createPortfolio } from "@/services/portfolioService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log("Request body:", req.body);
      const { image, clientName, shortDescription, category } = req.body;

      if (!image || !clientName || !shortDescription || !category) {
        return res.status(400).json({ error: "Missing required fields" });
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

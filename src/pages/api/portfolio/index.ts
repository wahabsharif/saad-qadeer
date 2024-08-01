// src/pages/api/portfolio/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPortfolios } from "@/services/portfolioService";
import { cors } from "@/lib/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res); // Apply CORS middleware

  if (req.method === "GET") {
    try {
      const portfolios = await getAllPortfolios();
      res.status(200).json(portfolios);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch portfolios" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

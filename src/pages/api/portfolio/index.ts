import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPortfolios } from "@/services/portfolioService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

import type { NextApiRequest, NextApiResponse } from "next";
import {
  getPortfolios,
  createPortfolio,
} from "../../../services/portfolioService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const portfolios = await getPortfolios();
      res.status(200).json(portfolios);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolios" });
    }
  } else if (req.method === "POST") {
    try {
      const result = await createPortfolio(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: "Failed to create portfolio" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

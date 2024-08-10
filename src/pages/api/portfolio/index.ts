import type { NextApiRequest, NextApiResponse } from "next";
import {
  getPortfolios,
  createPortfolio,
  deletePortfolio,
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
      console.error("Failed to fetch portfolios:", error);
      res.status(500).json({ error: "Failed to fetch portfolios" });
    }
  } else if (req.method === "POST") {
    try {
      const result = await createPortfolio(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error("Failed to create portfolio:", error);
      res.status(400).json({ error: "Failed to create portfolio" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (typeof id !== "string") {
        return res.status(400).json({ error: "Invalid ID" });
      }
      await deletePortfolio(id);
      res.status(204).end();
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
      res.status(500).json({ error: "Failed to delete portfolio" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

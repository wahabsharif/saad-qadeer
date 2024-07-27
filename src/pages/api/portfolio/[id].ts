import type { NextApiRequest, NextApiResponse } from "next";
import {
  getPortfolioById,
  deletePortfolio,
} from "../../../services/portfolioService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "GET") {
    try {
      const portfolio = await getPortfolioById(parseInt(id, 10));
      if (portfolio) {
        res.status(200).json(portfolio);
      } else {
        res.status(404).json({ error: "Portfolio not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch portfolio" });
    }
  } else if (req.method === "DELETE") {
    try {
      await deletePortfolio(parseInt(id, 10));
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Unable to delete portfolio" });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

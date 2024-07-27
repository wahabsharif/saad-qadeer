import type { NextApiRequest, NextApiResponse } from "next";
import { createPortfolio } from "../../../services/portfolioService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const portfolio = await createPortfolio(req.body);
      res.status(201).json(portfolio);
    } catch (error) {
      res.status(500).json({ error: "Unable to create portfolio" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

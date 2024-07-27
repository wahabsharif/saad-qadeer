import type { NextApiRequest, NextApiResponse } from "next";
import { updatePortfolio } from "../../../../services/portfolioService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "PUT") {
    try {
      const updatedPortfolio = await updatePortfolio(
        parseInt(id, 10),
        req.body
      );
      if (updatedPortfolio) {
        res.status(200).json(updatedPortfolio);
      } else {
        res.status(404).json({ error: "Portfolio not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to update portfolio" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

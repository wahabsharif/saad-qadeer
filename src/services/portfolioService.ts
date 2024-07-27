// src/services/portfolioService.ts
import prisma from "../lib/prisma";

export const createPortfolio = async (data: {
  image: string;
  clientName: string;
  shortDescription: string;
  category: string;
}) => {
  return await prisma.portfolio.create({
    data,
  });
};

export const getPortfolioById = async (id: number) => {
  return await prisma.portfolio.findUnique({
    where: { id },
  });
};

export const getAllPortfolios = async () => {
  return await prisma.portfolio.findMany();
};

export const updatePortfolio = async (
  id: number,
  data: Partial<{
    image: string;
    clientName: string;
    shortDescription: string;
    category: string;
  }>
) => {
  return await prisma.portfolio.update({
    where: { id },
    data,
  });
};

export const deletePortfolio = async (id: number) => {
  return await prisma.portfolio.delete({
    where: { id },
  });
};

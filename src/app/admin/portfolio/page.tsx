import AddPortfolioForm from "@/components/admin/portfolio/AddPortfolioForm";
import PortfolioList from "@/components/admin/portfolio/PortfolioList";
import React from "react";

export default function PortfolioPage() {
  return (
    <div>
      <AddPortfolioForm />
      <PortfolioList />
    </div>
  );
}

import PulsatingButton from "@/components/magicui/pulsating-button";
import { useRouter } from "next/navigation";

export function AddPortfolioButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/portfolio/add");
  };

  return (
    <PulsatingButton className="font-bold" onClick={handleClick}>
      Add Portfolio
    </PulsatingButton>
  );
}

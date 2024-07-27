import { cn } from "@/lib/utils";
import Image from "next/image";
import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("@/components/magicui/marquee"), {
  ssr: false,
});

const expertiseData = [
  {
    title: "Adobe Aero",
    icon: "adobe-aero-icon.svg",
  },
  {
    title: "Adobe After Effects",
    icon: "adobe-after-effects-icon.svg",
  },
  {
    title: "Adobe Animate",
    icon: "adobe-animate-icon.svg",
  },
  {
    title: "Adobe Cloud",
    icon: "adobe-cloud-icon.svg",
  },
  {
    title: "Adobe Dream Weaver",
    icon: "adobe-dreamweaver-icon.svg",
  },
  {
    title: "Adobe InDesign",
    icon: "adobe-id-icon.svg",
  },
  {
    title: "Adobe LightRoom",
    icon: "adobe-lightroom-icon.svg",
  },
  {
    title: "Adobe Premiere",
    icon: "adobe-premiere-icon.svg",
  },
  {
    title: "Adobe XD",
    icon: "adobe-xd-icon.svg",
  },
  {
    title: "Figma",
    icon: "figma-icon.svg",
  },
  {
    title: "Adobe Illustrator",
    icon: "illustrator-icon.svg",
  },
  {
    title: "Adobe PhotoShop",
    icon: "photoshop-icon.svg",
  },
];

const firstRow = expertiseData.slice(expertiseData.length / 2);
const secondRow = expertiseData.slice(expertiseData.length / 2);

const ReviewCard = ({ icon, title }: { icon: string; title: string }) => {
  return (
    <figure
      className={cn(
        "relative w-25 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={require(`@/assets/icons/${icon}`).default.src}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {title}
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

export function Expertise() {
  return (
    <section className="relative flex mt-10 w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.title} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.title} {...review} />
        ))}
      </Marquee>
    </section>
  );
}

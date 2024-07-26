import React from "react";
import dynamic from "next/dynamic";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { servicesData } from "@/data/servicesData";

const BlurFade = dynamic(() => import("@/components/magicui/blur-fade"));

const MyServices: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center p-4 mt-5">
      <h1 className="my-8 text-4xl font-bold text-center">My Services.</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicesData.map((service, index) => (
          <NeonGradientCard
            key={index}
            className="max-w-sm items-center justify-center text-center"
          >
            <BlurFade delay={0.25} inView>
              <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-3xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                {service.title}
              </span>
            </BlurFade>
            <BlurFade delay={0.25 * 2} inView>
              <p className="mt-4 text-lg">{service.description}</p>
            </BlurFade>
          </NeonGradientCard>
        ))}
      </div>
    </section>
  );
};

export default MyServices;

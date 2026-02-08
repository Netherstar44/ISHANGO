import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  bgImage?: string;
  overlayColor?: string;
}

export function Section({ id, children, className, bgImage, overlayColor }: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "relative w-full min-h-screen snap-center flex flex-col items-center justify-center overflow-hidden py-20 px-4 md:px-8",
        className
      )}
    >
      {/* Dynamic Background Image */}
      {bgImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear scale-110 hover:scale-100"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{ backgroundColor: overlayColor || 'rgba(0,0,0,0.6)' }} 
      />

      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="relative z-20 w-full max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

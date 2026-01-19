import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingProps {
  variant?: "dots" | "bars";
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const DotsLoader = ({ size }: { size: "sm" | "md" | "lg" }) => {
  const dotSize = size === "sm" ? 8 : size === "md" ? 12 : 16;

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="rounded-full bg-white"
          style={{ width: dotSize, height: dotSize }}
          animate={{
            y: [-4, 4, -4],
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
};

const BarsLoader = ({ size }: { size: "sm" | "md" | "lg" }) => {
  const barHeight = size === "sm" ? 24 : size === "md" ? 36 : 48;
  const barWidth = size === "sm" ? 4 : size === "md" ? 6 : 8;

  return (
    <div className="flex items-end gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="rounded-full bg-linear-to-t from-orange-500 to-amber-300"
          style={{ width: barWidth }}
          animate={{
            height: [barHeight * 0.3, barHeight, barHeight * 0.5, barHeight * 0.8, barHeight * 0.3],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

export function Loading({ variant = "dots", size = "md", text, className }: LoadingProps) {
  const loaders = {
    dots: DotsLoader,
    bars: BarsLoader,
  };

  const LoaderComponent = loaders[variant];

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <LoaderComponent size={size} />
      {text && (
        <motion.p
          className="text-orange-500/70 font-sans text-sm tracking-wide"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

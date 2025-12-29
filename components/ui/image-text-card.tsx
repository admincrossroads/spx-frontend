"use client";

import { OptimizedImage } from "./optimized-image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ImageTextCardProps {
  image: {
    src: string;
    alt: string;
    className?: string;
  };
  title?: string;
  content: ReactNode;
  imagePosition?: "left" | "right" | "top" | "bottom";
  imageSize?: "small" | "medium" | "large" | "full";
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  variant?: "default" | "muted" | "bordered";
  animate?: boolean;
}

const imageSizeClasses = {
  small: "h-64",
  medium: "h-80",
  large: "h-96",
  full: "h-[420px]",
};

const variantClasses = {
  default: "",
  muted: "bg-muted/40",
  bordered: "border rounded-xl p-6",
};

export default function ImageTextCard({
  image,
  title,
  content,
  imagePosition = "right",
  imageSize = "medium",
  className,
  imageClassName,
  contentClassName,
  variant = "default",
  animate = true,
}: ImageTextCardProps) {
  const imageHeight = imageSizeClasses[imageSize];
  const variantClass = variantClasses[variant];

  const imageComponent = (
    <motion.div
      initial={animate ? { opacity: 0, x: imagePosition === "left" ? -40 : imagePosition === "right" ? 40 : 0, y: imagePosition === "top" ? -40 : imagePosition === "bottom" ? 40 : 0 } : {}}
      whileInView={animate ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "relative w-full rounded-xl overflow-hidden shadow-md",
        imageHeight,
        imageClassName,
        image.className
      )}
    >
      <OptimizedImage
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        showSkeleton={true}
      />
    </motion.div>
  );

  const contentComponent = (
    <motion.div
      initial={animate ? { opacity: 0, x: imagePosition === "left" ? 40 : imagePosition === "right" ? -40 : 0, y: imagePosition === "top" ? 40 : imagePosition === "bottom" ? -40 : 0 } : {}}
      whileInView={animate ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn("text-lg leading-relaxed", contentClassName || "space-y-8")}
    >
      <div className="text-justify-custom text-muted-foreground">
        {title && (
          <h2 className="text-3xl font-semibold mb-8">{title}</h2>
        )}
        {content}
      </div>
    </motion.div>
  );

  // Vertical layouts
  if (imagePosition === "top" || imagePosition === "bottom") {
    return (
      <div className={cn("space-y-6", variantClass, className)}>
        {imagePosition === "top" && imageComponent}
        {contentComponent}
        {imagePosition === "bottom" && imageComponent}
      </div>
    );
  }

  // Horizontal layouts
  const isImageLeft = imagePosition === "left";
  
  return (
    <div className={cn(
      "grid lg:grid-cols-2 gap-8 lg:gap-12 items-center",
      variantClass,
      className
    )}>
      {isImageLeft && imageComponent}
      {contentComponent}
      {!isImageLeft && imageComponent}
    </div>
  );
}


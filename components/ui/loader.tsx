"use client";

import CogwheelLoader from "./cogwheel-loader";

export default function SPXLoader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <CogwheelLoader size="md" />
    </div>
  );
}

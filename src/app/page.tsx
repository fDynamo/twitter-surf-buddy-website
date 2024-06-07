"use client";

import { Suspense } from "react";
import MainContents from "@/components/MainContents";

export default function Home() {
  return (
    <Suspense>
      <MainContents />
    </Suspense>
  );
}

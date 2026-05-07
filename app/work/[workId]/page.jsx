"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const WorkDetailPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/projects");
  }, [router]);
  return null;
};

export default WorkDetailPage;

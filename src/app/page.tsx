"use client";

import { Button } from "@/components/ui/button";
import { useStateUser } from "@/store/state";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default function HomePage() {
  const queryClient = useQueryClient();
  const { dataUser } = useStateUser();
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["allProjects"] });
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Landing Page
      <Button
        onSubmit={() =>
          queryClient.invalidateQueries({ queryKey: ["allProjects"] })
        }
      >
        Click me
      </Button>
    </div>
  );
}

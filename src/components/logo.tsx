"use client";

import { useRouter } from "next/navigation";

interface ClassProps {
  className?: string;
}

export const BrandLogo = ({ className }: ClassProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center space-x-2 cursor-pointer group transition-all"
    >
      <div className="size-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:rotate-12 duration-300">
        <span className="text-white font-bold text-sm">PM</span>
      </div>
      <span
        className={`${className} text-xl font-bold text-purple-600 hover:text-gray-800 dark:hover:text-gray-200 duration-300`}
      >
        ProjectM
      </span>
    </div>
  );
};

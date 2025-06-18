"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const languages = [
  {
    code: "vi",
    label: "Tiếng Việt",
    flag: "/images/flag-vietnam.png",
  },
  {
    code: "en",
    label: "English",
    flag: "/images/flag-united-states.png",
  },
];

export default function LanguageToggle({ align }: { align: "start" | "end" }) {
  const [currentLang, setCurrentLang] = useState("en");

  const handleChange = (lang: string) => {
    setCurrentLang(lang);
  };

  const current = languages.find((l) => l.code === currentLang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Image
            src={current?.flag || "/flags/vn.png"}
            alt={current?.label || ""}
            width={20}
            height={14}
          />
          <span>{current?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className="flex items-center gap-2"
          >
            <Image src={lang.flag} alt={lang.label} width={20} height={14} />
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

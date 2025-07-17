"use client";

import { useTranslation } from "react-i18next";
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
  {
    code: "fr",
    label: "Français",
    flag: "/images/flag-france.png",
  },
  {
    code: "cn",
    label: "中国话",
    flag: "/images/flag-china.png",
  },
];

export default function LanguageToggle({ align }: { align: "start" | "end" }) {
  const { i18n } = useTranslation();
  const currentLanguage =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Image
            src={currentLanguage?.flag || "/flags/vn.png"}
            alt={currentLanguage?.label || ""}
            width={20}
            height={14}
          />
          <span>{currentLanguage?.label}</span>
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

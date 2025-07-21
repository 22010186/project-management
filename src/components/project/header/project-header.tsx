"use client";

import { Button } from "../../ui/button";
import { Clock, Filter, Grid3X3, List, Plus, Share, Table } from "lucide-react";
import { Input } from "../../ui/input";
import { HeaderTitle } from "./header-title";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  activeTab: number;
  setActiveTab: (tabIndex: number) => void;
};

const ProjectHeader = ({ title, activeTab, setActiveTab }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="">
      <div className="py-6 lg:pb-4 lg:pt-8">
        <HeaderTitle name={title} button={true} />
      </div>

      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 py-2 dark:border-gray-600 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="board"
            icon={<Grid3X3 size={20} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            index={1}
          />
          <TabButton
            name="list"
            icon={<List size={20} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            index={2}
          />
          <TabButton
            name="timeline"
            icon={<Clock size={20} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            index={3}
          />
          <TabButton
            name="table"
            icon={<Table size={20} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            index={4}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="link">
            <Filter size={20} />
          </Button>
          <Button variant="link">
            <Share size={20} />
          </Button>
          <div className="relative h-10 w-full">
            <Grid3X3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
            <Input
              type="text"
              placeholder={t("search")}
              className="pl-10 pr-3 py-2 text-md w-full focus:ring-0 focus:outline-none focus:shadow-none " // Add additional styling as needed
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProjectHeader };

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabIndex: number) => void;
  activeTab: number;
  index: number;
};

const TabButton = ({
  name,
  icon,
  activeTab,
  setActiveTab,
  index,
}: TabButtonProps) => {
  const isActive = activeTab == index ? "outline" : "ghost";
  const { t } = useTranslation();

  return (
    <Button variant={isActive} onClick={() => setActiveTab(index)}>
      {icon}
      {t("page.project.tab." + name)}
    </Button>
  );
};

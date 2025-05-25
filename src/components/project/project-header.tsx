"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Clock, Filter, Grid3X3, List, Share, Table } from "lucide-react";
import { Input } from "../ui/input";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProject, setIsModalNewProject] = useState(false);

  return (
    <div className="">
      <div className="py-6 lg:pb-4 lg:pt-8">
        <HeaderTitle name="Project X" />
      </div>

      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 py-2 dark:border-gray-600 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 size={20} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="List"
            icon={<List size={20} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock size={20} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Table"
            icon={<Table size={20} />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
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
              placeholder="Search Task"
              className="pl-10 pr-3 py-2 text-md w-full focus:ring-0 focus:outline-none focus:shadow-none " // Add additional styling as needed
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProjectHeader };

type HeaderTitleProps = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};
const HeaderTitle = ({
  name,
  isSmallText,
  buttonComponent,
}: HeaderTitleProps) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText} ? 'text-lg' : 'text-2xl' font-semibold dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ name, icon, activeTab, setActiveTab }: TabButtonProps) => {
  const isActive = activeTab == name ? "outline" : "ghost";

  return (
    <Button variant={isActive} onClick={() => setActiveTab(name)}>
      {icon}
      {name}
    </Button>
  );
};

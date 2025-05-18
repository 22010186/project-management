"use client";

import { getAllProjects } from "@/lib/supabase/api/projects";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function Project({ params }: Props) {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  // const query = useQuery({
  //   queryKey: ["allProjects"],
  //   queryFn: getAllProjects,
  // });

  return <div>{id}</div>;
}

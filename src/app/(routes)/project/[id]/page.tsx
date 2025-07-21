"use client";

import { Loading } from "@/components/loading";
import { ProjectHeader } from "@/components/project/header/project-header";
import { BoardView } from "@/components/project/view/board/board-view";
import { ListView } from "@/components/project/view/list/list-view";
import { getTaskByProjectId } from "@/lib/supabase/api/tasks";
import { useStateProject } from "@/store/state";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import CometChatComponent from "@/components/cometchat/chat";

type Props = {
  id: string;
};

export default function Project() {
  const params = useParams<Props>();
  const { id } = params;
  const [activeTab, setActiveTab] = useState(1);
  const { name } = useStateProject();
  const [open, setOpen] = useState(false);

  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`task-project-${id}`],
    queryFn: () => getTaskByProjectId(id),
  });

  if (isLoading) return <Loading />;
  if (error) throw error;

  return (
    <div>
      <ProjectHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        title={name}
      />

      {activeTab == 1 && <BoardView id={id} tasks={tasks} />}
      {activeTab == 2 && <ListView id={id} tasks={tasks} />}

      {/* Chat */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <div className="fixed bottom-8 right-8 flex items-center justify-center size-16 rounded-full border-2 bg-blue-400 cursor-pointer transition-transform hover:-translate-y-2">
            <svg viewBox="-10 -10 50 50" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="M7.46204 2.02746C9.75027 0.698327 12.3495 -0.00118377 14.9955 2.60373e-06C17.3031 -0.00135734 19.5799 0.530028 21.6487 1.55279C23.7174 2.57556 25.5223 4.0621 26.9227 5.89671C28.3232 7.73131 29.2815 9.86447 29.723 12.1301C30.1645 14.3958 30.0773 16.7328 29.4682 18.9592C28.8591 21.1856 27.7446 23.2414 26.2113 24.9665C24.678 26.6916 22.7675 28.0395 20.6283 28.9052C18.4891 29.7708 16.179 30.131 13.8779 29.9576C11.5768 29.7842 9.34679 29.0819 7.36139 27.9055L1.82937 29.9182C1.67979 29.9719 1.52209 29.9996 1.36314 30C1.14407 29.9998 0.928264 29.9469 0.733997 29.8456C0.53973 29.7443 0.372728 29.5977 0.247134 29.4181C0.12154 29.2386 0.0410546 29.0314 0.0124944 28.8141C-0.0160657 28.5969 0.00814083 28.3759 0.0830636 28.17L2.09384 22.6364C0.744944 20.3593 0.022709 17.7656 0.000526832 15.1189C-0.0216553 12.4721 0.657007 9.86671 1.96755 7.56733C3.27809 5.26795 5.1738 3.35658 7.46204 2.02746ZM10.906 8.03644C9.8745 8.03644 9.03787 8.87337 9.03787 9.90461C9.03787 10.9368 9.8745 11.7731 10.906 11.7734C11.9373 11.7734 12.7739 10.9368 12.7739 9.90461C12.7739 8.87306 11.9373 8.03644 10.906 8.03644ZM19.3774 8.03644C18.3462 8.03644 17.5087 8.87337 17.5087 9.90461C17.5087 10.9368 18.3465 11.7731 19.3774 11.7734C20.409 11.7734 21.2456 10.9368 21.2456 9.90461C21.2456 8.87306 20.4087 8.03644 19.3774 8.03644ZM15.0178 21.9635C18.0564 21.9635 20.7678 20.2336 21.9256 17.5563C22.1238 17.098 21.9129 16.566 21.4541 16.368C20.9965 16.1692 20.4644 16.3804 20.2662 16.8386C19.3946 18.8541 17.3345 20.1562 15.0178 20.1562C12.6474 20.1562 10.5752 18.855 9.73862 16.841C9.59431 16.4931 9.2581 16.2834 8.9038 16.2834C8.78812 16.2834 8.67062 16.3057 8.55734 16.3524C8.0961 16.544 7.87768 17.073 8.06929 17.534C9.187 20.2249 11.9144 21.9635 15.0178 21.9635Z"
              ></path>
            </svg>
          </div>
        </DrawerTrigger>
        <DrawerContent className="h-full">
          <CometChatComponent openChat={open} />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

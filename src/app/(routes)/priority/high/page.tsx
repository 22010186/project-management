"use client";

import { HeaderTitle } from "@/components/project/header/header-title";
import { ListView } from "@/components/project/view/list/list-view";
import { useStateAllTask } from "@/store/state";

export default function UrgentPage() {
  const { tasks } = useStateAllTask();

  return (
    <div className="p-8">
      <div className="py-6 lg:pb-4 lg:pt-8">
        <div className="flex items-center">
          <HeaderTitle name="Priority: High" button={false} />
        </div>
      </div>

      <ListView
        tasks={tasks?.filter((task) => task.priority == "High") ?? []}
      />
    </div>
  );
}

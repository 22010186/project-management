"use client";

import ConfirmEmail from "@/components/auth/confirm-email";
import { Button } from "@/components/ui/button";
import { useStateUser } from "@/store/state";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function HomePage() {
  const queryClient = useQueryClient();
  const { dataUser } = useStateUser();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["allProjects"] });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-8 font-[family-name:var(--font-geist-sans)]">
      {dataUser ? (
        !dataUser.email_confirmed_at ? (
          <ConfirmEmail />
        ) : (
          <div>Landing Page</div>
        )
      ) : (
        <Button onSubmit={() => handleRefresh()}>No User Found</Button>
      )}
    </div>
  );
}

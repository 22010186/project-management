"use client";

import { Loading } from "@/components/loading";
import { HeaderTitle } from "@/components/project/header/header-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTeams } from "@/lib/supabase/api/teams";
import { useQuery } from "@tanstack/react-query";

export default function TeamsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allTeams"],
    queryFn: getTeams,
  });

  if (isLoading) return <Loading />;
  if (error) throw error;

  return (
    <div className="p-8">
      <div className="py-6 lg:pb-4 lg:pt-8">
        <HeaderTitle name="Teams" button={false} />
      </div>

      <Table className="border max-h-40">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Index</TableHead>
            <TableHead>Team ID</TableHead>
            <TableHead>Team Name</TableHead>
            <TableHead>Product Owner</TableHead>
            <TableHead>Project Manager</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((team, index) => (
            <TableRow key={team.teamid}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{team.teamid}</TableCell>
              <TableCell>{team.teamname}</TableCell>
              <TableCell>{team.productownerusername}</TableCell>
              <TableCell>{team.projectmanagerusername}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

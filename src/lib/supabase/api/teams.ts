import { Team } from "@/store/type";
import { createClient } from "../client";

export const getTeams = async () => {
  const supabase = createClient();
  try {
    const { data: teams, error } = await supabase.from("team").select();

    const teamsWithUsernames = await Promise.all(
      teams!.map(async (team: Team) => {
        const { data: productOwner } = await supabase
          .from("User")
          .select("username")
          .eq("userid", team.productowneruserid);

        const { data: projectManager } = await supabase
          .from("User")
          .select("username")
          .eq("userid", team.projectmanageruserid);

        return {
          ...team,
          productownerusername: productOwner![0].username,
          projectmanagerusername: projectManager![0].username,
        };
      })
    );

    return teamsWithUsernames;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

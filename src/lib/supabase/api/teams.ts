import { Team } from "@/store/type";
import { createClient } from "../client";

export const getTeams = async (teamid?: number) => {
  if (!teamid) return [];

  const supabase = createClient();
  try {
    const { data: owner } = await supabase
      .from("team")
      .select()
      .eq("id", teamid)
      .single();

    const { data: teams } = await supabase
      .from("team")
      .select()
      .eq("productowneruserid", owner.productowneruserid);

    const teamsWithUsernames = await Promise.all(
      teams!.map(async (team: Team) => {
        const { data: productOwner } = await supabase
          .from("User")
          .select("username")
          .eq("userid", team.productowneruserid)
          .single();

        const { data: projectManager } = await supabase
          .from("User")
          .select("username")
          .eq("userid", team.projectmanageruserid)
          .single();

        return {
          ...team,
          productownerusername: productOwner?.username,
          projectmanagerusername: projectManager?.username,
        };
      })
    );

    return teamsWithUsernames;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createTeams = async (team: Partial<Team>) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("team")
      .insert(team)
      .select()
      .limit(1)
      .single();

    await supabase
      .from("User")
      .update({ teamid: data.id })
      .eq("userid", data.productowneruserid);
    await supabase
      .from("User")
      .update({ teamid: data.id })
      .eq("userid", data.projectmanageruserid);

    return {
      data: data as Team,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const leaveTeam = async (userid: number, teamid: number) => {
  const supabase = createClient();
  try {
    await supabase.from("User").update({ teamid: null }).eq("userid", userid);
    await supabase.from("team").delete().eq("id", teamid);
    await supabase.from("projectteam").delete().eq("teamid", teamid);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

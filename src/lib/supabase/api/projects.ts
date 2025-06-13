import { Project, ProjectTeam, Team } from "@/store/type";
import { createClient } from "../client";
import { useStateUser } from "@/store/state";

export const getAllProjects = async (teamid?: number) => {
  if (!teamid) return [];
  const supabase = createClient();
  try {
    const { data: owner, error: errorTeam } = await supabase
      .from("team")
      .select()
      .eq("id", teamid)
      .single();

    if (errorTeam) throw errorTeam;

    const { data: teams } = await supabase
      .from("team")
      .select("id")
      .eq("productowneruserid", owner.productowneruserid);

    const projectTeam = await Promise.all(
      teams!.map(async (team: { id: number }) => {
        const { data } = await supabase
          .from("projectteam")
          .select("projectid")
          .eq("teamid", team.id);

        const arr = [...new Set(data?.map((d) => d.projectid))];
        return arr;
      })
    );

    const projectIds = [...new Set(projectTeam.flat())];
    const filteredProjectIds = projectIds.filter((item) => item !== null);

    const projects = await Promise.all(
      filteredProjectIds.map(async (projectId) => {
        if (!projectId) return;
        const { data, error } = await supabase
          .from("project")
          .select()
          .eq("id", projectId)
          .single();

        return data;
      })
    );
    if (!projects.length) return [];

    return projects as Project[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createProject = async (
  data: Partial<Project>,
  teamid?: number
) => {
  const supabase = createClient();
  if (!teamid) throw new Error("Team ID not provided!");

  try {
    const { data: project } = await supabase
      .from("project")
      .insert(data)
      .select("id")
      .limit(1)
      .single();

    if (!project) throw new Error("Project not created!");

    const { data: owner, error: errorTeam } = await supabase
      .from("team")
      .select()
      .eq("id", teamid)
      .single();

    if (errorTeam) throw errorTeam;

    const { data: teams } = await supabase
      .from("team")
      .select("id")
      .eq("productowneruserid", owner.productowneruserid);

    await Promise.all(
      teams!.map(async (team: { id: number }) => {
        const { data } = await supabase
          .from("projectteam")
          .insert({ projectid: project.id, teamid: team.id });
      })
    );

    return {
      data: project,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteProject = async (projectid: number) => {
  const supabase = createClient();
  try {
    await supabase.from("projectteam").delete().eq("projectid", projectid);
    const { error } = await supabase
      .from("project")
      .delete()
      .eq("id", projectid);

    await supabase.from("task").delete().eq("projectid", projectid);
    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

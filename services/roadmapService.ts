import { supabase } from "@/lib/supabase";
import { RoadmapDTO, TechnologyDTO } from "@/lib/validators";
import { RoadmapStep } from "@/types/decarbonization";

/**
 * Service to handle all interactions with the Supabase database
 * related to Roadmaps and Technologies.
 */
export const roadmapService = {
  // --- Technologies ---
  
  /**
   * Fetches the full library of technologies from Supabase
   */
  async getTechnologies(): Promise<TechnologyDTO[]> {
    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .order('trl', { ascending: false });

    if (error) throw error;
    return data as any; // Mapper might be needed for camelCase translation
  },

  // --- Roadmaps ---

  /**
   * Saves a full roadmap (metadata + steps) to Supabase
   */
  async saveRoadmap(roadmap: RoadmapDTO, userId: string): Promise<string> {
    // 1. Insert the Roadmap metadata
    const { data: roadmapData, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert({
        user_id: userId,
        title: roadmap.title,
        target_year: roadmap.targetYear,
        net_zero_target: roadmap.netZeroTarget,
        capex_budget: roadmap.capexBudget,
        opex_budget: roadmap.opexBudget
      })
      .select()
      .single();

    if (roadmapError) throw roadmapError;

    // 2. Insert all steps
    const stepsToInsert = roadmap.steps.map(step => ({
      roadmap_id: roadmapData.id,
      tech_id: step.technologyId,
      start_year: step.startYear,
      end_year: step.endYear
    }));

    const { error: stepsError } = await supabase
      .from('roadmap_steps')
      .insert(stepsToInsert);

    if (stepsError) throw stepsError;

    return roadmapData.id;
  },

  /**
   * Fetches all saved roadmaps for the current user
   */
  async getUserRoadmaps(userId: string) {
    const { data, error } = await supabase
      .from('roadmaps')
      .select(`
        *,
        roadmap_steps (
          *,
          technologies (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Deletes a roadmap and its associated steps
   */
  async deleteRoadmap(roadmapId: string) {
    const { error } = await supabase
      .from('roadmaps')
      .delete()
      .eq('id', roadmapId);

    if (error) throw error;
  }
};

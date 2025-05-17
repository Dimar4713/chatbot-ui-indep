import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

// Получение домашнего рабочего пространства пользователя
export const getHomeWorkspaceByUserId = async (
  userId: string
): Promise<string> => {
  const { data: homeWorkspace, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("user_id", userId)
    .eq("is_home", true)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!homeWorkspace) {
    throw new Error("Домашнее рабочее пространство не найдено.")
  }

  return homeWorkspace.id
}

// Получение рабочего пространства по ID
export const getWorkspaceById = async (
  workspaceId: string
): Promise<TablesInsert<"workspaces">> => {
  const { data: workspace, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", workspaceId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!workspace) {
    throw new Error("Рабочее пространство не найдено.")
  }

  return workspace
}

// Получение всех рабочих пространств пользователя
export const getWorkspacesByUserId = async (
  userId: string
): Promise<TablesInsert<"workspaces">[]> => {
  const { data: workspaces, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  if (!workspaces) {
    throw new Error("Рабочие пространства не найдены.")
  }

  return workspaces
}

// Создание нового рабочего пространства
export const createWorkspace = async (
  workspace: TablesInsert<"workspaces">
): Promise<TablesInsert<"workspaces">> => {
  const { data: createdWorkspace, error } = await supabase
    .from("workspaces")
    .insert([workspace])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!createdWorkspace) {
    throw new Error("Не удалось создать рабочее пространство.")
  }

  return createdWorkspace
}

// Обновление рабочего пространства
export const updateWorkspace = async (
  workspaceId: string,
  workspace: TablesUpdate<"workspaces">
): Promise<TablesInsert<"workspaces">> => {
  const { data: updatedWorkspace, error } = await supabase
    .from("workspaces")
    .update(workspace)
    .eq("id", workspaceId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (!updatedWorkspace) {
    throw new Error("Не удалось обновить рабочее пространство.")
  }

  return updatedWorkspace
}

// Удаление рабочего пространства
export const deleteWorkspace = async (
  workspaceId: string
): Promise<{ success: boolean; id: string }> => {
  const { error } = await supabase
    .from("workspaces")
    .delete()
    .eq("id", workspaceId)

  if (error) {
    throw new Error(error.message)
  }

  return { success: true, id: workspaceId }
}

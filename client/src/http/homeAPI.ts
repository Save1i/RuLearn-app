import { $authHost } from "./index";

export const fetchTasks = async () => {
  const { data } = await $authHost.get("api/task");
  return data;
};

export const fetchSections = async () => {
  const { data } = await $authHost.get("api/section");
  return data;
};

export const fetchTests = async (taskId: unknown, page: number, limit: number) => {
  const { data } = await $authHost.get("api/test/" + taskId, {
    params: {
      taskId,
      page,
      limit,
    },
  });
  return data;
};

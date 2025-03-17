import { $authHost } from "./index";

export const fetchTasks = async () => {
  const { data } = await $authHost.get("api/task");
  return data;
};

export const fetchSections = async () => {
  const { data } = await $authHost.get("api/section");
  return data;
};

export const fetchTest = async () => {
  const { data } = await $authHost.get("api/test");
  return data;
};

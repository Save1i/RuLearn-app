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

export const fetchTaskProgress = async (userId: number) => {
  const { data } = await $authHost.get("api/task-progress/", {
    params: {
      userId,
    },
  });
  return data;
};

export const fetchLibrary = async (userId: number) => {
  const { data } = await $authHost.get("api/library/", {
    params: {
      userId,
    },
  });
  return data;
};

export const deleteLibrary = async (userId: number, dictionaryId: number) => {
  const { data } = await $authHost.delete("api/library", {
    params: {
      userId,
      dictionaryId,
    },
  });
  return data;
};

export const postLibrary = async (userId: number, dictionaryId: number) => {
  const { data } = await $authHost.post("api/library", {
      userId,
      dictionaryId,
  });
  return data;
};

export const fetchWords = async (dictionaryId: unknown) => {
  const { data } = await $authHost.get("api/dictionary/" + dictionaryId, {
    params: {
      dictionaryId,
    },
  });
  return data;
};

export const fetchNewWords = async (userId: number, page: number, limit: number) => {
  const { data } = await $authHost.get("api/word/new-word", {
    params: {
      userId, 
      page,
      limit
    },
  });
  return data;
};



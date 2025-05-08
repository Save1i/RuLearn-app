import { makeAutoObservable } from "mobx";

interface TaskProgress {
  id: number;
  name: string;
  type: string;
  duration: string;
  sectionId: number;
  learned: boolean;
  taskId: number;
}

interface Task {
  id: number;
  name: string;
  type: string;
  duration: string;
  sectionId: number;
}

interface Test {
  id: number;
  taskId: number;
  name: string;
  audio_q: string;
  text_q: string;
  options: string[];
  correct_answer: string;
  img: string;
  test_type: string;
}

interface Section {
  id: number;
  name: string;
}

interface Library {
  id: number;
  name: string;
}

interface Word {
  id: number;
  name: string;
  source_language: string;
  target_language: string;
}

export default class HomeStore {
  private _tasks: Array<Task>;
  private _tests: Array<Test>;
  private _sections: Array<Section>;
  private _page: number;
  private _totalCount: number;
  private _limit: number;
  private _taskProgress: Array<TaskProgress>;
  private _library: Array<Library>;
  private _word: Array<Word>;

  constructor() {
    this._sections = [];
    this._tasks = [];
    this._tests = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 1;
    this._taskProgress = [];
    this._library = [];
    this._word = [];

    makeAutoObservable(this);
  }

  setTask(task: Array<Task>) {
    this._tasks = task;
  }

  setTest(test: Array<Test>) {
    this._tests = test;
  }

  setSection(section: Array<Section>) {
    this._sections = section;
  }

  setPage(page: number) {
    this._page = page;
  }

  setTotalCount(count: number) {
    this._totalCount = count;
  }

  setLimit(limit: number) {
    this._limit = limit;
  }

  setTaskProgress(TaskProgress: Array<TaskProgress>) {
    this._taskProgress = TaskProgress;
  }

  setLibrary(library: Array<Library>) {
    this._library = library;
  }

  setWord(word: Array<Word>) {
    this._word = word;
  }

  get isSections() {
    return this._sections;
  }

  get isTasks() {
    return this._tasks;
  }

  get isTests() {
    return this._tests;
  }

  get isPage() {
    return this._page;
  }

  get isTotalCount() {
    return this._totalCount;
  }

  get isLimit() {
    return this._limit;
  }

  get isTaskProgress() {
    return this._taskProgress;
  }

  get isLibrary() {
    return this._library;
  }

  get isWord() {
    return this._word;
  }
}

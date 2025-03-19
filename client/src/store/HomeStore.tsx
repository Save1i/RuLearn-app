import { makeAutoObservable } from "mobx";

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
}

interface Section {
  id: number;
  name: string;
}

export default class HomeStore {
  private _tasks: Array<Task>;
  private _tests: Array<Test>;
  private _sections: Array<Section>;
  private _page: number;
  private _totalCount: number;
  private _limit: number;

  constructor() {
    this._sections = [];
    this._tasks = [];
    this._tests = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 1;

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
}

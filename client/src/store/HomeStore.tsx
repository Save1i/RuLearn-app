import { makeAutoObservable } from "mobx"

interface Task {
    id: number,
    name: string,
    type: string,
    duration: string
}

interface Test {
    id: number,
    name: string,
    audio_q: string,
    text_q: string,
    options: string[],
    correct_answer: string,
    img: string
}

interface Section {
    id: number,
    name: string
}


export default class HomeStore {
    private _tasks: Array<Task>;
    private _tests: Array<Test>;
    private _sections: Array<Section>;

  constructor() {
    this._tasks = [
        {id: 1, name: "Привет!", type: "аудио", duration: "1 мин."},
        {id: 2, name: "Пока!", type: "аудио", duration: "1 мин."},
    ]
    this._tests = [
        {id: 1, name: "Привет", audio_q: "https://voicebot.su/uploads/sounds/48/47235/47235.mp3", text_q: "Что вы слышите?", options: ["Привет", "Пока", "Хай", "Приветик"], correct_answer: "Привет", img: "https://img.freepik.com/free-vector/cute-lazy-cat-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector_138676-6706.jpg?t=st=1741853215~exp=1741856815~hmac=3ab4cd2579a3d4c681b160048a76d624e42f34afbc2a230c5d1e9cd6ac9b069c&w=900"},
        {id: 2, name: "Оу привет", audio_q: "https://voicebot.su/uploads/sounds/48/47232/47232.mp3", text_q: "Что вы слышите?", options: ["Привет", "Пока", "Оу привет", "Приветик"], correct_answer: "Оу привет", img: "https://img.freepik.com/free-vector/cute-lazy-cat-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector_138676-6706.jpg?t=st=1741853215~exp=1741856815~hmac=3ab4cd2579a3d4c681b160048a76d624e42f34afbc2a230c5d1e9cd6ac9b069c&w=900"},
    ]
    this._sections = [
        {id: 1, name: "Раздел 1"},
        {id: 2, name: "Раздел 2"},
    ]
    makeAutoObservable(this)
  }

  setTask(task: Task) {
    this._tasks.push(task)
  }
 
  setTest(test: Test) {
    this._tests.push(test)
  }

  setSection(section: Section) {
    this._sections.push(section)
  }

  get isSections() {
    return this._sections
  }

  get isTasks() {
    return this._tasks
  }

  get isTests() {
    return this._tests
  }
}

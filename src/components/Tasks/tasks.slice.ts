import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { rootReducer } from '../../shared/redux.ts'
import { Comment } from '../../shared/models/types.ts'

export type TaskState = {
  tasks: Comment[],
  isTasks?: boolean,
  tasksError?: string,
  deletedTasks?: string[]
  selectedTask?: string
}

const initialTaskState: TaskState = {
  tasks: [],
  isTasks: false,
  tasksError: '',
  deletedTasks: [],
  selectedTask: ''
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTaskState,
  selectors: {
    tasks: (state: TaskState) => state.tasks,
    isTasks: (state: TaskState) => state.isTasks,
    tasksError: (state: TaskState) => state.tasksError,
    deletedTasks: (state: TaskState) => state.deletedTasks,
    selectedTask: (state: TaskState) => state.selectedTask
  },
  reducers: {
    addTasks: (state, action: PayloadAction<Comment>) => {
      state.tasks.push(action.payload)
      state.isTasks = true
      state.tasksError = ''
    },
    tasksError: (state, action: PayloadAction<string>) => {
      state.tasksError = action.payload
      state.isTasks = false
    },
    removeTasks: (state) => {
      state.tasks = []
      state.isTasks = false
      state.tasksError = ''
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.deletedTasks?.push(action.payload)
    },
    selectTask: (state, action: PayloadAction<string>) => {
      state.selectedTask = action.payload
    }
  },
}).injectInto(rootReducer)
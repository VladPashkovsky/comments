import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { rootReducer } from '../../shared/redux.ts'
import { Comment } from '../../shared/models/types.ts'

export type TaskState = {
  tasks: Comment[],
  isTasks?: boolean,
  tasksError?: string,
}

const initialTaskState: TaskState = {
  tasks: [],
  isTasks: false,
  tasksError: '',
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTaskState,
  selectors: {
    tasks: (state: TaskState) => state.tasks,
    isTasks: (state: TaskState) => state.isTasks,
    tasksError: (state: TaskState) => state.tasksError,
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
  },
}).injectInto(rootReducer)
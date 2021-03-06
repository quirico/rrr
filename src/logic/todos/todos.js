import { List } from 'immutable'
import { createSelector } from 'reselect'

import {
  SET_TODOS,
  // ADD_TODO,
  REMOVE_TODO,
  TOGGLE_DONE,
  CLEAR
} from './actionTypes'
import todo, * as fromTodo from './todo'

const getTodos = state => state
const getTodo = (state, id) => state.find(todo => todo.id === id)
const isDone = (state, id) => fromTodo.isDone(getTodo(state, id))

const areAllDone = createSelector(
  getTodos,
  state => console.log('(re)computing') || state.every(fromTodo.isDone)
)

const todos = (state = List(), action) => {
  const { type, payload } = action
  switch (type) {
    case SET_TODOS:
      return List(payload)
    // case ADD_TODO:
    //   return state.push(payload)
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== payload)
    case TOGGLE_DONE:
      return state.update(state.findIndex(todo => todo.id === payload), t =>
        todo(t, action)
      )
    case CLEAR:
      return state.clear()
    default:
      return state
  }
}

export default todos
export { getTodos, getTodo, isDone, areAllDone }

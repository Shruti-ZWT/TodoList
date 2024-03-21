export const ADD_TODO = 'ADD_TODO';
export const DELETE_ALL = 'DELETE_ALL';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const UPDATE_CHECKBOX = 'UPDATE_CHECKBOX';
export const LOAD_TODOS = 'LOAD_TODOS';

export const addTodo = (payload: any) => ({
  type: ADD_TODO,
  payload
});

export const deleteAll = () => ({
  type: DELETE_ALL
});

export const removeTodo = (payload: any) => ({
  type: REMOVE_TODO,
  payload
});

export const handleEditSubmit = (payload: any) => ({
  type: UPDATE_TODO,
  payload
});

export const handleCheckbox = (payload: any) => ({
  type: UPDATE_CHECKBOX,
  payload
});

export const loadTodos = (payload: any) => ({
  type: LOAD_TODOS,
  payload
});
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADD_TODO, DELETE_ALL, LOAD_TODOS, REMOVE_TODO, UPDATE_CHECKBOX, UPDATE_TODO } from "../actions";

export const operationsReducer = (state: any= [], action: any) => {

  switch (action.type) {
    case ADD_TODO:
      const add_todos = [...state, action.payload];
      saveTodosToAsyncStorage(add_todos)
      return add_todos;
    case DELETE_ALL:
      saveTodosToAsyncStorage([])
      return [];
    case REMOVE_TODO:
      const delete_todo = state.filter((todo: { id: any; }) => todo.id !== action.payload);
      saveTodosToAsyncStorage(delete_todo);
      return delete_todo; // Filter out todo with matching ID
    case UPDATE_TODO:
      const todos = state.map((item: { id: any; }) => (item.id === action.payload.id ? action.payload : item));
      saveTodosToAsyncStorage(todos)
      return todos;
    case UPDATE_CHECKBOX:
      const update_checkbox = state.map((item: { id: any; completed: any; }) => (item.id === action.payload ? { ...item, completed: !item.completed } : item))
      saveTodosToAsyncStorage(update_checkbox);
      return update_checkbox;
    case LOAD_TODOS:
      return action.payload;
    default:
      return state;
  }
};

const saveTodosToAsyncStorage = async (todos: any) => {  
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to AsyncStorage:', error);
  }
};
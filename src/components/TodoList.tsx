import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteAll, handleCheckbox, removeTodo } from '../actions';
import CheckBox from '@react-native-community/checkbox';
import ConfirmationModal from '../modal/Confirmation';

const TodosScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.operationsReducer);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTaskForDelete, setSelectedTaskForDelete] = useState<any>(null)

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');        
        if (storedTodos !== null) {
          dispatch({ type: 'LOAD_TODOS', payload: JSON.parse(storedTodos) });
        }
      } catch (error) {
        console.error('Error loading todos from AsyncStorage:', error);
      }
    };

    loadTodos();
  }, []);

  const handleEditClick = (todo: any) => {
    navigation.navigate('AddTodo', { todo });
  };

  // Confirm and delete the task
  const confirmDelete = async (id: any) => {
    setShowConfirmation(false);
    dispatch(removeTodo(id));
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTimeout(() => {
          dispatch(removeTodo(id));
        }, 300);
        let todos = JSON.parse(storedTodos);
        todos = todos.filter((todo: any) => todo.id !== id);
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
        setSelectedTaskForDelete(null)
      }
    } catch (error) {
      console.error('Error removing todo from AsyncStorage:', error);
    }
  };

  const handleDeleteAll = () => {
    dispatch(deleteAll());
    return AsyncStorage.clear()
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
    <Button
      title="Add items"
      onPress={() => navigation.navigate('AddTodo')} />
    <FlatList
      data={todos}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
          <TouchableOpacity onPress={() => dispatch(handleCheckbox(item.id))}>
            <CheckBox
              value={item.completed}
              onValueChange={() => dispatch(handleCheckbox(item.id))}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.todo}</Text>
            {
              item.description ? 
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.description}</Text> : null 
            }
          </View>
          <TouchableOpacity onPress={() => handleEditClick(item)}>
            <Text>Edit  </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setSelectedTaskForDelete({id: item.id, title: item.todo});
          setShowConfirmation(true)}}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()} />

        {/* Display the modal for Confirmation delete */}
        <ConfirmationModal
        visible={showConfirmation}
          title={`Are you sure you want to delete ` + (selectedTaskForDelete !== null ?  selectedTaskForDelete?.title : "All") + "?"}
          onConfirm={() => {selectedTaskForDelete !== null ? confirmDelete(selectedTaskForDelete.id) : handleDeleteAll()}}  // Pass a function reference
          onCancel={() => {setShowConfirmation(false); setSelectedTaskForDelete(null)}}
        />

    {todos.length >= 1 && (
      <Button title="Delete All" onPress={() => setShowConfirmation(true)} color="red" />      
    )}
  </View>
  );
};

export default TodosScreen;

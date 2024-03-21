// screens/AddTodoScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ToastAndroid  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, handleEditSubmit } from '../actions';

const AddTodoScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.operationsReducer);
  const [todoValue, setTodoValue] = useState<string>('');
  const [todoDescValue, setDescTodoValue] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('')

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    if (route.params && route.params.todo) {
      setTodoValue(route.params.todo.todo);
      setDescTodoValue(route.params.todo.description);
      setIsEditMode(true);
    }
  }, [route.params]);

  const handleSubmit = async () => {
    if (!todoValue.trim()) {
      setErrorMsg("Title cannot be empty")
      return;
    }

    const isDuplicate = todos.some((todo: any) => todo.todo === todoValue);
    if (isDuplicate && !isEditMode) {
      setErrorMsg("Oops, Title must be different")
      return;
    }

    const todoObj = {
      id: route.params?.todo?.id || new Date().getTime(),
      todo: todoValue,
      completed: false,
      description: todoDescValue,
    };

    if (route.params && route.params.todo) {
     dispatch(handleEditSubmit(todoObj));
     showToast('Task Edit successfully');
    } else {
     dispatch(addTodo(todoObj));
     showToast('Task Added successfully');
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginTop: 10 }}
        placeholder="Enter Title"
        value={todoValue}
        onChangeText={(text) => setTodoValue(text)}
      />
      {errorMsg !== '' && <Text style={{color: 'red', paddingTop: 5}}>{errorMsg}</Text>}
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginTop: 30, marginBottom: 30, height: 100 }}
        placeholder="Enter Description"
        value={todoDescValue}
        onChangeText={(text) => setDescTodoValue(text)} />
      <Button title={isEditMode ? 'Update' : 'Submit'} onPress={handleSubmit}  />
    </View>
  );
};

export default AddTodoScreen;

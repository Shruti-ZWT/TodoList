import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodosScreen from './src/components/TodoList';
import AddTodoScreen from './src/components/AddItems';
import SplashScreen from './src/components/SplashScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setSplashVisible(false);
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible ? (
        <SplashScreen/>
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Todos">
            <Stack.Screen name="Todos" component={TodosScreen} options={{ title: 'Todo List', headerTitleAlign: 'center' }} />
            <Stack.Screen 
            name="AddTodo" 
            component={AddTodoScreen} 
            options={({ route }) => ({ title: route.params ? 'Edit Todo' : 'Add Todo', headerTitleAlign: 'center'  })} 
          />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </View>
  );
};

export default App;

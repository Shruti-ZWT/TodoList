import React, {useState} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TodosScreen from './src/components/TodoList';
import AddTodoScreen from './src/components/AddItems';
import Products from './src/screens/Products';
import SplashScreen from './src/screens/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from './src/screens/AboutUs';

const Tab = createMaterialTopTabNavigator();

export default function App() {
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
      <Tab.Navigator>        
        <Tab.Screen name="TodosStack" component={TodoStack} options={{ title: 'Todo List'}} />
        <Tab.Screen name= "Products" component={Products} />
        <Tab.Screen name= "About Us" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )}
</View>
  );
}
const Stack = createNativeStackNavigator();

const TodoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Todos"
        component={TodosScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="AddTodo"
        component={AddTodoScreen}
        options={({ route }) => ({ title: route.params ? 'Edit Todo' : 'Add Todo', headerTitleAlign: 'center' })}
      />
    </Stack.Navigator>
  );
};
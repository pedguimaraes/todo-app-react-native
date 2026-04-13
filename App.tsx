import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import CreateTask from './src/screens/CreateTask';
import EditTask from './src/screens/EditTask';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Create" component={CreateTask} />
        <Stack.Screen name="Edit" component={EditTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
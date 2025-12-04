import UserSettings from './src/screens/UserSettings'
import NotesScreen from './src/screens/NotesScreen'
import FavoritesScreen from './src/screens/FavoritesScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={UserSettings}/>
          <Stack.Screen name='Notes' component={NotesScreen}/>
          <Stack.Screen name='Favorites' component={FavoritesScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

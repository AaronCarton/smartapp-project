import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Add from '../screens/Add';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Settings from '../screens/Settings';
import { ColorSchemeName, useColorScheme, StatusBar } from 'react-native';
import Icon from '../components/Icon';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        {/* <Stack.Group screenOptions={{ presentation: 'modal' }}> */}
        <Stack.Screen name="AddModal" component={Add} />
        {/* </Stack.Group> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function BottomTab() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
      sceneContainerStyle={{
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 5,
      }}
      screenListeners={{
        tabLongPress: (e) => {
          // TODO: Show label of tab
          // https://mui.com/material-ui/react-tooltip/
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => <Icon name="search" color={color} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="add-circle-outline" color={color} size={45} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddModal');
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <Icon name="person" color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => <Icon name="settings" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

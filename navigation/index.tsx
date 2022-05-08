import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pet, User } from '../types';

import Home from '../screens/Home';
import Search from '../screens/modals/Search';
import Settings from '../screens/Settings';
import Add from '../screens/modals/Add';
import PetScreen from '../screens/modals/Pet';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Messages from '../screens/Messages';

import { HeartToggle, TabIcon } from '../components/Icon';
import { CustomDarkTheme, useDarkMode } from '../hooks/darkmode';
import Profile from '../screens/modals/Profile';
import Results from '../screens/Results';

export type RootStackParamList = {
  Root: undefined;
  LoginModal: undefined;
  RegisterModal: { user: User } | undefined;
  AddModal: undefined;
  ProfileModal: { user: User };
  PetModal: { pet: Pet };
  SearchModal: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: { petList: Pet[] | undefined };
  Add: undefined;
  Messages: undefined;
  Settings: undefined;
};

export default () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { colorScheme, toggleColorScheme, setColorScheme } = useDarkMode();

  return (
    <NavigationContainer theme={colorScheme == 'dark' ? CustomDarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        {/* <Stack.Group screenOptions={{ presentation: 'modal' }}> */}
        <Stack.Screen name="AddModal" component={Add} />
        <Stack.Screen name="LoginModal" component={Login} />
        <Stack.Screen name="RegisterModal" component={Register} />
        <Stack.Screen name="ProfileModal" component={Profile} />
        <Stack.Screen name="SearchModal" component={Search} />
        <Stack.Screen
          name="PetModal"
          component={PetScreen}
          options={{
            headerTransparent: true,
            headerTintColor: '#f1f5f9',
            title: '',
          }}
        />
        {/* </Stack.Group> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function BottomTab() {
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: '#ef4444' }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Results}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="search" color={color} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon name="add-circle-outline" color={color} size={45} />
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
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="message" color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="person" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

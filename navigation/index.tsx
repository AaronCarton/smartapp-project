import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { ColorSchemeName, useColorScheme, StatusBar, Switch } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pet as PetType } from '../types';
import tw from 'twrnc';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Settings from '../screens/Settings';
import Add from '../screens/Add';
import Pet from '../screens/Pet';

import { HeartToggle, TabIcon } from '../components/Icon';

export type RootStackParamList = {
  Root: undefined;
  AddModal: undefined;
  PetModal: { pet: PetType };
};

export default () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
        <Stack.Screen
          name="PetModal"
          component={Pet}
          options={{
            headerTransparent: true,
            headerTintColor: '#f1f5f9',
            title: '',
            headerRight: () => <HeartToggle enabled={false} />,
          }}
        />
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
        // paddingHorizontal: 5,
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
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
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
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="person" color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="settings" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

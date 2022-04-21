import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  ColorSchemeName,
  useColorScheme,
  StatusBar,
  Switch,
  Image,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pet as PetType, User } from '../types';
import tw, { useAppColorScheme } from 'twrnc';

import Home from '../screens/Home';
import Profile from '../screens/Settings';
import Search from '../screens/Search';
import Settings from '../screens/Settings';
import Add from '../screens/Add';
import Pet from '../screens/Pet';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

import { HeartToggle, TabIcon } from '../components/Icon';

export type RootStackParamList = {
  Root: undefined;
  LoginModal: undefined;
  RegisterModal: undefined;
  AddModal: undefined;
  PetModal: { pet: PetType };
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Add: undefined;
  Messages: undefined;
  Profile: { currentUser: User };
};

export default () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <Stack.Screen name="LoginModal" component={Login} />
        <Stack.Screen name="RegisterModal" component={Register} />
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
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false }}
      sceneContainerStyle={
        {
          // paddingTop: StatusBar.currentHeight,
          // paddingHorizontal: 5,
        }
      }
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
        name="Messages"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="message" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Settings}
        initialParams={{ currentUser: undefined }}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="person" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

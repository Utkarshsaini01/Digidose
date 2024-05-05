import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from "react-native-vector-icons/Feather";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import Data from './Data';
import Test from './Test';
import Appointment from './Appointment';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#76A1F5'},
        tabBarInactiveTintColor: '#f5f5f5',
        tabBarActiveTintColor: '#000',
        tabBarActiveBackgroundColor: '#fff'
      }}
    >
      <Tab.Screen
        name="Data"
        component={Data}
        options={{
          tabBarLabel: 'Health Data',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="file-medical" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="HealthCheck"
        component={Test}
        options={{
          tabBarLabel: 'Test',
          tabBarIcon: ({ color, size }) => (
            <Feather name="activity" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarLabel: 'Appointment',
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import DocAppointment from './DocAppointment';
import DocProfile from './DocProfile';
import DocAppointmentApproved from './DocAppointmentApproved';

const Tab = createBottomTabNavigator();

const DoctabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#76A1F5'},
        tabBarInactiveTintColor: '#f5f5f5',
        tabBarActiveTintColor: '#000',
        tabBarActiveBackgroundColor: '#fff',
      }}>
      <Tab.Screen
        name="Appointment"
        component={DocAppointment}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome6 name="user-clock" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Approved_Appointment"
        component={DocAppointmentApproved}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome6 name="calendar-plus" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={DocProfile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DoctabNavigator;

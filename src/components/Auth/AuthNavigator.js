// AuthNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './Start';
import User from './User';
import PatientSignup from './PatientSignup';
import PatientLogin from './PatientLogin';
import DoctorSignup from './DoctorSignup'; 
import DoctorLogin from './DoctorLogin'; 

const Stack = createNativeStackNavigator();

const AuthNavigator = ({ onLogin }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='Start'>
                {props => <Start {...props} onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name='User' component={User} />
            <Stack.Screen name='PatientSignup'>
                {props => <PatientSignup {...props} onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name='PatientLogin'>
                {props => <PatientLogin {...props} onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name='DoctorSignup' component={DoctorSignup} /> 
            <Stack.Screen name='DoctorLogin'>
                {props => <DoctorLogin {...props} onLogin={onLogin} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthNavigator;

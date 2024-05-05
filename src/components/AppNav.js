// AppNav.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './Auth/AuthNavigator';
import TabNavigator from './AppStack/TabNavigator';
import DoctabNavigator from './DocStack/DoctabNavigator';
import { AuthContext } from '../Context/AuthContext';

const AppNav = () => {
    const { isAuthenticated, userType } = useContext(AuthContext);

    const renderNavigator = () => {
        if (!isAuthenticated) {
            return <AuthNavigator />;
        } else {
            return userType === 'doctor' ? <DoctabNavigator /> : <TabNavigator />;
        }
    };

    return (
        <NavigationContainer>
            {renderNavigator()}
        </NavigationContainer>
    );
};

export default AppNav;

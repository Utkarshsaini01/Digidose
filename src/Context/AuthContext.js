import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        // Check if user is authenticated
        const isLoggedIn = async () => {
            try {
                setLoading(true);
                const token = await AsyncStorage.getItem('token'); 
                const type = await AsyncStorage.getItem('userType');

                if (token) {
                    setUserType(type || '');
                    setIsAuthenticated(true);
                } else {
                    setUserType('');
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
            } finally {
                setLoading(false); // Set loading to false after authentication check is done
            }
        };

        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{
            loading,
            isAuthenticated,
            userType,
            setLoading,
            setIsAuthenticated,
            setUserType,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

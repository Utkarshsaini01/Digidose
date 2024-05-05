import React from 'react';


import AppNav from './src/components/AppNav';
import { AuthProvider } from './src/Context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <AppNav />
        </AuthProvider>
    );
};

export default App;


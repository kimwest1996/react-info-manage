import React from 'react';
import AppRouter from './AppRouter';
import { MenuProvider } from './MenuContext';

const App = () => {
    return (
        <MenuProvider>
            <AppRouter />
        </MenuProvider>
    );
};

export default App;

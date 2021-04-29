import { useLocalStore, useObserver } from 'mobx-react';
import React from 'react';
const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
    const store = useLocalStore(() => ({
        testProp: 'This is the test prop',
    }));

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export { StoreContext, StoreProvider };

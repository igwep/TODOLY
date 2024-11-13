// eslint-disable-next-line no-unused-vars
import React, { createContext, useState} from 'react';

export const LoadingContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoadingProvider = ({ children }) => {      
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [navName, setNavName] = useState(null);
    return(
        <LoadingContext.Provider value={{loading, setLoading, success, setSuccess, navName, setNavName }}>
            {children}
        </LoadingContext.Provider>
    );
};



import React, { createContext, useState} from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {      
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    return(
        <LoadingContext.Provider value={{loading, setLoading, success, setSuccess }}>
            {children}
        </LoadingContext.Provider>
    );
};
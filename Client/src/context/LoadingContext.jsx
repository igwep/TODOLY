// eslint-disable-next-line no-unused-vars
import React, { createContext, useState} from 'react';

export const LoadingContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoadingProvider = ({ children }) => {      
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [navName, setNavName] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isSideOpen, setIsSideOpen] = useState(true);
    const [FullTaskViewDelete, setFullTaskViewDelete] = useState({
        categoryName: '',
        taskId:''
      })
    const [isEdit, setIsEdit] = useState(false);
    return(
        <LoadingContext.Provider value={{ isSideOpen,
                setIsSideOpen,
                loading,
                setLoading,
                success,
                setSuccess,
                navName,
                setNavName,
                isOpen,
                setIsOpen,
                setFullTaskViewDelete,
                FullTaskViewDelete,
                setIsEdit,
                isEdit,
                }}>
            {children}
        </LoadingContext.Provider>
    );
};



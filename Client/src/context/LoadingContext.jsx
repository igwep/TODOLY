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
    const [query, setQuery] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false)
    const [FullTaskViewDelete, setFullTaskViewDelete] = useState({
        categoryName: '',
        taskId:''
      })
      const [previewImage, setPreviewImage] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    return(
        <LoadingContext.Provider value={{ 
                isSideOpen,
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
                query, 
                setQuery,
                filteredTasks,
                setFilteredTasks,
                showSearchResult,
                setShowSearchResult,
                previewImage, 
                setPreviewImage
                }}>
            {children}
        </LoadingContext.Provider>
    );
};



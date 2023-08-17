"use client"
import React, {createContext, useContext, useState} from "react";

interface AppContextType {
    isOpenSlidebar: boolean;
    isMouseVisit: boolean;
    isDarkMode: boolean;
    setIsOpenSlidebar: React.Dispatch<React.SetStateAction<boolean>>;
    setIsMouseVisit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AppProviderProps {
    children: React.ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
    const context = useContext(AppContext);
    if(!context) {
        throw new Error('useSidebarContext must be used within a SidebarProvider')
    }
    return context;
}

export function AppProvider({children}: AppProviderProps) {
    const [isOpenSlidebar, setIsOpenSlidebar] = useState<boolean>(false);
    const [isMouseVisit, setIsMouseVisit] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const value: AppContextType = {
        isOpenSlidebar,
        isMouseVisit,
        isDarkMode,
        setIsOpenSlidebar,
        setIsMouseVisit,
        setIsDarkMode
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
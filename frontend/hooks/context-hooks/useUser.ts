"use client"
import { UserContext, UserContextType } from '@/context/UserContext';
import { useContext } from 'react'

export default function useUser():UserContextType {
    const context = useContext(UserContext);
    if(context === null){
        throw new Error(`useUser must be used within a UserProvider`)
    }
    return context;
}

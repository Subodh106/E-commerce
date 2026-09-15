"use client"
import { User } from '@/Types/authTypes';
import {createContext} from 'react';

export type UserContextType ={
    user : User;
    setUser : (user:User)=>void;
}

export const UserContext = createContext<UserContextType|null>(null);
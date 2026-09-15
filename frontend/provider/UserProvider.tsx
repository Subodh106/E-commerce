"use client"
import { UserContext, UserContextType } from '@/context/UserContext';
import { User } from '@/Types/authTypes';
import React, { useMemo, useState } from 'react'

export default function UserProvider({children}:{children:React.ReactNode}) {

    const[user , setUser] = useState<User | null>(null);

    const value = useMemo<UserContextType>(
        ()=>(
            { user: user as User, setUser }
        ),[user]
    )

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}

import React from 'react'
import UserProvider from './UserProvider'
import { ThemeProvider } from './ThemeProvider'
import { CategoryProvider } from './CategoryProvider'

export default function Providers({children}:{children:React.ReactNode}) {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem>
    <UserProvider>
    <CategoryProvider>
        {children}
    </CategoryProvider>
    </UserProvider>
    </ThemeProvider>
  )
}

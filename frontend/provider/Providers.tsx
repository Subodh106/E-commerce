import React from 'react'
import UserProvider from './UserProvider'
import { ThemeProvider } from './ThemeProvider'
import { CategoryProvider } from './CategoryProvider'
import ProductProvider from './ProductProvider'

export default function Providers({children}:{children:React.ReactNode}) {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem>
    <UserProvider>
      <ProductProvider>
    <CategoryProvider>
        {children}
    </CategoryProvider>
    </ProductProvider>
    </UserProvider>
    </ThemeProvider>
  )
}

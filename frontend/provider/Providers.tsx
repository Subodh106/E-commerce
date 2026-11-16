import React from 'react'
import UserProvider from './UserProvider'
import { ThemeProvider } from './ThemeProvider'
import { CategoryProvider } from './CategoryProvider'
import ProductProvider from './ProductProvider'
import QueryProvider from './QueryProvider'

export default function Providers({children}:{children:React.ReactNode}) {
  return (
    <QueryProvider>
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
    </QueryProvider>
  )
}

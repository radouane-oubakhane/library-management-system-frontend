import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/HomePage.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)

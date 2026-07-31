import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { KeyboardShortcutsProvider } from '@/contexts/KeyboardShortcutsContext'
import { Toaster, toast } from 'sonner'
import { GlobalErrorBoundary } from './components/error-boundary/GlobalErrorBoundary'
import './index.css'
import App from './App.tsx'

const handleError = (error: Error) => {
  const message = (error as any)?.message || 'An unexpected error occurred';
  toast.error(message);
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: false, // Don't retry on error, just fail and show toast
      refetchOnWindowFocus: false,
    },
  },
})

// Listen for global API interceptor errors
window.addEventListener('global-api-error', (e: any) => {
  handleError(e.detail);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <KeyboardShortcutsProvider>
              <App />
              <Toaster position="top-right" richColors />
            </KeyboardShortcutsProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  </StrictMode>,
)
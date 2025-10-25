import { RouterProvider } from "react-router"
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from './shared/contexts/ThemeProvider'
import { appRouter } from "./routes/app.router"
import { Toaster } from "sonner"
import type { PropsWithChildren } from "react";
import { CustomFullScreenLoading } from "./shared/components/custom/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";

import { queryClient } from './shared/lib/queryClient'

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {

  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 4.5,
    refetchOnWindowFocus: true
  })

  if (isLoading) return <CustomFullScreenLoading />

  return children;
}

export const SmartCitasApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-right" richColors />
      <CheckAuthProvider>
        <ThemeProvider>
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      </CheckAuthProvider>
    </QueryClientProvider>
  )
}

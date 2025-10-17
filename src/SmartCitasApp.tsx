import { RouterProvider } from "react-router"
import { ThemeProvider } from './shared/contexts/ThemeProvider'
import { appRouter } from "./routes/app.router"


export const SmartCitasApp = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  )
}

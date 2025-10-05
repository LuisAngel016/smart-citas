import { RouterProvider } from "react-router"
import { appRouter } from "./routes/app.router"

export const SmartCitasApp = () => {
  return (
    <RouterProvider router={appRouter} />
  )
}

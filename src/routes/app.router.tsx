import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { HomePage } from "../home/pages/home/HomePage";
import { HomeLayout } from "../home/layouts/HomeLayout";

import { LoginPage } from "../auth/pages/login/LoginPage";
import { RegisterPage } from "../auth/pages/register/RegisterPage";

import { DashboardPage } from "../admin/dashboard/pages/DashboardPage";
import { AppointmentsPage } from "../admin/appointments/pages/AppointmentsPage";
import { ClientsPage } from "../admin/clients/pages/ClientsPage";
import { ConfigurationPage } from "@/admin/configuration/pages/ConfigurationPage";

const AuthLayout = lazy(() => import("../auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("../admin/layouts/AdminLayout"));


export const appRouter = createBrowserRouter([
    // Main routes
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            }
        ]
    },
    // Auth routes
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            }
        ]
    },
    // Admin routes
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: "appointments",
                element: <AppointmentsPage />
            },
            {
                path: "clients",
                element: <ClientsPage />
            },
            {
                path: "settings",
                element: <ConfigurationPage />
            }
        ]
    }
])

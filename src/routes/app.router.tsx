import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { HomePage } from "../home/pages/home/HomePage";
import { HomeLayout } from "../home/layouts/HomeLayout";

import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";

import { DashboardPage } from "../admin/pages/dashboard/DashboardPage";
import { AppoinmentPage } from "../admin/pages/appoinment/AppoinmentPage";
import { ClientsPage } from "../admin/pages/clients/ClientsPage";
import { ConfigurationPage } from "@/admin/pages/configuration/ConfigurationPage";

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
                path: "appoinment",
                element: <AppoinmentPage />
            },
            {
                path: "clients",
                element: <ClientsPage />
            },
            {
                path: "configuration",
                element: <ConfigurationPage />
            }
        ]
    }
])

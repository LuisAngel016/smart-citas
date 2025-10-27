import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { HomePage } from "@/home/presentation/pages/home/HomePage";
import { HomeLayout } from "@/home/presentation/layouts/HomeLayout";

import { LoginPage } from "@/auth/presentation/pages/login/LoginPage";
// import { RegisterPage } from "@/auth/presentation/pages/register/RegisterPage";

import { DashboardPage } from "@/dashboard";
import { AppointmentsPage } from "@/appointments";
import { ClientsPage } from "@/clients";
import { AdminRoute, NotAuthenticatedRoute } from '../shared/components/routes/ProtectedRoutes';
import { ServicesPage } from "@/services/presentation";
import { SchedulesPage } from "@/schedules/presentation";
import { BusinessPage } from "@/business/presentation";

const AuthLayout = lazy(() => import("@/auth/presentation/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("@/shared/layouts/AdminLayout"));


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
        element: <NotAuthenticatedRoute>
            <AuthLayout />
        </NotAuthenticatedRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            // {
            //     path: "register",
            //     element: <RegisterPage />
            // }
        ]
    },
    // Admin routes
    {
        path: "/admin",
        element: <AdminRoute>
            <AdminLayout />
        </AdminRoute>,
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
                path: "settings/business",
                element: <BusinessPage />
            },
            {
                path: "settings/services",
                element: <ServicesPage />
            },
            {
                path: "settings/schedules",
                element: <SchedulesPage />
            }
        ]
    }
])

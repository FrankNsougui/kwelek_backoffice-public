import React from "react"
import { redirect, useRoutes } from "react-router-dom"
import SideMenu from "../layouts/SideMenu"

// All routes using lazy loader
import Login from "../pages/Login"
import NotFound from "../pages/NotFound"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users";
import Feedbacks from "../pages/Feedbacks"
import Subscriptions from "../pages/Subscriptions"
import Payments from "../pages/Payments"
import Notifications from "../pages/Notifications"
import Settings from "../pages/Settings"

// Route Guard
import RouterGuard from "./RouteGuard/"

// Define the router
const Router = () => {

    // Add all routes that you need here
    const routes = [
        {
            path: "/",
            element: 
            <RouterGuard>
                <SideMenu />
            </RouterGuard>,
            children: [
                {
                    path: 'dashboard',
                    element: <Dashboard />
                },
                {
                    path: 'users',
                    element: <Users />
                },
                {
                    path: 'feedbacks',
                    element: <Feedbacks />
                },
                {
                    path: 'subscriptions',
                    element: <Subscriptions />
                },
                {
                    path: 'payments',
                    element: <Payments />
                },
                {
                    path: 'notifications',
                    element: <Notifications />
                },
                {
                    path: 'settings',
                    element: <Settings />
                }
            ]
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "*",
            element: <NotFound/>
        }
    ]

    return useRoutes(routes)
}

export default Router
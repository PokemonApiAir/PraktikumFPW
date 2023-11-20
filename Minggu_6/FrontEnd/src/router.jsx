import { createBrowserRouter, redirect } from "react-router-dom";

import handler from './handler/handler';

import Error from './pages/error'
import Index from './pages/index'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'

import Story from './pages/story'

const { register, getData } = handler;

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: "/register",
                action: register,
                element: <Register />
            },
            {
                path: "/home",
                loader: getData,
                element: <Home />,
                children: [
                    {
                        index: true,
                        path: "story",
                        element: <Story />
                    }
                ]
            }
        ]
    }
]);

export default Router;

import { createBrowserRouter, redirect } from "react-router-dom";

import handler from './handler/handler';

// Start
import Error from './pages/error'
import Index from './pages/index'
import Start from "./pages/start";
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'

// Profile
import Profile from "./pages/profile";

// Story
import Story from './pages/story'
import ShowDetail from "./pages/showDetail";
import StoryDefault from "./pages/storyDefault";

//Detail
import Overview from "./pages/components/overview";
import Characters from "./pages/components/characters";
import DetailChara from "./pages/components/detailChara";
import NewChara from "./pages/components/newChara";


const { register, getData, getStory, getStoryID, getStoryIdChara, detailChara, formAction, formOverview, formAddStory } = handler;

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Start />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/home",
                loader: getData,
                element: <Home />,
                children: [
                    {
                        path: "stories",
                        element: <Story />,
                        children: [
                            {
                                path: "/home/stories",
                                loader: getStory,
                                action: formAddStory,
                                element: <StoryDefault />
                            },
                            {
                                path: ":id",
                                loader: getStoryID,
                                element: <ShowDetail />,
                                children: [
                                    {
                                        path: "/home/stories/:id/overview",
                                        loader: getStoryID,
                                        action: formOverview,
                                        element: <Overview />
                                    },
                                    {
                                        path: "/home/stories/:id/characters",
                                        loader: getStoryIdChara,
                                        element: <Characters />,
                                        children: [
                                            {
                                                path: "/home/stories/:id/characters/:character_id",
                                                loader: detailChara,
                                                action: formAction,
                                                element: <DetailChara />
                                            },
                                            {
                                                path: "/home/stories/:id/characters/new",
                                                action: formAction,
                                                element: <NewChara />
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: "profile",
                        loader: getData,
                        element: <Profile/>
                    }
                ]
            }
        ]
    }
]);

export default Router;

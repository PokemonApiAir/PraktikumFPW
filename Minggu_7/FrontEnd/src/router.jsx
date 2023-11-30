import { createBrowserRouter } from "react-router-dom";

// Handler
import handlerHome from './handler/handlerHome'
import handlerPlayer from './handler/handlerPlayer'
import handlerTeam from './handler/handlerTeam'
import handlerMatch from './handler/handlerMatch'

// Dashboard
import Dashboard from "./dashboard";
import Home from "./pages/home/home";
import Match from "./pages/match/match";
import Player from "./pages/player/player";
import Team from "./pages/team/team";

// Player
import HomePlayer from "./pages/player/components/home";
import EditDataPlayer from "./pages/player/components/editData";
import AddDataPlayer from "./pages/player/components/addData";

// Team
import HomeTeam from "./pages/team/components/home";
import EditDataTeam from "./pages/team/components/editData";
import AddDataTeam from "./pages/team/components/addData";

// Match
import HomeMatch from "./pages/match/components/home";
import AddDataMatch from "./pages/match/components/addData";

const { loadDataHome } = handlerHome
const { loadDataPlayer, loadEditPlayer, formActionPlayer } = handlerPlayer
const { loadDataTeam, loadEditTeam, formActionTeam } = handlerTeam
const { loadDataMatch, formActionMatch } = handlerMatch

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard/>,
        children: [
            {
                index: true,
                loader: loadDataHome,
                element: <Home/>
            },
            {
                path: "match",
                element: <Match/>,
                children: [
                    {
                        path: "home",
                        loader: loadDataMatch,
                        element: <HomeMatch/>
                    },
                    {
                        path: "add",
                        loader: loadDataTeam,
                        action: formActionMatch,
                        element: <AddDataMatch/>
                    }
                ]
            },
            {
                path: "player",
                element: <Player/>,
                children: [
                    {
                        path: "home",
                        loader: loadDataPlayer,
                        action: formActionPlayer,
                        element: <HomePlayer/>
                    },
                    {
                        path: "edit/:id",
                        loader: loadEditPlayer,
                        action: formActionPlayer,
                        element: <EditDataPlayer/>
                    },
                    {
                        path: "add",
                        action: formActionPlayer,
                        element: <AddDataPlayer/>
                    }
                ]
            },
            {
                path: "team",
                element: <Team/>,
                children: [
                    {
                        path: "home",
                        action: formActionTeam,
                        loader: loadDataTeam,
                        element: <HomeTeam/>
                    },
                    {
                        path: "edit/:id",
                        loader: loadEditTeam,
                        action: formActionTeam,
                        element: <EditDataTeam/>
                    },
                    {
                        path: "add",
                        action: formActionTeam,
                        element: <AddDataTeam/>
                    }
                ]
            }
        ]
    }
])

export default router;
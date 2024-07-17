import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Landing from "./Pages/Landing";
import Leaderboard from "./Pages/Leaderboard";
import Error404 from "./Pages/Error404";
import Game from "./Pages/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/game",
        element: <Game />,
      },
    ],
  },
]);

export default router;

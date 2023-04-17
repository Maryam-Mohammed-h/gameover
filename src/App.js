import React from "react";
import { Offline } from "react-detect-offline";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Home from "./Components/Home/Home";
import GamesDetails from "./Components/GamesDetails/GamesDetails";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound";
import AllGames from "./Components/AllGames/AllGames.jsx";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import { GameContextProvider } from "./Context/GameContext.js";
import { Toaster } from "react-hot-toast";

export default function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  const [userData, setuserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken);
  }

  const routes = createHashRouter([
    {
      path: "games",
      element: <Layout userData={userData} setuserData={setuserData}></Layout>,
      children: [
        {
          path: ":type/:value",
          element: (
            <ProtectedRoute>
              <GameContextProvider>
                <AllGames />
              </GameContextProvider>
            </ProtectedRoute>
          ),
        },
        {
          path: "all",
          element: (
            <ProtectedRoute>
              <GameContextProvider>
                <AllGames />
              </GameContextProvider>
            </ProtectedRoute>
          ),
        },

        { path: "*", element: <Notfound></Notfound> },
      ],
    },
    {
      path: "/",
      element: <Layout userData={userData} setuserData={setuserData}></Layout>,
      children: [
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <GameContextProvider>
                <Home></Home>
              </GameContextProvider>
            </ProtectedRoute>
          ),
        },
        {
          path: "gamesDetails/:gameId",
          element: (
            <ProtectedRoute>
              <GameContextProvider>
                <GamesDetails></GamesDetails>
              </GameContextProvider>
            </ProtectedRoute>
          ),
        },

        {
          path: "/",
          element: <Login saveUserData={saveUserData}></Login>,
        },
        {
          path: "login",
          element: <Login saveUserData={saveUserData}></Login>,
        },
        { path: "register", element: <Register></Register> },
        { path: "*", element: <Notfound></Notfound> },
      ],
    },
  ]);

  return (
    <>
      <Offline>
        <div className="network">You are currently offline</div>
      </Offline>
      <Toaster />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

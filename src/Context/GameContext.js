import { createContext, useEffect, useState } from "react";

import axios from "axios";
export let gameContext = createContext();

export function GameContextProvider(props) {
  async function getGames(path, type, value) {
    let checkUrl =
      path === "all"
        ? {
            params: {},
          }
        : {
            params: { [type === "sort-by" ? "sort-by" : type]: value },
          };
    checkUrl = checkUrl.params;

    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      params: checkUrl,
      headers: {
        "X-RapidAPI-Key": "0e01d8fb2bmshd337779274ea968p12081bjsnc6054484bcb0",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    return axios
      .request(options)
      .then((response) => response)
      .catch(function (error) {
        console.error(error);
      });
  }

  async function getGameDetails(gameId) {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
      params: { id: gameId },
      headers: {
        "X-RapidAPI-Key": "0e01d8fb2bmshd337779274ea968p12081bjsnc6054484bcb0",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    return axios
      .request(options)
      .then((response) => response)
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <gameContext.Provider value={{ getGames, getGameDetails }}>
      {props.children}
    </gameContext.Provider>
  );
}

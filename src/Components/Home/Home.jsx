import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { gameContext } from "../../Context/GameContext";

export default function Home() {
  let [gamesData, setGamesData] = useState(null);

  const [isLoading, setisLoading] = useState(false);
  let { getGames } = useContext(gameContext);

  async function getGamesData(path, type, value) {
    setisLoading(true);
    let response = await getGames(path, type, value)
      .then((res) => {
        setGamesData(res?.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getGamesData("home", "sort-by", "popularity");
  }, []);
  return (
    <>
      {isLoading ? (
        <div className=" ">
          <div
            className="loader__wrap"
            role="alertdialog"
            aria-busy="true"
            aria-live="polite"
            aria-label="Loading…"
          >
            <div className="loader" aria-hidden="true">
              <div className="loader__sq"></div>
              <div className="loader__sq"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div className="home-bg d-flex flex-column text-center py-5 ">
            <h2 className="text-light pt-3">
              Find & track the best{" "}
              <span className="text-info"> free-to-play </span>
              games!
            </h2>
            <p className="lead text-muted text-center py-2">
              Track what you've played and search for what to play next! Plus
              get free premium loot!
            </p>
            <Link
              to="/games/all"
              className=" btn btn-outline-secondary btn-md w-auto m-auto py-2"
            >
              Browse Games
            </Link>
          </div>
          <hr />
          <div className="personlized-recommendation">
            <h3 className="f-xl text-light">
              <i className="fa-solid fa-robot"></i>
              Personalized Recommendations
            </h3>
            <div className="personalized-games">
              <div className="row">
                {gamesData?.slice(0, 3).map((game) => (
                  <div
                    className="col-4 d-flex align-items-stretch "
                    key={game.id}
                  >
                    <Link to={`/gamesDetails/${game.id}`}>
                      <div
                        className=" card bg-dark text-white  "
                        style={{ height: "100%" }}
                      >
                        <img
                          className="card-img-top"
                          src={game.thumbnail}
                          alt={game.title}
                        />
                        <div className="card-body ">
                          <div className="card-title d-flex justify-content-between align-items-center">
                            <h5>{game.title}</h5>
                            <span className="badge bg-primary">Free</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                ;
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

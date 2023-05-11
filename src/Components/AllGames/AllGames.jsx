import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { gameContext } from "../../Context/GameContext";

export default function AllGames() {
  let [gamesData, setGamesData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { type, value } = useParams();
  const location = useLocation();
  let path = location.pathname;
  let { getGames } = useContext(gameContext);
  if (path === "/games/all") {
    path = "all";
  } else {
    path = location.hash;
  }

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
    getGamesData(path, type, value);
  }, [path]);

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
          <div className="row py-3 gy-4 ">
            {gamesData?.map((game) => (
              <div className="col-3 d-flex align-items-stretch " key={game.id}>
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
                        <span className="badge bg-primary ">Free</span>
                      </div>

                      <p className="card-text card-game-description">
                        {game.short_description
                          .split(" ")
                          .slice(0, 4)
                          .join(" ")}
                      </p>
                      <div className="card-footer-info d-flex justify-content-between align-items-center ">
                        <span className="badge badge-secondary ">
                          <i className="fas fa-plus"></i>
                        </span>
                        <div className="footer-genre-platform ">
                          <span className="badge badge-secondary badge-pill me-2">
                            {game.genre}
                          </span>
                          <span className="text-secondary">
                            {game.platform === "PC (Windows)" ? (
                              <i className="fab fa-windows"></i>
                            ) : (
                              <i className="fas fa-window-maximize"></i>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            ;
          </div>
        </>
      )}
    </>
  );
}

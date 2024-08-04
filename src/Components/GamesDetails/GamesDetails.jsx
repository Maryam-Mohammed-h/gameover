import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gameContext } from "../../Context/GameContext";
import triangle from "../../assets/images/icons8-triangle-48.png";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ImageSlider, { Slide } from "react-auto-image-slider";
export default function GamesDetails() {
  const [gamesDataDetails, setGamesDataDetails] = useState("");
  const { gameId } = useParams();
  const [isLoading, setisLoading] = useState(false);

  let { getGameDetails } = useContext(gameContext);

  async function getGamesDetailasData(gameId) {
    setisLoading(true);
    let response = await getGameDetails(gameId)
      .then((res) => {
        setGamesDataDetails(res?.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getGamesDetailasData(gameId);
  }, []);

  return (
    <>
      <Helmet>
        <title>Game Details</title>
      </Helmet>
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
        <div className="gameDetailsContainer row text-white justify-content-center">
          <div className="col-4 py-3 ">
            <img
              className="w-100 rounded-2 "
              src={gamesDataDetails?.thumbnail}
              alt={gamesDataDetails?.title}
            />
            <div className=" game-image-btn d-flex justify-content-center">
              <Link to={gamesDataDetails?.game_url} className="w-100">
                <span className="badge bg-secondary p-3 mt-1 h2"> Free</span>
                <button className="btn btn-primary rounded-3 w-75 p-2  ms-1">
                  <span className="font-weight-bold">Play now</span>{" "}
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </Link>
            </div>
          </div>
          <div className="col-8 py-4 game-text">
            <div className="gameTitle">
              <h2>{gamesDataDetails?.title}</h2>
              <h4> About {gamesDataDetails?.title}</h4>
            </div>
            <div className="gameDesc">
              <p className="">{gamesDataDetails?.description}</p>
            </div>
            <div className="min-sys-req">
              <h4>Minimum System Requirements</h4>
              <ul>
                {gamesDataDetails?.minimum_system_requirements
                  ? Object.keys(
                      gamesDataDetails?.minimum_system_requirements
                    ).map((oneKey, i, value) => {
                      return (
                        <li key={i}>
                          <span className="h6"> {value[i]} : </span>
                          <span>
                            {
                              gamesDataDetails?.minimum_system_requirements[
                                oneKey
                              ]
                            }
                          </span>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
            {gamesDataDetails?.screenshots ? (
              <div className="overWatchScreen">
                <h3>Over watched screens</h3>
                <div className="image-slider">
                  <ImageSlider
                    className="w-50"
                    effectDelay={500}
                    autoPlayDelay={2000}
                  >
                    {Object.keys(gamesDataDetails?.screenshots).map(
                      (oneKey, i) => {
                        return (
                          <Slide key={i}>
                            <img
                              className="w-50"
                              src={gamesDataDetails?.screenshots[oneKey].image}
                              alt={gamesDataDetails?.title}
                            />
                          </Slide>
                        );
                      }
                    )}
                  </ImageSlider>
                </div>
              </div>
            ) : null}

            <Link to="/Home"></Link>
          </div>
        </div>
      )}
    </>
  );
}

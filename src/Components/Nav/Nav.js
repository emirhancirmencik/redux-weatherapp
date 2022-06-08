/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeLanguage,
  changeTheme,
  resetSearch,
  fetchCities,
  fetchWeather,
  fetchCurrentWeather,
} from "../../redux/weather/WeatherSlice";

function Navbar() {
  const language = useSelector((state) => state.weather.language);
  const cities = useSelector((state) => state.weather.cities);
  const theme = useSelector((state) => state.weather.theme);
  const [isSearchActive, setActive] = useState(0);
  const [isResultActive, setResActive] = useState(0);
  const [isToggActive, setToggActive] = useState(0);
  const [displayMenu, setDisplayMenu] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (search.length > 0) {
      dispatch(fetchCities(search));
    }
    if (search.length === 0) {
      dispatch(resetSearch());
    }
  }, [search]);

  function handleButton() {
    if (isSearchActive === 0) {
      setActive(1);
    } else {
      if (search.length === 0) {
        setActive(0);
        setSearch("");
      }
    }
  }

  function handleBlur() {
    setTimeout(function () {
      setResActive(0);
    }, 300);
  }

  function handleToggle() {
    if (isToggActive) {
      setToggActive(0);
      setTimeout(() => {
        setDisplayMenu(0);
      }, 10);
    } else {
      setDisplayMenu(1);
      setTimeout(() => {
        setToggActive(1);
      }, 10);
    }
  }

  function handleClickCity(e) {
    dispatch(
      fetchWeather({
        lat: e.lat,
        lon: e.lon,
        exclude: "minutely,hourly,alerts,current",
        language: language,
      })
    );
    dispatch(
      fetchCurrentWeather({ lat: e.lat, lon: e.lon, language: language })
    );
  }

  function handleChangeTheme() {
    dispatch(changeTheme());

    if (theme) {
      localStorage.setItem("theme", 0);
    } else {
      localStorage.setItem("theme", 1);
    }
  }

  if (!theme) {
    document.body.style.backgroundColor = `#fff`;
  } else {
    document.body.style.backgroundColor = `#394557`;
  }

  return (
    <div className={`navback ${theme && `dark-mode-2`}`}>
      <div className="container">
        <div className="row">
          <div className="mt-2 col-lg-1 offset-lg-0 col-md-2 offset-md-0 col-sm-3 offset-sm-0 col-2 offset-0">
            <a href="/" className="logo">
              <img
                src={require("../../logo.png")}
                alt=""
                width="100px"
                height="100px"
              />
            </a>
          </div>
          <div className="col-lg-3 offset-lg-1 col-md-2 offset-md-1 col-sm-2 offset-sm-1 col-3 offset-3">
            <div>
              <input
                type="text"
                className={`search-input ${isSearchActive && "active"} ${
                  theme && "dark-mode-1"
                }`}
                onChange={handleSearch}
                value={search}
                onFocus={() => setResActive(1)}
                onBlur={handleBlur}
              />
              <div
                className={`cities ${
                  isSearchActive && isResultActive && "active"
                }`}
              >
                {cities.length > 0 &&
                  cities.map((e, i) => {
                    return (
                      <div className="city" key={i}>
                        <Link
                          to={`/weather/${e.lat}/${e.lon}`}
                          onClick={() => handleClickCity(e)}
                          className="city"
                        >
                          <div className="row">
                            <div className="col-3 text-end">{e.country}</div>
                            <div className="col-9">{e.name}</div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              className={`search-button ${
                isSearchActive && "active"
              } text-center ${theme && "dark-mode-1"}`}
              onClick={handleButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill={` ${theme ? "#566782" : "#1C2E4D"}`}
                className="bi bi-search mt-2"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
          <div className="col-lg-1 offset-lg-5 col-md-1 offset-md-4 col-sm-1 offset-sm-3 d-none d-sm-block">
            <div className="row">
              <div className="col-6">
                <button
                  className={`mybutton`}
                  onClick={() => dispatch(changeLanguage())}
                >
                  <div
                    className={`button-back ${theme && "button-back-dark"}`}
                  ></div>
                  <div
                    className={`button-slider ${
                      language === "tr" && "active"
                    } ${theme && "dark-mode-4"}`}
                  ></div>
                  <div className="row">
                    <div className="col-5 flags">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 480"
                        width="15"
                        className="flag-tr"
                      >
                        <g fillRule="evenodd">
                          <path fill="#e30a17" d="M0 0h640v480H0z" />
                          <path
                            fill="#fff"
                            d="M407 247.5c0 66.2-54.6 119.9-122 119.9s-122-53.7-122-120 54.6-119.8 122-119.8 122 53.7 122 119.9z"
                          />
                          <path
                            fill="#e30a17"
                            d="M413 247.5c0 53-43.6 95.9-97.5 95.9s-97.6-43-97.6-96 43.7-95.8 97.6-95.8 97.6 42.9 97.6 95.9z"
                          />
                          <path
                            fill="#fff"
                            d="m430.7 191.5-1 44.3-41.3 11.2 40.8 14.5-1 40.7 26.5-31.8 40.2 14-23.2-34.1 28.3-33.9-43.5 12-25.8-37z"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="col-5 offset-2 flags">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 480"
                        width="15"
                        className="flag-en"
                      >
                        <path fill="#012169" d="M0 0h640v480H0z" />
                        <path
                          fill="#FFF"
                          d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
                        />
                        <path
                          fill="#C8102E"
                          d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
                        />
                        <path
                          fill="#FFF"
                          d="M241 0v480h160V0H241zM0 160v160h640V160H0z"
                        />
                        <path
                          fill="#C8102E"
                          d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <button className="mybutton" onClick={() => handleChangeTheme()}>
                <div
                  className={`button-back ${theme && "button-back-dark"}`}
                ></div>
                <div
                  className={`button-slider ${theme && "active"} ${
                    theme && "dark-mode-4"
                  }`}
                ></div>
                <div className="row">
                  <div className="col-5  flags">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="white"
                      className="flag-tr"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                    </svg>
                  </div>
                  <div className="col-5 offset-2 flags">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="white"
                      className="flag-en"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="col-lg-1 offset-lg-0 col-md-2 offset-md-0 col-sm-1 offset-sm-1 d-none d-sm-block">
            <a
              href="https://github.com/emirhancirmencik/redux-weatherapp"
              className="logo"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill={` ${theme ? "#394557" : "#fff"}`}
                className="bi bi-github gitlogo"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </div>
          <div className="col-1 d-sm-none">
            <div
              className={`search-button toggle-button ${
                isSearchActive && "search-active d-none"
              } text-center ${theme && "dark-mode-1"} ${
                isToggActive && "x-btn "
              }`}
              onClick={() => handleToggle()}
            >
              {!displayMenu ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-list mt-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fillRule="currentColor"
                  className="bi bi-x mt-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              )}
            </div>
            <div
              className={`toggle-menu text-center ${theme && "dark-mode-1"} ${
                isToggActive ? "active" : ""
              } ${displayMenu ? "" : "d-none"}`}
            >
              <div className="row toggle-buttons">
                <div className="col-lg-1 row offset-lg-5 col-md-1 offset-md-4 col-sm-1 offset-sm-3 d-sm-none">
                  <div className="row toggle-buttons-container">
                    <div className="col-12">
                      <button
                        className={`mybutton ms-5`}
                        onClick={() => dispatch(changeLanguage())}
                      >
                        <div
                          className={`button-back ${
                            theme && "button-back-dark"
                          }`}
                        ></div>
                        <div
                          className={`button-slider ${
                            language === "tr" && "active"
                          } ${theme && "dark-mode-4"}`}
                        ></div>
                        <div className="row">
                          <div className="col-5 flags">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 480"
                              width="15"
                              className="flag-tr"
                            >
                              <g fillRule="evenodd">
                                <path fill="#e30a17" d="M0 0h640v480H0z" />
                                <path
                                  fill="#fff"
                                  d="M407 247.5c0 66.2-54.6 119.9-122 119.9s-122-53.7-122-120 54.6-119.8 122-119.8 122 53.7 122 119.9z"
                                />
                                <path
                                  fill="#e30a17"
                                  d="M413 247.5c0 53-43.6 95.9-97.5 95.9s-97.6-43-97.6-96 43.7-95.8 97.6-95.8 97.6 42.9 97.6 95.9z"
                                />
                                <path
                                  fill="#fff"
                                  d="m430.7 191.5-1 44.3-41.3 11.2 40.8 14.5-1 40.7 26.5-31.8 40.2 14-23.2-34.1 28.3-33.9-43.5 12-25.8-37z"
                                />
                              </g>
                            </svg>
                          </div>
                          <div className="col-5 offset-2 flags">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 480"
                              width="15"
                              className="flag-en"
                            >
                              <path fill="#012169" d="M0 0h640v480H0z" />
                              <path
                                fill="#FFF"
                                d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
                              />
                              <path
                                fill="#C8102E"
                                d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
                              />
                              <path
                                fill="#FFF"
                                d="M241 0v480h160V0H241zM0 160v160h640V160H0z"
                              />
                              <path
                                fill="#C8102E"
                                d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"
                              />
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="col-12">
                      <button
                        className="mybutton ms-5"
                        onClick={() => handleChangeTheme()}
                      >
                        <div
                          className={`button-back ${
                            theme && "button-back-dark"
                          }`}
                        ></div>
                        <div
                          className={`button-slider ${theme && "active"} ${
                            theme && "dark-mode-4"
                          }`}
                        ></div>
                        <div className="row">
                          <div className="col-5  flags">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              fill="white"
                              className="flag-tr"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                            </svg>
                          </div>
                          <div className="col-5 offset-2 flags">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              fill="white"
                              className="flag-en"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="col-12">
                      <div className="d-sm-none">
                        <a
                          href="https://github.com/emirhancirmencik/redux-weatherapp"
                          className="ms-5"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill={` ${theme ? "#394557" : "#fff"}`}
                            className="bi bi-github gitlogo"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

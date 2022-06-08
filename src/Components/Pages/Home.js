import React, { useState } from "react";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

function Home() {
  const theme = useSelector((state) => state.weather.theme);
  const language = useSelector((state) => state.weather.language);
  const [currentPhoto, setCurrent] = useState(2);

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="row mt-5 text-start">
          <div className={`col-12 col-md-7 text-align-justify`}>
            <div
              className={`current-weather h-100 home-radius current-weather-text p-5   ${
                theme && `dark-mode-2`
              }`}
            >
              {language === "tr"
                ? "Redux hava durumu uygulamasına hoş geldiniz."
                : "Welcome to the redux weather forecast web application."}
              <hr />
              {language === "tr"
                ? "Bu uygulama"
                : "This application is using"}{" "}
              <a
                href="https://openweathermap.org/"
                className="text-decoration-none footer-text"
                target="_blank"
                rel="noreferrer"
              >
                openweathermap.org
              </a>
              {language === "tr"
                ? "'un verilerini ve"
                : "'s data and photos from"}{" "}
              <a
                href="https://www.pexels.com/"
                className="text-decoration-none footer-text"
                target="_blank"
                rel="noreferrer"
              >
                pexels.com
              </a>
              {language === "tr"
                ? "'dan alınan fotoğrafları kullanmaktadır. Yukarıdaki arama ikonuna basarak ve ilgili şehri yazarak arama yapabilirsiniz, ya da popüler şehirler kısmından şehir seçebilirsiniz. "
                : ". You can search by clicking search icon in the navbar and typing, or you can select from most popular cities."}
            </div>
          </div>{" "}
          <div className={`col-12 col-md-5 mt-3 mt-md-0 `}>
            <div
              className={`current-weather h-100 home-radius ${
                theme && `dark-mode-2`
              } p-5 current-weather-text`}
            >
              <span className="title">
                {language === "tr" ? "Popüler Şehirler" : "Popular Cities"}
              </span>
              <hr />
              <div className="row">
                <div className="col-12 col-xl-6">
                  <div
                    className={`popular home-radius ${theme && `dark-mode-1`}`}
                  >
                    <Link
                      className={`popular-city home-radius ${
                        theme && `dark-mode-1`
                      }`}
                      to={`/weather/51.5073219/-0.1276474`}
                    >
                      <div className="row">
                        <div className="col-4 text-center">GB</div>
                        <div className="col-8">
                          {language === "tr" ? "Londra" : "London"}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div
                    className={`popular home-radius ${theme && `dark-mode-1`}`}
                  >
                    <Link
                      className={`popular-city ${theme && `dark-mode-1`}`}
                      to={`/weather/39.906217/116.3912757`}
                    >
                      <div className="row">
                        <div className="col-4 text-center">CN</div>
                        <div className="col-8">
                          {language === "tr" ? "Pekin" : "Beijing"}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div
                    className={`popular home-radius ${theme && `dark-mode-1`}`}
                  >
                    <Link
                      className={`popular-city ${theme && `dark-mode-1`}`}
                      to={`/weather/40.7127281/-74.0060152`}
                    >
                      <div className="row">
                        <div className="col-4 text-center">US</div>
                        <div className="col-8">New York</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div
                    className={`popular home-radius ${theme && `dark-mode-1`}`}
                  >
                    <Link
                      className={`popular-city ${theme && `dark-mode-1`}`}
                      to={`/weather/35.6828387/139.7594549`}
                    >
                      <div className="row">
                        <div className="col-4 text-center">JP</div>
                        <div className="col-8">Tokyo</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div
                    className={`popular home-radius ${theme && `dark-mode-1`}`}
                  >
                    <Link
                      className={`popular-city ${theme && `dark-mode-1`}`}
                      to={`/weather/48.8566969/2.3514616`}
                    >
                      <div className="row">
                        <div className="col-4 text-center">FR</div>
                        <div className="col-8">Paris</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div
                    className={`popular home-radius ${theme && `dark-mode-1`}`}
                  >
                    <Link
                      className={`popular-city ${theme && `dark-mode-1`}`}
                      to={`/weather/41.0096334/28.9651646`}
                    >
                      <div className="row">
                        <div className="col-4 text-center">TR</div>
                        <div className="col-8">İstanbul</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-12 mt-4`}>
            <div
              className={`
               current-weather home-radius d-flex p-5 ${
                 theme && `dark-mode-2`
               }`}
            >
              <div className="row w-100 ">
                <h3 className="title">
                  {language === "tr"
                    ? "İlham Kaynağı Yağmur Fotoğrafları"
                    : "Inspirational Rain Photos "}
                </h3>
                <hr />
                <div
                  className={`weather-photo london ${
                    currentPhoto === 0 ? "active" : ""
                  }`}
                  onClick={() => setCurrent(0)}
                >
                  <h3>{language === "tr" ? "Londra" : "London"}, GB</h3>
                </div>
                <div
                  className={`weather-photo bali ${
                    currentPhoto === 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrent(1)}
                >
                  <h3>Bali, ID </h3>
                </div>
                <div
                  className={`weather-photo istanbul ${
                    currentPhoto === 2 ? "active" : ""
                  }`}
                  onClick={() => setCurrent(2)}
                >
                  {" "}
                  <h3>İstanbul, TR</h3>
                </div>
                <div
                  className={`weather-photo kyoto ${
                    currentPhoto === 3 ? "active" : ""
                  }`}
                  onClick={() => setCurrent(3)}
                >
                  {" "}
                  <h3>Kyoto, JP</h3>
                </div>
                <div
                  className={`weather-photo petersburg ${
                    currentPhoto === 4 ? "active" : ""
                  }`}
                  onClick={() => setCurrent(4)}
                >
                  {" "}
                  <h3>St. Petersburg, RU</h3>
                </div>

                <div
                  className={`weather-photo morelia ${
                    currentPhoto === 5 ? "active" : ""
                  }`}
                  onClick={() => setCurrent(5)}
                >
                  {" "}
                  <h3>Morelia, MX</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

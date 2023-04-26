import React, { useState } from 'react';

const LoadingScreen = ({ exitLoading }) => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  setTimeout(() => setBackgroundLoaded(true), 500);

  return (
    <div>
      <body
        className={`${
          exitLoading ? '' : 'no-scroll-y'
        } bg-[url(https://www.pixel4k.com/wp-content/uploads/2018/10/color-waves-abstract_1539371252.jpg)]`}
      >
        <section className="fade-in-image">
          <div id="preloader">
            <div
              id="ctn-preloader"
              className={`ctn-preloader ${
                exitLoading ? 'loaded' : 'entry-loading'
              }`}
            >
              {backgroundLoaded && (
                <div
                  className={`animation-preloader ${
                    backgroundLoaded ? 'fade-in-loader' : ''
                  }`}
                >
                  <div className="spinner-preloader">
                    <div id="spinner-loader"></div>
                  </div>
                  <div className="txt-loading">
                    <span data-text-preloader="L" className="letters-loading">
                      L
                    </span>

                    <span data-text-preloader="O" className="letters-loading">
                      O
                    </span>

                    <span data-text-preloader="A" className="letters-loading">
                      A
                    </span>

                    <span data-text-preloader="D" className="letters-loading">
                      D
                    </span>

                    <span data-text-preloader="I" className="letters-loading">
                      I
                    </span>

                    <span data-text-preloader="N" className="letters-loading">
                      N
                    </span>

                    <span data-text-preloader="G" className="letters-loading">
                      G
                    </span>
                  </div>
                </div>
              )}
              <div className="loader-section section-left"></div>
              <div className="loader-section section-right"></div>
            </div>
          </div>
        </section>
      </body>
    </div>
  );
};

export default LoadingScreen;

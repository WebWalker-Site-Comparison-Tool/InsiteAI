import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ exitLoading }) => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  setTimeout(() => setBackgroundLoaded(true), 500);

  return (
    <div>
      <body
        class={`${
          exitLoading ? '' : 'no-scroll-y'
        } bg-[url(https://www.pixel4k.com/wp-content/uploads/2018/10/color-waves-abstract_1539371252.jpg)]`}
      >
        <section className="fade-in-image">
          <div id="preloader">
            <div
              id="ctn-preloader"
              class={`ctn-preloader ${
                exitLoading ? 'loaded' : 'entry-loading'
              }`}
            >
              {backgroundLoaded && (
                <div
                  class={`animation-preloader ${
                    backgroundLoaded ? 'fade-in-loader' : ''
                  }`}
                >
                  <div class="spinner-preloader">
                    <div id="spinner-loader"></div>
                  </div>
                  <div class="txt-loading">
                    <span data-text-preloader="L" class="letters-loading">
                      L
                    </span>

                    <span data-text-preloader="O" class="letters-loading">
                      O
                    </span>

                    <span data-text-preloader="A" class="letters-loading">
                      A
                    </span>

                    <span data-text-preloader="D" class="letters-loading">
                      D
                    </span>

                    <span data-text-preloader="I" class="letters-loading">
                      I
                    </span>

                    <span data-text-preloader="N" class="letters-loading">
                      N
                    </span>

                    <span data-text-preloader="G" class="letters-loading">
                      G
                    </span>
                  </div>
                </div>
              )}
              <div class="loader-section section-left"></div>
              <div class="loader-section section-right"></div>
            </div>
          </div>
        </section>
      </body>
    </div>
  );
};

export default LoadingScreen;

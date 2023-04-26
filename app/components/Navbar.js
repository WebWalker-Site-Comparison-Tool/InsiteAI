import React from 'react';

const Navbar = ({ URL, showOverviewHandler }) => {
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900/[.75] animated fadeInDown FadeInDown">
      <div class="max-w-screen-xl flex flex-col flex-wrap items-between justify-center mx-auto p-4">
        <a href="/" class="flex items-right">
          <img src="logo_notext.png" class="h-20" alt="LighthouseAI Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            LighthouseAI
          </span>
        </a>
        <div className="mt-20 mb-5 text-5xl hover:cursor-default">{URL}</div>
        <div
          class="w-full md:block md:w-auto border-b-[1px] border-b-fuchsia-900 pb-2"
          id="navbar-default"
        >
          <ul class="font-medium flex flex-row p-0 border-gray-100 bg-gray-50 space-x-12 mt-0 border-0 bg-white dark:bg-gray-900/[.0] dark:border-gray-900/[.75]">
            <li>
              <a
                href="#"
                class="block bg-transparent hover:text-blue-700 p-0 dark:text-blue-500 font-semibold"
                aria-current="page"
                onClick={(e) => {
                  e.preventDefault();
                  showOverviewHandler(true);
                }}
              >
                Overview
              </a>
            </li>
            <li>
              <a
                href=""
                class="block bg-transparent hover:text-blue-700 p-0 dark:text-white font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  showOverviewHandler(false);
                }}
              >
                Comparisons
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

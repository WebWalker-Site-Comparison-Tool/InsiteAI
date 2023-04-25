import React from 'react';
import SearchBar from './SearchBar';

const SearchBarContainer = ({ submittedURLHandler, submittedURL }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-screen animated ${
        !submittedURL ? 'FadeInUp fadeInUp' : `FadeOutUp fadeOutUp`
      }`}
    >
      <img src="logo.png" className="w-[10%] mb-5" />
      <div className="flex flex-col justify-center items-center w-screen mb-80">
        <div className="flex flex-col items-center w-1/2">
          <div className="border-gray-200 dark:bg-gray-900/[.75] p-6 w-full rounded-lg">
            <div className="mr-auto text-8xl mb-3 cursor-default">
              Enter A URL.
            </div>
            <SearchBar submittedURLHandler={submittedURLHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarContainer;

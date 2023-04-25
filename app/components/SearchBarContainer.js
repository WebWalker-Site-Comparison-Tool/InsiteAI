import React from 'react';
import SearchBar from './SearchBar';

const SearchBarContainer = ({ submittedURLHandler, submittedURL }) => {
  return (
    <div
      className={`flex justify-center items-center w-screen animated ${
        !submittedURL ? 'FadeInUp fadeInUp' : `FadeOutUp fadeOutUp`
      }`}
    >
      <div className="flex flex-col justify-center items-center w-screen mb-80">
        <div className="flex flex-col items-center w-1/2">
          <div className="bg-gray-700/[.9] p-6 w-full rounded-lg">
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

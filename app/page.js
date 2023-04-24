'use client';

import Navbar from './components/Navbar';
import SearchBarContainer from './components/SearchBarContainer';
import { useState } from 'react';

export default function Home() {
  const [submittedURL, setSubmittedURL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submittedURLHandler = () => {
    setSubmittedURL(!submittedURL);
    // setIsLoading(!isLoading);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {isLoading ? (
        <Navbar />
      ) : (
        <SearchBarContainer
          submittedURLHandler={submittedURLHandler}
          submittedURL={submittedURL}
        />
      )}
    </div>
  );
}

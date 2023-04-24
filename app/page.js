'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import SearchBarContainer from './components/SearchBarContainer';

export default function Home() {
  const [submittedURL, setSubmittedURL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submittedURLHandler = () => {
    setSubmittedURL(!submittedURL);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    sleep(1000).then(() => setIsLoading(!isLoading));
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <SearchBarContainer
          submittedURLHandler={submittedURLHandler}
          submittedURL={submittedURL}
        />
      )}
    </div>
  );
}

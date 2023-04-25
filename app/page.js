'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import SearchBarContainer from './components/SearchBarContainer';

export default function Home() {
  const [submittedURL, setSubmittedURL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exitLoading, setExitLoading] = useState(false);

  const submittedURLHandler = () => {
    setSubmittedURL(!submittedURL);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    sleep(1000).then(() => setIsLoading(!isLoading));

    //JUST TO DEMO. API CALL WILL GO HERE OR SOME USE EFFECT HOOK. YOU SET EXIT LOADING FIRST TO PLAY EXIT ANIMATIONS, THEN YOU GET OUT OF IS LOADING.
    sleep(7000).then(() => setExitLoading(!exitLoading));
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {isLoading && submittedURL ? (
        <LoadingScreen exitLoading={exitLoading} />
      ) : (
        <SearchBarContainer
          submittedURLHandler={submittedURLHandler}
          submittedURL={submittedURL}
        />
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import SearchBarContainer from './components/SearchBarContainer';
import DataPageContainer from './components/DataPageContainer';

export default function Home() {
  const [submittedURL, setSubmittedURL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exitLoading, setExitLoading] = useState(false);
  const [killLoadLoop, setKillLoadLoop] = useState(false);

  const submittedURLHandler = async (url) => {
    setSubmittedURL(!submittedURL);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    sleep(1000).then(() => setIsLoading(!isLoading));

    //JUST TO DEMO. API CALL WILL GO HERE OR SOME USE EFFECT HOOK. YOU SET EXIT LOADING FIRST TO PLAY EXIT ANIMATIONS, THEN YOU GET OUT OF IS LOADING.
    fetch(`/api/getMetrics/${url}`);


    sleep(7000)
      .then(() => setExitLoading(!exitLoading))
      .then(() => sleep(1200))
      .then(() => {
        setKillLoadLoop(true);
      });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {isLoading && submittedURL && !killLoadLoop && (
        <LoadingScreen exitLoading={exitLoading} />
      )}
      {!killLoadLoop && (
        <SearchBarContainer
          submittedURLHandler={submittedURLHandler}
          submittedURL={submittedURL}
        />
      )}
      {killLoadLoop && <DataPageContainer />}
    </div>
  );
}

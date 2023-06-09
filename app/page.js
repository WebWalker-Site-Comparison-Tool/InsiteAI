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
  const [URL, setURL] = useState('');
  const [fullData, setFullData] = useState(null);
  const [urlData, setURLData] = useState(null);

  const submittedURLHandler = async (url) => {
    setURL(url);
    setSubmittedURL(!submittedURL);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    sleep(1000).then(() => setIsLoading(!isLoading));

    //JUST TO DEMO. API CALL WILL GO HERE OR SOME USE EFFECT HOOK. YOU SET EXIT LOADING FIRST TO PLAY EXIT ANIMATIONS, THEN YOU GET OUT OF IS LOADING.
    const fullData = await fetch('/api/sql-db/retrieve');
    const parsedData = await fullData.json();
    const mappedData = parsedData.map((parsedObject) => {
      return parsedObject.dataObj;
    });
    setFullData(mappedData);
    // const urlData = await fetch(`/api/getMetrics/${url}`);
    // const parsedURLData = await urlData.json();
    // console.log(parsedURLData);
    await sleep(15000);

    setExitLoading(!exitLoading);
    sleep(1200).then(() => {
      setKillLoadLoop(true);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      {isLoading && submittedURL && !killLoadLoop && (
        <LoadingScreen exitLoading={exitLoading} />
      )}
      {!killLoadLoop && (
        <SearchBarContainer
          submittedURLHandler={submittedURLHandler}
          submittedURL={submittedURL}
        />
      )}
      {killLoadLoop && (
        <DataPageContainer URL={URL} fullData={fullData} urlData={urlData} />
      )}
    </div>
  );
}

'use client';

import Navbar from './components/Navbar';
import SearchBarContainer from './components/SearchBarContainer';
import { useState } from 'react';

export default function Home() {
  const [submittedURL, setSubmittedURL] = useState(false);

  const submittedURLHandler = () => {
    setSubmittedURL(!submittedURL);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {submittedURL ? (
        <Navbar />
      ) : (
        <SearchBarContainer submittedURLHandler={submittedURLHandler} />
      )}
    </div>
  );
}

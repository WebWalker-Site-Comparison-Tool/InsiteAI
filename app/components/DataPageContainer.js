import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import OverviewBanner from './OverviewBanner';
import DataContainer from './DataContainer';

//SAME TEST DATA.
import sampleData from '../../sampleData';

//Instead of passing the URL as a prop, pass the actual state.

const DataPageContainer = ({ URL, fullData, urlData }) => {
  const [showOverview, setShowOverview] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const showOverviewHandler = (bool) => setShowOverview(bool);

  const libraryArray = sampleData.libraries.map((library) => {
    return <div key={Math.random() + Date.now()}>{library}</div>;
  });

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    setTimeout(() => {
      //Change hidden state appropriately.
      const toHide = document.getElementsByClassName(
        `${!showOverview ? 'Overview' : 'Comparisons'}`
      );
      for (let i = 0; i < toHide.length; i++) {
        toHide[i].classList.add('hidden');
      }

      const toShow = document.getElementsByClassName(
        `${showOverview ? 'Overview' : 'Comparisons'}`
      );
      for (let i = 0; i < toShow.length; i++) {
        toShow[i].classList.remove('hidden');
      }
    }, 1000);
  }, [showOverview]);

  return (
    <body className="bg-[url(https://www.pixel4k.com/wp-content/uploads/2018/10/color-waves-abstract_1539371252.jpg)]">
      <Navbar URL={URL} showOverviewHandler={showOverviewHandler} />
      <OverviewBanner
        image={sampleData.image}
        showOverview={showOverview}
        isFirstRender={isFirstRender}
      />

      <div className="animated FadeInUp fadeInUp">
        {/* All the statistical views. */}
        {/* First Row */}
        <div className="mt-10 flex justify-around items-center animated FadeInUp fadeInUp Overview">
          <DataContainer
            classes={`p-5 w-[34rem] ${
              !showOverview ? 'animated fadeOutUp FadeOutUp' : ''
            } ${
              showOverview && !isFirstRender
                ? 'animated fadeInDown FadeInDown'
                : ''
            }`}
          >
            <div className="text-2xl mb-5 underline hover:cursor-default">
              Performance
            </div>
            <div className="flex w-full">
              <div className="hover:cursor-default text-xl w-1/2 mr-auto mb-5">
                Blocking Time:{' '}
                <span className="text-pink-700 font-semibold">
                  {sampleData.totalBlockingTime}
                </span>
              </div>
              <div className="hover:cursor-default text-xl w-1/2">
                Time To First Paint:{' '}
                <span className="text-pink-700 font-semibold">
                  {sampleData.firstContentfulPaint}
                </span>
              </div>
            </div>
            <div className="flex w-full">
              <div className="hover:cursor-default text-xl w-full">
                Time To Largest Contentful Paint:{' '}
                <span className="text-pink-700 font-semibold">
                  {sampleData.largestContentfulPaint}
                </span>
              </div>
            </div>
          </DataContainer>
          <DataContainer
            classes={`p-5 ${
              !showOverview ? 'animated fadeOutUp FadeOutUp' : ''
            } ${
              showOverview && !isFirstRender
                ? 'animated fadeInDown FadeInDown'
                : ''
            }`}
          >
            <div className="text-2xl mb-5 underline hover:cursor-default">
              Accessibility
            </div>
            <div className="flex flex-col">
              <div className="hover:cursor-default text-xl mb-5">
                Number of Alt Attributes:{' '}
                <span className="text-emerald-400 font-semibold">
                  {sampleData.imageAlt}
                </span>
              </div>
              <div className="hover:cursor-default text-xl mb-5">
                Number of Links Without Names:{' '}
                <span className="text-emerald-400 font-semibold">
                  {sampleData.linkName}
                </span>
              </div>
              <div className="hover:cursor-default text-xl mb-5">
                Number of Images Failing Low Contrast Tests:{' '}
                <span className="text-emerald-400 font-semibold">
                  {sampleData.colorContrast}
                </span>
              </div>
              <div className="hover:cursor-default text-xl">
                Number of Buttons Without Names:{' '}
                <span className="text-emerald-400 font-semibold">
                  {sampleData.buttonName}
                </span>
              </div>
            </div>
          </DataContainer>
        </div>
        {/* Second Row */}
        <div className="mt-10 flex justify-around items-center mb-5 animated FadeInUp fadeInUp Overview">
          <DataContainer
            classes={`p-5 ${
              !showOverview ? 'animated fadeOutUp FadeOutUp' : ''
            } ${
              showOverview && !isFirstRender
                ? 'animated fadeInDown FadeInDown'
                : ''
            }`}
          >
            <div className="text-2xl mb-5 underline hover:cursor-default">
              SEO
            </div>
            <div className="flex flex-col">
              <div className="hover:cursor-default text-xl mb-5">
                Document Legible Font:{' '}
                <span className="text-cyan-500 font-semibold">NEED DATA</span>
              </div>
              <div className="hover:cursor-default text-xl">
                Overall Score:{' '}
                <span className="text-cyan-500 font-semibold">NEED DATA</span>
              </div>
            </div>
          </DataContainer>
          <DataContainer
            classes={`p-5 ${
              !showOverview ? 'animated fadeOutUp FadeOutUp' : ''
            } ${
              showOverview && !isFirstRender
                ? 'animated fadeInDown FadeInDown'
                : ''
            }`}
          >
            <div className="text-2xl mb-5 underline hover:cursor-default">
              Frameworks & Libraries
            </div>
            <div className="flex flex-col hover:cursor-default text-xl text-purple-500 font-semibold">
              {libraryArray}
            </div>
          </DataContainer>
        </div>
      </div>
    </body>
  );
};

export default DataPageContainer;

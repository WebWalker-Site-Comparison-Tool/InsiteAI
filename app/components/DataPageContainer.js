import React from 'react';
import Navbar from './Navbar';
import OverviewBanner from './OverviewBanner';
import DataContainer from './DataContainer';

const DataPageContainer = ({ URL }) => {
  //Determine the color for the data based.

  return (
    <body className="bg-[url(https://www.pixel4k.com/wp-content/uploads/2018/10/color-waves-abstract_1539371252.jpg)]">
      <Navbar URL={URL} />
      <OverviewBanner />

      <div>
        {/* All the statistical views. */}
        {/* First Row */}
        <div className="mt-10 flex justify-around items-center animated FadeInUp fadeInUp">
          <DataContainer classes={'p-5'}>
            <div className="text-2xl mb-5 underline hover:cursor-default">
              Performance
            </div>
            <div className="flex w-full">
              <div className="hover:cursor-default text-xl w-1/2 mr-auto mb-5">
                Blocking Time:{' '}
                <span className="text-pink-700 font-semibold">Test</span>
              </div>
              <div className="hover:cursor-default text-xl w-1/2">
                Time To First Paint:{' '}
                <span className="text-pink-700 font-semibold">Test</span>
              </div>
            </div>
            <div className="flex w-full">
              <div className="hover:cursor-default text-xl w-1/2 mr-auto mb-5 ">
                Number of Images:{' '}
                <span className="text-pink-700 font-semibold">Test</span>
              </div>
              <div className="hover:cursor-default text-xl w-1/2">
                Time To Largest Contentful Paint:{' '}
                <span className="text-pink-700 font-semibold">Test</span>
              </div>
            </div>
          </DataContainer>
          <DataContainer classes={'p-5'}>
            <div className="text-2xl mb-5 underline hover:cursor-default">
              Accessibility
            </div>
            <div className="flex flex-col">
              <div className="hover:cursor-default text-xl mb-5">
                Number of Alt Attributes:{' '}
                <span className="text-emerald-400 font-semibold">Test</span>
              </div>
              <div className="hover:cursor-default text-xl mb-5">
                Number of Links Without Names:{' '}
                <span className="text-emerald-400 font-semibold">Test</span>
              </div>
              <div className="hover:cursor-default text-xl mb-5">
                Number of Images Failing Low Contrast Tests:{' '}
                <span className="text-emerald-400 font-semibold">Test</span>
              </div>
              <div className="hover:cursor-default text-xl">
                Number of Buttons Without Names:{' '}
                <span className="text-emerald-400 font-semibold">Test</span>
              </div>
            </div>
          </DataContainer>
        </div>
        {/* Second Row */}
        <div className="mt-10 flex justify-around items-center mb-5 animated FadeInUp fadeInUp">
          <DataContainer classes={'p-5'}>
            <div className="text-2xl mb-5 underline hover:cursor-default">
              SEO
            </div>
            <div className="flex flex-col">
              <div className="hover:cursor-default text-xl mb-5">
                Document Legible Font:{' '}
                <span className="text-cyan-500 font-semibold">Test</span>
              </div>
              <div className="hover:cursor-default text-xl">
                Overall Score:{' '}
                <span className="text-cyan-500 font-semibold">Test</span>
              </div>
            </div>
          </DataContainer>
          <DataContainer classes={'p-5'}>
            <div className="text-2xl mb-5 underline hover:cursor-default">
              Frameworks & Libraries
            </div>
            <div className="flex flex-col hover:cursor-default text-xl text-purple-700 font-semibold">
              Array of libs
            </div>
          </DataContainer>
        </div>
      </div>
    </body>
  );
};

export default DataPageContainer;

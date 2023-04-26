import React from 'react';
import DataContainer from './DataContainer';
import PercentageLoader from './PercentageLoader';
import ScatterGraph from './ScatterGraph';

const OverviewBanner = ({ image, showOverview, isFirstRender }) => {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(15, 23, 42, 0.75) 50%, rgba(26, 32, 44, 0.00) 50%)'
      }}
      className="pt-5 animated fadeInDown FadeInDown h-[17rem]"
    >
      <ScatterGraph classes={'Comparisons hidden ml-[40%]'} />
      <div className="flex Overview">
        <DataContainer
          classes={`ml-[25%] p-5 ${
            !showOverview ? 'animated fadeOutUp FadeOutUp' : ''
          } ${
            showOverview && !isFirstRender
              ? 'animated fadeInDown FadeInDown'
              : ''
          }`}
        >
          <PercentageLoader />
        </DataContainer>
        <DataContainer
          classes={`p-5 ml-24 w-[25%] ${
            !showOverview ? 'animated fadeOutUp FadeOutUp' : ''
          } ${
            showOverview && !isFirstRender
              ? 'animated fadeInDown FadeInDown'
              : ''
          }`}
        >
          <div className="text-2xl mb-5 underline hover:cursor-default">
            AI Analysis
          </div>
          <div className="text-xl hover:cursor-default">
            Dummy text will go here
          </div>
        </DataContainer>
        <DataContainer
          classes={`ml-24 p-5 ${
            !showOverview ? 'animated fadeOutUp FadeOutUp' : ''
          } ${
            showOverview && !isFirstRender
              ? 'animated fadeInDown FadeInDown'
              : ''
          }`}
        >
          <img src={image} className="h-52" />
        </DataContainer>
      </div>
    </div>
  );
};

export default OverviewBanner;

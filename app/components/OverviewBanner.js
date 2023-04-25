import React from 'react';
import DataContainer from './DataContainer';
import PercentageLoader from './PercentageLoader';

const OverviewBanner = () => {
  //IMAGE WILL BE img ON THE JSON OBJECT.

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(15, 23, 42, 0.75) 50%, rgba(26, 32, 44, 0.00) 50%)'
      }}
      className="flex pt-5 animated fadeInDown FadeInDown"
    >
      <DataContainer classes={'ml-[25%] p-5'}>
        <PercentageLoader />
      </DataContainer>
      <DataContainer classes={'p-5 ml-24 w-[25%]'}>
        <div className="text-2xl mb-5 underline hover:cursor-default">
          AI Analysis
        </div>
        <div className="text-xl hover:cursor-default">
          Dummy text will go here
        </div>
      </DataContainer>
      <DataContainer classes={'ml-24 p-5'}>
        <img src="background.jpg" className="h-52" />
      </DataContainer>
    </div>
  );
};

export default OverviewBanner;

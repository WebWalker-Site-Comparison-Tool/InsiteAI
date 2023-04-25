import React from 'react';

const DataContainer = ({ children, classes }) => {
  return (
    <div
      className={`bg-slate-800/[.75] rounded-xl flex flex-col items-center ${classes}`}
    >
      {children}
    </div>
  );
};

export default DataContainer;

import React from 'react';

import { easeQuadInOut } from 'd3';
import AnimatedProgressProvider from './helpers/AnimatedProgressProvider';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PercentageLoader = () => {
  return (
    <>
      <div className="text-2xl mb-4 underline hover:cursor-default">
        Overall Rating
      </div>
      <div className="w-32">
        <AnimatedProgressProvider
          valueStart={0}
          valueEnd={66}
          duration={1.4}
          easingFunction={easeQuadInOut}
        >
          {(value) => {
            const roundedValue = Math.round(value);
            return (
              <CircularProgressbar
                value={value}
                text={`${roundedValue}%`}
                styles={buildStyles({
                  pathTransition: 'none',
                  backgroundColor: '#3e98c7',
                  textColor: '#fff',
                  pathColor: 'green',
                  trailColor: 'transparent'
                })}
              />
            );
          }}
        </AnimatedProgressProvider>
      </div>
    </>
  );
};

export default PercentageLoader;

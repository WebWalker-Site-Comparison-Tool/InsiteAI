import React, { useRef } from 'react';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';

const ScatterGraph = ({ classes, fullData }) => {
  const scatterRef = useRef(null);
  console.log(fullData);

  const gistemp = fullData;

  const plot = Plot.plot({
    y: {
      grid: true,
      tickFormat: '+f',
      label: 'SEO'
    },
    color: {
      type: 'diverging',
      scheme: 'BuRd',
      legend: true
    },
    marks: [
      Plot.ruleY([0]),
      Plot.dot(gistemp, {
        x: 'imageAlt',
        y: 'SEO',
        stroke: 'SEO'
      })
    ]
  });

  d3.select(scatterRef.current).selectAll('*').remove();
  if (plot) d3.select(scatterRef.current).append(() => plot);

  return (
    <div className={`w-[50%] h-[50%] text-black ${classes}`} ref={scatterRef} />
  );
};

export default ScatterGraph;

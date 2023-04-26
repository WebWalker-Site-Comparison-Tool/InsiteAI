import React, { useRef } from 'react';
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';

const ScatterGraph = ({ classes }) => {
  const scatterRef = useRef(null);

  const gistemp = [
    { Date: 1880, Anomaly: -0.3 },
    { Date: 1900, Anomaly: -0.21 }
  ];

  const plot = Plot.plot({
    y: {
      grid: true,
      tickFormat: '+f',
      label: '↑ Surface temperature anomaly (°F)'
    },
    color: {
      type: 'diverging',
      scheme: 'BuRd',
      legend: true
    },
    marks: [
      Plot.ruleY([0]),
      Plot.dot(gistemp, { x: 'Date', y: 'Anomaly', stroke: 'Anomaly' })
    ]
  });

  d3.select(scatterRef.current).selectAll('*').remove();
  if (plot) d3.select(scatterRef.current).append(() => plot);

  return (
    <div className={`w-[50%] h-[50%] text-black ${classes}`} ref={scatterRef} />
  );
};

export default ScatterGraph;

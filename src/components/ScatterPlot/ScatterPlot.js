import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  scaleLinear,
  extent,
  scaleTime,
  line,
  group,
  scaleOrdinal,
  schemeCategory10,
  curveMonotoneX,
  format,
} from 'd3';
import PropsTypes from 'prop-types';

import { Group, drawDash, MapWrapper, Map } from 'style/style';
import { width, height } from 'utility/utility';
import AxesLabel from 'components/LineChart/AxesLabel';
import Axes from 'components/Axes/Axes';

function ScatterPlot({ data }) {
  const margin = { top: 50, right: 100, bottom: 70, left: 50 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;
  const circleRadius = 10;

  const xValue = d => d.youthRate;
  const yValue = d => d.elderlyRate;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const axesTickFormat = useCallback(number => {
    return number + '%';
  }, []);

  return (
    <MapWrapper>
      <Map>
        <svg width={width} height={height}>
          <Group
            x={width / 2}
            y={height / 2}
            right={margin.right}
            top={margin.top}>
            <Axes
              xScale={xScale}
              yScale={yScale}
              innerHeight={innerHeight}
              xTickPadding={15}
              yTickPadding={10}
              yTickSize={-innerWidth}
              yAxisTickFormat={axesTickFormat}
              xAixsTickFormat={axesTickFormat}
            />
            <AxesLabel
              innerHeight={innerHeight}
              innerWidth={innerWidth}
              axisPadding={60}
              yLabel="Elderly literacy rate (65+ years)"
              xLabel="Youth literacy rate (15-24 years)"
              marginLeft={margin.left}
            />
          </Group>
        </svg>
      </Map>
    </MapWrapper>
  );
}

export default ScatterPlot;

import React, { useEffect, useRef } from 'react';
import { axisLeft, axisBottom, select, format } from 'd3';
import styled from 'styled-components';
import PropsTypes from 'prop-types';

const Tick = styled.g`
  transform: ${props =>
    props.axisType === 'yAxis' && `translate(0, ${props.innerHeight}px)`};

  path,
  line {
    stroke: #dcdbdb;
  }

  text {
    font-size: 1.4rem;
  }
`;

function Axes({
  xScale,
  yScale,
  innerHeight,
  yAxisTickFormat,
  xAixsTickFormat,
  yTickSize,
  xTickPadding,
  yTickPadding,
}) {
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  useEffect(() => {
    const xGroup = select(xAxisRef.current);
    const yGroup = select(yAxisRef.current);
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(xTickPadding);
    const yAxis = axisLeft(yScale)
      .tickSize(yTickSize)
      .tickPadding(yTickPadding);

    if (yAxisTickFormat) yAxis.tickFormat(yAxisTickFormat); // Line Chart
    if (xAixsTickFormat) xAxis.tickFormat(xAixsTickFormat); // Bar Chart

    xGroup.call(yAxis);
    yGroup.call(xAxis);
  });

  return (
    <g>
      <Tick ref={xAxisRef} axisType="xAxis" />
      <Tick ref={yAxisRef} axisType="yAxis" innerHeight={innerHeight} />
    </g>
  );
}

Axes.propTypes = {
  xScale: PropsTypes.func,
  yScale: PropsTypes.func,
  innerHeight: PropsTypes.number,
  yAxisTickFormat: PropsTypes.func,
  xAixsTickFormat: PropsTypes.func,
  yTickSize: PropsTypes.number,
  xTickPadding: PropsTypes.number,
  yTickPadding: PropsTypes.number,
};

export default React.memo(Axes);

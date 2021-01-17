import React, { useCallback, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { scaleLinear, extent, select } from 'd3';
import PropsTypes from 'prop-types';

import { Group, drawDash, MapWrapper, Map } from 'style/style';
import { width, height } from 'utility/utility';
import AxisLabel from 'components/AxisLabel/AxisLabel';
import Axes from 'components/Axes/Axes';

function ScatterPlot({ data }) {
  const [selected, setSelected] = useState();
  const circleRef = useRef();

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

  useEffect(() => {
    const circleGroup = select(circleRef.current);

    circleGroup
      .selectAll('.scatter-circle')
      .data(data)
      .join('circle')
      .attr('class', 'scatter-circle')
      .attr('cy', innerHeight / 2)
      .attr('cx', innerWidth / 2)
      .attr('r', 0)
      .on('mouseover', (e, d) => setSelected(d))
      .transition()
      .duration(2000)
      .delay((_, i) => i * 10)
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius);
    // .append('title')
    // .text(d.country);
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
            <AxisLabel
              innerHeight={innerHeight}
              innerWidth={innerWidth}
              axisPadding={60}
              yLabel="Elderly literacy rate (65+ years)"
              xLabel="Youth literacy rate (15-24 years)"
              marginLeft={margin.left + 80}
            />
            <g ref={circleRef} />
          </Group>
        </svg>
      </Map>
    </MapWrapper>
  );
}

export default ScatterPlot;

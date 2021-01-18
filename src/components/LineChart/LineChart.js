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

import Axes from 'components/Axes/Axes';
import AxisLabel from 'components/AxisLabel/AxisLabel';
import ColorLegend from 'components/ColorLegend/ColorLegend';
import Indicator from 'components/LineChart/Indicator';
import Tooltip from 'components/LineChart/Tooltip';
import { Group, drawDash, MapWrapper, Map } from 'src/style/style';
import { width, height } from 'utility/utility';

const LinePath = styled.path`
  fill: none;
  stroke-width: 4;
  stroke-dasharray: ${props => props.pathLength};
  stroke-dashoffset: ${props => props.pathLength};
  stroke-linejoin: round;
  stroke-linecap: round;
  mix-blend-mode: multiply;
  animation: ${drawDash} 4s forwards;
`;

const Circle = styled.circle`
  fill: ${props => (props.isFilled ? props.color : 'white')};
  stroke: ${props => props.color};
`;

function LineChart({ data }) {
  const [selectedYear, setSelectedYear] = useState();
  const [isHover, setIsHover] = useState(false);
  const [xPosition, setXPosition] = useState(0);
  const [pathLength, setPathLength] = useState();
  const [showCircles, setShowCircles] = useState(false);
  const lineRef = useRef();

  useEffect(() => {
    // Animation
    const totalLength = lineRef?.current?.getTotalLength();
    setPathLength(totalLength);

    setTimeout(() => {
      setShowCircles(true);
    }, 4000);
  }, []);

  const margin = { top: 50, right: 100, bottom: 60, left: 50 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = d => new Date(parseInt(d.time), 0);
  const yValue = d => d.value;
  const colorValue = d => d.subject;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const colorScale = scaleOrdinal(schemeCategory10);

  const lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(curveMonotoneX);

  const nested = Array.from(group(data, colorValue), ([key, value]) => ({
    key,
    value,
  }));

  colorScale.domain(nested.map(d => d.key));

  const handleMouseEnter = useCallback(() => setIsHover(true), []);
  const handleMouseLeave = useCallback(() => setIsHover(false), []);
  const getValueofSelectedYear = () => {
    const crops = data.filter(d => {
      return (
        (d.subject === 'RICE') |
          (d.subject === 'WHEAT') |
          (d.subject === 'MAIZE') && d.time === selectedYear
      );
    });
    return crops;
  };

  const yAxisTickFormat = useCallback(number => {
    return format('.3s')(number).replace('.', '') + 'T';
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
              yAxisTickFormat={yAxisTickFormat}
            />
            <AxisLabel
              innerHeight={innerHeight}
              innerWidth={innerWidth}
              axisPadding={60}
              yLabel="Value (tonne/ha)"
              xLabel="Time"
              marginLeft={margin.left}
            />
            <Group>
              {nested.map((d, i) => (
                <LinePath
                  ref={lineRef}
                  d={lineGenerator(d.value)}
                  stroke={colorScale(d.key)}
                  pathLength={pathLength}
                  key={i}
                />
              ))}
            </Group>
            <Group>
              {showCircles &&
                data.map((d, i) => (
                  <Circle
                    r={4}
                    cx={xScale(xValue(d))}
                    cy={yScale(yValue(d))}
                    key={i}
                    color={colorScale(d.subject)}
                    isFilled={isHover && selectedYear === d.time}
                  />
                ))}
            </Group>
          </Group>
          <ColorLegend
            moveX={270}
            spacing={80}
            radius={9}
            textX={15}
            colorScale={colorScale}
            width={width}
            align="row"
          />
          <Indicator
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            right={margin.right}
            top={margin.top}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            xScale={xScale}
            isHover={isHover}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            setXPosition={setXPosition}
          />
        </svg>
        {isHover && (
          <Tooltip
            selectedYear={selectedYear}
            crops={getValueofSelectedYear()}
            xPosition={xPosition}
          />
        )}
      </Map>
    </MapWrapper>
  );
}

LineChart.propTypes = {
  data: PropsTypes.array,
};

export default LineChart;

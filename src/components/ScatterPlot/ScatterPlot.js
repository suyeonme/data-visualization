import React, { useCallback, useRef, useEffect, useState } from 'react';
import {
  scaleLinear,
  extent,
  select,
  scaleOrdinal,
  schemeCategory10,
  group,
} from 'd3';
import PropsTypes from 'prop-types';

import { Group, MapWrapper, Map } from 'src/style/style';
import { height, width } from 'utility/utility';
import AxisLabel from 'components/AxisLabel/AxisLabel';
import Axes from 'components/Axes/Axes';
import ColorLegend from 'components/ColorLegend/ColorLegend';
import Tooltip from 'components/ScatterPlot/Tooltip';

function ScatterPlot({ data }) {
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [position, setPosition] = useState({ xPosition: 0, yPosition: 0 });
  const circleRef = useRef();

  const margin = { top: 50, right: 100, bottom: 70, left: 100 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;
  const circleRadius = 10;

  const xValue = d => d.youthRate;
  const yValue = d => d.elderlyRate;
  const colorValue = d => d.continent;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const colorScale = scaleOrdinal(schemeCategory10);

  const nested = Array.from(group(data, colorValue), ([key, value]) => ({
    key,
    value,
  }));

  colorScale.domain(nested.map(d => d.key));

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
      .on('mouseover', (e, d) => {
        setSelectedCircle(d);
        setPosition({ xPosition: e.pageX, yPosition: e.pageY });
      })
      .on('mouseout', () => setSelectedCircle(null))
      .transition()
      .duration(2000)
      .delay((_, i) => i * 10)
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius)
      .style('fill', d => colorScale(colorValue(d)));
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
          <ColorLegend
            moveX={270}
            spacing={30}
            radius={9}
            textX={15}
            colorScale={colorScale}
            width={width}
            align="vertical"
          />
        </svg>
        {selectedCircle && (
          <Tooltip
            selectedCircle={selectedCircle}
            position={position}
            xLabel="YouthRate"
            yLabel="ElderlyRate"
          />
        )}
      </Map>
    </MapWrapper>
  );
}

ScatterPlot.propTypes = {
  data: PropsTypes.array,
};

export default ScatterPlot;

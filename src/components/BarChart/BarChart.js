import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  scaleLinear,
  max,
  scaleBand,
  format,
  select,
  ascending,
  descending,
} from 'd3';
import PropsTypes from 'prop-types';

import Axes from 'components/Axes/Axes';
import { Group, MapWrapper, Map, Dropdown } from 'src/style/style';
import { width, formatNumber } from 'utility/utility';

const XAxisLabel = styled.g`
  rect {
    width: 15px;
    height: 15px;
    fill: #ec008b;
  }

  text {
    font-size: 1.4rem;
  }
`;

const GroupedRect = styled.g`
  rect {
    fill: #ec008b;
    transition: all 0.2s;

    &:hover {
      fill: #e46aa7;
    }
  }
`;

const GroupedText = styled.g`
  text {
    font-size: 1.2rem;
  }
`;

function BarChart({ data }) {
  const [sortOpt, setSortOpt] = useState('highest');
  const rectRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    // Animation rect with select
    const group = select(rectRef.current);
    const text = select(textRef.current);

    handleSelect();
    handleDrawRect(group);
    handleDrawText(text);
  }, [sortOpt, data]);

  const height = 700;
  const margin = { top: 50, right: 95, bottom: 60, left: 50 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = d => d.population;
  const yValue = d => d.country;

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])
    .nice();

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.2);

  const handleDrawRect = group => {
    group
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('height', yScale.bandwidth())
      .attr('y', d => yScale(yValue(d)))
      .transition()
      .duration(750)
      .attr('width', d => xScale(xValue(d)));
  };

  const handleDrawText = group => {
    group
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('y', d => yScale(yValue(d)) + yScale.bandwidth() / 1.5)
      .text(d => formatNumber(d.population))
      .attr('x', d => xScale(xValue(d)) + 5)
      .attr('fill-opacity', 0)
      .transition()
      .delay(1200)
      .duration(750)
      .attr('fill-opacity', 1);
  };

  const handleSelect = () => {
    if (sortOpt === 'highest') {
      data.sort((a, b) => ascending(a.population, b.population));
    } else if (sortOpt === 'lowest') {
      data.sort((a, b) => descending(a.population, b.population));
    }
  };

  const xAixsTickFormat = number => format('.2s')(number).replace('G', 'B');
  const handleChange = e => setSortOpt(e.target.value);

  return (
    <MapWrapper>
      <Dropdown onChange={handleChange} value={sortOpt}>
        <option value="highest">Highest</option>
        <option value="lowest">Lowest</option>
      </Dropdown>
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
              yTickSize={0}
              xTickPadding={10}
              yTickPadding={10}
              xAixsTickFormat={xAixsTickFormat}
            />
            <XAxisLabel>
              <rect y={-27} x={0} />
              <text y={-15} x={20}>
                Millions of People
              </text>
            </XAxisLabel>
            <GroupedRect ref={rectRef} />
            <GroupedText ref={textRef} />
          </Group>
        </svg>
      </Map>
    </MapWrapper>
  );
}

Axes.propTypes = {
  data: PropsTypes.array,
};

export default BarChart;

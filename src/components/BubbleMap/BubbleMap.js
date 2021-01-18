import React, { useEffect, useRef, useState } from 'react';
import {
  select,
  zoom,
  scaleSqrt,
  max,
  geoNaturalEarth1,
  geoCentroid,
  geoPath,
} from 'd3';
import styled from 'styled-components';
import PropsTypes from 'prop-types';

import { width, height, formatNumber } from 'utility/utility';
import SizeLegend from 'components/BubbleMap/SizeLegend';
import { MapWrapper, Map, Dropdown } from 'src/style/style';

const CountryPath = styled.path`
  fill: #d2d2d2;
  stroke: white;
  stroke-width: 0.1px;

  &:hover {
    fill: #f7b0ad;
  }
`;

const SpherePath = styled.path`
  fill: #eaeaea;
  opacity: 0.3;
`;

function BubbleMap({ countries }) {
  const [value, setValue] = useState('death');
  const svgRef = useRef(null);

  const radiusScale = scaleSqrt();
  const radiusValue = country => country.properties[value];
  radiusScale
    .domain([0, max(countries.features, radiusValue)])
    .range([0, value === 'death' ? 6 : 3]);

  const ticksOfDeaths = [335000, 150000, 70000, 10000];
  const ticksOfCases = [20000000, 10000000, 2500000, 200000];

  useEffect(() => {
    const svg = select(svgRef.current);

    handleZoom(svg);

    // Transition of Circles
    svg
      .selectAll('.bubble')
      .data(countries.features)
      .join('circle')
      .attr('class', 'bubble')
      .attr('cx', d => d.properties.projected[0])
      .attr('cy', d => d.properties.projected[1])
      .transition()
      .attr('r', d => radiusScale(radiusValue(d)));
  });

  const handleChange = val => setValue(val);

  const handleZoom = svg => {
    svg.call(
      zoom().on('zoom', ({ transform }) => {
        svg.attr('transform', transform);
      })
    );
  };

  const insertProjectionToProperties = (features, projection) => {
    features.forEach(country => {
      country.properties.projected = projection(geoCentroid(country));
    });
  };

  const handleTooltip = country => {
    if (country.properties.case === undefined) {
      return 'No Reported Data';
    } else if (value === 'death') {
      return `${country.properties.country}: ${formatNumber(
        country.properties.death
      )}`;
    } else {
      return `${country.properties.country}: ${formatNumber(
        country.properties.case
      )}`;
    }
  };

  const projection = geoNaturalEarth1()
    .fitSize([width, height], countries)
    .precision(100);

  const pathGenerator = geoPath().projection(projection);

  insertProjectionToProperties(countries.features, projection);

  return (
    <div>
      <Dropdown onChange={e => handleChange(e.target.value)}>
        <option value="death">Deaths</option>
        <option value="case">Cases</option>
      </Dropdown>
      <MapWrapper>
        <Map>
          <svg ref={svgRef} width={width} height={height}>
            <g>
              <SpherePath d={pathGenerator({ type: 'Sphere' })} />
            </g>
            <g>
              {countries.features.map((country, i) => (
                <CountryPath d={pathGenerator(country)} key={i}>
                  <title>{handleTooltip(country)}</title>
                </CountryPath>
              ))}
            </g>
            <SizeLegend
              ticks={value === 'death' ? ticksOfDeaths : ticksOfCases}
              xCircle={50}
              xLabel={100}
              yCircle={100}
              spacing={70}
              radiusScale={radiusScale}
              formatNumber={formatNumber}
            />
          </svg>
        </Map>
      </MapWrapper>
    </div>
  );
}

BubbleMap.propTypes = {
  countries: PropsTypes.object,
};

export default BubbleMap;

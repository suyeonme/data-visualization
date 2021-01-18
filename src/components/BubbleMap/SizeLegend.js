import React from 'react';
import styled from 'styled-components';
import PropsTypes from 'prop-types';

const GroupWrapper = styled.g`
  transform: translate(3rem, 15rem);
`;

const Group = styled.g`
  transform: ${props => `translate(0, ${props.spacing}px)`};

  circle {
    opacity: 0.7;
    fill: #d31922;
    pointer-events: none;
  }

  text {
    font-size: 1.4rem;
  }
`;

const SizeLegend = ({
  ticks,
  xCircle,
  yCircle,
  formatNumber,
  radiusScale,
  xLabel,
  spacing,
}) => {
  return (
    <GroupWrapper>
      {ticks.map((tick, i) => (
        <Group spacing={i * spacing} key={i}>
          <circle
            cx={xCircle}
            cy={yCircle - radiusScale(tick)}
            r={radiusScale(tick)}
          />
          <text dy="0.32em" x={xLabel} y={yCircle - radiusScale(tick)}>
            {formatNumber(tick)}
          </text>
        </Group>
      ))}
    </GroupWrapper>
  );
};

SizeLegend.propTypes = {
  ticks: PropsTypes.array,
  xCircle: PropsTypes.number,
  yCircle: PropsTypes.number,
  formatNumber: PropsTypes.func,
  radiusScale: PropsTypes.func,
  xLabel: PropsTypes.number,
  spacing: PropsTypes.number,
};

export default React.memo(SizeLegend);

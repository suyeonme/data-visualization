import React from 'react';
import styled from 'styled-components';
import PropsTypes from 'prop-types';

import { formatPercentage } from 'utility/utility';
import { TooltipWrapper } from 'style/style';

const Wrapper = styled(TooltipWrapper)`
  top: ${props => props.yPosition}px;
  left: ${props => props.xPosition}px;
`;

function Tooltip({ selectedCircle, position, xLabel, yLabel }) {
  const { xPosition, yPosition } = position;
  const { youthRate, elderlyRate } = selectedCircle;

  return (
    <Wrapper yPosition={yPosition} xPosition={xPosition}>
      <ul>
        <h3>{selectedCircle.country}</h3>
        <li>
          {xLabel}: {formatPercentage(youthRate)}
        </li>
        <li>
          {yLabel}: {formatPercentage(elderlyRate)}
        </li>
      </ul>
    </Wrapper>
  );
}

Tooltip.propTypes = {
  selectedCircle: PropsTypes.object,
  position: PropsTypes.object,
  xLabel: PropsTypes.string,
  yLabel: PropsTypes.string,
};

export default React.memo(Tooltip);

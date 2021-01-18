import React from 'react';
import styled from 'styled-components';
import PropsTypes from 'prop-types';

import { formatString } from 'utility/utility';
import { TooltipWrapper } from 'style/style';

const Wrapper = styled(TooltipWrapper).attrs(({ xPosition }) => ({
  style: {
    left: xPosition,
  },
}))`
  top: ${props => props.yPosition}px;
`;

function Tooltip({ selectedYear, xPosition, crops }) {
  return (
    <Wrapper xPosition={xPosition + 330} yPosition={500}>
      <h3>{selectedYear}</h3>
      <ul>
        {crops.map((crop, i) => (
          <li key={i}>
            {formatString(crop.subject)}: {crop.value}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

Tooltip.propTypes = {
  selectedYear: PropsTypes.number,
  xPosition: PropsTypes.number,
  crops: PropsTypes.array,
};

export default React.memo(Tooltip);

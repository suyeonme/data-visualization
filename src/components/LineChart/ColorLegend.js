import styled from 'styled-components';
import PropsTypes from 'prop-types';

import { stringFormat } from 'utility/utility';

const Wrapper = styled.g`
  transform: ${props => `translate(${props.spacing}px, 0)`};
`;

const ColorTick = styled.g`
  transform: ${props => `translate(${props.spacing}px, 30px)`};

  text {
    font-size: 1.4rem;
  }
`;

const ColorCircle = styled.circle`
  fill: ${props => props.color};
`;

function ColorLegend({ moveX, colorScale, spacing, radius, textX, width }) {
  return (
    <Wrapper spacing={width - moveX}>
      {colorScale.domain().map((d, i) => (
        <ColorTick spacing={i * spacing} key={i}>
          <ColorCircle r={radius} color={colorScale(d)} />
          <text dy="0.32em" x={textX}>
            {stringFormat(d)}
          </text>
        </ColorTick>
      ))}
    </Wrapper>
  );
}

ColorLegend.propTypes = {
  moveX: PropsTypes.number,
  colorScale: PropsTypes.func,
  spacing: PropsTypes.number,
  radius: PropsTypes.number,
  textX: PropsTypes.number,
  width: PropsTypes.number,
};

export default ColorLegend;

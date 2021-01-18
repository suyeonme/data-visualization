import styled from 'styled-components';
import PropsTypes from 'prop-types';

import { formatString } from 'utility/utility';

const Wrapper = styled.g`
  transform: ${props =>
    props.align === 'row'
      ? `translate(${props.spacing}px, 0)`
      : `translate(${props.spacing}px, 60px)`};
`;

const ColorTick = styled.g`
  transform: ${props =>
    props.align === 'row'
      ? `translate(${props.spacing}px, 30px)`
      : `translate(200px, ${props.spacing}px)`};

  text {
    font-size: 1.4rem;
  }
`;

const ColorCircle = styled.circle`
  fill: ${props => props.color};
`;

function ColorLegend({
  moveX,
  colorScale,
  spacing,
  radius,
  textX,
  width,
  align,
}) {
  return (
    <Wrapper spacing={width - moveX} align={align}>
      {colorScale.domain().map((d, i) => (
        <ColorTick spacing={i * spacing} align={align} key={i}>
          <ColorCircle r={radius} color={colorScale(d)} />
          <text dy="0.32em" x={textX}>
            {formatString(d)}
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

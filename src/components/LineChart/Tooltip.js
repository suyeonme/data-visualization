import React from 'react';
import styled from 'styled-components';
import PropsTypes from 'prop-types';

import { stringFormat } from 'utility/utility';

const Wrapper = styled.div.attrs(({ left }) => ({
  style: {
    left,
  },
}))`
  width: 15rem;
  height: 7rem;
  position: absolute;
  top: 50rem;
  z-index: 4000;
  font-size: 1.2rem;
  padding: 1.5rem;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  background-color: white;

  h3,
  li:not(:last-child) {
    margin-bottom: 0.7rem;
  }

  h3 {
    font-size: 1.4rem;
  }
`;

function Tooltip({ selectedYear, xPosition, crops }) {
  return (
    <Wrapper left={xPosition + 330}>
      <h3>{selectedYear}</h3>
      <ul>
        {crops.map((crop, i) => (
          <li key={i}>
            {stringFormat(crop.subject)}: {crop.value}
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

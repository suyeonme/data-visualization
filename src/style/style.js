import styled, { keyframes } from 'styled-components';

export const Group = styled.g`
  transform: ${props => `translate(${props.right}px, ${props.top}px)`};
`;

export const drawDash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

export const MapWrapper = styled.div`
  overflow-x: scroll;
  width: 100%;
`;

export const Map = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin: 3rem 0;

  @media (max-width: 992px) {
    display: inline-flex;
    justify-content: initial;
  }

  svg {
    display: inline-table;
  }
`;

export const Dropdown = styled.select`
  font-size: 1.4rem;
  padding: 0.3rem 0.8rem;
  margin: 3rem 0 3rem 5rem;

  &:focus {
    outline: 0;
  }
`;

export const TooltipWrapper = styled.div`
  position: absolute;
  z-index: 4000;
  font-size: 1.2rem;
  padding: 1.5rem;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  background-color: white;
  pointer-events: none;

  h3,
  li:not(:last-child) {
    margin-bottom: 0.7rem;
  }

  h3 {
    font-size: 1.4rem;
  }
`;

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropsTypes from 'prop-types';

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10rem;

  @media (max-width: 568px) {
    margin-top: 7rem;
  }
`;

const Wrapper = styled.div`
  text-align: center;
  transition: all 0.3s;
  font-size: 1.6rem;
  width: 30rem;

  @media (max-width: 1200px) {
    margin-bottom: 5rem;
  }

  @media (max-width: 568px) {
    width: 35rem;
  }

  h2,
  p {
    text-transform: uppercase;
  }

  h2 {
    word-spacing: 4px;
  }

  p {
    color: #696969;
    margin-top: 1rem;
    font-size: 1.4rem;
  }

  &:hover {
    transform: translate(0, -10px);
  }
`;

const CardWrapper = styled.div`
  height: auto;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
`;

const Image = styled.div`
  background: ${props => `url(${props.bgUrl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 15rem;
`;

function Card({ bgUrl, title, chartType, link }) {
  return (
    <Wrapper>
      <CardWrapper>
        <Link href={link}>
          <a>
            <Image bgUrl={bgUrl} />
          </a>
        </Link>
      </CardWrapper>
      <h2>{title}</h2>
      <p>{chartType}</p>
    </Wrapper>
  );
}

Card.propTypes = {
  bgUrl: PropsTypes.string,
  title: PropsTypes.string,
  chartType: PropsTypes.string,
  link: PropsTypes.string,
};

export default Card;

import styled from 'styled-components';

import Layout from 'components/Layout/Layout';
import Card from 'components/Card/Card';
import { CardsWrapper } from 'components/Card/Card';

const Wrapper = styled.div`
  padding: 5rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;

  span {
    display: block;
    font-size: 2rem;
    font-weight: 400;
    color: #696969;
    margin-top: 1rem;
  }
`;

function Home() {
  const cards = [
    {
      bgUrl: '/images/bubble-map.png',
      title: 'WHO Covid-19 World Dashboard',
      chartType: 'Bubble Map',
      link: '/covid19-dashboard',
    },
    {
      bgUrl: '/images/line-chart.png',
      title: 'Korea Crop Production',
      chartType: 'Line Chart',
      link: '/korea-crop-production',
    },
    {
      bgUrl: '/images/bar-chart.png',
      title: 'Top 20 Countries by Population 2020',
      chartType: 'Bar Chart',
      link: '/most-populated-countries',
    },
    {
      bgUrl: '/images/scatter-plot.png',
      title: 'Literacy Rates by Country',
      chartType: 'Scatter Plot',
      link: '/literacy-rates-by-country',
    },
  ];

  return (
    <Layout headTitle="Data Visualization">
      <Wrapper>
        <Title>
          📊 &nbsp; Data Visualization<span>with D3.js and React</span>
        </Title>
        <CardsWrapper>
          {cards.map((card, i) => (
            <Card
              bgUrl={card.bgUrl}
              title={card.title}
              chartType={card.chartType}
              link={card.link}
              key={i}
            />
          ))}
        </CardsWrapper>
      </Wrapper>
    </Layout>
  );
}

export default Home;

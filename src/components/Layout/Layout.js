import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import PropsTypes from 'prop-types';

import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';

const GlobalStyle = createGlobalStyle`
  html {
    ${'' /* 10px = 1rem */}
    font-size: 62.5%; 

    @media (max-width: 992px) {
      ${'' /* 9px = 1rem */}
      font-size: 56.25%; 
    }

    @media (max-width: 768px) {
      ${'' /* 8px = 1rem */}
      font-size: 50%; 
    }

    @media (max-width: 320px) {
      ${'' /* 7px = 1rem */}
      font-size: 43.75%; 
    }

    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }

  p {
    font-size: 1.6rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  main {
    flex: 1;
  }
`;

function Layout({
  children,
  title,
  subTitle,
  chartType,
  dataSource,
  dataSourceUrl,
  headTitle,
}) {
  return (
    <Wrapper>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <GlobalStyle />
      <Header
        title={title}
        subTitle={subTitle}
        chartType={chartType}
        dataSource={dataSource}
        dataSourceUrl={dataSourceUrl}
      />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  );
}

Layout.propTypes = {
  title: PropsTypes.string,
  subTitle: PropsTypes.string,
  chartType: PropsTypes.string,
  dataSource: PropsTypes.string,
  dataSourceUrl: PropsTypes.string,
  headTitle: PropsTypes.string,
};

export default Layout;

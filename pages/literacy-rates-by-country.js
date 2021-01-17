import { csv } from 'd3';
import PropsTypes from 'prop-types';

import Layout from 'components/Layout/Layout';
import ScatterPlot from 'components/ScatterPlot/ScatterPlot';

function LiteracyRatesByContry({ data }) {
  return (
    <Layout
      headTitle="Scatter Plot | Data Visualization"
      title="Literacy Rates By Country 2015"
      subTitle="The younger vs The older generation"
      chartType="Scatter Plot"
      dataSource="Our World in Data"
      dataSourceUrl="https://ourworldindata.org/literacy">
      <ScatterPlot data={data} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await csv(
    'https://gist.githubusercontent.com/suyeonme/4d3c8ca10e33ca59a89d43b6cb8bf687/raw/c99b981242c76cbf1643409c4b760d889eea7e62/literacy-rates-of-the-the-younger-population-15-24-years-versus-literacy-rates-of-the-older-population-65.csv'
  );

  data.forEach(d => {
    d.youthRate = +d.youthRate;
    d.elderlyRate = +d.elderlyRate;
  });

  return {
    props: {
      data,
    },
  };
}

LiteracyRatesByContry.propTypes = {
  data: PropsTypes.array,
};

export default LiteracyRatesByContry;

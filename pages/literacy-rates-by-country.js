import { csv } from 'd3';
import PropsTypes from 'prop-types';

import Layout from 'components/Layout/Layout';
import ScatterPlot from 'components/ScatterPlot/ScatterPlot';

function LiteracyRatesByContry({ data }) {
  return (
    <Layout
      headTitle="Scatter Plot | Data Visualization"
      title="Literacy Rates By Country"
      subTitle="The younger vs The older generation, 2015"
      chartType="Scatter Plot"
      dataSource="Our World in Data"
      dataSourceUrl="https://ourworldindata.org/literacy">
      <ScatterPlot data={data} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await csv(
    'https://gist.githubusercontent.com/suyeonme/4d3c8ca10e33ca59a89d43b6cb8bf687/raw/a3f75212b3cbef72a14c9b4beb268d96d0922aa8/gistfile1.txt'
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

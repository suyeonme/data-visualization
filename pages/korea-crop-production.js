import { csv } from 'd3';
import PropsTypes from 'prop-types';

import LineChart from 'components/LineChart/LineChart';
import Layout from 'components/Layout/Layout';

function KoreaCropProduction({ data }) {
  return (
    <Layout
      headTitle="Line Chart | Data Visualization"
      title="Korea Crop Production"
      subTitle="Korea production of different crop types from 1991 to 2020"
      chartType="Line Chart"
      dataSource="Worldwide Crop Production"
      dataSourceUrl="https://www.kaggle.com/vagifa/worldwide-crop-production">
      <LineChart data={data} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await csv(
    'https://gist.githubusercontent.com/suyeonme/7595c37f1cbc51023ba1d5f6ba767b37/raw/e855d60b0719b3c20ec26842994b5bd89a7d5a2c/korea_crop_producction.csv'
  );

  data.forEach(d => {
    d.time = +d.time;
    d.value = +d.value;
  });

  return {
    props: {
      data,
    },
  };
}

KoreaCropProduction.propTypes = {
  data: PropsTypes.array,
};

export default KoreaCropProduction;

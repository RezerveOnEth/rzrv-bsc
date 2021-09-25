import styles from './Rate.module.css';
import ReactApexChart from 'react-apexcharts';

interface IRate {
  currentRate: number;
}

const Rate = ({currentRate}: IRate) => {
  return (
    <div className={styles.Rate}>
      <header>
        <span className={styles.Rate__title}>Current Vault Swap Rate</span>
        <div className={styles.Rate__value}>
          <span>1 RZRV =</span>
          <span><span>{currentRate.toFixed(9)}</span> BUSD</span>
        </div>
      </header>

      <ReactApexChart
        options={{
          chart: {
            type: 'area',
            toolbar: {
              show: false,
            },
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          fill: {
            colors: ['#39F1C2', '#99F8DF', '#ffffff']
          },
          stroke: {
            curve: 'smooth',
            width: 2,
            colors: ['#00CD98']
          },
          xaxis: {
            labels: {
              show: false
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: false
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          tooltip: {
            enabled: false
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              bottom: 0
            }
          }
        }}
        series={[
          {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
          },
        ]}
        type="area"
        height={180}
      />
    </div>
  );
};

export default Rate;

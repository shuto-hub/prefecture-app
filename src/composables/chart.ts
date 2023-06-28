export const useChartUtils = () => {
  const initializeSeries = () => {
    return [
      {
        name: '',
        data: [],
      },
    ];
  };
  const initializeOptions = () => {
    return {
      chart: {
        type: 'line',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          borderRadiusApplication: 'around',
        },
      },
      yaxis: {
        title: {
          text: '人',
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: '年',
        },
      },
    };
  };
  const labelList = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
  return { initializeSeries, initializeOptions, labelList };
};

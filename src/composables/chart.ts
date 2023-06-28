const prefectureState = usePrefecture();
const populationState = usePopulation();
const api = useResasApi();

export const useChartUtils = () => {
  const initializeSeries = [
    {
      name: '',
      data: [],
    },
  ];
  const initializeOptions = {
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
  const labelList = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
  const series = useState('series', () => initializeSeries);
  const chartOptions = useState('chartOptions', () => initializeOptions);
  const selectedLabel = useState('selectedLabel', () => labelList[0]); // 総人口

  // 人口構成のラベルだけを切り替えた際、apiへリクエストせずチャートに値を渡す
  const findPopulation = (populationForChart: PopulationForChart) => {
    if (
      !populationForChart ||
      !populationForChart.data ||
      populationForChart.data.length === 0
    )
      return;
    const population = populationForChart.data.find(
      (population: Population) => population.label === selectedLabel.value
    );
    return population;
  };

  // チェックされた都道府県と、現在チェックされている人口構成のラベルからチャートを更新する
  const updatePopulation = async (
    newCheck: Array<number>,
    oldCheck: Array<number>
  ) => {
    if (oldCheck && newCheck.length < oldCheck.length) {
      populationState.list.value.forEach(
        (populationForChart: PopulationForChart, index: number) => {
          if (!newCheck.includes(populationForChart.id)) {
            populationState.splicePopulation(index);
          }
        }
      );
    } else {
      populationState.pushPopulation({
        id: newCheck[newCheck.length - 1],
        ...(await api.getPopulationList({
          prefCode: newCheck[newCheck.length - 1],
        })),
      });
    }
    setPopulationToSeries();
    chartOptions.value = {
      ...chartOptions.value,
      xaxis: {
        categories: findPopulation(populationState.list.value[0])
          ? findPopulation(populationState.list.value[0]).data.map(
              (populationYearAndValue: PopulationYearAndValue) =>
                populationYearAndValue.year
            )
          : [],
        title: {
          text: '年',
        },
      },
    };
  };
  
  // チェックした都道府県の人口構成を1データずつ整形し、チャートにセットする
  const setPopulationToSeries = () => {
    series.value = populationState.list.value.map(
      (population: PopulationForChart) => ({
        name: prefectureState.list.value.find(
          (prefecture: Prefecture) => prefecture.prefCode === population.id
        ).prefName,
        id: population.id,
        data: findPopulation(population)
          ? findPopulation(population).data.map(
              (populationYearAndValue: PopulationYearAndValue) =>
                populationYearAndValue.value
            )
          : [],
      })
    );
  };
  return {
    labelList,
    series,
    chartOptions,
    selectedLabel,
    updatePopulation,
    setPopulationToSeries,
  };
};
